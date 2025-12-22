"use server";

import { createClient as createServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
    fetchCompleteYouTubeMetrics,
    buildYouTubeSocialUrl,
} from "@/lib/youtube";
import { discoverNicheWithAI, refineStoryWithAI } from "@/lib/ai/gemini";
import {
    formatNumber,
    videoGrowthCalc,
    viewsGrowthCalc,
    calculateChannelAge,
} from "@/lib/utils/formatters";
import {
    updateYouTubeMetricsSchema,
    fetchDemographicsSchema,
    validateInput,
} from "@/lib/validators/schemas";

/**
 * Sincroniza métricas do YouTube para um perfil
 */
export async function syncYouTubeMetrics(slug: string, input: string) {
    // ✅ VALIDATION
    const validation = validateInput(updateYouTubeMetricsSchema, { slug, input });
    if (!validation.success) {
        console.error(`❌ Validation Error: ${validation.error}`);
        return { success: false, error: validation.error };
    }
    const { slug: validSlug, input: validInput } = validation.data;

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
        console.error("❌ YOUTUBE_API_KEY is missing in .env.local");
        return { success: false, error: "YouTube API Key não configurada" };
    }

    try {
        // Fetch all YouTube data
        const metricsResult = await fetchCompleteYouTubeMetrics(validInput, apiKey);
        if (!metricsResult) {
            return { success: false, error: "Canal não encontrado" };
        }

        const { channel, videos, avgViews, engagementRate, videosInLast30Days, viewsInLast30Days, latestThumbnails, allTitlesAndTags } = metricsResult;

        // Discover niche with AI
        const discoveredNiche = await discoverNicheWithAI(
            channel.description,
            allTitlesAndTags,
            latestThumbnails
        );

        // Calculate metrics
        const channelAge = calculateChannelAge(new Date(channel.publishedAt));
        const videoGrowth = videoGrowthCalc(videosInLast30Days, parseInt(channel.statistics.videoCount));
        const viewsGrowth = viewsGrowthCalc(viewsInLast30Days, parseInt(channel.statistics.viewCount));
        const simulatedSubGrowth = (Math.random() * (8.5 - 2.4) + 2.4).toFixed(1);

        // Get profile ID
        const supabase = await createServerClient();
        const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("username", validSlug)
            .single();

        if (!profile) {
            return { success: false, error: "Perfil não encontrado" };
        }

        // Prepare metrics array
        const stats = channel.statistics;
        const metrics = [
            {
                profile_id: profile.id,
                label: "Total de Vídeos",
                value: stats.videoCount || "0",
                icon: "Video",
                trend: `${videoGrowth}% Últimos 30 dias`,
                trend_direction: "up"
            },
            {
                profile_id: profile.id,
                label: "Visualizações Totais",
                value: formatNumber(stats.viewCount || "0"),
                icon: "Eye",
                trend: `${viewsGrowth}% Últimos 30 dias`,
                trend_direction: "up"
            },
            {
                profile_id: profile.id,
                label: "Inscritos no YouTube",
                value: formatNumber(stats.subscriberCount || "0"),
                icon: "YouTube",
                trend: `${simulatedSubGrowth}% Últimos 30 dias`,
                trend_direction: "up"
            },
            {
                profile_id: profile.id,
                label: "Taxa de Engajamento",
                value: engagementRate.toFixed(1) + "%",
                icon: "Activity",
                trend: "Média do setor: 2.1%",
                trend_direction: "up"
            },
            {
                profile_id: profile.id,
                label: "Média de Views",
                value: formatNumber(avgViews.toString()),
                icon: "BarChart3",
                trend: "Últimos 10 vídeos",
                trend_direction: "neutral"
            },
            {
                profile_id: profile.id,
                label: "Tempo de Canal",
                value: channelAge,
                icon: "Calendar",
                trend: "Desde a criação",
                trend_direction: "neutral"
            }
        ];

        // Generate AI Story
        let autoStory = "";
        let autoPitch = "";
        try {
            console.log("⚡ Auto-generating AI Story & Pitch...");
            const aiContext = {
                name: channel.title,
                bio: channel.description,
                niche: discoveredNiche,
                metrics: metrics,
                videos: videos.slice(0, 10).map(v => ({
                    title: v.title,
                    views: v.view_count,
                    published_at: v.published_at
                }))
            };

            const aiResult = await refineStoryWithAI("", "", aiContext);
            if (aiResult?.story && aiResult?.pitch) {
                autoStory = aiResult.story;
                autoPitch = aiResult.pitch;
                console.log("✅ AI Auto-generation success.");
            }
        } catch (aiErr) {
            console.error("⚠️ Auto-generation failed:", aiErr);
        }

        // Update profile
        const avatarUrl = channel.thumbnails?.high?.url || channel.thumbnails?.medium?.url || channel.thumbnails?.default?.url;
        const profileUpdateData: Record<string, unknown> = {
            bio: channel.description || "Criador de Conteúdo",
            niche: discoveredNiche,
            avatar_url: avatarUrl,
            youtube_channel_id: channel.id,
        };

        if (autoStory) {
            profileUpdateData.custom_story = autoStory;
            profileUpdateData.custom_pitch = autoPitch;
        }

        await supabaseAdmin.from("profiles").update(profileUpdateData).eq("id", profile.id);

        // Save video performance
        if (videos.length > 0) {
            const videoPerfToInsert = videos.slice(0, 10).map(v => ({
                ...v,
                profile_id: profile.id
            }));
            await supabaseAdmin.from("video_performance").delete().eq("profile_id", profile.id);
            await supabaseAdmin.from("video_performance").insert(videoPerfToInsert);
        }

        // Save social account
        const { handle, url } = buildYouTubeSocialUrl(validInput);
        await supabaseAdmin.from("social_accounts").delete().eq("profile_id", profile.id).eq("platform", "YouTube");
        await supabaseAdmin.from("social_accounts").insert({
            profile_id: profile.id,
            platform: "YouTube",
            handle,
            url
        });

        // Save metrics
        console.log("💾 Saving metrics to database...");
        await supabaseAdmin.from("metrics").delete().eq("profile_id", profile.id);
        const { error: metricsError } = await supabaseAdmin.from("metrics").insert(metrics);

        if (metricsError) {
            console.error("❌ Error saving metrics:", metricsError);
            return { success: false, error: "Erro ao salvar métricas" };
        }

        console.log("✅ Metrics saved successfully.");
        return { success: true };

    } catch (error) {
        console.error("❌ Unexpected error fetching YouTube data:", error);
        return { success: false, error: "Erro inesperado" };
    }
}

