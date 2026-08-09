'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import { useChallenge } from '../../lib/challengeState';
import { color, GUTTER, monoText, sansText, screen, labelTight } from '../../styles/tokens';

const styles = {
  head: {
    padding: `24px ${GUTTER}px 12px`,
  },
  title: {
    ...sansText(700, 24, 1.1),
    color: color.ink,
    letterSpacing: '-.03em',
    margin: '0 0 8px',
  },
  guide: {
    ...sansText(400, 14, 1.5),
    color: color.muted2,
    margin: 0,
    padding: '12px 14px',
    background: color.surface,
    borderLeft: `2px solid ${color.accent}`,
    borderRadius: '0 10px 10px 0',
  },
  podiumContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 16,
    padding: `24px ${GUTTER}px 40px`,
    borderBottom: `1px solid ${color.line2}`,
  },
  podiumSpot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  podiumAvatar: {
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...sansText(700, 16),
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    marginBottom: 8,
  },
  podiumName: {
    ...sansText(600, 13),
    color: color.ink,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  },
  podiumStreak: {
    ...monoText(600, 11),
    color: color.accent,
    marginTop: 4,
  },
  leagueSection: {
    padding: `24px ${GUTTER}px 40px`,
  },
  leagueTitle: {
    ...labelTight,
    color: color.ink2,
    marginBottom: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    background: color.surface,
    borderRadius: 12,
    border: `1px solid ${color.line2}`,
    marginBottom: 8,
  },
  rowActive: {
    background: color.accentWashSoft,
    borderColor: color.accentEdge,
  },
  avatarSm: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: color.surface3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...sansText(600, 12),
    color: color.ink,
    marginRight: 12,
  },
  name: {
    flex: 1,
    ...sansText(600, 14),
    color: color.ink,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  streakPill: {
    ...monoText(600, 12),
    color: color.accent,
    background: color.accentWashSoft,
    padding: '4px 8px',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
};

const RANDOM_NAMES = [
  'Arjun Patel', 'Diya Sharma', 'Rohan Gupta', 'Sneha Reddy', 
  'Vikram Singh', 'Ananya Desai', 'Karan Mehta', 'Priya Kumar',
  'Rahul Verma', 'Nisha Joshi', 'Amit Shah', 'Kavya Menon'
];

function generatePodiumUser(rank) {
  const nameIndex = (rank * 13) % RANDOM_NAMES.length;
  const name = RANDOM_NAMES[nameIndex];
  const initials = name.split(' ').map(n => n[0]).join('');
  const streak = rank === 1 ? 52 : rank === 2 ? 48 : 45;
  return { rank, name, initials, streak, isCurrentUser: false };
}

function generateLeagueUser(seed, minStreak, maxStreak) {
  const nameIndex = (seed * 17) % RANDOM_NAMES.length;
  const name = RANDOM_NAMES[nameIndex];
  const initials = name.split(' ').map(n => n[0]).join('');
  const streak = Math.floor(minStreak + (seed % (maxStreak - minStreak)));
  return { name, initials, streak, isCurrentUser: false };
}

function Podium({ users }) {
  const [second, first, third] = [
    users.find(u => u.rank === 2),
    users.find(u => u.rank === 1),
    users.find(u => u.rank === 3)
  ];

  return (
    <div style={styles.podiumContainer}>
      {/* Rank 2 */}
      <div style={styles.podiumSpot}>
        <div style={{ ...styles.podiumAvatar, width: 48, height: 48, background: 'linear-gradient(135deg, #F0F0F0, #B0B0B0)', color: '#333', border: '2px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 24px rgba(176,176,176,0.3)' }}>
          {second?.initials}
        </div>
        <div style={styles.podiumName}>{second?.name}</div>
        <div style={styles.podiumStreak}>{second?.streak} 🔥</div>
      </div>
      
      {/* Rank 1 */}
      <div style={{ ...styles.podiumSpot, marginBottom: 20 }}>
        <div style={{ fontSize: 28, marginBottom: -12, zIndex: 10, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}>👑</div>
        <div style={{ ...styles.podiumAvatar, width: 64, height: 64, background: 'linear-gradient(135deg, #FFEF78, #D4AF37)', color: '#6A4A00', border: '3px solid #FFF', boxShadow: '0 12px 32px rgba(212,175,55,0.4)' }}>
          {first?.initials}
        </div>
        <div style={{...styles.podiumName, fontSize: 15, fontWeight: 700}}>{first?.name}</div>
        <div style={{...styles.podiumStreak, fontSize: 12}}>{first?.streak} 🔥</div>
      </div>

      {/* Rank 3 */}
      <div style={styles.podiumSpot}>
        <div style={{ ...styles.podiumAvatar, width: 48, height: 48, background: 'linear-gradient(135deg, #E6A87C, #A0522D)', color: '#4A1C04', border: '2px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 24px rgba(160,82,45,0.3)' }}>
          {third?.initials}
        </div>
        <div style={styles.podiumName}>{third?.name}</div>
        <div style={styles.podiumStreak}>{third?.streak} 🔥</div>
      </div>
    </div>
  );
}

function LeagueRow({ user }) {
  return (
    <div style={{ ...styles.row, ...(user.isCurrentUser ? styles.rowActive : {}) }}>
      <div style={{ ...styles.avatarSm, background: user.isCurrentUser ? color.accent : color.surface3, color: user.isCurrentUser ? color.accentInk : color.ink }}>
        {user.initials}
      </div>
      <div style={styles.name}>
        {user.name} {user.isCurrentUser && '(You)'}
      </div>
      <div style={styles.streakPill}>
        {user.streak} <span style={{fontSize: 14}}>🔥</span>
      </div>
    </div>
  );
}

function Leaderboard() {
  const stateKey = useSearchParams().get('state');
  const { student } = useChallenge(stateKey);

  const podiumData = useMemo(() => [
    generatePodiumUser(1), generatePodiumUser(2), generatePodiumUser(3)
  ], []);

  const leagueData = useMemo(() => {
    let myLeague = null;
    let minStreak = 1;
    let maxStreak = 9;
    let title = "🌱 The Starters";

    if (student.streak >= 30) {
      minStreak = 30; maxStreak = 44;
      title = "🔥 The Unstoppables (30+ Days)";
    } else if (student.streak >= 10) {
      minStreak = 10; maxStreak = 29;
      title = "⚡ The Consistent (10-29 Days)";
    }

    const peers = [];
    // Generate more users so the board feels heavily populated!
    for (let i = 1; i <= 15; i++) {
      peers.push(generateLeagueUser(i * 7, minStreak, maxStreak));
    }
    
    // Sort peers descending by streak
    peers.sort((a, b) => b.streak - a.streak);

    // Insert current user into peers if they have a streak
    if (student.streak > 0) {
      const me = {
        name: student.name,
        initials: student.initials,
        streak: student.streak,
        isCurrentUser: true,
      };
      
      const insertIndex = peers.findIndex(p => p.streak <= student.streak);
      if (insertIndex === -1) peers.push(me);
      else peers.splice(insertIndex, 0, me);
    }

    return { title, peers };
  }, [student]);

  return (
    <main style={screen}>
      <header style={styles.head}>
        <h1 style={styles.title}>Consistency Board</h1>
        <p style={styles.guide}>
          The best engineers aren't the fastest; they're the most consistent. Build your streak to climb the leagues!
        </p>
      </header>

      <Podium users={podiumData} />

      <section style={styles.leagueSection}>
        <h2 style={styles.leagueTitle}>
          {leagueData.title}
        </h2>

        {leagueData.peers.length > 0 ? (
          leagueData.peers.map((user, idx) => (
            <LeagueRow key={`${user.name}-${idx}`} user={user} />
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '20px', ...sansText(400, 14), color: color.muted }}>
            Complete Day 1 to enter a league.
          </div>
        )}
      </section>
    </main>
  );
}

export default function LeaderboardPage() {
  return (
    <Suspense fallback={<main style={screen} />}>
      <Leaderboard />
    </Suspense>
  );
}
