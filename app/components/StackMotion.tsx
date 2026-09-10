'use client';

import { useEffect } from 'react';
import { clamp, measureField, poseFor, seedFor, settleProgress, transformFor } from './stackMath';

/**
 * Standalone fallback for the stack row's 3D settle. The motion bundle's
 * stack scene drives the same pose (plus the points of light) once it is
 * ready; this loop only runs until then, or for good if that bundle never
 * arrives. Progress is a pure function of scroll position, so scrolling
 * back down re-scatters it and nothing ever runs on a clock. Once settled,
 * a damped scroll velocity leans the icons a few degrees.
 *
 * Reduced motion: no listener, no transforms — the CSS also pins the items
 * flat. Below 768px the amplitude is roughly halved.
 */
export default function StackMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const html = document.documentElement;
    const field = document.querySelector<HTMLElement>('[data-stack-field]');
    if (!field) return;
    const items = Array.from(field.querySelectorAll<HTMLElement>('[data-stack-item]'));
    if (items.length === 0) return;

    const compact = window.matchMedia('(max-width: 767px)');
    const seeds = items.map((_, i) => seedFor(i));
    // Only the decorative glyph fades with distance; the label stays at full
    // contrast so the row is readable at every point of the settle.
    const glyphs = items.map((el) => el.querySelector<HTMLElement>('.stack-glyph'));

    let layout = measureField(field, items);
    let raf = 0;
    let lastY = window.scrollY;
    let velocity = 0;
    let idle = 0;

    const tick = () => {
      // The scene has taken over: stop writing, keep nothing scheduled.
      if (html.dataset.motionReady) {
        raf = 0;
        return;
      }
      const vh = window.innerHeight;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      velocity += (dy - velocity) * 0.18;

      const rect = field.getBoundingClientRect();
      const onScreen = rect.bottom > -200 && rect.top < vh + 200;

      if (onScreen) {
        const amp = compact.matches ? 0.45 : 1;
        const p = settleProgress(rect.top, vh);
        const lean = clamp(velocity * 0.05, -5, 5) * amp;
        items.forEach((el, i) => {
          const pose = poseFor(seeds[i], layout.offsets[i], p, amp, lean, layout.perspective);
          el.style.transform = transformFor(pose);
          const glyph = glyphs[i];
          if (glyph) glyph.style.opacity = (0.55 + 0.45 * pose.e).toFixed(3);
        });
      }

      idle = Math.abs(dy) > 0.1 || Math.abs(velocity) > 0.15 ? 0 : idle + 1;
      raf = idle < 24 ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (!raf && !html.dataset.motionReady) {
        lastY = window.scrollY;
        raf = requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      if (html.dataset.motionReady) return;
      layout = measureField(field, items);
      wake();
    };

    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', onResize);
    wake();

    return () => {
      window.removeEventListener('scroll', wake);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
      if (!html.dataset.motionReady) {
        items.forEach((el, i) => {
          el.style.transform = '';
          const glyph = glyphs[i];
          if (glyph) glyph.style.opacity = '';
        });
      }
    };
  }, []);

  return null;
}
