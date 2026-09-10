/**
 * Titles surface. Anything marked `data-mask` is clipped at its own lower
 * edge and rises out of it as it enters, scrubbed by scroll position —
 * the same gesture as the stack crossing the water line, so nothing on the
 * page ever fades up from nowhere.
 *
 * The clip lives in CSS on `.mask-rise`; this only scrubs `--mask` from 1
 * (hidden) to 0 (open). Without the motion bundle the variable is never
 * set, the fallback is 0, and every title is simply visible.
 */

import { gsap } from 'gsap';

export function buildMasks(root: ParentNode = document): void {
  const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-mask]'));
  for (const el of targets) {
    gsap.fromTo(
      el,
      { '--mask': 1 },
      {
        '--mask': 0,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 62%', scrub: 0.4 },
      }
    );
  }
}
