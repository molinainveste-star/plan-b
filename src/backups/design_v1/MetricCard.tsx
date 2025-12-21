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
                borderRadius: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                position: "relative",
                overflow: "hidden",
                background: "var(--card)",
                border: "none",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        padding: "0.875rem",
                        borderRadius: "1rem",
                        background: "var(--background)",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Icon size={24} />
                </div>
                <div
                    style={{
                        fontSize: "0.75rem",
                        color: trendDirection === "up" ? "#059669" : "var(--muted-foreground)",
                        background: trendDirection === "up" ? "rgba(5, 150, 105, 0.1)" : "var(--background)",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "2rem",
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                    }}
                >
                    {trendDirection === "up" && "↑"} {trend}
                </div>
            </div>

            <div style={{ marginTop: "0.5rem" }}>
                <div style={{
                    color: "var(--muted-foreground)",
                    fontSize: "0.875rem",
                    marginBottom: "0.25rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                }}>
                    {label}
                </div>
                <div style={{
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "var(--foreground)"
                }}>
                    {value}
                </div>
            </div>
        </div>
    );
};
