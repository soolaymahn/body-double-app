import Link from "next/link";

import { PRODUCT_NAME } from "@/domain/copy";
import { HeaderActions } from "@/components/header-actions";

const LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/matches", label: "Matches" },
  { href: "/venues", label: "Spaces" },
  { href: "/#for-professionals", label: "For professionals" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-heading text-xl tracking-tight">{PRODUCT_NAME}</span>
          <span className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
            NYC
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <HeaderActions />
      </div>
      <nav className="flex gap-5 overflow-x-auto border-t border-border px-5 py-2.5 text-sm md:hidden">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="shrink-0 text-muted-foreground">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
