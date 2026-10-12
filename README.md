# Beside

**Live:** [https://body-double-app.vercel.app/](https://body-double-app.vercel.app/)

NYC study-partner matching for people in a long exam season — bar, LSAT, CFA, MCAT, and similar. The first slice is a web app: an editorial marketing homepage (`src/components/home`), a short matching questionnaire, proximity + schedule matching, a hold at a Tier 1–4 study space, and a placeholder for focused-work retreats.

Beside is a body-doubling product. Matching is not only “same exam.” It scores whether you eat at the table, how often you break, and whether you want silence or conversation.

Coworking operators are not named during matching. Students pick **Tier 1–4** (price, amenities, location). The specific space is revealed when they sit down together.

## What this version does

- Multi-step questionnaire (exam, NYC neighborhood, hours, study-space tier, study style)
- Ranked matches from a seeded NYC student pool
- Compatibility breakdown (proximity, overlap, shared tier, exam, eat / breaks / talk)
- Session hold at a partner workspace, with the 30–50% day-pass split shown in the open
- Browser storage only — no database or auth yet

**Tiers (student-facing)**

- Tier 1 — premium quiet rooms / cafes in core Manhattan (~$65–69)
- Tier 2 — full-service desks by major transit (~$45–49)
- Tier 3 — flexible Manhattan hot desks (~$35)
- Tier 4 — neighborhood desks in Brooklyn and similar (~$29)

## Run locally

Requires Node 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:43141](http://localhost:43141).

```bash
npm run lint
npm run build
```

## Deploy on Vercel

This is a standard Next.js App Router project. From the repo root:

1. Import the Git repository in Vercel
2. Framework preset: Next.js (auto-detected)
3. Build command: `npm run build`
4. Output: Next.js default (no extra `vercel.json` needed)

There are no required environment variables. Matching also lives at `POST /api/matches` if you want to swap the client ranker for a server later.

## React Native later

Keep UI in `src/app` and `src/components`. Keep logic in `src/domain` — no React, no Next, no DOM.

| Move as-is | Replace |
| --- | --- |
| `src/domain/types.ts` | `src/components/*` (web primitives) |
| `src/domain/matching.ts` | `src/app/*` routes |
| neighborhoods, venues, students | `src/lib/storage.ts` → AsyncStorage / SecureStore |

The questionnaire answers, ranker, and venue pricing are already plain TypeScript.

## Product notes

- NYC-only neighborhoods for this slice
- Seed students are mock data so the matching loop is demoable without sign-up
- Use **Use a sample profile** on the questionnaire if you want to skip the form
