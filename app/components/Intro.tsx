'use client';

import { useEffect, useRef } from 'react';

/**
 * The opening beat, once per session on the home page, never longer than
 * 2.5 s and skippable at any moment.
 *
 * A hairline horizon draws across the screen; the green dot rises from
 * below it and settles as the wordmark's period; the letters surface
 * through the line. The overlay then fades to reveal the world, whose
 * masthead sits in exactly the same place, so nothing jumps. The boot
 * script sets `html[data-intro="play"]` before first paint (only when the
 * session has not seen it, the page is `/`, and motion is allowed), which
 * is what shows the overlay and starts its CSS keyframes; this component
 * decides when it ends and tells the rest of the page.
 */
export default function Intro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const finishRef = useRef<(fast: boolean) => void>(() => {});

  useEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    if (!root) return;
    if (html.dataset.intro !== 'play') {
      root.hidden = true;
      return;
    }

    const MIN_MS = 1600;
    const MAX_MS = 2500;
    const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));
    const worldReady = new Promise<void>((resolve) => {
      if (html.dataset.world) resolve();
      else window.addEventListener('jnwync:world', () => resolve(), { once: true });
    });
    const fontsReady: Promise<unknown> = document.fonts ? document.fonts.ready : Promise.resolve();

    let finished = false;
    let exitTimer = 0;
    const finish = (fast: boolean) => {
      if (finished) return;
      finished = true;
      html.dataset.intro = 'exit';
      root.classList.add(fast ? 'intro--exit-fast' : 'intro--exit');
      exitTimer = window.setTimeout(() => {
        try {
          sessionStorage.setItem('jnwync-intro', '1');
        } catch {
          // Private mode: the intro simply plays again next time.
        }
        delete html.dataset.intro;
        window.dispatchEvent(new Event('jnwync:intro-done'));
        // Hidden, never removed: React owns this node, and pulling it out
        // from under it makes the next client navigation throw on unmount.
        root.hidden = true;
      }, fast ? 240 : 640);
    };
    finishRef.current = finish;

    Promise.race([Promise.all([worldReady, fontsReady, sleep(MIN_MS)]), sleep(MAX_MS)]).then(() => finish(false));

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') finish(true);
    };
    const onSkip = () => finish(true);
    window.addEventListener('keydown', onKey);
    root.addEventListener('pointerdown', onSkip);
    root.addEventListener('wheel', onSkip, { passive: true });
    root.addEventListener('touchstart', onSkip, { passive: true });

    return () => {
      window.removeEventListener('keydown', onKey);
      root.removeEventListener('pointerdown', onSkip);
      root.removeEventListener('wheel', onSkip);
      root.removeEventListener('touchstart', onSkip);
      window.clearTimeout(exitTimer);
    };
  }, []);

  return (
    <div ref={rootRef} className="intro-root">
      <div className="intro" aria-hidden="true">
        <span className="intro-horizon" />
        <div className="intro-mast">
          <div className="section-shell">
            <p className="hero-mast">
              {'jnwync'.split('').map((letter, index) => (
                <span key={index} className="il" style={{ '--i': index } as React.CSSProperties}>
                  {letter}
                </span>
              ))}
              <span className="intro-dot">.</span>
            </p>
          </div>
        </div>
      </div>
      <button type="button" className="intro-skip" onClick={() => finishRef.current(true)}>
        Skip intro
      </button>
    </div>
  );
}
