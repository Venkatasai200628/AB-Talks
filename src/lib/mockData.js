/**
 * Seed data — stands in for the database.
 * Everything the UI reads flows through here or through ChallengeProvider,
 * so swapping in a real API later means changing those two files only.
 */

import curriculum, { track } from './curriculum';

export const TOTAL_DAYS = curriculum.length;

export const student = {
  name: 'Aarav Nair',
  initials: 'AN',
  track,
  trackLabel: track.toUpperCase(),
  cohort: 8,
  currentDay: 12,
  missed: 0,
  freezesLeft: 1,
  rank: 48,
  cohortSize: 214,
  rankDelta: 6,
  percentile: 23,
};

export const landingProof = [
  { value: '60/60', label: 'DAYS DONE', tone: 'accent' },
  { value: '1,890', label: 'POST VIEWS' },
  { value: '4', label: 'INTERVIEWS', tone: 'green' },
];

export const landingSteps = [
  {
    num: '01',
    title: 'Pick your track',
    desc: 'Web Dev, ML, DSA, App Dev or DevOps.',
  },
  {
    num: '02',
    title: 'Build the daily task',
    desc: '30–90 minutes. New one every midnight.',
  },
  {
    num: '03',
    title: 'Send two links',
    desc: 'GitHub and LinkedIn. Your streak grows.',
  },
];

export const badges = [
  { label: '7-DAY STREAK', earned: true },
  { label: 'NO FREEZE USED', earned: true },
  { label: '30-DAY', earned: false },
];

/**
 * How much each finished day shipped, 1 (light) → 4 (heavy).
 * Index 0 is day 1. Drives the shade of each cell in the 60-day grid.
 */
export const outputByDay = [2, 3, 2, 4, 3, 4, 2, 3, 1, 4, 3];

/** Day 1 landed on a Wednesday, so the first column starts two cells down. */
export const gridLeadingPad = 2;

/** When each already-finished day was closed out. */
const seedTimes = [
  '21:12', '22:05', '20:40', '19:28', '23:01', '20:16',
  '21:47', '22:33', '23:44', '19:05', '22:40',
];

export const seedSubmissions = Object.fromEntries(
  seedTimes.map((at, i) => [i + 1, { at }]),
);

const DEFAULT_DUE_AT = '23:59';

/** A requirement may be a bare string or a { brief, check } pair. */
function normalizeRequirement(requirement) {
  return typeof requirement === 'string'
    ? { brief: requirement, check: requirement }
    : requirement;
}

export function isRealDay(id) {
  const dayId = Number(id);
  return Number.isInteger(dayId) && dayId >= 1 && dayId <= TOTAL_DAYS;
}

export function getChallengeDay(id) {
  const dayId = Number(id);
  const entry = curriculum[dayId - 1];

  if (!entry) {
    return {
      id: dayId,
      exists: false,
      title: `Day ${dayId}`,
      blurb: 'This challenge only runs for 60 days.',
      brief: `The challenge runs from day 1 to day ${TOTAL_DAYS}. There is no day ${dayId}.`,
      recap: '',
      estimateMinutes: 0,
      dueAt: DEFAULT_DUE_AT,
      requirements: [],
      docs: [],
      readMinutes: 0,
      trap: '',
    };
  }

  const requirements = (entry.requirements ?? []).map(normalizeRequirement);

  return {
    id: dayId,
    exists: true,
    title: entry.title,
    blurb: entry.blurb,
    brief: entry.brief ?? entry.blurb,
    recap: entry.recap ?? requirements.map((r) => r.brief).join('. '),
    estimateMinutes: entry.estimateMinutes ?? 45,
    dueAt: entry.dueAt ?? DEFAULT_DUE_AT,
    requirements,
    docs: entry.docs ?? [],
    readMinutes: entry.readMinutes ?? 0,
    trap: entry.trap ?? '',
  };
}

/** The three most recent days, for the dashboard spine. */
export function getRecentDays(currentDay, count = 3) {
  return Array.from({ length: count }, (_, i) => getChallengeDay(currentDay - i));
}
