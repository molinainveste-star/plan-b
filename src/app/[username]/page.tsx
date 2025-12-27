"use client";

import React from "react";
import Link from "next/link";

// ============ ICONS ============
const Icons = {
  YouTube: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  TikTok: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
  MapPin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Mail: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Download: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21 5,3" />
    </svg>
  ),
  ExternalLink: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Verified: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--brand-primary)">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.2L12 14l-4.8 2.5.9-5.2L4.3 7.6l5.3-.8L12 2z" fill="var(--brand-primary)" />
    </svg>
  ),
};

// ============ MOCK DATA ============
const creatorData = {
  name: "Manassés Tech",
  username: "@manatech",
  avatar: "M",
  verified: true,
  location: "São Paulo, BR",
  email: "contato@manatech.com.br",
  bio: "Criador de conteúdo focado em tecnologia, produtividade e empreendedorismo digital. Ajudando milhares de pessoas a dominarem as ferramentas que impulsionam resultados.",
  socials: [
    { platform: "youtube", url: "https://youtube.com/@manatech", followers: "45.2K" },
    { platform: "instagram", url: "https://instagram.com/manatech", followers: "12.8K" },
    { platform: "tiktok", url: "https://tiktok.com/@manatech", followers: "8.5K" },
  ],
  metrics: {
    views: "1.2M",
    subscribers: "45.2K",
    engagement: "4.8%",
    videos: "156",
  },
  topContent: [
    {
      title: "Como criar um Media Kit PROFISSIONAL",
      views: "245K",
      thumbnail: null,
      duration: "15:42",
    },
    {
      title: "5 Dicas para FECHAR PARCERIAS",
      views: "189K",
      thumbnail: null,
      duration: "12:30",
    },
    {
      title: "Review iPhone 15 Pro Max",
      views: "156K",
      thumbnail: null,
      duration: "20:15",
    },
  ],
  demographics: {
    countries: [
      { name: "Brasil", percentage: 72, flag: "🇧🇷" },
      { name: "Portugal", percentage: 12, flag: "🇵🇹" },
      { name: "EUA", percentage: 8, flag: "🇺🇸" },
      { name: "Outros", percentage: 8, flag: "🌍" },
    ],
    ages: [
      { range: "18-24", percentage: 35 },
      { range: "25-34", percentage: 38 },
      { range: "35-44", percentage: 15 },
      { range: "45+", percentage: 12 },
    ],
    gender: { male: 68, female: 30, other: 2 },
  },
  categories: ["Tech", "Produtividade", "Empreendedorismo"],
};

