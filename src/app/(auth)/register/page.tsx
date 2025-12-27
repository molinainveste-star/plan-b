"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("As senhas não coincidem");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres");
            setLoading(false);
            return;
        }

        const supabase = createClient();

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        setSuccess(true);
    }

    if (success) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--bg-void)",
                    padding: "24px",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "400px",
                        textAlign: "center",
                    }}
                    className="animate-fade-in"
                >
                    <div
                        style={{
                            width: "64px",
                            height: "64px",
                            margin: "0 auto 24px",
                            background: "rgba(34, 197, 94, 0.15)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20,6 9,17 4,12" />
                        </svg>
                    </div>
                    <h2 style={{ margin: "0 0 12px", color: "var(--text-primary)", fontSize: "1.5rem", fontWeight: 600 }}>
                        Verifique seu email
                    </h2>
                    <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                        Enviamos um link de confirmação para{" "}
                        <span style={{ color: "var(--brand-primary)" }}>{email}</span>
                    </p>
                    <Link
                        href="/login"
                        style={{
                            display: "inline-block",
                            marginTop: "24px",
                            color: "var(--brand-primary)",
                            textDecoration: "none",
                            fontWeight: 500,
                            fontSize: "0.875rem",
                        }}
                    >
                        ← Voltar para login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--bg-void)",
                padding: "24px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background Effects */}
            <div
                style={{
                    position: "absolute",
                    top: "-20%",
                    right: "-10%",
                    width: "500px",
                    height: "500px",
                    background: "radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 60%)",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "-20%",
                    left: "-10%",
                    width: "500px",
                    height: "500px",
                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 60%)",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />

            {/* Register Card */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    position: "relative",
                    zIndex: 1,
                }}
                className="animate-fade-in"
            >
                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <Link
                        href="/"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            textDecoration: "none",
                            marginBottom: "24px",
                        }}
                    >
                        <div
                            style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "10px",
                                background: "var(--brand-gradient)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--bg-void)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20,6 9,17 4,12" />
                            </svg>
                        </div>
                        <span
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: 700,
                                color: "var(--text-primary)",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Provly
                        </span>
                    </Link>
                    <h1
                        style={{
                            margin: 0,
                            color: "var(--text-primary)",
                            fontSize: "1.5rem",
                            fontWeight: 600,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Crie sua conta
                    </h1>
                    <p style={{ margin: "8px 0 0", color: "var(--text-muted)", fontSize: "0.875rem" }}>
                        Comece a provar seu valor hoje
                    </p>
                </div>

                {/* Form Card */}
                <div
                    style={{
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "var(--radius-xl)",
                        padding: "24px",
                    }}
                >
                    <form onSubmit={handleRegister}>
                        <div style={{ marginBottom: "16px" }}>
                            <label
                                htmlFor="email"
                                style={{
                                    display: "block",
                                    color: "var(--text-secondary)",
                                    fontSize: "0.8rem",
                                    fontWeight: 500,
                                    marginBottom: "6px",
                                }}
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="seu@email.com"
                                style={{
                                    width: "100%",
                                    padding: "10px 12px",
                                    background: "var(--bg-surface)",
                                    border: "1px solid var(--border-default)",
                                    borderRadius: "var(--radius-md)",
                                    color: "var(--text-primary)",
                                    fontSize: "0.875rem",
                                    outline: "none",
                                    transition: "border-color var(--transition-fast)",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <label
                                htmlFor="password"
                                style={{
                                    display: "block",
                                    color: "var(--text-secondary)",
                                    fontSize: "0.8rem",
                                    fontWeight: 500,
                                    marginBottom: "6px",
                                }}
                            >
                                Senha
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Mínimo 6 caracteres"
                                style={{
                                    width: "100%",
                                    padding: "10px 12px",
                                    background: "var(--bg-surface)",
                                    border: "1px solid var(--border-default)",
                                    borderRadius: "var(--radius-md)",
                                    color: "var(--text-primary)",
                                    fontSize: "0.875rem",
                                    outline: "none",
                                    transition: "border-color var(--transition-fast)",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label
                                htmlFor="confirmPassword"
                                style={{
                                    display: "block",
                                    color: "var(--text-secondary)",
                                    fontSize: "0.8rem",
                                    fontWeight: 500,
                                    marginBottom: "6px",
                                }}
                            >
                                Confirmar Senha
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                style={{
                                    width: "100%",
                                    padding: "10px 12px",
                                    background: "var(--bg-surface)",
                                    border: "1px solid var(--border-default)",
                                    borderRadius: "var(--radius-md)",
                                    color: "var(--text-primary)",
                                    fontSize: "0.875rem",
                                    outline: "none",
                                    transition: "border-color var(--transition-fast)",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                        {error && (
                            <div
                                style={{
                                    padding: "10px 12px",
                                    background: "rgba(239, 68, 68, 0.1)",
                                    border: "1px solid rgba(239, 68, 68, 0.2)",
                                    borderRadius: "var(--radius-md)",
                                    marginBottom: "16px",
                                }}
                            >
                                <p style={{ margin: 0, color: "var(--error)", fontSize: "0.8rem" }}>{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                background: "var(--brand-gradient)",
                                border: "none",
                                borderRadius: "var(--radius-md)",
                                color: "var(--bg-void)",
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                cursor: loading ? "not-allowed" : "pointer",
                                opacity: loading ? 0.7 : 1,
                                transition: "opacity var(--transition-fast)",
                            }}
                        >
                            {loading ? "Criando conta..." : "Criar conta"}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p
                    style={{
                        textAlign: "center",
                        marginTop: "20px",
                        color: "var(--text-muted)",
                        fontSize: "0.8rem",
                    }}
                >
                    Já tem conta?{" "}
                    <Link
                        href="/login"
                        style={{
                            color: "var(--brand-primary)",
                            textDecoration: "none",
                            fontWeight: 500,
                        }}
                    >
                        Entrar
                    </Link>
                </p>

                {/* Terms */}
                <p
                    style={{
                        textAlign: "center",
                        marginTop: "24px",
                        color: "var(--text-dimmed)",
                        fontSize: "0.7rem",
                        lineHeight: 1.5,
                    }}
                >
                    Ao criar conta, você concorda com os{" "}
                    <Link href="/termos" style={{ color: "var(--text-muted)", textDecoration: "underline" }}>
                        Termos de Uso
                    </Link>{" "}
                    e{" "}
                    <Link href="/privacidade" style={{ color: "var(--text-muted)", textDecoration: "underline" }}>
                        Política de Privacidade
                    </Link>
                </p>
            </div>
        </div>
    );
}
