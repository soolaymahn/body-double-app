/**
 * Beside Study Matching Questionnaire v3 — copy and options from spreadsheet.
 */

import type { Day, EatPreference, Exam, StudyProfile, VenueTier } from "./types";
import { DAYS } from "./types";

export const SP01_OPTIONS = [
  "Bar exam",
  "Medical boards",
  "Dental boards",
  "CIPP",
  "Other professional certification",
  "University course or degree",
  "Other",
] as const;
export type Sp01 = (typeof SP01_OPTIONS)[number];

export const SC01_HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type Sc01 = (typeof SC01_HOURS)[number];

export const SC02_DAYS = [1, 2, 3, 4, 5, 6, 7] as const;
export type Sc02 = (typeof SC02_DAYS)[number];

export const SC03_WEEKDAY_LABELS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Varies",
] as const;
export type Sc03WeekdayLabel = (typeof SC03_WEEKDAY_LABELS)[number];

export const SC03_LABEL_TO_DAY: Record<string, Day> = {
  Monday: "mon",
  Tuesday: "tue",
  Wednesday: "wed",
  Thursday: "thu",
  Friday: "fri",
  Saturday: "sat",
  Sunday: "sun",
};

export const BR01_OPTIONS = ["Yes", "No", "It depends"] as const;
export type Br01 = (typeof BR01_OPTIONS)[number];

export const BR02_OPTIONS = [
  "Halfway through my study day",
  "At a fixed time",
  "Flexible",
] as const;

export const BR03_OPTIONS = ["20 minutes", "40 minutes", "60 minutes"] as const;

export const BR04_OPTIONS = [
  "Eat alone",
  "Eat together with my study partner",
  "No preference",
] as const;

export const MD01_OPTIONS = [
  "In person only",
  "Hybrid (in person and online)",
  "Online only",
] as const;
export type Md01 = (typeof MD01_OPTIONS)[number];

export const MD03_MD04_OPTIONS = ["Flexible"] as const;

export const ON02_OPTIONS = ["Camera on", "Camera off", "Flexible"] as const;
export const ON03_OPTIONS = [
  "Muted while studying",
  "Microphone on",
  "Flexible",
] as const;
export const ON04_OPTIONS = [
  "Silent co-working",
  "Brief check-ins at agreed intervals",
  "Conversation is fine",
  "Flexible",
] as const;

export const IP01_OPTIONS = [
  "A Beside-recommended study space",
  "A study space we choose ourselves",
  "Either",
] as const;
export type Ip01 = (typeof IP01_OPTIONS)[number];

export const IP02_TIER_LABELS = ["Tier 1", "Tier 2", "Tier 3", "Tier 4"] as const;

export const FD01_OPTIONS = [
  "Yes",
  "Only quiet snacks",
  "No, food should be eaten during breaks",
  "No preference",
] as const;
export const FD02_OPTIONS = [
  "Yes",
  "Only occasionally",
  "No, only during breaks",
] as const;
export const FD03_OPTIONS = [
  "At the study table",
  "Away from the study table",
  "Either",
] as const;
export const FD04_OPTIONS = [
  "Yes",
  "Only if I am also eating",
  "No",
  "No preference",
] as const;
export const FD05_OPTIONS = [
  "Not at all",
  "A little",
  "Quite a bit",
  "I need an eating-free study area",
] as const;

export const HP01_OPTIONS = [
  "Yes, most of the time",
  "Sometimes",
  "No",
  "No preference",
] as const;
export const HP02_OPTIONS = [
  "Yes",
  "Yes, if we agree on check-ins",
  "No",
  "No preference",
] as const;
export const HP03_OPTIONS = [
  "None; I should not hear it",
  "Faint sound is okay",
  "Some sound is okay",
  "No preference",
] as const;
export const HP04_OPTIONS = [
  "No",
  "Sometimes, faintly",
  "Yes",
  "I do not listen to audio",
] as const;

