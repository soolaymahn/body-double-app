"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

import type { BookedSession, StudyProfile } from "@/domain/types";
import {
  clearProfile,
  clearSessions,
  getProfileSnapshot,
  getServerProfileSnapshot,
  getServerSessionsSnapshot,
  getSessionsSnapshot,
  saveProfile,
  saveSession,
  subscribeToStorage,
} from "@/lib/storage";

type ProfileContextValue = {
  ready: boolean;
  profile: StudyProfile | null;
  sessions: BookedSession[];
  setProfile: (profile: StudyProfile) => void;
  addSession: (session: BookedSession) => void;
  reset: () => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const ready = useIsClient();
  const profile = useSyncExternalStore(
    subscribeToStorage,
    getProfileSnapshot,
    getServerProfileSnapshot,
  );
  const sessions = useSyncExternalStore(
    subscribeToStorage,
    getSessionsSnapshot,
    getServerSessionsSnapshot,
  );

  const setProfile = useCallback((next: StudyProfile) => {
    saveProfile(next);
  }, []);

  const addSession = useCallback((session: BookedSession) => {
    saveSession(session);
  }, []);

  const reset = useCallback(() => {
    clearProfile();
    clearSessions();
  }, []);

  const value = useMemo(
    () => ({ ready, profile, sessions, setProfile, addSession, reset }),
    [ready, profile, sessions, setProfile, addSession, reset],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const value = useContext(ProfileContext);
  if (!value) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }
  return value;
}
