"use client";

import React from "react";
import { MessageCircle, Download } from "lucide-react";

export const CallToAction: React.FC = () => {
    return (
        <div style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            display: "flex",
            gap: "1rem",
            padding: "0.75rem",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            borderRadius: "50px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
            border: "1px solid rgba(255,255,255,0.5)"
        }}
            className="no-print"
        >
            <button style={{
                background: "#25D366", // WhatsApp Green
                color: "white",
                border: "none",
                borderRadius: "2rem",
                padding: "0.875rem 2rem",
                fontSize: "1rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow: "0 10px 20px -5px rgba(37, 211, 102, 0.4)",
                transition: "all 0.2s ease"
            }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
                <MessageCircle size={22} />
                Negociar via WhatsApp
            </button>

            <button style={{
                background: "var(--background)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                borderRadius: "2rem",
                padding: "0.875rem 1.5rem",
                fontSize: "1rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease"
            }}
                onClick={() => window.print()}
                onMouseEnter={e => e.currentTarget.style.background = "var(--secondary)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--background)"}
            >
                <Download size={20} />
                Baixar PDF
            </button>
        </div>
    );
};
