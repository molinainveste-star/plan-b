"use client";

import React, { useState, useRef, useEffect } from "react";
import { MapPin, Link as LinkIcon, Youtube, Instagram, FileDown, RefreshCw, Pencil, Check, X } from "lucide-react";
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

    const handlePrint = () => {
        window.print();
    };

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

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                alignItems: "center",
                textAlign: "center",
                padding: "3rem 0",
            }}
        >
            {/* Avatar Section */}
            <div
                ref={avatarContainerRef}
                style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
            >
                <div
                    className="avatar-container no-print"
                    style={{
                        position: "relative",
                        width: "140px",
                        height: "140px",
                        borderRadius: "50%",
                        cursor: "pointer",
                    }}
                    onClick={!isEditingAvatar ? handleEditAvatarClick : undefined}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "6px solid var(--card)",
                            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
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
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: 0,
                                transition: "opacity 0.2s",
                                color: "white",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                        >
                            <Pencil size={24} />
                        </div>
                    )}
                </div>

                {/* Print Avatar (Static) */}
                <div
                    className="print-avatar"
                    style={{
                        display: "none",
                        width: "140px",
                        height: "140px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "6px solid #fff",
                        marginBottom: "1rem"
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
                            transform: "translateX(-50%) translateY(10px)",
                            zIndex: 50,
                            background: "var(--card)",
                            padding: "0.75rem",
                            display: "flex",
                            gap: "0.5rem",
                            alignItems: "center",
                            borderRadius: "1rem",
                            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.2)",
                            border: "1px solid var(--border)",
                            minWidth: "300px"
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
                                background: "var(--background)",
                                border: "none",
                                borderRadius: "0.5rem",
                                padding: "0.5rem",
                                outline: "none",
                                fontSize: "0.875rem",
                                color: "var(--foreground)"
                            }}
                        />
                        <button
                            onClick={handleSaveAvatar}
                            disabled={isSavingAvatar}
                            style={{
                                background: "var(--primary)",
                                color: "white",
                                border: "none",
                                borderRadius: "0.5rem",
                                width: "32px",
                                height: "32px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.2s"
                            }}
                        >
                            {isSavingAvatar ? <RefreshCw size={14} className="animate-spin" /> : <Check size={16} />}
                        </button>
                        <button
                            onClick={() => setIsEditingAvatar(false)}
                            style={{
                                background: "#eee",
                                color: "#666",
                                border: "none",
                                borderRadius: "0.5rem",
                                width: "32px",
                                height: "32px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer"
                            }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Info */}
            <div>
                <h1 style={{ fontSize: "3rem", marginBottom: "0.75rem", color: "var(--foreground)", letterSpacing: "-0.04em" }}>{name}</h1>
                <div
                    style={{
                        display: "flex",
                        gap: "1.25rem",
                        justifyContent: "center",
                        color: "var(--muted-foreground)",
                        fontSize: "0.9375rem",
                        marginBottom: "1.5rem",
                        fontWeight: 500,
                    }}
                >
                    <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <MapPin size={16} /> {location}
                    </span>
                    <span style={{ color: "var(--border)" }}>|</span>
                    <span style={{ color: "var(--primary)", fontWeight: 600 }}>{niche}</span>
                </div>
                <p
                    style={{
                        maxWidth: "640px",
                        margin: "0 auto",
                        lineHeight: "1.8",
                        color: "var(--muted-foreground)",
                        fontSize: "1.125rem",
                    }}
                >
                    {bio}
                </p>
            </div>

            {/* Socials & Actions */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                {socials.map((social) => (
                    <a
                        key={social.platform}
                        href={social.url}
                        className="glass-panel"
                        style={{
                            padding: "0.75rem 1.5rem",
                            borderRadius: "2rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            background: "var(--card)",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                        }}
                    >
                        {social.platform === "Instagram" && (
                            <Instagram size={18} style={{ color: "#E1306C" }} />
                        )}
                        {social.platform === "TikTok" && <span>TT</span>}
                        {social.platform === "YouTube" && (
                            <Youtube size={18} style={{ color: "#FF0000" }} />
                        )}
                        {social.handle}
                    </a>
                ))}

                <button
                    onClick={handlePrint}
                    className="glass-panel no-print"
                    style={{
                        padding: "0.75rem 1.5rem",
                        borderRadius: "2rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        background: "var(--background)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                    }}
                >
                    <FileDown size={18} /> Salvar em PDF
                </button>

                <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="glass-panel no-print"
                    style={{
                        padding: "0.75rem 1.5rem",
                        borderRadius: "2rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        cursor: isSyncing ? "not-allowed" : "pointer",
                        background: "var(--background)",
                        color: "var(--primary)",
                        border: "1px solid var(--primary)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                        opacity: isSyncing ? 0.7 : 1
                    }}
                >
                    <RefreshCw size={18} className={isSyncing ? "animate-spin" : ""} />
                    {isSyncing ? "Sincronizando..." : "Atualizar Dados"}
                </button>

                <button
                    className="glass-panel no-print"
                    style={{
                        padding: "0.75rem 1.5rem",
                        borderRadius: "2rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        background: "var(--primary)",
                        color: "white",
                        border: "none",
                        boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)",
                    }}
                >
                    <LinkIcon size={16} /> Contato para Parcerias
                </button>
            </div>
        </div>
    );
};
