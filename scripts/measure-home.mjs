#!/usr/bin/env node
/**
 * Measures what the home page ships, gzipped, from the production build:
 *   initial  = every <script src> and preloaded .js in .next/server/app/index.html
 *   motion   = the lazily loaded chunk(s) containing the motion marker (GSAP)
 *   world    = the lazily loaded chunk(s) containing the world marker (OGL, Lenis)
 * Run after `next build`. Prints a table and returns the numbers for the
 * budget test.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';

const root = process.cwd();
const htmlPath = join(root, '.next/server/app/index.html');
const chunksDir = join(root, '.next/static/chunks');

const gz = (buf) => gzipSync(buf, { level: 9 }).length;
const kb = (n) => (n / 1024).toFixed(1);

export function measure() {
  if (!existsSync(htmlPath) || !existsSync(chunksDir)) return null;
  const html = readFileSync(htmlPath, 'utf8');
  const refs = new Set(
    [...html.matchAll(/<script[^>]+src="([^"]+)"/g)]
      .map((m) => m[1])
      .concat([...html.matchAll(/<link[^>]+href="([^"]+\.js)"[^>]*>/g)].map((m) => m[1]))
      .filter((s) => s.startsWith('/_next/'))
      .map((s) => s.replace(/^\/_next\//, '').split('?')[0])
  );

  const initial = [];
  for (const rel of refs) {
    const p = join(root, '.next', rel);
    if (!existsSync(p)) continue;
    const buf = readFileSync(p);
    initial.push({ file: rel.replace('static/chunks/', ''), gz: gz(buf), raw: buf.length, text: buf.toString('utf8') });
  }

  const lazy = { motion: [], world: [] };
  for (const file of readdirSync(chunksDir)) {
    if (!file.endsWith('.js') || refs.has(`static/chunks/${file}`)) continue;
    const buf = readFileSync(join(chunksDir, file));
    const text = buf.toString('utf8');
    // Markers first (a chunk carrying our own entry code), then library
    // fingerprints for chunks the bundler split away from the marked entry:
    // OGL compiles programs, Lenis brands its root classes, GSAP carries
    // its plugin names.
    const entry = { file, gz: gz(buf), raw: buf.length };
    if (text.includes('__jnwync_motion__')) lazy.motion.push(entry);
    else if (text.includes('__jnwync_world__')) lazy.world.push(entry);
    else if (text.includes('createProgram(') || text.includes('lenis-smooth')) lazy.world.push(entry);
    else if (text.includes('ScrollTrigger') || text.includes('gsap.ticker') || text.includes('_gsap')) lazy.motion.push(entry);
  }

  const sum = (list) => list.reduce((n, c) => n + c.gz, 0);
  const leaks = initial.filter((c) => c.text.includes('__jnwync_world__') || c.text.includes('__jnwync_motion__')).map((c) => c.file);
  return {
    initial: sum(initial),
    motion: sum(lazy.motion),
    world: sum(lazy.world),
    initialFiles: initial.map(({ file, gz, raw }) => ({ file, gz, raw })).sort((a, b) => b.gz - a.gz),
    motionFiles: lazy.motion,
    worldFiles: lazy.world,
    leaks,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const m = measure();
  if (!m) {
    console.error('No production build found. Run `npm run build` first.');
    process.exit(1);
  }
  for (const f of m.initialFiles) console.log(String(kb(f.gz)).padStart(7), 'KB gz', f.file);
  console.log('\ninitial JS      :', kb(m.initial), 'KB gz');
  console.log('motion (lazy)   :', kb(m.motion), 'KB gz', m.motionFiles.map((f) => f.file).join(', ') || '(none)');
  console.log('world (lazy)    :', kb(m.world), 'KB gz', m.worldFiles.map((f) => f.file).join(', ') || '(none)');
  console.log('mobile total    :', kb(m.initial + m.motion), 'KB gz (initial + motion)');
  console.log('desktop total   :', kb(m.initial + m.motion + m.world), 'KB gz (initial + motion + world)');
  if (m.leaks.length) console.log('WARNING marker leaked into initial chunks:', m.leaks.join(', '));
}
