/**
 * Reads the world's colour tokens as the DOM resolves them (light-dark(),
 * oklch, whatever the stylesheet says) and returns linear RGB for the
 * shader. A hidden probe element carries an explicit color-scheme, so both
 * weathers can be read whatever theme the page is in; the renderer blends
 * between them for the time-lapse.
 */

export type RGB = [number, number, number];

export interface Palette {
  skyTop: RGB;
  skyHorizon: RGB;
  seaFar: RGB;
  seaNear: RGB;
  orb: RGB;
  glow: RGB;
  beacon: RGB;
}

export const PALETTE_KEYS: (keyof Palette)[] = ['skyTop', 'skyHorizon', 'seaFar', 'seaNear', 'orb', 'glow', 'beacon'];

const TOKENS: Record<keyof Palette, string> = {
  skyTop: '--world-sky-top',
  skyHorizon: '--world-sky-horizon',
  seaFar: '--world-sea-far',
  seaNear: '--world-sea-near',
  orb: '--world-orb',
  glow: '--world-glow',
  beacon: '--primary',
};

let probe: HTMLSpanElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

function readToken(name: string): RGB {
  if (!probe) {
    probe = document.createElement('span');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
    document.body.appendChild(probe);
  }
  if (!ctx) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    ctx = canvas.getContext('2d', { willReadFrequently: true });
  }
  probe.style.color = `var(${name})`;
  const css = getComputedStyle(probe).color;
  if (!ctx) return [0, 0, 0];
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = '#000000';
  ctx.fillStyle = css;
  ctx.fillRect(0, 0, 1, 1);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return [toLinear(d[0] / 255), toLinear(d[1] / 255), toLinear(d[2] / 255)];
}

/** The palette for one weather, read through the page's own tokens. */
export function readPalette(scheme: 'light' | 'dark'): Palette {
  if (!probe) readToken('--primary');
  probe!.style.colorScheme = scheme;
  const out = {} as Palette;
  for (const key of PALETTE_KEYS) out[key] = readToken(TOKENS[key]);
  return out;
}

export function releaseProbe(): void {
  probe?.remove();
  probe = null;
  ctx = null;
}
