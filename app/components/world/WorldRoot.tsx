'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { measureOrbStart, world, writeWorldVars } from './state';

/**
 * Decides which world this visitor gets and mounts it.
 *
 * - `gl`: the home page, a wide viewport, WebGL2 without a major
 *   performance caveat, full motion, no data-saver → the OGL scene is
 *   imported lazily and announced only once its first frame is drawn.
 * - `2d`: everything else → the Atmosphere canvas plus a CSS sea band and
 *   a DOM orb, driven by the same store through custom properties.
 *
 * Either way the wordmark's period is measured so the orb starts exactly
 * where the intro leaves it. The choice is published on
 * `html[data-world]` and a `jnwync:world` event the intro waits for.
 */
export default function WorldRoot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    const full = html.dataset.motion === 'full';
    const wide = window.matchMedia('(min-width: 768px)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

    let gl = false;
    if (full && wide && !saveData && pathname === '/') {
      const probe = document.createElement('canvas');
      const ctx = probe.getContext('webgl2', { failIfMajorPerformanceCaveat: true });
      if (ctx) {
        const info = ctx.getExtension('WEBGL_debug_renderer_info');
        const renderer = info ? String(ctx.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
        gl = !/swiftshader|llvmpipe|software/i.test(renderer);
        ctx.getExtension('WEBGL_lose_context')?.loseContext();
      }
    }

    const settle = () => {
      if (measureOrbStart()) {
        world.orb.x = world.orbStart.x;
        world.orb.y = world.orbStart.y;
        world.orb.r = world.orbStart.r;
        world.orb.on = full ? 1 : 0;
      } else {
        world.orb.on = 0;
      }
      writeWorldVars();
    };
    const onTheme = () => {
      world.day = html.dataset.theme === 'light' ? 1 : 0;
    };
    const announce = (kind: 'gl' | '2d') => {
      html.dataset.world = kind;
      window.dispatchEvent(new CustomEvent('jnwync:world', { detail: kind }));
    };

    onTheme();
    settle();
    document.fonts?.ready.then(settle);
    window.addEventListener('resize', settle);
    window.addEventListener('jnwync:theme', onTheme);

    let dispose: (() => void) | undefined;
    let cancelled = false;
    if (gl && canvasRef.current) {
      const canvas = canvasRef.current;
      import('./World')
        .then(({ mountWorld }) => {
          if (cancelled) return;
          dispose = mountWorld(canvas, () => announce('2d'));
          announce('gl');
        })
        .catch(() => {
          if (!cancelled) announce('2d');
        });
    } else {
      announce('2d');
    }

    return () => {
      cancelled = true;
      dispose?.();
      delete html.dataset.world;
      window.removeEventListener('resize', settle);
      window.removeEventListener('jnwync:theme', onTheme);
    };
  }, [pathname]);

  return (
    <div className="world" aria-hidden="true">
      <canvas ref={canvasRef} className="world-gl" />
      <i className="world-orb" />
      <div className="world-sea" />
    </div>
  );
}
