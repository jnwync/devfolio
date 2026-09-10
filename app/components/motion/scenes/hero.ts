/**
 * Hero scene, over the first viewport of scroll: the camera tilts down to
 * the water (horizon 62% → 45%), the masthead rides the horizon and sinks
 * through it (CSS reads `--hero-p`), the headline compresses on the width
 * axis and lifts a little faster than the page, the portrait hangs back
 * in the sky.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { world } from '../../world/state';

export function buildHero(): void {
  const section = document.querySelector<HTMLElement>('[data-scene="hero"]');
  if (!section) return;
  const heading = section.querySelector<HTMLElement>('#hero-heading');
  const water = section.querySelector<HTMLElement>('[data-hero-water]');
  const portrait = section.querySelector<HTMLElement>('[data-portrait]');

  // Width compression only ever shortens the headline, so reserving its
  // natural height keeps the page below it from shifting mid-scrub.
  const reserve = () => {
    if (!heading) return;
    heading.style.setProperty('--wdth', '100');
    heading.style.minHeight = '';
    heading.style.minHeight = `${heading.offsetHeight}px`;
  };
  ScrollTrigger.addEventListener('refreshInit', reserve);
  reserve();

  // Absolute range: the first viewport of scroll, from the very first pixel
  // (the hero sits below the in-flow nav, so a section trigger would start
  // late and the masthead would lift off the water line before it sinks).
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { start: 0, end: () => window.innerHeight, scrub: 0.5, invalidateOnRefresh: true },
  });

  tl.to(world, { horizon: 0.45, duration: 1 }, 0);
  tl.to(section, { '--hero-p': 1, duration: 1 }, 0);
  if (heading) tl.to(heading, { '--wdth': 88, duration: 0.6 }, 0);
  if (water) tl.to(water, { y: () => -window.innerHeight * 0.1, duration: 1 }, 0);
  if (portrait) tl.to(portrait, { y: () => window.innerHeight * 0.08, duration: 1 }, 0);

  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onUpdate: (self) => {
      world.progress.hero = self.progress;
    },
    onToggle: (self) => {
      if (self.isActive) world.section = 'hero';
    },
  });
}
