"use client";

import { Questionnaire } from "@/components/questionnaire";
import { useProfile } from "@/components/profile-provider";

export default function OnboardPage() {
  const { ready, profile } = useProfile();

  if (!ready) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16">
        <div className="h-72 animate-pulse rounded-2xl bg-muted" />
        <p className="sr-only">Loading matching questions</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14">
      <Questionnaire initial={profile} />
    </div>
  );
}
