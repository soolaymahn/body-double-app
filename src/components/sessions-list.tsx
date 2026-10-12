"use client";

import Link from "next/link";

import { useProfile } from "@/components/profile-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DAY_FULL_LABELS, TIER_LABELS } from "@/domain/copy";
import { formatWindow } from "@/domain/matching";
import { studentById } from "@/domain/students";
import { sessionTotals, VENUE_BY_ID } from "@/domain/venues";
import { currency } from "@/lib/format";

export function SessionsList() {
  const { ready, sessions } = useProfile();

  if (!ready) {
    return <div className="h-40 animate-pulse rounded-xl bg-muted" />;
  }

  if (sessions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed px-6 py-16 text-center">
        <h2 className="font-heading text-2xl">No sessions held yet</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Match with someone, pick a shared study-space tier, and we will hold two
          day passes. The coworking operator is named when you sit down.
        </p>
        <Button className="mt-6 h-10 px-4" render={<Link href="/matches" />}>
          Browse matches
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {sessions.map((session) => {
        const partner = studentById(session.partnerId);
        const venue = VENUE_BY_ID[session.venueId];
        if (!partner || !venue) return null;
        const totals = sessionTotals(venue);
        return (
          <Card key={session.id}>
            <CardContent>
              <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                Confirmed
              </p>
              <h2 className="font-heading mt-1 text-2xl">
                {partner.name} · {TIER_LABELS[venue.tier]}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {DAY_FULL_LABELS[session.day]}{" "}
                {formatWindow(session.startHour, session.endHour)} · {venue.name} ·{" "}
                {venue.address}
              </p>
              <p className="mt-3 text-sm">
                Two day passes {currency(totals.gross)}. Beside keeps{" "}
                {currency(totals.besideKeeps)} ({Math.round(venue.partnerCut * 100)}
                %). Venue keeps {currency(totals.venueKeeps)}.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                render={<Link href={`/matches/${partner.id}`} />}
              >
                Open match
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
