"use client";

import React from "react";
import { Users, Activity, Eye, Heart, Youtube, Video, BarChart3, Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
    label: string;
    value: string;
    trend: string;
    trendDirection: "up" | "down" | "neutral";
    icon: string;
    delay?: number;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
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
    delay = 0,
}) => {
    const iconKey = icon?.toLowerCase() || "chart";
    const Icon = iconMap[iconKey] || BarChart3;
    const TrendIcon = trendDirection === "up" ? TrendingUp : trendDirection === "down" ? TrendingDown : Minus;

    const trendColors = {
        up: { color: "var(--success)", bg: "var(--success-light)" },
        down: { color: "var(--error)", bg: "var(--error-light)" },
        neutral: { color: "var(--foreground-muted)", bg: "var(--background-tertiary)" },
    };

    return (
        <div
            className="glass-panel"
            style={{
                padding: "var(--space-6)",
                borderRadius: "var(--radius-xl)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
                position: "relative",
                overflow: "hidden",
                animation: `fadeInUp 0.5s ease forwards`,
                animationDelay: `${delay}ms`,
                opacity: 0,
            }}
        >
            {/* Glow effect on hover */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "var(--gradient-primary)",
                    opacity: 0.8,
                }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                    <div style={{
                        color: "var(--foreground-muted)",
                        fontSize: "var(--text-sm)",
                        fontWeight: 500,
                        marginBottom: "var(--space-2)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                    }}>
                        {label}
                    </div>
                    
                    <div 
                        className="text-gradient"
                        style={{
                            fontSize: "var(--text-4xl)",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            lineHeight: 1,
                        }}
                    >
                        {value}
                    </div>
                </div>

                <div
                    style={{
                        padding: "var(--space-3)",
                        borderRadius: "var(--radius-lg)",
                        background: "var(--primary-light)",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "var(--shadow-glow)",
                    }}
                >
                    <Icon size={24} strokeWidth={2} />
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--space-1)",
                        fontSize: "var(--text-sm)",
                        color: trendColors[trendDirection].color,
                        background: trendColors[trendDirection].bg,
                        padding: "var(--space-1) var(--space-3)",
                        borderRadius: "var(--radius-full)",
                        fontWeight: 600,
                    }}
                >
                    <TrendIcon size={14} strokeWidth={2.5} />
                    <span>{trend}</span>
                </div>
            </div>
        </div>
    );
};
