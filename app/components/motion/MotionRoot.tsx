'use client';

import { useEffect } from 'react';

/**
 * Loads the scroll timeline (GSAP, scenes, optional Lenis) for visitors
 * whose motion tier is `full`, and only once the intro has finished so the
 * first thing that moves is the reveal. Renders nothing.
 */
export default function MotionRoot() {
  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.motion !== 'full') return;
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      import('./timeline').then((mod) => {
        if (!cancelled) mod.startMotion();
      });
    };
    if (html.dataset.intro) {
      window.addEventListener('jnwync:intro-done', start, { once: true });
    } else {
      start();
    }
    return () => {
      cancelled = true;
      window.removeEventListener('jnwync:intro-done', start);
    };
  }, []);

  return null;
}
