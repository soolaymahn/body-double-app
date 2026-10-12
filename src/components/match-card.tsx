import Link from "next/link";

import { ScoreRing } from "@/components/score-ring";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { EXAM_LABELS, TALK_LABELS, TIER_LABELS } from "@/domain/copy";
import { formatWindow } from "@/domain/matching";
import { NEIGHBORHOOD_BY_ID } from "@/domain/neighborhoods";
import type { RankedMatch } from "@/domain/types";
import { initials } from "@/lib/format";

export function MatchCard({ match }: { match: RankedMatch }) {
  const hood = NEIGHBORHOOD_BY_ID[match.student.neighborhoodId];

  return (
    <Card>
      <CardContent className="flex gap-4">
        <Avatar size="lg" className="size-12">
          <AvatarFallback>{initials(match.student.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-heading text-xl leading-tight">
                {match.student.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {EXAM_LABELS[match.student.exam]} · {hood.name}
              </p>
            </div>
            <ScoreRing score={match.score} size={60} />
          </div>
          <p className="mt-3 text-sm leading-6">{match.student.bio}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge variant="secondary">{TALK_LABELS[match.student.talk]}</Badge>
            {match.overlappingDays.length > 0 ? (
              <Badge variant="outline">
                {formatWindow(match.overlapStart, match.overlapEnd)}
              </Badge>
            ) : (
              <Badge variant="outline">No overlapping hours</Badge>
            )}
            {match.sharedTiers.slice(0, 2).map((tier) => (
              <Badge key={tier} variant="outline">
                {TIER_LABELS[tier]}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <p className="text-xs text-muted-foreground">
          {match.miles.toFixed(1)} miles · {match.reasons[0]}
        </p>
        <Button size="sm" render={<Link href={`/matches/${match.student.id}`} />}>
          View match
        </Button>
      </CardFooter>
    </Card>
  );
}
