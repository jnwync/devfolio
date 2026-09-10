'use client';

import { useEffect, useRef } from 'react';

/**
 * The field behind the page: a fixed, transparent canvas that paints three
 * particle layers and moves them at 10–20% of scroll distance while the
 * content scrolls at full speed. Everything is procedural — no assets.
 *
 * Dark weather: crisp starlight in three depths (far layers smaller, fainter,
 * slower). Light weather: the same engine drawing soft bokeh motes with a
 * radial falloff, so distance reads as depth of field instead of a void.
 *
 * Each layer is pre-rendered once to an offscreen canvas and tiled
 * vertically, so a frame is a handful of drawImage calls regardless of
 * particle count. Under prefers-reduced-motion the field renders once and
 * never moves; below 768px it uses fewer particles and a capped DPR. Without
 * JavaScript the wrapper's CSS atmosphere still renders.
 */

type Weather = 'dark' | 'light';

interface LayerSpec {
  /** Fraction of scroll distance this layer travels. */
  rate: number;
  /** Viewport px² per particle. */
  density: number;
  size: [number, number];
  alpha: [number, number];
  /** Radial falloff (bokeh) instead of a crisp point (star). */
  soft: boolean;
  /** "r,g,b" triplets, picked uniformly. */
  palette: string[];
}

const STAR = ['244,242,232', '244,242,232', '244,242,232', '236,236,226', '176,230,196'];
// Sunlit dust: warm gold, soft sage, and white glints — never gray on paper.
const MOTE_FAR = ['238,214,160', '176,204,180', '255,250,236'];
const MOTE_NEAR = ['255,250,236', '255,250,236', '240,222,176', '184,210,188'];

const WEATHER: Record<Weather, LayerSpec[]> = {
  dark: [
    { rate: 0.1, density: 7800, size: [0.5, 1.0], alpha: [0.16, 0.34], soft: false, palette: STAR },
    { rate: 0.145, density: 13500, size: [0.8, 1.4], alpha: [0.26, 0.5], soft: false, palette: STAR },
    { rate: 0.19, density: 30000, size: [1.0, 1.9], alpha: [0.38, 0.72], soft: false, palette: STAR },
  ],
  light: [
    { rate: 0.1, density: 52000, size: [20, 44], alpha: [0.06, 0.12], soft: true, palette: MOTE_FAR },
    { rate: 0.14, density: 40000, size: [8, 18], alpha: [0.1, 0.18], soft: true, palette: MOTE_FAR },
    { rate: 0.18, density: 30000, size: [2.5, 6], alpha: [0.22, 0.4], soft: true, palette: MOTE_NEAR },
  ],
};

interface Layer {
  canvas: HTMLCanvasElement;
  rate: number;
}

/** mulberry32 — deterministic, so a rebuild never re-rolls the sky. */
function prng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function paintParticle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, a: number, color: string, soft: boolean) {
  if (soft) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(${color},${a})`);
    g.addColorStop(0.55, `rgba(${color},${a * 0.45})`);
    g.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = g;
  } else {
    ctx.fillStyle = `rgba(${color},${a})`;
  }
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function buildLayer(spec: LayerSpec, w: number, h: number, dpr: number, seed: number, sparsity: number): Layer {
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(w * dpr);
  canvas.height = Math.ceil(h * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) return { canvas, rate: spec.rate };
  ctx.scale(dpr, dpr);

  const rand = prng(seed);
  const count = Math.round((w * h) / (spec.density * sparsity));

  for (let i = 0; i < count; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const r = spec.size[0] + rand() * (spec.size[1] - spec.size[0]);
    const a = spec.alpha[0] + rand() * (spec.alpha[1] - spec.alpha[0]);
    const color = spec.palette[Math.floor(rand() * spec.palette.length)];
    paintParticle(ctx, x, y, r, a, color, spec.soft);
    // Mirror particles that straddle the tile edge so the wrap is seamless.
    if (y < r) paintParticle(ctx, x, y + h, r, a, color, spec.soft);
    if (y > h - r) paintParticle(ctx, x, y - h, r, a, color, spec.soft);
  }

  return { canvas, rate: spec.rate };
}

export default function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compact = window.matchMedia('(max-width: 767px)');

    let layers: Layer[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let resizeTimer = 0;

    const weather = (): Weather => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

    const draw = () => {
      raf = 0;
      // The GL world replaces this canvas on the home page; skip the work.
      if (document.documentElement.dataset.world === 'gl') return;
      const y = reduceMotion.matches ? 0 : window.scrollY;
      ctx.clearRect(0, 0, w, h);
      for (const layer of layers) {
        const shift = (y * layer.rate) % h;
        ctx.drawImage(layer.canvas, 0, -shift, w, h);
        if (shift > 0) ctx.drawImage(layer.canvas, 0, h - shift, w, h);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const build = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, compact.matches ? 1.5 : 2);
      canvas.width = Math.ceil(w * dpr);
      canvas.height = Math.ceil(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const sparsity = compact.matches ? 1.8 : 1;
      layers = WEATHER[weather()].map((spec, i) => buildLayer(spec, w, h, dpr, 1201 + i * 7919, sparsity));
      draw();
      canvas.style.opacity = '1';
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        // Ignore the small height changes from a mobile URL bar; rebuild otherwise.
        if (canvas.clientWidth !== w || Math.abs(canvas.clientHeight - h) > 120) build();
      }, 150);
    };

    const themeWatch = new MutationObserver((records) => {
      // Rebuild on a theme change; redraw when the GL world hands back.
      if (records.some((r) => r.attributeName === 'data-theme')) build();
      else schedule();
    });
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-world'] });

    build();
    window.addEventListener('resize', onResize);
    if (!reduceMotion.matches) window.addEventListener('scroll', schedule, { passive: true });

    return () => {
      themeWatch.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', schedule);
      window.clearTimeout(resizeTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="atmosphere" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="block h-full w-full opacity-0 transition-opacity duration-700 ease-out"
      />
    </div>
  );
}
