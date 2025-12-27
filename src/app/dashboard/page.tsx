"use client";

import React from "react";

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
  Play: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="5,3 19,12 5,21 5,3" />
    </svg>
  ),
  Heart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  FileText: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  ExternalLink: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  MoreVertical: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  ),
};

// Dados mockados
const metrics = [
  {
    label: "Visualizações",
    value: "1.2M",
    change: "+12.5%",
    positive: true,
    icon: Icons.Eye,
    color: "#00D4FF",
  },
  {
    label: "Inscritos",
    value: "45.2K",
    change: "+8.3%",
    positive: true,
    icon: Icons.Users,
    color: "#7C3AED",
  },
  {
    label: "Vídeos",
    value: "156",
    change: "+3",
    positive: true,
    icon: Icons.Play,
    color: "#10B981",
  },
  {
    label: "Engajamento",
    value: "4.8%",
    change: "-0.2%",
    positive: false,
    icon: Icons.Heart,
    color: "#FF6B6B",
  },
];

const recentMediaKits = [
  {
    id: 1,
    name: "Media Kit - Q4 2025",
    views: 234,
    status: "Ativo",
    lastEdit: "Há 2 dias",
  },
  {
    id: 2,
    name: "Proposta Nike Brasil",
    views: 89,
    status: "Rascunho",
    lastEdit: "Há 1 semana",
  },
  {
    id: 3,
    name: "Parceria Samsung",
    views: 156,
    status: "Ativo",
    lastEdit: "Há 3 dias",
  },
];

const recentActivity = [
  { type: "view", message: "Seu Media Kit foi visualizado por Nike Brasil", time: "5 min atrás" },
  { type: "milestone", message: "Você atingiu 45K inscritos! 🎉", time: "2 horas atrás" },
  { type: "view", message: "Novo acesso ao Media Kit Q4 2025", time: "3 horas atrás" },
  { type: "update", message: "Métricas do YouTube atualizadas", time: "6 horas atrás" },
];

// Dados do gráfico (últimos 7 dias)
const chartData = [
  { day: "Seg", views: 12500 },
  { day: "Ter", views: 18200 },
  { day: "Qua", views: 15800 },
  { day: "Qui", views: 22100 },
  { day: "Sex", views: 28500 },
  { day: "Sab", views: 24300 },
  { day: "Dom", views: 19700 },
];

export default function DashboardPage() {
  const maxViews = Math.max(...chartData.map((d) => d.views));

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Welcome Section */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ margin: 0, color: "#F0F6FC", fontSize: "1.75rem", fontWeight: 700 }}>
          Olá, Maná! 👋
        </h2>
        <p style={{ margin: "8px 0 0", color: "#8B949E", fontSize: "1rem" }}>
          Aqui está o resumo do seu perfil nos últimos 30 dias.
        </p>
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              style={{
                background: "#161B22",
                borderRadius: "16px",
                padding: "24px",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "border-color 0.2s",
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

      {/* Main Content Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "24px",
        }}
        className="dashboard-grid"
      >
        {/* Chart Section */}
        <div
          style={{
            background: "#161B22",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h3 style={{ margin: 0, color: "#F0F6FC", fontSize: "1.1rem", fontWeight: 600 }}>
                Visualizações
              </h3>
              <p style={{ margin: "4px 0 0", color: "#8B949E", fontSize: "0.85rem" }}>
                Últimos 7 dias
              </p>
            </div>
            <select
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "8px 12px",
                color: "#C9D1D9",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              <option>7 dias</option>
              <option>30 dias</option>
              <option>90 dias</option>
            </select>
          </div>

          {/* Simple Bar Chart */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "200px" }}>
            {chartData.map((data, index) => (
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
                <div
                  style={{
                    width: "100%",
                    height: `${(data.views / maxViews) * 160}px`,
                    background: `linear-gradient(180deg, #00D4FF 0%, #7C3AED 100%)`,
                    borderRadius: "6px 6px 0 0",
                    transition: "height 0.3s ease",
                    minHeight: "20px",
                  }}
                />
                <span style={{ color: "#8B949E", fontSize: "0.75rem" }}>{data.day}</span>
              </div>
            ))}
          </div>

          {/* Chart Legend */}
          <div
            style={{
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p style={{ margin: 0, color: "#8B949E", fontSize: "0.8rem" }}>Total da semana</p>
              <p style={{ margin: "4px 0 0", color: "#F0F6FC", fontSize: "1.5rem", fontWeight: 700 }}>
                141.1K
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, color: "#8B949E", fontSize: "0.8rem" }}>Média diária</p>
              <p style={{ margin: "4px 0 0", color: "#F0F6FC", fontSize: "1.5rem", fontWeight: 700 }}>
                20.2K
              </p>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div
          style={{
            background: "#161B22",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3 style={{ margin: "0 0 20px", color: "#F0F6FC", fontSize: "1.1rem", fontWeight: 600 }}>
            Atividade Recente
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "12px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background:
                      activity.type === "milestone"
                        ? "#10B981"
                        : activity.type === "view"
                        ? "#00D4FF"
                        : "#7C3AED",
                    marginTop: "6px",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p style={{ margin: 0, color: "#C9D1D9", fontSize: "0.9rem", lineHeight: 1.5 }}>
                    {activity.message}
                  </p>
                  <p style={{ margin: "4px 0 0", color: "#8B949E", fontSize: "0.75rem" }}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Media Kits */}
      <div
        style={{
          marginTop: "24px",
          background: "#161B22",
          borderRadius: "16px",
          padding: "24px",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ margin: 0, color: "#F0F6FC", fontSize: "1.1rem", fontWeight: 600 }}>
            Seus Media Kits
          </h3>
          <a
            href="/dashboard/media-kits"
            style={{
              color: "#00D4FF",
              fontSize: "0.9rem",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Ver todos <Icons.ExternalLink />
          </a>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>Nome</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Visualizações</th>
                <th style={thStyle}>Última Edição</th>
                <th style={{ ...thStyle, width: "50px" }}></th>
              </tr>
            </thead>
            <tbody>
              {recentMediaKits.map((kit) => (
                <tr key={kit.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          background: "linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#00D4FF",
                        }}
                      >
                        <Icons.FileText />
                      </div>
                      <span style={{ color: "#F0F6FC", fontWeight: 500 }}>{kit.name}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "100px",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        background: kit.status === "Ativo" ? "rgba(16, 185, 129, 0.15)" : "rgba(139, 148, 158, 0.15)",
                        color: kit.status === "Ativo" ? "#10B981" : "#8B949E",
                      }}
                    >
                      {kit.status}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ color: "#C9D1D9" }}>{kit.views}</span>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ color: "#8B949E" }}>{kit.lastEdit}</span>
                  </td>
                  <td style={tdStyle}>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#8B949E",
                        cursor: "pointer",
                        padding: "8px",
                      }}
                    >
                      <Icons.MoreVertical />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "12px 16px",
  color: "#8B949E",
  fontSize: "0.8rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const tdStyle: React.CSSProperties = {
  padding: "16px",
  verticalAlign: "middle",
};
