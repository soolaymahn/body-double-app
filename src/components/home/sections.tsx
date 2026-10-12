import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container, Eyebrow, Heading, SectionHead } from "@/components/home/primitives";

const HOURS = [
  "Bar",
  "CIPP",
  "MCAT",
  "GMAT",
  "Boards",
  "Thesis",
  "Research",
  "A project you keep putting off",
];

export function TheMoment() {
  return (
    <section className="border-t border-border">
      <Container className="py-20 sm:py-28">
        <SectionHead number="02" label="The moment" />
        <div className="mt-6 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Heading>Some things still take hundreds of hours.</Heading>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
              Most work now arrives in pieces: a meeting, a message, a task, a
              draft a model wrote for you. A few things don’t. They still ask
              for long stretches of concentration, repeated for weeks or months,
              usually alone. That is the moment Beside is built for.
            </p>
          </div>
          <ul className="grid border-t border-foreground/25 sm:grid-cols-2 sm:gap-x-8 lg:col-span-7 lg:col-start-6">
            {HOURS.map((item, index) => (
              <li
                key={item}
                className={
                  index === HOURS.length - 1
                    ? "font-heading border-b border-border py-4 text-3xl tracking-tight uppercase sm:col-span-2 sm:py-5 sm:text-4xl"
                    : "font-heading border-b border-border py-4 text-3xl tracking-tight uppercase sm:py-5 sm:text-4xl"
                }
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

const DETAILS: { q: string; options: string[]; picked: number }[] = [
  { q: "Coffee breaks?", options: ["Together", "Separate", "No preference"], picked: 1 },
  { q: "Lunch?", options: ["Together", "Quiet", "Leave the workspace"], picked: 1 },
  { q: "Talking while working?", options: ["Silent", "Occasionally", "Collaborative"], picked: 0 },
  { q: "Phone use?", options: ["Fine", "Breaks only", "Away"], picked: 2 },
  { q: "Punctuality?", options: ["Flexible", "On time", "Strict"], picked: 1 },
  { q: "Cancellations?", options: ["Flexible", "Notice preferred", "Strict"], picked: 1 },
  { q: "Session length?", options: ["2 hours", "Half day", "Full day"], picked: 1 },
  { q: "Schedule?", options: ["Morning", "Afternoon", "Evening"], picked: 0 },
];

export function TheDetails() {
  return (
    <section className="border-t border-border">
      <Container className="py-20 sm:py-28">
        <SectionHead number="03" label="The questionnaire" />
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <Heading className="lg:col-span-6">The small things matter.</Heading>
          <p className="max-w-md text-base leading-7 text-muted-foreground lg:col-span-5 lg:col-start-8 lg:self-end">
            Two people can be sitting for the same exam and be wrong for each
            other. We ask about the habits that decide whether a table works
            for months, not just the first morning.
          </p>
        </div>

        <dl className="mt-14 grid border-t border-foreground/25 md:grid-cols-2 md:gap-x-12">
          {DETAILS.map((detail) => (
            <div
              key={detail.q}
              className="grid gap-2 border-b border-border py-5 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-6"
            >
              <dt className="text-sm font-medium">{detail.q}</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {detail.options.map((option, index) => {
                    const picked = index === detail.picked;
                    return (
                      <li
                        key={option}
                        className={
                          picked
                            ? "flex items-center gap-2 text-foreground"
                            : "flex items-center gap-2 text-muted-foreground"
                        }
                      >
                        <span
                          aria-hidden
                          className={
                            picked
                              ? "grid size-3.5 place-items-center rounded-full border border-primary"
                              : "grid size-3.5 place-items-center rounded-full border border-foreground/30"
                          }
                        >
                          {picked ? <span className="size-1.5 rounded-full bg-primary" /> : null}
                        </span>
                        {option}
                        {picked ? <span className="sr-only">(selected)</span> : null}
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Eight of the questions. About two minutes to answer.</p>
          <Link href="/onboard" className="text-foreground underline-offset-4 hover:underline">
            Answer them →
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function AcrossTheTable() {
  return (
    <section className="bg-primary text-primary-foreground">
      <Container className="py-24 sm:py-32">
        <Eyebrow className="text-primary-foreground/70">Accountability without obligation</Eyebrow>
        <h2 className="font-heading mt-6 max-w-3xl text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          You don’t have to motivate each other. You just have to show up.
        </h2>
        <div className="mt-14 grid max-w-4xl gap-8 text-base leading-7 text-primary-foreground/85 md:grid-cols-3">
          <p>Some matches talk on the walk to the subway. Some barely say hello. Some become friends.</p>
          <p>
            None of that is the point. The point is that two people agreed to be
            at the same table at nine, and both of them came.
          </p>
          <p>
            No check-ins, no pep talks. The other chair is occupied, and that
            turns out to be enough.
          </p>
        </div>
      </Container>
    </section>
  );
}

const ROOMS = [
  {
    label: "Bar exam",
    lines: [
      "Three months.",
      "Six days a week.",
      "Long sessions.",
      "Quiet.",
      "Somewhere to leave books.",
      "The same desk every day.",
    ],
  },
  {
    label: "Before-work GMAT",
    lines: [
      "7–9 AM.",
      "Three mornings a week.",
      "Near both commutes.",
      "Easy subway access.",
      "Low commitment.",
    ],
  },
  {
    label: "Flexible professional",
    lines: [
      "Different neighborhoods.",
      "Variable schedule.",
      "More than one location.",
      "Short booking windows.",
    ],
  },
];

export function PlaceMatters() {
  return (
    <section>
      <Container className="py-20 sm:py-28">
        <SectionHead number="04" label="Place" />
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <Heading className="lg:col-span-6">The room is part of the match.</Heading>
          <p className="max-w-md text-base leading-7 text-muted-foreground lg:col-span-5 lg:col-start-8 lg:self-end">
            A desk that suits a three-month bar push is the wrong desk for two
            hours before work. We choose the space after the person and the
            schedule, because it depends on both.
          </p>
        </div>
        <div className="mt-14 grid gap-12 border-t border-foreground/25 pt-8 sm:grid-cols-3 sm:gap-8">
          {ROOMS.map((room) => (
            <article key={room.label}>
              <Eyebrow className="text-foreground">{room.label}</Eyebrow>
              <ul className="font-heading mt-4 grid gap-1 text-xl leading-snug lg:text-2xl">
                {room.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

const CRITERIA = [
  "Quiet level",
  "Opening hours",
  "Location",
  "Transit",
  "Desk quality",
  "Leaving materials",
  "Food and coffee",
  "Private rooms",
  "Flexibility",
  "Cost",
  "Long-session suitability",
];

export function Spaces() {
  return (
    <section className="border-t border-border">
      <Container className="py-20 sm:py-28">
        <SectionHead number="05" label="Spaces" />
        <div className="mt-6 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Heading>Chosen for the routine, not pulled from a list.</Heading>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
              New York is full of day-rate desks: the large operators,
              independent coworking spaces, dedicated quiet rooms. We group
              them into four tiers by price, location, and amenities, then
              recommend one that both of you can reach and both of you can work
              in. The operator is named when you sit down together.
            </p>
            <Button
              variant="outline"
              className="mt-8 h-10 px-4 text-sm"
              render={<Link href="/venues" />}
            >
              See the spaces
            </Button>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>What we weigh</Eyebrow>
            <ol className="mt-4 grid border-t border-foreground/25 sm:grid-cols-2 sm:gap-x-8">
              {CRITERIA.map((item, index) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 border-b border-border py-3 text-sm"
                >
                  <span className="w-5 text-xs text-muted-foreground tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

const SCENARIOS = [
  {
    title: "Three months until the Bar",
    lines: ["Six days per week.", "Silent mornings.", "Strict punctuality.", "Needs somewhere to keep books."],
  },
  {
    title: "GMAT before work",
    lines: ["Tuesday, Wednesday, Thursday.", "7–9 AM.", "Same subway corridor.", "Coffee during the first break."],
  },
  {
    title: "Medical boards",
    lines: ["Long Saturday and Sunday sessions.", "Lunch together.", "Phones away while working."],
  },
  {
    title: "The project no one makes you finish",
    lines: [
      "A professional working independently.",
      "Three evenings a week.",
      "Doesn’t need someone in the same field.",
      "Just someone else who is also showing up.",
    ],
  },
];

export function Scenarios() {
  return (
    <section className="border-t border-border">
      <Container className="py-20 sm:py-28">
        <SectionHead number="06" label="Who it’s for" />
        <div className="mt-10 grid gap-12 border-t border-foreground/25 pt-8 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
          {SCENARIOS.map((scenario) => (
            <article key={scenario.title}>
              <Eyebrow className="text-foreground">{scenario.title}</Eyebrow>
              <ul className="font-heading mt-4 grid gap-1 text-xl leading-snug">
                {scenario.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

const BEYOND = [
  "Writing",
  "Research",
  "A thesis",
  "Certifications",
  "Independent projects",
  "Difficult professional work",
];

export function BeyondExams() {
  return (
    <section id="for-professionals" className="scroll-mt-24 border-t border-border">
      <Container className="py-20 sm:py-28">
        <SectionHead number="07" label="For professionals" />
        <Heading className="mt-6 max-w-3xl">Not everything you need to focus on is an exam.</Heading>
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="max-w-md text-base leading-7 text-muted-foreground">
              The structure doesn’t care what is on the table. A thesis
              chapter. A certification you are taking at thirty-five while
              working full time. A manuscript. A piece of research. A product
              only you are responsible for finishing. If it needs the same
              hours every week, and you keep not giving it those hours, the
              arrangement works the same way.
            </p>
            <p className="mt-6 max-w-md text-base leading-7">
              You don’t need a partner in the same field. You need one who
              keeps the same hours.
            </p>
          </div>
          <ul className="border-t border-foreground/25 lg:col-span-6 lg:col-start-7">
            {BEYOND.map((item) => (
              <li
                key={item}
                className="font-heading border-b border-border py-4 text-2xl tracking-tight sm:text-3xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

const RETREAT_PARTS = [
  "Somewhere to stay",
  "Somewhere to work",
  "A routine",
  "Other people doing focused work",
  "Optional social time",
];

export function Retreats() {
  return (
    <section className="border-t border-border">
      <Container className="py-16 sm:py-20">
        <SectionHead number="08" label="Later" />
        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 className="font-heading text-3xl leading-[1.08] tracking-tight sm:text-4xl">
              Sometimes focus needs a different city.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
              We are exploring several-week stays built around the same three
              parts, in places that are good for long stays and easier on the
              budget than New York: Colombia, Guatemala, Mexico, Portugal.
              Nothing to book yet.
            </p>
            <Link
              href="/retreats"
              className="mt-6 inline-block text-sm underline-offset-4 hover:underline"
            >
              About retreats →
            </Link>
          </div>
          <ul className="border-t border-foreground/25 text-sm lg:col-span-5 lg:col-start-8 lg:self-end">
            {RETREAT_PARTS.map((item) => (
              <li key={item} className="border-b border-border py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="border-t border-border">
      <Container className="py-24 sm:py-32">
        <Eyebrow>Person · Time · Place</Eyebrow>
        <h2 className="font-heading mt-6 max-w-3xl text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          Find someone who’s showing up too.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          Tell us what you’re working toward and how you work. We’ll find the
          person, schedule, and place.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button className="h-11 px-5 text-sm" render={<Link href="/onboard" />}>
            Find your match
          </Button>
          <p className="text-sm text-muted-foreground">New York first. In person only.</p>
        </div>
      </Container>
    </section>
  );
}
