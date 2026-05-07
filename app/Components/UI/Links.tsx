import type { ReactNode } from "react";
import Link from "next/link";

type Variant = "default" | "nav" | "footer" | "primary";

type LinkProps = {
    href: string;
    children: ReactNode;
    className?: string;
    variant?: Variant;
};

export default function Links({
    href,
    children,
    className = "",
    variant = "default",
}: LinkProps) {
    const base = "px-4 py-2 text-[18px] transition-colors duration-300 ease-in-out";

    const variantStyles: Record<Variant, string> = {
        default: "text-background hover:text-primary",
        nav: "text-white hover:text-accent font-medium",
        footer: "text-text-secondary hover:text-primary text-sm",
        primary: "text-primary hover:text-secondary font-semibold",
    };

    return (
        <Link href={href} className={`${base} ${variantStyles[variant]} ${className}`}>
            {children}
        </Link>
    );
}
