"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { createProfile } from "@/lib/actions";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    slug: string;
    youtubeChannelId?: string;
  }>({
    name: "",
    email: "",
    slug: "",
    youtubeChannelId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!formData.name || !formData.slug) {
      setError("Nome e URL única são obrigatórios.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await createProfile(formData);

      if (result.success) {
        router.push(`/${result.slug}`);
      } else {
        setError(result.error || "Algo deu errado.");
      }
    } catch (err) {
      setError("Falha ao criar perfil.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "var(--background)",
      }}
    >
      <main
        style={{
          width: "100%",
          maxWidth: "480px",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h1
            className="text-gradient"
            style={{
              fontSize: "3.5rem",
              fontWeight: 800,
              marginBottom: "0.5rem",
              letterSpacing: "-0.04em",
            }}
          >
            PubliScore
          </h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: "1.125rem", fontWeight: 500 }}>
            Media Kits Profissionais para Criadores
          </p>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: "3rem",
            borderRadius: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem", color: "var(--foreground)" }}>
              Começar Agora
            </h2>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
              Crie sua URL única e comece a rastrear suas métricas.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <Input
              label="Nome Completo"
              placeholder="ex: Jane Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Endereço de E-mail"
              type="email"
              placeholder="jane@exemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
              label="ID do Canal do YouTube (Opcional)"
              placeholder="ex: UC... ou @handle"
              value={formData.youtubeChannelId || ""}
              onChange={(e) => setFormData({ ...formData, youtubeChannelId: e.target.value })}
            />

            <div>
              <Input
                label="Sua URL Única (Slug)"
                placeholder="janedoe"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted-foreground)",
                  marginTop: "0.5rem",
                  fontWeight: 500,
                }}
              >
                publiscore.com/{formData.slug || "seu-nome"}
              </p>
            </div>

            {error && (
              <div style={{ color: "#ef4444", fontSize: "0.875rem", textAlign: "center" }}>
                {error}
              </div>
            )}

            <Button type="submit" fullWidth style={{ marginTop: "0.5rem", height: "3.5rem", borderRadius: "1rem" }} disabled={isLoading}>
              {isLoading ? "Criando..." : "Criar Media Kit"}
            </Button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.875rem",
            color: "var(--muted-foreground)",
            opacity: 0.6,
          }}
        >
          &copy; {new Date().getFullYear()} PubliScore. Todos os direitos reservados.
        </p>
      </main>
    </div>
  );
}
