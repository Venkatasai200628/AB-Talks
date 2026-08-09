'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useChallenge } from '../../lib/challengeState';
import { TOTAL_DAYS } from '../../lib/mockData';
import { color, GUTTER, monoText, sansText, screen, borderBox, labelTight } from '../../styles/tokens';
import Button from '../../components/ui/Button';

const styles = {
  head: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `32px ${GUTTER}px 24px`,
    textAlign: 'center',
    borderBottom: `1px solid ${color.line2}`,
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    background: color.surface3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...sansText(600, 24),
    color: color.ink,
    marginBottom: 16,
  },
  name: {
    ...sansText(700, 22, 1.1),
    color: color.ink,
    letterSpacing: '-.02em',
    margin: 0,
  },
  meta: {
    ...monoText(400, 12),
    color: color.muted,
    marginTop: 6,
  },
  section: {
    padding: `24px ${GUTTER}px`,
  },
  card: {
    ...borderBox,
    background: color.surface,
    borderRadius: 16,
    padding: 20,
    border: `1px solid ${color.line2}`,
    marginBottom: 16,
  },
  cardTitle: {
    ...sansText(700, 18, 1.2),
    color: color.ink,
    margin: '0 0 8px',
  },
  cardDesc: {
    ...sansText(400, 14, 1.5),
    color: color.muted2,
    margin: '0 0 16px',
  },
  checklist: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  checkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: color.accentWashSoft,
    color: color.accent,
    ...sansText(600, 12),
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
  },
  statBox: {
    background: color.bg,
    border: `1px solid ${color.line}`,
    borderRadius: 12,
    padding: 16,
    textAlign: 'center',
  },
  statValue: {
    ...monoText(700, 28, 1),
    color: color.ink,
    marginBottom: 4,
  },
  statLabel: {
    ...monoText(400, 10),
    color: color.muted2,
  },
  freezeHighlight: {
    background: color.amberWash,
    border: `1px solid ${color.amberEdge}`,
  }
};

function Profile() {
  const stateKey = useSearchParams().get('state');
  const { student, badges } = useChallenge(stateKey);

  // 1. Edge Case: Empty Profile
  if (!student.hasProfile) {
    return (
      <main style={screen}>
        <header style={{ padding: `32px ${GUTTER}px 12px` }}>
          <h1 style={styles.name}>Welcome to ABTalks!</h1>
          <p style={{ ...styles.meta, marginTop: 8, fontSize: 13, lineHeight: 1.5 }}>
            Over the next 60 days, you will build 60 real projects. No tutorials, just code. 
            Before you begin, let's set up your profile.
          </p>
        </header>

        <section style={styles.section}>
          <div style={{ ...styles.card, borderColor: color.accentEdge, background: color.accentWashSoft }}>
            <h2 style={styles.cardTitle}>Onboarding Checklist</h2>
            <p style={styles.cardDesc}>Complete these steps to unlock Day 1.</p>
            
            <div style={styles.checklist}>
              <div style={styles.checkItem}>
                <div style={{ ...styles.checkIcon, background: color.greenWash, color: color.green }}>✓</div>
                <span style={{ ...sansText(500, 14), color: color.ink }}>Sign in with Email</span>
              </div>
              <div style={styles.checkItem}>
                <div style={styles.checkIcon}>2</div>
                <span style={{ ...sansText(500, 14), color: color.ink }}>Connect GitHub account</span>
              </div>
              <div style={styles.checkItem}>
                <div style={styles.checkIcon}>3</div>
                <span style={{ ...sansText(500, 14), color: color.ink }}>Connect LinkedIn account</span>
              </div>
              <div style={styles.checkItem}>
                <div style={styles.checkIcon}>4</div>
                <span style={{ ...sansText(500, 14), color: color.ink }}>Pick your Track</span>
              </div>
            </div>

            <Button style={{ marginTop: 24, width: '100%' }}>Continue Setup →</Button>
          </div>
        </section>
      </main>
    );
  }

  // Common Profile Header
  return (
    <main style={screen}>
      <header style={styles.head}>
        <div style={styles.avatarLarge}>{student.initials}</div>
        <h1 style={styles.name}>{student.name}</h1>
        <div style={styles.meta}>
          {student.trackLabel} {student.cohort ? ` · COHORT ${student.cohort}` : ''}
        </div>
      </header>

      <section style={styles.section}>
        
        {/* 2. Edge Case: Missed Day & Freezes */}
        {student.missed > 0 && student.freezesLeft > 0 && (
          <div style={{ ...styles.card, ...styles.freezeHighlight }}>
            <h2 style={{ ...styles.cardTitle, color: color.amber }}>Protect your streak!</h2>
            <p style={{ ...styles.cardDesc, color: color.ink }}>
              Missing a day happens to the best of us. Progress isn't always a straight line. 
              You missed a deadline, but you have <b>{student.freezesLeft} Freeze(s)</b> available.
            </p>
            <Button style={{ background: color.amber, color: color.bg, width: '100%' }}>
              Use Freeze
            </Button>
          </div>
        )}

        {/* 3. Edge Case: First Day (New) */}
        {student.shipped === 0 && (
          <div style={{ ...styles.card, borderColor: color.greenEdge, background: color.greenWash }}>
            <h2 style={{ ...styles.cardTitle, color: color.green }}>Your journey begins!</h2>
            <p style={{ ...styles.cardDesc, color: color.ink }}>
              You're all set up. Head over to the Dashboard to tackle your very first challenge. 
              Your streak will start once you submit it.
            </p>
          </div>
        )}

        {/* Standard Stats */}
        <h3 style={{ ...labelTight, marginBottom: 12 }}>YOUR STATS</h3>
        <div style={styles.statGrid}>
          <div style={styles.statBox}>
            <div style={styles.statValue}>{student.streak}</div>
            <div style={styles.statLabel}>DAY STREAK</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statValue}>{student.shipped}</div>
            <div style={styles.statLabel}>SHIPPED TOTAL</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statValue}>{student.missed}</div>
            <div style={styles.statLabel}>MISSED DAYS</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statValue}>{student.freezesLeft}</div>
            <div style={styles.statLabel}>FREEZES LEFT</div>
          </div>
        </div>

        {/* Badges */}
        <h3 style={{ ...labelTight, marginTop: 32, marginBottom: 12 }}>EARNED BADGES</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {badges.map(b => (
            <div 
              key={b.label} 
              style={{ 
                ...styles.card, 
                marginBottom: 0, 
                padding: 16, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                borderColor: b.earned ? color.greenEdge : color.line,
                background: b.earned ? color.greenWash : 'transparent',
                opacity: b.earned ? 1 : 0.6
              }}
            >
              <span style={{ ...sansText(600, 14), color: b.earned ? color.green : color.muted }}>{b.label}</span>
              <span>{b.earned ? '✓' : '🔒'}</span>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<main style={screen} />}>
      <Profile />
    </Suspense>
  );
}
