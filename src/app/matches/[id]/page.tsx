import { MatchDetail } from "@/components/match-detail";

export default async function MatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <MatchDetail studentId={id} />
    </div>
  );
}
