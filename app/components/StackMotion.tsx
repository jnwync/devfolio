'use client';

import { useEffect } from 'react';

/**
 * Scroll-driven 3D settle for the stack row. Each icon starts scattered in
 * depth (translateZ, a slight Y-axis turn, a small vertical drift) and eases
 * flat as the row travels from the bottom of the viewport to its upper
 * third. Progress is a pure function of scroll position, so scrolling back
 * down re-scatters it and nothing ever runs on a clock. Once settled, a
 * damped scroll velocity leans the icons a few degrees, so the row keeps
 * responding without ever leaving its resting place.
 *
 * Depth is read from scale and rotation only: the lateral drift that a
 * perspective projection would add to off-centre items is cancelled
 * analytically (translate by -offset·z/perspective), so neighbouring labels
 * never cross.
 *
 * Reduced motion: no listener, no transforms — the CSS also pins the items
 * flat. Below 768px the amplitude is roughly halved.
 */

interface Seed {
  z: number;
  ry: number;
  y: number;
  delay: number;
  dir: 1 | -1;
}

function prng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFor(index: number): Seed {
  const rand = prng(97 + index * 7331);
  const forward = rand() < 0.22;
  return {
    // Mostly pushed back into the field; roughly one in five sits slightly forward.
    z: forward ? 20 + rand() * 40 : -60 - rand() * 200,
    ry: (rand() * 2 - 1) * 24,
    // No vertical drift: depth reads from scale and turn alone, never as jitter.
    y: 0,
    delay: rand() * 0.4,
    dir: index % 2 === 0 ? 1 : -1,
  };
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export default function StackMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const field = document.querySelector<HTMLElement>('[data-stack-field]');
    if (!field) return;
    const items = Array.from(field.querySelectorAll<HTMLElement>('[data-stack-item]'));
    if (items.length === 0) return;

    const compact = window.matchMedia('(max-width: 767px)');
    const seeds = items.map((_, i) => seedFor(i));
    // Only the decorative glyph fades with distance; the label stays at full
    // contrast so the row is readable at every point of the settle.
    const glyphs = items.map((el) => el.querySelector<HTMLElement>('.stack-glyph'));

    // Each item's offset from the field's perspective origin, measured with
    // transforms cleared so the numbers describe layout, not the current pose.
    let perspective = 1100;
    let offsets: { dx: number; dy: number }[] = [];
    const measure = () => {
      items.forEach((el) => (el.style.transform = ''));
      const style = getComputedStyle(field);
      perspective = parseFloat(style.perspective) || 1100;
      const [ox, oy] = style.perspectiveOrigin.split(' ').map(parseFloat);
      const rect = field.getBoundingClientRect();
      const originX = rect.left + (Number.isFinite(ox) ? ox : rect.width / 2);
      const originY = rect.top + (Number.isFinite(oy) ? oy : rect.height * 0.4);
      offsets = items.map((el) => {
        const r = el.getBoundingClientRect();
        return { dx: r.left + r.width / 2 - originX, dy: r.top + r.height / 2 - originY };
      });
    };

    let raf = 0;
    let lastY = window.scrollY;
    let velocity = 0;
    let idle = 0;

    const tick = () => {
      const vh = window.innerHeight;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      velocity += (dy - velocity) * 0.18;

      const rect = field.getBoundingClientRect();
      const onScreen = rect.bottom > -200 && rect.top < vh + 200;

      if (onScreen) {
        const amp = compact.matches ? 0.45 : 1;
        // 0 as the row's top reaches the bottom edge, 1 once it is 42% up the viewport.
        const p = clamp((vh - rect.top) / (vh * 0.58), 0, 1);
        const lean = clamp(velocity * 0.05, -5, 5) * amp;

        items.forEach((el, i) => {
          const s = seeds[i];
          const o = offsets[i];
          const pi = clamp((p - s.delay) / (1 - s.delay), 0, 1);
          const e = 1 - Math.pow(1 - pi, 3);
          const k = (1 - e) * amp;
          const z = s.z * k;
          const ry = s.ry * k + lean * s.dir;
          // Cancel the projection's lateral pull so depth reads as scale, not drift.
          const tx = (-o.dx * z) / perspective;
          const ty = (-o.dy * z) / perspective + s.y * k;
          el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg)`;
          const glyph = glyphs[i];
          if (glyph) glyph.style.opacity = (0.55 + 0.45 * e).toFixed(3);
        });
      }

      idle = Math.abs(dy) > 0.1 || Math.abs(velocity) > 0.15 ? 0 : idle + 1;
      raf = idle < 24 ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (!raf) {
        lastY = window.scrollY;
        raf = requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      measure();
      wake();
    };

    measure();
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', onResize);
    wake();

    return () => {
      window.removeEventListener('scroll', wake);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
      items.forEach((el, i) => {
        el.style.transform = '';
        const glyph = glyphs[i];
        if (glyph) glyph.style.opacity = '';
      });
    };
  }, []);

  return null;
}
