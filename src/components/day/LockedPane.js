import Button from '../ui/Button';
import { borderBox, color, GUTTER, monoText, sansText } from '../../styles/tokens';

const styles = {
  pane: { display: 'flex', flexDirection: 'column', flex: 1 },
  card: {
    ...borderBox,
    margin: `20px ${GUTTER}px 0`,
    padding: '24px 20px',
    background: color.surface,
    border: `1.5px solid ${color.line2}`,
    borderRadius: 16,
    textAlign: 'center',
  },
  mark: {
    ...borderBox,
    width: 44,
    height: 44,
    margin: '0 auto',
    borderRadius: '50%',
    background: color.surface2,
    border: `1px solid ${color.line3}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...monoText(700, 15),
    color: color.muted2,
  },
  title: {
    ...sansText(700, 22, 1.2),
    color: color.ink,
    letterSpacing: '-.03em',
    margin: '14px 0 0',
  },
  note: { ...sansText(400, 13, 1.5), color: color.muted, margin: '8px 0 0' },
  cta: { padding: `22px ${GUTTER}px 12px` },
};

/**
 * A day the student has not reached yet, or one that does not exist.
 * Same card as the closed-out state, in a neutral key.
 */
export default function LockedPane({ day, currentDay, exists = true }) {
  const daysAway = day.id - currentDay;

  return (
    <div style={styles.pane}>
      <section style={styles.card}>
        <div style={styles.mark} aria-hidden="true">
          {exists ? '🔒' : '·'}
        </div>

        {exists ? (
          <>
            <h1 style={styles.title}>
              {daysAway === 1 ? 'Opens tomorrow' : `Opens in ${daysAway} days`}
            </h1>
            <p style={styles.note}>
              You&apos;re on day {currentDay}. One new task every midnight — this one waits until
              you get there.
            </p>
          </>
        ) : (
          <>
            <h1 style={styles.title}>No such day</h1>
            <p style={styles.note}>{day.brief}</p>
          </>
        )}
      </section>

      <div style={styles.cta}>
        <Button href="/dashboard">Back to dashboard</Button>
      </div>
    </div>
  );
}
