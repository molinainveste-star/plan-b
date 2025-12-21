"use client";

import React from "react";
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface VideoData {
    title: string;
    view_count: number;
    like_count?: number;
    comment_count?: number;
    published_at: string;
}

interface VideoChartProps {
    data: VideoData[];
}

export const VideoChart: React.FC<VideoChartProps> = ({ data }) => {
    if (!data || data.length === 0) return null;

    const chartData = data.map((video, index) => {
        const likes = video.like_count || 0;
        const comments = video.comment_count || 0;
        const engagement = video.view_count > 0
            ? ((likes + comments) / video.view_count) * 100
            : 0;

        return {
            name: index + 1,
            title: video.title,
            views: video.view_count,
            engagement: parseFloat(engagement.toFixed(2)),
            date: new Date(video.published_at).toLocaleDateString("pt-BR"),
        };
    });

    return (
        <div 
            className="glass-panel" 
            style={{
                padding: "var(--space-8)",
                borderRadius: "var(--radius-xl)",
                animation: "fadeInUp 0.5s ease forwards",
                animationDelay: "200ms",
                opacity: 0,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Top gradient line */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "var(--gradient-primary)",
                }}
            />

            <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginBottom: "var(--space-6)",
                flexWrap: "wrap",
                gap: "var(--space-4)",
            }}>
                <h3 style={{ 
                    fontSize: "var(--text-xl)", 
                    fontWeight: 700, 
                    color: "var(--foreground)",
                    margin: 0,
                }}>
                    Performance & Engajamento
                </h3>
                
                <div style={{ display: "flex", gap: "var(--space-6)", fontSize: "var(--text-sm)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                        <div style={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: "var(--radius-sm)", 
                            background: "var(--primary)",
                            boxShadow: "0 0 10px var(--primary-glow)",
                        }} />
                        <span style={{ color: "var(--foreground-muted)" }}>Views</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                        <div style={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: "var(--radius-full)", 
                            background: "var(--success)",
                        }} />
                        <span style={{ color: "var(--foreground-muted)" }}>Engajamento</span>
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart 
                        data={chartData} 
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey="name"
                            stroke="#8B949E"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            yAxisId="left"
                            stroke="#8B949E"
                            fontSize={12}
                            tickFormatter={(value) => {
                                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                                if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                                return value;
                            }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="#10B981"
                            fontSize={12}
                            tickFormatter={(value) => `${value}%`}
                            tickLine={false}
                            axisLine={false}
                        />
                        
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div style={{
                                            background: "rgba(22, 27, 34, 0.95)",
                                            backdropFilter: "blur(12px)",
                                            padding: "var(--space-4)",
                                            borderRadius: "var(--radius-lg)",
                                            boxShadow: "var(--shadow-lg)",
                                            border: "1px solid var(--border)",
                                            fontSize: "var(--text-sm)",
                                            minWidth: "180px",
                                        }}>
                                            <p style={{ 
                                                fontWeight: 600, 
                                                marginBottom: "var(--space-2)", 
                                                maxWidth: "200px", 
                                                color: "var(--foreground)",
                                                lineHeight: "1.3",
                                            }}>
                                                {data.title}
                                            </p>
                                            <p style={{ 
                                                color: "var(--foreground-muted)", 
                                                fontSize: "var(--text-xs)", 
                                                marginBottom: "var(--space-3)",
                                            }}>
                                                {data.date}
                                            </p>
                                            <div style={{ 
                                                display: "flex", 
                                                gap: "var(--space-4)",
                                                borderTop: "1px solid var(--border)",
                                                paddingTop: "var(--space-3)",
                                            }}>
                                                <div>
                                                    <div style={{ 
                                                        color: "var(--primary)", 
                                                        fontWeight: 700,
                                                        fontSize: "var(--text-lg)",
                                                    }}>
                                                        {new Intl.NumberFormat("pt-BR", { notation: "compact" }).format(data.views)}
                                                    </div>
                                                    <div style={{ 
                                                        color: "var(--foreground-muted)", 
                                                        fontSize: "var(--text-xs)",
                                                    }}>
                                                        Views
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{ 
                                                        color: "var(--success)", 
                                                        fontWeight: 700,
                                                        fontSize: "var(--text-lg)",
                                                    }}>
                                                        {data.engagement}%
                                                    </div>
                                                    <div style={{ 
                                                        color: "var(--foreground-muted)", 
                                                        fontSize: "var(--text-xs)",
                                                    }}>
                                                        Engaj.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        
                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="views"
                            stroke="#00D4FF"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorViews)"
                            animationDuration={1200}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="engagement"
                            stroke="#10B981"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "#10B981", strokeWidth: 0 }}
                            activeDot={{ r: 6, stroke: "#0D1117", strokeWidth: 2 }}
                            animationDuration={1200}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
