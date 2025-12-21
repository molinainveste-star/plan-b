"use client";

import React, { useState } from "react";
import { CaseStudy } from "@/lib/types";
import { Plus, Trash2, Play, TrendingUp } from "lucide-react";
import { updateProfileCaseStudies } from "@/lib/actions";

interface CaseStudiesProps {
    slug?: string;
    initialCases?: CaseStudy[];
    isOwner?: boolean;
    isPro?: boolean;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({
    slug,
    initialCases = [],
    isOwner = false,
    isPro = true
}) => {
    const defaultCases: CaseStudy[] = [
        { id: "1", brandName: "Nike", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", description: "Lançamento Air Max: Foco em lifestyle urbano e alta performance.", metrics: "1.2M Views • 15% CTR", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { id: "2", brandName: "Samsung", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg", description: "Review Galaxy S24: Demonstração de recursos de IA e câmera.", metrics: "850k Views • 8k Comentários", videoUrl: "" },
        { id: "3", brandName: "Coca-Cola", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg", description: "Campanha de Natal: Conexão emocional e partilha.", metrics: "2.5M Alcance • Viralizou no TikTok", videoUrl: "" },
    ];

    const [cases, setCases] = useState<CaseStudy[]>(initialCases.length > 0 ? initialCases : defaultCases);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const getRandomLogo = () => `https://api.dicebear.com/7.x/initials/svg?seed=${Math.random()}`;

    const handleSave = async () => {
        if (!slug) return;
        setIsSaving(true);
        try {
            await updateProfileCaseStudies(slug, cases);
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar cases.");
        } finally {
            setIsSaving(false);
        }
    };

    const addCase = () => {
        const newCase: CaseStudy = {
            id: crypto.randomUUID(),
            brandName: "Nova Marca",
            logoUrl: getRandomLogo(),
            description: "",
            metrics: "",
            videoUrl: ""
        };
        setCases([...cases, newCase]);
    };

    const updateCase = (index: number, field: keyof CaseStudy, value: string) => {
        const newCases = [...cases];
        newCases[index] = { ...newCases[index], [field]: value };
        setCases(newCases);
    };

    const removeCase = (index: number) => {
        const newCases = [...cases];
        newCases.splice(index, 1);
        setCases(newCases);
    };

    const getEmbedUrl = (url?: string) => {
        if (!url) return null;
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const videoId = url.split("v=")[1] || url.split("/").pop()?.split("?")[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return null;
    };

    return (
        <section style={{ marginTop: "6rem", textAlign: "center", position: "relative" }}>
            {isOwner && (
                <div style={{ position: "absolute", top: -50, right: 0, zIndex: 10 }} className="no-print">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="glass-panel"
                            style={{
                                padding: "0.5rem 1rem",
                                borderRadius: "1rem",
                                border: "none",
                                background: "var(--card)",
                                color: "var(--foreground)",
                                cursor: "pointer",
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                display: "flex", alignItems: "center", gap: "0.5rem"
                            }}
                        >
                            ✏️ Editar Cases
                        </button>
                    ) : (
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button
                                onClick={() => setIsEditing(false)}
                                style={{
                                    padding: "0.5rem 1rem",
                                    borderRadius: "1rem",
                                    border: "none",
                                    background: "#eee",
                                    color: "#333",
                                    cursor: "pointer",
                                    fontWeight: 600
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                style={{
                                    padding: "0.5rem 1rem",
                                    borderRadius: "1rem",
                                    border: "none",
                                    background: "var(--primary)",
                                    color: "white",
                                    cursor: "pointer",
                                    fontWeight: 600,
                                    opacity: isSaving ? 0.7 : 1
                                }}
                            >
                                {isSaving ? "Salvando..." : "Salvar"}
                            </button>
                        </div>
                    )}
                </div>
            )}

            <h3 style={{
                fontSize: "2rem",
                fontWeight: 800,
                marginBottom: "0.5rem",
                color: "var(--foreground)"
            }}>
                Vitrine de Sucesso 🏆
            </h3>
            <p style={{
                fontSize: "1rem",
                color: "var(--muted-foreground)",
                marginBottom: "3rem",
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto"
            }}>
                Marcas que confiaram e os resultados que alcançamos juntos.
            </p>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
                padding: "0 1rem"
            }}>
                {cases.map((brandCase, i) => {
                    const embedUrl = getEmbedUrl(brandCase.videoUrl);

                    return (
                        <div
                            key={brandCase.id}
                            className="glass-panel"
                            style={{
                                padding: "1.5rem",
                                borderRadius: "1.5rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1.5rem",
                                position: "relative",
                                textAlign: "left",
                                overflow: "hidden"
                            }}
                        >
                            {/* 1. Header: Logo Centered */}
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
                                <img
                                    src={brandCase.logoUrl}
                                    alt={brandCase.brandName}
                                    style={{
                                        height: "32px",
                                        maxWidth: "100px",
                                        objectFit: "contain",
                                        filter: "grayscale(100%)", // Elegant default
                                        opacity: 0.7,
                                        transition: "all 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.filter = "grayscale(0%)";
                                        e.currentTarget.style.opacity = "1";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.filter = "grayscale(100%)";
                                        e.currentTarget.style.opacity = "0.7";
                                    }}
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        // Fallback text logic could go here if needed
                                    }}
                                />
                            </div>

                            {/* 2. Middle: Video/Thumbnail */}
                            <div style={{
                                width: "100%",
                                aspectRatio: "16/9",
                                borderRadius: "1rem",
                                overflow: "hidden",
                                background: "#000",
                                position: "relative",
                                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)"
                            }}>
                                {embedUrl ? (
                                    <iframe
                                        src={embedUrl}
                                        style={{ width: "100%", height: "100%", border: "none" }}
                                        title={brandCase.brandName}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: "linear-gradient(135deg, var(--secondary) 0%, var(--border) 100%)"
                                    }}>
                                        <Play size={40} className="text-muted-foreground" style={{ opacity: 0.5 }} />
                                    </div>
                                )}
                            </div>

                            {/* 3. Bottom: Description & Metrics */}
                            <div>
                                {brandCase.description && (
                                    <p style={{
                                        fontSize: "0.9rem",
                                        color: "var(--muted-foreground)",
                                        marginBottom: "1rem",
                                        lineHeight: "1.5",
                                        minHeight: "2.7rem" // Ensure alignment
                                    }}>
                                        {brandCase.description}
                                    </p>
                                )}

                                {brandCase.metrics && (
                                    <div style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        padding: "0.5rem 1rem",
                                        background: "rgba(67, 97, 238, 0.08)",
                                        borderRadius: "2rem",
                                        color: "var(--primary)",
                                        fontWeight: 700,
                                        fontSize: "0.85rem"
                                    }}>
                                        <TrendingUp size={16} />
                                        {brandCase.metrics}
                                    </div>
                                )}
                            </div>

                            {/* Edit Overlay */}
                            {isEditing && (
                                <div style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "rgba(255,255,255,0.95)",
                                    zIndex: 20,
                                    padding: "1rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.5rem",
                                    justifyContent: "center"
                                }}>
                                    <input
                                        value={brandCase.brandName}
                                        onChange={(e) => updateCase(i, "brandName", e.target.value)}
                                        placeholder="Nome da Marca"
                                        style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid var(--border)" }}
                                    />
                                    <input
                                        value={brandCase.logoUrl}
                                        onChange={(e) => updateCase(i, "logoUrl", e.target.value)}
                                        placeholder="URL do Logo"
                                        style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid var(--border)" }}
                                    />
                                    <input
                                        value={brandCase.videoUrl || ""}
                                        onChange={(e) => updateCase(i, "videoUrl", e.target.value)}
                                        placeholder="Link do YouTube"
                                        style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid var(--border)" }}
                                    />
                                    <textarea
                                        value={brandCase.description || ""}
                                        onChange={(e) => updateCase(i, "description", e.target.value)}
                                        placeholder="Descrição curta..."
                                        style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid var(--border)", height: "60px" }}
                                    />
                                    <input
                                        value={brandCase.metrics || ""}
                                        onChange={(e) => updateCase(i, "metrics", e.target.value)}
                                        placeholder="Métricas (ex: +50k views)"
                                        style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid var(--border)" }}
                                    />
                                    <button
                                        onClick={() => removeCase(i)}
                                        style={{ color: "red", fontSize: "0.8rem", background: "none", border: "none", cursor: "pointer", alignSelf: "flex-end", marginTop: "0.5rem" }}
                                    >
                                        <Trash2 size={14} /> Remover Case
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Add Button Card */}
                {isEditing && (
                    <button
                        onClick={addCase}
                        style={{
                            minHeight: "400px",
                            borderRadius: "1.5rem",
                            border: "2px dashed var(--border)",
                            background: "transparent",
                            color: "var(--muted-foreground)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            gap: "1rem"
                        }}
                    >
                        <Plus size={40} />
                        <span style={{ fontWeight: 600 }}>Adicionar Novo Case</span>
                    </button>
                )}
            </div>
        </section>
    );
};
