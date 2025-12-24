"use client";

import React, { useState, useRef, useEffect } from "react";
import { MapPin, Youtube, Instagram, FileDown, RefreshCw, Pencil, Check, X, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { updateYouTubeMetrics, updateProfileAvatar } from "@/lib/actions";
import { downloadMediaKitPDF, MediaKitData } from "@/components/MediaKitPDF";
import { usePdf } from "@/contexts/PdfContext";

interface ProfileHeaderProps {
    slug: string;
    name: string;
    bio: string;
    avatarUrl: string;
    location: string;
    niche: string;
    socials: { platform: string; handle: string; url: string }[];
    // Dados extras para o PDF
    pdfData?: {
        metrics: Array<{ label: string; value: string; trend?: string }>;
        demographics?: {
            age: Array<{ label: string; value: number }>;
            gender: { female: number; male: number };
            countries: string[];
        };
        story?: string;
        pricing?: Array<{ name: string; price: string; features: string[]; popular?: boolean }>;
        cases?: Array<{ brand: string; title: string; description: string; metrics: string[] }>;
        featuredVideos?: Array<{ title: string; views: string; likes: string; videoId: string }>;
    };
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    slug,
    name,
    bio,
    avatarUrl: initialAvatarUrl,
    location,
    niche,
    socials,
    pdfData,
}) => {
    const [isSyncing, setIsSyncing] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
    const [isEditingAvatar, setIsEditingAvatar] = useState(false);
    const [avatarInput, setAvatarInput] = useState("");
    const [isSavingAvatar, setIsSavingAvatar] = useState(false);
    const [isBioExpanded, setIsBioExpanded] = useState(false);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const avatarContainerRef = useRef<HTMLDivElement>(null);
    const { setData: setPdfData } = usePdf();

    // Seta os dados do PDF no contexto
    useEffect(() => {
        const data: MediaKitData = {
            name,
            bio,
            avatarUrl,
            location,
            niche,
            metrics: pdfData?.metrics || [],
            demographics: pdfData?.demographics,
            story: pdfData?.story,
            socials: socials.map(s => ({ platform: s.platform, handle: s.handle })),
            pricing: pdfData?.pricing,
            cases: pdfData?.cases,
            featuredVideos: pdfData?.featuredVideos,
        };
        setPdfData(data);
    }, [name, bio, avatarUrl, location, niche, pdfData, socials, setPdfData]);
    
    // Limite de caracteres para truncar a bio
    const BIO_CHAR_LIMIT = 200;
    const shouldTruncate = bio.length > BIO_CHAR_LIMIT;
    const displayBio = shouldTruncate && !isBioExpanded 
        ? bio.slice(0, BIO_CHAR_LIMIT).trim() + "..." 
        : bio;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (avatarContainerRef.current && !avatarContainerRef.current.contains(event.target as Node)) {
                setIsEditingAvatar(false);
            }
        };
        if (isEditingAvatar) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isEditingAvatar]);

    const handleDownloadPdf = async () => {
        setIsGeneratingPdf(true);
        try {
            const data: MediaKitData = {
                name,
                bio,
                avatarUrl,
                location,
                niche,
                metrics: pdfData?.metrics || [],
                demographics: pdfData?.demographics,
                story: pdfData?.story,
                socials: socials.map(s => ({ platform: s.platform, handle: s.handle })),
                pricing: pdfData?.pricing,
                cases: pdfData?.cases,
                featuredVideos: pdfData?.featuredVideos,
            };
            await downloadMediaKitPDF(data, `${name.replace(/\s+/g, "-").toLowerCase()}-media-kit.pdf`);
        } finally {
            setIsGeneratingPdf(false);
        }
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
            console.error(error);
            alert("Erro ao salvar.");
        } finally {
            setIsSavingAvatar(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-6)",
                alignItems: "center",
                textAlign: "center",
                padding: "var(--space-10) 0",
                animation: "fadeInUp 0.6s ease forwards",
            }}
        >
            {/* Avatar */}
            <div ref={avatarContainerRef} style={{ position: "relative" }}>
                <div
                    className="no-print"
                    style={{
                        position: "relative",
                        width: "140px",
                        height: "140px",
                        borderRadius: "var(--radius-full)",
                        cursor: "pointer",
                        padding: "4px",
                        background: "var(--gradient-primary)",
                        boxShadow: "var(--shadow-glow-lg)",
                    }}
                    onClick={!isEditingAvatar ? handleEditAvatarClick : undefined}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "var(--radius-full)",
                            overflow: "hidden",
                            background: "var(--background)",
                        }}
                    >
                        <img
                            src={avatarUrl}
                            alt={name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>
                    {!isEditingAvatar && (
                        <div
                            style={{
                                position: "absolute",
                                inset: "4px",
                                background: "rgba(0,0,0,0.6)",
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
                            <Pencil size={24} />
                        </div>
                    )}
                </div>

                {isEditingAvatar && (
                    <div
                        className="no-print glass-panel"
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%) translateY(8px)",
                            zIndex: 50,
                            padding: "var(--space-3)",
                            display: "flex",
                            gap: "var(--space-2)",
                            alignItems: "center",
                            minWidth: "320px",
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
                                background: "var(--background-secondary)",
                                border: "1px solid var(--border)",
                                borderRadius: "var(--radius-md)",
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
                                color: "var(--background)",
                                border: "none",
                                borderRadius: "var(--radius-md)",
                                width: "36px",
                                height: "36px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                            }}
                        >
                            {isSavingAvatar ? <RefreshCw size={16} className="animate-spin" /> : <Check size={18} />}
                        </button>
                        <button
                            onClick={() => setIsEditingAvatar(false)}
                            style={{
                                background: "var(--background-tertiary)",
                                color: "var(--foreground-muted)",
                                border: "none",
                                borderRadius: "var(--radius-md)",
                                width: "36px",
                                height: "36px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                            }}
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* Info */}
            <div style={{ maxWidth: "640px" }}>
                <h1 style={{ 
                    fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                    marginBottom: "var(--space-4)", 
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "var(--foreground)",
                }}>
                    {name}
                </h1>
                
                <div style={{
                    display: "flex",
                    gap: "var(--space-4)",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "var(--foreground-muted)",
                    fontSize: "var(--text-base)",
                    marginBottom: "var(--space-4)",
                    flexWrap: "wrap",
                }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                        <MapPin size={18} /> {location}
                    </span>
                    <span style={{ color: "var(--border)" }}>•</span>
                    <span 
                        className="text-gradient"
                        style={{ 
                            fontWeight: 700,
                            padding: "var(--space-1) var(--space-3)",
                            background: "var(--primary-light)",
                            borderRadius: "var(--radius-full)",
                            WebkitBackgroundClip: "unset",
                            WebkitTextFillColor: "unset",
                            color: "var(--primary)",
                        }}
                    >
                        {niche}
                    </span>
                </div>
                
                <p style={{
                    lineHeight: "var(--leading-relaxed)",
                    color: "var(--foreground-secondary)",
                    fontSize: "var(--text-lg)",
                }}>
                    {displayBio}
                    {shouldTruncate && (
                        <button
                            onClick={() => setIsBioExpanded(!isBioExpanded)}
                            style={{
                                background: "none",
                                border: "none",
                                color: "var(--primary)",
                                cursor: "pointer",
                                fontWeight: 600,
                                fontSize: "var(--text-sm)",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "var(--space-1)",
                                marginLeft: "var(--space-2)",
                                padding: 0,
                                transition: "opacity var(--transition-base)",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                            {isBioExpanded ? (
                                <>
                                    Ver menos <ChevronUp size={16} />
                                </>
                            ) : (
                                <>
                                    Ver mais <ChevronDown size={16} />
                                </>
                            )}
                        </button>
                    )}
                </p>
            </div>

            {/* Actions */}
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
                        className="glass-panel"
                        style={{
                            padding: "var(--space-3) var(--space-5)",
                            borderRadius: "var(--radius-full)",
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--space-2)",
                            fontSize: "var(--text-sm)",
                            fontWeight: 600,
                            color: "var(--foreground)",
                            textDecoration: "none",
                        }}
                    >
                        {social.platform === "Instagram" && <Instagram size={18} style={{ color: "#E1306C" }} />}
                        {social.platform === "TikTok" && <span style={{ fontWeight: 800 }}>TT</span>}
                        {social.platform === "YouTube" && <Youtube size={18} style={{ color: "#FF0000" }} />}
                        {social.handle}
                    </a>
                ))}

                <button
                    onClick={handleDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="glass-panel no-print"
                    style={{
                        padding: "var(--space-3) var(--space-5)",
                        borderRadius: "var(--radius-full)",
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                        fontSize: "var(--text-sm)",
                        fontWeight: 600,
                        cursor: isGeneratingPdf ? "wait" : "pointer",
                        color: "var(--foreground)",
                        border: "none",
                        opacity: isGeneratingPdf ? 0.7 : 1,
                    }}
                >
                    {isGeneratingPdf ? (
                        <>
                            <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Gerando...
                        </>
                    ) : (
                        <>
                            <FileDown size={18} /> Salvar PDF
                        </>
                    )}
                </button>

                <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="no-print"
                    style={{
                        padding: "var(--space-3) var(--space-5)",
                        borderRadius: "var(--radius-full)",
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                        fontSize: "var(--text-sm)",
                        fontWeight: 600,
                        cursor: isSyncing ? "not-allowed" : "pointer",
                        background: "var(--primary)",
                        color: "var(--background)",
                        border: "none",
                        boxShadow: "var(--shadow-glow)",
                        opacity: isSyncing ? 0.7 : 1,
                    }}
                >
                    <RefreshCw size={18} style={{ animation: isSyncing ? "spin 1s linear infinite" : "none" }} />
                    {isSyncing ? "Sincronizando..." : "Atualizar"}
                </button>
            </div>
        </div>
    );
};
