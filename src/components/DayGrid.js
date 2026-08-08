import HoverLink from './ui/HoverLink';
import { color, GUTTER, labelTight, monoText } from '../styles/tokens';

const ROWS = 7;
const CELL = 27;
const DAY_LABELS = ['M', '', 'W', '', 'F', '', 'S'];

const styles = {
  card: {
    boxSizing: 'border-box',
    margin: `20px ${GUTTER}px 0`,
    padding: '16px 16px 14px',
    background: color.surface,
    border: `1px solid ${color.line}`,
    borderRadius: 16,
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  hint: { ...monoText(400, 10.5), color: color.faint },
  body: { display: 'flex', gap: 6 },
  weekdays: {
    display: 'grid',
    gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
    gap: 4,
    flex: 'none',
    paddingRight: 2,
    ...monoText(400, 9),
    color: color.muted3,
  },
  cells: {
    display: 'grid',
    gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
    gridAutoColumns: `${CELL}px`,
    gridAutoFlow: 'column',
    gap: 4,
  },
  cell: { borderRadius: 6, display: 'block' },
  today: {
    borderRadius: 6,
    background: '#1A1A1E',
    boxShadow: `inset 0 0 0 1.5px ${color.accent}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...monoText(700, 10),
    color: color.accent,
  },
  foot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    ...monoText(400, 9.5),
    color: color.muted3,
  },
  legendSwatch: { width: 11, height: 11, borderRadius: 3, display: 'block' },
};

const cellHover = { outline: `1.5px solid ${color.line3}`, outlineOffset: 1 };

/**
 * The 60-day contribution grid. Columns are weeks, rows are weekdays, and the
 * shade of a cell is how much that day shipped.
 */
export default function DayGrid({ totalDays, currentDay, leadingPad, outputLevel }) {
  const columns = Math.ceil((leadingPad + totalDays) / ROWS);

  const cells = Array.from({ length: columns * ROWS }, (_, i) => {
    const day = i - leadingPad + 1;
    return day >= 1 && day <= totalDays ? day : null;
  });

  return (
    <section style={styles.card} aria-label="60-day grid">
      <header style={styles.head}>
        <span style={labelTight}>60-DAY GRID</span>
        <span style={styles.hint}>shade = output</span>
      </header>

      <div style={styles.body}>
        <div style={styles.weekdays} aria-hidden="true">
          {DAY_LABELS.map((day, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
              {day}
            </span>
          ))}
        </div>

        <div style={styles.cells}>
          {cells.map((day, i) => {
            if (day === null) {
              return (
                <i key={i} style={{ ...styles.cell, background: 'transparent' }} aria-hidden="true" />
              );
            }

            if (day === currentDay) {
              return (
                <HoverLink
                  key={i}
                  href={`/day/${day}`}
                  style={styles.today}
                  hoverStyle={cellHover}
                  aria-label={`Day ${day}, today`}
                >
                  {day}
                </HoverLink>
              );
            }

            if (day > currentDay) {
              return (
                <i key={i} style={{ ...styles.cell, background: color.grid[0] }} aria-hidden="true" />
              );
            }

            const level = outputLevel(day);
            return (
              <HoverLink
                key={i}
                href={`/day/${day}`}
                style={{ ...styles.cell, background: color.grid[level] }}
                hoverStyle={cellHover}
                aria-label={`Day ${day}, ${level ? 'shipped' : 'missed'}`}
              />
            );
          })}
        </div>
      </div>

      <footer style={styles.foot}>
        <span>WEEK 1 → WEEK {columns}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span>Less</span>
          {color.grid.map((shade) => (
            <i key={shade} style={{ ...styles.legendSwatch, background: shade }} />
          ))}
          <span>More</span>
        </div>
      </footer>
    </section>
  );
}
