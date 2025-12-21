"use client";

import React from "react";
import { Check, Sparkles } from "lucide-react";

interface PricingPackage {
    title: string;
    price: string;
    features: string[];
    isPopular?: boolean;
    isActive?: boolean;
}

interface PricingTableProps {
    slug?: string;
    initialPackages?: PricingPackage[];
    isOwner?: boolean;
}

export const PricingTable: React.FC<PricingTableProps> = ({ 
    slug, 
    initialPackages = [], 
    isOwner = false 
}) => {
    const defaultPackages: PricingPackage[] = [
        {
            title: "Shorts / Reels",
            price: "R$ 3.500",
            features: [
                "Vídeo vertical de até 60s",
                "Postagem no YouTube Shorts e Reels",
                "Link na Bio por 24h",
                "Direitos de uso por 30 dias"
            ],
            isActive: true
        },
        {
            title: "Vídeo Dedicado",
            price: "R$ 8.000",
            features: [
                "Vídeo completo (8-12 min)",
                "Roteiro exclusivo",
                "Menção na descrição e comentário fixado",
                "Direitos de uso vitalícios"
            ],
            isPopular: true,
            isActive: true
        },
        {
            title: "Combo 360",
            price: "R$ 12.000",
            features: [
                "1 Vídeo Dedicado",
                "2 Shorts/Reels de corte",
                "Postagem em Comunidade",
                "Story no Instagram com Link"
            ],
            isActive: true
        }
    ];

    const [packages, setPackages] = React.useState<PricingPackage[]>(
        initialPackages.length > 0 ? initialPackages : defaultPackages
    );
    const [isEditing, setIsEditing] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);

    React.useEffect(() => {
        setPackages(prev => prev.map(p => ({ 
            ...p, 
            isActive: p.isActive !== undefined ? p.isActive : true 
        })));
    }, []);

    const handleSave = async () => {
        if (!slug) return;
        setIsSaving(true);
        try {
            const { updatePricingPackages } = await import("@/lib/actions");
            await updatePricingPackages(slug, packages);
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar pacotes.");
        } finally {
            setIsSaving(false);
        }
    };

    const updatePackage = (index: number, field: keyof PricingPackage, value: any) => {
        const newPackages = [...packages];
        newPackages[index] = { ...newPackages[index], [field]: value };
        setPackages(newPackages);
    };

    const updateFeature = (pkgIndex: number, featureIndex: number, value: string) => {
        const newPackages = [...packages];
        newPackages[pkgIndex].features[featureIndex] = value;
        setPackages(newPackages);
    };

    const addFeature = (pkgIndex: number) => {
        const newPackages = [...packages];
        newPackages[pkgIndex].features.push("Novo item");
        setPackages(newPackages);
    };

    const removeFeature = (pkgIndex: number, featureIndex: number) => {
        const newPackages = [...packages];
        newPackages[pkgIndex].features.splice(featureIndex, 1);
        setPackages(newPackages);
    };

    const visiblePackages = isEditing ? packages : packages.filter(p => p.isActive !== false);

    const inputStyle: React.CSSProperties = {
        width: "100%",
        background: "var(--secondary)",
        border: "1px solid var(--border)",
        color: "var(--foreground)",
        padding: "var(--space-2) var(--space-3)",
        borderRadius: "var(--radius-sm)",
        fontSize: "inherit",
        fontFamily: "inherit",
    };

    return (
        <section 
            style={{ 
                marginTop: "var(--space-16)", 
                position: "relative",
                animation: "fadeInUp 0.4s ease forwards",
                animationDelay: "200ms",
                opacity: 0,
            }} 
            className="no-print-break"
        >
            {/* Edit Controls */}
            {isOwner && (
                <div 
                    style={{ 
                        position: "absolute", 
                        top: 0, 
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
                            ✏️ Editar Preços
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

            {/* Section Header */}
            <h3 style={{
                textAlign: "center",
                fontSize: "var(--text-3xl)",
                fontWeight: 700,
                marginBottom: "var(--space-10)",
                color: "var(--foreground)",
                letterSpacing: "var(--tracking-tight)",
            }}>
                Pacotes de Parceria
            </h3>

            {/* Pricing Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "var(--space-6)",
            }}>
                {visiblePackages.map((pkg, i) => (
                    <div
                        key={i}
                        className="glass-panel"
                        style={{
                            padding: "var(--space-8)",
                            borderRadius: "var(--radius-xl)",
                            background: pkg.isPopular 
                                ? "linear-gradient(145deg, var(--card), rgba(var(--primary-rgb), 0.03))" 
                                : "var(--card)",
                            border: pkg.isPopular 
                                ? "2px solid var(--primary)" 
                                : (isEditing && !pkg.isActive ? "2px dashed var(--border)" : "1px solid var(--border)"),
                            opacity: isEditing && !pkg.isActive ? 0.6 : 1,
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            gap: "var(--space-6)",
                            transition: "all var(--transition-slow)",
                        }}
                    >
                        {/* Edit Controls for Package */}
                        {isEditing && (
                            <div style={{ 
                                marginBottom: "var(--space-2)", 
                                borderBottom: "1px solid var(--border)", 
                                paddingBottom: "var(--space-4)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "var(--space-2)",
                            }}>
                                <label style={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    gap: "var(--space-2)", 
                                    fontSize: "var(--text-sm)", 
                                    color: "var(--muted-foreground)",
                                    cursor: "pointer",
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={pkg.isActive !== false}
                                        onChange={(e) => updatePackage(i, "isActive", e.target.checked)}
                                    />
                                    Pacote Ativo
                                </label>
                                <label style={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    gap: "var(--space-2)", 
                                    fontSize: "var(--text-sm)", 
                                    color: "var(--muted-foreground)",
                                    cursor: "pointer",
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={pkg.isPopular}
                                        onChange={(e) => updatePackage(i, "isPopular", e.target.checked)}
                                    />
                                    Destacar como Popular
                                </label>
                            </div>
                        )}

                        {/* Popular Badge */}
                        {pkg.isPopular && (
                            <span style={{
                                position: "absolute",
                                top: "-12px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                background: "var(--primary)",
                                color: "white",
                                padding: "var(--space-1) var(--space-4)",
                                borderRadius: "var(--radius-full)",
                                fontSize: "var(--text-xs)",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                display: "flex",
                                alignItems: "center",
                                gap: "var(--space-1)",
                                boxShadow: "var(--shadow-primary)",
                            }}>
                                <Sparkles size={12} />
                                Mais Escolhido
                            </span>
                        )}

                        {/* Title & Price */}
                        <div>
                            {isEditing ? (
                                <input
                                    value={pkg.title}
                                    onChange={(e) => updatePackage(i, "title", e.target.value)}
                                    style={{ 
                                        ...inputStyle, 
                                        fontSize: "var(--text-xl)", 
                                        fontWeight: 600,
                                        marginBottom: "var(--space-2)",
                                    }}
                                />
                            ) : (
                                <h4 style={{ 
                                    fontSize: "var(--text-xl)", 
                                    fontWeight: 600, 
                                    color: "var(--foreground)",
                                    marginBottom: "var(--space-2)",
                                }}>
                                    {pkg.title}
                                </h4>
                            )}

                            {isEditing ? (
                                <input
                                    value={pkg.price}
                                    onChange={(e) => updatePackage(i, "price", e.target.value)}
                                    style={{ 
                                        ...inputStyle, 
                                        fontSize: "var(--text-3xl)", 
                                        fontWeight: 700,
                                        color: "var(--primary)",
                                    }}
                                />
                            ) : (
                                <p style={{ 
                                    fontSize: "var(--text-3xl)", 
                                    fontWeight: 700, 
                                    color: "var(--primary)",
                                    display: "flex",
                                    alignItems: "baseline",
                                    gap: "var(--space-2)",
                                }}>
                                    {pkg.price}
                                    <span style={{ 
                                        fontSize: "var(--text-sm)", 
                                        color: "var(--muted-foreground)", 
                                        fontWeight: 400,
                                    }}>
                                        /unidade
                                    </span>
                                </p>
                            )}
                        </div>

                        {/* Features List */}
                        <ul style={{ 
                            listStyle: "none", 
                            padding: 0, 
                            margin: 0, 
                            display: "flex", 
                            flexDirection: "column", 
                            gap: "var(--space-3)",
                            flex: 1,
                        }}>
                            {pkg.features.map((feature, j) => (
                                <li 
                                    key={j} 
                                    style={{ 
                                        display: "flex", 
                                        alignItems: "center", 
                                        gap: "var(--space-3)", 
                                        fontSize: "var(--text-sm)", 
                                        color: "var(--muted-foreground)",
                                    }}
                                >
                                    <div style={{
                                        minWidth: "20px",
                                        height: "20px",
                                        borderRadius: "var(--radius-full)",
                                        background: "var(--success-light)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "var(--success)",
                                        flexShrink: 0,
                                    }}>
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    {isEditing ? (
                                        <div style={{ flex: 1, display: "flex", gap: "var(--space-2)" }}>
                                            <input
                                                value={feature}
                                                onChange={(e) => updateFeature(i, j, e.target.value)}
                                                style={{ ...inputStyle, flex: 1 }}
                                            />
                                            <button 
                                                onClick={() => removeFeature(i, j)} 
                                                style={{ 
                                                    background: "transparent", 
                                                    border: "none", 
                                                    color: "var(--error)", 
                                                    cursor: "pointer",
                                                    fontSize: "var(--text-lg)",
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ) : (
                                        <span>{feature}</span>
                                    )}
                                </li>
                            ))}
                            {isEditing && (
                                <button
                                    onClick={() => addFeature(i)}
                                    style={{ 
                                        fontSize: "var(--text-sm)", 
                                        color: "var(--primary)", 
                                        background: "transparent", 
                                        border: "1px dashed var(--primary)", 
                                        padding: "var(--space-2) var(--space-4)", 
                                        borderRadius: "var(--radius-md)", 
                                        cursor: "pointer", 
                                        marginTop: "var(--space-2)",
                                        transition: "all var(--transition-base)",
                                    }}
                                >
                                    + Adicionar Item
                                </button>
                            )}
                        </ul>

                        {/* CTA Button */}
                        <button 
                            style={{
                                marginTop: "auto",
                                padding: "var(--space-4)",
                                borderRadius: "var(--radius-md)",
                                border: "none",
                                background: pkg.isPopular ? "var(--primary)" : "var(--secondary)",
                                color: pkg.isPopular ? "white" : "var(--foreground)",
                                fontWeight: 600,
                                fontSize: "var(--text-sm)",
                                cursor: isEditing ? "not-allowed" : "pointer",
                                transition: "all var(--transition-base)",
                                boxShadow: pkg.isPopular ? "var(--shadow-primary)" : "none",
                                opacity: isEditing ? 0.5 : 1,
                            }}
                            onMouseEnter={(e) => {
                                if (!isEditing) {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    if (pkg.isPopular) {
                                        e.currentTarget.style.boxShadow = "var(--shadow-primary-lg)";
                                    } else {
                                        e.currentTarget.style.background = "var(--border)";
                                    }
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                if (pkg.isPopular) {
                                    e.currentTarget.style.boxShadow = "var(--shadow-primary)";
                                } else {
                                    e.currentTarget.style.background = "var(--secondary)";
                                }
                            }}
                        >
                            Selecionar Pacote
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};