export const HL01_OPTIONS = [
  "Study online or stay home",
  "Attend only if symptoms are very mild",
  "Attend if I feel well enough",
  "Decide with my partner",
] as const;
export const HL02_OPTIONS = [
  "No, I would prefer they stay home",
  "Only if symptoms are mild and we both agree",
  "Yes",
  "Decide case by case",
] as const;
export const HL03_OPTIONS = [
  "I prefer both of us to wear masks",
  "I prefer to wear a mask myself",
  "I am comfortable with either approach",
  "I prefer studying without masks",
] as const;
export const HL04_OPTIONS = ["Yes", "No", "No preference"] as const;

export const AC01_OPTIONS = [
  "No specific requirements",
  "Wheelchair-accessible entrance and facilities",
  "Step-free access",
  "Accessible restroom",
  "Low-noise environment",
  "Flexible breaks",
  "Adjustable seating or desk",
  "Service animal access",
  "Remote attendance option",
  "Other (optional free text)",
  "Prefer not to say",
] as const;

export const AC02_OPTIONS = ["Yes", "No", "Prefer not to say"] as const;
export const AC03_OPTIONS = [
  "Yes, if they also opt in",
  "No, it does not matter to me",
  "Prefer not to say",
] as const;

export const AC04_OPTIONS = [
  "Mobility or wheelchair-access needs",
  "Chronic health condition",
  "Migraine or sensory sensitivities",
  "Neurodivergence or attention differences",
  "Managing a condition that may require breaks or monitoring",
  "Other (optional)",
  "Prefer not to specify",
] as const;

export const AC05_OPTIONS = [
  "Yes, after we mutually match",
  "Yes, on my profile",
  "No, use only for private matching",
] as const;

export const MP01_OPTIONS = [
  "Same exam or qualification",
  "Same general study field",
  "A different study field",
  "No preference",
] as const;
export const MP02_OPTIONS = [
  "Around my age",
  "Younger than me",
  "Older than me",
  "Any adult age",
] as const;
export const MP03_OPTIONS = [
  "Very structured",
  "Somewhat structured",
  "Flexible",
  "Mostly unstructured",
] as const;
export const MP04_OPTIONS = [...MP03_OPTIONS, "No preference"] as const;
export const MP05_OPTIONS = [
  "We follow a shared plan closely",
  "My partner helps me stay organized",
  "I help my partner stay organized",
  "We work independently with agreed check-ins",
  "Flexible / no preference",
] as const;

export const CA01_OPTIONS = [
  "At least 48 hours",
  "At least 24 hours",
  "At least 12 hours",
  "A few hours is fine",
  "No fixed notice requirement",
] as const;
export const CA02_OPTIONS = [
  "Very strict — cancellations should be rare",
  "Prefer consistency, but reasonable exceptions are fine",
  "Flexible with reasonable notice",
  "Very flexible — plans can change",
] as const;
export const CA03_OPTIONS = [
  "Illness or cold symptoms",
  "Migraine or health flare-up",
  "Work or family obligation",
  "Need for an at-home study day",
  "Transportation disruption",
  "Other",
  "Prefer advance notice regardless of reason",
] as const;
export const CA04_OPTIONS = [
  "Join our study session by video",
  "Join by audio only",
  "Study independently and check in by message",
  "Reschedule the session",
  "Whatever works for them",
] as const;
export const CA05_OPTIONS = [
  "Yes — video with camera on",
  "Yes — video call, camera optional",
  "Yes — audio-only is enough",
  "No — a text check-in is enough",
  "No — remote attendance should be optional",
] as const;
export const CA06_OPTIONS = [
  "Video with camera on",
  "Video with camera off",
  "Audio-only co-working",
  "Text check-ins",
  "Rescheduling",
  "Depends on the situation",
] as const;
export const CA07_OPTIONS = [
  "In-app message",
  "Text message",
  "Phone call",
  "Any of these",
] as const;
export const CA08_OPTIONS = [
  "Yes, always try to make it up",
  "Usually, if schedules allow",
  "Not necessarily — continue with next session",
  "Flexible",
] as const;

export type Sp03 =
  | { kind: "date"; date: string }
  | { kind: "not-scheduled" }
  | null;

export type Sc04 =
  | { kind: "flexible" }
  | { kind: "time"; hour: number }
  | null;

