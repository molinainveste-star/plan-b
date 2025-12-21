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
        up: {
            color: "var(--success)",
            bg: "var(--success-light)",
        },
        down: {
            color: "var(--error)",
            bg: "rgba(239, 68, 68, 0.1)",
        },
        neutral: {
            color: "var(--muted-foreground)",
            bg: "var(--secondary)",
        },
    };

    return (
        <div
            className="glass-panel"
            style={{
                padding: "var(--space-6)",
                borderRadius: "var(--radius-lg)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
                position: "relative",
                overflow: "hidden",
                animation: `fadeInUp 0.4s ease forwards`,
                animationDelay: `${delay}ms`,
                opacity: 0,
            }}
        >
            {/* Header Row */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                }}
            >
                <div style={{ flex: 1 }}>
                    {/* Label */}
                    <div style={{
                        color: "var(--muted-foreground)",
                        fontSize: "var(--text-sm)",
                        fontWeight: 500,
                        marginBottom: "var(--space-2)",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                    }}>
                        {label}
                    </div>
                    
                    {/* Value */}
                    <div style={{
                        fontSize: "var(--text-4xl)",
                        fontWeight: 700,
                        letterSpacing: "var(--tracking-tight)",
                        color: "var(--foreground)",
                        lineHeight: 1,
                        fontFamily: "var(--font-heading)",
                    }}>
                        {value}
                    </div>
                </div>

                {/* Icon */}
                <div
                    style={{
                        padding: "var(--space-3)",
                        borderRadius: "var(--radius-md)",
                        background: "var(--primary-light)",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    <Icon size={24} strokeWidth={2} />
                </div>
            </div>

            {/* Trend Badge */}
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

            {/* Decorative gradient line */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "var(--gradient-accent)",
                    opacity: 0.6,
                    borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
                }}
            />
        </div>
    );
};
