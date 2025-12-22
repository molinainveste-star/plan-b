"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { fetchDemographicsFromYouTube } from "@/lib/actions";
import { BadgeCheck, Loader2, Youtube, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface ConnectYouTubeProps {
    slug: string;
    onSuccess?: () => void;
}

export function ConnectYouTube({ slug, onSuccess }: ConnectYouTubeProps) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
    const [debugMsg, setDebugMsg] = useState("");
    const router = useRouter();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("🔐 Auth Event:", event);

            if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
                if (session?.provider_token) {
                    console.log("✅ Provider Token found!");
                    handleVerification(session.provider_token);
                } else {
                    console.log("ℹ️ Session found but NO provider_token.");
                    if (window.location.hash.includes("access_token")) {
                        setDebugMsg("Hash present but token missing in session.");
                    }
                }
            }
        });

        const checkManual = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.provider_token) {
                handleVerification(session.provider_token);
            }
        }
        checkManual();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                    scopes: "https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/youtube.readonly",
                    redirectTo: window.location.href,
                },
            });
            if (error) throw error;
        } catch (err) {
            console.error("Login Error:", err);
            setLoading(false);
            setStatus("error");
        }
    };

    const handleVerification = async (token: string) => {
        if (status === "verifying" || status === "success") return;

        setStatus("verifying");
        try {
            console.log("🚀 Verifying with backend...");
            const result = await fetchDemographicsFromYouTube(slug, token);
            console.log("📡 Backend result:", result);

            if (result.success) {
                setStatus("success");
                if (onSuccess) onSuccess();
                router.refresh();
            } else {
                console.error("❌ Verification failed:", result.error);
                setStatus("error");
                setDebugMsg(result.error || "Unknown error");
            }
        } catch (error) {
            console.error("❌ Verification exception:", error);
            setStatus("error");
        }
    };

    const baseButtonStyle: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: "var(--space-2) var(--space-4)",
        borderRadius: "var(--radius-full)",
        fontSize: "var(--text-sm)",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all var(--transition-base)",
        border: "none",
    };

    if (status === "success") {
        return (
            <div 
                style={{
                    ...baseButtonStyle,
                    background: "var(--success-light)",
                    color: "var(--success)",
                    cursor: "default",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                }}
            >
                <BadgeCheck size={16} />
                Canal Verificado!
            </div>
        );
    }

    if (status === "verifying") {
        return (
            <div 
                style={{
                    ...baseButtonStyle,
                    background: "var(--primary-light)",
                    color: "var(--primary)",
                    cursor: "default",
                    border: "1px solid rgba(67, 97, 238, 0.2)",
                }}
            >
                <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                Sincronizando...
            </div>
        );
    }

    if (status === "error") {
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                <button
                    onClick={handleLogin}
                    style={{
                        ...baseButtonStyle,
                        background: "rgba(239, 68, 68, 0.1)",
                        color: "var(--error)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                    }}
                >
                    <AlertCircle size={16} />
                    Tentar Novamente
                </button>
                {debugMsg && (
                    <span style={{ 
                        fontSize: "var(--text-xs)", 
                        color: "var(--error)",
                        opacity: 0.8,
                    }}>
                        {debugMsg}
                    </span>
                )}
            </div>
        );
    }

    return (
        <button
            onClick={handleLogin}
            disabled={loading}
            style={{
                ...baseButtonStyle,
                background: "#FF0000",
                color: "white",
                boxShadow: "0 4px 12px rgba(255, 0, 0, 0.25)",
                opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
                if (!loading) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 6px 16px rgba(255, 0, 0, 0.35)";
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 0, 0, 0.25)";
            }}
        >
            {loading ? (
                <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
            ) : (
                <Youtube size={14} />
            )}
            Conectar Dados Oficiais
        </button>
    );
}
