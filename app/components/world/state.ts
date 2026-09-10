/**
 * The one frame store for the world.
 *
 * A plain mutable object, deliberately not React state: GSAP tweens its
 * numbers on scroll, the WebGL loop and the 2D orb read them every frame,
 * and DOM-side effects (the Experience axis, CSS variables) subscribe to a
 * per-frame callback. Nothing on the frame path allocates or re-renders.
 *
 * Coordinates are normalised to the viewport (0..1, y down) unless noted.
 */

export interface Ripple {
  x: number;
  y: number;
  /** Birth time in seconds (gsap.ticker time). */
  t: number;
  strength: number;
}

export interface WorldState {
  /** Document scroll position in px. */
  scroll: number;
  /** Smoothed scroll velocity in px per frame. */
  velocity: number;
  /** Position along the day arc: 0 rising, 0.5 zenith, 1 setting. */
  hour: number;
  /** Theme blend: 0 night, 1 day. Tweened on theme change. */
  day: number;
  /** Horizon line as a fraction of viewport height from the top. */
  horizon: number;
  /** Orb (sun or moon) position and visibility. */
  orb: { x: number; y: number; r: number; on: number };
  /** Where the orb starts: the hero wordmark's period. */
  orbStart: { x: number; y: number; r: number };
  /** Pointer in viewport units; `active` fades to 0 when the pointer leaves. */
  pointer: { x: number; y: number; active: number };
  ripples: Ripple[];
  /** Darkening rectangle under an opaque plate (viewport units). */
  dim: { x: number; y: number; w: number; h: number; amount: number };
  /** The beacon (the wordmark dot in the closing plate). */
  beacon: { x: number; y: number; on: number };
  /** Progress 0..1 per scene id, written by the scroll timeline. */
  progress: Record<string, number>;
  /** Scene currently owning the viewport centre. */
  section: string;
  /** Scroll the page; wraps Lenis when present, native otherwise. */
  scrollTo: (target: number | string | Element, options?: { immediate?: boolean; offset?: number }) => void;
}

export type FrameListener = (state: WorldState, time: number, delta: number) => void;

const MAX_RIPPLES = 8;

export const world: WorldState = {
  scroll: 0,
  velocity: 0,
  hour: 0,
  day: 0,
  horizon: 0.62,
  orb: { x: 0.5, y: 0.6, r: 0.02, on: 0 },
  orbStart: { x: 0.5, y: 0.6, r: 0.02 },
  pointer: { x: 0.5, y: 0.5, active: 0 },
  ripples: [],
  dim: { x: 0, y: 0, w: 0, h: 0, amount: 0 },
  beacon: { x: 0.5, y: 0.5, on: 0 },
  progress: {},
  section: 'hero',
  scrollTo: (target, options) => {
    if (typeof window === 'undefined') return;
    const el = typeof target === 'string' ? document.querySelector(target) : target instanceof Element ? target : null;
    const top = el ? el.getBoundingClientRect().top + window.scrollY + (options?.offset ?? 0) : Number(target) + (options?.offset ?? 0);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce || options?.immediate ? 'auto' : 'smooth' });
  },
};

const listeners = new Set<FrameListener>();

/** Subscribe to the per-frame tick. Returns an unsubscribe function. */
export function subscribe(listener: FrameListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Called once per frame by the ticker. */
export function publish(time: number, delta: number): void {
  listeners.forEach((listener) => listener(world, time, delta));
}

/** Add a ripple at a viewport-normalised point, keeping the newest eight. */
export function addRipple(x: number, y: number, t: number, strength = 1): void {
  if (world.ripples.length >= MAX_RIPPLES) world.ripples.shift();
  world.ripples.push({ x, y, t, strength });
}

/** Position on the orb's day arc for a given hour (0..1), in viewport units. */
export function orbAt(hour: number, start: { x: number; y: number }, horizon: number): { x: number; y: number } {
  // Quadratic Bézier from the wordmark's period, over the zenith, down to the
  // horizon on the right. Clamped so the orb never leaves the frame.
  const h = Math.min(1, Math.max(0, hour));
  const p0x = start.x;
  const p0y = start.y;
  const p1x = 0.55;
  const p1y = -0.15;
  const p2x = 0.86;
  const p2y = horizon;
  const u = 1 - h;
  return {
    x: u * u * p0x + 2 * u * h * p1x + h * h * p2x,
    y: u * u * p0y + 2 * u * h * p1y + h * h * p2y,
  };
}
