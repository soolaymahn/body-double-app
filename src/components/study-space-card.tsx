"use client";

import { useId, useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TIER_LABELS, VENUE_TYPE_LABELS } from "@/domain/copy";
import { FACT_GROUPS, formatFact } from "@/domain/facts";
import { NEIGHBORHOOD_BY_ID } from "@/domain/neighborhoods";
import type { Venue } from "@/domain/types";
import { currency } from "@/lib/format";

export function StudySpaceCard({ venue }: { venue: Venue }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const headingId = useId();
  const hood = NEIGHBORHOOD_BY_ID[venue.neighborhoodId];

  return (
    <Card>
      <CardContent className="grid gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-heading text-xl leading-tight">{venue.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{hood.name}</p>
          </div>
          <Badge variant={venue.tier <= 2 ? "default" : "outline"}>
            {TIER_LABELS[venue.tier]}
          </Badge>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">Venue type</dt>
            <dd>{VENUE_TYPE_LABELS[venue.venueType]}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Price</dt>
            <dd>{currency(venue.dayPassUsd)} / person / day</dd>
          </div>
        </dl>

        <ul className="flex flex-wrap gap-1.5">
          {venue.keyAmenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary">
              {amenity}
            </Badge>
          ))}
        </ul>

        <Button
          type="button"
          variant="outline"
          className="h-9 justify-between px-3"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
        >
          <span>{open ? "Hide details" : "View amenities & hours"}</span>
          <ChevronDownIcon
            className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </Button>

        <div
          id={panelId}
          role="region"
          aria-labelledby={headingId}
          hidden={!open}
          className="grid gap-5 border-t pt-4"
        >
          <h4 id={headingId} className="font-heading text-base">
            Amenities & opening hours
          </h4>
          {FACT_GROUPS.map((group) => (
            <section key={group.heading} className="grid gap-2">
              <h5 className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                {group.heading}
              </h5>
              <dl className="grid gap-2">
                {group.rows.map((row) => (
                  <div
                    key={row.key}
                    className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-baseline gap-3 border-b border-border/70 py-1.5 last:border-b-0"
                  >
                    <dt className="text-sm">{row.label}</dt>
                    <dd className="text-right text-sm text-muted-foreground">
                      {formatFact(venue.facts[row.key])}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
