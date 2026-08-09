'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { color, monoText } from '../styles/tokens';
import { useChallenge } from '../lib/challengeState';

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '8px 8px',
    background: 'var(--color-surface, #141416)',
    border: `1px solid var(--color-line2, rgba(255,255,255,0.1))`,
    borderRadius: 32,
    position: 'absolute',
    bottom: 24,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 48px)',
    zIndex: 100,
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
  navLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    color: color.muted3,
    padding: '6px 16px',
    borderRadius: 24,
    transition: 'all 0.2s ease',
  },
  navLinkActive: {
    color: color.accent,
    background: color.accentWashSoft,
    transform: 'scale(1.05)',
  },
  icon: {
    marginBottom: 4,
  },
  text: {
    ...monoText(600, 10),
  },
};

const Icons = {
  Home: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.icon}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Challenge: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.icon}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Leaderboard: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.icon}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  Profile: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.icon}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

export default function BottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const stateKey = searchParams?.get('state');
  const { student } = useChallenge(stateKey);

  if (!pathname || pathname === '/' || pathname.startsWith('/onboarding')) return null;

  const suffix = stateKey ? `?state=${stateKey}` : '';

  const navItems = [
    { name: 'Home', path: `/dashboard${suffix}` },
    { name: 'Challenge', path: `/day/${student.currentDay}${suffix}` },
    { name: 'Leaderboard', path: `/leaderboard${suffix}` },
    { name: 'Profile', path: `/profile${suffix}` },
  ];

  return (
    <nav style={styles.nav}>
      {navItems.map((item) => {
        const isActive = pathname === item.path || (pathname.startsWith('/day/') && item.name === 'Challenge');
        
        return (
          <Link
            key={item.name}
            href={item.path}
            style={isActive ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}
          >
            {Icons[item.name]}
            <span style={{ ...styles.text, fontWeight: isActive ? 700 : 500 }}>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
