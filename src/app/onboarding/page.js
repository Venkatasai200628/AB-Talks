'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { trackOptions, mockReviews } from '../../lib/mockData';
import { color, sansText, monoText, screen, GUTTER, labelTight } from '../../styles/tokens';

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
  reviewsSection: {
    padding: `0 ${GUTTER}px 40px`,
  },
  reviewsHeader: {
    ...labelTight,
    color: color.ink3,
    marginBottom: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  reviewCard: {
    background: color.surface,
    border: `1px solid ${color.line2}`,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  reviewerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  reviewerAvatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: color.surface3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...sansText(600, 13),
    color: color.ink,
  },
  reviewerName: {
    ...sansText(600, 14),
    color: color.ink,
  },
  reviewerTrack: {
    ...monoText(500, 10.5),
    color: color.accent,
    background: color.accentWashSoft,
    padding: '2px 6px',
    borderRadius: 4,
    marginTop: 2,
    display: 'inline-block',
  },
  reviewText: {
    ...sansText(400, 13, 1.5),
    color: color.ink2,
    fontStyle: 'italic',
  }
};

export default function OnboardingPage() {
  const router = useRouter();

  const handleTrackSelect = (e, trackId) => {
    e.preventDefault();
    // In a real app, we would save the track selection to the user's profile here.
    // For now, we'll just navigate to the dashboard.
    router.push('/dashboard');
  };

  return (
    <main style={{ ...screen, animation: 'fadeIn 0.4s ease-out' }}>
      <header style={styles.header}>
        <h1 style={styles.title}>Pick your track</h1>
        <p style={styles.subtitle}>
          Select the domain you want to master. We&apos;ll tailor your daily tasks to match.
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

      <section style={styles.reviewsSection}>
        <h2 style={styles.reviewsHeader}>
          WHAT STUDENTS SAY
          <span style={{ flex: 1, height: 1, background: color.line2 }} />
        </h2>
        
        {mockReviews.map((review) => (
          <div key={review.id} style={styles.reviewCard}>
            <div style={styles.reviewerInfo}>
              <div style={styles.reviewerAvatar}>{review.avatar}</div>
              <div>
                <div style={styles.reviewerName}>{review.name}</div>
                <div style={styles.reviewerTrack}>{review.track} Cohort</div>
              </div>
            </div>
            <p style={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>
          </div>
        ))}
      </section>
    </main>
  );
}
