import type { ReactNode } from "react";

import { Container, Heading, SectionHead } from "@/components/home/primitives";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const ACTIVE_DAYS = new Set([1, 2, 3]);

const PARTS = [
  {
    label: "Person",
    title: "Someone whose working style fits yours.",
    body: "Not the same exam. The same habits: how much you talk, when you break, whether the phone stays in the bag.",
    preview: <PersonPreview />,
  },
  {
    label: "Time",
    title: "A routine that fits both of your lives.",
    body: "A window you can both keep, week after week. Two hours before work counts. So does six days of long sessions.",
    preview: <TimePreview />,
  },
  {
    label: "Place",
    title: "A workspace that makes sense for both of you.",
    body: "Chosen by how long each of you spends on the subway and what the work needs from a room.",
    preview: <PlacePreview />,
  },
];

export function PersonTimePlace() {
  return (
    <section id="how-it-works" className="scroll-mt-24">
      <Container className="py-20 sm:py-28 lg:py-32">
        <SectionHead number="01" label="How it works" />
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <Heading className="lg:col-span-6">We match more than two people.</Heading>
          <p className="max-w-md text-base leading-7 text-muted-foreground lg:col-span-5 lg:col-start-8 lg:self-end">
            Every match is one person, one recurring schedule, and one
            workspace, chosen together. Three parts, one arrangement.
          </p>
        </div>

        <div className="mt-16 grid gap-16 border-t border-foreground/25 md:grid-cols-3 md:gap-x-16 md:gap-y-0 lg:mt-20">
          {PARTS.map((part, index) => (
            <article key={part.label} className="relative pt-8 md:pt-10">
              {index > 0 ? (
                <span
                  aria-hidden
                  className="font-heading mb-4 block text-4xl leading-none text-muted-foreground md:absolute md:top-10 md:-left-12 md:mb-0 lg:text-5xl"
                >
                  +
                </span>
              ) : null}
              <h3 className="font-heading text-5xl leading-none tracking-tight sm:text-6xl lg:text-7xl">
                {part.label}
              </h3>
              <p className="mt-5 max-w-xs text-lg leading-7">{part.title}</p>
              <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{part.body}</p>
              <div className="mt-8">{part.preview}</div>
            </article>
          ))}
        </div>

        <p className="mt-14 max-w-2xl border-t border-border pt-6 text-base leading-7 text-muted-foreground">
          Change any one of the three and the other two stop making sense. That
          is why we match all of them at once.
        </p>
      </Container>
    </section>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 text-foreground">
      {children}
    </div>
  );
}

function PersonPreview() {
  return (
    <Frame>
      <div className="flex items-center gap-3">
        <span className="font-heading grid size-9 place-items-center rounded-full bg-primary text-sm text-primary-foreground">
          P
        </span>
        <div>
          <p className="text-sm font-medium">Priya R.</p>
          <p className="text-xs text-muted-foreground">NY Bar · Chelsea</p>
        </div>
      </div>
      <dl className="mt-4 grid gap-1.5 text-xs">
        {[
          ["Talking", "Silent"],
          ["Breaks", "Hourly, separate"],
          ["Punctuality", "On time"],
          ["Phone", "Away while working"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-t border-border pt-1.5">
            <dt className="text-muted-foreground">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </Frame>
  );
}

function TimePreview() {
  return (
    <Frame>
      <div className="grid grid-cols-7 gap-1" aria-label="Tuesday, Wednesday, Thursday">
        {DAYS.map((day, index) => (
          <span
            key={index}
            aria-hidden
            className={
              ACTIVE_DAYS.has(index)
                ? "grid aspect-square place-items-center rounded-sm bg-primary text-xs text-primary-foreground"
                : "grid aspect-square place-items-center rounded-sm border border-border text-xs text-muted-foreground"
            }
          >
            {day}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm font-medium">7:00 – 9:00 AM</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Tuesday to Thursday · repeats weekly until the exam
      </p>
    </Frame>
  );
}

function PlacePreview() {
  return (
    <Frame>
      <svg
        viewBox="0 0 240 120"
        role="img"
        aria-label="Two people in different neighborhoods and a workspace between them"
        className="w-full text-foreground"
      >
        <path
          d="M28 92 L124 58 L212 30"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeDasharray="3 4"
        />
        <circle cx="28" cy="92" r="4" fill="currentColor" />
        <circle cx="212" cy="30" r="4" fill="currentColor" />
        <rect x="118" y="52" width="12" height="12" fill="var(--primary)" />
        <text x="38" y="96" fontSize="9" fill="currentColor">
          You · Park Slope
        </text>
        <text x="112" y="46" fontSize="9" fill="currentColor" textAnchor="middle">
          Tier 3 · Downtown Brooklyn
        </text>
        <text x="204" y="24" fontSize="9" fill="currentColor" textAnchor="end">
          Priya · Fort Greene
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        12 minutes for you, 9 for her. Operator named when you sit down.
      </p>
    </Frame>
  );
}
