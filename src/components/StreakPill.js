import { borderBox, color, monoText } from '../styles/tokens';

export default function StreakPill({ count, small = false }) {
  const styles = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    flex: 'none',
    padding: small ? '5px 10px' : '6px 11px',
    borderRadius: 99,
    background: color.accentWash,
    border: `1px solid ${color.accentEdge}`,
    ...borderBox,
  };

  return (
    <div style={styles} title={`${count} day streak`}>
      <span style={{ fontSize: small ? 11 : 12, lineHeight: 1 }} aria-hidden="true">
        🔥
      </span>
      <span style={{ ...monoText(700, small ? 12 : 12.5), color: color.accent }}>{count}</span>
    </div>
  );
}
