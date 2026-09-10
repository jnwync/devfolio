/**
 * Experience: the axis follows the reading line.
 *
 * The axis above the rows is a Gantt of the same roles. As you scroll, the
 * span belonging to whichever row sits on the reading line lights up, and
 * that row's period brightens with it — one moving thing, and it says
 * something true. Rows are native `<details>`, so opening one changes the
 * geometry; the scene re-measures on toggle and tells ScrollTrigger.
 *
 * Nothing reads layout per frame: row bounds are cached and projected from
 * `world.scroll`.
 */

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { addFrame } from '../ticker';
import { world } from '../../world/state';

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

export function buildExperience(): void {
  const section = document.querySelector<HTMLElement>('[data-scene="experience"]');
  if (!section) return;
  const rows = Array.from(section.querySelectorAll<HTMLElement>('[data-exp-row]'));
  if (!rows.length) return;
  const spans = rows.map((row) => section.querySelector<HTMLElement>(`[data-exp-lane="${row.dataset.expRow}"]`));

  const bounds = rows.map(() => ({ top: 0, bottom: 0 }));
  const lastLit = rows.map(() => '');
  let sectionTop = 0;
  let sectionBottom = 0;

  const measure = () => {
    const scroll = window.scrollY;
    const box = section.getBoundingClientRect();
    sectionTop = box.top + scroll;
    sectionBottom = box.bottom + scroll;
    rows.forEach((row, i) => {
      const r = row.getBoundingClientRect();
      bounds[i] = { top: r.top + scroll, bottom: r.bottom + scroll };
    });
  };
  ScrollTrigger.addEventListener('refreshInit', measure);
  measure();

  // Opening a row changes every offset below it, here and on the page.
  let refreshTimer = 0;
  rows.forEach((row) => {
    row.addEventListener('toggle', () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 60);
    });
  });

  addFrame(() => {
    const vh = window.innerHeight;
    const scroll = world.scroll;
    if (sectionBottom - scroll < -200 || sectionTop - scroll > vh + 200) return;

    // The reading line sits a little above centre, where the eye rests.
    const line = scroll + vh * 0.42;
    const reach = vh * 0.3;
    for (let i = 0; i < rows.length; i++) {
      const { top, bottom } = bounds[i];
      const distance = line < top ? top - line : line > bottom ? line - bottom : 0;
      const lit = 1 - smoothstep(0, reach, distance);
      const key = lit.toFixed(2);
      if (key === lastLit[i]) continue;
      lastLit[i] = key;
      rows[i].style.setProperty('--lit', key);
      spans[i]?.style.setProperty('--lit', key);
    }
    world.progress.experience = clamp((line - sectionTop) / Math.max(1, sectionBottom - sectionTop), 0, 1);
    world.section = 'experience';
  });
}
