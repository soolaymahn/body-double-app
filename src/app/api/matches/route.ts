import { MOCK_STUDENTS } from "@/domain/students";
import { rankMatches } from "@/domain/matching";
import { isProfileComplete } from "@/domain/matching";
import type { StudyProfile } from "@/domain/types";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a study profile JSON body." }, { status: 400 });
  }

  if (!isProfileComplete(body as StudyProfile)) {
    return Response.json(
      { error: "Profile is missing required matching fields." },
      { status: 400 },
    );
  }

  const matches = rankMatches(body as StudyProfile, MOCK_STUDENTS);
  return Response.json({ matches });
}
