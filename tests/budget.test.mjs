import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { measure } from '../scripts/measure-home.mjs';

const KB = 1024;
const m = measure();

test('home page stays inside the JavaScript budget', { skip: m ? false : 'no production build in .next' }, () => {
  // Initial bundle: everything the HTML references before any interaction.
  assert.ok(m.initial <= 215 * KB, `initial ${(m.initial / KB).toFixed(1)} KB gz exceeds 215 KB`);
  // Phones load initial + motion (GSAP); never the WebGL world.
  assert.ok(m.initial + m.motion <= 300 * KB, `initial + motion ${((m.initial + m.motion) / KB).toFixed(1)} KB gz exceeds 300 KB`);
  // The lazy tiers must not leak into the initial chunks.
  assert.deepEqual(m.leaks, [], `lazy markers found in initial chunks: ${m.leaks.join(', ')}`);
});
