'use client';

import { useRouter } from 'next/navigation';
import { trackOptions } from '../../../lib/mockData';
import { color, sansText, screen, GUTTER } from '../../../styles/tokens';

const styles = {
  header: {
    padding: `32px ${GUTTER}px 24px`,
  },
  title: {
    ...sansText(700, 28, 1.15),
    color: color.ink,
    letterSpacing: '-.03em',
    margin: '0 0 12px',
  },
  subtitle: {
    ...sansText(400, 15, 1.5),
    color: color.muted2,
    margin: 0,
  },
  trackGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: `0 ${GUTTER}px 32px`,
  },
  trackCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 20px',
    background: color.surface,
    border: `1px solid ${color.line}`,
    borderRadius: 16,
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
  trackCardHover: {
    borderColor: color.accentEdge,
    background: color.accentWashSoft,
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px rgba(0,0,0,0.2), 0 0 0 1px ${color.accentEdge}`,
  },
  trackTitle: {
    ...sansText(600, 16),
    color: color.ink,
    marginBottom: 4,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackDesc: {
    ...sansText(400, 13, 1.4),
    color: color.muted,
  },
};

export default function TrackSelectionPage() {
  const router = useRouter();

  const handleTrackSelect = (e, trackId) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <main style={{ ...screen, animation: 'fadeIn 0.4s ease-out', position: 'relative' }}>
      <header style={styles.header}>
        <h1 style={styles.title}>Pick your track</h1>
        <p style={styles.subtitle}>
          Based on the AI gap analysis, select the domain you want to master. We&apos;ll tailor your daily tasks to match.
        </p>
      </header>

      <section style={styles.trackGrid} aria-label="Available tracks">
        {trackOptions.map((track) => (
          <a
            key={track.id}
            href="/dashboard"
            onClick={(e) => handleTrackSelect(e, track.id)}
            style={styles.trackCard}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, styles.trackCardHover);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = color.line;
              e.currentTarget.style.background = color.surface;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={styles.trackTitle}>
              {track.title}
              <span style={{ color: color.accent, fontSize: 18 }}>→</span>
            </div>
            <div style={styles.trackDesc}>{track.desc}</div>
          </a>
        ))}
      </section>
    </main>
  );
}
