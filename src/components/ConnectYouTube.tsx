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
        // Listener for Auth Changes (Redirect handling)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("🔐 Auth Event:", event);

            // On sign in (happens after redirect hash parse), check for token
            if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
                if (session?.provider_token) {
                    console.log("✅ Provider Token found!", session.provider_token.substring(0, 5) + "...");
                    handleVerification(session.provider_token);
                } else {
                    console.log("ℹ️ Session found but NO provider_token.");
                    // Check if we have hash but no token? 
                    if (window.location.hash.includes("access_token")) {
                        setDebugMsg("Hash present but token missing in session.");
                    }
                }
            }
        });

        // Fallback: Check manual session if event didn't trigger relevant state
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

    if (status === "success") {
        return (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg text-sm font-semibold border border-green-200">
                <BadgeCheck size={16} />
                Canal Verificado!
            </div>
        );
    }

    if (status === "verifying") {
        return (
            <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg text-sm font-semibold border border-blue-200">
                <Loader2 size={16} className="animate-spin" />
                Sincronizando...
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="flex flex-col gap-2">
                <button
                    onClick={handleLogin}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-bold rounded-full transition-all border border-red-200"
                >
                    <AlertCircle size={16} />
                    Tentar Novamente
                </button>
                {debugMsg && <span className="text-xs text-red-500">{debugMsg}</span>}
            </div>
        );
    }

    return (
        <button
            onClick={handleLogin}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105"
        >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Youtube size={14} />}
            Conectar Dados Oficiais
        </button>
    );
}
