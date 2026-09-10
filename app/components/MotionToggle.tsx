'use client';

import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'jnwync-motion';

type State = 'hidden' | 'full' | 'reduce';

function subscribe(onChange: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getSnapshot(): State {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'hidden';
  return document.documentElement.dataset.motion === 'reduce' ? 'reduce' : 'full';
}

const getServerSnapshot = (): State => 'hidden';

/**
 * "Calm this down" for visitors who have not set a system preference but
 * would rather read than watch. The choice is stored and read by the boot
 * script before first paint, which is also what decides whether the motion
 * bundle loads at all — so applying it means reloading, and the button says
 * so rather than pretending otherwise.
 *
 * It is deliberately absent when the operating system already asks for
 * reduced motion: that preference wins, and offering to override it here
 * would produce a page that is half animated (the CSS still honours the
 * system query) and half not.
 */
export default function MotionToggle({ className = '' }: { className?: string }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (state === 'hidden') return null;

  const next = state === 'full' ? 'reduce' : 'full';
  const label = state === 'full' ? 'Reduce motion' : 'Restore motion';

  return (
    <button
      type="button"
      className={`motion-toggle ${className}`.trim()}
      title={`${label} and reload the page`}
      onClick={() => {
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // Private mode: nothing to persist, so there is nothing to apply.
          return;
        }
        window.location.reload();
      }}
    >
      {label}
    </button>
  );
}
