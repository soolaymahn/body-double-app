import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/home/primitives";

const LEDGER = [
  { give: "How you work", get: "The person" },
  { give: "When you work", get: "The time" },
  { give: "Where you are", get: "The place" },
];

export function Hero() {
  return (
    <section className="border-b border-border">
      <Container className="pt-16 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24">
        <Eyebrow>In-person focus · NYC</Eyebrow>
        <h1 className="font-heading mt-6 max-w-5xl text-[2.75rem] leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          For Accountability and Focus - You study better across the right Study Partner!
        </h1>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              The bar exam, the CIPP, the LSAT, medical and dental boards —
              months of preparation, mostly alone.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-8">
              Tell us what you’re working toward, how you work, and when you
              want to focus. We match you with the right person, schedule, and
              place to make it happen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="h-11 px-5 text-sm" render={<Link href="/onboard" />}>
                Find your match
              </Button>
              <Button
                variant="outline"
                className="h-11 px-5 text-sm"
                render={<Link href="#how-it-works" />}
              >
                See how it works
              </Button>
            </div>
          </div>

          <dl className="self-end">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 border-b border-foreground/25 pb-3 text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              <span>You tell us</span>
              <span aria-hidden className="w-4" />
              <span>We find</span>
            </div>
            {LEDGER.map((row) => (
              <div
                key={row.give}
                className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-4 border-b border-border py-4"
              >
                <dt className="text-sm text-muted-foreground sm:text-base">{row.give}</dt>
                <span aria-hidden className="w-4 text-center text-muted-foreground">
                  →
                </span>
                <dd className="font-heading text-xl sm:text-2xl">{row.get}</dd>
              </div>
            ))}
            <p className="mt-3 text-sm text-muted-foreground">
              What you’re working toward shapes all three.
            </p>
          </dl>
        </div>
      </Container>
    </section>
  );
}
