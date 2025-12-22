"use client";

import React, { useState } from "react";
import { MessageCircle, Download, Loader2 } from "lucide-react";
import { generatePdf } from "@/lib/generatePdf";

export const CallToAction: React.FC = () => {
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    const handleDownloadPdf = async () => {
        setIsGeneratingPdf(true);
        try {
            await generatePdf("media-kit-content", "media-kit.pdf");
        } finally {
            setIsGeneratingPdf(false);
        }
    };

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
                background: "rgba(13, 17, 23, 0.9)",
                backdropFilter: "blur(20px)",
                borderRadius: "var(--radius-full)",
                boxShadow: "var(--shadow-xl), 0 0 0 1px var(--border)",
                animation: "fadeInUp 0.5s ease forwards",
                animationDelay: "0.5s",
                opacity: 0,
            }}
            className="no-print"
        >
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
                    boxShadow: "0 0 20px rgba(37, 211, 102, 0.4)",
                    transition: "all var(--transition-base)",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 0 30px rgba(37, 211, 102, 0.6)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(37, 211, 102, 0.4)";
                }}
            >
                <MessageCircle size={20} />
                Negociar via WhatsApp
            </button>

            <button 
                disabled={isGeneratingPdf}
                style={{
                    background: "var(--background-tertiary)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-full)",
                    padding: "var(--space-3) var(--space-5)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                    cursor: isGeneratingPdf ? "wait" : "pointer",
                    whiteSpace: "nowrap",
                    transition: "all var(--transition-base)",
                    opacity: isGeneratingPdf ? 0.7 : 1,
                }}
                onClick={handleDownloadPdf}
                onMouseEnter={(e) => {
                    if (!isGeneratingPdf) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.borderColor = "var(--primary)";
                        e.currentTarget.style.boxShadow = "var(--shadow-glow)";
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                }}
            >
                {isGeneratingPdf ? (
                    <>
                        <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                        Gerando...
                    </>
                ) : (
                    <>
                        <Download size={18} />
                        PDF
                    </>
                )}
            </button>
        </div>
    );
};
