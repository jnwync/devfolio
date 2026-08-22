'use client';

import { useEffect } from 'react';

/**
 * Scroll-linked scene depth, one shared rAF loop:
 * - the hero presses back and dims as the dark Work panel slides over it
 * - the contact scene rises, sharpens, and un-dims as the page lifts away
 * - browser frames drift with a light parallax
 * - the nav wordmark's variable weight eases with scroll velocity
 *
 * Transforms and opacity only. The loop parks itself when scrolling stops
 * and everything is inert under prefers-reduced-motion.
 */
export default function SceneFx() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const query = (s: string) => document.querySelector<HTMLElement>(s);
    const heroPress = query('[data-fx="hero-press"]');
    const heroDim = query('[data-fx="hero-dim"]');
    const work = document.getElementById('projects');
    const pageAbove = query('.page-above');
    const contactRise = query('[data-fx="contact-rise"]');
    const contactDim = query('[data-fx="contact-dim"]');
    const wordmark = query('#nav-wordmark .wordmark');
    const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-fx="parallax"]'));

    let lastY = window.scrollY;
    let weight = 700;
    let raf = 0;
    let idleFrames = 0;

    const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

    const tick = () => {
      const vh = window.innerHeight;
      const y = window.scrollY;
      const dy = Math.abs(y - lastY);
      lastY = y;

      if (heroPress && work) {
        const p = clamp01(1 - work.getBoundingClientRect().top / vh);
        heroPress.style.transform = p > 0 ? `translateY(${p * -14}px) scale(${1 - 0.055 * p})` : '';
        if (heroDim) heroDim.style.opacity = (0.38 * p).toFixed(3);
      }

      if (contactRise && pageAbove) {
        const bottom = pageAbove.getBoundingClientRect().bottom;
        const p = clamp01(1 - bottom / vh);
        if (p > 0 || contactRise.style.transform) {
          contactRise.style.transform = `translateY(${((1 - p) * 42).toFixed(1)}px) scale(${(0.96 + 0.04 * p).toFixed(4)})`;
          if (contactDim) contactDim.style.opacity = (0.45 * (1 - p)).toFixed(3);
        }
      }

      for (const el of parallax) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        const mid = r.top + r.height / 2 - vh / 2;
        const speed = parseFloat(el.dataset.speed || '0.05');
        el.style.translate = `0 ${(-mid * speed).toFixed(1)}px`;
      }

      if (wordmark) {
        const target = 700 - Math.min(90, dy * 1.6);
        weight += (target - weight) * 0.18;
        wordmark.style.fontVariationSettings = `'wght' ${weight.toFixed(1)}`;
      }

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
    window.addEventListener('resize', wake);
    wake();

    return () => {
      window.removeEventListener('scroll', wake);
      window.removeEventListener('resize', wake);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
