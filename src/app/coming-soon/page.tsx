"use client";

import React, { useState, useEffect } from "react";

// Data de lançamento - 29 de Janeiro de 2026
const LAUNCH_DATE = new Date("2026-01-29T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const difference = LAUNCH_DATE.getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
    }}>
      <div style={{
        background: "rgba(0, 212, 255, 0.1)",
        border: "1px solid rgba(0, 212, 255, 0.2)",
        borderRadius: "16px",
        padding: "20px 28px",
        minWidth: "100px",
        backdropFilter: "blur(10px)",
      }}>
        <span style={{
          fontSize: "clamp(2.5rem, 8vw, 4rem)",
          fontWeight: 800,
          fontFamily: "var(--font-heading)",
          background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span style={{
        fontSize: "0.875rem",
        color: "#8B949E",
        textTransform: "uppercase",
        letterSpacing: "2px",
        fontWeight: 500,
      }}>
        {label}
      </span>
    </div>
  );
}

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode integrar com Mailchimp, ConvertKit, etc.
    console.log("Email cadastrado:", email);
    setSubmitted(true);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: "#0D1117",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background Effects */}
      <div style={{
        position: "absolute",
        top: "-20%",
        left: "-10%",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 60%)",
        filter: "blur(80px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-20%",
        right: "-10%",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, transparent 60%)",
        filter: "blur(80px)",
        pointerEvents: "none",
      }} />
      
      {/* Grid pattern */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <main style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "48px",
        maxWidth: "800px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}>
          <h1 style={{
            fontSize: "clamp(3rem, 12vw, 5rem)",
            fontWeight: 900,
            fontFamily: "var(--font-heading)",
            background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            margin: 0,
          }}>
            Provly
          </h1>
          <p style={{
            fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
            color: "#C9D1D9",
            fontWeight: 500,
            margin: 0,
          }}>
            Prove seu valor.
          </p>
        </div>

        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 20px",
          background: "rgba(0, 212, 255, 0.1)",
          border: "1px solid rgba(0, 212, 255, 0.2)",
          borderRadius: "100px",
        }}>
          <div style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#00D4FF",
            animation: "pulse 2s ease-in-out infinite",
          }} />
          <span style={{
            fontSize: "0.875rem",
            color: "#00D4FF",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}>
            Em breve
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: "1.125rem",
          color: "#8B949E",
          lineHeight: 1.7,
          maxWidth: "500px",
          margin: 0,
        }}>
          Media kits profissionais que transformam suas métricas em parcerias. 
          Mostre para marcas porque vale a pena trabalhar com você.
        </p>

        {/* Countdown */}
        <div style={{
          display: "flex",
          gap: "clamp(12px, 4vw, 24px)",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          <TimeBlock value={timeLeft.days} label="Dias" />
          <TimeBlock value={timeLeft.hours} label="Horas" />
          <TimeBlock value={timeLeft.minutes} label="Min" />
          <TimeBlock value={timeLeft.seconds} label="Seg" />
        </div>

        {/* Email Form */}
        <div style={{
          width: "100%",
          maxWidth: "450px",
        }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{
              display: "flex",
              gap: "12px",
              flexDirection: "column",
            }}>
              <p style={{
                fontSize: "0.9rem",
                color: "#8B949E",
                margin: "0 0 8px 0",
              }}>
                Seja o primeiro a saber quando lançarmos:
              </p>
              <div style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: "1 1 250px",
                    padding: "14px 20px",
                    fontSize: "1rem",
                    background: "rgba(22, 27, 34, 0.8)",
                    border: "1px solid rgba(240, 246, 252, 0.1)",
                    borderRadius: "12px",
                    color: "#F0F6FC",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(0, 212, 255, 0.5)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(240, 246, 252, 0.1)"}
                />
                <button
                  type="submit"
                  style={{
                    padding: "14px 28px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
                    border: "none",
                    borderRadius: "12px",
                    color: "#0D1117",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 212, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Me avise →
                </button>
              </div>
            </form>
          ) : (
            <div style={{
              padding: "20px",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "12px",
            }}>
              <p style={{
                color: "#10B981",
                fontWeight: 600,
                margin: 0,
              }}>
                ✓ Pronto! Você será avisado quando lançarmos.
              </p>
            </div>
          )}
        </div>

        {/* Features Preview */}
        <div style={{
          display: "flex",
          gap: "24px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "16px",
        }}>
          {[
            { icon: "📊", text: "Métricas em tempo real" },
            { icon: "🤖", text: "Narrativa com IA" },
            { icon: "📄", text: "Export PDF" },
          ].map((feature, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#8B949E",
              fontSize: "0.9rem",
            }}>
              <span>{feature.icon}</span>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer style={{
          marginTop: "32px",
          color: "#484F58",
          fontSize: "0.8rem",
        }}>
          © 2025 Provly • Prove seu valor
        </footer>
      </main>

      {/* Pulse animation */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

