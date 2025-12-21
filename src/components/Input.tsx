import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", width: "100%" }}>
            <label
                style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--foreground)",
                    letterSpacing: "0.02em",
                }}
            >
                {label}
            </label>
            <input
                style={{
                    padding: "1rem 1.25rem",
                    borderRadius: "1rem",
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                    width: "100%",
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = "var(--ring)";
                    e.target.style.boxShadow = "0 0 0 4px rgba(0, 0, 0, 0.03)";
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = "var(--border)";
                    e.target.style.boxShadow = "none";
                }}
                {...props}
            />
            {error && (
                <span style={{ fontSize: "0.75rem", color: "#ef4444", fontWeight: 500 }}>{error}</span>
            )}
        </div>
    );
};
