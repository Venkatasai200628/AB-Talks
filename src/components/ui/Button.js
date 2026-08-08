'use client';

import Link from 'next/link';
import { useHover } from '../../lib/useHover';
import { borderBox, color, sansText } from '../../styles/tokens';

const base = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 7,
  width: '100%',
  border: 0,
  padding: 0,
  borderRadius: 12,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'filter .15s ease, background .15s ease, opacity .15s ease',
  ...borderBox,
};

export default function Button({
  variant = 'primary',
  size = 'lg',
  href,
  disabled = false,
  style,
  children,
  ...rest
}) {
  const [hovered, hoverProps] = useHover();
  const lit = hovered && !disabled;

  const skin =
    variant === 'quiet'
      ? {
          background: lit ? '#202024' : color.surface2,
          border: `1px solid ${color.line}`,
          color: color.ink2,
        }
      : {
          background: color.accent,
          color: color.accentInk,
          filter: lit ? 'brightness(1.08)' : 'none',
        };

  const styles = {
    ...base,
    height: size === 'sm' ? 46 : 50,
    ...sansText(600, size === 'sm' ? 14 : 15.5),
    ...skin,
    ...(disabled ? { opacity: 0.4, cursor: 'not-allowed', filter: 'none' } : null),
    ...style,
  };

  if (href) {
    return (
      <Link href={href} style={styles} {...hoverProps} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button style={styles} disabled={disabled} {...hoverProps} {...rest}>
      {children}
    </button>
  );
}
