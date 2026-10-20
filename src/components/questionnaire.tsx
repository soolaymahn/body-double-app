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
import { NeighborhoodField } from "@/components/neighborhood-field";
import { formatWindow } from "@/domain/matching";
import { type NeighborhoodChoice } from "@/domain/neighborhoods";
import {
  AC01_OPTIONS,
  AC02_OPTIONS,
  AC03_OPTIONS,
  AC04_OPTIONS,
  AC05_OPTIONS,
  applyV3ToLegacyProfile,
  BR01_OPTIONS,
  BR02_OPTIONS,
  BR03_OPTIONS,
  BR04_OPTIONS,
  CA01_OPTIONS,
  CA02_OPTIONS,
  CA03_OPTIONS,
  CA04_OPTIONS,
  CA05_OPTIONS,
  CA06_OPTIONS,
  CA07_OPTIONS,
  CA08_OPTIONS,
  emptyMatchingQuestionnaireV3,
  FD01_OPTIONS,
  FD02_OPTIONS,
  FD03_OPTIONS,
  FD04_OPTIONS,
  FD05_OPTIONS,
  HL01_OPTIONS,
  HL02_OPTIONS,
  HL03_OPTIONS,
  HL04_OPTIONS,
  HP01_OPTIONS,
  HP02_OPTIONS,
  HP03_OPTIONS,
  HP04_OPTIONS,
  IP01_OPTIONS,
  IP02_TIER_LABELS,
  MD01_OPTIONS,
  MP01_OPTIONS,
  MP02_OPTIONS,
  MP03_OPTIONS,
  MP04_OPTIONS,
  MP05_OPTIONS,
  ON02_OPTIONS,
  ON03_OPTIONS,
  ON04_OPTIONS,
  QUESTIONNAIRE_STEPS,
  SC01_HOURS,
  SC02_DAYS,
  SC03_WEEKDAY_LABELS,
  SP01_OPTIONS,
  type MatchingQuestionnaireV3,
  onlineStudyDaysPerWeek,
  sc03WeekdayOptions,
  showAc04,
  showAc05,
  showFoodLunchAtDesk,
  showHp04,
  showInPersonCancellation,
  showIp02,
  showOnFollowUps,
  showOnlineAccountability,
  validateQuestionnaireStep,
  isInPersonMode,
  isOnlineMode,
  lunchBranch,
} from "@/domain/questionnaire-v3";
import { SAMPLE_PROFILE } from "@/domain/students";
import type { StudyProfile } from "@/domain/types";

type Draft = StudyProfile;

const emptyDraft = (): Draft =>
  applyV3ToLegacyProfile({
    id: "you",
    name: "",
    neighborhoodId: "other",
    neighborhoodOther: "",
    bio: "",
    matching: emptyMatchingQuestionnaireV3(),
  });

function mergeInitial(initial?: StudyProfile | null): Draft {
  if (!initial) return emptyDraft();
  if (initial.matching) {
    return applyV3ToLegacyProfile({ ...initial, matching: initial.matching });
  }
  return applyV3ToLegacyProfile({
    ...initial,
    matching: emptyMatchingQuestionnaireV3(),
  });
}

