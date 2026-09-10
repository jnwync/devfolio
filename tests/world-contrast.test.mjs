/**
 * The world moves under the text, so contrast cannot be checked by reading
 * two tokens off a static design. What makes it safe is a pair of limits in
 * the sky/sea shader: at night nothing may exceed NIGHT_LUMINANCE_CAP, and
 * the beacon — the one light added after that cap — may add at most
 * BEACON_NIGHT_GAIN on top of it. By day the water is uncapped, so the
 * worst case there is simply the brightest colour in the palette.
 *
 * This test reads the same numbers the shader compiles and the same tokens
 * the page paints, and asserts that body text still clears AA against the
 * brightest thing the world can put behind it. Raise the cap, brighten a
 * world token, or turn up the beacon and it fails here rather than in a
 * screenshot someone happens to look at.
 */

import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
const shader = readFileSync(new URL('../app/components/world/shaders/skysea.ts', import.meta.url), 'utf8');

const constant = (name) => {
  const match = shader.match(new RegExp(`export const ${name} = ([\\d.]+)`));
  assert.ok(match, `${name} is not exported from the sky/sea shader`);
  return Number(match[1]);
};

const NIGHT_LUMINANCE_CAP = constant('NIGHT_LUMINANCE_CAP');
const BEACON_NIGHT_GAIN = constant('BEACON_NIGHT_GAIN');

/** oklch(L C H) → linear-light sRGB, the space luminance is defined in. */
function oklchToLinearRgb(l, c, h) {
  const hr = (h * Math.PI) / 180;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ].map((v) => Math.min(1, Math.max(0, v)));
}

const luminanceOf = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const contrast = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

const parseOklch = (body) => {
  const [l, c, h] = body.trim().split('/')[0].trim().split(/\s+/).map(Number);
  return luminanceOf(oklchToLinearRgb(l, c, h || 0));
};

/**
 * Reads `--name: light-dark(oklch(...), oklch(...))` from the token block
 * and returns the luminance of each weather.
 */
function token(name) {
  const pattern = new RegExp(
    `${name}:\\s*light-dark\\(\\s*oklch\\(([^)]*)\\)\\s*,\\s*oklch\\(([^)]*)\\)\\s*\\)`
  );
  const match = css.match(pattern);
  assert.ok(match, `${name} is not a light-dark(oklch, oklch) token in globals.css`);
  return { light: parseOklch(match[1]), dark: parseOklch(match[2]) };
}

/**
 * The colours the world itself paints are declared once per weather, because
 * the renderer reads both halves at the same time to tween between them. This
 * reads that pair — and checks the composed token is still built from it, so
 * the weather the page paints in CSS cannot drift from the one the shader
 * gets handed.
 */
function weatherToken(name) {
  const half = (suffix) => {
    const match = css.match(new RegExp(`${name}-${suffix}:\\s*oklch\\(([^)]*)\\)`));
    assert.ok(match, `${name}-${suffix} is not an oklch() token in globals.css`);
    return parseOklch(match[1]);
  };
  assert.ok(
    css.includes(`${name}: light-dark(var(${name}-day), var(${name}-night))`),
    `${name} must be composed from its own -day and -night halves`
  );
  return { light: half('day'), dark: half('night') };
}

const foreground = token('--foreground');
const muted = token('--muted-foreground');
const primary = weatherToken('--primary');
const worldTokens = ['--world-sky-top', '--world-sky-horizon', '--world-sea-far', '--world-sea-near', '--world-orb', '--world-glow'].map(weatherToken);

// By day the shader does not clamp anything, so the worst background is
// simply the brightest colour the palette can put on screen.
const brightestDay = Math.max(...worldTokens.map((t) => t.light));
// At night the cap is the ceiling, and the beacon adds its gain on top of
// it at the brightest point of its column.
const brightestNight = NIGHT_LUMINANCE_CAP + BEACON_NIGHT_GAIN * primary.dark * 0.9;

test('body text clears AA over the brightest daylight the world can paint', () => {
  assert.ok(
    contrast(muted.light, brightestDay) >= 4.5,
    `muted text over daylight is ${contrast(muted.light, brightestDay).toFixed(2)}:1`
  );
  assert.ok(
    contrast(foreground.light, brightestDay) >= 4.5,
    `foreground over daylight is ${contrast(foreground.light, brightestDay).toFixed(2)}:1`
  );
});

test('body text clears AA over the night cap and the beacon on top of it', () => {
  assert.ok(
    contrast(muted.dark, NIGHT_LUMINANCE_CAP) >= 4.5,
    `muted text over capped night water is ${contrast(muted.dark, NIGHT_LUMINANCE_CAP).toFixed(2)}:1`
  );
  assert.ok(
    contrast(muted.dark, brightestNight) >= 4.5,
    `muted text over the beacon column is ${contrast(muted.dark, brightestNight).toFixed(2)}:1`
  );
  assert.ok(
    contrast(foreground.dark, brightestNight) >= 4.5,
    `foreground over the beacon column is ${contrast(foreground.dark, brightestNight).toFixed(2)}:1`
  );
});

test('the brand green clears AA-large wherever it sits on the world', () => {
  assert.ok(
    contrast(primary.dark, brightestNight) >= 3,
    `primary over the night world is ${contrast(primary.dark, brightestNight).toFixed(2)}:1`
  );
  assert.ok(
    contrast(primary.light, brightestDay) >= 3,
    `primary over the day world is ${contrast(primary.light, brightestDay).toFixed(2)}:1`
  );
});
