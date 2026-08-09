'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import BuildPane from '../../../components/day/BuildPane';
import LockedPane from '../../../components/day/LockedPane';
import SubmitPane from '../../../components/day/SubmitPane';
import TaskPane from '../../../components/day/TaskPane';
import StreakPill from '../../../components/StreakPill';
import HoverLink from '../../../components/ui/HoverLink';
import { useChallenge } from '../../../lib/challengeState';
import { getChallengeDay } from '../../../lib/mockData';
import { borderBox, color, GUTTER, monoText, sansText, screen } from '../../../styles/tokens';

const TABS = [
  { id: 'task', label: 'Task' },
  { id: 'build', label: 'Build' },
  { id: 'submit', label: 'Submit' },
];

const styles = {
  head: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `14px ${GUTTER}px 0`,
  },
  back: {
    ...borderBox,
    width: 30,
    height: 30,
    flex: 'none',
    borderRadius: 10,
    background: color.surface,
    border: `1px solid ${color.line}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...monoText(400, 14),
    color: color.muted,
  },
  title: { ...sansText(700, 17), color: color.ink, letterSpacing: '-.02em', margin: 0 },
  meta: { ...monoText(400, 10.5), color: color.muted2, margin: '3px 0 0' },
  tabs: {
    display: 'flex',
    margin: `18px ${GUTTER}px 0`,
    borderBottom: `1px solid ${color.line2}`,
  },
  due: {
    padding: `0 ${GUTTER}px 26px`,
    textAlign: 'center',
    ...monoText(400, 11.5),
    color: color.muted2,
  },
};

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

function Tab({ item, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      role="tab"
      data-tab={item.id}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        textAlign: 'center',
        padding: '11px 0',
        background: 'none',
        border: 0,
        borderBottom: `2px solid ${selected ? color.accent : 'transparent'}`,
        cursor: 'pointer',
        transition: 'color .15s ease',
        ...sansText(selected ? 600 : 500, 12.5),
        color: selected ? color.ink : hovered ? color.ink3 : color.muted2,
      }}
    >
      {item.label}
    </button>
  );
}

/** Header and shell shared by every state of a day. */
function DayFrame({ day, student, children }) {
  return (
    <main style={screen}>
      <header style={styles.head}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <HoverLink
            href="/dashboard"
            style={styles.back}
            hoverStyle={{ color: color.ink }}
            aria-label="Back to dashboard"
          >
            ←
          </HoverLink>
          <div>
            <h1 style={styles.title}>Day {day.id}</h1>
            <p style={styles.meta}>
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

function ChallengeDay() {
  const params = useParams();
  const searchParams = useSearchParams();
  const stateKey = searchParams.get('state');
  const { student, checksFor, toggleCheck, submitDay, getSubmission, dayStatus, sessionTimeFor, updateSessionTime, checkAll } =
    useChallenge(stateKey);

  const day = getChallengeDay(params.id ?? student.currentDay);
  const status = dayStatus(day.id);
  const closed = status === 'shipped';
  const isToday = day.id === student.currentDay;

  const requestedTab = searchParams.get('tab');
  const [tab, setTab] = useState(
    TABS.some((item) => item.id === requestedTab) ? requestedTab : (closed ? 'submit' : 'task'),
  );
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

  const openTab = (next) => {
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
        style={styles.tabs}
        role="tablist"
        aria-label="Day sections"
        ref={tablist}
        onKeyDown={onTabKeyDown}
      >
        {TABS.map((item) => (
          <Tab
            key={item.id}
            item={item}
            selected={tab === item.id}
            onSelect={() => openTab(item.id)}
          />
        ))}
      </nav>

      {tab === 'task' && (
        <TaskPane day={day} trackLabel={student.trackLabel} onNext={() => openTab('build')} />
      )}

      {tab === 'build' && (
        <BuildPane
          day={day}
          sessionTime={sessionTimeFor(day.id)}
          updateSessionTime={(t) => updateSessionTime(day.id, t)}
          checkAll={() => checkAll(day.id, day.requirements.length)}
          checks={checksFor(day.id)}
          onToggleCheck={(index) => toggleCheck(day.id, index)}
          onNext={() => openTab('submit')}
          closed={closed}
          submission={submission}
        />
      )}

      {tab === 'submit' && (
        <SubmitPane
          day={day}
          submission={submission}
          isToday={isToday}
          onSubmit={(github, linkedin) => submitDay(day.id, github, linkedin, sessionTimeFor(day.id))}
        />
      )}

      {tab !== 'submit' && !closed && (
        <p style={styles.due}>
          DUE {day.dueAt} IST{remaining ? ` · ${remaining}` : ''}
        </p>
      )}
    </DayFrame>
  );
}

export default function ChallengeDayPage() {
  return (
    <Suspense fallback={<main style={screen} />}>
      <ChallengeDay />
    </Suspense>
  );
}
