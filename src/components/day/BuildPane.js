'use client';

import { useEffect, useRef, useState } from 'react';
import { numberWord } from '../../lib/numberWord';

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
    <div className="pane">
      <section className="session">
        <p className="eyebrow eyebrow--wide">
          {closed ? `DAY ${day.id} · CLOSED` : `WORKING ON DAY ${day.id}`}
        </p>
        <p className="session__clock">{closed ? (submittedAt ?? '—') : formatClock(elapsed)}</p>
        <p className="session__note">
          {closed ? 'submitted and counted' : `estimate was ${day.estimateMinutes} minutes`}
        </p>
      </section>

      {!closed && (
        <div className="session__actions">
          <input
            ref={fileInput}
            type="file"
            onChange={handleFile}
            hidden
            aria-hidden="true"
            tabIndex={-1}
          />
          <button
            type="button"
            className="btn btn--quiet btn--sm"
            onClick={() => fileInput.current?.click()}
          >
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)' }} aria-hidden="true">
              ↑
            </span>
            Upload
          </button>
          <button type="button" className="btn btn--primary btn--sm" onClick={onNext}>
            I&apos;m done →
          </button>
        </div>
      )}

      {!closed && attachment && (
        <div className="attach">
          <div>
            <p className="label label--tight">ATTACHED</p>
            <p className="attach__name">
              {attachment.name} · {formatSize(attachment.size)}
            </p>
          </div>
          <button
            type="button"
            className="attach__remove"
            onClick={() => setAttachment(null)}
            aria-label={`Remove ${attachment.name}`}
          >
            ×
          </button>
        </div>
      )}

      {day.requirements.length > 0 && (
        <section className="checks">
          <p className="label label--tight" style={{ color: 'var(--accent)' }}>
            02 · BUILD IT
          </p>
          <h2 className="checks__title">
            {numberWord(day.requirements.length)} things must be true
          </h2>

          <div className="checks__list">
            {day.requirements.map((req, i) => {
              const done = Boolean(checks[i]);
              return (
                <button
                  key={req.check}
                  type="button"
                  className="check"
                  role="checkbox"
                  aria-checked={closed ? true : done}
                  disabled={closed}
                  onClick={() => onToggleCheck(i)}
                >
                  <span className="check__box" aria-hidden="true">
                    {closed || done ? '✓' : ''}
                  </span>
                  <span className="check__label">{req.check}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <div className="pane__cta" style={{ paddingTop: 20 }}>
        <button type="button" className="btn btn--primary" onClick={onNext}>
          {closed ? 'See what you sent →' : 'Go to Submit →'}
        </button>
      </div>
    </div>
  );
}
