import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function POST(request: NextRequest) {
    try {
        const { profileId, channelId } = await request.json();

        if (!profileId || !channelId) {
            return NextResponse.json(
                { error: "profileId e channelId são obrigatórios" },
                { status: 400 }
            );
        }

        // Verify the user owns this profile
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("id, user_id")
            .eq("id", profileId)
            .eq("user_id", user.id)
            .single();

        if (profileError || !profile) {
            return NextResponse.json(
                { error: "Perfil não encontrado ou não autorizado" },
                { status: 403 }
            );
        }

        // Fetch YouTube channel data
        const channelResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`
        );

        const channelData = await channelResponse.json();

        if (!channelData.items || channelData.items.length === 0) {
            return NextResponse.json(
                { error: "Canal do YouTube não encontrado" },
                { status: 404 }
            );
        }

        const channel = channelData.items[0];
        const stats = channel.statistics;
        const snippet = channel.snippet;

        // Update profile with YouTube data
        await supabase
            .from("profiles")
            .update({
                youtube_channel_id: channelId,
                avatar_url: snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url,
                full_name: snippet.title,
                bio: snippet.description?.substring(0, 500) || undefined,
                updated_at: new Date().toISOString(),
            })
            .eq("id", profileId);

        // Upsert metrics
        await supabase
            .from("metrics")
            .upsert({
                profile_id: profileId,
                subscribers: parseInt(stats.subscriberCount) || 0,
                total_views: parseInt(stats.viewCount) || 0,
                avg_views: 0,
                engagement_rate: 0,
                updated_at: new Date().toISOString(),
            }, {
                onConflict: "profile_id",
            });

        // Fetch recent videos
        const videosResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&order=date&type=video&key=${YOUTUBE_API_KEY}`
        );

        const videosData = await videosResponse.json();
        const videoIds = videosData.items?.map((v: any) => v.id.videoId).filter(Boolean) || [];

        if (videoIds.length > 0) {
            // Get video statistics
            const videoStatsResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds.join(",")}&key=${YOUTUBE_API_KEY}`
            );

            const videoStatsData = await videoStatsResponse.json();

            // Delete old video performance data
            await supabase
                .from("video_performance")
                .delete()
                .eq("profile_id", profileId);

            // Insert new video performance data
            const videoPerformanceData = videoStatsData.items?.map((video: any) => ({
                profile_id: profileId,
                video_id: video.id,
                title: video.snippet.title,
                view_count: parseInt(video.statistics.viewCount) || 0,
                like_count: parseInt(video.statistics.likeCount) || 0,
                comment_count: parseInt(video.statistics.commentCount) || 0,
                published_at: video.snippet.publishedAt,
            })) || [];

            if (videoPerformanceData.length > 0) {
                await supabase
                    .from("video_performance")
                    .insert(videoPerformanceData);
            }

            // Calculate average views
            const totalViews = videoPerformanceData.reduce((sum: number, v: any) => sum + v.view_count, 0);
            const avgViews = videoPerformanceData.length > 0 
                ? Math.round(totalViews / videoPerformanceData.length) 
                : 0;

            // Calculate engagement rate
            const totalEngagement = videoPerformanceData.reduce((sum: number, v: any) => 
                sum + v.like_count + v.comment_count, 0);
            const engagementRate = totalViews > 0 
                ? parseFloat(((totalEngagement / totalViews) * 100).toFixed(2))
                : 0;

            // Update metrics with averages
            await supabase
                .from("metrics")
                .update({
                    avg_views: avgViews,
                    engagement_rate: engagementRate,
                })
                .eq("profile_id", profileId);
        }

        return NextResponse.json({
            success: true,
            channel: {
                id: channelId,
                title: snippet.title,
                subscribers: stats.subscriberCount,
                videos: videoIds.length,
            },
        });

    } catch (err: any) {
        console.error("YouTube sync error:", err);
        return NextResponse.json(
            { error: err.message || "Erro interno" },
            { status: 500 }
        );
    }
}

