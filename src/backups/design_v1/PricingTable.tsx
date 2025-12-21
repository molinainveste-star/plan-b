"use client";

import React from "react";
import { Check } from "lucide-react";

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

export const PricingTable: React.FC<PricingTableProps> = ({ slug, initialPackages = [], isOwner = false }) => {
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

    // Ensure packages have isActive property
    React.useEffect(() => {
        setPackages(prev => prev.map(p => ({ ...p, isActive: p.isActive !== undefined ? p.isActive : true })));
    }, []);

    const handleSave = async () => {
        if (!slug) return;
        setIsSaving(true);
        try {
            // Dynamically import to avoid server-side issues if this component was used there, 
            // but "use client" protects us. Still, good practice or just import at top.
            // We'll trust the import at top if we add it, but wait, I can't add imports easily with replace_file_content unless I replace the whole file.
            // I will target the imports separately or just assume updatePricingPackages is imported.
            // Actually, I need to add the import statement too. I will do that in a separate step or try to include it if I replace the whole file.
            // Since I am replacing the component, I can't easily add the import at the top without another replace.
            // I will use a separate replace for the import.
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

    // Only show active packages when not editing
    const visiblePackages = isEditing ? packages : packages.filter(p => p.isActive !== false);

    return (
        <section style={{ marginTop: "5rem", position: "relative" }} className="no-print-break">
            {isOwner && (
                <div style={{ position: "absolute", top: 0, right: 0, zIndex: 10 }} className="no-print">
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
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem"
                            }}
                        >
                            ✏️ Editar Preços
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
                                {isSaving ? "Salvando..." : "Salvar Alterações"}
                            </button>
                        </div>
                    )}
                </div>
            )}

            <h3 style={{
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: 800,
                marginBottom: "3rem",
                color: "var(--foreground)"
            }}>
                Pacotes de Parceria
            </h3>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem"
            }}>
                {visiblePackages.map((pkg, i) => (
                    <div
                        key={i}
                        className="glass-panel"
                        style={{
                            padding: "2.5rem",
                            borderRadius: "2rem",
                            background: pkg.isPopular ? "linear-gradient(145deg, var(--card), rgba(var(--primary-rgb), 0.05))" : "var(--card)",
                            border: pkg.isPopular ? "2px solid var(--primary)" : (isEditing && !pkg.isActive ? "2px dashed #444" : "none"),
                            opacity: isEditing && !pkg.isActive ? 0.6 : 1,
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.5rem"
                        }}
                    >
                        {isEditing && (
                            <div style={{ marginBottom: "1rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
                                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                                    <input
                                        type="checkbox"
                                        checked={pkg.isActive !== false}
                                        onChange={(e) => updatePackage(i, "isActive", e.target.checked)}
                                    />
                                    Pacote Ativo
                                </label>
                                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--muted-foreground)", marginTop: "0.5rem" }}>
                                    <input
                                        type="checkbox"
                                        checked={pkg.isPopular}
                                        onChange={(e) => updatePackage(i, "isPopular", e.target.checked)}
                                    />
                                    Destacar como Popular
                                </label>
                            </div>
                        )}

                        {pkg.isPopular && (
                            <span style={{
                                position: "absolute",
                                top: "-12px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                background: "var(--primary)",
                                color: "white",
                                padding: "0.25rem 1rem",
                                borderRadius: "1rem",
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em"
                            }}>
                                Mais Escolhido
                            </span>
                        )}

                        <div>
                            {isEditing ? (
                                <input
                                    value={pkg.title}
                                    onChange={(e) => updatePackage(i, "title", e.target.value)}
                                    style={{ width: "100%", fontSize: "1.25rem", fontWeight: 700, padding: "0.25rem", marginBottom: "0.5rem", background: "rgba(0,0,0,0.2)", border: "none", color: "white", borderRadius: "4px" }}
                                />
                            ) : (
                                <h4 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--foreground)" }}>{pkg.title}</h4>
                            )}

                            {isEditing ? (
                                <input
                                    value={pkg.price}
                                    onChange={(e) => updatePackage(i, "price", e.target.value)}
                                    style={{ width: "100%", fontSize: "2rem", fontWeight: 800, color: "var(--primary)", padding: "0.25rem", background: "rgba(0,0,0,0.2)", border: "none", borderRadius: "4px" }}
                                />
                            ) : (
                                <p style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)", marginTop: "0.5rem" }}>
                                    {pkg.price}
                                    <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", fontWeight: 500 }}> /unidade</span>
                                </p>
                            )}
                        </div>

                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {pkg.features.map((feature, j) => (
                                <li key={j} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9375rem", color: "var(--muted-foreground)" }}>
                                    <div style={{
                                        minWidth: "20px", height: "20px",
                                        borderRadius: "50%",
                                        background: "rgba(16, 185, 129, 0.1)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#10b981"
                                    }}>
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    {isEditing ? (
                                        <div style={{ flex: 1, display: "flex", gap: "0.5rem" }}>
                                            <input
                                                value={feature}
                                                onChange={(e) => updateFeature(i, j, e.target.value)}
                                                style={{ flex: 1, background: "rgba(0,0,0,0.2)", border: "none", color: "white", padding: "2px", borderRadius: "2px" }}
                                            />
                                            <button onClick={() => removeFeature(i, j)} style={{ background: "transparent", border: "none", color: "red", cursor: "pointer" }}>×</button>
                                        </div>
                                    ) : (
                                        feature
                                    )}
                                </li>
                            ))}
                            {isEditing && (
                                <button
                                    onClick={() => addFeature(i)}
                                    style={{ fontSize: "0.8rem", color: "var(--primary)", background: "transparent", border: "1px dashed var(--primary)", padding: "0.5rem", borderRadius: "0.5rem", cursor: "pointer", marginTop: "0.5rem" }}
                                >
                                    + Adicionar Item
                                </button>
                            )}
                        </ul>

                        <button style={{
                            marginTop: "auto",
                            padding: "1rem",
                            borderRadius: "1rem",
                            border: "none",
                            background: pkg.isPopular ? "var(--primary)" : "var(--background)",
                            color: pkg.isPopular ? "white" : "var(--foreground)",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "transform 0.2s",
                            boxShadow: pkg.isPopular ? "0 10px 20px -5px rgba(var(--primary-rgb), 0.3)" : "none",
                            opacity: isEditing ? 0.5 : 1,
                            pointerEvents: isEditing ? "none" : "auto"
                        }}>
                            Selecionar Pacote
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};
