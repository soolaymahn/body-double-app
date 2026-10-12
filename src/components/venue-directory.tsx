import { StudySpaceCard } from "@/components/study-space-card";
import { TIER_LABELS, TIER_PRICE_RANGES } from "@/domain/copy";
import { VENUE_TIERS } from "@/domain/types";
import { VENUES } from "@/domain/venues";

export function VenueDirectory() {
  return (
    <div className="grid gap-12">
      {VENUE_TIERS.map((tier) => {
        const locations = VENUES.filter((venue) => venue.tier === tier);
        return (
          <section
            key={tier}
            id={`tier-${tier}`}
            className="scroll-mt-28"
          >
            <div className="mb-4">
              <h2 className="font-heading text-3xl">{TIER_LABELS[tier]}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {TIER_PRICE_RANGES[tier]}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {locations.map((venue) => (
                <StudySpaceCard key={venue.id} venue={venue} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
