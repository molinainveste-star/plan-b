"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SocialPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);
    const [socialTokens, setSocialTokens] = useState<any[]>([]);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [connectingYouTube, setConnectingYouTube] = useState(false);
    const [youtubeChannelId, setYoutubeChannelId] = useState("");

    useEffect(() => {
        loadData();
        
        // Check for callback messages
        const success = searchParams.get("success");
        const error = searchParams.get("error");
        
        if (success === "tiktok") {
            setMessage({ type: "success", text: "TikTok conectado com sucesso!" });
        } else if (error) {
            setMessage({ type: "error", text: `Erro ao conectar: ${error}` });
        }
    }, [searchParams]);

    async function loadData() {
        const supabase = createClient();
        
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push("/login");
            return;
        }

        const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("user_id", user.id)
            .single();

        const { data: tokens } = await supabase
            .from("social_tokens")
            .select("*")
            .eq("profile_id", profileData?.id);

        setProfile(profileData);
        setSocialTokens(tokens || []);
        setYoutubeChannelId(profileData?.youtube_channel_id || "");
        setLoading(false);
    }

    async function connectYouTube() {
        if (!youtubeChannelId.trim()) {
            setMessage({ type: "error", text: "Digite o ID do canal do YouTube" });
            return;
        }

        setConnectingYouTube(true);
        setMessage(null);

        try {
            const response = await fetch("/api/youtube/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    profileId: profile.id,
                    channelId: youtubeChannelId.trim(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao conectar YouTube");
            }

            setMessage({ type: "success", text: "YouTube conectado e sincronizado!" });
            loadData();
        } catch (err: any) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setConnectingYouTube(false);
        }
    }

    async function disconnectPlatform(provider: string) {
        const supabase = createClient();
        
        if (provider === "youtube") {
            await supabase
                .from("profiles")
                .update({ youtube_channel_id: null })
                .eq("id", profile.id);
        } else {
            await supabase
                .from("social_tokens")
                .delete()
                .eq("profile_id", profile.id)
                .eq("provider", provider);
        }

        setMessage({ type: "success", text: `${provider} desconectado` });
        loadData();
    }

    function connectTikTok() {
        // Redirect to TikTok OAuth
        const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY;
        const redirectUri = `${window.location.origin}/api/auth/tiktok/callback`;
        const scope = "user.info.basic,user.info.stats,video.list";
        const state = profile?.id; // Use profile ID as state for verification
        
        const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&response_type=code&scope=${scope}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
        
        window.location.href = authUrl;
    }

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
                <div style={{ color: "#fff", fontSize: "1.2rem" }}>Carregando...</div>
            </div>
        );
    }

    const hasYouTube = !!profile?.youtube_channel_id;
    const tiktokToken = socialTokens.find(t => t.provider === "tiktok");
    const instagramToken = socialTokens.find(t => t.provider === "instagram");

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ marginBottom: "2rem" }}>
                <h1 style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "0.5rem",
                }}>
                    Redes Sociais
                </h1>
                <p style={{ color: "#94a3b8" }}>
                    Conecte suas redes para exibir métricas no seu Media Kit
                </p>
            </div>

            {/* Messages */}
            {message && (
                <div style={{
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    background: message.type === "success" 
                        ? "rgba(16, 185, 129, 0.1)" 
                        : "rgba(239, 68, 68, 0.1)",
                    border: `1px solid ${message.type === "success" 
                        ? "rgba(16, 185, 129, 0.3)" 
                        : "rgba(239, 68, 68, 0.3)"}`,
                    color: message.type === "success" ? "#10b981" : "#ef4444",
                }}>
                    {message.text}
                </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* YouTube */}
                <PlatformCard
                    name="YouTube"
                    icon="📺"
                    color="#FF0000"
                    connected={hasYouTube}
                    username={profile?.youtube_channel_id}
                    onDisconnect={() => disconnectPlatform("youtube")}
                >
                    {!hasYouTube && (
                        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                            <input
                                type="text"
                                value={youtubeChannelId}
                                onChange={(e) => setYoutubeChannelId(e.target.value)}
                                placeholder="ID do Canal (ex: UC...)"
                                style={{
                                    flex: 1,
                                    padding: "0.75rem 1rem",
                                    background: "rgba(0, 0, 0, 0.3)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    borderRadius: "0.5rem",
                                    color: "#fff",
                                    fontSize: "0.9rem",
                                }}
                            />
                            <button
                                onClick={connectYouTube}
                                disabled={connectingYouTube}
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    background: "#FF0000",
                                    border: "none",
                                    borderRadius: "0.5rem",
                                    color: "#fff",
                                    fontWeight: 600,
                                    cursor: connectingYouTube ? "not-allowed" : "pointer",
                                    opacity: connectingYouTube ? 0.7 : 1,
                                }}
                            >
                                {connectingYouTube ? "Conectando..." : "Conectar"}
                            </button>
                        </div>
                    )}
                </PlatformCard>

                {/* TikTok */}
                <PlatformCard
                    name="TikTok"
                    icon="🎵"
                    color="#00F2EA"
                    connected={!!tiktokToken}
                    username={tiktokToken?.provider_username}
                    onDisconnect={() => disconnectPlatform("tiktok")}
                >
                    {!tiktokToken && (
                        <button
                            onClick={connectTikTok}
                            style={{
                                marginTop: "1rem",
                                padding: "0.75rem 1.5rem",
                                background: "linear-gradient(135deg, #00F2EA, #FF0050)",
                                border: "none",
                                borderRadius: "0.5rem",
                                color: "#fff",
                                fontWeight: 600,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                            }}
                        >
                            <span>🎵</span>
                            Conectar com TikTok
                        </button>
                    )}
                </PlatformCard>

                {/* Instagram */}
                <PlatformCard
                    name="Instagram"
                    icon="📸"
                    color="#E4405F"
                    connected={!!instagramToken}
                    username={instagramToken?.provider_username}
                    onDisconnect={() => disconnectPlatform("instagram")}
                    comingSoon={!instagramToken}
                >
                    {!instagramToken && (
                        <div style={{
                            marginTop: "1rem",
                            padding: "0.75rem 1rem",
                            background: "rgba(228, 64, 95, 0.1)",
                            border: "1px solid rgba(228, 64, 95, 0.3)",
                            borderRadius: "0.5rem",
                            color: "#94a3b8",
                            fontSize: "0.875rem",
                        }}>
                            🚧 Integração com Instagram em breve
                        </div>
                    )}
                </PlatformCard>
            </div>

            {/* Help Section */}
            <div style={{
                marginTop: "3rem",
                padding: "1.5rem",
                background: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "1rem",
            }}>
                <h3 style={{ color: "#fff", marginBottom: "1rem" }}>
                    💡 Como encontrar o ID do canal do YouTube?
                </h3>
                <ol style={{ color: "#94a3b8", paddingLeft: "1.5rem", lineHeight: 1.8 }}>
                    <li>Acesse o YouTube Studio</li>
                    <li>Clique em &quot;Configurações&quot; → &quot;Canal&quot; → &quot;Informações básicas&quot;</li>
                    <li>Copie o &quot;ID do canal&quot; (começa com UC...)</li>
                </ol>
            </div>
        </div>
    );
}

