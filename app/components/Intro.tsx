'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Branded intro: `jnwync.` sweeps from faint to ink as the page settles, the
 * dot pops green, then the wordmark morphs into its slot in the navigation
 * while the screen splits open onto the hero.
 *
 * Orchestration lives on <html data-intro>: an inline script in the layout
 * sets "play" before paint (first visit per session, motion allowed), this
 * component flips it to "done", and CSS keys the hero stagger + nav wordmark
 * off those states. Without JS or with reduced motion the attribute never
 * appears and the page renders statically.
 */
export default function Intro() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const finish = () => setGone(true);
    const timers: number[] = [];

    if (html.dataset.intro !== 'play') {
      timers.push(window.setTimeout(finish, 0));
      return () => timers.forEach((t) => window.clearTimeout(t));
    }

    try {
      sessionStorage.setItem('jnwync-intro', '1');
    } catch {
      // Private mode: the intro simply plays again next time.
    }

    // Wait for the sweep + dot pop, then morph and reveal.
    timers.push(
      window.setTimeout(() => {
        const mark = rootRef.current?.querySelector<HTMLElement>('.intro-mark');
        const target = document.getElementById('nav-wordmark');

        rootRef.current?.classList.add('intro--open');
        html.dataset.intro = 'done';

        if (mark && target) {
          const from = mark.getBoundingClientRect();
          const to = target.getBoundingClientRect();
          const dx = to.left - from.left;
          const dy = to.top - from.top;
          const scale = to.height / from.height;
          try {
            mark.animate(
              [
                { transform: 'translate(0, 0) scale(1)' },
                { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
              ],
              { duration: 700, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', fill: 'forwards' }
            );
          } catch {
            // Older browsers: the curtains still open; just remove the overlay.
          }
        }

        timers.push(window.setTimeout(finish, 950));
      }, 1450)
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  if (gone) return null;

  return (
    <div ref={rootRef} className="intro" aria-hidden="true">
      <div className="intro-panel intro-panel--top" />
      <div className="intro-panel intro-panel--bottom" />
      <div className="intro-center">
        <span className="intro-name">Jon Wayne Cabusbusan</span>
        <span className="intro-mark">
          jnwync<span className="wordmark-dot">.</span>
        </span>
      </div>
    </div>
  );
}
