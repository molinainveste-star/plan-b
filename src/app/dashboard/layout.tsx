"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Ícones como componentes simples
const Icons = {
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  ),
  FileText: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  ),
  Link: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  ),
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  BarChart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Bell: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Crown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
      <path d="M3 20h18" />
    </svg>
  ),
};

const navItems = [
  { href: "/dashboard", icon: Icons.Home, label: "Overview" },
  { href: "/dashboard/media-kits", icon: Icons.FileText, label: "Media Kits" },
  { href: "/dashboard/analytics", icon: Icons.BarChart, label: "Analytics" },
  { href: "/dashboard/conectar", icon: Icons.Link, label: "Canais" },
  { href: "/dashboard/configuracoes", icon: Icons.Settings, label: "Configurações" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0E14",
        display: "flex",
      }}
    >
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 40,
            display: "none",
          }}
          className="mobile-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          background: "#0D1117",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: sidebarOpen ? 0 : "-260px",
          zIndex: 50,
          transition: "left 0.3s ease",
        }}
        className="sidebar"
      >
        {/* Logo */}
        <div
          style={{
            padding: "24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              Provly
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: "#8B949E",
              cursor: "pointer",
              display: "none",
            }}
            className="close-sidebar"
          >
            <Icons.X />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href} style={{ marginBottom: "4px" }}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      textDecoration: "none",
                      color: isActive ? "#F0F6FC" : "#8B949E",
                      background: isActive
                        ? "linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)"
                        : "transparent",
                      border: isActive
                        ? "1px solid rgba(0, 212, 255, 0.2)"
                        : "1px solid transparent",
                      transition: "all 0.2s",
                      fontWeight: isActive ? 600 : 500,
                      fontSize: "0.95rem",
                    }}
                  >
                    <Icon />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Upgrade Card */}
        <div style={{ padding: "16px" }}>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <Icons.Crown />
              <span style={{ color: "#F0F6FC", fontWeight: 600, fontSize: "0.9rem" }}>
                Upgrade Pro
              </span>
            </div>
            <p style={{ color: "#8B949E", fontSize: "0.8rem", margin: "0 0 12px 0", lineHeight: 1.5 }}>
              Desbloqueie recursos ilimitados e analytics avançados.
            </p>
            <button
              style={{
                width: "100%",
                padding: "10px",
                background: "linear-gradient(135deg, #7C3AED 0%, #00D4FF 100%)",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              Ver Planos
            </button>
          </div>
        </div>

        {/* User Section */}
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              color: "#0D1117",
            }}
          >
            M
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, color: "#F0F6FC", fontWeight: 600, fontSize: "0.9rem" }}>
              Maná
            </p>
            <p style={{ margin: 0, color: "#8B949E", fontSize: "0.75rem" }}>
              Plano Gratuito
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: "260px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
        className="main-content"
      >
        {/* Header */}
        <header
          style={{
            height: "70px",
            background: "rgba(13, 17, 23, 0.8)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: "none",
                border: "none",
                color: "#8B949E",
                cursor: "pointer",
                display: "none",
              }}
              className="menu-button"
            >
              <Icons.Menu />
            </button>
            <h1 style={{ margin: 0, color: "#F0F6FC", fontSize: "1.25rem", fontWeight: 600 }}>
              {navItems.find((item) => item.href === pathname)?.label || "Dashboard"}
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Create Button */}
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
                border: "none",
                borderRadius: "10px",
                color: "#0D1117",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              <Icons.Plus />
              <span className="hide-mobile">Criar Media Kit</span>
            </button>

            {/* Notifications */}
            <button
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#8B949E",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Icons.Bell />
              <span
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  width: "8px",
                  height: "8px",
                  background: "#FF6B6B",
                  borderRadius: "50%",
                }}
              />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: "24px" }}>{children}</main>
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .sidebar {
            left: ${sidebarOpen ? "0" : "-260px"} !important;
          }
          .main-content {
            margin-left: 0 !important;
          }
          .menu-button {
            display: flex !important;
          }
          .close-sidebar {
            display: block !important;
          }
          .mobile-overlay {
            display: block !important;
          }
          .hide-mobile {
            display: none;
          }
        }
        @media (min-width: 769px) {
          .sidebar {
            left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
