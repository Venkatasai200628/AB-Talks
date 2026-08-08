'use client';

import { createContext, useContext, useMemo, useSyncExternalStore } from 'react';
import {
  TOTAL_DAYS,
  outputByDay,
  seedSubmissions,
  student as seedStudent,
} from './mockData';

/**
 * Stands in for the backend. Pages never touch storage directly — they call the
 * operations below, so pointing them at a real API later is a change here only.
 *
 * State lives in a module-level store read through useSyncExternalStore rather
 * than in an effect: the server snapshot is always empty, so the first paint
 * matches the server, and React swaps in the stored value right after hydration.
 */

const STORAGE_KEY = 'abtalks.v1';
const EMPTY_STATE = { submissions: {}, checks: {} };

let snapshot = EMPTY_STATE;
let readFromStorage = false;
const listeners = new Set();

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      submissions: parsed.submissions ?? {},
      checks: parsed.checks ?? {},
    };
  } catch {
    return null;
  }
}

function writeStored(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode, quota) — the session still works */
  }
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  if (!readFromStorage) {
    snapshot = readStored() ?? EMPTY_STATE;
    readFromStorage = true;
  }
  return snapshot;
}

function getServerSnapshot() {
  return EMPTY_STATE;
}

function update(next) {
  snapshot = next(getSnapshot());
  writeStored(snapshot);
  for (const listener of listeners) listener();
}

function clockNow() {
  return new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** POST /submissions */
function submitDay(day, githubUrl, linkedinUrl) {
  update((state) => ({
    ...state,
    submissions: {
      ...state.submissions,
      [day]: { github: githubUrl, linkedin: linkedinUrl, at: clockNow() },
    },
  }));
}

/** Ticks one of the day's acceptance checks. */
function toggleCheck(day, index) {
  update((state) => {
    const current = state.checks[day] ?? [];
    const next = [...current];
    next[index] = !next[index];
    return { ...state, checks: { ...state.checks, [day]: next } };
  });
}

/** Consecutive shipped days counting back from today. */
function computeStreak(shippedDays, currentDay) {
  let day = shippedDays.has(currentDay) ? currentDay : currentDay - 1;
  let streak = 0;
  while (day >= 1 && shippedDays.has(day)) {
    streak += 1;
    day -= 1;
  }
  return streak;
}

const ChallengeContext = createContext(null);

/** Days 1..11 are already shipped in the seed data. */
const seedShippedDays = Array.from({ length: outputByDay.length }, (_, i) => i + 1);

export function ChallengeProvider({ children }) {
  const { submissions, checks } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const value = useMemo(() => {
    const shippedDays = new Set(seedShippedDays);
    for (const day of Object.keys(submissions)) shippedDays.add(Number(day));

    const shipped = shippedDays.size;

    return {
      student: {
        ...seedStudent,
        streak: computeStreak(shippedDays, seedStudent.currentDay),
        shipped,
        remaining: TOTAL_DAYS - shipped,
        percent: Math.round((shipped / TOTAL_DAYS) * 100),
      },

      /** GET /submissions/:day */
      isSubmitted: (day) => shippedDays.has(Number(day)),
      getSubmission: (day) => submissions[day] ?? seedSubmissions[day] ?? null,

      /** 0 = not shipped, 1..4 = how much that day produced. */
      outputLevel: (day) => (submissions[day] ? 4 : (outputByDay[day - 1] ?? 0)),

      checksFor: (day) => checks[day] ?? [],
      toggleCheck,
      submitDay,
    };
  }, [checks, submissions]);

  return <ChallengeContext.Provider value={value}>{children}</ChallengeContext.Provider>;
}

export function useChallenge() {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallenge must be used inside a ChallengeProvider');
  }
  return context;
}
