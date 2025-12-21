"use client";

import React from "react";
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Bar
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

    // Prepare data for chart
    const chartData = data.map((video, index) => {
        const likes = video.like_count || 0;
        const comments = video.comment_count || 0;
        const engagement = video.view_count > 0
            ? ((likes + comments) / video.view_count) * 100
            : 0;

        return {
            name: index + 1, // #1, #2... (older to newer)
            title: video.title,
            views: video.view_count,
            engagement: parseFloat(engagement.toFixed(2)),
            date: new Date(video.published_at).toLocaleDateString()
        };
    });

    return (
        <div className="glass-panel" style={{
            padding: "3rem",
            borderRadius: "2rem",
            background: "var(--card)",
            border: "none",
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.03)"
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--foreground)" }}>
                    Performance & Engajamento
                </h3>
                <div style={{ display: "flex", gap: "1rem", fontSize: "0.80rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)" }} />
                        <span style={{ color: "var(--muted-foreground)" }}>Visualizações</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                        <span style={{ color: "var(--muted-foreground)" }}>Engajamento (%)</span>
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                            dataKey="name"
                            stroke="var(--muted-foreground)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
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
                            stroke="#10b981"
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
                                            padding: "1rem",
                                            borderRadius: "1rem",
                                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                                            border: "1px solid var(--border)",
                                            fontSize: "0.85rem"
                                        }}>
                                            <p style={{ fontWeight: 600, marginBottom: "0.5rem", maxWidth: "200px" }}>{data.title}</p>
                                            <p style={{ color: "var(--muted-foreground)", fontSize: "0.75rem", marginBottom: "0.5rem" }}>{data.date}</p>
                                            <div style={{ display: "flex", gap: "1rem" }}>
                                                <div style={{ color: "var(--primary)" }}>
                                                    <span style={{ fontWeight: 700 }}>{new Intl.NumberFormat('compact').format(data.views)}</span> Views
                                                </div>
                                                <div style={{ color: "#10b981" }}>
                                                    <span style={{ fontWeight: 700 }}>{data.engagement}%</span> Engaj.
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
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorViews)"
                            animationDuration={1500}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="engagement"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ r: 4, fill: "#10b981", strokeWidth: 0 }}
                            activeDot={{ r: 6 }}
                            animationDuration={1500}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
