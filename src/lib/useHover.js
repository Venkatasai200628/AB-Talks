'use client';

import { useState } from 'react';

/**
 * Inline styles have no :hover, so hover is tracked in React state.
 * Returns [hovered, propsToSpread].
 */
export function useHover() {
  const [hovered, setHovered] = useState(false);

  return [
    hovered,
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setHovered(true),
      onBlur: () => setHovered(false),
    },
  ];
}
