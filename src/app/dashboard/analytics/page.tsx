"use client";

import React, { useState } from "react";

// Ícones
const Icons = {
  TrendingUp: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
      <polyline points="17,6 23,6 23,12" />
    </svg>
  ),
  TrendingDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" />
      <polyline points="17,18 23,18 23,12" />
    </svg>
  ),
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Download: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Eye: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Users: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  Clock: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  ),
  ThumbsUp: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
    </svg>
  ),
  Play: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="5,3 19,12 5,21 5,3" />
    </svg>
  ),
  Globe: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  Monitor: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Smartphone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
};

// Dados mockados
const overviewMetrics = [
  {
    label: "Visualizações Totais",
    value: "2.4M",
    change: "+18.2%",
    positive: true,
    icon: Icons.Eye,
    color: "#00D4FF",
  },
  {
    label: "Novos Inscritos",
    value: "+3.2K",
    change: "+12.5%",
    positive: true,
    icon: Icons.Users,
    color: "#7C3AED",
  },
  {
    label: "Tempo de Exibição",
    value: "145K h",
    change: "+8.7%",
    positive: true,
    icon: Icons.Clock,
    color: "#10B981",
  },
  {
    label: "Taxa de Engajamento",
    value: "4.8%",
    change: "-0.3%",
    positive: false,
    icon: Icons.ThumbsUp,
    color: "#FF6B6B",
  },
];

// Dados do gráfico de área (últimos 30 dias)
const viewsData = [
  { day: 1, views: 45000 },
  { day: 5, views: 52000 },
  { day: 10, views: 48000 },
  { day: 15, views: 61000 },
  { day: 20, views: 58000 },
  { day: 25, views: 72000 },
  { day: 30, views: 68000 },
];

// Top vídeos
const topVideos = [
  { title: "Como criar um Media Kit PROFISSIONAL", views: "245K", likes: "12K", duration: "15:42" },
  { title: "5 Dicas para FECHAR PARCERIAS", views: "189K", likes: "9.8K", duration: "12:30" },
  { title: "Review iPhone 15 Pro Max", views: "156K", likes: "8.2K", duration: "20:15" },
  { title: "Setup Tour 2025", views: "134K", likes: "7.5K", duration: "18:20" },
  { title: "Como crescer no YouTube em 2025", views: "98K", likes: "5.1K", duration: "22:45" },
];

