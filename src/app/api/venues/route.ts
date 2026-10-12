import { VENUES } from "@/domain/venues";

export async function GET() {
  return Response.json({ venues: VENUES });
}
