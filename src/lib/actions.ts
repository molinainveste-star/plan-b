"use server";

import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface CreateProfileData {
    name: string;
    email: string;
    slug: string;
    youtubeChannelId?: string;
}

export async function createProfile(data: CreateProfileData) {
    console.log(`🚀 Creating profile for: ${data.slug}...`);
    // Check if slug is taken
    const { data: existingUser } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", data.slug)
        .single();

    if (existingUser) {
        return { success: false, error: "Slug already taken. Please choose another." };
    }

    const authUser = await supabase.auth.getUser();
    const userId = authUser.data.user?.id || crypto.randomUUID();

    const { data: profile, error } = await supabase
        .from("profiles")
        .insert([{
            id: userId,
            username: data.slug,
            full_name: data.name,
            bio: "", // Initial empty bio
            niche: "Geral",
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.slug}`, // Default avatar
            youtube_channel_id: data.youtubeChannelId || null,
        }])
        .select()
        .single();

    if (error) {
        console.error("Error creating profile:", error);
        return { success: false, error: error.message };
    }

    // If YouTube ID is provided, fetch metrics immediately
    if (data.youtubeChannelId) {
        console.log(`🔗 YouTube ID provided, starting fetch...`);
        await updateYouTubeMetrics(data.slug, data.youtubeChannelId);
    }

    return { success: true, slug: data.slug };
}

export async function updateYouTubeMetrics(slug: string, input: string) {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
        console.error("❌ YOUTUBE_API_KEY is missing in .env.local");
        return;
    }

    try {
        let cleanInput = input.trim();

        // Handle URLs
        if (cleanInput.includes("youtube.com/")) {
            const parts = cleanInput.split("youtube.com/");
            const path = parts[parts.length - 1];
            if (path.startsWith("@")) {
                cleanInput = path.split("?")[0];
            } else if (path.startsWith("channel/")) {
                cleanInput = path.replace("channel/", "").split("?")[0];
            } else if (path.startsWith("c/")) {
                cleanInput = "@" + path.replace("c/", "").split("?")[0];
            }
        }

        // 1. Fetch Channel Info (Statistics + ContentDetails + Snippet for Creation Date & Description)
        let channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics,contentDetails,snippet&key=${apiKey}`;

        if (cleanInput.startsWith("UC")) {
            channelUrl += `&id=${cleanInput}`;
        } else {
            const handle = cleanInput.startsWith("@") ? cleanInput : `@${cleanInput}`;
            channelUrl += `&forHandle=${handle}`;
        }

        console.log(`🎬 Fetching YouTube channel data for: ${cleanInput}...`);
        const channelResponse = await fetch(channelUrl);
        const channelData = await channelResponse.json();

        if (channelData.error) {
            console.error("❌ YouTube API Error (Channel):", channelData.error.message);
            return;
        }

        if (!channelData.items || channelData.items.length === 0) {
            console.error(`❌ YouTube Channel not found for input: ${cleanInput}`);
            return;
        }

        const channel = channelData.items[0];
        const stats = channel.statistics;
        const snippet = channel.snippet;
        const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;

        let avgViews = 0;
        let engagementRate = 0;
        let videoPerformanceData: any[] = [];
        let videosInLast30Days = 0;
        let viewsInLast30Days = 0;
        let discoveredNiche = "Geral";
        let allTitlesAndTags = "";
        let latestThumbnails: string[] = [];

        // 2. Fetch Latest 50 Videos from Uploads Playlist
        if (uploadsPlaylistId) {
            console.log(`📹 Fetching latest videos from playlist: ${uploadsPlaylistId}...`);
            const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`;
            const playlistResponse = await fetch(playlistUrl);
            const playlistData = await playlistResponse.json();

            if (playlistData.items && playlistData.items.length > 0) {
                const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(",");

                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

                const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${apiKey}`;
                const videosResponse = await fetch(videosUrl);
                const videosData = await videosResponse.json();

                if (videosData.items && videosData.items.length > 0) {
                    let totalViewsForAvg = 0;
                    let totalEngagementForAvg = 0;
                    let avgCount = 0;

                    videoPerformanceData = videosData.items.map((video: any, index: number) => {
                        const v = video.statistics;
                        const s = video.snippet;
                        const views = parseInt(v.viewCount) || 0;
                        const likes = parseInt(v.likeCount) || 0;
                        const comments = parseInt(v.commentCount) || 0;
                        const publishedAt = new Date(s.publishedAt);

                        // Collect titles and tags for niche discovery
                        allTitlesAndTags += ` ${s.title} ${s.tags?.join(" ") || ""}`;

                        // Collect Thumbnails (Max 3)
                        if (index < 3) {
                            const thumb = s.thumbnails?.maxres?.url || s.thumbnails?.high?.url || s.thumbnails?.medium?.url;
                            if (thumb) latestThumbnails.push(thumb);
                        }

                        if (publishedAt > thirtyDaysAgo) {
                            videosInLast30Days++;
                            viewsInLast30Days += views;
                        }

                        if (index < 10) {
                            totalViewsForAvg += views;
                            totalEngagementForAvg += (likes + comments);
                            avgCount++;
                        }

                        return {
                            video_id: video.id,
                            title: s.title,
                            view_count: views,
                            like_count: likes,
                            comment_count: comments,
                            published_at: s.publishedAt
                        };
                    });

                    avgViews = avgCount > 0 ? Math.round(totalViewsForAvg / avgCount) : 0;
                    engagementRate = totalViewsForAvg > 0 ? (totalEngagementForAvg / totalViewsForAvg) * 100 : 0;

                    // AI Niche Discovery Logic
                    discoveredNiche = await discoverNicheWithAI(snippet.description || "", allTitlesAndTags, latestThumbnails);
                }
            }
        }

        // Calculate Channel Age
        const publishedAt = new Date(snippet.publishedAt);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - publishedAt.getTime());
        const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
        const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));

        let channelAge = "";
        if (diffYears >= 1) {
            channelAge = diffYears === 1 ? "1 ano" : `${diffYears} anos`;
        } else {
            channelAge = diffMonths === 1 ? "1 mês" : `${diffMonths} meses`;
        }

        // Calculate growth percentages
        const videoGrowth = videoGrowthCalc(videosInLast30Days, parseInt(stats.videoCount));
        const viewsGrowth = viewsGrowthCalc(viewsInLast30Days, parseInt(stats.viewCount));
        const simulatedSubGrowth = (Math.random() * (8.5 - 2.4) + 2.4).toFixed(1);

        // Get profile ID
        const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("username", slug)
            .single();

        if (!profile) return;

        // Update Profile with discovered info
        const avatarUrl = snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url;
        console.log(`🖼️ Avatar Sync: Found URL ${avatarUrl}`);

        // USE ADMIN CLIENT FOR WRITES
        await supabaseAdmin.from("profiles").update({
            bio: snippet.description || "Criador de Conteúdo",
            niche: discoveredNiche,
            avatar_url: avatarUrl,
            youtube_channel_id: channel.id
        }).eq("id", profile.id);

        // 4. Prepare Metrics (6 Cards)
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

        // Automatic AI Story Generation (The "B2B Strategist")
        let autoStory = "";
        let autoPitch = "";
        try {
            console.log("⚡ Auto-generating AI Story & Pitch...");
            const aiContext = {
                name: snippet.title,
                bio: snippet.description,
                niche: discoveredNiche,
                metrics: metrics,
                videos: videoPerformanceData.slice(0, 10).map(v => ({
                    title: v.title,
                    views: v.view_count,
                    published_at: v.published_at
                }))
            };

            // Pass empty strings for initial story/pitch since we are generating from scratch
            const aiResult = await refineStoryWithAI("", "", aiContext);
            if (aiResult && aiResult.story && aiResult.pitch) {
                autoStory = aiResult.story;
                autoPitch = aiResult.pitch;
                console.log("✅ AI Auto-generation success.");
            }
        } catch (aiErr) {
            console.error("⚠️ Auto-generation failed, falling back to default:", aiErr);
        }

        // Update Profile with discovered info AND AI Text
        const profileUpdateData: any = {
            bio: snippet.description || "Criador de Conteúdo",
            niche: discoveredNiche,
            youtube_channel_id: channel.id
        };

        if (autoStory) {
            profileUpdateData.custom_story = autoStory;
            profileUpdateData.custom_pitch = autoPitch;
        }

        await supabaseAdmin.from("profiles").update(profileUpdateData).eq("id", profile.id);

        // Save Video Performance
        if (videoPerformanceData.length > 0) {
            const videoPerfToInsert = videoPerformanceData.slice(0, 10).map(v => ({
                ...v,
                profile_id: profile.id
            }));
            await supabaseAdmin.from("video_performance").delete().eq("profile_id", profile.id);
            await supabaseAdmin.from("video_performance").insert(videoPerfToInsert);
        }

        // Save Social Account
        const socialHandle = cleanInput.startsWith("@") ? cleanInput : `@${cleanInput}`;
        const socialAccount = {
            profile_id: profile.id,
            platform: "YouTube",
            handle: socialHandle,
            url: cleanInput.startsWith("http") ? cleanInput : `https://www.youtube.com/${socialHandle}`
        };
        await supabaseAdmin.from("social_accounts").delete().eq("profile_id", profile.id).eq("platform", "YouTube");
        await supabaseAdmin.from("social_accounts").insert(socialAccount);

        // Save Metrics
        console.log("💾 Saving metrics to database...");
        await supabaseAdmin.from("metrics").delete().eq("profile_id", profile.id);
        const { error: metricsError } = await supabaseAdmin.from("metrics").insert(metrics);

        if (metricsError) {
            console.error("❌ Error saving metrics:", metricsError);
        } else {
            console.log("✅ Metrics saved successfully.");
        }

    } catch (error) {
        console.error("❌ Unexpected error fetching YouTube data:", error);
    }
}

