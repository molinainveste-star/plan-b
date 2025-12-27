"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    
    const [profile, setProfile] = useState({
        username: "",
        full_name: "",
        email: "",
        bio: "",
        niche: "",
        location: "",
        website: "",
        avatar_url: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
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

        if (data) {
            setProfile({
                username: data.username || "",
                full_name: data.full_name || "",
                email: data.email || user.email || "",
                bio: data.bio || "",
                niche: data.niche || "",
                location: data.location || "",
                website: data.website || "",
                avatar_url: data.avatar_url || "",
            });
        }

        setLoading(false);
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        const supabase = createClient();
        
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push("/login");
            return;
        }

        // Validate username
        if (profile.username.length < 3) {
            setMessage({ type: "error", text: "Username deve ter pelo menos 3 caracteres" });
            setSaving(false);
            return;
        }

        if (!/^[a-z0-9_-]+$/i.test(profile.username)) {
            setMessage({ type: "error", text: "Username só pode conter letras, números, _ e -" });
            setSaving(false);
            return;
        }

        const { error } = await supabase
            .from("profiles")
            .update({
                username: profile.username.toLowerCase(),
                full_name: profile.full_name,
                bio: profile.bio,
                niche: profile.niche,
                location: profile.location,
                website: profile.website,
                avatar_url: profile.avatar_url,
                updated_at: new Date().toISOString(),
            })
            .eq("user_id", user.id);

        if (error) {
            if (error.code === "23505") {
                setMessage({ type: "error", text: "Este username já está em uso" });
            } else {
                setMessage({ type: "error", text: error.message });
            }
        } else {
            setMessage({ type: "success", text: "Perfil atualizado com sucesso!" });
        }

        setSaving(false);
    }

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
                <div style={{ color: "#fff", fontSize: "1.2rem" }}>Carregando...</div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ marginBottom: "2rem" }}>
                <h1 style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "0.5rem",
                }}>
                    Editar Perfil
                </h1>
                <p style={{ color: "#94a3b8" }}>
                    Configure suas informações públicas do Media Kit
                </p>
            </div>

            <form onSubmit={handleSave}>
                <div style={{
                    background: "rgba(30, 30, 46, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "1rem",
                    padding: "2rem",
                    marginBottom: "1.5rem",
                }}>
                    <h2 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "1.5rem" }}>
                        Informações Básicas
                    </h2>

                    <div style={{ display: "grid", gap: "1.5rem" }}>
                        {/* Avatar Preview */}
                        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                            <div style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                background: profile.avatar_url 
                                    ? `url(${profile.avatar_url}) center/cover`
                                    : "linear-gradient(135deg, #8b5cf6, #6366f1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: "2rem",
                            }}>
                                {!profile.avatar_url && (profile.full_name?.[0] || "?")}
                            </div>
                            <div style={{ flex: 1 }}>
                                <InputField
                                    label="URL do Avatar"
                                    value={profile.avatar_url}
                                    onChange={(v) => setProfile({ ...profile, avatar_url: v })}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                            <InputField
                                label="Nome Completo"
                                value={profile.full_name}
                                onChange={(v) => setProfile({ ...profile, full_name: v })}
                                placeholder="Seu nome"
                                required
                            />
                            <InputField
                                label="Username"
                                value={profile.username}
                                onChange={(v) => setProfile({ ...profile, username: v })}
                                placeholder="seunome"
                                prefix="publiscore.com/"
                                required
                            />
                        </div>

                        <InputField
                            label="Bio"
                            value={profile.bio}
                            onChange={(v) => setProfile({ ...profile, bio: v })}
                            placeholder="Conte um pouco sobre você e seu conteúdo..."
                            multiline
                        />

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                            <InputField
                                label="Nicho"
                                value={profile.niche}
                                onChange={(v) => setProfile({ ...profile, niche: v })}
                                placeholder="Ex: Fitness, Games, Tech..."
                            />
                            <InputField
                                label="Localização"
                                value={profile.location}
                                onChange={(v) => setProfile({ ...profile, location: v })}
                                placeholder="Ex: São Paulo, Brasil"
                            />
                        </div>

                        <InputField
                            label="Website"
                            value={profile.website}
                            onChange={(v) => setProfile({ ...profile, website: v })}
                            placeholder="https://seusite.com"
                        />
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

                {/* Actions */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        style={{
                            padding: "0.75rem 1.5rem",
                            background: "transparent",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "0.5rem",
                            color: "#94a3b8",
                            fontWeight: 500,
                            cursor: "pointer",
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
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
                        {saving ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </div>
            </form>
        </div>
    );
}

function InputField({ 
    label, 
    value, 
    onChange, 
    placeholder, 
    required, 
    multiline,
    prefix,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    multiline?: boolean;
    prefix?: string;
}) {
    const inputStyle = {
        width: "100%",
        padding: "0.75rem 1rem",
        paddingLeft: prefix ? "0" : "1rem",
        background: "rgba(0, 0, 0, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "0.5rem",
        color: "#fff",
        fontSize: "0.95rem",
        outline: "none",
        transition: "all 0.2s",
    };

    return (
        <div>
            <label style={{
                display: "block",
                color: "#94a3b8",
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
            }}>
                {label}
                {required && <span style={{ color: "#ef4444" }}> *</span>}
            </label>
            
            {prefix ? (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                }}>
                    <span style={{
                        padding: "0.75rem 0.5rem 0.75rem 1rem",
                        color: "#6b7280",
                        fontSize: "0.95rem",
                        whiteSpace: "nowrap",
                    }}>
                        {prefix}
                    </span>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        required={required}
                        style={{
                            ...inputStyle,
                            background: "transparent",
                            border: "none",
                            borderRadius: 0,
                        }}
                    />
                </div>
            ) : multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    rows={4}
                    style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: "100px",
                    }}
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    style={inputStyle}
                />
            )}
        </div>
    );
}