export default function CreatorProfilePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-void)",
        color: "var(--text-primary)",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "var(--bg-base)",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            className="gradient-text"
            style={{ fontSize: "1.25rem", fontWeight: 800 }}
          >
            Provly
          </span>
        </Link>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: "var(--brand-gradient)",
            border: "none",
            borderRadius: "var(--radius-md)",
            color: "var(--bg-void)",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Icons.Download />
          Download PDF
        </button>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 24px" }}>
        {/* Profile Header */}
        <section
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "32px",
            marginBottom: "48px",
          }}
          className="profile-header"
        >
          {/* Avatar */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "var(--radius-xl)",
              background: "var(--brand-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3rem",
              fontWeight: 800,
              color: "var(--bg-void)",
              flexShrink: 0,
            }}
          >
            {creatorData.avatar}
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>
                {creatorData.name}
              </h1>
              {creatorData.verified && <Icons.Verified />}
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: "16px" }}>
              {creatorData.username}
            </p>

            {/* Location & Email */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                <Icons.MapPin />
                {creatorData.location}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                <Icons.Mail />
                {creatorData.email}
              </div>
            </div>

            {/* Social Links */}
            <div style={{ display: "flex", gap: "12px" }}>
              {creatorData.socials.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    backgroundColor: "var(--bg-surface)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    transition: "all 150ms",
                  }}
                >
                  {social.platform === "youtube" && <Icons.YouTube />}
                  {social.platform === "instagram" && <Icons.Instagram />}
                  {social.platform === "tiktok" && <Icons.TikTok />}
                  {social.followers}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics Grid */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "48px",
          }}
          className="metrics-grid"
        >
          {[
            { label: "Visualizações", value: creatorData.metrics.views, icon: Icons.Eye },
            { label: "Inscritos", value: creatorData.metrics.subscribers, icon: Icons.Users },
            { label: "Engajamento", value: creatorData.metrics.engagement, icon: Icons.Heart },
            { label: "Vídeos", value: creatorData.metrics.videos, icon: Icons.Play },
          ].map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div
                key={i}
                style={{
                  padding: "24px",
                  backgroundColor: "var(--bg-base)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-subtle)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "rgba(0, 212, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--brand-primary)",
                    margin: "0 auto 12px",
                  }}
                >
                  <Icon />
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
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
        </section>

        {/* Bio Section */}
        <section
          style={{
            padding: "32px",
            backgroundColor: "var(--bg-base)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-subtle)",
            marginBottom: "32px",
          }}
        >
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "16px" }}>
            Sobre
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "1rem" }}>
            {creatorData.bio}
          </p>
          <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
            {creatorData.categories.map((cat, i) => (
              <span
                key={i}
                style={{
                  padding: "6px 14px",
                  backgroundColor: "var(--bg-surface)",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </section>

        {/* Top Content */}
        <section
          style={{
            padding: "32px",
            backgroundColor: "var(--bg-base)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-subtle)",
            marginBottom: "32px",
          }}
        >
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "20px" }}>
            Top Conteúdos
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {creatorData.topContent.map((content, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px",
                  backgroundColor: "var(--bg-surface)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: "120px",
                    height: "68px",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "var(--bg-hover)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-dimmed)",
                    flexShrink: 0,
                  }}
                >
                  <Icons.Play />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 500, marginBottom: "4px" }}>
                    {content.title}
                  </h4>
                  <div style={{ display: "flex", gap: "16px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    <span>{content.views} views</span>
                    <span>{content.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Demographics */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginBottom: "32px",
          }}
          className="demographics-grid"
        >
          {/* Countries */}
          <div
            style={{
              padding: "32px",
              backgroundColor: "var(--bg-base)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "20px" }}>
              Audiência por País
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {creatorData.demographics.countries.map((country, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.9rem" }}>
                      {country.flag} {country.name}
                    </span>
                    <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                      {country.percentage}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "6px",
                      backgroundColor: "var(--bg-surface)",
                      borderRadius: "var(--radius-full)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${country.percentage}%`,
                        background: i === 0 ? "var(--brand-gradient)" : "var(--bg-hover)",
                        borderRadius: "var(--radius-full)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Age Distribution */}
          <div
            style={{
              padding: "32px",
              backgroundColor: "var(--bg-base)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "20px" }}>
              Faixa Etária
            </h2>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", height: "140px" }}>
              {creatorData.demographics.ages.map((age, i) => (
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
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {age.percentage}%
                  </span>
                  <div
                    style={{
                      width: "100%",
                      height: `${age.percentage * 2.5}px`,
                      background: "var(--brand-gradient)",
                      borderRadius: "var(--radius-sm)",
                      minHeight: "20px",
                    }}
                  />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {age.range}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: "48px",
            background: "linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-subtle)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "12px" }}>
            Interessado em uma parceria?
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
            Entre em contato para discutir oportunidades de colaboração.
          </p>
          <a
            href={`mailto:${creatorData.email}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              background: "var(--brand-gradient)",
              borderRadius: "var(--radius-md)",
              color: "var(--bg-void)",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <Icons.Mail />
            Entrar em contato
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "24px",
          textAlign: "center",
          borderTop: "1px solid var(--border-subtle)",
          marginTop: "48px",
        }}
      >
        <p style={{ color: "var(--text-dimmed)", fontSize: "0.85rem" }}>
          Criado com{" "}
          <Link href="/" style={{ color: "var(--brand-primary)", textDecoration: "none" }}>
            Provly
          </Link>
        </p>
      </footer>

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .demographics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

