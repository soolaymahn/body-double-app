"use client";

import { legacyProfileToV3 } from "@/domain/questionnaire-v3";
import type { BookedSession, StudyProfile, VenueTier } from "@/domain/types";
import { VENUE_TIERS } from "@/domain/types";

const PROFILE_KEY = "beside.profile";
const SESSIONS_KEY = "beside.sessions";
export const STORAGE_EVENT = "beside-storage";

const BRAND_TO_TIERS: Record<string, VenueTier[]> = {
  convene: [1],
  coalition: [2],
  wework: [3, 4],
};

let profileCache: { raw: string | null; value: StudyProfile | null } | null = null;
let sessionsCache: { raw: string | null; value: BookedSession[] } | null = null;
const EMPTY_SESSIONS: BookedSession[] = [];

function isVenueTier(value: unknown): value is VenueTier {
  return typeof value === "number" && (VENUE_TIERS as readonly number[]).includes(value);
}

function migrateProfile(value: unknown): StudyProfile | null {
  if (!value || typeof value !== "object") return null;
  const record = value as StudyProfile & { venueBrandIds?: string[] };
  let venueTiers = Array.isArray(record.venueTiers)
    ? record.venueTiers.filter(isVenueTier)
    : [];
  if (venueTiers.length === 0 && Array.isArray(record.venueBrandIds)) {
    venueTiers = [
      ...new Set(record.venueBrandIds.flatMap((brand) => BRAND_TO_TIERS[brand] ?? [])),
    ].sort();
  }
  if (venueTiers.length === 0) return null;
  const rest = { ...record };
  delete rest.venueBrandIds;
  const migrated = { ...rest, venueTiers } as StudyProfile;
  if (!migrated.matching) {
    migrated.matching = legacyProfileToV3(migrated);
  }
  return migrated;
}

function canUseStorage() {
  return typeof window !== "undefined";
}

function notify() {
  if (!canUseStorage()) return;
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function subscribeToStorage(onChange: () => void) {
  window.addEventListener(STORAGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(STORAGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function getProfileSnapshot(): StudyProfile | null {
  if (!canUseStorage()) return null;
  const raw = window.localStorage.getItem(PROFILE_KEY);
  if (!profileCache || profileCache.raw !== raw) {
    let value: StudyProfile | null = null;
    if (raw) {
      try {
        value = migrateProfile(JSON.parse(raw));
      } catch {
        value = null;
      }
    }
    profileCache = { raw, value };
  }
  return profileCache.value;
}

export function getSessionsSnapshot(): BookedSession[] {
  if (!canUseStorage()) return EMPTY_SESSIONS;
  const raw = window.localStorage.getItem(SESSIONS_KEY);
  if (!sessionsCache || sessionsCache.raw !== raw) {
    let value: BookedSession[] = EMPTY_SESSIONS;
    if (raw) {
      try {
        value = JSON.parse(raw) as BookedSession[];
      } catch {
        value = [];
      }
    }
    sessionsCache = { raw, value };
  }
  return sessionsCache.value;
}

export function getServerProfileSnapshot(): StudyProfile | null {
  return null;
}

export function getServerSessionsSnapshot(): BookedSession[] {
  return EMPTY_SESSIONS;
}

export function saveProfile(profile: StudyProfile) {
  if (!canUseStorage()) return;
  const raw = JSON.stringify(profile);
  window.localStorage.setItem(PROFILE_KEY, raw);
  profileCache = { raw, value: profile };
  notify();
}

export function clearProfile() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(PROFILE_KEY);
  profileCache = { raw: null, value: null };
  notify();
}

export function saveSession(session: BookedSession) {
  if (!canUseStorage()) return;
  const next = [session, ...getSessionsSnapshot().filter((item) => item.id !== session.id)];
  const raw = JSON.stringify(next);
  window.localStorage.setItem(SESSIONS_KEY, raw);
  sessionsCache = { raw, value: next };
  notify();
}

export function clearSessions() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(SESSIONS_KEY);
  sessionsCache = { raw: null, value: [] };
  notify();
}