export type MatchingQuestionnaireV3 = {
  sp01: Sp01 | null;
  sp02: string;
  sp03: Sp03;
  sc01: Sc01 | null;
  sc02: Sc02 | null;
  sc03: Sc03WeekdayLabel[];
  sc04: Sc04;
  br01: Br01 | null;
  br02: string | null;
  br03: string | null;
  br04: string | null;
  md01: Md01 | null;
  md02: number | null;
  md03: string[];
  md04: string[];
  on01: number | null;
  on02: string | null;
  on03: string | null;
  on04: string | null;
  ip01: Ip01 | null;
  ip02: string[];
  fd01: string | null;
  fd02: string | null;
  fd03: string | null;
  fd04: string | null;
  fd05: string | null;
  hp01: string | null;
  hp02: string | null;
  hp03: string | null;
  hp04: string | null;
  hl01: string | null;
  hl02: string | null;
  hl03: string | null;
  hl04: string | null;
  ac01: string[];
  ac01OtherDetail: string;
  ac02: string | null;
  ac03: string | null;
  ac04: string[];
  ac04OtherDetail: string;
  ac05: string | null;
  mp01: string | null;
  mp02: string | null;
  mp03: string | null;
  mp04: string | null;
  mp05: string | null;
  ca01: string | null;
  ca02: string | null;
  ca03: string[];
  ca04: string | null;
  ca05: string | null;
  ca06: string[];
  ca07: string | null;
  ca08: string | null;
};

export function emptyMatchingQuestionnaireV3(): MatchingQuestionnaireV3 {
  return {
    sp01: null,
    sp02: "",
    sp03: null,
    sc01: null,
    sc02: null,
    sc03: [],
    sc04: null,
    br01: null,
    br02: null,
    br03: null,
    br04: null,
    md01: null,
    md02: null,
    md03: [],
    md04: [],
    on01: null,
    on02: null,
    on03: null,
    on04: null,
    ip01: null,
    ip02: [],
    fd01: null,
    fd02: null,
    fd03: null,
    fd04: null,
    fd05: null,
    hp01: null,
    hp02: null,
    hp03: null,
    hp04: null,
    hl01: null,
    hl02: null,
    hl03: null,
    hl04: null,
    ac01: [],
    ac01OtherDetail: "",
    ac02: null,
    ac03: null,
    ac04: [],
    ac04OtherDetail: "",
    ac05: null,
    mp01: null,
    mp02: null,
    mp03: null,
    mp04: null,
    mp05: null,
    ca01: null,
    ca02: null,
    ca03: [],
    ca04: null,
    ca05: null,
    ca06: [],
    ca07: null,
    ca08: null,
  };
}

export function isInPersonMode(md01: Md01 | null): boolean {
  return md01 === "In person only" || md01 === "Hybrid (in person and online)";
}

export function isOnlineMode(md01: Md01 | null): boolean {
  return md01 === "Online only" || md01 === "Hybrid (in person and online)";
}

export function lunchBranch(br01: Br01 | null): boolean {
  return br01 === "Yes" || br01 === "It depends";
}

export function onlineStudyDaysPerWeek(q: MatchingQuestionnaireV3): number {
  if (!q.md01 || !q.sc02) return 0;
  if (q.md01 === "Online only") return q.sc02;
  if (q.md01 === "Hybrid (in person and online)") {
    const inPerson = q.md02 ?? 0;
    return Math.max(0, q.sc02 - inPerson);
  }
  return 0;
}

export function showIp02(q: MatchingQuestionnaireV3): boolean {
  if (!isInPersonMode(q.md01)) return false;
  return (
    q.ip01 === "A Beside-recommended study space" || q.ip01 === "Either"
  );
}

export function showFoodLunchAtDesk(q: MatchingQuestionnaireV3): boolean {
  return isInPersonMode(q.md01) && lunchBranch(q.br01);
}

export function showInPersonCancellation(q: MatchingQuestionnaireV3): boolean {
  return isInPersonMode(q.md01);
}

