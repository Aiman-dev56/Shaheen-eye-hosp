"use client";


type Variant = "primary" | "Secondary" | "danger" | "outline"
type size = "sm" | "md" | "lg"

interface ButtonProps {
    children: React.ReactNode;
    variant?: Variant;
    size?: size;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit"
    disabled?: boolean;
}

export default function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    onClick,
    type = "button",
    disabled = false
}: ButtonProps) {
    const base = "rounded-md px-4 py-2  cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles: Record<Variant, string> = {
        primary: "bg-primary text-white hover:bg-primary/90",
        Secondary: "bg-secondary text-white hover:bg-secondary/90",
        danger: "bg-danger text-white hover:bg-danger/90",
        outline: "bg-transparent border border-foreground text-foreground hover:bg-primary/10",
    }

    const sizeStyles: Record<size, string> = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        >
            {children}
        </button>
    )
}