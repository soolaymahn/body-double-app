"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { OptionCard } from "@/components/option-card";
import { useProfile } from "@/components/profile-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  BREAK_HELP,
  BREAK_LABELS,
  DAY_LABELS,
  EAT_HELP,
  EAT_LABELS,
  EXAM_LABELS,
  TALK_HELP,
  TALK_LABELS,
  TIER_BLURBS,
  TIER_LABELS,
} from "@/domain/copy";
import { formatWindow } from "@/domain/matching";
import { NEIGHBORHOODS } from "@/domain/neighborhoods";
import { SAMPLE_PROFILE } from "@/domain/students";
import {
  BREAK_PREFERENCES,
  DAYS,
  EAT_PREFERENCES,
  EXAMS,
  TALK_PREFERENCES,
  VENUE_TIERS,
  type Day,
  type StudyProfile,
  type VenueTier,
} from "@/domain/types";

const STEPS = [
  "You",
  "Neighborhood",
  "Schedule",
  "Study spaces",
  "How you study",
] as const;

const emptyDraft = (): StudyProfile => ({
  id: "you",
  name: "",
  exam: "ny-bar",
  neighborhoodId: "chelsea",
  neighborhoodOther: "",
  preferredDays: ["mon", "tue", "wed", "thu"],
  windowStart: 9,
  windowEnd: 17,
  venueTiers: [2],
  eat: "snacks",
  breaks: "hourly",
  talk: "silent",
  bio: "",
});

