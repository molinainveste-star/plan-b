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
    };
};
