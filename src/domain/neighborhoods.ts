import type { Neighborhood, NeighborhoodId } from "./types";

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: "upper-east-side",
    name: "Upper East Side",
    borough: "Manhattan",
    coordinates: { lat: 40.7736, lng: -73.9566 },
  },
  {
    id: "upper-west-side",
    name: "Upper West Side",
    borough: "Manhattan",
    coordinates: { lat: 40.787, lng: -73.9754 },
  },
  {
    id: "midtown",
    name: "Midtown",
    borough: "Manhattan",
    coordinates: { lat: 40.7549, lng: -73.984 },
  },
  {
    id: "chelsea",
    name: "Chelsea",
    borough: "Manhattan",
    coordinates: { lat: 40.7465, lng: -74.0014 },
  },
  {
    id: "west-village",
    name: "West Village",
    borough: "Manhattan",
    coordinates: { lat: 40.7358, lng: -74.0036 },
  },
  {
    id: "east-village",
    name: "East Village",
    borough: "Manhattan",
    coordinates: { lat: 40.7265, lng: -73.9815 },
  },
  {
    id: "soho",
    name: "SoHo",
    borough: "Manhattan",
    coordinates: { lat: 40.7233, lng: -73.9978 },
  },
  {
    id: "financial-district",
    name: "Financial District",
    borough: "Manhattan",
    coordinates: { lat: 40.7075, lng: -74.0113 },
  },
  {
    id: "harlem",
    name: "Harlem",
    borough: "Manhattan",
    coordinates: { lat: 40.8116, lng: -73.9465 },
  },
  {
    id: "williamsburg",
    name: "Williamsburg",
    borough: "Brooklyn",
    coordinates: { lat: 40.7081, lng: -73.9571 },
  },
  {
    id: "park-slope",
    name: "Park Slope",
    borough: "Brooklyn",
    coordinates: { lat: 40.6681, lng: -73.9806 },
  },
  {
    id: "brooklyn-heights",
    name: "Brooklyn Heights",
    borough: "Brooklyn",
    coordinates: { lat: 40.696, lng: -73.9936 },
  },
  {
    id: "bushwick",
    name: "Bushwick",
    borough: "Brooklyn",
    coordinates: { lat: 40.6944, lng: -73.9215 },
  },
  {
    id: "astoria",
    name: "Astoria",
    borough: "Queens",
    coordinates: { lat: 40.7644, lng: -73.9235 },
  },
  {
    id: "long-island-city",
    name: "Long Island City",
    borough: "Queens",
    coordinates: { lat: 40.7447, lng: -73.9485 },
  },
  {
    id: "other",
    name: "Other",
    borough: "NYC",
    // Coarse stand-in so proximity scoring still has a point. The typed name
    // is what we store and show; we do not have a pin for an unlisted neighborhood.
    coordinates: { lat: 40.7362, lng: -73.9722 },
  },
];

export const NEIGHBORHOOD_BY_ID: Record<NeighborhoodId, Neighborhood> =
  Object.fromEntries(NEIGHBORHOODS.map((n) => [n.id, n])) as Record<
    NeighborhoodId,
    Neighborhood
  >;

/** Catalog name, or the typed NYC neighborhood when the choice is Other. */
export function neighborhoodLabel(profile: {
  neighborhoodId: NeighborhoodId;
  neighborhoodOther?: string;
}): string {
  if (profile.neighborhoodId === "other") {
    const entered = profile.neighborhoodOther?.trim();
    if (entered) return entered;
  }
  return NEIGHBORHOOD_BY_ID[profile.neighborhoodId].name;
}
