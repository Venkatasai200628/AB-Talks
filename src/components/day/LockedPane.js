import Link from 'next/link';

/**
 * A day the student has not reached yet, or one that does not exist.
 * Same card as the closed-out state, in a neutral key.
 */
export default function LockedPane({ day, currentDay, exists = true }) {
  const daysAway = day.id - currentDay;

  return (
    <div className="pane">
      <section className="done done--locked">
        <div className="done__mark" aria-hidden="true">
          {exists ? '🔒' : '·'}
        </div>

        {exists ? (
          <>
            <h1 className="done__title">
              {daysAway === 1 ? 'Opens tomorrow' : `Opens in ${daysAway} days`}
            </h1>
            <p className="done__note">
              You&apos;re on day {currentDay}. One new task every midnight — this one waits until
              you get there.
            </p>
          </>
        ) : (
          <>
            <h1 className="done__title">No such day</h1>
            <p className="done__note">{day.brief}</p>
          </>
        )}
      </section>

      <div className="pane__cta">
        <Link href="/dashboard" className="btn btn--primary">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
