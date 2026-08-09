'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '../ui/Button';
import { useHover } from '../../lib/useHover';
import { numberWord } from '../../lib/numberWord';
import {
  borderBox,
  color,
  eyebrow,
  GUTTER,
  labelTight,
  monoText,
  sansText,
} from '../../styles/tokens';

function formatClock(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const styles = {
  pane: { display: 'flex', flexDirection: 'column', flex: 1 },
  session: { padding: `28px ${GUTTER}px 0`, textAlign: 'center' },
  clock: {
    ...monoText(700, 66, 1),
    color: color.ink,
    letterSpacing: '-.05em',
    fontVariantNumeric: 'tabular-nums',
    margin: '14px 0 0',
  },
  note: { ...sansText(400, 12.5), color: color.muted2, margin: '9px 0 0' },
  actions: { display: 'flex', gap: 10, padding: `22px ${GUTTER}px 0` },
  attach: {
    ...borderBox,
    margin: `14px ${GUTTER}px 0`,
    padding: '14px 16px',
    background: color.surface,
    border: `1px dashed ${color.line3}`,
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  attachName: { ...monoText(400, 12.5), color: color.muted, margin: '6px 0 0', wordBreak: 'break-all' },
  checks: {
    ...borderBox,
    margin: `26px ${GUTTER}px 0`,
    padding: '20px 18px',
    background: color.surface,
    border: `1.5px solid ${color.accent}`,
    borderRadius: 16,
  },
  checksTitle: {
    ...sansText(700, 19, 1.25),
    color: color.ink,
    letterSpacing: '-.02em',
    margin: '10px 0 0',
  },
  checkList: { display: 'flex', flexDirection: 'column', gap: 11, marginTop: 14 },
  check: {
    display: 'flex',
    gap: 11,
    alignItems: 'center',
    width: '100%',
    textAlign: 'left',
    background: 'none',
    border: 0,
    padding: 0,
  },
  box: {
    ...borderBox,
    width: 19,
    height: 19,
    flex: 'none',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...monoText(700, 11),
  },
  cta: { padding: `20px ${GUTTER}px 12px` },
};

function RemoveButton({ onClick, label: buttonLabel }) {
  const [hovered, hoverProps] = useHover();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={buttonLabel}
      style={{
        flex: 'none',
        background: 'none',
        border: 0,
        padding: 0,
        cursor: 'pointer',
        ...monoText(400, 12),
        color: hovered ? color.ink2 : color.faint2,
      }}
      {...hoverProps}
    >
      ×
    </button>
  );
}

export default function BuildPane({
  day,
  sessionStart,
  checks,
  onToggleCheck,
  onNext,
  closed = false,
  submittedAt,
}) {
  const [elapsed, setElapsed] = useState(0);
  const [attachment, setAttachment] = useState(null);
  const fileInput = useRef(null);

  useEffect(() => {
    if (closed || !sessionStart) return undefined;
    const tick = () => setElapsed(Math.floor((Date.now() - sessionStart) / 1000));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [closed, sessionStart]);

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (file) setAttachment({ name: file.name, size: file.size });
    // Let the same file be picked again after it is removed.
    event.target.value = '';
  };

  return (
    <div style={styles.pane}>
      <section style={styles.session}>
        <p style={{ ...eyebrow, letterSpacing: '.18em' }}>
          {closed ? `DAY ${day.id} · CLOSED` : `WORKING ON DAY ${day.id}`}
        </p>
        <p style={styles.clock}>{closed ? (submittedAt ?? '—') : formatClock(elapsed)}</p>
        <p style={styles.note}>
          {closed ? 'submitted and counted' : `average time took to complete the session is ${day.estimateMinutes} minutes`}
        </p>
      </section>

      {!closed && (
        <div style={styles.actions}>
          <input
            ref={fileInput}
            type="file"
            onChange={handleFile}
            hidden
            aria-hidden="true"
            tabIndex={-1}
          />
          <Button variant="quiet" size="sm" onClick={() => fileInput.current?.click()}>
            <span style={{ color: color.accent, ...monoText(400, 14) }} aria-hidden="true">
              ↑
            </span>
            Upload
          </Button>
          <Button size="sm" onClick={onNext}>
            I&apos;m done →
          </Button>
        </div>
      )}

      {!closed && attachment && (
        <div style={styles.attach}>
          <div>
            <p style={labelTight}>ATTACHED</p>
            <p style={styles.attachName}>
              {attachment.name} · {formatSize(attachment.size)}
            </p>
          </div>
          <RemoveButton
            onClick={() => setAttachment(null)}
            label={`Remove ${attachment.name}`}
          />
        </div>
      )}

      {day.requirements.length > 0 && (
        <section style={styles.checks}>
          <p style={{ ...labelTight, color: color.accent }}>02 · BUILD IT</p>
          <h2 style={styles.checksTitle}>
            {numberWord(day.requirements.length)} things must be true
          </h2>

          <div style={styles.checkList}>
            {day.requirements.map((req, i) => {
              const done = closed || Boolean(checks[i]);
              return (
                <button
                  key={req.check}
                  type="button"
                  role="checkbox"
                  aria-checked={done}
                  disabled={closed}
                  onClick={() => onToggleCheck(i)}
                  style={{ ...styles.check, cursor: closed ? 'default' : 'pointer' }}
                >
                  <span
                    style={{
                      ...styles.box,
                      ...(done
                        ? { background: color.accent, border: `1.5px solid ${color.accent}`, color: color.accentInk }
                        : { border: `1.5px solid ${color.hairline}` }),
                    }}
                    aria-hidden="true"
                  >
                    {done ? '✓' : ''}
                  </span>
                  <span
                    style={{
                      ...sansText(400, 13, 1.4),
                      color: done ? color.muted3 : color.ink2,
                      textDecoration: done ? 'line-through' : 'none',
                    }}
                  >
                    {req.check}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <div style={styles.cta}>
        <Button onClick={onNext}>{closed ? 'See what you sent →' : 'Go to Submit →'}</Button>
      </div>
    </div>
  );
}
