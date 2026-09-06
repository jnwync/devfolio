'use client';

import { useEffect } from 'react';

/**
 * The one remaining scroll-linked touch on the chrome: the nav wordmark's
 * variable weight eases lighter with scroll velocity and settles back to
 * 700 when scrolling stops. The loop parks itself when idle and never runs
 * under prefers-reduced-motion. Depth on the page itself belongs to the
 * field (Atmosphere) and the stack row (StackMotion).
 */
export default function SceneFx() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const wordmark = document.querySelector<HTMLElement>('#nav-wordmark .wordmark');
    if (!wordmark) return;

    let lastY = window.scrollY;
    let weight = 700;
    let raf = 0;
    let idleFrames = 0;

    const tick = () => {
      const y = window.scrollY;
      const dy = Math.abs(y - lastY);
      lastY = y;

      const target = 700 - Math.min(90, dy * 1.6);
      weight += (target - weight) * 0.18;
      wordmark.style.fontVariationSettings = `'wght' ${weight.toFixed(1)}`;

      idleFrames = dy > 0.1 || Math.abs(700 - weight) > 0.5 ? 0 : idleFrames + 1;
      raf = idleFrames < 30 ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (!raf) {
        lastY = window.scrollY;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('scroll', wake, { passive: true });
    wake();

    return () => {
      window.removeEventListener('scroll', wake);
      if (raf) cancelAnimationFrame(raf);
      wordmark.style.fontVariationSettings = '';
    };
  }, []);

  return null;
}
