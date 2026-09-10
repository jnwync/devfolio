/**
 * Pointer light and ripples. Only meaningful with a fine pointer; touch
 * devices never reach here. Writes into the frame store; nothing else.
 */

import { addRipple, world } from './state';

export function trackPointer(): () => void {
  const move = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    world.pointer.x = event.clientX / window.innerWidth;
    world.pointer.y = event.clientY / window.innerHeight;
    world.pointer.active = 1;
  };
  const down = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    addRipple(event.clientX / window.innerWidth, event.clientY / window.innerHeight, 1);
  };
  const leave = () => {
    world.pointer.active = 0;
  };
  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerdown', down, { passive: true });
  document.addEventListener('pointerleave', leave);
  return () => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerdown', down);
    document.removeEventListener('pointerleave', leave);
  };
}
