import type { Metadata } from "next";

import { VenueDirectory } from "@/components/venue-directory";

export const metadata: Metadata = {
  title: "Study Spaces",
  description:
    "Personalized matching connects you with a study partner who complements your study methods and routine, with a schedule and location that work for you both. Find a study space that supports the way you work.",
};

export default function VenuesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-heading max-w-3xl text-4xl tracking-tight sm:text-5xl">
        Study Spaces
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        Personalized matching connects you with a study partner who complements
        your study methods and routine, with a schedule and location that work
        for you both. Find a study space that supports the way you work.
      </p>
      <div className="mt-10">
        <VenueDirectory />
      </div>
    </div>
  );
}