async function discoverNicheWithAI(description: string, contentData: string, thumbnailUrls: string[] = []): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.warn("⚠️ AI Niche Discovery Skipped: Missing API Key");
        return "Geral";
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const modelsToTry = ["gemini-2.0-flash", "gemini-flash-latest", "gemini-2.5-flash"];

        // Prepare Image Parts
        const imageParts: any[] = [];
        if (thumbnailUrls.length > 0) {
            console.log(`🖼️ Fetching ${thumbnailUrls.length} thumbnails for analysis...`);
            for (const url of thumbnailUrls) {
                try {
                    const response = await fetch(url);
                    const arrayBuffer = await response.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    imageParts.push({
                        inlineData: {
                            data: buffer.toString("base64"),
                            mimeType: "image/jpeg"
                        }
                    });
                } catch (imgErr) {
                    console.warn(`⚠️ Failed to fetch thumbnail: ${url}`, imgErr);
                }
            }
        }

        for (const modelName of modelsToTry) {
            try {
                console.log(`🤖 AI Analyzing Niche (Multimodal: ${modelName})...`);
                const model = genAI.getGenerativeModel({ model: modelName });

                const prompt = `
                    PERSONA: Voce é um Estrategista Sênior de PR e Branding.
                    TAREFA: Analise os dados do canal (Texto + IMAGENS das Thumbnails) e defina o NICHO DE MERCADO mais específico e comercialmente atraente.
                    
                    DADOS VISUAIS (Thumbnails): Analise as imagens anexadas. Elas mostram o estilo, a "vibe" e o tópico real dos vídeos.
                    - Descrição do Canal: ${description.slice(0, 500)}
                    - Títulos/Tags Recentes: ${contentData.slice(0, 500)}

                    LISTA DE NICHOS SUGERIDOS:
                    Musculação (Bodybuilding), Fitness Feminino, Nutrição Esportiva, E-sports (FPS), E-sports (MOBA), Games (Gameplay), Tecnologia (Reviews), Programação, Educação Financeira, Empreendedorismo, Lifestyle de Luxo, Maternidade, Beleza & Maquiagem, Gastronomia, Viagem, Humor, Podcast, Notícias, Futebol, Vlogs Diários.

                    INSTRUÇÃO: 
                    1. Veja as imagens. O que elas mostram? (Ex: Pessoas treinando = Fitness/Musculação; Jogo na tela = Games; Gráficos = Finanças).
                    2. Retorne APENAS o nome do nicho. Nada mais. Se for mistura, use "&" apenas uma vez (ex: "Musculação & Podcast").
                `;

                // Combine text prompt and images
                const result = await model.generateContent([prompt, ...imageParts]);
                const response = result.response;
                const niche = response.text().replace(/\n/g, "").trim();
                console.log(`✅ AI Discovery Success: ${niche}`);
                return niche;
            } catch (e: any) {
                console.warn(`⚠️ Model ${modelName} failed: ${e.message}`);
                continue;
            }
        }
    } catch (e) {
        console.error("AI Niche Discovery Error:", e);
    }

    return "Geral";
}

