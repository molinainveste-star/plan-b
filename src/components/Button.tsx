import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline" | "success";
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
            padding: "0.75rem 1.5rem",
            fontSize: "var(--text-sm)",
            gap: "0.5rem",
            borderRadius: "var(--radius-md)",
        },
        lg: {
            padding: "1rem 2rem",
            fontSize: "var(--text-base)",
            gap: "0.625rem",
            borderRadius: "var(--radius-lg)",
        },
    };

    const variants: Record<string, React.CSSProperties> = {
        primary: {
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            border: "none",
            boxShadow: "var(--shadow-primary)",
        },
        secondary: {
            background: "var(--secondary)",
            color: "var(--foreground)",
            border: "none",
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
        success: {
            background: "var(--success)",
            color: "white",
            border: "none",
            boxShadow: "0 4px 14px rgba(16, 185, 129, 0.25)",
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
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
        ...variants[variant],
        ...style,
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) return;
        
        e.currentTarget.style.transform = "translateY(-1px)";
        
        if (variant === "primary") {
            e.currentTarget.style.background = "var(--primary-hover)";
            e.currentTarget.style.boxShadow = "var(--shadow-primary-lg)";
        } else if (variant === "ghost") {
            e.currentTarget.style.background = "var(--secondary)";
            e.currentTarget.style.borderColor = "transparent";
        } else if (variant === "outline") {
            e.currentTarget.style.background = "var(--primary-light)";
        } else if (variant === "secondary") {
            e.currentTarget.style.background = "var(--border)";
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.transform = "translateY(0)";
        
        if (variant === "primary") {
            e.currentTarget.style.background = "var(--primary)";
            e.currentTarget.style.boxShadow = "var(--shadow-primary)";
        } else if (variant === "ghost") {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "var(--border)";
        } else if (variant === "outline") {
            e.currentTarget.style.background = "transparent";
        } else if (variant === "secondary") {
            e.currentTarget.style.background = "var(--secondary)";
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
                        width="16"
                        height="16"
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
