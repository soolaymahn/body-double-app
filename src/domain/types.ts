/**
 * Domain types for Beside.
 * Keep this module free of React / Next.js so it can move to React Native later.
 */

export const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
export type Day = (typeof DAYS)[number];

export const EXAMS = [
  "ny-bar",
  "other-bar",
  "lsat",
  "gre",
  "mcat",
  "cfa",
  "cpa",
  "grad",
  "other",
] as const;
export type Exam = (typeof EXAMS)[number];

export const EAT_PREFERENCES = ["none", "snacks", "meals"] as const;
export type EatPreference = (typeof EAT_PREFERENCES)[number];

export const BREAK_PREFERENCES = ["deep-focus", "hourly", "frequent"] as const;
export type BreakPreference = (typeof BREAK_PREFERENCES)[number];

export const TALK_PREFERENCES = ["silent", "check-ins", "collaborative"] as const;
export type TalkPreference = (typeof TALK_PREFERENCES)[number];

export const VENUE_TIERS = [1, 2, 3, 4] as const;
export type VenueTier = (typeof VENUE_TIERS)[number];

export const VENUE_TYPES = ["coworking-space"] as const;
export type VenueType = (typeof VENUE_TYPES)[number];

export type FactStatus = "yes" | "no" | "unknown";
export type DayPassCoverage = "included" | "extra-fee" | "unknown";

export type Fact = {
  status: FactStatus;
  /** Set only when availability is confirmed. Omitted means inclusion is unknown. */
  dayPass?: DayPassCoverage;
  hours?: string;
  note?: string;
};

export type VenueFacts = {
  coffee: Fact;
  tea: Fact;
  drinkingWater: Fact;
  kitchenAccess: Fact;
  outsideFoodPermitted: Fact;
  wifi: Fact;
  powerOutlets: Fact;
  quietStudyArea: Fact;
  privateStudyRooms: Fact;
  phoneBooths: Fact;
  printing: Fact;
  restNapRoom: Fact;
  gymAccess: Fact;
  bookStorage: Fact;
  lockers: Fact;
  mondayFriday: Fact;
  saturday: Fact;
  sunday: Fact;
  open24_7: Fact;
  dayPassAccessHours: Fact;
};

export type NeighborhoodId =
  | "upper-east-side"
  | "upper-west-side"
  | "midtown"
  | "chelsea"
  | "west-village"
  | "east-village"
  | "soho"
  | "financial-district"
  | "williamsburg"
  | "park-slope"
  | "astoria"
  | "long-island-city"
  | "harlem"
  | "brooklyn-heights"
  | "bushwick"
  | "other";

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Neighborhood = {
  id: NeighborhoodId;
  name: string;
  borough: "Manhattan" | "Brooklyn" | "Queens" | "NYC";
  coordinates: Coordinates;
};

export type Venue = {
  id: string;
  tier: VenueTier;
  /** Student-facing name. No operator brand — that is assigned when they sit down. */
  name: string;
  venueType: VenueType;
  neighborhoodId: NeighborhoodId;
  address: string;
  dayPassUsd: number;
  /** Share of the day-pass fee Beside keeps. */
  partnerCut: number;
  /** Confirmed highlights for the compact card. At most three. */
  keyAmenities: string[];
  facts: VenueFacts;
  coordinates: Coordinates;
};

export type StudyProfile = {
  id: string;
  name: string;
  exam: Exam;
  neighborhoodId: NeighborhoodId;
  /** Typed NYC neighborhood when `neighborhoodId` is `"other"`. */
  neighborhoodOther?: string;
  preferredDays: Day[];
  windowStart: number;
  windowEnd: number;
  venueTiers: VenueTier[];
  eat: EatPreference;
  breaks: BreakPreference;
  talk: TalkPreference;
  bio: string;
};

export type MatchBreakdown = {
  proximity: number;
  schedule: number;
  venue: number;
  exam: number;
  eat: number;
  breaks: number;
  talk: number;
};

export type RankedMatch = {
  student: StudyProfile;
  score: number;
  miles: number;
  sharedTiers: VenueTier[];
  overlappingDays: Day[];
  overlapStart: number;
  overlapEnd: number;
  breakdown: MatchBreakdown;
  reasons: string[];
};

export type BookedSession = {
  id: string;
  partnerId: string;
  venueId: string;
  day: Day;
  startHour: number;
  endHour: number;
  createdAt: string;
  status: "confirmed";
};

export type QuestionnaireDraft = Omit<StudyProfile, "id">;