function videoGrowthCalc(recent: number, total: number) {
    if (!total || total === 0) return "0.0";
    return ((recent / total) * 100).toFixed(1);
}

function viewsGrowthCalc(recent: number, total: number) {
    if (!total || total === 0) return "0.0";
    return ((recent / total) * 100).toFixed(1);
}

function formatNumber(numStr: string) {
    const num = parseInt(numStr);
    if (isNaN(num)) return numStr;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return numStr;
}

export async function updateProfileStory(slug: string, story: string, pitch: string) {
    const { error } = await supabase
        .from("profiles")
        .update({
            custom_story: story,
            custom_pitch: pitch,
            updated_at: new Date().toISOString()
        })
        .eq("username", slug);

    if (error) {
        console.error("❌ Error updating profile story:", error);
        throw error;
    }

    return { success: true };
}

export async function refineStoryWithAI(story: string, pitch: string, context?: {
    name?: string;
    bio?: string;
    niche?: string;
    metrics?: any[];
    videos?: any[];
}) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.warn("⚠️ GEMINI_API_KEY is missing in process.env");
        return {
            story: story.replace(/oferece/g, "entrega estrategicamente").replace(/ajuda/g, "potencializa extraordinariamente") + "\n\n(Aviso: GEMINI_API_KEY não detetada. Reinicia o servidor se acabaste de a adicionar.)",
            pitch: pitch.replace(/parceria/g, "colaboração estratégica").replace(/resultados/g, "resultados exponenciais")
        };
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Valid Gemini models
        const modelsToTry = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-flash-latest"];
        let lastError: any;

        const metricsSummary = context?.metrics?.map(m => `${m.label}: ${m.value}`).join(", ") || "Não disponíveis";
        const videosSummary = context?.videos?.slice(0, 5).map(v => `- ${v.title} (${v.views} views, publicado em ${new Date(v.published_at).toLocaleDateString()})`).join("\n") || "Não disponíveis";

        for (const modelName of modelsToTry) {
            try {
                console.log(`🤖 Senior PR Strategist analyzing with: ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });

                const prompt = `
                    PERSONA: Você é um Gerente de Parcerias Estratégicas (Head of Partnerships) especializado em conectividade de criadores de conteúdo com grandes marcas.
                    TOM: Profissional, analítico, orientado a dados e negócios (B2B). Evite linguagem sensacionalista ("império", "dominação", "inconteste") e foque em valor comercial real.

                    TAREFA: Escreva a seção "Minha História" e o "Pitch de Investimento" para o Media Kit deste criador.
                    OBJETIVO: Comunicar a autoridade e o valor do criador para potenciais anunciantes de forma sóbria e convincente, sem exageros. Use o português do Brasil.

                    DADOS DO CRIADOR:
                    - Nome: ${context?.name || "Criador"}
                    - Bio Original: ${context?.bio || "N/A"}
                    - Nicho Principal: ${context?.niche || "N/A"}
                    - Métricas: ${metricsSummary}
                    - Vídeos Recentes:
                    ${videosSummary}

                    INSTRUÇÕES ESPECÍFICAS:
                    1. **Identificação de Nicho:** Analise os títulos dos vídeos recentes. Se o nicho informado for "Geral", tente inferir o tópico específico (ex: "Musculação", "Investimentos", "Vlogs de Viagem") e adapte o texto a isso.
                    2. **Minha História (Narrativa):** 2 parágrafos. Conte quem é o criador e qual o foco do conteúdo.
                    3. **Pitch (Por que anunciar?):** Liste 3 pontos fortes baseados nos NÚMEROS e no TIPO DE PÚBLICO. Use argumentos lógicos.
                    4. **Proibido:** Não invente prêmios, não use termos como "Rei do...", "Fenômeno global" a menos que os números provem.
                    5. Retorne APENAS um JSON válido.

                    FORMATO DE RETORNO:
                    {
                        "story": "texto refinado",
                        "pitch": "texto refinado"
                    }
                `;

                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();

                const jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    try {
                        return JSON.parse(jsonMatch[0]);
                    } catch (parseError) {
                        console.error("❌ JSON Parse Error:", text);
                        continue;
                    }
                }

                throw new Error("Formato de resposta inesperado.");
            } catch (err: any) {
                lastError = err;
                console.warn(`❌ Error with model ${modelName}:`, err.message);
                if (err.message?.includes("404") || err.message?.includes("not found")) {
                    console.warn(`❌ Model ${modelName} not found (404). Skipping.`);
                    continue;
                }
                if (err.message?.includes("429") || err.message?.includes("quota")) {
                    console.warn(`❌ Model ${modelName} rate limited (429). Skipping.`);
                    continue; // You might want to break here if you have no other models, but continue is safer for lists
                }
                console.warn(`❌ Error with model ${modelName}:`, err.message);
                if (err.message?.includes("API_KEY_INVALID")) throw err;
                continue;
            }
        }

        throw lastError || new Error("Todos os modelos de IA falharam.");
    } catch (error: any) {
        console.error("❌ Gemini AI Final Error:", error.message);
        throw new Error(`Erro na IA: ${error.message || "Problema desconhecido"}`);
    }
}

export async function updateProfileAvatar(slug: string, avatarUrl: string) {
    const { error } = await supabaseAdmin
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("username", slug);

    if (error) {
        console.error("Error updating avatar:", error);
        throw error;
    }
    return { success: true };
}

export async function updatePricingPackages(slug: string, packages: any[]) {
    try {
        const { error } = await supabaseAdmin
            .from("profiles")
            .update({
                pricing_packages: packages,
                updated_at: new Date().toISOString()
            })
            .eq("username", slug);

        if (error) {
            console.error("❌ Error updating pricing packages:", error);
            throw error;
        }

        return { success: true };
    } catch (error) {
        console.error("❌ Unexpected error updating pricing:", error);
        return { success: false, error };
    }
}


export async function updateProfileCaseStudies(slug: string, cases: any[]) {
    try {
        const { error } = await supabaseAdmin
            .from("profiles")
            .update({
                brand_cases: cases,
                updated_at: new Date().toISOString()
            })
            .eq("username", slug);

        if (error) {
            console.error("❌ Error updating case studies:", error);
            throw error;
        }

        return { success: true };
    } catch (error) {
        console.error("❌ Unexpected error updating case studies:", error);
        return { success: false, error };
    }
}

export async function fetchDemographicsFromYouTube(slug: string, accessToken: string) {
    try {
        console.log(`📊 Fetching Demographics for ${slug} using token...`);

        // Helper to fetch report
        const fetchReport = async (dimensions: string) => {
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            const url = `https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==MINE&startDate=${startDate}&endDate=${endDate}&metrics=viewerPercentage&dimensions=${dimensions}&sort=-viewerPercentage`;

            const res = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
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

        // 1. Fetch Age Group
        const ageData = await fetchReport("ageGroup");
        // 2. Fetch Gender
        const genderData = await fetchReport("gender");
        // 3. Fetch Geography (Country)
        const countryData = await fetchReport("country");

        const demographics = {
            age: ageData.rows?.map((r: any) => ({ label: r[0], value: r[1] })) || [],
            gender: genderData.rows?.map((r: any) => ({ label: r[0], value: r[1] })) || [],
            country: countryData.rows?.slice(0, 5).map((r: any) => ({ label: r[0], value: r[1] })) || [] // Top 5
        };

        console.log("✅ Demographics fetched:", JSON.stringify(demographics).slice(0, 100) + "...");

        // Update Profile
        const { error } = await supabaseAdmin
            .from("profiles")
            .update({
                demographics: demographics,
                is_verified: true, // Verification badge!
                updated_at: new Date().toISOString()
            })
            .eq("username", slug);

        if (error) throw error;

        return { success: true, demographics };

    } catch (error: any) {
        console.error("❌ Error acting on YouTube Demographics:", error);
        return { success: false, error: error.message };
    }
}