export function Questionnaire({ initial }: { initial?: StudyProfile | null }) {
  const router = useRouter();
  const { setProfile } = useProfile();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(() => mergeInitial(initial));
  const [error, setError] = useState<string | null>(null);

  const q = draft.matching;
  const progress = useMemo(
    () => ((step + 1) / QUESTIONNAIRE_STEPS.length) * 100,
    [step],
  );

  function setMatching(patch: Partial<MatchingQuestionnaireV3>) {
    setDraft((current) => {
      const matching = { ...current.matching, ...patch };
      return applyV3ToLegacyProfile({ ...current, matching });
    });
    setError(null);
  }

  function updateBase<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => applyV3ToLegacyProfile({ ...current, [key]: value }));
    setError(null);
  }

  function setNeighborhood(choice: NeighborhoodChoice) {
    setDraft((current) =>
      applyV3ToLegacyProfile({
        ...current,
        neighborhoodId: choice.neighborhoodId,
        neighborhoodOther:
          choice.neighborhoodId === "other" ? (choice.neighborhoodOther ?? "") : undefined,
      }),
    );
    setError(null);
  }

  function toggleMulti(
    key: keyof Pick<
      MatchingQuestionnaireV3,
      "sc03" | "md03" | "md04" | "ip02" | "ac01" | "ac04" | "ca03" | "ca06"
    >,
    option: string,
  ) {
    const current = q[key] as string[];
    const exclusive = option === "Varies" || option === "Flexible";
    let next: string[];
    if (exclusive) {
      next = current.includes(option) ? [] : [option];
    } else {
      const withoutFlexible = current.filter(
        (item) => item !== "Varies" && item !== "Flexible",
      );
      next = withoutFlexible.includes(option)
        ? withoutFlexible.filter((item) => item !== option)
        : [...withoutFlexible, option];
    }
    setMatching({ [key]: next } as Partial<MatchingQuestionnaireV3>);
  }

  function next() {
    const problem = validateQuestionnaireStep(
      step,
      q,
      draft.name,
      draft.neighborhoodId,
      draft.neighborhoodOther,
    );
    if (problem) {
      setError(problem);
      return;
    }
    if (step < QUESTIONNAIRE_STEPS.length - 1) {
      setStep((current) => current + 1);
      return;
    }
    const finalized = applyV3ToLegacyProfile({
      ...draft,
      id: "you",
      name: draft.name.trim(),
      bio: draft.bio.trim(),
      neighborhoodOther:
        draft.neighborhoodId === "other"
          ? (draft.neighborhoodOther ?? "").trim()
          : undefined,
      matching: q,
    });
    setProfile(finalized);
    router.push("/matches");
  }

  const onlineDays = onlineStudyDaysPerWeek(q);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Get matched {step + 1} / {QUESTIONNAIRE_STEPS.length}
        </p>
        <h1 className="font-heading mt-2 text-3xl tracking-tight sm:text-4xl">
          {QUESTIONNAIRE_STEPS[step]}
        </h1>
        <Progress value={progress} className="mt-4" />
      </div>

      {step === 0 ? (
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">What should we call you?</Label>
            <Input
              id="name"
              value={draft.name}
              onChange={(event) => updateBase("name", event.target.value)}
              placeholder="Alex Chen"
              className="h-11 text-base"
            />
          </div>
          <QuestionSingle
            label="What are you studying for?"
            options={SP01_OPTIONS}
            value={q.sp01}
            onChange={(value) => setMatching({ sp01: value as typeof q.sp01 })}
          />
          <div className="grid gap-2">
            <Label htmlFor="sp02">
              Which specific exam, course, or qualification are you preparing for?
            </Label>
            <Input
              id="sp02"
              value={q.sp02}
              onChange={(event) => setMatching({ sp02: event.target.value })}
              placeholder="NY Bar Exam, CIPP, etc."
              className="h-11 text-base"
            />
          </div>
          <fieldset className="grid gap-3">
            <legend className="text-sm font-medium">
              When is your exam or deadline?
            </legend>
            <OptionCard
              selected={q.sp03?.kind === "not-scheduled"}
              title="Not scheduled yet"
              onClick={() => setMatching({ sp03: { kind: "not-scheduled" } })}
            />
            <label className="grid gap-2 text-sm">
              <span className="text-muted-foreground">Calendar date</span>
              <Input
                type="date"
                value={q.sp03?.kind === "date" ? q.sp03.date : ""}
                onChange={(event) =>
                  setMatching({
                    sp03: event.target.value
                      ? { kind: "date", date: event.target.value }
                      : null,
                  })
                }
                className="h-11"
              />
            </label>
          </fieldset>
          <div className="grid gap-2">
            <Label htmlFor="bio">One line about how you study (optional)</Label>
            <Textarea
              id="bio"
              value={draft.bio}
              onChange={(event) => updateBase("bio", event.target.value)}
              placeholder="July NY bar. I work faster when someone else is also grinding."
            />
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-3">
          <p className="text-sm text-muted-foreground">
            Matching starts with proximity. We are NYC-only for now — type the
            neighborhood you actually leave from.
          </p>
          <NeighborhoodField
            neighborhoodId={draft.neighborhoodId}
            neighborhoodOther={draft.neighborhoodOther}
            onChange={setNeighborhood}
          />
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-6">
          <NumberSelectQuestion
            label="How many hours do you plan to study per day?"
            values={SC01_HOURS}
            format={(n) => `${n} hour${n === 1 ? "" : "s"}`}
            value={q.sc01}
            onChange={(value) => setMatching({ sc01: value as typeof q.sc01 })}
          />
          <NumberSelectQuestion
            label="How many days per week do you plan to study?"
            values={SC02_DAYS}
            format={(n) => `${n} day${n === 1 ? "" : "s"}`}
            value={q.sc02}
            onChange={(value) => setMatching({ sc02: value as typeof q.sc02 })}
          />
          <QuestionMulti
            label="Which days of the week do you usually study?"
            options={SC03_WEEKDAY_LABELS}
            selected={q.sc03}
            onToggle={(option) => toggleMulti("sc03", option)}
          />
          <fieldset className="grid gap-3">
            <legend className="text-sm font-medium">
              When do you usually prefer to start studying?
            </legend>
            <OptionCard
              selected={q.sc04?.kind === "flexible"}
              title="Flexible"
              onClick={() => setMatching({ sc04: { kind: "flexible" } })}
            />
            <HourSelect
              label="Time of day"
              value={q.sc04?.kind === "time" ? q.sc04.hour : 9}
              onChange={(hour) => setMatching({ sc04: { kind: "time", hour } })}
            />
            {q.sc04?.kind === "time" ? (
              <p className="text-sm text-muted-foreground">
                Typical block:{" "}
                {formatWindow(q.sc04.hour, Math.min(22, q.sc04.hour + (q.sc01 ?? 8)))}
              </p>
            ) : null}
          </fieldset>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="grid gap-6">
          <QuestionSingle
            label="Do you usually take a lunch break during your study day?"
            options={BR01_OPTIONS}
            value={q.br01}
            onChange={(value) =>
              setMatching({
                br01: value as typeof q.br01,
                ...(value === "No"
                  ? { br02: null, br03: null, br04: null }
                  : {}),
              })
            }
          />
          {lunchBranch(q.br01) ? (
            <>
              <QuestionSingle
                label="When do you prefer to take your lunch break?"
                options={BR02_OPTIONS}
                value={q.br02}
                onChange={(value) => setMatching({ br02: value })}
              />
              <QuestionSingle
                label="What is your preferred lunch break length?"
                options={BR03_OPTIONS}
                value={q.br03}
                onChange={(value) => setMatching({ br03: value })}
              />
              <QuestionSingle
                label="How do you prefer to spend your lunch break?"
                options={BR04_OPTIONS}
                value={q.br04}
                onChange={(value) => setMatching({ br04: value })}
              />
            </>
          ) : null}
        </div>
      ) : null}

      {step === 4 ? (
        <div className="grid gap-6">
          <QuestionSingle
            label="How would you prefer to study with a partner?"
            options={MD01_OPTIONS}
            value={q.md01}
            onChange={(value) =>
              setMatching({
                md01: value as typeof q.md01,
                md02: value === "Hybrid (in person and online)" ? q.md02 : null,
              })
            }
          />
          {q.md01 === "Hybrid (in person and online)" && q.sc02 ? (
            <>
              <NumberSelectQuestion
                label="How many of your study days per week would you like to meet in person?"
                values={Array.from({ length: q.sc02 }, (_, i) => i + 1)}
                format={(n) => `${n} day${n === 1 ? "" : "s"}`}
                value={q.md02}
                onChange={(value) => setMatching({ md02: value })}
              />
              <p className="text-sm text-muted-foreground">
                Online study days per week: {onlineDays} (SC02 − in-person days)
              </p>
            </>
          ) : null}
          {isInPersonMode(q.md01) ? (
            <QuestionMulti
              label="Which days would you prefer to meet in person?"
              options={sc03WeekdayOptions(q)}
              selected={q.md03}
              onToggle={(option) => toggleMulti("md03", option)}
            />
          ) : null}
          {isOnlineMode(q.md01) ? (
            <QuestionMulti
              label="Which days would you prefer to study online?"
              options={sc03WeekdayOptions(q)}
              selected={q.md04}
              onToggle={(option) => toggleMulti("md04", option)}
            />
          ) : null}
          {showOnlineAccountability(q) ? (
            <>
              <NumberSelectQuestion
                label="On how many of your online study days would you like to be on a video call with your study partner?"
                values={Array.from({ length: onlineDays + 1 }, (_, i) => i)}
                format={(n) => `${n} day${n === 1 ? "" : "s"}`}
                value={q.on01}
                onChange={(value) =>
                  setMatching({
                    on01: value,
                    ...(value === 0 ? { on02: null, on03: null, on04: null } : {}),
                  })
                }
              />
              {showOnFollowUps(q) ? (
                <>
                  <QuestionSingle
                    label="During shared online study sessions, do you prefer your camera on or off?"
                    options={ON02_OPTIONS}
                    value={q.on02}
                    onChange={(value) => setMatching({ on02: value })}
                  />
                  <QuestionSingle
                    label="During shared online study sessions, how do you prefer to use your microphone?"
                    options={ON03_OPTIONS}
                    value={q.on03}
                    onChange={(value) => setMatching({ on03: value })}
                  />
                  <QuestionSingle
                    label="How much interaction would you like during online study sessions?"
                    options={ON04_OPTIONS}
                    value={q.on04}
                    onChange={(value) => setMatching({ on04: value })}
                  />
                </>
              ) : null}
            </>
          ) : null}
        </div>
      ) : null}

      {step === 5 ? (
        <div className="grid gap-6">
          {isInPersonMode(q.md01) ? (
            <>
              <QuestionSingle
                label="Where would you prefer to meet your study partner?"
                options={IP01_OPTIONS}
                value={q.ip01}
                onChange={(value) =>
                  setMatching({
                    ip01: value as typeof q.ip01,
                    ...(value === "A study space we choose ourselves"
                      ? { ip02: [] }
                      : {}),
                  })
                }
              />
              {showIp02(q) ? (
                <QuestionMulti
                  label="Which Beside study-space tier(s) would you consider?"
                  options={IP02_TIER_LABELS}
                  selected={q.ip02}
                  onToggle={(option) => toggleMulti("ip02", option)}
                />
              ) : null}
            </>
          ) : null}
          <QuestionSingle
            label="Are you comfortable with your study partner eating snacks while you study together?"
            options={FD01_OPTIONS}
            value={q.fd01}
            onChange={(value) => setMatching({ fd01: value })}
          />
          <QuestionSingle
            label="Do you plan to eat snacks at the study table while studying?"
            options={FD02_OPTIONS}
            value={q.fd02}
            onChange={(value) => setMatching({ fd02: value })}
          />
          {showFoodLunchAtDesk(q) ? (
            <>
              <QuestionSingle
                label="Where do you prefer to eat lunch on an in-person study day?"
                options={FD03_OPTIONS}
                value={q.fd03}
                onChange={(value) => setMatching({ fd03: value })}
              />
              <QuestionSingle
                label="Are you comfortable if your study partner eats lunch at the study table?"
                options={FD04_OPTIONS}
                value={q.fd04}
                onChange={(value) => setMatching({ fd04: value })}
              />
            </>
          ) : null}
          <QuestionSingle
            label="How much do eating sounds, such as chewing, affect your concentration?"
            options={FD05_OPTIONS}
            value={q.fd05}
            onChange={(value) => setMatching({ fd05: value })}
            optional
          />
        </div>
      ) : null}

      {step === 6 ? (
        <div className="grid gap-6">
          <QuestionSingle
            label="Do you like to wear headphones while studying alongside someone?"
            options={HP01_OPTIONS}
            value={q.hp01}
            onChange={(value) => setMatching({ hp01: value })}
          />
          <QuestionSingle
            label="Are you comfortable with your study partner wearing headphones while you study together?"
            options={HP02_OPTIONS}
            value={q.hp02}
            onChange={(value) => setMatching({ hp02: value })}
          />
          <QuestionSingle
            label="How much sound leaking from someone else's headphones is acceptable?"
            options={HP03_OPTIONS}
            value={q.hp03}
            onChange={(value) => setMatching({ hp03: value })}
          />
          {showHp04(q) ? (
            <QuestionSingle
              label="When you listen to audio through headphones, can other people usually hear it?"
              options={HP04_OPTIONS}
              value={q.hp04}
              onChange={(value) => setMatching({ hp04: value })}
              optional
            />
          ) : null}
          {isInPersonMode(q.md01) ? (
            <>
              <QuestionSingle
                label="If you have cold symptoms, what would you normally do about an in-person study session?"
                options={HL01_OPTIONS}
                value={q.hl01}
                onChange={(value) => setMatching({ hl01: value })}
              />
              <QuestionSingle
                label="Are you comfortable studying in person with someone who has cold symptoms?"
                options={HL02_OPTIONS}
                value={q.hl02}
                onChange={(value) => setMatching({ hl02: value })}
              />
              <QuestionSingle
                label="What is your preference about face masks during in-person study sessions?"
                options={HL03_OPTIONS}
                value={q.hl03}
                onChange={(value) => setMatching({ hl03: value })}
                optional
              />
              <QuestionSingle
                label="Are you comfortable if your study partner chooses to wear a face mask?"
                options={HL04_OPTIONS}
                value={q.hl04}
                onChange={(value) => setMatching({ hl04: value })}
                optional
              />
            </>
          ) : null}
        </div>
      ) : null}

      {step === 7 ? (
        <div className="grid gap-6">
          <QuestionMulti
            label="Do you have any accessibility requirements or study accommodations we should consider when suggesting a partner or study space?"
            options={AC01_OPTIONS}
            selected={q.ac01}
            onToggle={(option) => toggleMulti("ac01", option)}
            optional
          />
          {q.ac01.includes("Other (optional free text)") ? (
            <div className="grid gap-2">
              <Label htmlFor="ac01-other">Other details (optional)</Label>
              <Textarea
                id="ac01-other"
                value={q.ac01OtherDetail}
                onChange={(event) =>
                  setMatching({ ac01OtherDetail: event.target.value })
                }
              />
            </div>
          ) : null}
          {isInPersonMode(q.md01) ? (
            <QuestionSingle
              label="Will you be accompanied by a service animal at in-person study sessions?"
              options={AC02_OPTIONS}
              value={q.ac02}
              onChange={(value) => setMatching({ ac02: value })}
              optional
            />
          ) : null}
          <QuestionSingle
            label="Would you like to be matched with someone who has similar experiences with health conditions, disability, or accessibility needs?"
            options={AC03_OPTIONS}
            value={q.ac03}
            onChange={(value) =>
              setMatching({
                ac03: value,
                ...(value !== "Yes, if they also opt in"
                  ? { ac04: [], ac05: null, ac04OtherDetail: "" }
                  : {}),
              })
            }
            optional
          />
          {showAc04(q) ? (
            <>
              <QuestionMulti
                label="If you opted in, which shared experiences would you be comfortable using for matching?"
                options={AC04_OPTIONS}
                selected={q.ac04}
                onToggle={(option) => toggleMulti("ac04", option)}
                optional
              />
              {q.ac04.includes("Other (optional)") ? (
                <div className="grid gap-2">
                  <Label htmlFor="ac04-other">Other (optional)</Label>
                  <Input
                    id="ac04-other"
                    value={q.ac04OtherDetail}
                    onChange={(event) =>
                      setMatching({ ac04OtherDetail: event.target.value })
                    }
                    className="h-11"
                  />
                </div>
              ) : null}
            </>
          ) : null}
          {showAc05(q) ? (
            <QuestionSingle
              label="Would you like to disclose these shared-experience tags to a potential study partner?"
              options={AC05_OPTIONS}
              value={q.ac05}
              onChange={(value) => setMatching({ ac05: value })}
              optional
            />
          ) : null}
        </div>
      ) : null}

      {step === 8 ? (
        <div className="grid gap-6">
          <QuestionSingle
            label="Would you prefer a study partner in the same field or studying for the same exam?"
            options={MP01_OPTIONS}
            value={q.mp01}
            onChange={(value) => setMatching({ mp01: value })}
          />
          <QuestionSingle
            label="What age range would you prefer in a study partner?"
            options={MP02_OPTIONS}
            value={q.mp02}
            onChange={(value) => setMatching({ mp02: value })}
            optional
          />
          <QuestionSingle
            label="How structured is your own study routine?"
            options={MP03_OPTIONS}
            value={q.mp03}
            onChange={(value) => setMatching({ mp03: value })}
          />
          <QuestionSingle
            label="What kind of study routine would you prefer your partner to have?"
            options={MP04_OPTIONS}
            value={q.mp04}
            onChange={(value) => setMatching({ mp04: value })}
          />
          <QuestionSingle
            label="What kind of accountability dynamic motivates you most?"
            options={MP05_OPTIONS}
            value={q.mp05}
            onChange={(value) => setMatching({ mp05: value })}
            optional
          />
          {showInPersonCancellation(q) ? (
            <QuestionSingle
              label="How much advance notice do you expect if your study partner needs to cancel an in-person session?"
              options={CA01_OPTIONS}
              value={q.ca01}
              onChange={(value) => setMatching({ ca01: value })}
            />
          ) : null}
          <QuestionSingle
            label="How flexible are you when your study partner needs to cancel or reschedule?"
            options={CA02_OPTIONS}
            value={q.ca02}
            onChange={(value) => setMatching({ ca02: value })}
          />
          {showInPersonCancellation(q) ? (
            <>
              <QuestionMulti
                label="Which reasons would you consider acceptable for a last-minute change to an in-person session?"
                options={CA03_OPTIONS}
                selected={q.ca03}
                onToggle={(option) => toggleMulti("ca03", option)}
                optional
              />
              <QuestionSingle
                label="If your study partner is sick or needs to study from home, what would you prefer they do?"
                options={CA04_OPTIONS}
                value={q.ca04}
                onChange={(value) => setMatching({ ca04: value })}
              />
              <QuestionSingle
                label="When an in-person session switches to remote, should joining a live call be required?"
                options={CA05_OPTIONS}
                value={q.ca05}
                onChange={(value) => setMatching({ ca05: value })}
              />
              <QuestionMulti
                label="If you personally cannot attend in person, what are you usually comfortable offering instead?"
                options={CA06_OPTIONS}
                selected={q.ca06}
                onToggle={(option) => toggleMulti("ca06", option)}
              />
            </>
          ) : null}
          <QuestionSingle
            label="How would you prefer your study partner to communicate a cancellation or change of plans?"
            options={CA07_OPTIONS}
            value={q.ca07}
            onChange={(value) => setMatching({ ca07: value })}
            optional
          />
          <QuestionSingle
            label="When a session is canceled, do you want to reschedule it?"
            options={CA08_OPTIONS}
            value={q.ca08}
            onChange={(value) => setMatching({ ca08: value })}
            optional
          />
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
          {step === QUESTIONNAIRE_STEPS.length - 1 ? "See your matches" : "Continue"}
        </Button>
      </div>
    </div>
  );
}

