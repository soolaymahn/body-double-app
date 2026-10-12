import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Retreats",
  description:
    "Focused work retreats: multi-week stays that combine a place to live, a place to work, a routine, and other people doing focused work.",
};

export default function RetreatsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
        Study-focus retreats
      </p>
      <h1 className="font-heading mt-2 text-4xl tracking-tight sm:text-5xl">
        Retreats
      </h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        Sometimes focus needs a change of scenery. A retreat is the same
        product held for longer: a person, a schedule, and a place, combined
        with somewhere to stay and other people doing focused work. Multi-week
        stays for a final exam push, a thesis, a manuscript, or a project that
        needs uninterrupted weeks.
      </p>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        We are looking at places like Colombia, Guatemala, Mexico, and
        Portugal. There is no calendar yet, and NYC comes first. Get matched
        now, and we will tell you when a cohort opens.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button className="h-10 px-4" render={<Link href="/onboard" />}>
          Get matched
        </Button>
        <Button variant="outline" className="h-10 px-4" render={<Link href="/venues" />}>
          Explore study spaces
        </Button>
      </div>
    </div>
  );
}
