/**
 * Stack scene: fourteen points of light surface into the icon row.
 *
 * The row enters the viewport below the water line (the camera has tilted
 * by then) and scrolls up through it. Each icon's 3D settle runs on the
 * same progress the standalone fallback used, and each icon carries a
 * light in the frame store: while the icon is under the horizon the light
 * is a diffused glow in the water; once it crosses, the light becomes a
 * point behind the glyph with a lane on the water beneath it. The GL
 * shader draws the lights; the 2D world gets a CSS halo per glyph from
 * `--lit`. Hovering an icon (fine pointers) brightens its light.
 *
 * Nothing here reads layout per frame: glyph centres are measured on
 * ScrollTrigger's refresh and projected from `world.scroll`.
 */

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { addFrame } from '../ticker';
import { LIGHT_SLOTS, world } from '../../world/state';
import { clamp, measureField, poseFor, seedFor, settleProgress, transformFor, type Offset } from '../../stackMath';

export function buildStack(): void {
  const section = document.querySelector<HTMLElement>('[data-scene="stack"]');
  const field = section?.querySelector<HTMLElement>('[data-stack-field]');
  if (!section || !field) return;
  const items = Array.from(field.querySelectorAll<HTMLElement>('[data-stack-item]')).slice(0, LIGHT_SLOTS);
  if (!items.length) return;
  const glyphs = items.map((el) => el.querySelector<HTMLElement>('.stack-glyph'));
  const seeds = items.map((_, i) => seedFor(i));
  const compact = window.matchMedia('(max-width: 767px)');
  const fine = !!document.documentElement.dataset.fine;
  const is2d = () => document.documentElement.dataset.world !== 'gl';

  let perspective = 1100;
  let offsets: Offset[] = [];
  let fieldTop = 0;
  let fieldBottom = 0;
  // Glyph centres in document space, measured flat.
  const centres: { x: number; y: number }[] = items.map(() => ({ x: 0, y: 0 }));
  const hover = items.map(() => 0);
  const hoverTarget = items.map(() => 0);
  const lastTransform = items.map(() => '');
  const lastLit = items.map(() => '');
  const lastSub = items.map(() => '');
  const smooth = (t: number) => {
    const c = clamp(t, 0, 1);
    return c * c * (3 - 2 * c);
  };

  const measure = () => {
    const layout = measureField(field, items);
    perspective = layout.perspective;
    offsets = layout.offsets;
    const scroll = window.scrollY;
    const r = field.getBoundingClientRect();
    fieldTop = r.top + scroll;
    fieldBottom = r.bottom + scroll;
    glyphs.forEach((glyph, i) => {
      const g = (glyph ?? items[i]).getBoundingClientRect();
      centres[i] = { x: g.left + g.width / 2, y: g.top + g.height / 2 + scroll };
    });
  };
  ScrollTrigger.addEventListener('refreshInit', measure);
  measure();

  if (fine) {
    items.forEach((el, i) => {
      el.addEventListener('pointerenter', () => (hoverTarget[i] = 1));
      el.addEventListener('pointerleave', () => (hoverTarget[i] = 0));
    });
  }

  let wasOn = false;
  addFrame(() => {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const scroll = world.scroll;
    const top = fieldTop - scroll;
    const onScreen = fieldBottom - scroll > -200 && top < vh + 200;

    if (!onScreen) {
      if (wasOn) {
        world.lightCount = 0;
        wasOn = false;
      }
      return;
    }
    wasOn = true;

    const amp = compact.matches ? 0.45 : 1;
    const p = settleProgress(top, vh);
    const lean = clamp(world.velocity * 0.05, -5, 5) * amp;
    world.progress.stack = p;
    if (p > 0.2 && p < 1) world.section = 'stack';

    const twoD = is2d();
    const horizonPx = world.horizon * vh;
    for (let i = 0; i < items.length; i++) {
      const pose = poseFor(seeds[i], offsets[i], p, amp, lean, perspective);
      const glyphY = centres[i].y - scroll + pose.ty;
      // 1 while the glyph is under the water line, 0 once it has surfaced.
      const sub = smooth((glyphY - horizonPx) / 40 + 0.5);
      const t = transformFor(pose);
      const glyph = glyphs[i];
      const moved = t !== lastTransform[i];
      if (moved) {
        lastTransform[i] = t;
        items[i].style.transform = t;
      }
      const subKey = sub.toFixed(2);
      if (moved || subKey !== lastSub[i]) {
        lastSub[i] = subKey;
        items[i].style.setProperty('--sub', subKey);
        if (glyph) glyph.style.opacity = ((0.55 + 0.45 * pose.e) * (1 - 0.3 * sub)).toFixed(3);
      }
      hover[i] += (hoverTarget[i] - hover[i]) * 0.15;
      const on = pose.e * (0.55 + 0.45 * hover[i]);
      const k = i * 4;
      world.lights[k] = centres[i].x / vw;
      world.lights[k + 1] = glyphY / vh;
      world.lights[k + 2] = on;
      world.lights[k + 3] = hover[i];
      if (twoD) {
        const lit = on.toFixed(2);
        if (lit !== lastLit[i]) {
          lastLit[i] = lit;
          items[i].style.setProperty('--lit', lit);
        }
      }
    }
    world.lightCount = items.length;
  });
}
