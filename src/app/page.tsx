"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { createProfile } from "@/lib/actions";
import { User, Mail, Youtube, Link, Sparkles, Zap, BarChart3 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
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
        background: "var(--background)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Effects */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          left: "-20%",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 60%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          right: "-20%",
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 60%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="bg-grid"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      <main
        style={{
          width: "100%",
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-10)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Hero Section */}
        <div 
          style={{ 
            textAlign: "center",
            animation: "fadeInUp 0.6s ease forwards",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "var(--space-2) var(--space-4)",
              background: "var(--primary-light)",
              borderRadius: "var(--radius-full)",
              marginBottom: "var(--space-6)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
            }}
          >
            <Sparkles size={14} style={{ color: "var(--primary)" }} />
            <span style={{ 
              fontSize: "var(--text-sm)", 
              color: "var(--primary)",
              fontWeight: 600,
            }}>
              Powered by AI
            </span>
          </div>

          <h1
            className="text-gradient"
            style={{
              fontSize: "clamp(3rem, 10vw, 4.5rem)",
              fontWeight: 900,
              marginBottom: "var(--space-4)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              fontFamily: "var(--font-heading)",
            }}
          >
            Provly
          </h1>
          <p 
            style={{ 
              color: "var(--foreground-muted)", 
              fontSize: "var(--text-2xl)", 
              fontWeight: 600,
              maxWidth: "400px",
              margin: "0 auto",
              lineHeight: "var(--leading-relaxed)",
            }}
          >
            Prove seu <span style={{ color: "var(--primary)" }}>valor</span>.
          </p>
        </div>

        {/* Features Pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "var(--space-3)",
            flexWrap: "wrap",
            animation: "fadeInUp 0.6s ease forwards",
            animationDelay: "0.1s",
            opacity: 0,
          }}
        >
          {[
            { icon: <Youtube size={14} />, text: "Sync YouTube" },
            { icon: <Zap size={14} />, text: "IA Narrativa" },
            { icon: <BarChart3 size={14} />, text: "Métricas Live" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
                padding: "var(--space-2) var(--space-4)",
                background: "var(--background-secondary)",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--border)",
                fontSize: "var(--text-sm)",
                color: "var(--foreground-secondary)",
              }}
            >
              {item.icon}
              {item.text}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div
          className="glass-panel"
          style={{
            padding: "var(--space-10)",
            borderRadius: "var(--radius-2xl)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-8)",
            animation: "fadeInUp 0.6s ease forwards",
            animationDelay: "0.2s",
            opacity: 0,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2 
              style={{ 
                fontSize: "var(--text-2xl)", 
                marginBottom: "var(--space-2)", 
                color: "var(--foreground)",
                fontWeight: 700,
                fontFamily: "var(--font-heading)",
              }}
            >
              Crie seu Provly
            </h2>
            <p 
              style={{ 
                color: "var(--foreground-muted)", 
                fontSize: "var(--text-sm)",
              }}
            >
              Media kits que transformam métricas em parcerias
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}
          >
            <Input
              label="Nome Completo"
              placeholder="Como você quer ser chamado"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              icon={<User size={18} />}
            />

            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              icon={<Mail size={18} />}
            />

            <Input
              label="Canal do YouTube (opcional)"
              placeholder="@seucanal ou UC..."
              value={formData.youtubeChannelId}
              onChange={(e) => setFormData({ ...formData, youtubeChannelId: e.target.value })}
              icon={<Youtube size={18} />}
            />

            <div>
              <Input
                label="Sua URL Única"
                placeholder="seuNome"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                icon={<Link size={18} />}
              />
              <div
                style={{
                  marginTop: "var(--space-2)",
                  padding: "var(--space-2) var(--space-3)",
                  background: "var(--background-tertiary)",
                  borderRadius: "var(--radius-md)",
                  display: "inline-block",
                }}
              >
                <span style={{ 
                  fontSize: "var(--text-sm)", 
                  color: "var(--foreground-muted)",
                }}>
                  provly.io/
                </span>
                <span style={{ 
                  fontSize: "var(--text-sm)", 
                  color: "var(--primary)",
                  fontWeight: 600,
                }}>
                  {formData.slug || "seu-nome"}
                </span>
              </div>
            </div>

            {error && (
              <div 
                style={{ 
                  color: "var(--error)", 
                  fontSize: "var(--text-sm)", 
                  textAlign: "center",
                  background: "var(--error-light)",
                  padding: "var(--space-3)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                }}
              >
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              fullWidth 
              size="lg"
              variant="glow"
              loading={isLoading}
              style={{ marginTop: "var(--space-2)" }}
            >
              {isLoading ? "Criando..." : "Prove seu valor →"}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p
          style={{
            textAlign: "center",
            fontSize: "var(--text-sm)",
            color: "var(--foreground-muted)",
            opacity: 0.6,
          }}
        >
          © {new Date().getFullYear()} Provly • Prove seu valor
        </p>
      </main>
    </div>
  );
}
