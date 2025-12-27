"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

interface HeaderProps {
    user: any;
    profile: any;
}

export function DashboardHeader({ user, profile }: HeaderProps) {
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);

    async function handleLogout() {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    }

    return (
        <header style={{
            padding: "1rem 2rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(20, 20, 30, 0.5)",
            backdropFilter: "blur(10px)",
        }}>
            {/* Breadcrumb / Title */}
            <div>
                <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                    Dashboard
                </span>
            </div>

            {/* User Menu */}
            <div style={{ position: "relative" }}>
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.5rem 1rem",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "9999px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                    }}
                >
                    <div style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: profile?.avatar_url 
                            ? `url(${profile.avatar_url}) center/cover`
                            : "linear-gradient(135deg, #8b5cf6, #6366f1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                    }}>
                        {!profile?.avatar_url && (profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || "?")}
                    </div>
                    <span style={{ color: "#fff", fontSize: "0.875rem" }}>
                        {profile?.full_name?.split(" ")[0] || user?.email?.split("@")[0]}
                    </span>
                    <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>▼</span>
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                    <>
                        {/* Backdrop to close menu */}
                        <div 
                            onClick={() => setShowMenu(false)}
                            style={{
                                position: "fixed",
                                inset: 0,
                                zIndex: 40,
                            }}
                        />
                        
                        <div style={{
                            position: "absolute",
                            top: "calc(100% + 0.5rem)",
                            right: 0,
                            minWidth: "200px",
                            background: "rgba(30, 30, 46, 0.98)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "0.75rem",
                            overflow: "hidden",
                            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                            zIndex: 50,
                        }}>
                            <div style={{
                                padding: "1rem",
                                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                            }}>
                                <div style={{ color: "#fff", fontWeight: 500, fontSize: "0.9rem" }}>
                                    {profile?.full_name || "Criador"}
                                </div>
                                <div style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                                    {user?.email}
                                </div>
                            </div>

                            <div style={{ padding: "0.5rem" }}>
                                <button
                                    onClick={() => {
                                        setShowMenu(false);
                                        router.push("/dashboard/profile");
                                    }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                        width: "100%",
                                        padding: "0.75rem",
                                        background: "transparent",
                                        border: "none",
                                        borderRadius: "0.5rem",
                                        color: "#94a3b8",
                                        fontSize: "0.875rem",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                                        e.currentTarget.style.color = "#fff";
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.color = "#94a3b8";
                                    }}
                                >
                                    <span>⚙️</span>
                                    Configurações
                                </button>

                                <button
                                    onClick={handleLogout}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                        width: "100%",
                                        padding: "0.75rem",
                                        background: "transparent",
                                        border: "none",
                                        borderRadius: "0.5rem",
                                        color: "#ef4444",
                                        fontSize: "0.875rem",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = "transparent";
                                    }}
                                >
                                    <span>🚪</span>
                                    Sair
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}

