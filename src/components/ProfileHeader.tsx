"use client";

import React, { useState, useRef, useEffect } from "react";
import { MapPin, Youtube, Instagram, FileDown, RefreshCw, Pencil, Check, X } from "lucide-react";
import { updateYouTubeMetrics, updateProfileAvatar } from "@/lib/actions";

interface ProfileHeaderProps {
    slug: string;
    name: string;
    bio: string;
    avatarUrl: string;
    location: string;
    niche: string;
    socials: { platform: string; handle: string; url: string }[];
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    slug,
    name,
    bio,
    avatarUrl: initialAvatarUrl,
    location,
    niche,
    socials,
}) => {
    const [isSyncing, setIsSyncing] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
    const [isEditingAvatar, setIsEditingAvatar] = useState(false);
    const [avatarInput, setAvatarInput] = useState("");
    const [isSavingAvatar, setIsSavingAvatar] = useState(false);
    const avatarContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (avatarContainerRef.current && !avatarContainerRef.current.contains(event.target as Node)) {
                setIsEditingAvatar(false);
            }
        };

        if (isEditingAvatar) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditingAvatar]);

    const handlePrint = () => window.print();

    const handleSync = async () => {
        const youtubeSocial = socials.find(s => s.platform === "YouTube");
        if (!youtubeSocial) return alert("Nenhum canal do YouTube conectado.");

        setIsSyncing(true);
        try {
            await updateYouTubeMetrics(slug, youtubeSocial.handle);
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Erro ao sincronizar dados.");
        } finally {
            setIsSyncing(false);
        }
    };

    const handleEditAvatarClick = () => {
        setAvatarInput(avatarUrl);
        setIsEditingAvatar(true);
    };

    const handleSaveAvatar = async () => {
        if (!avatarInput.trim()) return;
        setIsSavingAvatar(true);
        try {
            await updateProfileAvatar(slug, avatarInput);
            setAvatarUrl(avatarInput);
            setIsEditingAvatar(false);
        } catch (error) {
            console.error("Error saving avatar:", error);
            alert("Erro ao salvar a foto de perfil.");
        } finally {
            setIsSavingAvatar(false);
        }
    };

    const socialButtonStyle: React.CSSProperties = {
        padding: "var(--space-3) var(--space-4)",
        borderRadius: "var(--radius-md)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2)",
        fontSize: "var(--text-sm)",
        fontWeight: 500,
        background: "var(--card)",
        border: "1px solid var(--border)",
        color: "var(--foreground)",
        cursor: "pointer",
        transition: "all var(--transition-base)",
        textDecoration: "none",
    };

    const actionButtonStyle: React.CSSProperties = {
        ...socialButtonStyle,
        background: "var(--secondary)",
        border: "none",
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-6)",
                alignItems: "center",
                textAlign: "center",
                padding: "var(--space-8) 0",
                animation: "fadeInUp 0.5s ease forwards",
            }}
        >
            {/* Avatar Section */}
            <div
                ref={avatarContainerRef}
                style={{ 
                    position: "relative", 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    gap: "var(--space-4)" 
                }}
            >
                <div
                    className="avatar-container no-print"
                    style={{
                        position: "relative",
                        width: "120px",
                        height: "120px",
                        borderRadius: "var(--radius-full)",
                        cursor: "pointer",
                    }}
                    onClick={!isEditingAvatar ? handleEditAvatarClick : undefined}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "var(--radius-full)",
                            overflow: "hidden",
                            border: "4px solid var(--card)",
                            boxShadow: "var(--shadow-lg)",
                        }}
                    >
                        <img
                            src={avatarUrl}
                            alt={name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>

                    {/* Hover Edit Overlay */}
                    {!isEditingAvatar && (
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: "rgba(0,0,0,0.5)",
                                borderRadius: "var(--radius-full)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: 0,
                                transition: "opacity var(--transition-base)",
                                color: "white",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                        >
                            <Pencil size={20} />
                        </div>
                    )}
                </div>

                {/* Print Avatar (Static) */}
                <div
                    className="print-avatar"
                    style={{
                        display: "none",
                        width: "120px",
                        height: "120px",
                        borderRadius: "var(--radius-full)",
                        overflow: "hidden",
                        border: "4px solid var(--border)",
                    }}
                >
                    <img
                        src={avatarUrl}
                        alt={name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>

                {/* Avatar Edit Input Overlay */}
                {isEditingAvatar && (
                    <div
                        className="no-print"
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%) translateY(8px)",
                            zIndex: 50,
                            background: "var(--card)",
                            padding: "var(--space-3)",
                            display: "flex",
                            gap: "var(--space-2)",
                            alignItems: "center",
                            borderRadius: "var(--radius-lg)",
                            boxShadow: "var(--shadow-xl)",
                            border: "1px solid var(--border)",
                            minWidth: "320px",
                            animation: "fadeInScale 0.2s ease forwards",
                        }}
                    >
                        <input
                            type="text"
                            value={avatarInput}
                            onChange={(e) => setAvatarInput(e.target.value)}
                            placeholder="Cole o link da imagem..."
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveAvatar();
                                if (e.key === "Escape") setIsEditingAvatar(false);
                            }}
                            style={{
                                flex: 1,
                                background: "var(--secondary)",
                                border: "none",
                                borderRadius: "var(--radius-sm)",
                                padding: "var(--space-2) var(--space-3)",
                                outline: "none",
                                fontSize: "var(--text-sm)",
                                color: "var(--foreground)",
                            }}
                        />
                        <button
                            onClick={handleSaveAvatar}
                            disabled={isSavingAvatar}
                            style={{
                                background: "var(--primary)",
                                color: "white",
                                border: "none",
                                borderRadius: "var(--radius-sm)",
                                width: "32px",
                                height: "32px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all var(--transition-base)",
                            }}
                        >
                            {isSavingAvatar ? (
                                <RefreshCw size={14} className="animate-spin" />
                            ) : (
                                <Check size={16} />
                            )}
                        </button>
                        <button
                            onClick={() => setIsEditingAvatar(false)}
                            style={{
                                background: "var(--secondary)",
                                color: "var(--muted-foreground)",
                                border: "none",
                                borderRadius: "var(--radius-sm)",
                                width: "32px",
                                height: "32px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                            }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Info */}
            <div style={{ maxWidth: "640px" }}>
                <h1 style={{ 
                    fontSize: "clamp(var(--text-3xl), 5vw, var(--text-5xl))",
                    marginBottom: "var(--space-3)", 
                    color: "var(--foreground)", 
                    letterSpacing: "var(--tracking-tight)",
                    fontWeight: 700,
                }}>
                    {name}
                </h1>
                
                <div
                    style={{
                        display: "flex",
                        gap: "var(--space-4)",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "var(--muted-foreground)",
                        fontSize: "var(--text-sm)",
                        marginBottom: "var(--space-4)",
                        fontWeight: 500,
                        flexWrap: "wrap",
                    }}
                >
                    <span style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
                        <MapPin size={16} /> {location}
                    </span>
                    <span style={{ color: "var(--border)" }}>•</span>
                    <span 
                        style={{ 
                            color: "var(--primary)", 
                            fontWeight: 600,
                            background: "var(--primary-light)",
                            padding: "var(--space-1) var(--space-3)",
                            borderRadius: "var(--radius-full)",
                        }}
                    >
                        {niche}
                    </span>
                </div>
                
                <p
                    style={{
                        lineHeight: "var(--leading-relaxed)",
                        color: "var(--muted-foreground)",
                        fontSize: "var(--text-lg)",
                    }}
                >
                    {bio}
                </p>
            </div>

            {/* Socials & Actions */}
            <div style={{ 
                display: "flex", 
                gap: "var(--space-3)", 
                flexWrap: "wrap", 
                justifyContent: "center",
                marginTop: "var(--space-2)",
            }}>
                {socials.map((social) => (
                    <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={socialButtonStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--primary)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--border)";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        {social.platform === "Instagram" && (
                            <Instagram size={18} style={{ color: "#E1306C" }} />
                        )}
                        {social.platform === "TikTok" && (
                            <span style={{ fontWeight: 700 }}>TT</span>
                        )}
                        {social.platform === "YouTube" && (
                            <Youtube size={18} style={{ color: "#FF0000" }} />
                        )}
                        {social.handle}
                    </a>
                ))}

                <button
                    onClick={handlePrint}
                    className="no-print"
                    style={actionButtonStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--border)";
                        e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--secondary)";
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                >
                    <FileDown size={18} /> Salvar em PDF
                </button>

                <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="no-print"
                    style={{
                        ...actionButtonStyle,
                        background: "var(--primary-light)",
                        color: "var(--primary)",
                        opacity: isSyncing ? 0.7 : 1,
                        cursor: isSyncing ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                        if (!isSyncing) {
                            e.currentTarget.style.background = "var(--primary)";
                            e.currentTarget.style.color = "white";
                            e.currentTarget.style.transform = "translateY(-1px)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--primary-light)";
                        e.currentTarget.style.color = "var(--primary)";
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                >
                    <RefreshCw 
                        size={18} 
                        style={{ 
                            animation: isSyncing ? "spin 1s linear infinite" : "none" 
                        }} 
                    />
                    {isSyncing ? "Sincronizando..." : "Atualizar Dados"}
                </button>
            </div>
        </div>
    );
};
