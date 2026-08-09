/**
 * Seed data — stands in for the database.
 * Per-account state lives in profiles.js; this file is the challenge itself
 * plus the landing copy. Everything the UI reads flows through here or through
 * ChallengeProvider, so swapping in a real API means changing those only.
 */

import curriculum, { track } from './curriculum';

export const TOTAL_DAYS = curriculum.length;

/** The track on offer, for copy that names it before a student picks one. */
export const defaultTrack = track;

export const landingProof = [
  { value: '60/60', label: 'DAYS DONE', tone: 'accent' },
  { value: '1,890', label: 'POST VIEWS' },
  { value: '4', label: 'INTERVIEWS', tone: 'green' },
];

export const trackOptions = [
  { id: 'web', title: 'Web Dev', desc: 'React, Next.js, and modern frontend.' },
  { id: 'ml', title: 'Machine Learning', desc: 'Python, PyTorch, and AI models.' },
  { id: 'dsa', title: 'DSA', desc: 'Data structures and algorithms in C++ or Java.' },
  { id: 'app', title: 'App Dev', desc: 'React Native, iOS, and Android.' },
  { id: 'devops', title: 'DevOps', desc: 'Docker, AWS, and CI/CD pipelines.' },
];

export const mockReviews = [
  {
    id: 1,
    name: 'Ananya Desai',
    track: 'Web Dev',
    text: 'This challenge completely changed how I learn. Shipping something every single day forced me out of tutorial hell. I finally have a portfolio to show recruiters.',
    avatar: 'AD',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    track: 'DSA',
    text: 'The consistency is what matters. Before this, I used to practice for a week and then stop. Doing 60 days straight built a habit I still keep today.',
    avatar: 'RV',
  },
  {
    id: 3,
    name: 'Priya Kumar',
    track: 'App Dev',
    text: 'Posting my progress on LinkedIn every day was scary at first, but it got me noticed by a startup founder. Just landed my first internship!',
    avatar: 'PK',
  },
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

/** Day 1 landed on a Wednesday, so the first grid column starts two cells down. */
export const gridLeadingPad = 2;

/** Deterministic close-out times, so a seeded day always reads the same. */
const CLOSE_TIMES = [
  '21:12', '22:05', '20:40', '19:28', '23:01', '20:16',
  '21:47', '22:33', '23:44', '19:05', '22:40',
];

export const submissionTime = (day) => CLOSE_TIMES[(day - 1) % CLOSE_TIMES.length];

const DEFAULT_DUE_AT = '23:59';

/** A requirement may be a bare string or a { brief, check } pair. */
function normalizeRequirement(requirement) {
  return typeof requirement === 'string'
    ? { brief: requirement, check: requirement }
    : requirement;
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

/** Today plus the days just behind it, for the dashboard spine. */
export function getRecentDays(currentDay, count = 3) {
  return Array.from({ length: count }, (_, i) => currentDay - i)
    .filter((day) => day >= 1)
    .map(getChallengeDay);
}
