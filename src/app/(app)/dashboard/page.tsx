"use client";

import React from "react";
import Link from "next/link";

// ============ ICONS ============
const Icons = {
  TrendingUp: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
      <polyline points="17,6 23,6 23,12" />
    </svg>
  ),
  TrendingDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" />
      <polyline points="17,18 23,18 23,12" />
    </svg>
  ),
  Eye: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  Heart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  Play: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="5,3 19,12 5,21 5,3" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  ),
  MoreHorizontal: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  ),
  ExternalLink: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
};

// ============ DATA ============
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
    label: "Engajamento",
    value: "4.8%",
    change: "-0.2%",
    positive: false,
    icon: Icons.Heart,
  },
  {
    label: "Vídeos",
    value: "156",
    change: "+3",
    positive: true,
    icon: Icons.Play,
  },
];

const recentActivity = [
  {
    type: "view",
    title: "Seu Media Kit foi visualizado",
    description: "Nike Brasil acessou seu Media Kit",
    time: "5 min atrás",
  },
  {
    type: "milestone",
    title: "Novo marco atingido! 🎉",
    description: "Você atingiu 45K inscritos",
    time: "2h atrás",
  },
  {
    type: "sync",
    title: "Métricas sincronizadas",
    description: "Dados do YouTube atualizados",
    time: "6h atrás",
  },
];

const mediaKits = [
  { name: "Media Kit Q4 2025", status: "active", views: 234, lastEdit: "2 dias" },
  { name: "Proposta Nike", status: "draft", views: 89, lastEdit: "1 semana" },
  { name: "Parceria Samsung", status: "active", views: 156, lastEdit: "3 dias" },
];

// Chart data
const chartData = [
  { day: "Seg", value: 45 },
  { day: "Ter", value: 62 },
  { day: "Qua", value: 55 },
  { day: "Qui", value: 78 },
  { day: "Sex", value: 95 },
  { day: "Sáb", value: 82 },
  { day: "Dom", value: 68 },
];

export default function DashboardPage() {
  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Welcome */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "4px" }}>
          Olá, Maná 👋
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Aqui está o resumo do seu canal nos últimos 30 dias.
        </p>
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "32px",
        }}
        className="metrics-grid"
      >
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div
              key={i}
              style={{
                padding: "20px",
                backgroundColor: "var(--bg-base)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--bg-surface)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-muted)",
                  }}
                >
                  <Icon />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: metric.positive ? "var(--success)" : "var(--error)",
                  }}
                >
                  {metric.positive ? <Icons.TrendingUp /> : <Icons.TrendingDown />}
                  {metric.change}
                </div>
              </div>
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "4px",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {metric.value}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                {metric.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
        }}
        className="main-grid"
      >
        {/* Chart */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "var(--bg-base)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "4px" }}>
                Visualizações
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Últimos 7 dias
              </p>
            </div>
            <select
              style={{
                padding: "8px 12px",
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                color: "var(--text-secondary)",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              <option>7 dias</option>
              <option>30 dias</option>
              <option>90 dias</option>
            </select>
          </div>

          {/* Simple Chart */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "180px" }}>
            {chartData.map((data, i) => (
              <div
                key={i}
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
                    height: `${(data.value / maxValue) * 140}px`,
                    background: "var(--brand-gradient)",
                    borderRadius: "var(--radius-sm)",
                    transition: "height 300ms ease",
                    minHeight: "20px",
                  }}
                />
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {data.day}
                </span>
              </div>
            ))}
          </div>

          {/* Chart Footer */}
          <div
            style={{
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "4px" }}>
                Total
              </div>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                485K
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "4px" }}>
                Média/dia
              </div>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                69.3K
              </div>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "var(--bg-base)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "20px" }}>
            Atividade Recente
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "12px",
                  backgroundColor: "var(--bg-surface)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor:
                      activity.type === "milestone"
                        ? "var(--success)"
                        : activity.type === "view"
                        ? "var(--brand-primary)"
                        : "var(--text-muted)",
                    marginTop: "6px",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 500, marginBottom: "2px" }}>
                    {activity.title}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {activity.description}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-dimmed)", marginTop: "4px" }}>
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Media Kits Table */}
      <div
        style={{
          marginTop: "24px",
          padding: "24px",
          backgroundColor: "var(--bg-base)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>Seus Media Kits</h3>
          <Link
            href="/dashboard/media-kits"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.85rem",
              color: "var(--brand-primary)",
              textDecoration: "none",
            }}
          >
            Ver todos
            <Icons.ArrowRight />
          </Link>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Nome</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Views</th>
              <th style={thStyle}>Última edição</th>
              <th style={{ ...thStyle, width: "50px" }}></th>
            </tr>
          </thead>
          <tbody>
            {mediaKits.map((kit, i) => (
              <tr key={i} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <td style={tdStyle}>
                  <span style={{ fontWeight: 500 }}>{kit.name}</span>
                </td>
                <td style={tdStyle}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      backgroundColor:
                        kit.status === "active"
                          ? "rgba(34, 197, 94, 0.15)"
                          : "rgba(113, 113, 122, 0.15)",
                      color: kit.status === "active" ? "var(--success)" : "var(--text-muted)",
                    }}
                  >
                    {kit.status === "active" ? "Ativo" : "Rascunho"}
                  </span>
                </td>
                <td style={tdStyle}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
                    {kit.views}
                  </span>
                </td>
                <td style={tdStyle}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    {kit.lastEdit}
                  </span>
                </td>
                <td style={tdStyle}>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                      padding: "4px",
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

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          .main-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
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
  padding: "12px 16px",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "var(--text-muted)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  borderBottom: "1px solid var(--border-subtle)",
};

const tdStyle: React.CSSProperties = {
  padding: "16px",
  fontSize: "0.9rem",
  color: "var(--text-primary)",
};

