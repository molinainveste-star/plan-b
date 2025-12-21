"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { createProfile } from "@/lib/actions";
import { User, Mail, Youtube, Link } from "lucide-react";

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
        padding: "var(--space-6)",
        background: "var(--gradient-surface)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decoration */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: "var(--gradient-primary-soft)",
          borderRadius: "50%",
          filter: "blur(80px)",
          opacity: 0.5,
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
          background: "rgba(76, 201, 240, 0.1)",
          borderRadius: "50%",
          filter: "blur(60px)",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <main
        style={{
          width: "100%",
          maxWidth: "440px",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-8)",
          position: "relative",
          zIndex: 1,
          animation: "fadeInUp 0.5s ease forwards",
        }}
      >
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-2)" }}>
          <h1
            className="text-gradient"
            style={{
              fontSize: "clamp(var(--text-4xl), 8vw, var(--text-5xl))",
              fontWeight: 700,
              marginBottom: "var(--space-3)",
              letterSpacing: "var(--tracking-tight)",
              lineHeight: 1,
            }}
          >
            PubliScore
          </h1>
          <p 
            style={{ 
              color: "var(--muted-foreground)", 
              fontSize: "var(--text-lg)", 
              fontWeight: 500,
              lineHeight: "var(--leading-relaxed)",
            }}
          >
            Media Kits Profissionais para Criadores
          </p>
        </div>

        {/* Form Card */}
        <div
          className="glass-panel"
          style={{
            padding: "var(--space-8)",
            borderRadius: "var(--radius-xl)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2 
              style={{ 
                fontSize: "var(--text-2xl)", 
                marginBottom: "var(--space-2)", 
                color: "var(--foreground)",
                fontWeight: 600,
              }}
            >
              Começar Agora
            </h2>
            <p 
              style={{ 
                color: "var(--muted-foreground)", 
                fontSize: "var(--text-sm)",
                lineHeight: "var(--leading-relaxed)",
              }}
            >
              Crie sua URL única e comece a rastrear suas métricas.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}
          >
            <Input
              label="Nome Completo"
              placeholder="ex: Jane Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              icon={<User size={18} />}
            />

            <Input
              label="Endereço de E-mail"
              type="email"
              placeholder="jane@exemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              icon={<Mail size={18} />}
            />

            <Input
              label="ID do Canal do YouTube (Opcional)"
              placeholder="ex: UC... ou @handle"
              value={formData.youtubeChannelId || ""}
              onChange={(e) => setFormData({ ...formData, youtubeChannelId: e.target.value })}
              icon={<Youtube size={18} />}
              hint="Conecte seu canal para sincronizar métricas automaticamente"
            />

            <div>
              <Input
                label="Sua URL Única (Slug)"
                placeholder="janedoe"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                icon={<Link size={18} />}
              />
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--muted-foreground)",
                  marginTop: "var(--space-2)",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-1)",
                }}
              >
                <span style={{ 
                  background: "var(--primary-light)", 
                  padding: "var(--space-1) var(--space-2)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--primary)",
                }}>
                  publiscore.com/{formData.slug || "seu-nome"}
                </span>
              </p>
            </div>

            {error && (
              <div 
                style={{ 
                  color: "var(--error)", 
                  fontSize: "var(--text-sm)", 
                  textAlign: "center",
                  background: "rgba(239, 68, 68, 0.1)",
                  padding: "var(--space-3)",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 500,
                }}
              >
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              fullWidth 
              size="lg"
              loading={isLoading}
              style={{ marginTop: "var(--space-2)" }}
            >
              {isLoading ? "Criando..." : "Criar Media Kit"}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p
          style={{
            textAlign: "center",
            fontSize: "var(--text-xs)",
            color: "var(--muted-foreground)",
          }}
        >
          © {new Date().getFullYear()} PubliScore. Todos os direitos reservados.
        </p>
      </main>
    </div>
  );
}
