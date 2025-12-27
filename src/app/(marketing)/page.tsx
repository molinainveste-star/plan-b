"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

// ============ ICONS ============
const Icons = {
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  ),
  Play: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21 5,3" />
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  ),
  BarChart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  Sparkles: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </svg>
  ),
  FileText: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  Link: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  ),
  Zap: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
    </svg>
  ),
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Globe: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  Star: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
    </svg>
  ),
};

// ============ DATA ============
const features = [
  {
    icon: Icons.BarChart,
    title: "Métricas em tempo real",
    description: "Sincronize seus dados do YouTube, Instagram e TikTok automaticamente.",
  },
  {
    icon: Icons.Sparkles,
    title: "Narrativa com IA",
    description: "Gere descrições profissionais que destacam seus pontos fortes.",
  },
  {
    icon: Icons.FileText,
    title: "Export PDF",
    description: "Baixe seu Media Kit em PDF pronto para enviar às marcas.",
  },
  {
    icon: Icons.Link,
    title: "Link compartilhável",
    description: "Página pública com suas métricas sempre atualizadas.",
  },
  {
    icon: Icons.Zap,
    title: "Setup em 2 minutos",
    description: "Conecte seu canal e tenha seu Media Kit pronto instantaneamente.",
  },
  {
    icon: Icons.Globe,
    title: "Multi-plataforma",
    description: "Consolide dados de todas as suas redes em um só lugar.",
  },
];

const testimonials = [
  {
    quote: "Fechei 3 parcerias em 1 mês usando o Provly. Antes eu perdia horas montando propostas.",
    author: "Lucas Silva",
    role: "@lucastech",
    followers: "125K inscritos",
    avatar: "L",
  },
  {
    quote: "O Media Kit do Provly passa muito mais profissionalismo. As marcas respondem mais rápido.",
    author: "Marina Costa",
    role: "@marinacooks",
    followers: "89K inscritos",
    avatar: "M",
  },
  {
    quote: "A narrativa gerada por IA é incrível. Captura exatamente o que eu quero transmitir.",
    author: "Pedro Mendes",
    role: "@pedrogames",
    followers: "250K inscritos",
    avatar: "P",
  },
];

const stats = [
  { value: "50K+", label: "Criadores" },
  { value: "R$2M+", label: "Em parcerias fechadas" },
  { value: "4.9", label: "Avaliação média" },
];

