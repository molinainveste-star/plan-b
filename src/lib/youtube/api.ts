import type {
    YouTubeChannelData,
    YouTubeVideoData,
    YouTubeMetricsResult,
    ParsedYouTubeInput,
} from "./types";

/**
 * Parseia input do YouTube (URL, handle, ou channel ID)
 */
export function parseYouTubeInput(input: string): ParsedYouTubeInput {
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

    if (cleanInput.startsWith("UC")) {
        return { type: "channelId", value: cleanInput };
    }

    const handle = cleanInput.startsWith("@") ? cleanInput : `@${cleanInput}`;
    return { type: "handle", value: handle };
}

/**
 * Busca dados do canal do YouTube
 */
export async function fetchChannelData(
    input: string,
    apiKey: string
): Promise<YouTubeChannelData | null> {
    const parsed = parseYouTubeInput(input);

    let channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics,contentDetails,snippet&key=${apiKey}`;

    if (parsed.type === "channelId") {
        channelUrl += `&id=${parsed.value}`;
    } else {
        channelUrl += `&forHandle=${parsed.value}`;
    }

    console.log(`🎬 Fetching YouTube channel data for: ${parsed.value}...`);
    const response = await fetch(channelUrl);
    const data = await response.json();

    if (data.error) {
        console.error("❌ YouTube API Error (Channel):", data.error.message);
        return null;
    }

    if (!data.items || data.items.length === 0) {
        console.error(`❌ YouTube Channel not found for input: ${parsed.value}`);
        return null;
    }

    const channel = data.items[0];
    return {
        id: channel.id,
        title: channel.snippet.title,
        description: channel.snippet.description,
        publishedAt: channel.snippet.publishedAt,
        thumbnails: channel.snippet.thumbnails,
        statistics: channel.statistics,
        uploadsPlaylistId: channel.contentDetails?.relatedPlaylists?.uploads,
    };
}

/**
 * Busca vídeos do playlist de uploads
 */
export async function fetchChannelVideos(
    uploadsPlaylistId: string,
    apiKey: string,
    maxResults: number = 50
): Promise<YouTubeVideoData[]> {
    console.log(`📹 Fetching latest videos from playlist: ${uploadsPlaylistId}...`);

    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${apiKey}`;
    const playlistResponse = await fetch(playlistUrl);
    const playlistData = await playlistResponse.json();

    if (!playlistData.items || playlistData.items.length === 0) {
        return [];
    }

    const videoIds = playlistData.items
        .map((item: any) => item.snippet.resourceId.videoId)
        .join(",");

    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${apiKey}`;
    const videosResponse = await fetch(videosUrl);
    const videosData = await videosResponse.json();

    if (!videosData.items || videosData.items.length === 0) {
        return [];
    }

    return videosData.items.map((video: any) => ({
        video_id: video.id,
        title: video.snippet.title,
        view_count: parseInt(video.statistics.viewCount) || 0,
        like_count: parseInt(video.statistics.likeCount) || 0,
        comment_count: parseInt(video.statistics.commentCount) || 0,
        published_at: video.snippet.publishedAt,
        thumbnail_url:
            video.snippet.thumbnails?.maxres?.url ||
            video.snippet.thumbnails?.high?.url ||
            video.snippet.thumbnails?.medium?.url,
    }));
}

/**
 * Busca métricas completas do canal
 */
export async function fetchCompleteYouTubeMetrics(
    input: string,
    apiKey: string
): Promise<YouTubeMetricsResult | null> {
    const channel = await fetchChannelData(input, apiKey);
    if (!channel) return null;

    let videos: YouTubeVideoData[] = [];
    let avgViews = 0;
    let engagementRate = 0;
    let videosInLast30Days = 0;
    let viewsInLast30Days = 0;
    let allTitlesAndTags = "";
    const latestThumbnails: string[] = [];

    if (channel.uploadsPlaylistId) {
        videos = await fetchChannelVideos(channel.uploadsPlaylistId, apiKey);

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        let totalViewsForAvg = 0;
        let totalEngagementForAvg = 0;
        let avgCount = 0;

        videos.forEach((video, index) => {
            const publishedAt = new Date(video.published_at);

            // Collect titles for niche discovery
            allTitlesAndTags += ` ${video.title}`;

            // Collect Thumbnails (Max 3)
            if (index < 3 && video.thumbnail_url) {
                latestThumbnails.push(video.thumbnail_url);
            }

            // Videos in last 30 days
            if (publishedAt > thirtyDaysAgo) {
                videosInLast30Days++;
                viewsInLast30Days += video.view_count;
            }

            // Average for last 10 videos
            if (index < 10) {
                totalViewsForAvg += video.view_count;
                totalEngagementForAvg += video.like_count + video.comment_count;
                avgCount++;
            }
        });

        avgViews = avgCount > 0 ? Math.round(totalViewsForAvg / avgCount) : 0;
        engagementRate =
            totalViewsForAvg > 0 ? (totalEngagementForAvg / totalViewsForAvg) * 100 : 0;
    }

    return {
        channel,
        videos,
        avgViews,
        engagementRate,
        videosInLast30Days,
        viewsInLast30Days,
        latestThumbnails,
        allTitlesAndTags,
    };
}

/**
 * Monta URL social do canal
 */
export function buildYouTubeSocialUrl(input: string): { handle: string; url: string } {
    const parsed = parseYouTubeInput(input);
    const handle = parsed.type === "handle" ? parsed.value : `@${input}`;
    const url = input.startsWith("http") ? input : `https://www.youtube.com/${handle}`;
    return { handle, url };
}

