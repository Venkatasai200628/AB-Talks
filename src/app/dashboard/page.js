'use client';

import DayGrid from '../../components/DayGrid';
import ProgressRing from '../../components/ProgressRing';
import StreakPill from '../../components/StreakPill';
import Button from '../../components/ui/Button';
import HoverLink from '../../components/ui/HoverLink';
import { useChallenge } from '../../lib/challengeState';
import { TOTAL_DAYS, badges, getRecentDays, gridLeadingPad } from '../../lib/mockData';
import {
  borderBox,
  color,
  eyebrow,
  GUTTER,
  labelTight,
  monoText,
  sansText,
  screen,
} from '../../styles/tokens';

const styles = {
  who: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `14px ${GUTTER}px 0`,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: color.surface3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...sansText(600, 12.5),
    color: color.ink,
  },
  name: { ...sansText(600, 13.5, 1.1), color: color.ink },
  meta: { ...monoText(400, 10.5), color: color.muted2, marginTop: 3 },

  progress: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    margin: `20px ${GUTTER}px 0`,
  },
  progressBody: { flex: 1, display: 'flex', flexDirection: 'column', gap: 6 },
  day: { ...sansText(600, 17, 1.2), color: color.ink, margin: 0 },
  tally: { ...sansText(400, 12.5, 1.45), color: color.muted, margin: 0 },
  freeze: {
    ...monoText(500, 10),
    padding: '3px 7px',
    borderRadius: 6,
    background: color.amberWash,
    border: `1px solid ${color.amberEdge}`,
    color: color.amber,
  },

  standing: {
    ...borderBox,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    margin: `16px ${GUTTER}px 0`,
    padding: '14px 16px',
    background: color.surface,
    border: `1px solid ${color.greenEdge}`,
    borderRadius: 14,
  },
  rank: { display: 'flex', alignItems: 'baseline', gap: 7, margin: '7px 0 0' },
  place: { ...sansText(700, 26, 1), color: color.green, letterSpacing: '-.04em' },
  outOf: { ...monoText(400, 12.5), color: color.muted },
  delta: {
    display: 'inline-block',
    padding: '5px 9px',
    borderRadius: 20,
    background: 'rgba(74,222,128,.14)',
    ...monoText(700, 10.5),
    color: color.green,
  },
  percentile: { ...monoText(400, 10.5), color: color.muted2, marginTop: 7 },

  chips: {
    display: 'flex',
    gap: 7,
    padding: `12px ${GUTTER}px 0`,
    overflowX: 'auto',
    scrollbarWidth: 'none',
  },
  chip: {
    ...borderBox,
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '6px 10px',
    borderRadius: 20,
    ...monoText(500, 10.5),
    whiteSpace: 'nowrap',
  },

  spine: { padding: `26px ${GUTTER}px 0` },
  row: { display: 'flex', gap: 14 },
  rail: { flex: 'none', width: 34, display: 'flex', flexDirection: 'column', alignItems: 'center' },
  marker: {
    width: 34,
    height: 34,
    borderRadius: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...sansText(700, 21, 1.2),
    color: color.ink,
    letterSpacing: '-.03em',
    margin: '8px 0 0',
  },
  desc: { ...sansText(400, 13, 1.5), color: color.muted, margin: '7px 0 0' },
  pastTitle: { ...sansText(600, 14.5), color: color.ink3 },
  pastMeta: { ...monoText(400, 11.5), color: color.green, margin: '5px 0 0' },
  more: {
    padding: `4px ${GUTTER}px 0`,
    textAlign: 'center',
    ...monoText(400, 12),
    color: color.muted2,
  },
};

