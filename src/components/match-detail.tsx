"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useProfile } from "@/components/profile-provider";
import { ScoreRing } from "@/components/score-ring";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BREAK_LABELS,
  DAY_FULL_LABELS,
  EAT_LABELS,
  EXAM_LABELS,
  TALK_LABELS,
  TIER_LABELS,
} from "@/domain/copy";
import {
  formatWindow,
  nextSessionDraft,
  scoreMatch,
  suggestedVenues,
} from "@/domain/matching";
import { NEIGHBORHOOD_BY_ID, neighborhoodLabel } from "@/domain/neighborhoods";
import { studentById } from "@/domain/students";
import { sessionTotals, VENUE_BY_ID } from "@/domain/venues";
import { currency, initials } from "@/lib/format";
import type { Venue } from "@/domain/types";

const BREAKDOWN_LABELS = {
  proximity: "Proximity",
  schedule: "Shared hours",
  venue: "Tier",
  exam: "Same exam",
  eat: "Eating",
  breaks: "Breaks",
  talk: "Talking",
} as const;

export function MatchDetail({ studentId }: { studentId: string }) {
  const router = useRouter();
  const { ready, profile, addSession } = useProfile();
  const student = studentById(studentId);
  const [venueId, setVenueId] = useState<string | null>(null);
  const [bookedId, setBookedId] = useState<string | null>(null);

  const match = useMemo(() => {
    if (!profile || !student) return null;
    return scoreMatch(profile, student);
  }, [profile, student]);

  const venues = useMemo(() => (match ? suggestedVenues(match) : []), [match]);
  const selected = venues.find((venue) => venue.id === venueId) ?? venues[0];

  if (!ready) {
    return <div className="h-80 animate-pulse rounded-2xl bg-muted" />;
  }

  if (!profile) {
    return (
      <Empty
        title="Tell us how you study first"
        body="The match page needs your matching answers."
        href="/onboard"
        cta="Get matched"
      />
    );
  }

  if (!student || !match || !selected) {
    return (
      <Empty
        title="That person is not in the NYC pool"
        body="This first version only includes the seeded Manhattan, Brooklyn, and Queens students."
        href="/matches"
        cta="Back to matches"
      />
    );
  }

  const themHood = NEIGHBORHOOD_BY_ID[student.neighborhoodId];
  const totals = sessionTotals(selected);
  const draft = nextSessionDraft(match, selected);

  function book(venue: Venue) {
    const session = {
      ...nextSessionDraft(match!, venue),
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "confirmed" as const,
    };
    addSession(session);
    setBookedId(session.id);
  }

  if (bookedId) {
    const venue = VENUE_BY_ID[selected.id];
    return (
      <div className="mx-auto max-w-xl rounded-2xl bg-card px-6 py-12 text-center ring-1 ring-foreground/10">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Session held
        </p>
        <h1 className="font-heading mt-2 text-3xl">
          You and {student.name} are on the calendar
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {DAY_FULL_LABELS[draft.day]} {formatWindow(draft.startHour, draft.endHour)} at a{" "}
          {TIER_LABELS[venue.tier]} desk ({venue.name}). Address for the meet: {venue.address}.
          Two day passes, {currency(totals.gross)}. Beside keeps{" "}
          {currency(totals.besideKeeps)} ({Math.round(venue.partnerCut * 100)}%).
        </p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <Button className="h-10 px-4" render={<Link href="/sessions" />}>
            See sessions
          </Button>
          <Button variant="outline" render={<Link href="/matches" />}>
            More matches
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <button
          type="button"
          onClick={() => router.push("/matches")}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← All matches
        </button>
        <div className="mt-4 flex items-start gap-4">
          <Avatar className="size-14">
            <AvatarFallback>{initials(student.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="font-heading text-3xl sm:text-4xl">{student.name}</h1>
            <p className="mt-1 text-muted-foreground">
              {EXAM_LABELS[student.exam]} · {themHood.name} · {match.miles.toFixed(1)} miles from{" "}
              {neighborhoodLabel(profile)}
            </p>
          </div>
          <ScoreRing score={match.score} />
        </div>
        <p className="mt-5 max-w-2xl text-base leading-7">{student.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">{EAT_LABELS[student.eat]}</Badge>
          <Badge variant="secondary">{BREAK_LABELS[student.breaks]}</Badge>
          <Badge variant="secondary">{TALK_LABELS[student.talk]}</Badge>
        </div>

        <ul className="mt-8 grid gap-2">
          {match.reasons.map((reason) => (
            <li key={reason} className="text-sm leading-6 text-muted-foreground">
              {reason}
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-3">
          {(Object.keys(BREAKDOWN_LABELS) as Array<keyof typeof BREAKDOWN_LABELS>).map(
            (key) => (
              <div key={key} className="grid grid-cols-[8rem_1fr_2.5rem] items-center gap-3">
                <span className="text-sm">{BREAKDOWN_LABELS[key]}</span>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${match.breakdown[key]}%` }}
                  />
                </div>
                <span className="text-right text-xs tabular-nums text-muted-foreground">
                  {match.breakdown[key]}
                </span>
              </div>
            ),
          )}
        </div>
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Book a table</CardTitle>
          <CardDescription>
            We hold two day passes in a shared tier. Operator names stay off the
            table until you sit down — matching is on price, amenities, and
            neighborhood only.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {match.overlappingDays.length === 0 ? (
            <p className="rounded-lg bg-muted px-3 py-2 text-sm">
              Your calendars do not overlap. You can still request a session;
              they would need to shift hours.
            </p>
          ) : (
            <p className="text-sm">
              Best overlap: {DAY_FULL_LABELS[draft.day]}{" "}
              {formatWindow(draft.startHour, draft.endHour)}
            </p>
          )}

          <div className="grid gap-2">
            {venues.map((venue) => {
              const active = venue.id === selected.id;
              const pricing = sessionTotals(venue);
              return (
                <button
                  key={venue.id}
                  type="button"
                  onClick={() => setVenueId(venue.id)}
                  className={`rounded-xl border px-3 py-3 text-left ${
                    active
                      ? "border-primary bg-primary/8 ring-1 ring-primary/30"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{venue.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {NEIGHBORHOOD_BY_ID[venue.neighborhoodId].name} ·{" "}
                        {venue.keyAmenities.slice(0, 2).join(", ")}
                      </p>
                    </div>
                    <Badge variant={venue.tier <= 2 ? "default" : "outline"}>
                      {TIER_LABELS[venue.tier]}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {currency(pricing.perPerson)} / person · Beside keeps{" "}
                    {Math.round(venue.partnerCut * 100)}% (
                    {currency(pricing.besideKeeps)} of {currency(pricing.gross)})
                  </p>
                </button>
              );
            })}
          </div>

          <Button className="h-10" onClick={() => book(selected)}>
            Hold {formatWindow(draft.startHour, draft.endHour)} · {TIER_LABELS[selected.tier]}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Empty({
  title,
  body,
  href,
  cta,
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed px-6 py-16 text-center">
      <h1 className="font-heading text-3xl">{title}</h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{body}</p>
      <Button className="mt-6 h-10 px-4" render={<Link href={href} />}>
        {cta}
      </Button>
    </div>
  );
}
