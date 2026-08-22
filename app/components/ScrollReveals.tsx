'use client';

import { useEffect } from 'react';

/**
 * Adds `.in-view` to every `.rv` element as it enters the viewport, once.
 * The hidden initial state only applies under `html[data-js]`, so content is
 * never lost without JavaScript, and reduced-motion CSS collapses the
 * transition entirely.
 */
export default function ScrollReveals() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.rv'));
    if (elements.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