function PlatformCard({
    name,
    icon,
    color,
    connected,
    username,
    onDisconnect,
    comingSoon,
    children,
}: {
    name: string;
    icon: string;
    color: string;
    connected: boolean;
    username?: string;
    onDisconnect: () => void;
    comingSoon?: boolean;
    children?: React.ReactNode;
}) {
    return (
        <div style={{
            background: "rgba(30, 30, 46, 0.6)",
            border: `1px solid ${connected ? `${color}40` : "rgba(255, 255, 255, 0.1)"}`,
            borderRadius: "1rem",
            padding: "1.5rem",
            backdropFilter: "blur(10px)",
        }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: `${color}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                    }}>
                        {icon}
                    </div>
                    <div>
                        <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 600 }}>
                            {name}
                        </h3>
                        {connected ? (
                            <span style={{ color: "#10b981", fontSize: "0.875rem" }}>
                                ✓ Conectado {username && `(@${username})`}
                            </span>
                        ) : (
                            <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                                Não conectado
                            </span>
                        )}
                    </div>
                </div>

                {connected && (
                    <button
                        onClick={onDisconnect}
                        style={{
                            padding: "0.5rem 1rem",
                            background: "rgba(239, 68, 68, 0.1)",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            borderRadius: "0.5rem",
                            color: "#ef4444",
                            fontSize: "0.875rem",
                            cursor: "pointer",
                        }}
                    >
                        Desconectar
                    </button>
                )}
            </div>

            {children}
        </div>
    );
}

export default function SocialPage() {
    return (
        <Suspense fallback={
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
                <div style={{ color: "#fff", fontSize: "1.2rem" }}>Carregando...</div>
            </div>
        }>
            <SocialPageContent />
        </Suspense>
    );
}

