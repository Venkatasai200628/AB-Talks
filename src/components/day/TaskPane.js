import Button from '../ui/Button';
import HoverLink from '../ui/HoverLink';
import { TOTAL_DAYS } from '../../lib/mockData';
import { numberWord } from '../../lib/numberWord';
import { bareList, color, eyebrow, GUTTER, label, monoText, sansText } from '../../styles/tokens';

const styles = {
  pane: { display: 'flex', flexDirection: 'column', flex: 1 },
  brief: { padding: `20px ${GUTTER}px 0` },
  title: {
    ...sansText(700, 25, 1.18),
    color: color.ink,
    letterSpacing: '-.03em',
    margin: '11px 0 0',
  },
  lead: { ...sansText(400, 14, 1.6), color: color.ink4, margin: '11px 0 0' },
  section: {
    margin: `22px ${GUTTER}px 0`,
    paddingTop: 16,
    borderTop: `1px solid ${color.line2}`,
  },
  sectionHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  count: { ...monoText(400, 10.5), color: color.faint },
  sectionLead: { ...sansText(400, 12.5, 1.5), color: color.muted, margin: '0 0 14px' },
  reqs: { ...bareList, display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 },
  req: { display: 'flex', gap: 10 },
  dot: { flex: 'none', ...monoText(400, 13), color: color.accent },
  reqText: { ...sansText(400, 13.5, 1.5), color: color.ink3 },
  docs: { display: 'flex', flexDirection: 'column', gap: 10 },
  doc: {
    display: 'block',
    padding: '14px 16px',
    background: color.surface,
    border: '1px solid rgba(255,255,255,.08)',
    borderRadius: 12,
    transition: 'border-color .15s ease',
  },
  docHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  docTitle: { ...sansText(600, 13.5), color: color.ink },
  docSource: { flex: 'none', ...monoText(400, 11), color: color.accent },
  docBody: { ...sansText(400, 12.5, 1.45), color: color.muted, margin: '6px 0 0' },
  trap: {
    marginTop: 12,
    padding: '12px 14px',
    background: color.accentWashSoft,
    borderLeft: `2px solid ${color.accent}`,
    borderRadius: '0 10px 10px 0',
    ...sansText(400, 12.5, 1.5),
    color: color.ink3,
  },
  cta: { padding: `22px ${GUTTER}px 12px` },
};

export default function TaskPane({ day, trackLabel, onNext }) {
  return (
    <div style={styles.pane}>
      <section style={styles.brief}>
        <p style={eyebrow}>
          DAY {day.id} OF {TOTAL_DAYS} · {trackLabel} · ~{day.estimateMinutes} MIN
        </p>
        <h1 style={styles.title}>{day.title}</h1>
        <p style={styles.lead}>{day.brief}</p>
      </section>

      {day.requirements.length > 0 && (
        <section style={styles.section}>
          <h2 style={label}>WHAT TO BUILD</h2>
          <ul style={styles.reqs}>
            {day.requirements.map((req) => (
              <li style={styles.req} key={req.brief}>
                <span style={styles.dot} aria-hidden="true">
                  ·
                </span>
                <span style={styles.reqText}>{req.brief}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {day.docs.length > 0 && (
        <section style={styles.section}>
          <div style={styles.sectionHead}>
            <h2 style={label}>DOCS FOR TODAY</h2>
            <span style={styles.count}>
              {day.docs.length} READS · ~{day.readMinutes} MIN
            </span>
          </div>
          <p style={styles.sectionLead}>
            {numberWord(day.docs.length)} concepts you&apos;ll need. Read these before you open the
            editor.
          </p>

          <div style={styles.docs}>
            {day.docs.map((doc) => (
              <HoverLink
                key={doc.url}
                href={doc.url}
                external
                style={styles.doc}
                hoverStyle={{ borderColor: color.accentEdge }}
              >
                <div style={styles.docHead}>
                  <span style={styles.docTitle}>{doc.title}</span>
                  <span style={styles.docSource}>{doc.source} ↗</span>
                </div>
                <p style={styles.docBody}>{doc.body}</p>
              </HoverLink>
            ))}
          </div>

          {day.trap && (
            <p style={styles.trap}>
              <b style={{ color: color.ink }}>The trap:</b> {day.trap}
            </p>
          )}
        </section>
      )}

      <div style={styles.cta}>
        <Button onClick={onNext}>Go to Build →</Button>
      </div>
    </div>
  );
}
