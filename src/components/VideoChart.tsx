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
                borderRadius: "var(--radius-lg)",
                animation: "fadeInUp 0.4s ease forwards",
                animationDelay: "150ms",
                opacity: 0,
            }}
        >
            {/* Header */}
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
                    fontWeight: 600, 
                    color: "var(--foreground)",
                    margin: 0,
                }}>
                    Performance & Engajamento
                </h3>
                
                {/* Legend */}
                <div style={{ display: "flex", gap: "var(--space-6)", fontSize: "var(--text-sm)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                        <div style={{ 
                            width: 10, 
                            height: 10, 
                            borderRadius: "var(--radius-sm)", 
                            background: "var(--primary)",
                        }} />
                        <span style={{ color: "var(--muted-foreground)" }}>Visualizações</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                        <div style={{ 
                            width: 10, 
                            height: 10, 
                            borderRadius: "var(--radius-full)", 
                            background: "var(--success)",
                        }} />
                        <span style={{ color: "var(--muted-foreground)" }}>Engajamento (%)</span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div style={{ width: "100%", height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart 
                        data={chartData} 
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey="name"
                            stroke="var(--muted-foreground)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            yAxisId="left"
                            stroke="var(--muted-foreground)"
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
                            stroke="var(--success)"
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
                                            background: "var(--card)",
                                            backdropFilter: "blur(12px)",
                                            padding: "var(--space-4)",
                                            borderRadius: "var(--radius-md)",
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
                                                lineHeight: "var(--leading-snug)",
                                            }}>
                                                {data.title}
                                            </p>
                                            <p style={{ 
                                                color: "var(--muted-foreground)", 
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
                                                        fontSize: "var(--text-base)",
                                                    }}>
                                                        {new Intl.NumberFormat("pt-BR", { notation: "compact" }).format(data.views)}
                                                    </div>
                                                    <div style={{ 
                                                        color: "var(--muted-foreground)", 
                                                        fontSize: "var(--text-xs)",
                                                    }}>
                                                        Views
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{ 
                                                        color: "var(--success)", 
                                                        fontWeight: 700,
                                                        fontSize: "var(--text-base)",
                                                    }}>
                                                        {data.engagement}%
                                                    </div>
                                                    <div style={{ 
                                                        color: "var(--muted-foreground)", 
                                                        fontSize: "var(--text-xs)",
                                                    }}>
                                                        Engajamento
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
                            stroke="var(--primary)"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorViews)"
                            animationDuration={1200}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="engagement"
                            stroke="var(--success)"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "var(--success)", strokeWidth: 0 }}
                            activeDot={{ r: 6, stroke: "var(--card)", strokeWidth: 2 }}
                            animationDuration={1200}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
