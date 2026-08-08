'use client';

import Link from 'next/link';
import DayGrid from '../../components/DayGrid';
import ProgressRing from '../../components/ProgressRing';
import StreakPill from '../../components/StreakPill';
import { useChallenge } from '../../lib/challengeState';
import { TOTAL_DAYS, badges, getRecentDays, gridLeadingPad } from '../../lib/mockData';

export default function DashboardPage() {
  const { student, outputLevel, getSubmission, isSubmitted } = useChallenge();
  const [today, ...past] = getRecentDays(student.currentDay);
  const earlierCount = student.currentDay - 1 - past.length;
  const todayDone = isSubmitted(today.id);

  return (
    <main className="screen">
      <header className="who">
        <div className="who__id">
          <div className="who__avatar" aria-hidden="true">
            {student.initials}
          </div>
          <div>
            <div className="who__name">{student.name}</div>
            <div className="who__meta">
              {student.trackLabel} · COHORT {student.cohort}
            </div>
          </div>
        </div>
        <StreakPill count={student.streak} />
      </header>

      <section className="progress" aria-label="Challenge progress">
        <ProgressRing percent={student.percent} />
        <div className="progress__body">
          <h1 className="progress__day">
            Day {student.currentDay} of {TOTAL_DAYS}
          </h1>
          <p className="progress__tally">
            {student.shipped} shipped · {student.missed} missed · {student.remaining} to go
          </p>
          {student.freezesLeft > 0 && (
            <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
              <span className="chip chip--freeze">
                {student.freezesLeft} FREEZE
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="standing" aria-label="Standing in cohort">
        <div>
          <p className="label label--tight">STANDING IN {student.trackLabel}</p>
          <p className="standing__rank">
            <span className="standing__place">#{student.rank}</span>
            <span className="standing__of">of {student.cohortSize} active</span>
          </p>
        </div>
        <div className="standing__side">
          <span className="standing__delta">▲ {student.rankDelta} THIS WEEK</span>
          <div className="standing__pct">TOP {student.percentile}%</div>
        </div>
      </section>

      <div className="chips">
        {badges.map((badge) => (
          <span
            key={badge.label}
            className={`chip ${badge.earned ? 'chip--earned' : 'chip--locked'}`}
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

      <section className="spine" aria-label="Recent days">
        <div className="spine__row">
          <div className="spine__rail" aria-hidden="true">
            <span className="spine__marker spine__marker--today">{today.id}</span>
            <span className="spine__line spine__line--today" />
          </div>
          <div className="spine__body spine__body--today">
            <p className="eyebrow eyebrow--accent">
              {todayDone ? 'TODAY · SHIPPED' : `TODAY · DUE ${today.dueAt}`}
            </p>
            <h2 className="spine__title">{today.title}</h2>
            <p className="spine__desc">{today.blurb}</p>
            <Link href={`/day/${today.id}`} className="btn btn--primary spine__cta">
              {todayDone ? `Review Day ${today.id}` : `Open Day ${today.id}`}
            </Link>
          </div>
        </div>

        {past.map((day) => {
          const submission = getSubmission(day.id);
          return (
            <div className="spine__row" key={day.id}>
              <div className="spine__rail" aria-hidden="true">
                <span className="spine__marker">{day.id}</span>
                <span className="spine__line" />
              </div>
              <div className="spine__body">
                <Link href={`/day/${day.id}`} className="spine__past-title">
                  {day.title}
                </Link>
                <p className="spine__past-meta">
                  commit + post ✓ {submission?.at ?? '—'}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {earlierCount > 0 && (
        <p className="spine__more">↓ {earlierCount} earlier days</p>
      )}
    </main>
  );
}
