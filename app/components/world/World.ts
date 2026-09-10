/**
 * The WebGL world: one OGL renderer drawing the sky/sea program every frame
 * the ticker gives it, reading everything from the frame store. Mounted
 * lazily by WorldRoot on capable desktops only. Renders one frame on mount
 * (so the intro can reveal a finished scene), then joins the frame hooks.
 *
 * Both weathers' palettes are read from the CSS tokens once; a theme change
 * moves `world.day`, and the renderer eases its own copy toward it so the
 * light changes across the scene over about half a second instead of
 * cutting. A lost context is rebuilt once; a second loss hands the page to
 * the 2D world.
 */

import { Mesh, Program, Renderer, Triangle } from 'ogl';
import { PALETTE_KEYS, readPalette, releaseProbe, type Palette, type RGB } from './cssColor';
import { clock, frameHooks, world } from './state';
import { fragment, vertex } from './shaders/skysea';

/** Kept in the bundle on purpose: the measurement script finds the world chunk by it. */
export const WORLD_MARKER = '__jnwync_world__';

const RENDER_SCALE_DEFAULT = 0.75;
const RENDER_SCALE_LOW = 0.5;
const IDLE_AFTER_S = 60;

const UNIFORM_FOR: Record<keyof Palette, string> = {
  skyTop: 'uSkyTop',
  skyHorizon: 'uSkyHorizon',
  seaFar: 'uSeaFar',
  seaNear: 'uSeaNear',
  orb: 'uOrbColor',
  glow: 'uGlow',
  beacon: 'uBeaconColor',
};

type Uniform = { value: number | number[] };

interface Scene {
  renderer: Renderer;
  mesh: Mesh;
  u: Record<string, Uniform>;
  ripples: number[];
}

function createScene(canvas: HTMLCanvasElement): Scene {
  const renderer = new Renderer({
    canvas,
    alpha: false,
    depth: false,
    antialias: false,
    powerPreference: 'high-performance',
  });
  const gl = renderer.gl;
  // Plain arrays: OGL flattens them into one uniform4fv call for the array uniform.
  const ripples: number[] = new Array(32).fill(0);
  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uRes: { value: [1, 1] },
      uTime: { value: 0 },
      uDay: { value: 0 },
      uHour: { value: 0 },
      uHorizon: { value: 0.62 },
      uOrb: { value: [0.5, 0.6, 0.02] },
      uOrbOn: { value: 0 },
      uPointer: { value: [0.5, 0.5, 0] },
      uRipples: { value: ripples },
      uDim: { value: [0, 0, 0, 0] },
      uDimAmount: { value: 0 },
      uBeacon: { value: [0.5, 0.5, 0] },
      uSkyTop: { value: [0, 0, 0] },
      uSkyHorizon: { value: [0, 0, 0] },
      uSeaFar: { value: [0, 0, 0] },
      uSeaNear: { value: [0, 0, 0] },
      uOrbColor: { value: [1, 1, 1] },
      uGlow: { value: [1, 1, 1] },
      uBeaconColor: { value: [0.3, 0.9, 0.5] },
    },
  });
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
  return { renderer, mesh, u: program.uniforms as Record<string, Uniform>, ripples };
}

