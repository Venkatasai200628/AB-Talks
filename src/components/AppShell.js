'use client';

import { Suspense } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useIsWide } from '../lib/useViewport';
import { color } from '../styles/tokens';
import BottomNav from './BottomNav';

const backdrop = {
  height: '100dvh',
  display: 'flex',
  justifyContent: 'center',
  background: '#000',
  overflow: 'hidden',
};

const backdropWide = {
  alignItems: 'center',
  padding: '56px 24px',
  background: [
    'radial-gradient(1100px 620px at 18% -8%, rgba(255,92,43,.14), transparent 60%)',
    'radial-gradient(900px 560px at 100% 108%, rgba(74,222,128,.08), transparent 60%)',
    '#000',
  ].join(', '),
};

const card = {
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: 430,
  height: '100dvh',
  background: color.bg,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
};

const cardWide = {
  height: 800,
  borderRadius: 32,
  overflow: 'hidden',
  boxShadow: '0 48px 120px -36px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.07)',
};

export default function AppShell({ children }) {
  const isWide = useIsWide();
  const pathname = usePathname();
  const router = useRouter();

  // Show back button everywhere except the main entry points
  const showBackButton = pathname && pathname !== '/dashboard' && pathname !== '/onboarding';

  return (
    <div style={isWide ? { ...backdrop, ...backdropWide } : backdrop}>
      <div style={isWide ? { ...card, ...cardWide } : card}>
        {/* Mobile Sunlight Effect restricted to 430px */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at top center, rgba(255, 140, 0, 0.12) 0%, rgba(255, 69, 0, 0.05) 50%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        {/* Global Back Button */}
        {showBackButton && (
          <button
            onClick={() => router.back()}
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              zIndex: 50,
              background: 'rgba(20, 20, 22, 0.6)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${color.line2}`,
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: color.ink,
              transition: 'background 0.2s',
            }}
            aria-label="Go back"
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(20, 20, 22, 0.9)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(20, 20, 22, 0.6)'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
        )}

        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
          {children}
        </div>
        
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Suspense fallback={null}>
            <BottomNav />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
