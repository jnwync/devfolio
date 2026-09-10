/**
 * The site has exactly one animation loop: GSAP's ticker. Everything that
 * needs a frame (Lenis, the scroll derivations, the WebGL world through
 * the store's frame hooks) registers here instead of calling
 * requestAnimationFrame itself, so the work is ordered, batched, and
 * pauses together when the tab is hidden.
 *
 * Importing this module pulls in GSAP core, so it lives in the `motion`
 * bundle and is only loaded for visitors without reduced motion.
 */

import { gsap } from 'gsap';
import { clock, frameHooks, world } from '../world/state';

export const MOTION_MARKER = '__jnwync_motion__';

type Frame = (time: number, delta: number) => void;

const frames = new Set<Frame>();
let running = false;
let lastScroll = 0;

function tick(_time: number, deltaTime: number) {
  const time = clock();
  const delta = deltaTime / 1000;
  const scroll = window.scrollY;
  world.velocity += (scroll - lastScroll - world.velocity) * 0.18;
  world.scroll = scroll;
  lastScroll = scroll;

  // Decay pointer activity and expire ripples older than three seconds.
  world.pointer.active += (0 - world.pointer.active) * 0.04;
  if (world.ripples.length && time - world.ripples[0].t > 3) {
    world.ripples = world.ripples.filter((r) => time - r.t < 3);
  }

  frames.forEach((frame) => frame(time, delta));
  frameHooks.forEach((hook) => hook(time, delta));
}

/** Register a per-frame callback (Lenis, derivations); starts the loop. */
export function addFrame(frame: Frame): () => void {
  frames.add(frame);
  start();
  return () => {
    frames.delete(frame);
  };
}

export function start(): void {
  if (running) return;
  running = true;
  lastScroll = window.scrollY;
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.add(tick);
}

export function stop(): void {
  if (!running) return;
  running = false;
  gsap.ticker.remove(tick);
}
