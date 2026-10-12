import type { Metadata } from "next";

import { SessionsList } from "@/components/sessions-list";

export const metadata: Metadata = {
  title: "Booked sessions",
  description:
    "Held study time with your match at a shared study space. The operator is named when you sit down together.",
};

export default function SessionsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
        Time and place
      </p>
      <h1 className="font-heading mt-2 text-4xl tracking-tight">Booked sessions</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Once you have a match, we hold two day passes at a shared study space.
        The certainty is the person across the table; the room is how we make
        showing up easy. The operator name is for the meet, not the match.
      </p>
      <div className="mt-8">
        <SessionsList />
      </div>
    </div>
  );
}
