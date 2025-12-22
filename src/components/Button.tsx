import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline" | "glow";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    icon,
    iconPosition = "left",
    style,
    disabled,
    ...props
}) => {
    const sizes = {
        sm: {
            padding: "0.5rem 1rem",
            fontSize: "var(--text-sm)",
            gap: "0.375rem",
            borderRadius: "var(--radius-md)",
        },
        md: {
            padding: "0.875rem 1.75rem",
            fontSize: "var(--text-sm)",
            gap: "0.5rem",
            borderRadius: "var(--radius-lg)",
        },
        lg: {
            padding: "1rem 2.5rem",
            fontSize: "var(--text-base)",
            gap: "0.625rem",
            borderRadius: "var(--radius-xl)",
        },
    };

    const variants: Record<string, React.CSSProperties> = {
        primary: {
            background: "var(--gradient-primary)",
            color: "white",
            border: "none",
            boxShadow: "var(--shadow-glow)",
        },
        secondary: {
            background: "var(--background-tertiary)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
        },
        ghost: {
            background: "transparent",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
        },
        outline: {
            background: "transparent",
            color: "var(--primary)",
            border: "1px solid var(--primary)",
        },
        glow: {
            background: "var(--primary)",
            color: "var(--background)",
            border: "none",
            boxShadow: "var(--shadow-glow-lg)",
        },
    };

    const baseStyles: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: sizes[size].gap,
        padding: sizes[size].padding,
        fontSize: sizes[size].fontSize,
        fontWeight: 600,
        fontFamily: "inherit",
        lineHeight: 1,
        borderRadius: sizes[size].borderRadius,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        transition: "all var(--transition-base)",
        outline: "none",
        width: fullWidth ? "100%" : "auto",
        opacity: disabled ? 0.5 : 1,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        position: "relative",
        overflow: "hidden",
        ...variants[variant],
        ...style,
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) return;
        
        e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
        
        if (variant === "primary" || variant === "glow") {
            e.currentTarget.style.boxShadow = "var(--shadow-glow-lg)";
        } else if (variant === "ghost" || variant === "secondary") {
            e.currentTarget.style.background = "var(--background-elevated)";
            e.currentTarget.style.borderColor = "var(--primary)";
        } else if (variant === "outline") {
            e.currentTarget.style.background = "var(--primary-light)";
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        
        if (variant === "primary") {
            e.currentTarget.style.boxShadow = "var(--shadow-glow)";
        } else if (variant === "glow") {
            e.currentTarget.style.boxShadow = "var(--shadow-glow-lg)";
        } else if (variant === "ghost") {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "var(--border)";
        } else if (variant === "secondary") {
            e.currentTarget.style.background = "var(--background-tertiary)";
            e.currentTarget.style.borderColor = "var(--border)";
        } else if (variant === "outline") {
            e.currentTarget.style.background = "transparent";
        }
    };

    return (
        <button
            style={baseStyles}
            disabled={disabled || loading}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {loading ? (
                <>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ animation: "spin 1s linear infinite" }}
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            opacity="0.25"
                        />
                        <path
                            d="M12 2a10 10 0 0 1 10 10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                    </svg>
                    <span>{children}</span>
                </>
            ) : (
                <>
                    {icon && iconPosition === "left" && icon}
                    {children}
                    {icon && iconPosition === "right" && icon}
                </>
            )}
        </button>
    );
};
