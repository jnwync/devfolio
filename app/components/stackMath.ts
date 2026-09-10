/**
 * The stack row's settle, as pure functions shared by the standalone
 * StackMotion fallback (initial bundle) and the stack scene (motion bundle).
 *
 * Each icon starts scattered in depth (translateZ and a slight Y-axis turn)
 * and eases flat as progress runs 0 → 1. Depth is read from scale and
 * rotation only: the lateral drift a perspective projection would add to
 * off-centre items is cancelled analytically (translate by
 * -offset·z/perspective), so neighbouring labels never cross.
 */

export interface Seed {
  z: number;
  ry: number;
  delay: number;
  dir: 1 | -1;
}

export interface Offset {
  dx: number;
  dy: number;
}

export interface Pose {
  tx: number;
  ty: number;
  z: number;
  ry: number;
  /** Eased settle progress for this item, 0 scattered → 1 flat. */
  e: number;
}

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

export function seedFor(index: number): Seed {
  const rand = prng(97 + index * 7331);
  const forward = rand() < 0.22;
  return {
    // Mostly pushed back into the field; roughly one in five sits slightly forward.
    z: forward ? 20 + rand() * 40 : -60 - rand() * 200,
    ry: (rand() * 2 - 1) * 24,
    delay: rand() * 0.4,
    dir: index % 2 === 0 ? 1 : -1,
  };
}

export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** Progress of the settle from the field's top edge: 0 at the viewport bottom, 1 once 42% up. */
export function settleProgress(fieldTop: number, viewportHeight: number): number {
  return clamp((viewportHeight - fieldTop) / (viewportHeight * 0.58), 0, 1);
}

export function poseFor(seed: Seed, offset: Offset, p: number, amp: number, lean: number, perspective: number): Pose {
  const pi = clamp((p - seed.delay) / (1 - seed.delay), 0, 1);
  const e = 1 - Math.pow(1 - pi, 3);
  const k = (1 - e) * amp;
  const z = seed.z * k;
  const ry = seed.ry * k + lean * seed.dir;
  return {
    tx: (-offset.dx * z) / perspective,
    ty: (-offset.dy * z) / perspective,
    z,
    ry,
    e,
  };
}

export function transformFor(pose: Pose): string {
  return `translate3d(${pose.tx.toFixed(1)}px, ${pose.ty.toFixed(1)}px, ${pose.z.toFixed(1)}px) rotateY(${pose.ry.toFixed(2)}deg)`;
}

/** Layout of the field: perspective and each item's offset from its origin, transforms cleared. */
export function measureField(field: HTMLElement, items: HTMLElement[]): { perspective: number; offsets: Offset[] } {
  items.forEach((el) => (el.style.transform = ''));
  const style = getComputedStyle(field);
  const perspective = parseFloat(style.perspective) || 1100;
  const [ox, oy] = style.perspectiveOrigin.split(' ').map(parseFloat);
  const rect = field.getBoundingClientRect();
  const originX = rect.left + (Number.isFinite(ox) ? ox : rect.width / 2);
  const originY = rect.top + (Number.isFinite(oy) ? oy : rect.height * 0.4);
  const offsets = items.map((el) => {
    const r = el.getBoundingClientRect();
    return { dx: r.left + r.width / 2 - originX, dy: r.top + r.height / 2 - originY };
  });
  return { perspective, offsets };
}
