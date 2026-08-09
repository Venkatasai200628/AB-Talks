'use client';

import { useIsWide } from '../lib/useViewport';
import { color } from '../styles/tokens';

/**
 * On a phone, the app fills the viewport — that's the real product. On a
 * wider screen, filling the viewport with a 430px column of content and
 * bare black on both sides reads as broken, not as a design choice. So past
 * the breakpoint this frames the same screens as a phone-width card:
 * rounded, shadowed, floating on a dark backdrop with a soft glow behind
 * it — the standard treatment for a mobile-first product viewed on desktop.
 *
 * Nothing inside the card changes. Every screen ships the identical markup
 * at any width; only the frame around it does.
 */

const backdrop = {
  minHeight: '100dvh',
  display: 'flex',
  justifyContent: 'center',
  background: '#000',
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
  background: color.bg,
  display: 'flex',
  flexDirection: 'column',
};

const cardWide = {
  minHeight: 800,
  borderRadius: 32,
  overflow: 'hidden',
  boxShadow: '0 48px 120px -36px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.07)',
};

export default function AppShell({ children }) {
  const isWide = useIsWide();

  return (
    <div style={isWide ? { ...backdrop, ...backdropWide } : backdrop}>
      <div style={isWide ? { ...card, ...cardWide } : { ...card, minHeight: '100dvh' }}>
        {children}
      </div>
    </div>
  );
}
