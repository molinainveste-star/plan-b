export interface Metric {
    id: string;
    label: string;
    value: string;
    trend: string;
    trendDirection: "up" | "down" | "neutral";
    icon: "users" | "activity" | "eye" | "heart";
}

export interface AudienceData {
    ageGroup: { label: string; percentage: number }[];
    gender: { label: string; percentage: number }[];
    locations: { label: string; percentage: number }[];
}

export interface VideoPerformance {
    video_id: string;
    title: string;
    view_count: number;
    like_count: number;
    comment_count: number;
    published_at: string;
}

export interface MediaKit {
    slug: string;
    name: string;
    bio: string;
    avatarUrl: string;
    location: string;
    niche: string;
    socials: { platform: string; handle: string; url: string }[];
    metrics: Metric[];
    audience: AudienceData;
    videoPerformance: VideoPerformance[];
}

export const getMediaKit = (slug: string): MediaKit => {
    // Simulate fetching data
    return {
        slug,
        name: "Sofia Davis",
        bio: "Fashion & Lifestyle Content Creator | Based in São Paulo. Passionate about sustainable fashion and slow travel.",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia", // Placeholder
        location: "São Paulo, Brazil",
        niche: "Fashion & Lifestyle",
        socials: [
            { platform: "Instagram", handle: "@sofia.style", url: "#" },
            { platform: "TikTok", handle: "@sofia.tok", url: "#" },
            { platform: "YouTube", handle: "Sofia Davis Vlogs", url: "#" },
        ],
        metrics: [
            {
                id: "1",
                label: "Total Followers",
                value: "22.1K",
                trend: "+12% this month",
                trendDirection: "up",
                icon: "users",
            },
            {
                id: "2",
                label: "Avg. Engagement",
                value: "4.8%",
                trend: "Industry avg: 2.1%",
                trendDirection: "up",
                icon: "heart",
            },
            {
                id: "3",
                label: "Monthly Reach",
                value: "145K",
                trend: "+5% this month",
                trendDirection: "up",
                icon: "eye",
            },
        ],
        audience: {
            ageGroup: [
                { label: "18-24", percentage: 35 },
                { label: "25-34", percentage: 45 },
                { label: "35-44", percentage: 15 },
                { label: "45+", percentage: 5 },
            ],
            gender: [
                { label: "Female", percentage: 72 },
                { label: "Male", percentage: 28 },
            ],
            locations: [
                { label: "Brazil", percentage: 65 },
                { label: "Portugal", percentage: 15 },
                { label: "USA", percentage: 10 },
                { label: "Other", percentage: 10 },
            ],
        },
        videoPerformance: [
            { video_id: "dQw4w9WgXcQ", title: "Meu primeiro vídeo viral! 🚀", view_count: 125000, like_count: 8500, comment_count: 420, published_at: "2024-11-01T10:00:00Z" },
            { video_id: "jNQXAC9IVRw", title: "Tutorial completo: Como crescer no YouTube", view_count: 89000, like_count: 5200, comment_count: 310, published_at: "2024-11-08T14:30:00Z" },
            { video_id: "9bZkp7q19f0", title: "Reagindo aos meus vídeos antigos", view_count: 156000, like_count: 12000, comment_count: 890, published_at: "2024-11-15T18:00:00Z" },
            { video_id: "kJQP7kiw5Fk", title: "Q&A: Respondendo vocês!", view_count: 67000, like_count: 4100, comment_count: 520, published_at: "2024-11-22T12:00:00Z" },
            { video_id: "RgKAFK5djSk", title: "Bastidores: Um dia na minha vida", view_count: 203000, like_count: 15000, comment_count: 1100, published_at: "2024-11-29T16:00:00Z" },
            { video_id: "OPf0YbXqDm0", title: "Especial de fim de ano! 🎄", view_count: 178000, like_count: 11000, comment_count: 750, published_at: "2024-12-06T20:00:00Z" },
        ],
    };
};
