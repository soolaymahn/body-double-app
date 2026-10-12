import { MatchesList } from "@/components/matches-list";

export default function MatchesPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
        The match
      </p>
      <h1 className="font-heading mt-2 text-4xl tracking-tight">Your matches</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        This is the product: a person who will sit with you. Study spaces and
        retreats are how we make the hours concrete.
      </p>
      <div className="mt-8">
        <MatchesList />
      </div>
    </div>
  );
}
