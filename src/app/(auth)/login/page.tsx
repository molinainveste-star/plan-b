"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/dashboard";

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const supabase = createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        router.push(redirect);
        router.refresh();
    }

    async function handleGoogleLogin() {
        setLoadingGoogle(true);
        setError(null);

        const supabase = createClient();

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirect)}`,
            },
        });

        if (error) {
            setError(error.message);
            setLoadingGoogle(false);
        }
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
                    left: "-10%",
                    width: "500px",
                    height: "500px",
                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 60%)",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "-20%",
                    right: "-10%",
                    width: "500px",
                    height: "500px",
                    background: "radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 60%)",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />

            {/* Login Card */}
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
                        Bem-vindo de volta
                    </h1>
                    <p style={{ margin: "8px 0 0", color: "var(--text-muted)", fontSize: "0.875rem" }}>
                        Entre na sua conta para continuar
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
                    {/* Google Login */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loadingGoogle}
                        style={{
                            width: "100%",
                            padding: "12px 16px",
                            background: "var(--text-primary)",
                            border: "none",
                            borderRadius: "var(--radius-md)",
                            color: "var(--bg-void)",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            cursor: loadingGoogle ? "not-allowed" : "pointer",
                            opacity: loadingGoogle ? 0.7 : 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                            transition: "opacity var(--transition-fast)",
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        {loadingGoogle ? "Conectando..." : "Continuar com Google"}
                    </button>

                    {/* Divider */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            margin: "20px 0",
                        }}
                    >
                        <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
                        <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>ou</span>
                        <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleLogin}>
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

                        <div style={{ marginBottom: "20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                                <label
                                    htmlFor="password"
                                    style={{
                                        color: "var(--text-secondary)",
                                        fontSize: "0.8rem",
                                        fontWeight: 500,
                                    }}
                                >
                                    Senha
                                </label>
                                <Link
                                    href="/forgot-password"
                                    style={{
                                        color: "var(--brand-primary)",
                                        fontSize: "0.75rem",
                                        textDecoration: "none",
                                    }}
                                >
                                    Esqueceu?
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            {loading ? "Entrando..." : "Entrar"}
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
                    Não tem conta?{" "}
                    <Link
                        href="/register"
                        style={{
                            color: "var(--brand-primary)",
                            textDecoration: "none",
                            fontWeight: 500,
                        }}
                    >
                        Criar conta
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
                    Ao continuar, você concorda com os{" "}
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

export default function LoginPage() {
    return (
        <Suspense
            fallback={
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "var(--bg-void)",
                    }}
                >
                    <p style={{ color: "var(--text-muted)" }}>Carregando...</p>
                </div>
            }
        >
            <LoginForm />
        </Suspense>
    );
}
