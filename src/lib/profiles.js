/**
 * The states a real student account can be in.
 *
 * The default profile is what the plain routes show. The others exist so the
 * edge cases the brief calls for can be opened directly:
 *
 *   /dashboard?state=new      first day, nothing shipped yet
 *   /dashboard?state=missed   a broken streak
 *   /dashboard?state=empty    a profile that was never filled in
 *
 * Nothing new appears on screen for them — the same components render
 * whatever the data says, which is the point.
 */

/** Output level 1..4 per shipped day, keyed by day number. */
const level = (entries) => Object.fromEntries(entries);

const profiles = {
  default: {
    key: 'default',
    label: 'Typical — day 12, streak intact',
    student: {
      name: 'Aarav Nair',
      initials: 'AN',
      track: 'Web Dev',
      cohort: 8,
      currentDay: 12,
      freezesLeft: 1,
      freezesUsed: 0,
      rank: 48,
      cohortSize: 214,
      rankDelta: 6,
      percentile: 23,
    },
    shippedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    output: level([
      [1, 2], [2, 3], [3, 2], [4, 4], [5, 3], [6, 4],
      [7, 2], [8, 3], [9, 1], [10, 4], [11, 3],
    ]),
  },

  new: {
    key: 'new',
    label: 'First day — no streak yet',
    student: {
      name: 'Aarav Nair',
      initials: 'AN',
      track: 'Web Dev',
      cohort: 8,
      currentDay: 1,
      freezesLeft: 1,
      freezesUsed: 0,
      rank: null,
      cohortSize: 214,
      rankDelta: 0,
      percentile: null,
    },
    shippedDays: [],
    output: {},
  },

  missed: {
    key: 'missed',
    label: 'Broken streak — days 9 and 10 missed',
    student: {
      name: 'Aarav Nair',
      initials: 'AN',
      track: 'Web Dev',
      cohort: 8,
      currentDay: 12,
      freezesLeft: 0,
      freezesUsed: 1,
      rank: 137,
      cohortSize: 214,
      rankDelta: -22,
      percentile: 64,
    },
    shippedDays: [1, 2, 3, 4, 5, 6, 7, 8, 11],
    output: level([
      [1, 2], [2, 3], [3, 2], [4, 4], [5, 3],
      [6, 4], [7, 2], [8, 3], [11, 1],
    ]),
  },

  empty: {
    key: 'empty',
    label: 'Empty profile — nothing set up',
    student: {
      name: null,
      initials: null,
      track: null,
      cohort: null,
      currentDay: 1,
      freezesLeft: 1,
      freezesUsed: 0,
      rank: null,
      cohortSize: 214,
      rankDelta: 0,
      percentile: null,
    },
    shippedDays: [],
    output: {},
  },
};

export function getProfile(key) {
  return profiles[key] ?? profiles.default;
}

export default profiles;