// Dados demográficos
const demographics = {
  gender: [
    { label: "Masculino", value: 68, color: "#00D4FF" },
    { label: "Feminino", value: 30, color: "#7C3AED" },
    { label: "Outros", value: 2, color: "#8B949E" },
  ],
  age: [
    { label: "13-17", value: 8 },
    { label: "18-24", value: 35 },
    { label: "25-34", value: 38 },
    { label: "35-44", value: 12 },
    { label: "45-54", value: 5 },
    { label: "55+", value: 2 },
  ],
  countries: [
    { name: "Brasil", value: 72, flag: "🇧🇷" },
    { name: "Portugal", value: 12, flag: "🇵🇹" },
    { name: "Estados Unidos", value: 8, flag: "🇺🇸" },
    { name: "Angola", value: 4, flag: "🇦🇴" },
    { name: "Outros", value: 4, flag: "🌍" },
  ],
  devices: [
    { label: "Mobile", value: 62, icon: Icons.Smartphone },
    { label: "Desktop", value: 32, icon: Icons.Monitor },
    { label: "TV", value: 6, icon: Icons.Monitor },
  ],
};

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("30d");

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h2 style={{ margin: 0, color: "#F0F6FC", fontSize: "1.75rem", fontWeight: 700 }}>
            Analytics
          </h2>
          <p style={{ margin: "8px 0 0", color: "#8B949E", fontSize: "1rem" }}>
            Acompanhe o desempenho do seu canal em tempo real.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {/* Period Selector */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              background: "#161B22",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              color: "#8B949E",
            }}
          >
            <Icons.Calendar />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                color: "#C9D1D9",
                fontSize: "0.9rem",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="365d">Último ano</option>
            </select>
          </div>

          {/* Export Button */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              color: "#C9D1D9",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            <Icons.Download />
            Exportar
          </button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {overviewMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              style={{
                background: "#161B22",
                borderRadius: "16px",
                padding: "24px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: `${metric.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: metric.color,
                  }}
                >
                  <Icon />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: metric.positive ? "#10B981" : "#FF6B6B",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  {metric.positive ? <Icons.TrendingUp /> : <Icons.TrendingDown />}
                  {metric.change}
                </div>
              </div>
              <div style={{ marginTop: "16px" }}>
                <p style={{ margin: 0, color: "#8B949E", fontSize: "0.9rem" }}>{metric.label}</p>
                <p
                  style={{
                    margin: "4px 0 0",
                    color: "#F0F6FC",
                    fontSize: "2rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {metric.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
          marginBottom: "24px",
        }}
        className="analytics-grid"
      >
        {/* Views Chart */}
        <div
          style={{
            background: "#161B22",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3 style={{ margin: "0 0 24px", color: "#F0F6FC", fontSize: "1.1rem", fontWeight: 600 }}>
            Visualizações ao longo do tempo
          </h3>

          {/* Simple Area Chart Visualization */}
          <div style={{ position: "relative", height: "200px" }}>
            <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 50, 100, 150].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="400"
                  y2={y}
                  stroke="rgba(255,255,255,0.05)"
                  strokeDasharray="4"
                />
              ))}

              {/* Area */}
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,180 L57,150 L114,160 L171,110 L228,130 L285,70 L342,90 L400,100 L400,200 L0,200 Z"
                fill="url(#areaGradient)"
              />
              <path
                d="M0,180 L57,150 L114,160 L171,110 L228,130 L285,70 L342,90 L400,100"
                fill="none"
                stroke="#00D4FF"
                strokeWidth="3"
              />

              {/* Data points */}
              {[
                { x: 0, y: 180 },
                { x: 57, y: 150 },
                { x: 114, y: 160 },
                { x: 171, y: 110 },
                { x: 228, y: 130 },
                { x: 285, y: 70 },
                { x: 342, y: 90 },
                { x: 400, y: 100 },
              ].map((point, i) => (
                <circle key={i} cx={point.x} cy={point.y} r="5" fill="#00D4FF" />
              ))}
            </svg>
          </div>

          {/* X-axis labels */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", padding: "0 8px" }}>
            {["1", "5", "10", "15", "20", "25", "30"].map((day) => (
              <span key={day} style={{ color: "#8B949E", fontSize: "0.75rem" }}>
                {day}
              </span>
            ))}
          </div>
        </div>

        {/* Demographics */}
        <div
          style={{
            background: "#161B22",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3 style={{ margin: "0 0 20px", color: "#F0F6FC", fontSize: "1.1rem", fontWeight: 600 }}>
            Audiência por País
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {demographics.countries.map((country, index) => (
              <div key={index}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "#C9D1D9", fontSize: "0.9rem" }}>
                    {country.flag} {country.name}
                  </span>
                  <span style={{ color: "#8B949E", fontSize: "0.9rem" }}>{country.value}%</span>
                </div>
                <div
                  style={{
                    height: "8px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${country.value}%`,
                      background: index === 0 ? "#00D4FF" : index === 1 ? "#7C3AED" : "#8B949E",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
        className="analytics-grid"
      >
        {/* Top Videos */}
        <div
          style={{
            background: "#161B22",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3 style={{ margin: "0 0 20px", color: "#F0F6FC", fontSize: "1.1rem", fontWeight: 600 }}>
            Top Vídeos
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {topVideos.map((video, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "12px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background:
                      index === 0
                        ? "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)"
                        : index === 1
                        ? "linear-gradient(135deg, #C0C0C0 0%, #A0A0A0 100%)"
                        : index === 2
                        ? "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)"
                        : "rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: index < 3 ? "#0D1117" : "#8B949E",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                  }}
                >
                  {index + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      color: "#F0F6FC",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {video.title}
                  </p>
                  <p style={{ margin: "4px 0 0", color: "#8B949E", fontSize: "0.8rem" }}>
                    {video.views} views • {video.likes} likes
                  </p>
                </div>
                <span style={{ color: "#8B949E", fontSize: "0.8rem" }}>{video.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Age & Gender */}
        <div
          style={{
            background: "#161B22",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3 style={{ margin: "0 0 20px", color: "#F0F6FC", fontSize: "1.1rem", fontWeight: 600 }}>
            Idade e Gênero
          </h3>

          {/* Gender */}
          <div style={{ marginBottom: "24px" }}>
            <p style={{ margin: "0 0 12px", color: "#8B949E", fontSize: "0.85rem" }}>Gênero</p>
            <div style={{ display: "flex", gap: "16px" }}>
              {demographics.gender.map((item, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "3px",
                      background: item.color,
                    }}
                  />
                  <span style={{ color: "#C9D1D9", fontSize: "0.85rem" }}>
                    {item.label}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Age Distribution */}
          <div>
            <p style={{ margin: "0 0 12px", color: "#8B949E", fontSize: "0.85rem" }}>Faixa Etária</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "120px" }}>
              {demographics.age.map((age, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{ color: "#8B949E", fontSize: "0.7rem" }}>{age.value}%</span>
                  <div
                    style={{
                      width: "100%",
                      height: `${age.value * 2.5}px`,
                      background: `linear-gradient(180deg, #00D4FF 0%, #7C3AED 100%)`,
                      borderRadius: "4px 4px 0 0",
                      minHeight: "10px",
                    }}
                  />
                  <span style={{ color: "#8B949E", fontSize: "0.7rem" }}>{age.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          .analytics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

