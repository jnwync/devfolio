/**
 * The scroll timeline. Loaded once, after the intro, for visitors without
 * reduced motion. Owns GSAP + ScrollTrigger, optional Lenis on fine
 * pointers, the day arc (hour 0 → 1 across the document), the scene
 * builders, and the per-frame derivations every world (GL or 2D) reads.
 *
 * Pinning is CSS `position: sticky` in the markup; this file only scrubs
 * numbers, so native scrolling, keyboard and assistive tech are untouched.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { addFrame, MOTION_MARKER } from './ticker';
import { buildMasks } from './masks';
import { buildHero } from './scenes/hero';
import { buildStack } from './scenes/stack';
import { buildWork } from './scenes/work';
import { buildExperience } from './scenes/experience';
import { buildActivity } from './scenes/activity';
import { buildContact } from './scenes/contact';
import { measureOrbStart, orbAt, world, writeWorldVars } from '../world/state';
import { trackPointer } from '../world/pointer';

export { MOTION_MARKER };

gsap.registerPlugin(ScrollTrigger);

let started = false;

export function startMotion(): void {
  if (started) return;
  started = true;
  const html = document.documentElement;

  ScrollTrigger.config({ ignoreMobileResize: true });

  // Scrolling stays native. Smoothing the wheel means interpolating toward
  // where the reader asked to be, which is latency however good it looks;
  // the scenes are already eased by ScrollTrigger's own scrub.
  if (html.dataset.fine) trackPointer();

  // QA handle: lets the screenshot and audit scripts read the frame store.
  (window as unknown as { __jnwync?: unknown }).__jnwync = { world };

  // The day passes across the whole document.
  ScrollTrigger.create({
    start: 0,
    end: () => ScrollTrigger.maxScroll(window),
    onUpdate: (self) => {
      world.hour = self.progress;
    },
  });

  buildHero();
  buildStack();
  buildWork();
  buildExperience();
  buildActivity();
  buildContact();
  buildMasks();

  // Derivations shared by both worlds, then the custom properties the 2D
  // path reads (written only when something moved).
  let lastKey = '';
  const smoothstep = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  addFrame(() => {
    const o = orbAt(world.hour, world.orbStart, world.horizon);
    world.orb.x = o.x;
    world.orb.y = o.y;
    world.orb.r = world.orbStart.r;
    // At rest the period is just the period. The sun or moon lights and
    // lifts away from it as soon as the page moves — coincident and both
    // lit, the green dot would be sitting on its own glow.
    const target = smoothstep(0.003, 0.03, world.hour);
    world.orb.on += (target - world.orb.on) * 0.12;
    const key = `${world.horizon.toFixed(4)}|${o.x.toFixed(4)}|${o.y.toFixed(4)}|${world.orb.on.toFixed(3)}`;
    if (key !== lastKey) {
      lastKey = key;
      writeWorldVars();
    }
  });

  // Keep offsets honest after fonts, images and layout changes.
  const refresh = () => ScrollTrigger.refresh();
  ScrollTrigger.addEventListener('refreshInit', measureOrbStart);
  document.fonts?.ready.then(refresh);
  const heroImage = document.querySelector<HTMLImageElement>('[data-portrait] img');
  heroImage?.decode?.().then(refresh).catch(() => {});
  const main = document.querySelector('main');
  if (main && 'ResizeObserver' in window) {
    let timer = 0;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(refresh, 150);
    });
    observer.observe(main);
  }

  measureOrbStart();
  html.dataset.motionReady = '1';
}
