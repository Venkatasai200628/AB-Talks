import { mono, sans } from '../lib/fonts';

export { mono, sans };

/**
 * The design system as plain JavaScript.
 *
 * Every value from "ABTalks Dashboard Directions" lives here and is spread
 * into React style objects at the point of use. There is no stylesheet.
 */

export const color = {
  bg: '#0A0A0B',
  surface: '#141416',
  surface2: '#1A1A1D',
  surface3: '#26262B',

  line: 'rgba(255,255,255,.07)',
  line2: 'rgba(255,255,255,.09)',
  line3: 'rgba(255,255,255,.14)',

  accent: '#FF5C2B',
  accentInk: '#0A0A0B',
  accentWash: 'rgba(255,92,43,.12)',
  accentWashSoft: 'rgba(255,92,43,.07)',
  accentEdge: 'rgba(255,92,43,.28)',

  green: '#4ADE80',
  greenWash: 'rgba(74,222,128,.12)',
  greenEdge: 'rgba(74,222,128,.28)',
  amber: '#FBBF24',
  amberWash: 'rgba(251,191,36,.1)',
  amberEdge: 'rgba(251,191,36,.25)',

  ink: '#F4F2EE',
  ink2: '#D4D2CC',
  ink3: '#B4B4BD',
  ink4: '#9A9AA4',
  muted: '#8A8A93',
  muted2: '#6E6E78',
  muted3: '#5C5C64',
  faint: '#4E4E56',
  faint2: '#4A4A52',
  hairline: '#3A3A42',
  track: '#222227',

  /** Empty → maximum output, indexed 0..4. */
  grid: ['#131316', '#4A1F0F', '#8A3315', '#C7481C', '#FF5C2B'],
};

export const GUTTER = 22;

/** Type helpers — `sansText(700, 31, 1.14)` reads like the design spec. */
export const sansText = (fontWeight, fontSize, lineHeight) => ({
  fontFamily: sans,
  fontWeight,
  fontSize,
  ...(lineHeight === undefined ? null : { lineHeight }),
});

export const monoText = (fontWeight, fontSize, lineHeight) => ({
  fontFamily: mono,
  fontWeight,
  fontSize,
  ...(lineHeight === undefined ? null : { lineHeight }),
});

/* ── Repeated blocks ──────────────────────────────────────────── */

export const screen = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: 34,
};

export const eyebrow = {
  ...monoText(500, 10.5),
  color: color.muted2,
  letterSpacing: '.14em',
  margin: 0,
};

export const label = {
  ...monoText(500, 10),
  color: color.muted2,
  letterSpacing: '.14em',
  margin: 0,
};

export const labelTight = {
  ...monoText(500, 9.5),
  color: color.muted2,
  letterSpacing: '.12em',
  margin: 0,
};

/** Browsers indent and bullet lists; nothing here wants that. */
export const bareList = { listStyle: 'none', margin: 0, padding: 0 };

/** Elements with an explicit size plus a border need border-box. */
export const borderBox = { boxSizing: 'border-box' };
