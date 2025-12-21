"use client";

import React from "react";

export const CaseStudies: React.FC = () => {
    // Mock brands
    const brands = [
        { name: "Nike", color: "#000" },
        { name: "Samsung", color: "#1428a0" },
        { name: "Coca-Cola", color: "#f40009" },
        { name: "Amazon", color: "#ff9900" },
        { name: "Red Bull", color: "#d60046" }
    ];

    return (
        <section style={{ marginTop: "5rem", textAlign: "center" }}>
            <p style={{
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--muted-foreground)",
                marginBottom: "2rem"
            }}>
                Já confiaram no trabalho
            </p>

            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "3rem",
                opacity: 0.6,
                filter: "grayscale(100%)",
            }}>
                {brands.map((brand, i) => (
                    <div
                        key={i}
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 800,
                            color: "var(--foreground)", // Grayscale via filter, but base color needed
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem"
                        }}
                    >
                        {/* Placeholder generic logos */}
                        <div style={{ width: 30, height: 30, background: "var(--foreground)", borderRadius: 6 }} />
                        {brand.name}
                    </div>
                ))}
            </div>
        </section>
    );
};
