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
  pane: { display: 'flex', flexDirection: 'column', flex: 1, paddingBottom: 64, position: 'relative' },
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
    transition: 'all 0.6s ease',
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

  // AI Hint System State
  const [hintsUsed, setHintsUsed] = useState(0);
  const [lastHintTime, setLastHintTime] = useState(null);
  const [hintInput, setHintInput] = useState('');
  const [hints, setHints] = useState([]);
  const [isGeneratingHint, setIsGeneratingHint] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    elapsedRef.current = elapsed;
  }, [elapsed]);

  useEffect(() => {
    return () => {
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
      
      const timer = setTimeout(() => {
        onNext();
      }, 3500); // Wait to show the top popup before auto-advancing
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setVerifyingIndex(prev => prev + 1);
    }, 1200);

    return () => clearTimeout(timer);
  }, [isVerifying, verifyingIndex, day.requirements.length, checkAll, onNext]);

  // AI Hint Cooldown Timer
  useEffect(() => {
    if (!lastHintTime) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = now - lastHintTime;
      const cooldown = 5 * 60 * 1000;
      if (diff >= cooldown) {
        setCooldownRemaining(0);
        clearInterval(interval);
      } else {
        setCooldownRemaining(Math.ceil((cooldown - diff) / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastHintTime]);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hints, isGeneratingHint]);

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

  const handleRequestHint = () => {
    if (!attachment) return;
    if (hintsUsed >= 3) return;
    if (cooldownRemaining > 0) return;
    if (!hintInput.trim()) return;

    const userQuestion = hintInput.trim();
    setHintInput('');
    setHints(prev => [...prev, { sender: 'user', text: userQuestion }]);
    setIsGeneratingHint(true);
    setHintsUsed(prev => prev + 1);
    setLastHintTime(Date.now());
    setCooldownRemaining(5 * 60);

    setTimeout(() => {
      setIsGeneratingHint(false);
      setHints(prev => [...prev, { 
        sender: 'ai', 
        text: `Based on your attached ${attachment.name}, it looks like you are missing a small condition in your logic. Try reviewing the requirements.` 
      }]);
    }, 2000);
  };

  return (
    <div style={{ ...styles.pane, position: 'relative', zIndex: 1 }}>
      {/* Top Page Popup (Success Notification) */}
      {(isVerified && !closed) && (
        <div style={{
          position: 'absolute',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          background: color.greenWash,
          border: `1px solid ${color.greenEdge}`,
          borderRadius: 16,
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
          zIndex: 50,
          animation: 'slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          width: '90%',
          maxWidth: 400
        }}>
          <div style={{ background: color.green, color: color.surface, padding: 4, borderRadius: '50%', display: 'flex', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <p style={{ ...sansText(500, 14, 1.4), color: color.green, margin: 0 }}>
            Your work is fine and satisfying all conditions. You can put it on LinkedIn and GitHub!
          </p>
          <style>{`
            @keyframes slideDown {
              from { opacity: 0; transform: translate(-50%, -20px); }
              to { opacity: 1; transform: translate(-50%, 0); }
            }
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}

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

      {/* AI Hint Agent Section */}
      {!closed && (
        <section style={{ padding: `0 ${GUTTER}px`, marginTop: 32 }}>
          <div style={{ background: color.surface, border: `1px solid ${color.line2}`, borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 320 }}>
            <div style={{ background: color.surface2, padding: '12px 16px', borderBottom: `1px solid ${color.line2}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...sansText(600, 14), color: color.ink }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
                </svg>
                AI Hint Agent
                <span style={{ ...monoText(500, 11), color: color.muted, padding: '2px 8px', background: color.surface, borderRadius: 12, border: `1px solid ${color.line}`, marginLeft: 4 }}>
                  {hintsUsed}/3 Hints
                </span>
              </div>
              {cooldownRemaining > 0 && (
                <div style={{ ...monoText(500, 12), color: color.amber }}>
                  Next hint in {Math.floor(cooldownRemaining / 60)}:{String(cooldownRemaining % 60).padStart(2, '0')}
                </div>
              )}
            </div>
            
            <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
              {hints.length === 0 && (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ ...sansText(400, 13), color: color.muted2, margin: '8px 0', textAlign: 'center' }}>
                    {!attachment ? 'Upload your code file first so I can analyze it and help you.' : 'Ask a question about your code. You have 3 hints available.'}
                  </p>
                </div>
              )}
              {hints.map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: h.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    background: h.sender === 'user' ? color.accentWashSoft : color.surface2,
                    border: `1px solid ${h.sender === 'user' ? color.accentEdge : color.line2}`,
                    padding: '8px 12px',
                    borderRadius: h.sender === 'user' ? '12px 4px 12px 12px' : '4px 12px 12px 12px',
                    ...sansText(400, 13, 1.4),
                    color: color.ink,
                    maxWidth: '85%'
                  }}>
                    {h.text}
                  </div>
                </div>
              ))}
              {isGeneratingHint && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                   <div style={{ padding: '8px 12px', borderRadius: '4px 12px 12px 12px', background: color.surface2, border: `1px solid ${color.line2}`, ...sansText(400, 13), color: color.muted }}>
                    Analyzing code...
                   </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            <div style={{ padding: '12px', borderTop: `1px solid ${color.line2}`, display: 'flex', gap: 8, background: color.surface }}>
              <input
                value={hintInput}
                onChange={e => setHintInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRequestHint()}
                placeholder={!attachment ? "Upload .zip to ask..." : (hintsUsed >= 3 ? "No hints left." : (cooldownRemaining > 0 ? "Cooling down..." : "Ask for a hint..."))}
                disabled={!attachment || hintsUsed >= 3 || cooldownRemaining > 0 || isGeneratingHint}
                style={{
                  flex: 1, padding: '12px 16px', borderRadius: 8, border: `1px solid ${color.line}`,
                  background: color.surface2, color: color.ink, ...sansText(400, 13), outline: 'none'
                }}
              />
              <Button 
                size="sm" 
                onClick={handleRequestHint} 
                disabled={!attachment || !hintInput.trim() || hintsUsed >= 3 || cooldownRemaining > 0 || isGeneratingHint}
                style={{ padding: '0 20px' }}
              >
                Ask
              </Button>
            </div>
          </div>
        </section>
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

      {/* Verification Checks Block - Conditionally rendered to prevent gap */}
      {day.requirements.length > 0 && (isVerifying || isVerified || closed) && (
        <section 
          style={{
            ...styles.checks, 
            animation: 'fadeInUp 0.6s ease forwards'
          }}
        >
          <p style={{ ...labelTight, color: color.accent }}>02 · BUILD IT</p>
          <h2 style={styles.checksTitle}>
            {numberWord(day.requirements.length)} things must be true
          </h2>

          <div style={styles.checkList}>
            {day.requirements.map((req, i) => {
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
