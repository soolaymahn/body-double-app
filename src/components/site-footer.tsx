import Link from "next/link";

import { PRODUCT_NAME } from "@/domain/copy";

const LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/venues", label: "Spaces" },
  { href: "/#for-professionals", label: "For professionals" },
  { href: "/retreats", label: "Retreats" },
  { href: "/sessions", label: "Booked sessions" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-heading text-lg">{PRODUCT_NAME}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            In-person matching for sustained, focused work. The person, the
            schedule, and the place. New York first.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