export function Questionnaire({ initial }: { initial?: StudyProfile | null }) {
  const router = useRouter();
  const { setProfile } = useProfile();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<StudyProfile>(initial ?? emptyDraft());
  const [error, setError] = useState<string | null>(null);

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  function update<K extends keyof StudyProfile>(key: K, value: StudyProfile[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setError(null);
  }

  function toggleDay(day: Day) {
    update(
      "preferredDays",
      draft.preferredDays.includes(day)
        ? draft.preferredDays.filter((item) => item !== day)
        : [...DAYS.filter((item) => draft.preferredDays.includes(item) || item === day)],
    );
  }

  function toggleTier(tier: VenueTier) {
    const next = draft.venueTiers.includes(tier)
      ? draft.venueTiers.filter((item) => item !== tier)
      : [...VENUE_TIERS.filter((item) => draft.venueTiers.includes(item) || item === tier)];
    update("venueTiers", next);
  }

  function validateStep(index: number) {
    if (index === 0 && draft.name.trim().length < 2) {
      return "Add the name your study partner will see.";
    }
    if (
      index === 1 &&
      draft.neighborhoodId === "other" &&
      !(draft.neighborhoodOther ?? "").trim()
    ) {
      return "Name the NYC neighborhood you leave from.";
    }
    if (index === 2 && draft.preferredDays.length === 0) {
      return "Pick at least one day you can sit with someone.";
    }
    if (index === 2 && draft.windowEnd - draft.windowStart < 2) {
      return "Give yourself a window of at least two hours.";
    }
    if (index === 3 && draft.venueTiers.length === 0) {
      return "Pick at least one study-space tier. Operator names stay hidden until you sit down together.";
    }
    return null;
  }

  function next() {
    const problem = validateStep(step);
    if (problem) {
      setError(problem);
      return;
    }
    if (step < STEPS.length - 1) {
      setStep((current) => current + 1);
      return;
    }
    setProfile({
      ...draft,
      id: "you",
      name: draft.name.trim(),
      bio: draft.bio.trim(),
      neighborhoodOther:
        draft.neighborhoodId === "other"
          ? (draft.neighborhoodOther ?? "").trim()
          : undefined,
    });
    router.push("/matches");
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Get matched {step + 1} / {STEPS.length}
        </p>
        <h1 className="font-heading mt-2 text-3xl tracking-tight sm:text-4xl">
          {STEPS[step]}
        </h1>
        <Progress value={progress} className="mt-4" />
      </div>

      {step === 0 ? (
        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="name">What should we call you?</Label>
            <Input
              id="name"
              value={draft.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Alex Chen"
              className="h-11 text-base"
            />
          </div>
          <div className="grid gap-2">
            <Label>What are you studying for?</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {EXAMS.map((exam) => (
                <OptionCard
                  key={exam}
                  selected={draft.exam === exam}
                  title={EXAM_LABELS[exam]}
                  onClick={() => update("exam", exam)}
                />
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">One line about how you study</Label>
            <Textarea
              id="bio"
              value={draft.bio}
              onChange={(event) => update("bio", event.target.value)}
              placeholder="July NY bar. I work faster when someone else is also grinding."
            />
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-3">
          <p className="text-sm text-muted-foreground">
            Matching starts with proximity. We are NYC-only for now — pick the
            neighborhood you actually leave from.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {NEIGHBORHOODS.map((hood) => (
              <OptionCard
                key={hood.id}
                selected={draft.neighborhoodId === hood.id}
                title={hood.name}
                description={hood.borough}
                onClick={() => update("neighborhoodId", hood.id)}
              />
            ))}
          </div>
          {draft.neighborhoodId === "other" ? (
            <div className="grid gap-2">
              <Label htmlFor="neighborhood-other">Neighborhood name</Label>
              <Input
                id="neighborhood-other"
                value={draft.neighborhoodOther ?? ""}
                onChange={(event) =>
                  update("neighborhoodOther", event.target.value)
                }
                placeholder="Greenpoint"
                className="h-11 text-base"
              />
            </div>
          ) : null}
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-6">
          <div>
            <Label>Days you can sit with a partner</Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {DAYS.map((day) => {
                const selected = draft.preferredDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`h-10 min-w-12 rounded-full border px-3 text-sm ${
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card"
                    }`}
                  >
                    {DAY_LABELS[day]}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <Label>Usual window</Label>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatWindow(draft.windowStart, draft.windowEnd)}
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <HourSelect
                label="From"
                value={draft.windowStart}
                max={draft.windowEnd - 2}
                onChange={(value) => update("windowStart", value)}
              />
              <HourSelect
                label="To"
                value={draft.windowEnd}
                min={draft.windowStart + 2}
                onChange={(value) => update("windowEnd", value)}
              />
            </div>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="grid gap-3">
          <p className="text-sm text-muted-foreground">
            Tiers are how we match you to a desk — price, amenities, and
            location — without naming the coworking operator. You only find out
            which space it is when you actually sit down together.
          </p>
          {VENUE_TIERS.map((tier) => (
            <OptionCard
              key={tier}
              selected={draft.venueTiers.includes(tier)}
              title={TIER_LABELS[tier]}
              description={TIER_BLURBS[tier]}
              onClick={() => toggleTier(tier)}
            />
          ))}
        </div>
      ) : null}

      {step === 4 ? (
        <div className="grid gap-8">
          <fieldset className="grid gap-3">
            <legend className="text-sm font-medium">Do you eat while studying?</legend>
            {EAT_PREFERENCES.map((value) => (
              <OptionCard
                key={value}
                selected={draft.eat === value}
                title={EAT_LABELS[value]}
                description={EAT_HELP[value]}
                onClick={() => update("eat", value)}
              />
            ))}
          </fieldset>
          <fieldset className="grid gap-3">
            <legend className="text-sm font-medium">Do you take study breaks?</legend>
            {BREAK_PREFERENCES.map((value) => (
              <OptionCard
                key={value}
                selected={draft.breaks === value}
                title={BREAK_LABELS[value]}
                description={BREAK_HELP[value]}
                onClick={() => update("breaks", value)}
              />
            ))}
          </fieldset>
          <fieldset className="grid gap-3">
            <legend className="text-sm font-medium">Do you like to talk?</legend>
            {TALK_PREFERENCES.map((value) => (
              <OptionCard
                key={value}
                selected={draft.talk === value}
                title={TALK_LABELS[value]}
                description={TALK_HELP[value]}
                onClick={() => update("talk", value)}
              />
            ))}
          </fieldset>
        </div>
      ) : null}

      {error ? (
        <p className="mt-6 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {step > 0 ? (
            <Button variant="outline" onClick={() => setStep((current) => current - 1)}>
              Back
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={() => {
                setProfile(SAMPLE_PROFILE);
                router.push("/matches");
              }}
            >
              Use a sample profile
            </Button>
          )}
        </div>
        <Button className="h-10 px-4" onClick={next}>
          {step === STEPS.length - 1 ? "See your matches" : "Continue"}
        </Button>
      </div>
    </div>
  );
}

function HourSelect({
  label,
  value,
  min = 7,
  max = 22,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}) {
  const hours = Array.from({ length: max - min + 1 }, (_, index) => min + index);
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <select
        className="h-11 rounded-lg border border-input bg-background px-3"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      >
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour === 12
              ? "12pm"
              : hour === 0
                ? "12am"
                : hour > 12
                  ? `${hour - 12}pm`
                  : `${hour}am`}
          </option>
        ))}
      </select>
    </label>
  );
}
