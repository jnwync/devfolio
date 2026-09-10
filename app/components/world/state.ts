/**
 * The one frame store for the world.
 *
 * A plain mutable object, deliberately not React state: GSAP tweens its
 * numbers on scroll, the WebGL loop and the 2D orb read them every frame,
 * and DOM-side effects (the Experience axis, CSS variables) subscribe to a
 * per-frame callback. Nothing on the frame path allocates or re-renders.
 *
 * Coordinates are normalised to the viewport (0..1, y down) unless noted.
 * This module has no dependencies so both the motion and world bundles can
 * share it without pulling each other in.
 */

export interface Ripple {
  x: number;
  y: number;
  /** Birth time in seconds on the world clock (performance.now() / 1000). */
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
  /** Orb (sun or moon) position, radius (fraction of viewport height) and visibility. */
  orb: { x: number; y: number; r: number; on: number };
  /** Where the orb starts: the hero wordmark's period, at scroll 0. */
  orbStart: { x: number; y: number; r: number };
  /** Pointer in viewport units; `active` decays to 0 when the pointer rests. */
  pointer: { x: number; y: number; active: number };
  ripples: Ripple[];
  /** The shadow an opaque plate casts on the water: the band above its top
   *  edge, in viewport units with y measured from the top. */
  dim: { x: number; y: number; w: number; h: number; amount: number };
  /** The beacon (the wordmark dot in the closing plate). */
  beacon: { x: number; y: number; on: number };
  /** Points of light (the stack): x, y from top, strength, hover; LIGHT_SLOTS × 4. */
  lights: number[];
  /** How many of the light slots are live this frame. */
  lightCount: number;
  /** Progress 0..1 per scene id, written by the scroll timeline. */
  progress: Record<string, number>;
  /** Scene currently owning the viewport centre. */
  section: string;
  /** Scroll the page; wraps Lenis when present, native otherwise. */
  scrollTo: (target: number | string | Element, options?: { immediate?: boolean; offset?: number }) => void;
}

export type FrameHook = (time: number, delta: number) => void;

const MAX_RIPPLES = 8;
/** Light slots the shader loops over; the stack has fourteen tools. */
export const LIGHT_SLOTS = 14;

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
  lights: new Array(LIGHT_SLOTS * 4).fill(0),
  lightCount: 0,
  progress: {},
  section: 'hero',
  scrollTo: (target, options) => {
    if (typeof window === 'undefined') return;
    const el = typeof target === 'string' ? document.querySelector(target) : target instanceof Element ? target : null;
    // Match Lenis exactly: the nav clearance comes from the root's
    // scroll-padding-top plus the target's own scroll-margin-top, so a
    // jump lands in the same place whether or not the motion bundle is
    // loaded, and native anchors agree with both.
    const margin = el ? parseFloat(getComputedStyle(el).scrollMarginTop) || 0 : 0;
    const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const top = el
      ? el.getBoundingClientRect().top + window.scrollY - margin - padding + (options?.offset ?? 0)
      : Number(target) + (options?.offset ?? 0);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce || options?.immediate ? 'auto' : 'smooth' });
  },
};

/**
 * Per-frame hooks. The ticker (motion bundle) drives them; the world bundle
 * adds its renderer here without importing the ticker, so neither bundle
 * depends on the other.
 */
export const frameHooks = new Set<FrameHook>();

/** Shared clock in seconds, used for ripples and shader time. */
export const clock = () => (typeof performance !== 'undefined' ? performance.now() / 1000 : 0);

/** Add a ripple at a viewport-normalised point, keeping the newest eight. */
export function addRipple(x: number, y: number, strength = 1): void {
  if (world.ripples.length >= MAX_RIPPLES) world.ripples.shift();
  world.ripples.push({ x, y, t: clock(), strength });
}

/** Position on the orb's day arc for a given hour (0..1), in viewport units. */
export function orbAt(hour: number, start: { x: number; y: number }, horizon: number): { x: number; y: number } {
  // Quadratic Bézier from the wordmark's period up and over to the right,
  // setting on the horizon at the far right. Leaning right keeps the light
  // out of the text column for most of the page.
  const h = Math.min(1, Math.max(0, hour));
  const p1x = 0.98;
  const p1y = -0.14;
  const p2x = 0.9;
  const p2y = horizon;
  const u = 1 - h;
  return {
    x: u * u * start.x + 2 * u * h * p1x + h * h * p2x,
    y: u * u * start.y + 2 * u * h * p1y + h * h * p2y,
  };
}

/**
 * Where the orb starts: the period of the hero masthead, measured in
 * viewport units at scroll 0. Called on mount, after fonts load, and on
 * resize. Returns false when the masthead is not on the page.
 */
let metricsCanvas: HTMLCanvasElement | null = null;

export function measureOrbStart(): boolean {
  const dot = document.querySelector<HTMLElement>('[data-masthead] .wordmark-dot');
  if (!dot) return false;
  const r = dot.getBoundingClientRect();
  const cs = getComputedStyle(dot);
  const fs = parseFloat(cs.fontSize) || 16;
  const vw = window.innerWidth || 1;
  const vh = window.innerHeight || 1;

  // The span's box is the font's whole content area; the period's ink is a
  // small square on the baseline. Canvas text metrics in the same font give
  // the ink box, so the orb sits exactly on the glyph. Fallbacks are
  // Bricolage Grotesque's approximate proportions.
  let inkAbove = fs * 0.16;
  let inkBelow = 0;
  let inkLeft = fs * 0.05;
  let inkRight = fs * 0.21;
  let descent = fs * 0.25;
  try {
    metricsCanvas ||= document.createElement('canvas');
    const ctx = metricsCanvas.getContext('2d');
    if (ctx) {
      ctx.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
      const m = ctx.measureText('.');
      if (m.actualBoundingBoxAscent > 0) {
        inkAbove = m.actualBoundingBoxAscent;
        inkBelow = m.actualBoundingBoxDescent;
        inkLeft = -m.actualBoundingBoxLeft;
        inkRight = m.actualBoundingBoxRight;
      }
      if (m.fontBoundingBoxDescent > 0) descent = m.fontBoundingBoxDescent;
    }
  } catch {
    // Metrics unsupported: the fallbacks above are close enough.
  }
  const baseline = r.bottom - descent;
  world.orbStart = {
    x: (r.left + (inkLeft + inkRight) / 2) / vw,
    y: (baseline - (inkAbove - inkBelow) / 2 + window.scrollY) / vh,
    r: Math.max(5, (inkAbove + inkBelow) * 0.36) / vh,
  };
  return true;
}

/** Write the geometry the 2D fallback reads (the GL path reads the store directly). */
export function writeWorldVars(): void {
  const s = document.documentElement.style;
  s.setProperty('--horizon', `${(world.horizon * 100).toFixed(2)}svh`);
  s.setProperty('--orb-x', `${(world.orb.x * 100).toFixed(2)}vw`);
  s.setProperty('--orb-y', `${(world.orb.y * 100).toFixed(2)}svh`);
  s.setProperty('--orb-r', `${(world.orb.r * window.innerHeight).toFixed(1)}px`);
  s.setProperty('--orb-on', world.orb.on.toFixed(3));
}
