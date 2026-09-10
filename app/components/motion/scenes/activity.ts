/**
 * Public activity: the calendar fills in, one week-column at a time, left
 * to right, once. The animation itself is CSS; this only decides when it
 * starts, and arms the hidden state so a calendar is never left invisible
 * if the scene does not run.
 */

import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function buildActivity(): void {
  const calendar = document.querySelector<HTMLElement>('[data-cal]');
  if (!calendar) return;
  calendar.dataset.calArmed = '';

  const reveal = () => {
    calendar.dataset.revealed = '';
  };

  if (calendar.getBoundingClientRect().top < window.innerHeight * 0.9) {
    reveal();
    return;
  }
  ScrollTrigger.create({ trigger: calendar, start: 'top 90%', once: true, onEnter: reveal });
}
