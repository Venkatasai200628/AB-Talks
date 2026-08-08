'use client';

import Link from 'next/link';
import { useHover } from '../../lib/useHover';

/**
 * A link whose style changes on hover. `hoverStyle` is merged over `style`
 * while the pointer (or keyboard focus) is on it.
 */
export default function HoverLink({ href, style, hoverStyle, external = false, children, ...rest }) {
  const [hovered, hoverProps] = useHover();
  const styles = { textDecoration: 'none', ...style, ...(hovered ? hoverStyle : null) };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" style={styles} {...hoverProps} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} style={styles} {...hoverProps} {...rest}>
      {children}
    </Link>
  );
}
