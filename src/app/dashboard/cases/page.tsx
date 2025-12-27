"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { CaseStudy } from "@/lib/types";

export default function CasesPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [cases, setCases] = useState<CaseStudy[]>([]);
    const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
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
        setCases((data?.brand_cases as CaseStudy[]) || []);
        setLoading(false);
    }

    async function saveCase() {
        if (!editingCase?.brandName) {
            setMessage({ type: "error", text: "Nome da marca é obrigatório" });
            return;
        }

        setSaving(true);
        setMessage(null);

        const supabase = createClient();
        
        let updatedCases: CaseStudy[];
        
        if (editingCase.id && cases.some(c => c.id === editingCase.id)) {
            // Update existing
            updatedCases = cases.map(c => 
                c.id === editingCase.id ? editingCase : c
            );
        } else {
            // Add new
            const newCase = {
                ...editingCase,
                id: crypto.randomUUID(),
            };
            updatedCases = [...cases, newCase];
        }

        const { error } = await supabase
            .from("profiles")
            .update({ brand_cases: updatedCases })
            .eq("id", profile.id);

        if (error) {
            setMessage({ type: "error", text: error.message });
        } else {
            setCases(updatedCases);
            setEditingCase(null);
            setMessage({ type: "success", text: "Case salvo com sucesso!" });
        }

        setSaving(false);
    }

    async function deleteCase(caseId: string) {
        if (!confirm("Tem certeza que deseja excluir este case?")) return;

        const supabase = createClient();
        const updatedCases = cases.filter(c => c.id !== caseId);

        const { error } = await supabase
            .from("profiles")
            .update({ brand_cases: updatedCases })
            .eq("id", profile.id);

        if (error) {
            setMessage({ type: "error", text: error.message });
        } else {
            setCases(updatedCases);
            setMessage({ type: "success", text: "Case excluído" });
        }
    }

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
                <div style={{ color: "#fff", fontSize: "1.2rem" }}>Carregando...</div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                    <h1 style={{
                        fontSize: "2rem",
                        fontWeight: 700,
                        color: "#fff",
                        marginBottom: "0.5rem",
                    }}>
                        Parcerias & Cases
                    </h1>
                    <p style={{ color: "#94a3b8" }}>
                        Mostre suas parcerias com marcas no seu Media Kit
                    </p>
                </div>
                <button
                    onClick={() => setEditingCase({ id: "", brandName: "", logoUrl: "" })}
                    style={{
                        padding: "0.75rem 1.5rem",
                        background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
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
                    <span>+</span>
                    Adicionar Case
                </button>
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

            {/* Cases Grid */}
            {cases.length === 0 && !editingCase ? (
                <div style={{
                    textAlign: "center",
                    padding: "4rem 2rem",
                    background: "rgba(30, 30, 46, 0.6)",
                    border: "1px dashed rgba(255, 255, 255, 0.2)",
                    borderRadius: "1rem",
                }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🤝</div>
                    <h3 style={{ color: "#fff", marginBottom: "0.5rem" }}>
                        Nenhum case cadastrado
                    </h3>
                    <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
                        Adicione parcerias com marcas para aumentar sua credibilidade
                    </p>
                    <button
                        onClick={() => setEditingCase({ id: "", brandName: "", logoUrl: "" })}
                        style={{
                            padding: "0.75rem 1.5rem",
                            background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                            border: "none",
                            borderRadius: "0.5rem",
                            color: "#fff",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Adicionar Primeiro Case
                    </button>
                </div>
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "1.5rem",
                }}>
                    {cases.map((caseItem) => (
                        <div
                            key={caseItem.id}
                            style={{
                                background: "rgba(30, 30, 46, 0.6)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "1rem",
                                padding: "1.5rem",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            {caseItem.logoUrl && (
                                <div style={{
                                    height: "60px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "1rem",
                                }}>
                                    <img
                                        src={caseItem.logoUrl}
                                        alt={caseItem.brandName}
                                        style={{
                                            maxHeight: "50px",
                                            maxWidth: "150px",
                                            objectFit: "contain",
                                        }}
                                    />
                                </div>
                            )}
                            <h3 style={{ color: "#fff", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                                {caseItem.brandName}
                            </h3>
                            {caseItem.description && (
                                <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "0.75rem" }}>
                                    {caseItem.description}
                                </p>
                            )}
                            {caseItem.metrics && (
                                <div style={{
                                    padding: "0.5rem 0.75rem",
                                    background: "rgba(139, 92, 246, 0.1)",
                                    borderRadius: "0.5rem",
                                    color: "#a78bfa",
                                    fontSize: "0.8rem",
                                    marginBottom: "1rem",
                                }}>
                                    📊 {caseItem.metrics}
                                </div>
                            )}
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button
                                    onClick={() => setEditingCase(caseItem)}
                                    style={{
                                        flex: 1,
                                        padding: "0.5rem",
                                        background: "rgba(255, 255, 255, 0.05)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        borderRadius: "0.5rem",
                                        color: "#94a3b8",
                                        fontSize: "0.875rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    ✏️ Editar
                                </button>
                                <button
                                    onClick={() => deleteCase(caseItem.id)}
                                    style={{
                                        padding: "0.5rem 0.75rem",
                                        background: "rgba(239, 68, 68, 0.1)",
                                        border: "1px solid rgba(239, 68, 68, 0.2)",
                                        borderRadius: "0.5rem",
                                        color: "#ef4444",
                                        fontSize: "0.875rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {editingCase && (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0, 0, 0, 0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 100,
                    padding: "1rem",
                }}>
                    <div style={{
                        background: "rgba(30, 30, 46, 0.98)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "1rem",
                        padding: "2rem",
                        width: "100%",
                        maxWidth: "500px",
                    }}>
                        <h2 style={{ color: "#fff", marginBottom: "1.5rem" }}>
                            {editingCase.id ? "Editar Case" : "Novo Case"}
                        </h2>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            <div>
                                <label style={{ color: "#94a3b8", fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}>
                                    Nome da Marca *
                                </label>
                                <input
                                    type="text"
                                    value={editingCase.brandName}
                                    onChange={(e) => setEditingCase({ ...editingCase, brandName: e.target.value })}
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem 1rem",
                                        background: "rgba(0, 0, 0, 0.3)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        borderRadius: "0.5rem",
                                        color: "#fff",
                                    }}
                                    placeholder="Ex: Coca-Cola"
                                />
                            </div>

                            <div>
                                <label style={{ color: "#94a3b8", fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}>
                                    URL do Logo
                                </label>
                                <input
                                    type="url"
                                    value={editingCase.logoUrl}
                                    onChange={(e) => setEditingCase({ ...editingCase, logoUrl: e.target.value })}
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem 1rem",
                                        background: "rgba(0, 0, 0, 0.3)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        borderRadius: "0.5rem",
                                        color: "#fff",
                                    }}
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label style={{ color: "#94a3b8", fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}>
                                    URL do Vídeo (opcional)
                                </label>
                                <input
                                    type="url"
                                    value={editingCase.videoUrl || ""}
                                    onChange={(e) => setEditingCase({ ...editingCase, videoUrl: e.target.value })}
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem 1rem",
                                        background: "rgba(0, 0, 0, 0.3)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        borderRadius: "0.5rem",
                                        color: "#fff",
                                    }}
                                    placeholder="https://youtube.com/..."
                                />
                            </div>

                            <div>
                                <label style={{ color: "#94a3b8", fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}>
                                    Descrição
                                </label>
                                <textarea
                                    value={editingCase.description || ""}
                                    onChange={(e) => setEditingCase({ ...editingCase, description: e.target.value })}
                                    rows={3}
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem 1rem",
                                        background: "rgba(0, 0, 0, 0.3)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        borderRadius: "0.5rem",
                                        color: "#fff",
                                        resize: "vertical",
                                    }}
                                    placeholder="Breve descrição da campanha..."
                                />
                            </div>

                            <div>
                                <label style={{ color: "#94a3b8", fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}>
                                    Resultados/Métricas
                                </label>
                                <input
                                    type="text"
                                    value={editingCase.metrics || ""}
                                    onChange={(e) => setEditingCase({ ...editingCase, metrics: e.target.value })}
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem 1rem",
                                        background: "rgba(0, 0, 0, 0.3)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        borderRadius: "0.5rem",
                                        color: "#fff",
                                    }}
                                    placeholder="Ex: 500k views, 10% conversão"
                                />
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "2rem" }}>
                            <button
                                onClick={() => setEditingCase(null)}
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    background: "transparent",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    borderRadius: "0.5rem",
                                    color: "#94a3b8",
                                    cursor: "pointer",
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={saveCase}
                                disabled={saving}
                                style={{
                                    padding: "0.75rem 2rem",
                                    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                                    border: "none",
                                    borderRadius: "0.5rem",
                                    color: "#fff",
                                    fontWeight: 600,
                                    cursor: saving ? "not-allowed" : "pointer",
                                    opacity: saving ? 0.7 : 1,
                                }}
                            >
                                {saving ? "Salvando..." : "Salvar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

