'use client';

import { createContext, useContext, useMemo, useSyncExternalStore } from 'react';
import { TOTAL_DAYS, submissionTime } from './mockData';
import { getProfile } from './profiles';

/**
 * Stands in for the backend. Pages never touch storage directly — they call the
 * operations below, so pointing them at a real API later is a change here only.
 *
 * State lives in a module-level store read through useSyncExternalStore rather
 * than in an effect: the server snapshot is always empty, so the first paint
 * matches the server, and React swaps in the stored value right after hydration.
 */

const STORAGE_KEY = 'abtalks.v1';
const EMPTY_STATE = { submissions: {}, checks: {}, sessionTimes: {} };

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
      sessionTimes: parsed.sessionTimes ?? {},
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
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

/** POST /submissions */
function submitDay(day, githubUrl, linkedinUrl, elapsedSeconds = 0) {
  update((state) => ({
    ...state,
    submissions: {
      ...state.submissions,
      [day]: { github: githubUrl, linkedin: linkedinUrl, at: clockNow(), timeSpent: elapsedSeconds },
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

/** Checks all requirements for a day automatically. */
function checkAll(day, totalChecks) {
  update((state) => ({
    ...state,
    checks: { ...state.checks, [day]: Array(totalChecks).fill(true) },
  }));
}

/** Persist elapsed time for a session. */
function updateSessionTime(day, seconds) {
  update((state) => ({
    ...state,
    sessionTimes: { ...(state.sessionTimes || {}), [day]: seconds },
  }));
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

export function ChallengeProvider({ children }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <ChallengeContext.Provider value={state}>{children}</ChallengeContext.Provider>;
}

/**
 * Reads the account. `profileKey` selects which seeded state to derive from —
 * omitted, it is the typical student the plain routes show.
 */
export function useChallenge(profileKey) {
  const state = useContext(ChallengeContext);
  if (!state) {
    throw new Error('useChallenge must be used inside a ChallengeProvider');
  }

  const { submissions, checks, sessionTimes = {} } = state;

  return useMemo(() => {
    const profile = getProfile(profileKey);
    const { currentDay } = profile.student;

    const shippedDays = new Set(profile.shippedDays);
    for (const day of Object.keys(submissions)) shippedDays.add(Number(day));

    const shipped = shippedDays.size;
    const streak = computeStreak(shippedDays, currentDay);

    // Every day already past that was never closed out.
    let missed = 0;
    for (let day = 1; day < currentDay; day += 1) {
      if (!shippedDays.has(day)) missed += 1;
    }

    const { name, initials, track, rank } = profile.student;

    return {
      profileKey: profile.key,

      student: {
        ...profile.student,
        name: name ?? 'Your profile',
        initials: initials ?? '—',
        trackLabel: track ? track.toUpperCase() : 'NO TRACK PICKED',
        hasProfile: Boolean(name && track),
        ranked: rank !== null,
        streak,
        shipped,
        missed,
        remaining: TOTAL_DAYS - shipped,
        percent: Math.round((shipped / TOTAL_DAYS) * 100),
      },

      /** Earned state follows the data rather than being hard-coded. */
      badges: [
        { 
          id: 'first',
          label: 'First Blood', 
          desc: 'Shipped your very first project',
          icon: '🚀',
          earned: shipped >= 1,
          hue: 'var(--color-accent)',
        },
        { 
          id: 'streak7',
          label: '7-Day Streak', 
          desc: 'Built a daily habit for a week',
          icon: '🔥',
          earned: streak >= 7,
          hue: 'var(--color-amber)',
        },
        { 
          id: 'nofreeze',
          label: 'Unfrozen', 
          desc: 'Never used a streak freeze',
          icon: '❄️',
          earned: profile.student.freezesUsed === 0 && shipped > 0,
          hue: '#38bdf8', // Cyan
        },
        { 
          id: 'halfway',
          label: 'Halfway There', 
          desc: 'Reached the 30-day milestone',
          icon: '🎯',
          earned: shipped >= 30,
          hue: 'var(--color-green)',
        },
      ],

      /** GET /submissions/:day */
      isSubmitted: (day) => shippedDays.has(Number(day)),

      getSubmission: (day) => {
        const dayId = Number(day);
        if (submissions[dayId]) return submissions[dayId];
        if (shippedDays.has(dayId)) return { at: submissionTime(dayId) };
        return null;
      },

      /**
       * Where a day sits relative to today:
       * 'shipped' closed out · 'missed' passed unclosed · 'today' open now ·
       * 'locked' not reached yet.
       */
      dayStatus: (day) => {
        const dayId = Number(day);
        if (shippedDays.has(dayId)) return 'shipped';
        if (dayId < currentDay) return 'missed';
        if (dayId === currentDay) return 'today';
        return 'locked';
      },

      /** 0 = nothing shipped, 1..4 = how much that day produced. */
      outputLevel: (day) => (submissions[day] ? 4 : (profile.output[day] ?? 0)),

      checksFor: (day) => checks[day] ?? [],
      sessionTimeFor: (day) => sessionTimes[day] ?? 0,
      toggleCheck,
      checkAll,
      updateSessionTime,
      submitDay,
    };
  }, [checks, sessionTimes, profileKey, submissions]);
}
