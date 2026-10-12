import type { Fact, VenueFacts } from "./types";

export const UNKNOWN: Fact = { status: "unknown" };
export const YES: Fact = { status: "yes" };
export const NO: Fact = { status: "no" };

export const DEFAULT_FACTS: VenueFacts = {
  coffee: UNKNOWN,
  tea: UNKNOWN,
  drinkingWater: UNKNOWN,
  kitchenAccess: UNKNOWN,
  outsideFoodPermitted: UNKNOWN,
  wifi: UNKNOWN,
  powerOutlets: UNKNOWN,
  quietStudyArea: UNKNOWN,
  privateStudyRooms: UNKNOWN,
  phoneBooths: UNKNOWN,
  printing: UNKNOWN,
  restNapRoom: UNKNOWN,
  gymAccess: UNKNOWN,
  bookStorage: UNKNOWN,
  lockers: UNKNOWN,
  mondayFriday: UNKNOWN,
  saturday: UNKNOWN,
  sunday: UNKNOWN,
  open24_7: UNKNOWN,
  dayPassAccessHours: UNKNOWN,
};

export function facts(overrides: Partial<VenueFacts>): VenueFacts {
  return { ...DEFAULT_FACTS, ...overrides };
}

export function formatFact(fact: Fact): string {
  if (fact.status === "unknown") return "Not provided";
  if (fact.status === "no") {
    return fact.note ? `No · ${fact.note}` : "No";
  }
  if (fact.hours) {
    return coverageSuffix(fact.hours, fact);
  }
  return coverageSuffix("Yes", fact);
}

function coverageSuffix(base: string, fact: Fact): string {
  let value = base;
  if (fact.dayPass === "included") value += " · included in day pass";
  if (fact.dayPass === "extra-fee") value += " · additional fee";
  if (fact.note) value += ` · ${fact.note}`;
  return value;
}

export const FACT_GROUPS = [
  {
    heading: "Refreshments",
    rows: [
      { key: "coffee", label: "Coffee" },
      { key: "tea", label: "Tea" },
      { key: "drinkingWater", label: "Drinking water" },
      { key: "kitchenAccess", label: "Kitchen access" },
      { key: "outsideFoodPermitted", label: "Outside food permitted" },
    ],
  },
  {
    heading: "Study facilities",
    rows: [
      { key: "wifi", label: "Wi-Fi" },
      { key: "powerOutlets", label: "Power outlets" },
      { key: "quietStudyArea", label: "Quiet study area" },
      { key: "privateStudyRooms", label: "Private study rooms" },
      { key: "phoneBooths", label: "Phone booths" },
      { key: "printing", label: "Printing" },
    ],
  },
  {
    heading: "Comfort & storage",
    rows: [
      { key: "restNapRoom", label: "Rest / nap room" },
      { key: "gymAccess", label: "Gym access" },
      { key: "bookStorage", label: "Book storage" },
      { key: "lockers", label: "Lockers" },
    ],
  },
  {
    heading: "Hours & access",
    rows: [
      { key: "mondayFriday", label: "Monday–Friday" },
      { key: "saturday", label: "Saturday" },
      { key: "sunday", label: "Sunday" },
      { key: "open24_7", label: "Open 24/7" },
      { key: "dayPassAccessHours", label: "Day-pass access hours" },
    ],
  },
] as const;

export type FactKey = (typeof FACT_GROUPS)[number]["rows"][number]["key"];
