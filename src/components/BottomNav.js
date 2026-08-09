'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { color, monoText } from '../styles/tokens';

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '12px 10px 24px',
    background: 'var(--color-surface, #141416)',
    borderTop: `1px solid ${color.line}`,
    position: 'sticky',
    bottom: 0,
    zIndex: 10,
    boxShadow: '0 -10px 40px rgba(0,0,0,0.3)',
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    textDecoration: 'none',
    ...monoText(500, 10.5),
    padding: '8px 12px',
    borderRadius: 12,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

const Icons = {
  Home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Challenge: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Leaderboard: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  Profile: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  const navItems = [
    { name: 'Home', path: '/dashboard' },
    { name: 'Challenge', path: '/day/1' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <nav style={styles.nav}>
      {navItems.map((item) => {
        const isActive = pathname === item.path || (pathname.startsWith('/day/') && item.name === 'Challenge');
        
        return (
          <Link
            key={item.name}
            href={item.path}
            style={{
              ...styles.link,
              color: isActive ? color.accent : color.muted,
              background: isActive ? color.accentWashSoft : 'transparent',
              transform: isActive ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {Icons[item.name]}
            <span style={{ fontWeight: isActive ? 600 : 500 }}>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
