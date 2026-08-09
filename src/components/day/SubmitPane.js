'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import Button from '../ui/Button';
import HoverLink from '../ui/HoverLink';
import {
  borderBox,
  color,
  eyebrow,
  GUTTER,
  label,
  labelTight,
  monoText,
  sansText,
} from '../../styles/tokens';

const isGithub = (value) => /github\.com\/.+/i.test(value.trim());
const isLinkedin = (value) => /linkedin\.com\/.+/i.test(value.trim());

const styles = {
  pane: { display: 'flex', flexDirection: 'column', flex: 1 },
  close: { padding: `22px ${GUTTER}px 0` },
  closeTitle: {
    ...sansText(700, 24, 1.2),
    color: color.ink,
    letterSpacing: '-.03em',
    margin: '10px 0 0',
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    margin: `20px ${GUTTER}px 0`,
  },
  field: {
    ...borderBox,
    padding: '20px 18px',
    borderRadius: 16,
    transition: 'border-color .15s ease, background .15s ease',
  },
  fieldHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  hint: { flex: 'none', ...monoText(400, 11) },
  input: {
    ...borderBox,
    display: 'block',
    width: '100%',
    marginTop: 14,
    padding: 0,
    background: 'none',
    border: 0,
    outline: 'none',
    ...monoText(400, 14),
    color: color.ink,
  },
  cta: { padding: `20px ${GUTTER}px 0` },
  recap: {
    margin: `24px ${GUTTER}px 0`,
    paddingTop: 18,
    borderTop: `1px solid ${color.line2}`,
  },
  recapToggle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    background: 'none',
    border: 0,
    padding: 0,
    cursor: 'pointer',
  },
  recapTitle: { ...sansText(600, 16), color: color.ink, margin: '11px 0 0' },
  recapBody: { ...sansText(400, 13.5, 1.6), color: color.muted, margin: '8px 0 0' },

  done: {
    ...borderBox,
    margin: `20px ${GUTTER}px 0`,
    padding: '24px 20px',
    background: color.surface,
    border: `1.5px solid ${color.greenEdge}`,
    borderRadius: 16,
    textAlign: 'center',
  },
  mark: {
    ...borderBox,
    width: 44,
    height: 44,
    margin: '0 auto',
    borderRadius: '50%',
    background: color.greenWash,
    border: `1px solid ${color.greenEdge}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...monoText(700, 18),
    color: color.green,
  },
  doneTitle: {
    ...sansText(700, 22, 1.2),
    color: color.ink,
    letterSpacing: '-.03em',
    margin: '14px 0 0',
  },
  doneNote: { ...sansText(400, 13, 1.5), color: color.muted, margin: '8px 0 0' },
  doneLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginTop: 18,
    textAlign: 'left',
  },
  doneLink: {
    ...borderBox,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    padding: '12px 14px',
    background: color.surface2,
    border: `1px solid ${color.line}`,
    borderRadius: 10,
    ...monoText(400, 12),
    color: color.muted,
  },
};

export default function SubmitPane({ day, submission, onSubmit, isToday = true }) {
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [recapOpen, setRecapOpen] = useState(true);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (justSubmitted) {
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [justSubmitted, router]);

  const githubOk = isGithub(github);
  const linkedinOk = isLinkedin(linkedin);
  const canSubmit = githubOk && linkedinOk;

  if (submission) {
    return (
      <div style={styles.pane}>
        <section style={styles.done}>
          <div style={styles.mark} aria-hidden="true">
            {justSubmitted ? '🎉' : '✓'}
          </div>
          <h1 style={styles.doneTitle}>
            {justSubmitted ? "Hurray! Challenge Completed!" : `Day ${day.id} is in`}
          </h1>
          <p style={styles.doneNote}>
            {justSubmitted
              ? "Awesome work! Redirecting to dashboard in a few seconds..."
              : isToday
              ? `Submitted at ${submission.at}. Tomorrow's task unlocks at midnight.`
              : `Closed out at ${submission.at}, and it still counts.`}
          </p>

          {submission.github && (
            <div style={styles.doneLinks}>
              <HoverLink
                href={submission.github}
                external
                style={styles.doneLink}
                hoverStyle={{ color: color.ink }}
              >
                <b style={{ ...monoText(500, 10), color: color.muted2, letterSpacing: '.12em' }}>
                  GITHUB
                </b>
                <span>Open ↗</span>
              </HoverLink>
              <HoverLink
                href={submission.linkedin}
                external
                style={styles.doneLink}
                hoverStyle={{ color: color.ink }}
              >
                <b style={{ ...monoText(500, 10), color: color.muted2, letterSpacing: '.12em' }}>
                  LINKEDIN
                </b>
                <span>Open ↗</span>
              </HoverLink>
            </div>
          )}
        </section>

        <div style={{ padding: `22px ${GUTTER}px 12px` }}>
          <Button href="/dashboard">Back to dashboard</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit(github.trim(), linkedin.trim());
    setJustSubmitted(true);
    
    // Trigger confetti!
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: [color.accent, color.green, color.amber, '#38bdf8']
    });
  };

  const fieldStyle = (valid) => ({
    ...styles.field,
    border: valid ? `1.5px solid ${color.accent}` : `1.5px solid ${color.line2}`,
    background: valid ? 'rgba(255,92,43,.06)' : 'transparent',
  });

  return (
    <form style={styles.pane} onSubmit={handleSubmit}>
      <section style={styles.close}>
        <p style={{ ...eyebrow, color: color.accent }}>DAY {day.id} · CLOSE IT OUT</p>
        <h1 style={styles.closeTitle}>Two links and you&apos;re done</h1>
      </section>

      <div style={styles.fields}>
        <div style={fieldStyle(githubOk)}>
          <div style={styles.fieldHead}>
            <label style={labelTight} htmlFor="github-url">
              01 · GITHUB COMMIT
            </label>
            <span style={{ ...styles.hint, color: githubOk ? color.green : color.muted }}>
              {githubOk ? 'Looks right' : 'Paste'}
            </span>
          </div>
          <input
            id="github-url"
            style={styles.input}
            type="url"
            inputMode="url"
            autoComplete="off"
            placeholder="github.com/…"
            value={github}
            onChange={(event) => setGithub(event.target.value)}
          />
        </div>

        <div style={fieldStyle(linkedinOk)}>
          <div style={styles.fieldHead}>
            <label style={labelTight} htmlFor="linkedin-url">
              02 · LINKEDIN POST
            </label>
            <span style={{ ...styles.hint, color: linkedinOk ? color.green : color.muted }}>
              {linkedinOk ? 'Looks right' : 'Paste'}
            </span>
          </div>
          <input
            id="linkedin-url"
            style={styles.input}
            type="url"
            inputMode="url"
            autoComplete="off"
            placeholder="linkedin.com/…"
            value={linkedin}
            onChange={(event) => setLinkedin(event.target.value)}
          />
        </div>
      </div>

      <div style={styles.cta}>
        <Button type="submit" disabled={!canSubmit}>
          Submit Day {day.id}
        </Button>
      </div>

      <section style={styles.recap}>
        <button
          type="button"
          style={styles.recapToggle}
          onClick={() => setRecapOpen((open) => !open)}
          aria-expanded={recapOpen}
        >
          <span style={label}>REMIND ME WHAT TO BUILD</span>
          <span
            style={{
              ...monoText(400, 12),
              color: color.accent,
              transition: 'transform .2s ease',
              transform: recapOpen ? 'rotate(180deg)' : 'none',
            }}
            aria-hidden="true"
          >
            ▾
          </span>
        </button>

        {recapOpen && (
          <div>
            <h2 style={styles.recapTitle}>{day.title}</h2>
            <p style={styles.recapBody}>{day.recap}</p>
          </div>
        )}
      </section>
    </form>
  );
}
