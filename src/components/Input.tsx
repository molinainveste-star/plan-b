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
    className, 
    ...props 
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const containerStyles: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
        width: "100%",
    };

    const labelStyles: React.CSSProperties = {
        fontSize: "var(--text-sm)",
        fontWeight: 500,
        color: "var(--foreground)",
        letterSpacing: "0.01em",
    };

    const inputWrapperStyles: React.CSSProperties = {
        position: "relative",
        display: "flex",
        alignItems: "center",
    };

    const inputStyles: React.CSSProperties = {
        width: "100%",
        padding: icon ? "0.875rem 1rem 0.875rem 2.75rem" : "0.875rem 1rem",
        fontSize: "var(--text-base)",
        fontFamily: "inherit",
        color: "var(--foreground)",
        backgroundColor: "var(--background)",
        border: `1px solid ${error ? "var(--error)" : isFocused ? "var(--primary)" : "var(--border)"}`,
        borderRadius: "var(--radius-md)",
        outline: "none",
        transition: "all var(--transition-base)",
        boxShadow: isFocused ? "0 0 0 3px rgba(67, 97, 238, 0.1)" : "none",
    };

    const iconStyles: React.CSSProperties = {
        position: "absolute",
        left: "1rem",
        color: isFocused ? "var(--primary)" : "var(--muted-foreground)",
        transition: "color var(--transition-base)",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
    };

    const hintStyles: React.CSSProperties = {
        fontSize: "var(--text-xs)",
        color: "var(--muted-foreground)",
    };

    const errorStyles: React.CSSProperties = {
        fontSize: "var(--text-xs)",
        color: "var(--error)",
        fontWeight: 500,
    };

    return (
        <div style={containerStyles}>
            {label && <label style={labelStyles}>{label}</label>}
            
            <div style={inputWrapperStyles}>
                {icon && <span style={iconStyles}>{icon}</span>}
                <input
                    style={inputStyles}
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

            {hint && !error && <span style={hintStyles}>{hint}</span>}
            {error && <span style={errorStyles}>{error}</span>}
        </div>
    );
};