export default function DashboardPage() {
  const { student, outputLevel, getSubmission, isSubmitted } = useChallenge();
  const [today, ...past] = getRecentDays(student.currentDay);
  const earlierCount = student.currentDay - 1 - past.length;
  const todayDone = isSubmitted(today.id);

  return (
    <main style={screen}>
      <header style={styles.who}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={styles.avatar} aria-hidden="true">
            {student.initials}
          </div>
          <div>
            <div style={styles.name}>{student.name}</div>
            <div style={styles.meta}>
              {student.trackLabel} · COHORT {student.cohort}
            </div>
          </div>
        </div>
        <StreakPill count={student.streak} />
      </header>

      <section style={styles.progress} aria-label="Challenge progress">
        <ProgressRing percent={student.percent} />
        <div style={styles.progressBody}>
          <h1 style={styles.day}>
            Day {student.currentDay} of {TOTAL_DAYS}
          </h1>
          <p style={styles.tally}>
            {student.shipped} shipped · {student.missed} missed · {student.remaining} to go
          </p>
          {student.freezesLeft > 0 && (
            <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
              <span style={styles.freeze}>{student.freezesLeft} FREEZE</span>
            </div>
          )}
        </div>
      </section>

      <section style={styles.standing} aria-label="Standing in cohort">
        <div>
          <p style={labelTight}>STANDING IN {student.trackLabel}</p>
          <p style={styles.rank}>
            <span style={styles.place}>#{student.rank}</span>
            <span style={styles.outOf}>of {student.cohortSize} active</span>
          </p>
        </div>
        <div style={{ flex: 'none', textAlign: 'right' }}>
          <span style={styles.delta}>▲ {student.rankDelta} THIS WEEK</span>
          <div style={styles.percentile}>TOP {student.percentile}%</div>
        </div>
      </section>

      <div style={styles.chips}>
        {badges.map((badge) => (
          <span
            key={badge.label}
            style={{
              ...styles.chip,
              ...(badge.earned
                ? {
                    background: color.greenWash,
                    border: `1px solid ${color.greenEdge}`,
                    color: color.green,
                  }
                : {
                    background: color.surface,
                    border: `1px dashed ${color.line3}`,
                    color: color.muted3,
                  }),
            }}
          >
            {badge.label}
            <span aria-hidden="true" style={{ fontSize: 10 }}>
              {badge.earned ? '✓' : '🔒'}
            </span>
          </span>
        ))}
      </div>

      <DayGrid
        totalDays={TOTAL_DAYS}
        currentDay={student.currentDay}
        leadingPad={gridLeadingPad}
        outputLevel={outputLevel}
      />

      <section style={styles.spine} aria-label="Recent days">
        <div style={styles.row}>
          <div style={styles.rail} aria-hidden="true">
            <span
              style={{
                ...styles.marker,
                background: color.accent,
                color: color.accentInk,
                ...monoText(700, 13),
              }}
            >
              {today.id}
            </span>
            <span
              style={{
                flex: 1,
                width: 2,
                marginTop: 6,
                background: `linear-gradient(${color.accent}, ${color.line2})`,
              }}
            />
          </div>
          <div style={{ flex: 1, paddingBottom: 22 }}>
            <p style={{ ...eyebrow, color: color.accent }}>
              {todayDone ? 'TODAY · SHIPPED' : `TODAY · DUE ${today.dueAt}`}
            </p>
            <h2 style={styles.title}>{today.title}</h2>
            <p style={styles.desc}>{today.blurb}</p>
            <Button
              href={`/day/${today.id}`}
              style={{ height: 44, borderRadius: 11, fontSize: 14.5, marginTop: 14 }}
            >
              {todayDone ? `Review Day ${today.id}` : `Open Day ${today.id}`}
            </Button>
          </div>
        </div>

        {past.map((day) => {
          const submission = getSubmission(day.id);
          return (
            <div style={styles.row} key={day.id}>
              <div style={styles.rail} aria-hidden="true">
                <span
                  style={{
                    ...styles.marker,
                    background: color.surface,
                    color: color.green,
                    ...monoText(500, 13),
                  }}
                >
                  {day.id}
                </span>
                <span style={{ flex: 1, width: 2, marginTop: 6, background: color.line2 }} />
              </div>
              <div style={{ flex: 1, paddingBottom: 18 }}>
                <HoverLink
                  href={`/day/${day.id}`}
                  style={styles.pastTitle}
                  hoverStyle={{ color: color.ink }}
                >
                  {day.title}
                </HoverLink>
                <p style={styles.pastMeta}>commit + post ✓ {submission?.at ?? '—'}</p>
              </div>
            </div>
          );
        })}
      </section>

      {earlierCount > 0 && <p style={styles.more}>↓ {earlierCount} earlier days</p>}
    </main>
  );
}
