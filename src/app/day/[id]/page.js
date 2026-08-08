'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import BuildPane from '../../../components/day/BuildPane';
import LockedPane from '../../../components/day/LockedPane';
import SubmitPane from '../../../components/day/SubmitPane';
import TaskPane from '../../../components/day/TaskPane';
import StreakPill from '../../../components/StreakPill';
import { useChallenge } from '../../../lib/challengeState';
import { getChallengeDay } from '../../../lib/mockData';

const TABS = [
  { id: 'task', label: 'Task' },
  { id: 'build', label: 'Build' },
  { id: 'submit', label: 'Submit' },
];

/** Time left until the day's cutoff, e.g. "7H 18M LEFT". */
function timeLeft(dueAt) {
  const [hours, minutes] = dueAt.split(':').map(Number);
  const now = new Date();
  const due = new Date(now);
  due.setHours(hours, minutes, 0, 0);

  if (due <= now) return 'PAST DUE';

  const totalMinutes = Math.floor((due - now) / 60000);
  return `${Math.floor(totalMinutes / 60)}H ${totalMinutes % 60}M LEFT`;
}

function ChallengeDay() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { student, checksFor, toggleCheck, submitDay, getSubmission, dayStatus } = useChallenge();

  const day = getChallengeDay(params.id ?? student.currentDay);
  const status = dayStatus(day.id);
  const closed = status === 'shipped';
  const isToday = day.id === student.currentDay;

  const requestedTab = searchParams.get('tab');
  const [tab, setTab] = useState(
    TABS.some((item) => item.id === requestedTab) ? requestedTab : 'task',
  );
  const [sessionStart, setSessionStart] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const tablist = useRef(null);

  // Deadline is clock-dependent, so it is only computed after mount.
  useEffect(() => {
    if (closed || !day.exists) return undefined;
    const update = () => setRemaining(timeLeft(day.dueAt));
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, [closed, day.dueAt, day.exists]);

  if (!day.exists || status === 'locked') {
    return (
      <DayFrame day={day} student={student}>
        <LockedPane day={day} currentDay={student.currentDay} exists={day.exists} />
      </DayFrame>
    );
  }

  // The session clock starts the first time the student opens the Build tab.
  const openTab = (next) => {
    if (next === 'build' && !closed) setSessionStart((start) => start ?? Date.now());
    setTab(next);
    // Keep the tab shareable without paying for a route transition.
    const url = new URL(window.location.href);
    url.searchParams.set('tab', next);
    window.history.replaceState(null, '', url);
  };

  // Left/right arrows move between tabs, per the tablist pattern.
  const onTabKeyDown = (event) => {
    const offset = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!offset) return;
    event.preventDefault();
    const index = TABS.findIndex((item) => item.id === tab);
    const next = TABS[(index + offset + TABS.length) % TABS.length];
    openTab(next.id);
    tablist.current?.querySelector(`[data-tab="${next.id}"]`)?.focus();
  };

  const submission = getSubmission(day.id);

  return (
    <DayFrame day={day} student={student}>
      <nav
        className="tabs"
        role="tablist"
        aria-label="Day sections"
        ref={tablist}
        onKeyDown={onTabKeyDown}
      >
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            className="tab"
            data-tab={item.id}
            aria-selected={tab === item.id}
            tabIndex={tab === item.id ? 0 : -1}
            onClick={() => openTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {tab === 'task' && (
        <TaskPane day={day} trackLabel={student.trackLabel} onNext={() => openTab('build')} />
      )}

      {tab === 'build' && (
        <BuildPane
          day={day}
          sessionStart={sessionStart}
          checks={checksFor(day.id)}
          onToggleCheck={(index) => toggleCheck(day.id, index)}
          onNext={() => openTab('submit')}
          closed={closed}
          submittedAt={submission?.at}
        />
      )}

      {tab === 'submit' && (
        <SubmitPane
          day={day}
          submission={submission}
          isToday={isToday}
          onSubmit={(github, linkedin) => submitDay(day.id, github, linkedin)}
        />
      )}

      {tab !== 'submit' && !closed && (
        <p className="due">
          DUE {day.dueAt} IST{remaining ? ` · ${remaining}` : ''}
        </p>
      )}
    </DayFrame>
  );
}

/** Header and shell shared by every state of a day. */
function DayFrame({ day, student, children }) {
  return (
    <main className="screen">
      <header className="dayhead">
        <div className="dayhead__left">
          <Link href="/dashboard" className="dayhead__back" aria-label="Back to dashboard">
            ←
          </Link>
          <div>
            <h1 className="dayhead__title">Day {day.id}</h1>
            <p className="dayhead__meta">
              {student.trackLabel}
              {day.estimateMinutes ? ` · ~${day.estimateMinutes} MIN` : ''}
            </p>
          </div>
        </div>
        <StreakPill count={student.streak} small />
      </header>
      {children}
    </main>
  );
}

export default function ChallengeDayPage() {
  return (
    <Suspense fallback={<main className="screen" />}>
      <ChallengeDay />
    </Suspense>
  );
}
