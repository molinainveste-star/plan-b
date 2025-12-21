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
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(10px)",
            borderRadius: "2rem",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.1)"
        }}
            className="no-print"
        >
            <button style={{
                background: "#25D366",
                color: "white",
                border: "none",
                borderRadius: "1.5rem",
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                whiteSpace: "nowrap"
            }}>
                <MessageCircle size={20} />
                Negociar via WhatsApp
            </button>

            <button style={{
                background: "white",
                color: "black",
                border: "none",
                borderRadius: "1.5rem",
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                whiteSpace: "nowrap"
            }}
                onClick={() => window.print()}
            >
                <Download size={20} />
                Baixar PDF
            </button>
        </div>
    );
};
