"use client";

import React from "react";

// Ícones com stroke mais fino (estilo Linear/Vercel)
const Icons = {
  TrendingUp: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
      <polyline points="17,6 23,6 23,12" />
    </svg>
  ),
  TrendingDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" />
      <polyline points="17,18 23,18 23,12" />
    </svg>
  ),
  Eye: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  Play: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5,3 19,12 5,21 5,3" />
    </svg>
  ),
  Heart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  FileText: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  ),
  MoreHorizontal: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
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
  },
  {
    label: "Inscritos",
    value: "45.2K",
    change: "+8.3%",
    positive: true,
    icon: Icons.Users,
  },
  {
    label: "Vídeos",
    value: "156",
    change: "+3",
    positive: true,
    icon: Icons.Play,
  },
  {
    label: "Engajamento",
    value: "4.8%",
    change: "-0.2%",
    positive: false,
    icon: Icons.Heart,
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
    <div className="animate-fade-in">
      {/* Welcome Section */}
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ 
          margin: 0, 
          color: "var(--text-primary)", 
          fontSize: "1.5rem", 
          fontWeight: 600,
          letterSpacing: "-0.02em" 
        }}>
          Olá, Maná 👋
        </h2>
        <p style={{ margin: "6px 0 0", color: "var(--text-muted)", fontSize: "0.875rem" }}>
          Resumo do seu perfil nos últimos 30 dias.
        </p>
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
          marginBottom: "24px",
        }}
        className="metrics-grid"
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              style={{
                background: "var(--bg-elevated)",
                borderRadius: "var(--radius-lg)",
                padding: "16px",
                border: "1px solid var(--border-subtle)",
                transition: "all var(--transition-fast)",
              }}
              className="metric-card"
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ color: "var(--text-muted)" }}>
                  <Icon />
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    color: metric.positive ? "var(--success)" : "var(--error)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  {metric.positive ? <Icons.TrendingUp /> : <Icons.TrendingDown />}
                  {metric.change}
                </div>
              </div>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-primary)",
                  fontSize: "1.75rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "-0.02em",
                }}
              >
                {metric.value}
              </p>
              <p style={{ margin: "4px 0 0", color: "var(--text-muted)", fontSize: "0.75rem" }}>
                {metric.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "16px",
        }}
        className="dashboard-grid"
      >
        {/* Chart Section */}
        <div
          style={{
            background: "var(--bg-elevated)",
            borderRadius: "var(--radius-lg)",
            padding: "20px",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h3 style={{ margin: 0, color: "var(--text-primary)", fontSize: "0.875rem", fontWeight: 500 }}>
                Visualizações
              </h3>
              <p style={{ margin: "2px 0 0", color: "var(--text-muted)", fontSize: "0.75rem" }}>
                Últimos 7 dias
              </p>
            </div>
            <select
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-sm)",
                padding: "6px 10px",
                color: "var(--text-secondary)",
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              <option>7 dias</option>
              <option>30 dias</option>
              <option>90 dias</option>
            </select>
          </div>

          {/* Simple Bar Chart */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "160px" }}>
            {chartData.map((data, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: `${(data.views / maxViews) * 130}px`,
                    background: "var(--brand-primary)",
                    borderRadius: "4px 4px 0 0",
                    transition: "height var(--transition-base)",
                    minHeight: "16px",
                    opacity: 0.85,
                  }}
                  className="chart-bar"
                />
                <span style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}>{data.day}</span>
              </div>
            ))}
          </div>

          {/* Chart Legend */}
          <div
            style={{
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.7rem" }}>Total da semana</p>
              <p style={{ margin: "2px 0 0", color: "var(--text-primary)", fontSize: "1.25rem", fontWeight: 600, fontFamily: "var(--font-mono)" }}>
                141.1K
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.7rem" }}>Média diária</p>
              <p style={{ margin: "2px 0 0", color: "var(--text-primary)", fontSize: "1.25rem", fontWeight: 600, fontFamily: "var(--font-mono)" }}>
                20.2K
              </p>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div
          style={{
            background: "var(--bg-elevated)",
            borderRadius: "var(--radius-lg)",
            padding: "20px",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <h3 style={{ margin: "0 0 16px", color: "var(--text-primary)", fontSize: "0.875rem", fontWeight: 500 }}>
            Atividade Recente
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "10px",
                  background: "var(--bg-surface)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background:
                      activity.type === "milestone"
                        ? "var(--success)"
                        : activity.type === "view"
                        ? "var(--brand-primary)"
                        : "var(--brand-secondary)",
                    marginTop: "6px",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.8rem", lineHeight: 1.4 }}>
                    {activity.message}
                  </p>
                  <p style={{ margin: "3px 0 0", color: "var(--text-muted)", fontSize: "0.7rem" }}>
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
          marginTop: "16px",
          background: "var(--bg-elevated)",
          borderRadius: "var(--radius-lg)",
          padding: "20px",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, color: "var(--text-primary)", fontSize: "0.875rem", fontWeight: 500 }}>
            Seus Media Kits
          </h3>
          <a
            href="/dashboard/media-kits"
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.75rem",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              transition: "color var(--transition-fast)",
            }}
          >
            Ver todos <Icons.ArrowRight />
          </a>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>Nome</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Views</th>
                <th style={thStyle}>Editado</th>
                <th style={{ ...thStyle, width: "40px" }}></th>
              </tr>
            </thead>
            <tbody>
              {recentMediaKits.map((kit) => (
                <tr key={kit.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "var(--radius-md)",
                          background: "var(--bg-surface)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-muted)",
                        }}
                      >
                        <Icons.FileText />
                      </div>
                      <span style={{ color: "var(--text-primary)", fontWeight: 500, fontSize: "0.8rem" }}>{kit.name}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "var(--radius-full)",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        background: kit.status === "Ativo" ? "rgba(34, 197, 94, 0.15)" : "var(--bg-surface)",
                        color: kit.status === "Ativo" ? "var(--success)" : "var(--text-muted)",
                      }}
                    >
                      {kit.status}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>{kit.views}</span>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>{kit.lastEdit}</span>
                  </td>
                  <td style={tdStyle}>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        padding: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icons.MoreHorizontal />
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
        .metric-card:hover {
          border-color: var(--border-default);
        }
        .chart-bar:hover {
          opacity: 1 !important;
        }
        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .metrics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 12px",
  color: "var(--text-muted)",
  fontSize: "0.7rem",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  verticalAlign: "middle",
};