function QuestionSingle({
  label,
  options,
  value,
  onChange,
  optional,
}: {
  label: string;
  options: readonly string[];
  value: string | null;
  onChange: (value: string) => void;
  optional?: boolean;
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-medium">
        {label}
        {optional ? (
          <span className="text-muted-foreground font-normal"> (optional)</span>
        ) : null}
      </legend>
      {options.map((option) => (
        <OptionCard
          key={option}
          selected={value === option}
          title={option}
          onClick={() => onChange(option)}
        />
      ))}
    </fieldset>
  );
}

function QuestionMulti({
  label,
  options,
  selected,
  onToggle,
  optional,
}: {
  label: string;
  options: readonly string[];
  selected: string[];
  onToggle: (option: string) => void;
  optional?: boolean;
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-medium">
        {label}
        {optional ? (
          <span className="text-muted-foreground font-normal"> (optional)</span>
        ) : null}
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <OptionCard
            key={option}
            selected={selected.includes(option)}
            title={option}
            onClick={() => onToggle(option)}
          />
        ))}
      </div>
    </fieldset>
  );
}

function NumberSelectQuestion({
  label,
  values,
  format,
  value,
  onChange,
}: {
  label: string;
  values: readonly number[];
  format: (n: number) => string;
  value: number | null;
  onChange: (value: number) => void;
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {values.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`h-10 rounded-full border px-4 text-sm ${
              value === n
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card"
            }`}
          >
            {format(n)}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function HourSelect({
  label,
  value,
  min = 6,
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
