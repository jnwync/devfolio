/**
 * Contact: first light.
 *
 * The closing line rises out of the water a word at a time, the rest of
 * the section follows it up, and the period lights last — the same green
 * dot the sun or moon set off from in the hero, now a beacon whose
 * reflection runs down the water beneath it. The day arc has already
 * carried the sky to its warmest by the time you get here; this scene only
 * adds the beacon and the reveal.
 *
 * Nothing reads layout per frame: the beacon's place is cached on refresh
 * and projected from `world.scroll`.
 */

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { addFrame } from '../ticker';
import { world } from '../../world/state';

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const easeOut = (t: number) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);

export function buildContact(): void {
  const section = document.querySelector<HTMLElement>('[data-scene="contact"]');
  if (!section) return;
  const words = Array.from(section.querySelectorAll<HTMLElement>('[data-word]'));
  const tail = section.querySelector<HTMLElement>('[data-contact-tail]');
  const lead = section.querySelector<HTMLElement>('[data-contact-lead]');
  const beaconEl = section.querySelector<HTMLElement>('[data-beacon]');

  let beaconX = 0.5;
  let beaconDocY = 0;
  const measure = () => {
    if (!beaconEl) return;
    const r = beaconEl.getBoundingClientRect();
    const size = parseFloat(getComputedStyle(beaconEl).fontSize) || 16;
    beaconX = (r.left + r.width / 2) / window.innerWidth;
    beaconDocY = r.bottom + window.scrollY - size * 0.2;
  };
  ScrollTrigger.addEventListener('refreshInit', measure);
  measure();

  const lastRise = words.map(() => '');
  let lastTail = '';
  let lit = 0;

  const apply = (p: number) => {
    // Words arrive one after another; the rest of the section follows the
    // last of them, so the email address is the last thing lit.
    words.forEach((word, i) => {
      const rise = 1 - easeOut((p - i * 0.1) / 0.5);
      const key = rise.toFixed(3);
      if (key === lastRise[i]) return;
      lastRise[i] = key;
      word.style.setProperty('--r', key);
    });
    const after = 1 - easeOut((p - 0.42) / 0.45);
    const key = after.toFixed(3);
    if (key !== lastTail) {
      lastTail = key;
      tail?.style.setProperty('--r', key);
      lead?.style.setProperty('--r', (1 - easeOut(p / 0.35)).toFixed(3));
    }
    lit = 1 - after;
    world.progress.contact = p;
  };

  ScrollTrigger.create({
    trigger: section,
    start: 'top 82%',
    end: 'top 22%',
    scrub: 0.5,
    invalidateOnRefresh: true,
    onUpdate: (self) => apply(self.progress),
    onToggle: (self) => {
      if (self.isActive) world.section = 'contact';
    },
  });
  apply(0);

  addFrame(() => {
    const y = (beaconDocY - world.scroll) / window.innerHeight;
    // Only a beacon standing above the water line casts a reflection.
    const onScreen = y > -0.1 && y < 1.1;
    world.beacon.x = beaconX;
    world.beacon.y = y;
    world.beacon.on = onScreen ? lit : 0;
  });
}
