"use client";

import React from "react";
import { MessageCircle, Download } from "lucide-react";

export const CallToAction: React.FC = () => {
    return (
        <div 
            style={{
                position: "fixed",
                bottom: "var(--space-6)",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 100,
                display: "flex",
                gap: "var(--space-3)",
                padding: "var(--space-3)",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(16px)",
                borderRadius: "var(--radius-full)",
                boxShadow: "var(--shadow-xl), 0 0 0 1px rgba(0,0,0,0.04)",
                animation: "fadeInUp 0.5s ease forwards",
                animationDelay: "300ms",
                opacity: 0,
            }}
            className="no-print"
        >
            {/* WhatsApp Button */}
            <button 
                style={{
                    background: "#25D366",
                    color: "white",
                    border: "none",
                    borderRadius: "var(--radius-full)",
                    padding: "var(--space-3) var(--space-6)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    boxShadow: "0 4px 14px rgba(37, 211, 102, 0.3)",
                    transition: "all var(--transition-base)",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(37, 211, 102, 0.4)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 14px rgba(37, 211, 102, 0.3)";
                }}
            >
                <MessageCircle size={20} />
                Negociar via WhatsApp
            </button>

            {/* PDF Button */}
            <button 
                style={{
                    background: "var(--secondary)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-full)",
                    padding: "var(--space-3) var(--space-5)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all var(--transition-base)",
                }}
                onClick={() => window.print()}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.background = "var(--border)";
                    e.currentTarget.style.borderColor = "transparent";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "var(--secondary)";
                    e.currentTarget.style.borderColor = "var(--border)";
                }}
            >
                <Download size={18} />
                Baixar PDF
            </button>
        </div>
    );
};
