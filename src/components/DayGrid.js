import Link from 'next/link';

const ROWS = 7;
const DAY_LABELS = ['M', '', 'W', '', 'F', '', 'S'];
const LEGEND_SHADES = ['var(--grid-0)', 'var(--grid-1)', 'var(--grid-2)', 'var(--grid-3)', 'var(--grid-4)'];

/**
 * The 60-day contribution grid. Columns are weeks, rows are weekdays, and the
 * shade of a cell is how much that day shipped.
 */
export default function DayGrid({ totalDays, currentDay, leadingPad, outputLevel }) {
  const columns = Math.ceil((leadingPad + totalDays) / ROWS);
  const cellCount = columns * ROWS;

  const cells = Array.from({ length: cellCount }, (_, i) => {
    const day = i - leadingPad + 1;
    return day >= 1 && day <= totalDays ? day : null;
  });

  return (
    <section className="gridcard" aria-label="60-day grid">
      <header className="gridcard__head">
        <span className="label label--tight">60-DAY GRID</span>
        <span className="gridcard__hint">shade = output</span>
      </header>

      <div className="gridcard__body">
        <div className="gridcard__days" aria-hidden="true">
          {DAY_LABELS.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>

        <div className="gridcard__cells">
          {cells.map((day, i) => {
            if (day === null) {
              return <i key={i} className="cell cell--pad" aria-hidden="true" />;
            }

            if (day === currentDay) {
              return (
                <Link
                  key={i}
                  href={`/day/${day}`}
                  className="cell cell--today"
                  aria-label={`Day ${day}, today`}
                >
                  {day}
                </Link>
              );
            }

            const level = outputLevel(day);

            if (day > currentDay) {
              return <i key={i} className="cell" aria-hidden="true" />;
            }

            return (
              <Link
                key={i}
                href={`/day/${day}`}
                className={`cell${level ? ` cell--l${level}` : ''}`}
                aria-label={`Day ${day}, ${level ? 'shipped' : 'missed'}`}
              />
            );
          })}
        </div>
      </div>

      <footer className="gridcard__foot">
        <span>WEEK 1 → WEEK {columns}</span>
        <div className="legend">
          <span>Less</span>
          {LEGEND_SHADES.map((shade) => (
            <i key={shade} style={{ background: shade }} />
          ))}
          <span>More</span>
        </div>
      </footer>
    </section>
  );
}