export function showAc04(q: MatchingQuestionnaireV3): boolean {
  return q.ac03 === "Yes, if they also opt in";
}

export function showAc05(q: MatchingQuestionnaireV3): boolean {
  return (
    showAc04(q) &&
    q.ac04.length > 0 &&
    !q.ac04.every((item) => item === "Prefer not to specify")
  );
}

export function showHp04(q: MatchingQuestionnaireV3): boolean {
  return (
    q.hp01 === "Yes, most of the time" || q.hp01 === "Sometimes"
  );
}

export function showOnlineAccountability(q: MatchingQuestionnaireV3): boolean {
  return isOnlineMode(q.md01);
}

export function showOnFollowUps(q: MatchingQuestionnaireV3): boolean {
  return showOnlineAccountability(q) && (q.on01 ?? 0) > 0;
}

export function sc03WeekdayOptions(q: MatchingQuestionnaireV3): string[] {
  const fromSc03 = q.sc03.filter((d) => d !== "Varies");
  return fromSc03.length > 0 ? [...fromSc03, "Flexible"] : [...SC03_WEEKDAY_LABELS.filter((d) => d !== "Varies"), "Flexible"];
}

export function tierLabelToNumber(label: string): VenueTier | null {
  const match = /^Tier (\d)$/.exec(label);
  if (!match) return null;
  const n = Number(match[1]);
  if (n >= 1 && n <= 4) return n as VenueTier;
  return null;
}

export function derivePreferredDays(q: MatchingQuestionnaireV3): Day[] {
  if (q.sc03.includes("Varies") || q.sc03.length === 0) {
    return ["mon", "tue", "wed", "thu", "fri"];
  }
  const days = q.sc03
    .map((label) => SC03_LABEL_TO_DAY[label])
    .filter(Boolean) as Day[];
  return days.length > 0 ? days : [...DAYS];
}

function deriveExam(sp01: Sp01 | null): Exam {
  switch (sp01) {
    case "Bar exam":
      return "ny-bar";
    case "Medical boards":
      return "mcat";
    case "University course or degree":
      return "grad";
    default:
      return "other";
  }
}

function deriveEat(fd02: string | null): EatPreference {
  if (fd02 === "Yes") return "meals";
  if (fd02 === "Only occasionally") return "snacks";
  return "none";
}

function deriveTalk(on04: string | null, md01: Md01 | null): StudyProfile["talk"] {
  if (md01 === "In person only") return "silent";
  if (on04 === "Conversation is fine") return "collaborative";
  if (on04 === "Brief check-ins at agreed intervals") return "check-ins";
  return "silent";
}

function deriveBreaks(br03: string | null): StudyProfile["breaks"] {
  if (br03 === "20 minutes") return "frequent";
  if (br03 === "60 minutes") return "deep-focus";
  return "hourly";
}

function deriveWindow(q: MatchingQuestionnaireV3): { start: number; end: number } {
  const hours = q.sc01 ?? 8;
  if (q.sc04?.kind === "time") {
    const start = q.sc04.hour;
    return { start, end: Math.min(22, start + hours) };
  }
  return { start: 9, end: Math.min(22, 9 + hours) };
}

function deriveVenueTiers(q: MatchingQuestionnaireV3): VenueTier[] {
  if (!isInPersonMode(q.md01)) return [1, 2, 3, 4];
  if (showIp02(q) && q.ip02.length > 0) {
    const tiers = q.ip02
      .map(tierLabelToNumber)
      .filter((t): t is VenueTier => t !== null);
    if (tiers.length > 0) return [...new Set(tiers)].sort();
  }
  return [1, 2, 3, 4];
}

/** Map v3 answers onto legacy StudyProfile fields used by the simple matcher. */
export function applyV3ToLegacyProfile(
  base: Omit<StudyProfile, "exam" | "preferredDays" | "windowStart" | "windowEnd" | "venueTiers" | "eat" | "breaks" | "talk"> & {
    matching: MatchingQuestionnaireV3;
  },
): StudyProfile {
  const q = base.matching;
  const window = deriveWindow(q);
  return {
    ...base,
    exam: deriveExam(q.sp01),
    preferredDays: derivePreferredDays(q),
    windowStart: window.start,
    windowEnd: window.end,
    venueTiers: deriveVenueTiers(q),
    eat: deriveEat(q.fd02),
    breaks: deriveBreaks(q.br03),
    talk: deriveTalk(q.on04, q.md01),
  };
}