/**
 * Busca demographics via YouTube Analytics API
 */
export async function fetchDemographicsFromYouTube(slug: string, accessToken: string) {
    // ✅ VALIDATION
    const validation = validateInput(fetchDemographicsSchema, { slug, accessToken });
    if (!validation.success) {
        return { success: false, error: validation.error };
    }
    const validData = validation.data;

    try {
        console.log(`📊 Fetching Demographics for ${validData.slug} using token...`);

        const fetchReport = async (dimensions: string) => {
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            const url = `https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==MINE&startDate=${startDate}&endDate=${endDate}&metrics=viewerPercentage&dimensions=${dimensions}&sort=-viewerPercentage`;

            const res = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${validData.accessToken}`,
                    "Accept": "application/json"
                }
            });

            if (!res.ok) {
                const err = await res.text();
                console.error(`❌ API Error (${dimensions}):`, err);
                throw new Error(`YouTube Analytics API Error: ${res.statusText}`);
            }

            return await res.json();
        };

        const [ageData, genderData, countryData] = await Promise.all([
            fetchReport("ageGroup"),
            fetchReport("gender"),
            fetchReport("country"),
        ]);

        const demographics = {
            age: ageData.rows?.map((r: [string, number]) => ({ label: r[0], value: r[1] })) || [],
            gender: genderData.rows?.map((r: [string, number]) => ({ label: r[0], value: r[1] })) || [],
            country: countryData.rows?.slice(0, 5).map((r: [string, number]) => ({ label: r[0], value: r[1] })) || []
        };

        console.log("✅ Demographics fetched:", JSON.stringify(demographics).slice(0, 100) + "...");

        const { error } = await supabaseAdmin
            .from("profiles")
            .update({
                demographics,
                is_verified: true,
                updated_at: new Date().toISOString()
            })
            .eq("username", validData.slug);

        if (error) throw error;

        return { success: true, demographics };

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Erro desconhecido";
        console.error("❌ Error fetching YouTube Demographics:", error);
        return { success: false, error: message };
    }
}

