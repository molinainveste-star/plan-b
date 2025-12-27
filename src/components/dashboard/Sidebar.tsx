"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
    profile: any;
}

const navItems = [
    { href: "/dashboard", label: "Visão Geral", icon: "🏠" },
    { href: "/dashboard/profile", label: "Meu Perfil", icon: "👤" },
    { href: "/dashboard/social", label: "Redes Sociais", icon: "🔗" },
    { href: "/dashboard/cases", label: "Parcerias", icon: "🤝" },
    { href: "/dashboard/pricing", label: "Pacotes", icon: "💰" },
];

export function DashboardSidebar({ profile }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside style={{
            width: "280px",
            background: "rgba(20, 20, 30, 0.95)",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            flexDirection: "column",
            backdropFilter: "blur(20px)",
        }}>
            {/* Logo */}
            <div style={{
                padding: "1.5rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}>
                <Link href="/" style={{ textDecoration: "none" }}>
                    <h1 style={{
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "#fff",
                    }}>
                        Publi<span style={{ color: "#8b5cf6" }}>Score</span>
                    </h1>
                </Link>
            </div>

            {/* Profile Preview */}
            {profile && (
                <div style={{
                    padding: "1.5rem",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            background: profile.avatar_url 
                                ? `url(${profile.avatar_url}) center/cover`
                                : "linear-gradient(135deg, #8b5cf6, #6366f1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "1.2rem",
                        }}>
                            {!profile.avatar_url && (profile.full_name?.[0] || "?")}
                        </div>
                        <div>
                            <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem" }}>
                                {profile.full_name || "Criador"}
                            </div>
                            <div style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                                @{profile.username || "username"}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav style={{ flex: 1, padding: "1rem 0" }}>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                padding: "0.875rem 1.5rem",
                                color: isActive ? "#fff" : "#94a3b8",
                                textDecoration: "none",
                                fontSize: "0.95rem",
                                fontWeight: isActive ? 600 : 400,
                                background: isActive 
                                    ? "linear-gradient(90deg, rgba(139, 92, 246, 0.2), transparent)"
                                    : "transparent",
                                borderLeft: isActive 
                                    ? "3px solid #8b5cf6" 
                                    : "3px solid transparent",
                                transition: "all 0.2s",
                            }}
                        >
                            <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Media Kit Link */}
            {profile?.username && (
                <div style={{
                    padding: "1.5rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                }}>
                    <Link
                        href={`/${profile.username}`}
                        target="_blank"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            padding: "0.75rem",
                            background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                            color: "#fff",
                            borderRadius: "0.5rem",
                            textDecoration: "none",
                            fontWeight: 500,
                            fontSize: "0.875rem",
                        }}
                    >
                        <span>📊</span>
                        Ver Meu Media Kit
                        <span>↗</span>
                    </Link>
                </div>
            )}
        </aside>
    );
}

