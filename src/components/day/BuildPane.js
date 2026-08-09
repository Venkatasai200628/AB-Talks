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
  sessionTime,
  updateSessionTime,
  checkAll,
  checks,
  onToggleCheck,
  onNext,
  closed = false,
  submission,
}) {
  const [elapsed, setElapsed] = useState(sessionTime || 0);
  const [uploadError, setUploadError] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyingIndex, setVerifyingIndex] = useState(-1);
  const [isVerified, setIsVerified] = useState(false);
  const fileInput = useRef(null);
  const elapsedRef = useRef(elapsed);

  useEffect(() => {
    elapsedRef.current = elapsed;
  }, [elapsed]);

  useEffect(() => {
    return () => {
      // Save session time globally when we unmount (leave the tab/page)
      if (!closed) updateSessionTime(elapsedRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closed]);

  useEffect(() => {
    if (closed || isVerifying || isVerified) return undefined;
    const id = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [closed, isVerifying, isVerified]);

  useEffect(() => {
    if (!isVerifying) return;
    
    if (verifyingIndex >= day.requirements.length) {
      setIsVerifying(false);
      setIsVerified(true);
      checkAll();
      return;
    }

    const timer = setTimeout(() => {
      setVerifyingIndex(prev => prev + 1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVerifying, verifyingIndex, day.requirements.length, checkAll]);

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.zip')) {
      setUploadError('Invalid file type. Please upload a .zip file.');
      event.target.value = '';
      return;
    }

    setUploadError(null);
    setAttachment({ name: file.name, size: file.size });
    event.target.value = '';
  };

  const startVerification = () => {
    if (!attachment) return;
    setIsVerifying(true);
    setVerifyingIndex(0);
  };

  return (
    <div style={styles.pane}>
      <section style={styles.session}>
        <p style={{ ...eyebrow, letterSpacing: '.18em' }}>
          {closed ? `DAY ${day.id} · CLOSED` : `WORKING ON DAY ${day.id}`}
        </p>
        <p style={styles.clock}>{closed ? (submission?.timeSpent ? formatClock(submission.timeSpent) : (submission?.at ?? '—')) : formatClock(elapsed)}</p>
        <p style={styles.note}>
          {closed ? (submission?.timeSpent ? `You completed this in ${Math.ceil(submission.timeSpent / 60)} minutes` : 'submitted and counted') : `average time took to complete the session is ${day.estimateMinutes} minutes`}
        </p>
      </section>

      {!closed && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ ...styles.actions, width: '100%', justifyContent: 'center' }}>
            <input
              ref={fileInput}
              type="file"
              accept=".zip"
              onChange={handleFile}
              hidden
              aria-hidden="true"
              tabIndex={-1}
            />
            <Button variant="quiet" size="sm" onClick={() => fileInput.current?.click()} disabled={isVerifying || isVerified}>
              <span style={{ color: color.accent, ...monoText(400, 14) }} aria-hidden="true">
                ↑
              </span>
              Upload
            </Button>
            
            {(!isVerified && !closed) && (
              <Button size="sm" onClick={startVerification} disabled={!attachment || isVerifying}>
                {isVerifying ? 'Verifying...' : 'I\'m done →'}
              </Button>
            )}
            
            {(isVerified || closed) && (
              <Button size="sm" onClick={onNext}>
                Go to Submit →
              </Button>
            )}
          </div>
          {uploadError && (
            <p style={{ ...sansText(500, 12), color: color.accent, marginTop: 8 }}>{uploadError}</p>
          )}
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
              // Ignore manual checks[i] while the verification animation is running, so it plays cleanly.
              const done = closed || isVerified || (isVerifying ? i < verifyingIndex : Boolean(checks[i]));
              const processing = isVerifying && i === verifyingIndex;
              
              return (
                <button
                  key={req.check}
                  type="button"
                  role="checkbox"
                  aria-checked={done}
                  disabled={closed || isVerifying || isVerified}
                  onClick={() => onToggleCheck(i)}
                  style={{ ...styles.check, cursor: (closed || isVerifying || isVerified) ? 'default' : 'pointer' }}
                >
                  <span
                    style={{
                      ...styles.box,
                      ...(done
                        ? { background: color.accent, border: `1.5px solid ${color.accent}`, color: color.accentInk }
                        : processing
                        ? { border: `1.5px solid ${color.accent}`, color: color.accent }
                        : { border: `1.5px solid ${color.hairline}` }),
                    }}
                    aria-hidden="true"
                  >
                    {done ? '✓' : processing ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" style={{ animation: 'ab-spin 1s linear infinite' }}>
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                        <style>{`@keyframes ab-spin { 100% { transform: rotate(360deg); } }`}</style>
                      </svg>
                    ) : ''}
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

      {(isVerified || closed) && (
        <div style={styles.cta}>
          <Button onClick={onNext}>{closed ? 'See what you sent →' : 'Go to Submit →'}</Button>
        </div>
      )}
    </div>
  );
}
