import { TOTAL_DAYS } from '../../lib/mockData';
import { numberWord } from '../../lib/numberWord';

export default function TaskPane({ day, trackLabel, onNext }) {
  return (
    <div className="pane">
      <section className="brief">
        <p className="eyebrow">
          DAY {day.id} OF {TOTAL_DAYS} · {trackLabel} · ~{day.estimateMinutes} MIN
        </p>
        <h1 className="brief__title">{day.title}</h1>
        <p className="brief__lead">{day.brief}</p>
      </section>

      {day.requirements.length > 0 && (
        <section className="section">
          <h2 className="label">WHAT TO BUILD</h2>
          <ul className="reqs">
            {day.requirements.map((req) => (
              <li className="req" key={req.brief}>
                <span className="req__dot" aria-hidden="true">
                  ·
                </span>
                <span className="req__text">{req.brief}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {day.docs.length > 0 && (
        <section className="section">
          <div className="section__head">
            <h2 className="label">DOCS FOR TODAY</h2>
            <span className="section__count">
              {day.docs.length} READS · ~{day.readMinutes} MIN
            </span>
          </div>
          <p className="section__lead">
            {numberWord(day.docs.length)} concepts you&apos;ll need. Read these before you open the
            editor.
          </p>

          <div className="docs">
            {day.docs.map((doc) => (
              <a
                key={doc.url}
                className="doc"
                href={doc.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="doc__head">
                  <span className="doc__title">{doc.title}</span>
                  <span className="doc__source">{doc.source} ↗</span>
                </div>
                <p className="doc__body">{doc.body}</p>
              </a>
            ))}
          </div>

          {day.trap && (
            <p className="trap">
              <b>The trap:</b> {day.trap}
            </p>
          )}
        </section>
      )}

      <div className="pane__cta">
        <button type="button" className="btn btn--primary" onClick={onNext}>
          Go to Build →
        </button>
      </div>
    </div>
  );
}
