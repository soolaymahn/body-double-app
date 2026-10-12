"use client";

import { useMemo } from "react";

import { MatchCard } from "@/components/match-card";
import { useProfile } from "@/components/profile-provider";
import { Button } from "@/components/ui/button";
import { rankMatches } from "@/domain/matching";
import { MOCK_STUDENTS } from "@/domain/students";
import Link from "next/link";

export function MatchesList() {
  const { ready, profile } = useProfile();

  const matches = useMemo(() => {
    if (!profile) return [];
    return rankMatches(profile, MOCK_STUDENTS);
  }, [profile]);

  if (!ready) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-xl bg-muted"
            aria-hidden
          />
        ))}
        <p className="sr-only">Loading matches</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <h2 className="font-heading text-2xl">Get matched first</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Matching needs your neighborhood, hours, and how you like to sit with
          another person. It takes about two minutes.
        </p>
        <Button className="mt-6 h-10 px-4" render={<Link href="/onboard" />}>
          Start matching
        </Button>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <h2 className="font-heading text-2xl">No one in the pool yet</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          We will open more NYC neighborhoods as people join. Try widening your
          hours or adding another study-space tier.
        </p>
      </div>
    );
  }

  const strong = matches.filter((match) => match.score >= 70);
  const rest = matches.filter((match) => match.score < 70);
  const from =
    profile.neighborhoodId === "other"
      ? profile.neighborhoodOther?.trim() || "other"
      : profile.neighborhoodId.replaceAll("-", " ");

  return (
    <div className="grid gap-8">
      <p className="text-sm text-muted-foreground">
        Ranked for {profile.name} in {from}. Proximity, overlapping hours,
        shared study-space tier, and study-style answers all count.
      </p>
      <section className="grid gap-4">
        {strong.map((match) => (
          <MatchCard key={match.student.id} match={match} />
        ))}
      </section>
      {rest.length > 0 ? (
        <section className="grid gap-4">
          <h2 className="font-heading text-2xl">Further out, still possible</h2>
          {rest.map((match) => (
            <MatchCard key={match.student.id} match={match} />
          ))}
        </section>
      ) : null}
    </div>
  );
}
