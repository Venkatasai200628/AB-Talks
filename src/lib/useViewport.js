'use client';

import { useEffect, useState } from 'react';

/**
 * True once the viewport is at least `breakpoint` wide.
 *
 * Starts false so the first client render matches the server's mobile
 * markup exactly — no hydration mismatch — then flips after mount if the
 * viewport is actually wide. There is no CSS media query to do this with,
 * since styling here is plain React style objects.
 */
export function useIsWide(breakpoint = 760) {
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const update = () => setIsWide(query.matches);
    update();

    // matchMedia's own change event doesn't fire in every environment (some
    // embedded webviews and devtools-driven resizes skip it) — a plain
    // resize listener is the fallback that always does.
    query.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => {
      query.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, [breakpoint]);

  return isWide;
}
