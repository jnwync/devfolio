/**
 * Selected work: the page's slow passage.
 *
 * On a viewport with room for it the section pins. One framed window stays
 * put on the right while each project surfaces into it and the previous one
 * travels up and out; the copy on the left cross-fades and drifts with it.
 * Three ticks say where you are and jump between beats. Everywhere else —
 * phones, short windows, reduced motion, no JavaScript — the stage never
 * turns on and the three projects stay stacked articles, which is what the
 * server renders.
 *
 * The plate is opaque and covers the world, so the only thing the scene
 * gives the water is the plate's own shadow: a soft band above its top
 * edge that deepens as it rises into view.
 */

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { addFrame } from '../ticker';
import { world } from '../../world/state';

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

/** The band of water just above a plate, darkened as if in its shadow. */
function plateShadow(plate: HTMLElement): void {
  const HEIGHT = 0.17;
  let top = 0;
  const measure = () => {
    top = plate.getBoundingClientRect().top + window.scrollY;
  };
  ScrollTrigger.addEventListener('refreshInit', measure);
  measure();

  addFrame(() => {
    const pt = (top - world.scroll) / window.innerHeight;
    // Above the viewport the plate covers everything; below 1.4 there is
    // nothing to darken yet.
    if (pt <= 0 || pt > 1.4) {
      world.dim.amount = 0;
      return;
    }
    world.dim.x = 0;
    world.dim.w = 1;
    world.dim.y = pt - HEIGHT;
    world.dim.h = HEIGHT;
    world.dim.amount = 0.5 * smoothstep(1.35, 0.85, pt);
  });
}

export function buildWork(): void {
  const section = document.querySelector<HTMLElement>('[data-scene="work"]');
  if (!section) return;
  plateShadow(section);

  const stage = section.querySelector<HTMLElement>('[data-work-stage]');
  const beats = stage ? Array.from(stage.querySelectorAll<HTMLElement>('[data-work-beat]')) : [];
  if (!stage || beats.length < 2) return;

  // The pinned stage needs a viewport that can hold a whole project at once.
  if (!window.matchMedia('(min-width: 1024px) and (min-height: 740px)').matches) return;

  const html = document.documentElement;
  html.dataset.stageWork = 'on';
  const rail = section.querySelector<HTMLElement>('[data-work-rail]');
  const jumps = rail ? Array.from(rail.querySelectorAll<HTMLButtonElement>('[data-work-jump]')) : [];
  if (rail) rail.hidden = false;

  const n = beats.length;
  const navH = document.querySelector<HTMLElement>('.site-nav')?.offsetHeight ?? 73;
  const lastU = beats.map(() => '');
  const lastIn = beats.map(() => '');
  const lastInM = beats.map(() => '');
  let current = -1;

  const apply = (p: number) => {
    // Beat i is fully present at t = i; the half beat at each end is a hold,
    // so the first and last projects settle before anything moves.
    const t = clamp(p * n - 0.5, 0, n - 1);
    const active = Math.round(t);
    for (let i = 0; i < n; i++) {
      const u = clamp(t - i, -1, 1);
      const a = Math.abs(u);
      // The copy hands over cleanly — one project's words are gone before
      // the next arrives. The media cross-dissolves, which images survive.
      const vis = 1 - smoothstep(0.22, 0.5, a);
      const visM = 1 - smoothstep(0.3, 0.7, a);
      const uKey = u.toFixed(3);
      const inKey = vis.toFixed(3);
      const inMKey = visM.toFixed(3);
      if (uKey !== lastU[i]) {
        lastU[i] = uKey;
        beats[i].style.setProperty('--u', uKey);
      }
      if (inKey !== lastIn[i]) {
        lastIn[i] = inKey;
        beats[i].style.setProperty('--in', inKey);
      }
      if (inMKey !== lastInM[i]) {
        lastInM[i] = inMKey;
        beats[i].style.setProperty('--inm', inMKey);
      }
      if (i === active) beats[i].dataset.active = '';
      else delete beats[i].dataset.active;
    }
    if (active !== current) {
      current = active;
      jumps.forEach((button, i) => {
        if (i === active) button.setAttribute('aria-current', 'true');
        else button.removeAttribute('aria-current');
      });
    }
    world.progress.work = p;
  };

  const trigger = ScrollTrigger.create({
    trigger: stage,
    start: () => `top ${navH}px`,
    end: 'bottom bottom',
    invalidateOnRefresh: true,
    onUpdate: (self) => apply(self.progress),
    onToggle: (self) => {
      if (self.isActive) world.section = 'work';
    },
  });
  apply(0);

  const beatTop = (i: number) => trigger.start + (trigger.end - trigger.start) * ((i + 0.5) / n);
  jumps.forEach((button, i) => {
    button.addEventListener('click', () => world.scrollTo(beatTop(i)));
  });

  // Every link in every beat stays in the tab order. Focusing one that is
  // not on screen brings its beat forward instead of leaving the reader
  // somewhere invisible.
  beats.forEach((beat, i) => {
    beat.addEventListener('focusin', (event) => {
      if (i === current) return;
      const target = event.target as HTMLElement;
      if (typeof target.matches === 'function' && !target.matches(':focus-visible')) return;
      world.scrollTo(beatTop(i));
    });
  });
}
