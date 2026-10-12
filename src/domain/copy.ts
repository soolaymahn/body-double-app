import type {
  BreakPreference,
  EatPreference,
  Exam,
  TalkPreference,
  VenueTier,
  VenueType,
} from "./types";

export const PRODUCT_NAME = "Beside";
export const PRODUCT_TAGLINE = "NYC study partners, matched to how you actually work.";

export const EXAM_LABELS: Record<Exam, string> = {
  "ny-bar": "New York Bar",
  "other-bar": "Bar exam (other jurisdiction)",
  lsat: "LSAT",
  gre: "GRE",
  mcat: "MCAT",
  cfa: "CFA",
  cpa: "CPA",
  grad: "Grad / professional coursework",
  other: "Other long-haul study",
};

export const EAT_LABELS: Record<EatPreference, string> = {
  none: "No food at the table",
  snacks: "Quiet snacks are fine",
  meals: "I want a space with a cafe",
};

export const EAT_HELP: Record<EatPreference, string> = {
  none: "Keep the table clear. Coffee is enough.",
  snacks: "Nuts, a bar, maybe a pastry. Nothing that needs a plate.",
  meals: "Lunch together, or at least a place that serves it.",
};

export const BREAK_LABELS: Record<BreakPreference, string> = {
  "deep-focus": "Deep focus — rare breaks",
  hourly: "Short break about once an hour",
  frequent: "Walks and resets throughout",
};

export const BREAK_HELP: Record<BreakPreference, string> = {
  "deep-focus": "Long blocks. Don’t tap me unless the building is on fire.",
  hourly: "Classic pomodoro energy. Stretch, refill, sit back down.",
  frequent: "I study in shorter bursts and need to stand up often.",
};

export const TALK_LABELS: Record<TalkPreference, string> = {
  silent: "Silent parallel work",
  "check-ins": "Occasional check-ins",
  collaborative: "Talk through problems",
};

export const TALK_HELP: Record<TalkPreference, string> = {
  silent: "Classic body doubling. Same room, separate work, almost no talking.",
  "check-ins": "A hello, a mid-session status, maybe a debrief on the walk out.",
  collaborative: "I want a partner I can ask questions and quiz with.",
};

export const TIER_LABELS: Record<VenueTier, string> = {
  1: "Tier 1",
  2: "Tier 2",
  3: "Tier 3",
  4: "Tier 4",
};

export const TIER_BLURBS: Record<VenueTier, string> = {
  1: "Premium quiet rooms and cafes in core Manhattan. Wellness rooms, polished floors, highest day-pass — about $65–69.",
  2: "Full-service desks next to major transit (Penn, Grand Central, Flatiron). Phone booths and lounges — about $45–49.",
  3: "Flexible Manhattan hot desks. Coffee, kitchens, later hours — about $35.",
  4: "Neighborhood desks in Brooklyn and similar. Lowest day-pass, weekend access — about $29.",
};

export const TIER_PRICE_RANGES: Record<VenueTier, string> = {
  1: "$65–69 / person / day",
  2: "$45–49 / person / day",
  3: "$35 / person / day",
  4: "$29 / person / day",
};

export const VENUE_TYPE_LABELS: Record<VenueType, string> = {
  "coworking-space": "Coworking space",
};

export function formatTiers(tiers: VenueTier[]): string {
  return tiers.map((tier) => TIER_LABELS[tier]).join(" + ");
}

export const DAY_LABELS: Record<string, string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};

export const DAY_FULL_LABELS: Record<string, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};
