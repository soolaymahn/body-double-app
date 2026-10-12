import { facts, YES } from "./facts";
import type { Venue, VenueTier } from "./types";

export const VENUES: Venue[] = [
  {
    id: "tier1-park",
    tier: 1,
    name: "Park Avenue quiet floor",
    venueType: "coworking-space",
    neighborhoodId: "midtown",
    address: "101 Park Ave, New York, NY",
    dayPassUsd: 65,
    partnerCut: 0.3,
    keyAmenities: ["Premium lounge", "Cafe", "Quiet rooms"],
    facts: facts({
      coffee: YES,
      quietStudyArea: YES,
    }),
    coordinates: { lat: 40.7512, lng: -73.978 },
  },
  {
    id: "tier1-rockefeller",
    tier: 1,
    name: "Rockefeller lounge",
    venueType: "coworking-space",
    neighborhoodId: "midtown",
    address: "75 Rockefeller Plaza, New York, NY",
    dayPassUsd: 69,
    partnerCut: 0.3,
    keyAmenities: ["Cafe", "Day offices", "Wellness rooms"],
    facts: facts({
      coffee: YES,
      privateStudyRooms: YES,
    }),
    coordinates: { lat: 40.7596, lng: -73.9787 },
  },
  {
    id: "tier1-harbor",
    tier: 1,
    name: "Harbor quiet floor",
    venueType: "coworking-space",
    neighborhoodId: "financial-district",
    address: "225 Liberty St, New York, NY",
    dayPassUsd: 65,
    partnerCut: 0.3,
    keyAmenities: ["Harbor views", "Cafe", "Quiet floors"],
    facts: facts({
      coffee: YES,
      quietStudyArea: YES,
    }),
    coordinates: { lat: 40.7127, lng: -74.0154 },
  },
  {
    id: "tier2-penn",
    tier: 2,
    name: "Penn Station day desk",
    venueType: "coworking-space",
    neighborhoodId: "midtown",
    address: "462 7th Ave, New York, NY",
    dayPassUsd: 45,
    partnerCut: 0.4,
    keyAmenities: ["Day desks", "Phone booths", "Lounge"],
    facts: facts({
      phoneBooths: YES,
    }),
    coordinates: { lat: 40.7512, lng: -73.9903 },
  },
  {
    id: "tier2-grand-central",
    tier: 2,
    name: "Grand Central day desk",
    venueType: "coworking-space",
    neighborhoodId: "midtown",
    address: "485 Madison Ave, New York, NY",
    dayPassUsd: 45,
    partnerCut: 0.4,
    keyAmenities: ["Day desks", "Natural light", "Near Grand Central"],
    facts: facts({}),
    coordinates: { lat: 40.758, lng: -73.9754 },
  },
  {
    id: "tier2-times-square",
    tier: 2,
    name: "Times Square cafe desk",
    venueType: "coworking-space",
    neighborhoodId: "midtown",
    address: "120 W 45th St, New York, NY",
    dayPassUsd: 49,
    partnerCut: 0.4,
    keyAmenities: ["Cafe", "Conference rooms", "Quiet corners"],
    facts: facts({
      coffee: YES,
      quietStudyArea: YES,
    }),
    coordinates: { lat: 40.757, lng: -73.9837 },
  },
  {
    id: "tier2-flatiron",
    tier: 2,
    name: "Flatiron day desk",
    venueType: "coworking-space",
    neighborhoodId: "chelsea",
    address: "116 W 23rd St, New York, NY",
    dayPassUsd: 45,
    partnerCut: 0.4,
    keyAmenities: ["Day desks", "Lounge", "Near PATH trains"],
    facts: facts({}),
    coordinates: { lat: 40.7427, lng: -73.9935 },
  },
  {
    id: "tier3-bryant",
    tier: 3,
    name: "Bryant Park hot desk",
    venueType: "coworking-space",
    neighborhoodId: "midtown",
    address: "54 W 40th St, New York, NY",
    dayPassUsd: 35,
    partnerCut: 0.3,
    keyAmenities: ["Hot desks", "Phone booths", "Coffee"],
    facts: facts({
      coffee: YES,
      phoneBooths: YES,
    }),
    coordinates: { lat: 40.7536, lng: -73.9832 },
  },
  {
    id: "tier3-soho",
    tier: 3,
    name: "SoHo late desk",
    venueType: "coworking-space",
    neighborhoodId: "soho",
    address: "154 Grand St, New York, NY",
    dayPassUsd: 35,
    partnerCut: 0.3,
    keyAmenities: ["Hot desks", "Kitchen", "Late hours"],
    facts: facts({
      kitchenAccess: YES,
      dayPassAccessHours: { status: "yes", hours: "Late hours" },
    }),
    coordinates: { lat: 40.7244, lng: -73.9977 },
  },
  {
    id: "tier4-dumbo",
    tier: 4,
    name: "Dumbo hot desk",
    venueType: "coworking-space",
    neighborhoodId: "brooklyn-heights",
    address: "81 Prospect St, Brooklyn, NY",
    dayPassUsd: 29,
    partnerCut: 0.3,
    keyAmenities: ["Hot desks", "Coffee", "Near A/C/F"],
    facts: facts({
      coffee: YES,
    }),
    coordinates: { lat: 40.7009, lng: -73.987 },
  },
  {
    id: "tier4-williamsburg",
    tier: 4,
    name: "North Brooklyn weekend desk",
    venueType: "coworking-space",
    neighborhoodId: "williamsburg",
    address: "27 N 6th St, Brooklyn, NY",
    dayPassUsd: 29,
    partnerCut: 0.3,
    keyAmenities: ["Hot desks", "Kitchen", "Weekend access"],
    facts: facts({
      kitchenAccess: YES,
      saturday: YES,
      sunday: YES,
      dayPassAccessHours: { status: "yes", hours: "Weekend access" },
    }),
    coordinates: { lat: 40.714, lng: -73.961 },
  },
];

export const VENUE_BY_ID: Record<string, Venue> = Object.fromEntries(
  VENUES.map((venue) => [venue.id, venue]),
);

export function venuesForTiers(tiers: VenueTier[]): Venue[] {
  if (tiers.length === 0) return VENUES;
  return VENUES.filter((venue) => tiers.includes(venue.tier));
}

export function sessionTotals(venue: Venue, seats = 2) {
  const gross = venue.dayPassUsd * seats;
  const besideKeeps = Math.round(gross * venue.partnerCut);
  const venueKeeps = gross - besideKeeps;
  return { seats, gross, besideKeeps, venueKeeps, perPerson: venue.dayPassUsd };
}
