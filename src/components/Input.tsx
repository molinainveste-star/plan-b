import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ 
    label, 
    error, 
    hint,
    icon,
    ...props 
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "var(--space-2)", 
            width: "100%",
        }}>
            {label && (
                <label style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: 600,
                    color: "var(--foreground-secondary)",
                }}>
                    {label}
                </label>
            )}
            
            <div style={{ position: "relative" }}>
                {icon && (
                    <span style={{
                        position: "absolute",
                        left: "var(--space-4)",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: isFocused ? "var(--primary)" : "var(--foreground-muted)",
                        transition: "color var(--transition-base)",
                        display: "flex",
                        alignItems: "center",
                        pointerEvents: "none",
                    }}>
                        {icon}
                    </span>
                )}
                <input
                    style={{
                        width: "100%",
                        padding: icon ? "0.875rem 1rem 0.875rem 3rem" : "0.875rem 1rem",
                        fontSize: "var(--text-base)",
                        fontFamily: "inherit",
                        color: "var(--foreground)",
                        backgroundColor: "var(--background-secondary)",
                        border: `1px solid ${error ? "var(--error)" : isFocused ? "var(--primary)" : "var(--border)"}`,
                        borderRadius: "var(--radius-lg)",
                        outline: "none",
                        transition: "all var(--transition-base)",
                        boxShadow: isFocused ? "0 0 0 3px var(--primary-light), var(--shadow-glow)" : "none",
                    }}
                    onFocus={(e) => {
                        setIsFocused(true);
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        props.onBlur?.(e);
                    }}
                    {...props}
                />
            </div>

            {hint && !error && (
                <span style={{ 
                    fontSize: "var(--text-xs)", 
                    color: "var(--foreground-muted)",
                }}>
                    {hint}
                </span>
            )}
            {error && (
                <span style={{ 
                    fontSize: "var(--text-xs)", 
                    color: "var(--error)",
                    fontWeight: 500,
                }}>
                    {error}
                </span>
            )}
        </div>
    );
};
