import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="font-heading text-4xl">That page is not in the building</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The NYC matching pool is still small. Head back to your matches or get
        matched.
      </p>
      <Button className="mt-6 h-10 px-4" render={<Link href="/" />}>
        Go home
      </Button>
    </div>
  );
}
