/**
 * Seed data — stands in for the database.
 * Everything the UI reads flows through here or through ChallengeProvider,
 * so swapping in a real API later means changing those two files only.
 */

export const TOTAL_DAYS = 60;

export const student = {
  name: 'Aarav Nair',
  initials: 'AN',
  track: 'Web Dev',
  trackLabel: 'WEB DEV',
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

const days = {
  12: {
    id: 12,
    title: 'Build a debounced search input',
    blurb:
      'Filter a list of 500 records without firing a request on every keystroke.',
    brief:
      'Filter a list of 500 records without firing a request on every keystroke. Wait until typing stops, then search once.',
    recap:
      '300ms after typing stops. Cancel in-flight requests. Never let a stale response overwrite a fresh one. Empty box clears without a request.',
    estimateMinutes: 45,
    dueAt: '23:59',
    requirements: [
      {
        brief: 'A 300ms delay after the last keystroke',
        check: '300ms delay after typing stops',
      },
      {
        brief: 'One request per search, not one per letter',
        check: 'One request per search',
      },
      {
        brief: 'An old response can never overwrite a newer one',
        check: 'Old responses never overwrite new',
      },
      {
        brief: 'Clearing the box clears results with no request',
        check: 'Empty box clears without a request',
      },
    ],
    docs: [
      {
        title: 'The delay itself',
        source: 'MDN',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout',
        body: 'setTimeout starts the 300ms clock; clearTimeout resets it every time a new key is pressed. That pair is the whole debounce.',
      },
      {
        title: 'Cancelling a request',
        source: 'MDN',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController',
        body: "Pass an AbortController's signal into fetch, then call abort() before firing the next search. Catch the AbortError — it's expected, not a bug.",
      },
      {
        title: 'Debounce vs. throttle',
        source: 'LODASH',
        url: 'https://lodash.com/docs#debounce',
        body: "Debounce waits for a pause — right for search. Throttle fires at a fixed rate — right for scroll. Know which one you're building.",
      },
    ],
    readMinutes: 8,
    trap: 'requests don’t come back in the order you sent them. A slow "ab" can land after a fast "abcd" and overwrite it. That’s the race condition today’s task is really about.',
  },
  11: {
    id: 11,
    title: 'Persist search state in the URL',
    blurb: 'Reload the page and land on the same query, filters and page number.',
  },
  10: {
    id: 10,
    title: 'Fetch and render a results list',
    blurb: 'Loading, empty and error states all have to be real screens.',
  },
};

/** What the seed data already counts as shipped, newest first. */
export const seedSubmissions = {
  11: { at: '22:40' },
  10: { at: '19:05' },
};

export function getChallengeDay(id) {
  const dayId = Number(id);
  if (days[dayId]) return days[dayId];

  return {
    id: dayId,
    title: `Day ${dayId}`,
    blurb: 'This day has not been written yet.',
    brief: 'This day has not been written yet. Check back when the cohort reaches it.',
    recap: 'No brief published for this day.',
    estimateMinutes: 45,
    dueAt: '23:59',
    requirements: [],
    docs: [],
    readMinutes: 0,
    trap: '',
  };
}

/** The three most recent days, for the dashboard spine. */
export function getRecentDays(currentDay, count = 3) {
  return Array.from({ length: count }, (_, i) => getChallengeDay(currentDay - i));
}
