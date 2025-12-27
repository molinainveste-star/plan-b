"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { PricingPackage } from "@/lib/types";

const defaultPackages: PricingPackage[] = [
    {
        title: "Básico",
        price: "R$ 500",
        features: ["1 post no feed", "1 story", "Menção na bio por 24h"],
        isPopular: false,
        isActive: true,
    },
    {
        title: "Profissional",
        price: "R$ 2.000",
        features: ["3 posts no feed", "5 stories", "1 vídeo Reels/TikTok", "Menção na bio por 7 dias"],
        isPopular: true,
        isActive: true,
    },
    {
        title: "Premium",
        price: "R$ 5.000",
        features: ["5 posts no feed", "Stories ilimitados", "3 vídeos Reels/TikTok", "Vídeo exclusivo YouTube", "Menção na bio por 30 dias"],
        isPopular: false,
        isActive: true,
    },
];

export default function PricingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [packages, setPackages] = useState<PricingPackage[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const supabase = createClient();
        
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push("/login");
            return;
        }

        const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("user_id", user.id)
            .single();

        setProfile(data);
        
        const savedPackages = data?.pricing_packages as PricingPackage[];
        setPackages(savedPackages?.length > 0 ? savedPackages : defaultPackages);
        
        setLoading(false);
    }

    async function savePackages() {
        setSaving(true);
        setMessage(null);

        const supabase = createClient();

        const { error } = await supabase
            .from("profiles")
            .update({ pricing_packages: packages })
            .eq("id", profile.id);

        if (error) {
            setMessage({ type: "error", text: error.message });
        } else {
            setMessage({ type: "success", text: "Pacotes salvos com sucesso!" });
        }

        setSaving(false);
    }

    function updatePackage(index: number, updates: Partial<PricingPackage>) {
        const newPackages = [...packages];
        newPackages[index] = { ...newPackages[index], ...updates };
        setPackages(newPackages);
    }

    function addFeature(packageIndex: number) {
        const newPackages = [...packages];
        newPackages[packageIndex].features.push("");
        setPackages(newPackages);
    }

    function updateFeature(packageIndex: number, featureIndex: number, value: string) {
        const newPackages = [...packages];
        newPackages[packageIndex].features[featureIndex] = value;
        setPackages(newPackages);
    }

    function removeFeature(packageIndex: number, featureIndex: number) {
        const newPackages = [...packages];
        newPackages[packageIndex].features.splice(featureIndex, 1);
        setPackages(newPackages);
    }

    function addPackage() {
        setPackages([...packages, {
            title: "Novo Pacote",
            price: "R$ 0",
            features: ["Feature 1"],
            isPopular: false,
            isActive: true,
        }]);
        setEditingIndex(packages.length);
    }

    function removePackage(index: number) {
        if (packages.length <= 1) {
            setMessage({ type: "error", text: "Você precisa ter pelo menos um pacote" });
            return;
        }
        if (!confirm("Tem certeza que deseja remover este pacote?")) return;
        
        const newPackages = [...packages];
        newPackages.splice(index, 1);
        setPackages(newPackages);
        setEditingIndex(null);
    }

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
                <div style={{ color: "#fff", fontSize: "1.2rem" }}>Carregando...</div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                    <h1 style={{
                        fontSize: "2rem",
                        fontWeight: 700,
                        color: "#fff",
                        marginBottom: "0.5rem",
                    }}>
                        Pacotes de Preço
                    </h1>
                    <p style={{ color: "#94a3b8" }}>
                        Configure os pacotes que aparecem no seu Media Kit
                    </p>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <button
                        onClick={addPackage}
                        style={{
                            padding: "0.75rem 1.5rem",
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "0.5rem",
                            color: "#fff",
                            cursor: "pointer",
                        }}
                    >
                        + Adicionar Pacote
                    </button>
                    <button
                        onClick={savePackages}
                        disabled={saving}
                        style={{
                            padding: "0.75rem 1.5rem",
                            background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                            border: "none",
                            borderRadius: "0.5rem",
                            color: "#fff",
                            fontWeight: 600,
                            cursor: saving ? "not-allowed" : "pointer",
                            opacity: saving ? 0.7 : 1,
                        }}
                    >
                        {saving ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </div>
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

            {/* Packages Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
            }}>
                {packages.map((pkg, index) => (
                    <div
                        key={index}
                        style={{
                            background: pkg.isPopular 
                                ? "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.1))"
                                : "rgba(30, 30, 46, 0.6)",
                            border: `1px solid ${pkg.isPopular ? "rgba(139, 92, 246, 0.5)" : "rgba(255, 255, 255, 0.1)"}`,
                            borderRadius: "1rem",
                            padding: "1.5rem",
                            position: "relative",
                            opacity: pkg.isActive ? 1 : 0.5,
                        }}
                    >
                        {pkg.isPopular && (
                            <div style={{
                                position: "absolute",
                                top: "-12px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                                padding: "0.25rem 1rem",
                                borderRadius: "9999px",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: "#fff",
                            }}>
                                ⭐ Mais Popular
                            </div>
                        )}

                        {editingIndex === index ? (
                            // Edit Mode
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <input
                                    type="text"
                                    value={pkg.title}
                                    onChange={(e) => updatePackage(index, { title: e.target.value })}
                                    style={{
                                        padding: "0.5rem",
                                        background: "rgba(0, 0, 0, 0.3)",
                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                        borderRadius: "0.5rem",
                                        color: "#fff",
                                        fontSize: "1.2rem",
                                        fontWeight: 600,
                                    }}
                                />
                                <input
                                    type="text"
                                    value={pkg.price}
                                    onChange={(e) => updatePackage(index, { price: e.target.value })}
                                    style={{
                                        padding: "0.5rem",
                                        background: "rgba(0, 0, 0, 0.3)",
                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                        borderRadius: "0.5rem",
                                        color: "#fff",
                                        fontSize: "1.5rem",
                                        fontWeight: 700,
                                    }}
                                />

                                <div>
                                    <label style={{ color: "#94a3b8", fontSize: "0.8rem", marginBottom: "0.5rem", display: "block" }}>
                                        Features:
                                    </label>
                                    {pkg.features.map((feature, fIndex) => (
                                        <div key={fIndex} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => updateFeature(index, fIndex, e.target.value)}
                                                style={{
                                                    flex: 1,
                                                    padding: "0.5rem",
                                                    background: "rgba(0, 0, 0, 0.3)",
                                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                                    borderRadius: "0.25rem",
                                                    color: "#fff",
                                                    fontSize: "0.875rem",
                                                }}
                                            />
                                            <button
                                                onClick={() => removeFeature(index, fIndex)}
                                                style={{
                                                    padding: "0.5rem",
                                                    background: "rgba(239, 68, 68, 0.2)",
                                                    border: "none",
                                                    borderRadius: "0.25rem",
                                                    color: "#ef4444",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addFeature(index)}
                                        style={{
                                            padding: "0.5rem 1rem",
                                            background: "rgba(255, 255, 255, 0.05)",
                                            border: "1px dashed rgba(255, 255, 255, 0.2)",
                                            borderRadius: "0.25rem",
                                            color: "#6b7280",
                                            cursor: "pointer",
                                            width: "100%",
                                            fontSize: "0.875rem",
                                        }}
                                    >
                                        + Adicionar Feature
                                    </button>
                                </div>

                                <div style={{ display: "flex", gap: "1rem" }}>
                                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8", cursor: "pointer" }}>
                                        <input
                                            type="checkbox"
                                            checked={pkg.isPopular}
                                            onChange={(e) => updatePackage(index, { isPopular: e.target.checked })}
                                        />
                                        Popular
                                    </label>
                                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8", cursor: "pointer" }}>
                                        <input
                                            type="checkbox"
                                            checked={pkg.isActive}
                                            onChange={(e) => updatePackage(index, { isActive: e.target.checked })}
                                        />
                                        Ativo
                                    </label>
                                </div>

                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <button
                                        onClick={() => setEditingIndex(null)}
                                        style={{
                                            flex: 1,
                                            padding: "0.5rem",
                                            background: "rgba(16, 185, 129, 0.2)",
                                            border: "none",
                                            borderRadius: "0.5rem",
                                            color: "#10b981",
                                            cursor: "pointer",
                                        }}
                                    >
                                        ✓ Feito
                                    </button>
                                    <button
                                        onClick={() => removePackage(index)}
                                        style={{
                                            padding: "0.5rem 1rem",
                                            background: "rgba(239, 68, 68, 0.2)",
                                            border: "none",
                                            borderRadius: "0.5rem",
                                            color: "#ef4444",
                                            cursor: "pointer",
                                        }}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // View Mode
                            <>
                                <h3 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "0.5rem", marginTop: pkg.isPopular ? "0.5rem" : 0 }}>
                                    {pkg.title}
                                </h3>
                                <div style={{
                                    fontSize: "2rem",
                                    fontWeight: 700,
                                    color: "#fff",
                                    marginBottom: "1rem",
                                }}>
                                    {pkg.price}
                                </div>
                                <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.5rem" }}>
                                    {pkg.features.map((feature, fIndex) => (
                                        <li
                                            key={fIndex}
                                            style={{
                                                color: "#94a3b8",
                                                fontSize: "0.875rem",
                                                padding: "0.5rem 0",
                                                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                            }}
                                        >
                                            <span style={{ color: "#10b981" }}>✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => setEditingIndex(index)}
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem",
                                        background: "rgba(255, 255, 255, 0.05)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        borderRadius: "0.5rem",
                                        color: "#94a3b8",
                                        cursor: "pointer",
                                    }}
                                >
                                    ✏️ Editar
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