export function mountWorld(canvas: HTMLCanvasElement, onGiveUp?: () => void): () => void {
  let scene = createScene(canvas);
  let night = readPalette('dark');
  let day = readPalette('light');
  let dayShown = world.day;
  let scale = RENDER_SCALE_DEFAULT;
  let paused = false;
  let lost = false;
  let losses = 0;
  let lastActivity = clock();
  let frameCost = 0;
  let lastTime = clock();

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * scale;
    scene.renderer.dpr = dpr;
    scene.renderer.setSize(window.innerWidth, window.innerHeight);
    scene.u.uRes.value = [scene.renderer.gl.canvas.width, scene.renderer.gl.canvas.height];
  };

  const blend = (a: RGB, b: RGB, t: number): number[] => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const applyPalette = () => {
    for (const key of PALETTE_KEYS) scene.u[UNIFORM_FOR[key]].value = blend(night[key], day[key], dayShown);
  };

  const draw = () => {
    if (lost) return;
    const { u, ripples, renderer, mesh } = scene;
    const now = clock();
    const dt = Math.min(0.1, now - lastTime);
    lastTime = now;
    if (dayShown !== world.day) {
      dayShown += (world.day - dayShown) * (1 - Math.exp(-dt * 7));
      if (Math.abs(world.day - dayShown) < 0.002) dayShown = world.day;
      applyPalette();
    }
    u.uTime.value = now;
    u.uDay.value = dayShown;
    u.uHour.value = world.hour;
    u.uHorizon.value = world.horizon;
    u.uOrb.value = [world.orb.x, world.orb.y, world.orb.r];
    u.uOrbOn.value = world.orb.on;
    u.uPointer.value = [world.pointer.x, world.pointer.y, world.pointer.active];
    for (let i = 0; i < 8; i++) {
      const r = world.ripples[i];
      ripples[i * 4] = r ? r.x : 0;
      ripples[i * 4 + 1] = r ? r.y : 0;
      ripples[i * 4 + 2] = r ? now - r.t : 0;
      ripples[i * 4 + 3] = r ? r.strength : 0;
    }
    u.uDim.value = [world.dim.x, world.dim.y, world.dim.w, world.dim.h];
    u.uDimAmount.value = world.dim.amount;
    u.uBeacon.value = [world.beacon.x, world.beacon.y, world.beacon.on];
    renderer.render({ scene: mesh });
  };

  // Per-frame hook: skips work while hidden, halves the rate when idle for a
  // minute, and lowers the render scale if frames get expensive.
  let skip = false;
  const frame = () => {
    if (paused || lost) return;
    const idle = clock() - lastActivity > IDLE_AFTER_S;
    if (idle) {
      skip = !skip;
      if (skip) return;
    }
    const t0 = performance.now();
    draw();
    frameCost += (performance.now() - t0 - frameCost) * 0.05;
    if (frameCost > 20 && scale > RENDER_SCALE_LOW) {
      scale = RENDER_SCALE_LOW;
      resize();
    }
  };

  const onActivity = () => {
    lastActivity = clock();
  };
  const onVisibility = () => {
    paused = document.hidden;
    if (!paused) onActivity();
  };
  const onContextLost = (event: Event) => {
    losses += 1;
    lost = true;
    if (losses > 1) {
      onGiveUp?.();
      return;
    }
    event.preventDefault();
  };
  const onContextRestored = () => {
    // Everything GL-side is gone; build the scene again on the same canvas.
    scene = createScene(canvas);
    night = readPalette('dark');
    day = readPalette('light');
    lost = false;
    resize();
    applyPalette();
    draw();
  };

  resize();
  applyPalette();
  draw();

  window.addEventListener('resize', resize);
  window.addEventListener('jnwync:theme', onActivity);
  window.addEventListener('scroll', onActivity, { passive: true });
  window.addEventListener('pointermove', onActivity, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  canvas.addEventListener('webglcontextlost', onContextLost);
  canvas.addEventListener('webglcontextrestored', onContextRestored);
  frameHooks.add(frame);

  return () => {
    frameHooks.delete(frame);
    window.removeEventListener('resize', resize);
    window.removeEventListener('jnwync:theme', onActivity);
    window.removeEventListener('scroll', onActivity);
    window.removeEventListener('pointermove', onActivity);
    document.removeEventListener('visibilitychange', onVisibility);
    canvas.removeEventListener('webglcontextlost', onContextLost);
    canvas.removeEventListener('webglcontextrestored', onContextRestored);
    releaseProbe();
    scene.renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();
  };
}
