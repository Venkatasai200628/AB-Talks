'use client';

import Link from 'next/link';
import { useState } from 'react';

const isGithub = (value) => /github\.com\/.+/i.test(value.trim());
const isLinkedin = (value) => /linkedin\.com\/.+/i.test(value.trim());

export default function SubmitPane({ day, submission, onSubmit, isToday = true }) {
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [recapOpen, setRecapOpen] = useState(true);

  const githubOk = isGithub(github);
  const linkedinOk = isLinkedin(linkedin);
  const canSubmit = githubOk && linkedinOk;

  if (submission) {
    return (
      <div className="pane">
        <section className="done">
          <div className="done__mark" aria-hidden="true">
            ✓
          </div>
          <h1 className="done__title">Day {day.id} is in</h1>
          <p className="done__note">
            {isToday
              ? `Submitted at ${submission.at}. Tomorrow's task unlocks at midnight.`
              : `Closed out at ${submission.at}, and it still counts.`}
          </p>

          {submission.github && (
            <div className="done__links">
              <a
                className="done__link"
                href={submission.github}
                target="_blank"
                rel="noreferrer noopener"
              >
                <b>GITHUB</b>
                <span>Open ↗</span>
              </a>
              <a
                className="done__link"
                href={submission.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                <b>LINKEDIN</b>
                <span>Open ↗</span>
              </a>
            </div>
          )}
        </section>

        <div className="pane__cta">
          <Link href="/dashboard" className="btn btn--primary">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit(github.trim(), linkedin.trim());
  };

  return (
    <form className="pane" onSubmit={handleSubmit}>
      <section className="close">
        <p className="eyebrow eyebrow--accent">DAY {day.id} · CLOSE IT OUT</p>
        <h1 className="close__title">Two links and you&apos;re done</h1>
      </section>

      <div className="fields">
        <div className={`field${githubOk ? ' field--active' : ''}`}>
          <div className="field__head">
            <label className="label label--tight" htmlFor="github-url">
              01 · GITHUB COMMIT
            </label>
            <span className={`field__hint${githubOk ? ' field__hint--ok' : ''}`}>
              {githubOk ? 'Looks right' : 'Paste'}
            </span>
          </div>
          <input
            id="github-url"
            className="field__input"
            type="url"
            inputMode="url"
            autoComplete="off"
            placeholder="github.com/…"
            value={github}
            onChange={(event) => setGithub(event.target.value)}
          />
        </div>

        <div className={`field${linkedinOk ? ' field--active' : ''}`}>
          <div className="field__head">
            <label className="label label--tight" htmlFor="linkedin-url">
              02 · LINKEDIN POST
            </label>
            <span className={`field__hint${linkedinOk ? ' field__hint--ok' : ''}`}>
              {linkedinOk ? 'Looks right' : 'Paste'}
            </span>
          </div>
          <input
            id="linkedin-url"
            className="field__input"
            type="url"
            inputMode="url"
            autoComplete="off"
            placeholder="linkedin.com/…"
            value={linkedin}
            onChange={(event) => setLinkedin(event.target.value)}
          />
        </div>
      </div>

      <div className="pane__cta" style={{ paddingBottom: 0 }}>
        <button type="submit" className="btn btn--primary" disabled={!canSubmit}>
          Submit Day {day.id}
        </button>
      </div>

      <section className="recap">
        <button
          type="button"
          className="recap__toggle"
          onClick={() => setRecapOpen((open) => !open)}
          aria-expanded={recapOpen}
        >
          <span className="label">REMIND ME WHAT TO BUILD</span>
          <span className={`recap__caret${recapOpen ? ' recap__caret--open' : ''}`} aria-hidden="true">
            ▾
          </span>
        </button>

        {recapOpen && (
          <div>
            <h2 className="recap__title">{day.title}</h2>
            <p className="recap__body">{day.recap}</p>
          </div>
        )}
      </section>
    </form>
  );
}
