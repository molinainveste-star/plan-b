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
        { 
            id: "1", 
            brandName: "Nike", 
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", 
            description: "Lançamento Air Max: Foco em lifestyle urbano e alta performance.", 
            metrics: "1.2M Views • 15% CTR", 
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
        },
        { 
            id: "2", 
            brandName: "Samsung", 
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg", 
            description: "Review Galaxy S24: Demonstração de recursos de IA e câmera.", 
            metrics: "850k Views • 8k Comentários", 
            videoUrl: "" 
        },
        { 
            id: "3", 
            brandName: "Coca-Cola", 
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg", 
            description: "Campanha de Natal: Conexão emocional e partilha.", 
            metrics: "2.5M Alcance • Viralizou no TikTok", 
            videoUrl: "" 
        },
    ];

    const [cases, setCases] = useState<CaseStudy[]>(
        initialCases.length > 0 ? initialCases : defaultCases
    );
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

    const inputStyle: React.CSSProperties = {
        padding: "var(--space-2) var(--space-3)",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border)",
        fontSize: "var(--text-sm)",
        width: "100%",
        fontFamily: "inherit",
        outline: "none",
    };

    return (
        <section 
            style={{ 
                marginTop: "var(--space-20)", 
                textAlign: "center", 
                position: "relative",
                animation: "fadeInUp 0.4s ease forwards",
                animationDelay: "250ms",
                opacity: 0,
            }}
        >
            {/* Section Header com botão de edição */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "var(--space-10)",
                position: "relative",
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    position: "relative",
                }}>
                    <h3 style={{
                        fontSize: "var(--text-3xl)",
                        fontWeight: 700,
                        marginBottom: "var(--space-2)",
                        color: "var(--foreground)",
                        letterSpacing: "var(--tracking-tight)",
                        margin: 0,
                    }}>
                        Vitrine de Sucesso
                    </h3>

                    {isOwner && (
                        <div 
                            style={{ 
                                position: "absolute", 
                                right: 0, 
                                zIndex: 10 
                            }} 
                            className="no-print"
                        >
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    style={{
                                        padding: "var(--space-2) var(--space-4)",
                                        borderRadius: "var(--radius-md)",
                                        border: "1px solid var(--border)",
                                        background: "var(--card)",
                                        color: "var(--foreground)",
                                        cursor: "pointer",
                                        fontSize: "var(--text-sm)",
                                        fontWeight: 500,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "var(--space-2)",
                                        transition: "all var(--transition-base)",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = "var(--primary)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = "var(--border)";
                                    }}
                                >
                                    ✏️ Editar Cases
                                </button>
                            ) : (
                                <div style={{ display: "flex", gap: "var(--space-2)" }}>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        style={{
                                            padding: "var(--space-2) var(--space-4)",
                                            borderRadius: "var(--radius-md)",
                                            border: "none",
                                            background: "var(--secondary)",
                                            color: "var(--foreground)",
                                            cursor: "pointer",
                                            fontWeight: 500,
                                            fontSize: "var(--text-sm)",
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        style={{
                                            padding: "var(--space-2) var(--space-4)",
                                            borderRadius: "var(--radius-md)",
                                            border: "none",
                                            background: "var(--primary)",
                                            color: "white",
                                            cursor: "pointer",
                                            fontWeight: 500,
                                            fontSize: "var(--text-sm)",
                                            opacity: isSaving ? 0.7 : 1,
                                        }}
                                    >
                                        {isSaving ? "Salvando..." : "Salvar"}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <p style={{
                    fontSize: "var(--text-base)",
                    color: "var(--muted-foreground)",
                    marginTop: "var(--space-2)",
                    maxWidth: "600px",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}>
                    Marcas que confiaram e os resultados que alcançamos juntos.
                </p>
            </div>

            {/* Cases Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "var(--space-6)",
            }}>
                {cases.map((brandCase, i) => {
                    const embedUrl = getEmbedUrl(brandCase.videoUrl);

                    return (
                        <div
                            key={brandCase.id}
                            className="glass-panel"
                            style={{
                                padding: "var(--space-6)",
                                borderRadius: "var(--radius-xl)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "var(--space-4)",
                                position: "relative",
                                textAlign: "left",
                                overflow: "hidden",
                            }}
                        >
                            {/* Logo */}
                            <div style={{ 
                                display: "flex", 
                                justifyContent: "center", 
                                marginBottom: "var(--space-2)",
                            }}>
                                <img
                                    src={brandCase.logoUrl}
                                    alt={brandCase.brandName}
                                    style={{
                                        height: "28px",
                                        maxWidth: "100px",
                                        objectFit: "contain",
                                        filter: "grayscale(100%)",
                                        opacity: 0.6,
                                        transition: "all var(--transition-slow)",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.filter = "grayscale(0%)";
                                        e.currentTarget.style.opacity = "1";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.filter = "grayscale(100%)";
                                        e.currentTarget.style.opacity = "0.6";
                                    }}
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>

                            {/* Video Thumbnail */}
                            <div style={{
                                width: "100%",
                                aspectRatio: "16/9",
                                borderRadius: "var(--radius-lg)",
                                overflow: "hidden",
                                background: "#000",
                                position: "relative",
                                boxShadow: "var(--shadow-md)",
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
                                        background: "var(--gradient-primary-soft)",
                                    }}>
                                        <Play 
                                            size={36} 
                                            style={{ 
                                                opacity: 0.4, 
                                                color: "var(--muted-foreground)" 
                                            }} 
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Description & Metrics */}
                            <div>
                                {brandCase.description && (
                                    <p style={{
                                        fontSize: "var(--text-sm)",
                                        color: "var(--muted-foreground)",
                                        marginBottom: "var(--space-3)",
                                        lineHeight: "var(--leading-relaxed)",
                                        minHeight: "2.5rem",
                                    }}>
                                        {brandCase.description}
                                    </p>
                                )}

                                {brandCase.metrics && (
                                    <div style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "var(--space-2)",
                                        padding: "var(--space-2) var(--space-3)",
                                        background: "var(--primary-light)",
                                        borderRadius: "var(--radius-full)",
                                        color: "var(--primary)",
                                        fontWeight: 600,
                                        fontSize: "var(--text-sm)",
                                    }}>
                                        <TrendingUp size={14} />
                                        {brandCase.metrics}
                                    </div>
                                )}
                            </div>

                            {/* Edit Overlay */}
                            {isEditing && (
                                <div style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "rgba(255,255,255,0.98)",
                                    zIndex: 20,
                                    padding: "var(--space-4)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "var(--space-3)",
                                    justifyContent: "center",
                                }}>
                                    <input
                                        value={brandCase.brandName}
                                        onChange={(e) => updateCase(i, "brandName", e.target.value)}
                                        placeholder="Nome da Marca"
                                        style={inputStyle}
                                    />
                                    <input
                                        value={brandCase.logoUrl}
                                        onChange={(e) => updateCase(i, "logoUrl", e.target.value)}
                                        placeholder="URL do Logo"
                                        style={inputStyle}
                                    />
                                    <input
                                        value={brandCase.videoUrl || ""}
                                        onChange={(e) => updateCase(i, "videoUrl", e.target.value)}
                                        placeholder="Link do YouTube"
                                        style={inputStyle}
                                    />
                                    <textarea
                                        value={brandCase.description || ""}
                                        onChange={(e) => updateCase(i, "description", e.target.value)}
                                        placeholder="Descrição curta..."
                                        style={{ 
                                            ...inputStyle, 
                                            height: "60px", 
                                            resize: "none",
                                            fontFamily: "inherit",
                                        }}
                                    />
                                    <input
                                        value={brandCase.metrics || ""}
                                        onChange={(e) => updateCase(i, "metrics", e.target.value)}
                                        placeholder="Métricas (ex: +50k views)"
                                        style={inputStyle}
                                    />
                                    <button
                                        onClick={() => removeCase(i)}
                                        style={{ 
                                            color: "var(--error)", 
                                            fontSize: "var(--text-sm)", 
                                            background: "none", 
                                            border: "none", 
                                            cursor: "pointer", 
                                            alignSelf: "flex-end", 
                                            marginTop: "var(--space-2)",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "var(--space-1)",
                                        }}
                                    >
                                        <Trash2 size={14} /> Remover
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Add New Case Button */}
                {isEditing && (
                    <button
                        onClick={addCase}
                        style={{
                            minHeight: "380px",
                            borderRadius: "var(--radius-xl)",
                            border: "2px dashed var(--border)",
                            background: "transparent",
                            color: "var(--muted-foreground)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            gap: "var(--space-4)",
                            transition: "all var(--transition-base)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--primary)";
                            e.currentTarget.style.color = "var(--primary)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--border)";
                            e.currentTarget.style.color = "var(--muted-foreground)";
                        }}
                    >
                        <Plus size={36} />
                        <span style={{ fontWeight: 600 }}>Adicionar Novo Case</span>
                    </button>
                )}
            </div>
        </section>
    );
};
