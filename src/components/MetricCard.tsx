import React from "react";
import { Users, Activity, Eye, Heart, Youtube, Video, BarChart3, Calendar } from "lucide-react";

interface MetricCardProps {
    label: string;
    value: string;
    trend: string;
    trendDirection: "up" | "down" | "neutral";
    icon: string;
}

const iconMap: Record<string, any> = {
    users: Users,
    activity: Activity,
    eye: Eye,
    heart: Heart,
    youtube: Youtube,
    video: Video,
    chart: BarChart3,
    barchart3: BarChart3,
    calendar: Calendar,
};

export const MetricCard: React.FC<MetricCardProps> = ({
    label,
    value,
    trend,
    trendDirection,
    icon,
}) => {
    // Normalize icon name and fallback to chart if not found
    const iconKey = icon?.toLowerCase() || "chart";
    const Icon = iconMap[iconKey] || BarChart3;

    return (
        <div
            className="glass-panel"
            style={{
                padding: "2rem",
                borderRadius: "var(--radius)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                position: "relative",
                overflow: "hidden",
                // Remove redundant inline styles handled by class
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                }}
            >
                <div>
                    <div style={{
                        color: "var(--muted-foreground)",
                        fontSize: "0.875rem",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                    }}>
                        {label}
                    </div>
                    <div style={{
                        fontSize: "3rem",
                        fontWeight: 800,
                        letterSpacing: "-0.04em",
                        color: "var(--primary)",
                        lineHeight: 1
                    }}>
                        {value}
                    </div>
                </div>

                <div
                    style={{
                        padding: "1rem",
                        borderRadius: "1.25rem",
                        background: "rgba(67, 97, 238, 0.05)",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Icon size={28} strokeWidth={2.5} />
                </div>
            </div>

            <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div
                    style={{
                        fontSize: "0.80rem",
                        color: trendDirection === "up" ? "#10b981" : "var(--muted-foreground)",
                        background: trendDirection === "up" ? "rgba(16, 185, 129, 0.1)" : "var(--secondary)",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "2rem",
                        fontWeight: 700,
                        letterSpacing: "0.02em",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem"
                    }}
                >
                    {trendDirection === "up" && "↗"} {trend}
                </div>
            </div>
        </div>
    );
};
