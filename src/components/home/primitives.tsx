import type { ReactNode } from "react";

import { cn } from "cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHead({
  number,
  label,
  className,
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase",
        className,
      )}
    >
      <span className="tabular-nums">{number}</span>
      <span aria-hidden className="h-px w-8 bg-foreground/30" />
      <span>{label}</span>
    </p>
  );
}

export function Heading({
  className,
  children,
  as: Tag = "h2",
}: {
  className?: string;
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-heading text-3xl leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
