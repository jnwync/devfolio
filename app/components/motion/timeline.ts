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
import { buildHero } from './scenes/hero';
import { buildStack } from './scenes/stack';
import { measureOrbStart, orbAt, world, writeWorldVars } from '../world/state';
import { trackPointer } from '../world/pointer';

export { MOTION_MARKER };

gsap.registerPlugin(ScrollTrigger);

let started = false;

export async function startMotion(): Promise<void> {
  if (started) return;
  started = true;
  const html = document.documentElement;

  ScrollTrigger.config({ ignoreMobileResize: true });

  // Wheel smoothing on fine pointers only; keyboard and touch stay native.
  if (html.dataset.fine) {
    try {
      const { default: Lenis } = await import('lenis');
      const lenis = new Lenis({ autoRaf: false, lerp: 0.1, smoothWheel: true, syncTouch: false });
      addFrame((time) => lenis.raf(time * 1000));
      lenis.on('scroll', ScrollTrigger.update);
      world.scrollTo = (target, options) => {
        const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target instanceof Element ? (target as HTMLElement) : Number(target);
        if (el === null) return;
        lenis.scrollTo(el, { immediate: options?.immediate, offset: options?.offset ?? 0 });
      };
      trackPointer();
      // QA handle: lets the screenshot and audit scripts read the store and Lenis.
      (window as unknown as { __jnwync?: unknown }).__jnwync = { world, lenis };
    } catch {
      // Lenis is an enhancement; native scrolling is fine.
    }
  }

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

  // Derivations shared by both worlds, then the custom properties the 2D
  // path reads (written only when something moved).
  let lastKey = '';
  addFrame(() => {
    const o = orbAt(world.hour, world.orbStart, world.horizon);
    world.orb.x = o.x;
    world.orb.y = o.y;
    world.orb.r = world.orbStart.r;
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
