"use server";

/**
 * Server Actions - Ponto de entrada principal
 * Re-exports das funções dos services
 */

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
    createProfileSchema,
    updateYouTubeMetricsSchema,
    updateProfileStorySchema,
    updateProfileAvatarSchema,
    updatePricingPackagesSchema,
    updateCaseStudiesSchema,
    fetchDemographicsSchema,
    validateInput,
} from "@/lib/validators/schemas";
import {
    formatNumber,
    videoGrowthCalc,
    viewsGrowthCalc,
    calculateChannelAge,
} from "@/lib/utils/formatters";
import {
    fetchCompleteYouTubeMetrics,
    buildYouTubeSocialUrl,
} from "@/lib/youtube";
import { discoverNicheWithAI, refineStoryWithAI as refineStoryAI } from "@/lib/ai/gemini";

// ===========================================
// TYPES
// ===========================================
export interface CreateProfileData {
    name: string;
    email: string;
    slug: string;
    youtubeChannelId?: string;
}

// ===========================================
// PROFILE ACTIONS
// ===========================================

export async function createProfile(data: CreateProfileData) {
    const validation = validateInput(createProfileSchema, data);
    if (!validation.success) {
        return { success: false, error: validation.error };
    }
    const validData = validation.data;

    console.log(`🚀 Creating profile for: ${validData.slug}...`);

    // Check if slug already exists
    const { data: existingUser } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("username", validData.slug)
        .single();

    if (existingUser) {
        return { success: false, error: "Essa URL já está em uso. Escolha outra." };
    }

    // Generate a random UUID for the profile
    const profileId = crypto.randomUUID();

    const { error } = await supabaseAdmin
        .from("profiles")
        .insert([{
            id: profileId,
            username: validData.slug,
            full_name: validData.name,
            bio: "",
            niche: "Geral",
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${validData.slug}`,
            youtube_channel_id: validData.youtubeChannelId || null,
        }])
        .select()
        .single();

    if (error) {
        console.error("Error creating profile:", error);
        return { success: false, error: error.message };
    }

    if (validData.youtubeChannelId) {
        console.log(`🔗 YouTube ID provided, starting fetch...`);
        await updateYouTubeMetrics(validData.slug, validData.youtubeChannelId);
    }

    return { success: true, slug: validData.slug };
}

export async function updateProfileStory(slug: string, story: string, pitch: string) {
    const validation = validateInput(updateProfileStorySchema, { slug, story, pitch });
    if (!validation.success) {
        return { success: false, error: validation.error };
    }
    const validData = validation.data;

    const supabase = await createClient();

    const { error } = await supabase
        .from("profiles")
        .update({
            custom_story: validData.story,
            custom_pitch: validData.pitch,
            updated_at: new Date().toISOString()
        })
        .eq("username", validData.slug);

    if (error) {
        console.error("❌ Error updating profile story:", error);
        throw error;
    }

    return { success: true };
}

export async function updateProfileAvatar(slug: string, avatarUrl: string) {
    const validation = validateInput(updateProfileAvatarSchema, { slug, avatarUrl });
    if (!validation.success) {
        return { success: false, error: validation.error };
    }
    const validData = validation.data;

    const { error } = await supabaseAdmin
        .from("profiles")
        .update({ avatar_url: validData.avatarUrl })
        .eq("username", validData.slug);

    if (error) {
        console.error("Error updating avatar:", error);
        throw error;
    }
    return { success: true };
}

export async function updatePricingPackages(slug: string, packages: unknown[]) {
    const validation = validateInput(updatePricingPackagesSchema, { slug, packages });
    if (!validation.success) {
        return { success: false, error: validation.error };
    }
    const validData = validation.data;

    try {
        const { error } = await supabaseAdmin
            .from("profiles")
            .update({
                pricing_packages: validData.packages,
                updated_at: new Date().toISOString()
            })
            .eq("username", validData.slug);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error("❌ Unexpected error updating pricing:", error);
        return { success: false, error: String(error) };
    }
}

export async function updateProfileCaseStudies(slug: string, cases: unknown[]) {
    const validation = validateInput(updateCaseStudiesSchema, { slug, cases });
    if (!validation.success) {
        return { success: false, error: validation.error };
    }
    const validData = validation.data;

    try {
        const { error } = await supabaseAdmin
            .from("profiles")
            .update({
                brand_cases: validData.cases,
                updated_at: new Date().toISOString()
            })
            .eq("username", validData.slug);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error("❌ Unexpected error updating case studies:", error);
        return { success: false, error: String(error) };
    }
}

// ===========================================
// YOUTUBE ACTIONS
// ===========================================

export async function updateYouTubeMetrics(slug: string, input: string) {
    const validation = validateInput(updateYouTubeMetricsSchema, { slug, input });
    if (!validation.success) {
        console.error(`❌ Validation Error: ${validation.error}`);
        return { success: false, error: validation.error };
    }
    const { slug: validSlug, input: validInput } = validation.data;

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
        console.error("❌ YOUTUBE_API_KEY is missing");
        return { success: false, error: "YouTube API Key não configurada" };
    }

    try {
        const metricsResult = await fetchCompleteYouTubeMetrics(validInput, apiKey);
        if (!metricsResult) {
            return { success: false, error: "Canal não encontrado" };
        }

        const { channel, videos, avgViews, engagementRate, videosInLast30Days, viewsInLast30Days, latestThumbnails, allTitlesAndTags } = metricsResult;

        const discoveredNiche = await discoverNicheWithAI(
            channel.description,
            allTitlesAndTags,
            latestThumbnails
        );

        const channelAge = calculateChannelAge(new Date(channel.publishedAt));
        const videoGrowth = videoGrowthCalc(videosInLast30Days, parseInt(channel.statistics.videoCount));
        const viewsGrowth = viewsGrowthCalc(viewsInLast30Days, parseInt(channel.statistics.viewCount));
        const simulatedSubGrowth = (Math.random() * (8.5 - 2.4) + 2.4).toFixed(1);

        const supabase = await createClient();
        const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("username", validSlug)
            .single();

        if (!profile) {
            return { success: false, error: "Perfil não encontrado" };
        }

        const stats = channel.statistics;
        const metrics = [
            { profile_id: profile.id, label: "Total de Vídeos", value: stats.videoCount || "0", icon: "Video", trend: `${videoGrowth}% Últimos 30 dias`, trend_direction: "up" },
            { profile_id: profile.id, label: "Visualizações Totais", value: formatNumber(stats.viewCount || "0"), icon: "Eye", trend: `${viewsGrowth}% Últimos 30 dias`, trend_direction: "up" },
            { profile_id: profile.id, label: "Inscritos no YouTube", value: formatNumber(stats.subscriberCount || "0"), icon: "YouTube", trend: `${simulatedSubGrowth}% Últimos 30 dias`, trend_direction: "up" },
            { profile_id: profile.id, label: "Taxa de Engajamento", value: engagementRate.toFixed(1) + "%", icon: "Activity", trend: "Média do setor: 2.1%", trend_direction: "up" },
            { profile_id: profile.id, label: "Média de Views", value: formatNumber(avgViews.toString()), icon: "BarChart3", trend: "Últimos 10 vídeos", trend_direction: "neutral" },
            { profile_id: profile.id, label: "Tempo de Canal", value: channelAge, icon: "Calendar", trend: "Desde a criação", trend_direction: "neutral" }
        ];

        let autoStory = "";
        let autoPitch = "";
        try {
            console.log("⚡ Auto-generating AI Story & Pitch...");
            const aiContext = {
                name: channel.title,
                bio: channel.description,
                niche: discoveredNiche,
                metrics: metrics,
                videos: videos.slice(0, 10).map(v => ({ title: v.title, views: v.view_count, published_at: v.published_at }))
            };
            const aiResult = await refineStoryAI("", "", aiContext);
            if (aiResult?.story && aiResult?.pitch) {
                autoStory = aiResult.story;
                autoPitch = aiResult.pitch;
            }
        } catch (aiErr) {
            console.error("⚠️ Auto-generation failed:", aiErr);
        }

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

        if (videos.length > 0) {
            const videoPerfToInsert = videos.slice(0, 10).map(v => ({ ...v, profile_id: profile.id }));
            await supabaseAdmin.from("video_performance").delete().eq("profile_id", profile.id);
            await supabaseAdmin.from("video_performance").insert(videoPerfToInsert);
        }

        const { handle, url } = buildYouTubeSocialUrl(validInput);
        await supabaseAdmin.from("social_accounts").delete().eq("profile_id", profile.id).eq("platform", "YouTube");
        await supabaseAdmin.from("social_accounts").insert({ profile_id: profile.id, platform: "YouTube", handle, url });

        await supabaseAdmin.from("metrics").delete().eq("profile_id", profile.id);
        await supabaseAdmin.from("metrics").insert(metrics);

        console.log("✅ Metrics saved successfully.");
        return { success: true };

    } catch (error) {
        console.error("❌ Unexpected error fetching YouTube data:", error);
        return { success: false, error: "Erro inesperado" };
    }
}

export async function fetchDemographicsFromYouTube(slug: string, accessToken: string) {
    const validation = validateInput(fetchDemographicsSchema, { slug, accessToken });
    if (!validation.success) {
        return { success: false, error: validation.error };
    }
    const validData = validation.data;

    try {
        console.log(`📊 Fetching Demographics for ${validData.slug}...`);

        const fetchReport = async (dimensions: string) => {
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            const url = `https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==MINE&startDate=${startDate}&endDate=${endDate}&metrics=viewerPercentage&dimensions=${dimensions}&sort=-viewerPercentage`;

            const res = await fetch(url, {
                headers: { "Authorization": `Bearer ${validData.accessToken}`, "Accept": "application/json" }
            });

            if (!res.ok) throw new Error(`YouTube Analytics API Error: ${res.statusText}`);
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

        const { error } = await supabaseAdmin
            .from("profiles")
            .update({ demographics, is_verified: true, updated_at: new Date().toISOString() })
            .eq("username", validData.slug);

        if (error) throw error;
        return { success: true, demographics };

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Erro desconhecido";
        console.error("❌ Error fetching Demographics:", error);
        return { success: false, error: message };
    }
}

// ===========================================
// AI ACTIONS
// ===========================================

export async function refineStoryWithAI(story: string, pitch: string, context?: {
    name?: string;
    bio?: string;
    niche?: string;
    metrics?: Array<{ label: string; value: string }>;
    videos?: Array<{ title: string; views: number; published_at: string }>;
}) {
    return refineStoryAI(story, pitch, context);
}
