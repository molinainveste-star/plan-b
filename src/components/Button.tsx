import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    fullWidth = false,
    style,
    ...props
}) => {
    const baseStyles: React.CSSProperties = {
        padding: "1rem 2rem",
        borderRadius: "1rem",
        fontSize: "1rem",
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        border: "none",
        outline: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: fullWidth ? "100%" : "auto",
        letterSpacing: "0.02em",
        ...style,
    };

    const variants = {
        primary: {
            background: "var(--gradient-primary)",
            color: "white",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15)",
        },
        secondary: {
            background: "var(--secondary)",
            color: "var(--secondary-foreground)",
        },
        outline: {
            background: "transparent",
            border: "2px solid var(--border)",
            color: "var(--foreground)",
        },
    };

    return (
        <button
            style={{ ...baseStyles, ...variants[variant] }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                if (variant === "primary") {
                    e.currentTarget.style.boxShadow = "0 15px 30px -5px rgba(0, 0, 0, 0.2)";
                } else {
                    e.currentTarget.style.background = "var(--background)";
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                if (variant === "primary") {
                    e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.15)";
                } else {
                    e.currentTarget.style.background = variant === "secondary" ? "var(--secondary)" : "transparent";
                }
            }}
            {...props}
        >
            {children}
        </button>
    );
};
