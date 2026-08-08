'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BuildPane from '../../../components/day/BuildPane';
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

export default function ChallengeDayPage() {
  const params = useParams();
  const { student, checksFor, toggleCheck, submitDay, getSubmission } = useChallenge();

  const day = getChallengeDay(params.id ?? student.currentDay);
  const [tab, setTab] = useState('task');
  const [sessionStart, setSessionStart] = useState(null);
  const [remaining, setRemaining] = useState(null);

  // The session clock starts the first time the student opens the Build tab.
  const openTab = (next) => {
    if (next === 'build') setSessionStart((start) => start ?? Date.now());
    setTab(next);
  };

  // Deadline is clock-dependent, so it is only computed after mount.
  useEffect(() => {
    const update = () => setRemaining(timeLeft(day.dueAt));
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, [day.dueAt]);

  const submission = getSubmission(day.id);

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
              {student.trackLabel} · ~{day.estimateMinutes} MIN
            </p>
          </div>
        </div>
        <StreakPill count={student.streak} small />
      </header>

      <nav className="tabs" role="tablist" aria-label="Day sections">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            className="tab"
            aria-selected={tab === item.id}
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
        />
      )}

      {tab === 'submit' && (
        <SubmitPane
          day={day}
          submission={submission}
          onSubmit={(github, linkedin) => submitDay(day.id, github, linkedin)}
        />
      )}

      {tab !== 'submit' && (
        <p className="due">
          DUE {day.dueAt} IST{remaining ? ` · ${remaining}` : ''}
        </p>
      )}
    </main>
  );
}
