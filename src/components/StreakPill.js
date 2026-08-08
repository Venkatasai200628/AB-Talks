export default function StreakPill({ count, small = false }) {
  return (
    <div
      className={`streak-pill${small ? ' streak-pill--sm' : ''}`}
      title={`${count} day streak`}
    >
      <span className="streak-pill__flame" aria-hidden="true">
        🔥
      </span>
      <span className="streak-pill__count">{count}</span>
      <span className="sr-only">day streak</span>
    </div>
  );
}
