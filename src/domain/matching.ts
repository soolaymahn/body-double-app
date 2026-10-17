import { NEIGHBORHOOD_BY_ID } from "./neighborhoods";
import type {
  BookedSession,
  BreakPreference,
  Coordinates,
  Day,
  EatPreference,
  MatchBreakdown,
  RankedMatch,
  StudyProfile,
  TalkPreference,
  Venue,
  VenueTier,
} from "./types";
import { formatTiers } from "./copy";
import { isMatchingQuestionnaireComplete } from "./questionnaire-v3";
import { VENUES } from "./venues";

const WEIGHTS = {
  proximity: 0.28,
  schedule: 0.24,
  venue: 0.14,
  exam: 0.1,
  eat: 0.08,
  breaks: 0.08,
  talk: 0.08,
} as const;

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

export function milesBetween(a: Coordinates, b: Coordinates): number {
  const earthMiles = 3958.8;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * earthMiles * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function proximityScore(miles: number): number {
  if (miles <= 1.5) return 100;
  if (miles <= 3) return 85;
  if (miles <= 5) return 68;
  if (miles <= 8) return 48;
  if (miles <= 12) return 28;
  return 12;
}

export function overlappingDays(a: Day[], b: Day[]): Day[] {
  return a.filter((day) => b.includes(day));
}

export function overlappingWindow(
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number,
): { start: number; end: number } | null {
  const start = Math.max(aStart, bStart);
  const end = Math.min(aEnd, bEnd);
  if (end - start < 2) return null;
  return { start, end };
}

function scheduleScore(
  you: StudyProfile,
  days: Day[],
  window: { start: number; end: number } | null,
): number {
  if (days.length === 0 || !window) return 0;
  const dayRatio = days.length / Math.max(you.preferredDays.length, 1);
  const hours = window.end - window.start;
  const hourRatio = Math.min(1, hours / 4);
  return Math.round(100 * (0.55 * dayRatio + 0.45 * hourRatio));
}

function venueScore(you: VenueTier[], them: VenueTier[]): {
  score: number;
  shared: VenueTier[];
} {
  const shared = you.filter((tier) => them.includes(tier)).sort();
  if (you.length === 0 || them.length === 0) {
    return { score: 40, shared };
  }
  if (shared.length === 0) return { score: 12, shared };
  const ratio = shared.length / Math.max(you.length, them.length);
  return { score: Math.round(55 + 45 * ratio), shared };
}

const ORDERED = {
  eat: ["none", "snacks", "meals"] as EatPreference[],
  breaks: ["deep-focus", "hourly", "frequent"] as BreakPreference[],
  talk: ["silent", "check-ins", "collaborative"] as TalkPreference[],
};

function ordinalPrefScore<T extends string>(a: T, b: T, order: T[]): number {
  const distance = Math.abs(order.indexOf(a) - order.indexOf(b));
  if (distance === 0) return 100;
  if (distance === 1) return 62;
  return 18;
}

function examScore(a: StudyProfile["exam"], b: StudyProfile["exam"]): number {
  if (a === b) return 100;
  const bar = new Set(["ny-bar", "other-bar"]);
  if (bar.has(a) && bar.has(b)) return 78;
  const law = new Set(["ny-bar", "other-bar", "lsat"]);
  if (law.has(a) && law.has(b)) return 55;
  return 22;
}

export function formatHour(hour: number): string {
  const clamped = ((hour % 24) + 24) % 24;
  const suffix = clamped >= 12 ? "pm" : "am";
  const twelve = clamped % 12 === 0 ? 12 : clamped % 12;
  return `${twelve}${suffix}`;
}

export function formatWindow(start: number, end: number): string {
  return `${formatHour(start)}–${formatHour(end)}`;
}

function reasonsFor(match: Omit<RankedMatch, "reasons" | "score">): string[] {
  const reasons: string[] = [];
  if (match.miles <= 3) {
    reasons.push(`${match.miles.toFixed(1)} miles from your neighborhood`);
  } else {
    reasons.push(`${match.miles.toFixed(1)} miles away — still a reasonable subway ride`);
  }
  if (match.overlappingDays.length > 0) {
    reasons.push(
      `${match.overlappingDays.length} overlapping day${match.overlappingDays.length === 1 ? "" : "s"}, ${formatWindow(match.overlapStart, match.overlapEnd)}`,
    );
  }
  if (match.sharedTiers.length > 0) {
    reasons.push(`Both open to ${formatTiers(match.sharedTiers)}`);
  }
  if (match.breakdown.talk >= 90) {
    reasons.push("Same talking style — you will not fight over silence");
  } else if (match.breakdown.talk <= 30) {
    reasons.push("Different talking styles — worth a first session to test");
  }
  if (match.breakdown.eat >= 90) {
    reasons.push("Aligned on food at the table");
  }
  if (match.breakdown.breaks >= 90) {
    reasons.push("Same break rhythm");
  }
  return reasons;
}

export function scoreMatch(you: StudyProfile, them: StudyProfile): RankedMatch {
  const youHood = NEIGHBORHOOD_BY_ID[you.neighborhoodId];
  const themHood = NEIGHBORHOOD_BY_ID[them.neighborhoodId];
  const miles = milesBetween(youHood.coordinates, themHood.coordinates);
  const days = overlappingDays(you.preferredDays, them.preferredDays);
  const window = overlappingWindow(
    you.windowStart,
    you.windowEnd,
    them.windowStart,
    them.windowEnd,
  );
  const venues = venueScore(you.venueTiers, them.venueTiers);

  const breakdown: MatchBreakdown = {
    proximity: proximityScore(miles),
    schedule: scheduleScore(you, days, window),
    venue: venues.score,
    exam: examScore(you.exam, them.exam),
    eat: ordinalPrefScore(you.eat, them.eat, ORDERED.eat),
    breaks: ordinalPrefScore(you.breaks, them.breaks, ORDERED.breaks),
    talk: ordinalPrefScore(you.talk, them.talk, ORDERED.talk),
  };

  const weighted =
    breakdown.proximity * WEIGHTS.proximity +
    breakdown.schedule * WEIGHTS.schedule +
    breakdown.venue * WEIGHTS.venue +
    breakdown.exam * WEIGHTS.exam +
    breakdown.eat * WEIGHTS.eat +
    breakdown.breaks * WEIGHTS.breaks +
    breakdown.talk * WEIGHTS.talk;

  const overlapStart = window?.start ?? you.windowStart;
  const overlapEnd = window?.end ?? you.windowEnd;

  const partial = {
    student: them,
    miles,
    sharedTiers: venues.shared,
    overlappingDays: days,
    overlapStart,
    overlapEnd,
    breakdown,
  };

  return {
    ...partial,
    score: Math.round(weighted),
    reasons: reasonsFor(partial),
  };
}

export function rankMatches(
  you: StudyProfile,
  pool: StudyProfile[],
): RankedMatch[] {
  return pool
    .filter((student) => student.id !== you.id)
    .map((student) => scoreMatch(you, student))
    .sort((a, b) => b.score - a.score);
}

export function suggestedVenues(match: RankedMatch): Venue[] {
  const tiers =
    match.sharedTiers.length > 0 ? match.sharedTiers : match.student.venueTiers;
  const youHood = NEIGHBORHOOD_BY_ID[match.student.neighborhoodId];
  return VENUES.filter((venue) => tiers.includes(venue.tier))
    .map((venue) => ({
      venue,
      miles: milesBetween(youHood.coordinates, venue.coordinates),
    }))
    .sort((a, b) => a.miles - b.miles || a.venue.tier - b.venue.tier)
    .map((row) => row.venue);
}

export function nextSessionDraft(
  match: RankedMatch,
  venue: Venue,
): Omit<BookedSession, "id" | "createdAt" | "status"> {
  const day = match.overlappingDays[0] ?? "sat";
  const startHour = match.overlapStart;
  const endHour = Math.min(match.overlapEnd, startHour + 4);
  return {
    partnerId: match.student.id,
    venueId: venue.id,
    day,
    startHour,
    endHour,
  };
}

export function isProfileComplete(profile: Partial<StudyProfile> | null): profile is StudyProfile {
  if (!profile) return false;
  if (
    !(
      profile.id &&
      profile.name &&
      profile.exam &&
      profile.neighborhoodId &&
      (profile.neighborhoodId !== "other" ||
        Boolean(profile.neighborhoodOther?.trim())) &&
      profile.preferredDays &&
      profile.preferredDays.length > 0 &&
      typeof profile.windowStart === "number" &&
      typeof profile.windowEnd === "number" &&
      profile.venueTiers &&
      profile.venueTiers.length > 0 &&
      profile.eat &&
      profile.breaks &&
      profile.talk
    )
  ) {
    return false;
  }
  if (!profile.matching) return false;
  return isMatchingQuestionnaireComplete(profile.matching, {
    name: profile.name,
    neighborhoodId: profile.neighborhoodId,
    neighborhoodOther: profile.neighborhoodOther,
  });
}