// ============ COMPONENT ============
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-base)",
        color: "var(--text-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Effects */}
      <div className="gradient-radial-tl" />
      <div className="gradient-radial-br" />
      <div
        className="grid-pattern"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.5 }}
      />

      {/* Navigation */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 24px",
          transition: "all 200ms",
          backgroundColor: scrolled ? "rgba(12, 12, 15, 0.8)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
              className="gradient-text"
            >
              Provly
            </span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <div style={{ display: "flex", gap: "24px" }} className="nav-links">
              <NavLink href="#features">Recursos</NavLink>
              <NavLink href="#testimonials">Depoimentos</NavLink>
              <NavLink href="#pricing">Preços</NavLink>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Link
                href="/login"
                style={{
                  padding: "8px 16px",
                  color: "var(--text-secondary)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "color 150ms",
                }}
              >
                Entrar
              </Link>
              <Link
                href="/register"
                style={{
                  padding: "8px 20px",
                  background: "var(--brand-gradient)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--bg-void)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 150ms",
                }}
              >
                Começar grátis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Badge */}
        <div
          className="animate-fade-in-down"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            background: "rgba(139, 92, 246, 0.15)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "var(--radius-full)",
            marginBottom: "32px",
          }}
        >
          <span style={{ fontSize: "0.8rem" }}>✨</span>
          <span style={{ fontSize: "0.85rem", color: "var(--brand-secondary)", fontWeight: 500 }}>
            Novo: Narrativa com IA Gemini
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: "900px",
            marginBottom: "24px",
          }}
        >
          Media Kits que{" "}
          <span className="gradient-text">fecham parcerias</span>
        </h1>

        {/* Subheadline */}
        <p
          className="animate-fade-in-up"
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            color: "var(--text-secondary)",
            maxWidth: "600px",
            lineHeight: 1.6,
            marginBottom: "40px",
            animationDelay: "100ms",
          }}
        >
          Transforme suas métricas em propostas profissionais. 
          Mostre para marcas porque vale a pena trabalhar com você.
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-fade-in-up stagger"
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
            animationDelay: "200ms",
          }}
        >
          <Link
            href="/register"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              background: "var(--brand-gradient)",
              borderRadius: "var(--radius-md)",
              color: "var(--bg-void)",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 200ms",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            Começar grátis
            <Icons.ArrowRight />
          </Link>
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
              color: "var(--text-primary)",
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 200ms",
            }}
          >
            <Icons.Play />
            Ver demo
          </button>
        </div>

        {/* Social Proof */}
        <div
          className="animate-fade-in-up"
          style={{
            marginTop: "64px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            animationDelay: "400ms",
          }}
        >
          {/* Avatars */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {["L", "M", "P", "A", "R"].map((initial, i) => (
              <div
                key={i}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: `hsl(${200 + i * 30}, 70%, 50%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "white",
                  marginLeft: i > 0 ? "-10px" : 0,
                  border: "2px solid var(--bg-base)",
                }}
              >
                {initial}
              </div>
            ))}
            <span
              style={{
                marginLeft: "12px",
                color: "var(--text-muted)",
                fontSize: "0.9rem",
              }}
            >
              +50K criadores
            </span>
          </div>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ display: "flex", color: "#FFC107" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Icons.Star key={star} />
              ))}
            </div>
            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              4.9/5 de 2.000+ avaliações
            </span>
          </div>
        </div>

        {/* Hero Image/Preview */}
        <div
          className="animate-fade-in-up"
          style={{
            marginTop: "80px",
            width: "100%",
            maxWidth: "1000px",
            aspectRatio: "16/9",
            background: "var(--bg-elevated)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-subtle)",
            overflow: "hidden",
            position: "relative",
            boxShadow: "var(--shadow-xl), var(--shadow-glow)",
            animationDelay: "500ms",
          }}
        >
          {/* Dashboard Preview Mockup */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                padding: "40px",
                textAlign: "center",
              }}
            >
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
                [Preview do Dashboard]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          padding: "80px 24px",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "48px",
          }}
        >
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                className="gradient-text"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  marginBottom: "8px",
                }}
              >
                {stat.value}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <span
              style={{
                display: "inline-block",
                padding: "6px 16px",
                background: "rgba(0, 212, 255, 0.1)",
                borderRadius: "var(--radius-full)",
                color: "var(--brand-primary)",
                fontSize: "0.85rem",
                fontWeight: 600,
                marginBottom: "24px",
              }}
            >
              RECURSOS
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginBottom: "16px",
              }}
            >
              Tudo que você precisa para{" "}
              <span className="gradient-text">fechar parcerias</span>
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Ferramentas profissionais para criadores que levam seu trabalho a sério.
            </p>
          </div>

          {/* Features Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  style={{
                    padding: "32px",
                    background: "var(--bg-elevated)",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--border-subtle)",
                    transition: "all 200ms",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "var(--radius-md)",
                      background: "rgba(0, 212, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--brand-primary)",
                      marginBottom: "20px",
                    }}
                  >
                    <Icon />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      marginBottom: "12px",
                      color: "var(--text-primary)",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        style={{
          padding: "120px 24px",
          background: "var(--bg-void)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <span
              style={{
                display: "inline-block",
                padding: "6px 16px",
                background: "rgba(139, 92, 246, 0.1)",
                borderRadius: "var(--radius-full)",
                color: "var(--brand-secondary)",
                fontSize: "0.85rem",
                fontWeight: 600,
                marginBottom: "24px",
              }}
            >
              DEPOIMENTOS
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              Amado por criadores
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                style={{
                  padding: "32px",
                  background: "var(--bg-elevated)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", color: "#FFC107", marginBottom: "20px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icons.Star key={star} />
                  ))}
                </div>

                {/* Quote */}
                <p
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    marginBottom: "24px",
                  }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "var(--brand-gradient)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      color: "var(--bg-void)",
                    }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                      {testimonial.author}
                    </div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      {testimonial.role} • {testimonial.followers}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "120px 24px" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
            padding: "80px 48px",
            background: "linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
            borderRadius: "var(--radius-2xl)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 2.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Pronto para <span className="gradient-text">provar seu valor</span>?
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              marginBottom: "32px",
              maxWidth: "500px",
              margin: "0 auto 32px",
            }}
          >
            Junte-se a milhares de criadores que já estão fechando mais parcerias.
          </p>
          <Link
            href="/register"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "16px 32px",
              background: "var(--brand-gradient)",
              borderRadius: "var(--radius-md)",
              color: "var(--bg-void)",
              fontSize: "1.1rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 200ms",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            Começar grátis
            <Icons.ArrowRight />
          </Link>
          <p style={{ marginTop: "16px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Sem cartão de crédito • Setup em 2 minutos
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "48px 24px",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <span className="gradient-text" style={{ fontWeight: 800, fontSize: "1.25rem" }}>
              Provly
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              © 2025 Provly. Todos os direitos reservados.
            </span>
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link
              href="/termos"
              style={{ color: "var(--text-muted)", fontSize: "0.9rem", textDecoration: "none" }}
            >
              Termos de Uso
            </Link>
            <Link
              href="/privacidade"
              style={{ color: "var(--text-muted)", fontSize: "0.9rem", textDecoration: "none" }}
            >
              Privacidade
            </Link>
          </div>
        </div>
      </footer>

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}

// Nav Link Component
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        color: "var(--text-secondary)",
        fontSize: "0.9rem",
        fontWeight: 500,
        textDecoration: "none",
        transition: "color 150ms",
      }}
    >
      {children}
    </a>
  );
}