export const QUESTIONNAIRE_STEPS = [
  "About you",
  "Neighborhood",
  "Study commitment",
  "Breaks & lunch",
  "Study format & online",
  "Spaces & food",
  "Sound & illness",
  "Accessibility",
  "Partner & cancellation",
] as const;

function required(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

export function validateQuestionnaireStep(
  stepIndex: number,
  q: MatchingQuestionnaireV3,
  name: string,
  neighborhoodId: StudyProfile["neighborhoodId"],
  neighborhoodOther?: string,
): string | null {
  if (stepIndex === 0) {
    if (name.trim().length < 2) return "Add the name your study partner will see.";
    if (!q.sp01) return "Select what you are studying for.";
    if (!q.sp02.trim()) return "Enter the specific exam, course, or qualification.";
    return null;
  }
  if (stepIndex === 1) {
    if (neighborhoodId === "other" && !neighborhoodOther?.trim()) {
      return "Name the NYC neighborhood you leave from.";
    }
    return null;
  }
  if (stepIndex === 2) {
    if (!q.sc01) return "Select hours per study day.";
    if (!q.sc02) return "Select days per week.";
    if (q.sc03.length === 0) return "Select which days you usually study.";
    const fixedDays = q.sc03.filter((d) => d !== "Varies");
    if (!q.sc03.includes("Varies") && fixedDays.length !== q.sc02) {
      return `Pick ${q.sc02} weekday${q.sc02 === 1 ? "" : "s"}, choose Varies, or adjust days per week.`;
    }
    return null;
  }
  if (stepIndex === 3) {
    if (!q.br01) return "Answer whether you take a lunch break.";
    if (lunchBranch(q.br01)) {
      if (!q.br02) return "Select when you prefer lunch.";
      if (!q.br03) return "Select lunch break length.";
      if (!q.br04) return "Select how you prefer to spend lunch.";
    }
    return null;
  }
  if (stepIndex === 4) {
    if (!q.md01) return "Select how you prefer to study with a partner.";
    if (q.md01 === "Hybrid (in person and online)") {
      if (q.md02 === null || q.md02 < 1 || !q.sc02 || q.md02 > q.sc02) {
        return "In-person days must be between 1 and your days per week.";
      }
    }
    if (q.md01 === "Hybrid (in person and online)" || q.md01 === "In person only") {
      if (q.md03.length === 0) return "Select in-person day preferences.";
    }
    if (isOnlineMode(q.md01)) {
      if (q.md04.length === 0) return "Select online day preferences.";
      const maxOnline = onlineStudyDaysPerWeek(q);
      if (q.on01 === null || q.on01 < 0 || q.on01 > maxOnline) {
        return `Video-call days must be between 0 and ${maxOnline} (your online study days per week).`;
      }
      if (showOnFollowUps(q)) {
        if (!q.on02) return "Select camera preference for online sessions.";
        if (!q.on03) return "Select microphone preference for online sessions.";
        if (!q.on04) return "Select interaction level for online sessions.";
      }
    }
    return null;
  }
  if (stepIndex === 5) {
    if (isInPersonMode(q.md01)) {
      if (!q.ip01) return "Select where you prefer to meet in person.";
      if (showIp02(q) && q.ip02.length === 0) {
        return "Select at least one Beside study-space tier.";
      }
    }
    if (!q.fd01) return "Answer about partner snacks at the table.";
    if (!q.fd02) return "Answer about your snack habits.";
    if (showFoodLunchAtDesk(q)) {
      if (!q.fd03) return "Select lunch location preference.";
      if (!q.fd04) return "Answer about partner lunch at the table.";
    }
    return null;
  }
  if (stepIndex === 6) {
    if (!q.hp01) return "Answer about wearing headphones.";
    if (!q.hp02) return "Answer about partner headphones.";
    if (!q.hp03) return "Answer about acceptable headphone leakage.";
    if (isInPersonMode(q.md01)) {
      if (!q.hl01) return "Answer about cold symptoms and in-person sessions.";
      if (!q.hl02) return "Answer about studying with someone who has cold symptoms.";
    }
    return null;
  }
  if (stepIndex === 7) {
    if (isInPersonMode(q.md01) && !q.ac02) {
      return "Answer about service animals for in-person sessions.";
    }
    return null;
  }
  if (stepIndex === 8) {
    if (!q.mp01) return "Select study partner field preference.";
    if (!q.mp03) return "Rate how structured your routine is.";
    if (!q.mp04) return "Select preferred partner routine.";
    if (!q.ca02) return "Select cancellation flexibility.";
    if (showInPersonCancellation(q)) {
      if (!q.ca01) return "Select expected cancellation notice.";
      if (!q.ca04) return "Select preference if partner is sick.";
      if (!q.ca05) return "Select remote fallback requirement.";
      if (q.ca06.length === 0) return "Select what you can offer instead of in-person.";
    }
    return null;
  }
  return null;
}

export function isMatchingQuestionnaireComplete(
  q: MatchingQuestionnaireV3,
  profile: Pick<StudyProfile, "name" | "neighborhoodId" | "neighborhoodOther">,
): boolean {
  for (let i = 0; i < QUESTIONNAIRE_STEPS.length; i += 1) {
    if (
      validateQuestionnaireStep(
        i,
        q,
        profile.name,
        profile.neighborhoodId,
        profile.neighborhoodOther,
      )
    ) {
      return false;
    }
  }
  return true;
}

export function legacyProfileToV3(profile: StudyProfile): MatchingQuestionnaireV3 {
  const q = emptyMatchingQuestionnaireV3();
  q.sp01 = profile.exam === "ny-bar" ? "Bar exam" : "Other";
  q.sp02 = profile.exam === "ny-bar" ? "NY Bar Exam" : profile.exam;
  q.sc01 = Math.min(12, Math.max(1, profile.windowEnd - profile.windowStart)) as Sc01;
  q.sc02 = Math.min(7, Math.max(1, profile.preferredDays.length)) as Sc02;
  q.sc03 = profile.preferredDays.map(
    (d) =>
      ({
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday",
        sun: "Sunday",
      })[d] as Sc03WeekdayLabel,
  );
  q.sc04 = { kind: "time", hour: profile.windowStart };
  q.br01 = "Yes";
  q.br02 = "Flexible";
  q.br03 = "40 minutes";
  q.br04 = "No preference";
  q.md01 = "Hybrid (in person and online)";
  q.md02 = 2;
  q.md03 = ["Flexible"];
  q.md04 = ["Flexible"];
  q.on01 = 1;
  q.on02 = "Flexible";
  q.on03 = "Muted while studying";
  q.on04 = "Brief check-ins at agreed intervals";
  q.ip01 = "Either";
  q.ip02 = profile.venueTiers.map((t) => `Tier ${t}`);
  q.fd01 = "No preference";
  q.fd02 =
    profile.eat === "meals"
      ? "Yes"
      : profile.eat === "snacks"
        ? "Only occasionally"
        : "No, only during breaks";
  q.fd03 = "Either";
  q.fd04 = "No preference";
  q.hp01 = "Sometimes";
  q.hp02 = "Yes";
  q.hp03 = "Faint sound is okay";
  q.hl01 = "Decide with my partner";
  q.hl02 = "Decide case by case";
  q.ac01 = ["No specific requirements"];
  q.ac02 = "No";
  q.ac03 = "No, it does not matter to me";
  q.mp01 = "Same exam or qualification";
  q.mp03 = "Somewhat structured";
  q.mp04 = "No preference";
  q.ca01 = "At least 24 hours";
  q.ca02 = "Flexible with reasonable notice";
  q.ca04 = "Join our study session by video";
  q.ca05 = "Yes — video call, camera optional";
  q.ca06 = ["Video with camera off", "Rescheduling"];
  return q;
}
