"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useProfile } from "@/components/profile-provider";

export function HeaderActions() {
  const router = useRouter();
  const { profile, reset } = useProfile();

  return (
    <div className="flex items-center gap-2">
      {profile ? (
        <>
          <span className="hidden max-w-36 truncate text-sm text-muted-foreground sm:inline">
            {profile.name}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              reset();
              router.push("/");
            }}
          >
            Reset
          </Button>
        </>
      ) : null}
      <Button className="h-9 px-3.5" render={<Link href={profile ? "/matches" : "/onboard"} />}>
        {profile ? "Your matches" : "Find your match"}
      </Button>
    </div>
  );
}
