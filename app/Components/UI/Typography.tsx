"use client";

import type { ReactNode } from "react";

type Variant = "h1" | "h2" | "h3" | "p" | "body" | "label" | "subtitle";
type TypographyTag = "h1" | "h2" | "h3" | "p" | "label";
type Colors = "primary" | "secondary" | "text-primary" | "text-secondary" | "background" | "accent";

interface Props {
    variant?: Variant;
    color?: Colors;
    children: ReactNode;
    className?: string;
}

export default function Typography({
    variant = "p",
    color = "text-primary",
    children,
    className = "",
}: Props) {
    const base: Record<Variant, string> = {
        h1: "text-4xl font-bold",
        h2: "text-3xl font-bold",
        h3: "text-2xl font-bold",
        p: "text-base font-normal",
        body: "text-base font-normal",
        label: "text-sm font-medium",
        subtitle: "text-lg font-medium",
    };

    const tags: Record<Variant, TypographyTag> = {
        h1: "h1",
        h2: "h2",
        h3: "h3",
        p: "p",
        body: "p",
        label: "label",
        subtitle: "p",
    };

    const Tag = tags[variant];

    return (
        <Tag className={`${base[variant]} ${className}`}>
            {children}
        </Tag>
    );
}
