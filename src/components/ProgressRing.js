const SIZE = 72;
const RADIUS = 31;
const STROKE = 7;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ProgressRing({ percent }) {
  const offset = CIRCUMFERENCE * (1 - Math.min(Math.max(percent, 0), 100) / 100);
  const center = SIZE / 2;

  return (
    <div className="ring">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
        <circle
          className="ring__track"
          cx={center}
          cy={center}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
        />
        <circle
          className="ring__fill"
          cx={center}
          cy={center}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE.toFixed(1)}
          strokeDashoffset={offset.toFixed(1)}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="ring__value">
        {percent}
        <span className="ring__pct">%</span>
      </div>
    </div>
  );
}
