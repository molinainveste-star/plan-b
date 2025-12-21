export interface YouTubeChannelData {
    id: string;
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
        default?: { url: string };
        medium?: { url: string };
        high?: { url: string };
    };
    statistics: {
        viewCount: string;
        subscriberCount: string;
        videoCount: string;
    };
    uploadsPlaylistId?: string;
}

export interface YouTubeVideoData {
    video_id: string;
    title: string;
    view_count: number;
    like_count: number;
    comment_count: number;
    published_at: string;
    thumbnail_url?: string;
}

export interface YouTubeMetricsResult {
    channel: YouTubeChannelData;
    videos: YouTubeVideoData[];
    avgViews: number;
    engagementRate: number;
    videosInLast30Days: number;
    viewsInLast30Days: number;
    latestThumbnails: string[];
    allTitlesAndTags: string;
}

export interface ParsedYouTubeInput {
    type: "channelId" | "handle";
    value: string;
}

