import { color, monoText } from '../styles/tokens';

const SIZE = 72;
const RADIUS = 31;
const STROKE = 7;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ProgressRing({ percent }) {
  const offset = CIRCUMFERENCE * (1 - Math.min(Math.max(percent, 0), 100) / 100);
  const center = SIZE / 2;

  return (
    <div style={{ position: 'relative', width: SIZE, height: SIZE, flex: 'none' }}>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ display: 'block' }}
        aria-hidden="true"
      >
        <circle
          cx={center}
          cy={center}
          r={RADIUS}
          fill="none"
          stroke={color.track}
          strokeWidth={STROKE}
        />
        <circle
          cx={center}
          cy={center}
          r={RADIUS}
          fill="none"
          stroke={color.accent}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE.toFixed(1)}
          strokeDashoffset={offset.toFixed(1)}
          transform={`rotate(-90 ${center} ${center})`}
          style={{ transition: 'stroke-dashoffset .8s cubic-bezier(.22,1,.36,1)' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...monoText(700, 17),
          color: color.ink,
          letterSpacing: '-.03em',
        }}
      >
        {percent}
        <span style={{ fontSize: 10, color: color.muted2 }}>%</span>
      </div>
    </div>
  );
}
