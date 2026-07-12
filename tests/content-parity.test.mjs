import { strict as assert } from 'node:assert';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { createContext, runInContext } from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../data/portfolio.ts', import.meta.url), 'utf8');
const require = createRequire(import.meta.url);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;

const portfolioModule = { exports: {} };
const context = createContext({
  console,
  exports: portfolioModule.exports,
  module: portfolioModule,
  require,
});
runInContext(compiled, context);

const { portfolioData } = portfolioModule.exports;
const navigationSource = readFileSync(new URL('../app/components/Navigation.tsx', import.meta.url), 'utf8');
const projectsSource = readFileSync(new URL('../app/components/sections/Projects.tsx', import.meta.url), 'utf8');
const stylesSource = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
const caseStudySource = readFileSync(new URL('../data/caseStudies.ts', import.meta.url), 'utf8');
const caseStudyCompiled = ts.transpileModule(caseStudySource, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
const caseStudyModule = { exports: {} };
runInContext(caseStudyCompiled, createContext({
  console,
  exports: caseStudyModule.exports,
  module: caseStudyModule,
  require,
}));

test('publishes the CV-authoritative OKRa period without unpublished duration claims', () => {
  const okra = portfolioData.experiences.find(({ id }) => id === 'okra');

  assert.equal(okra?.period, 'May 2026 - Jul 2026');
  assert.equal(okra?.endDate, '2026-07');
  assert.equal(JSON.stringify(portfolioData).includes('300 hrs'), false);
});

test('keeps Reisky aligned with the CV and features recruiter-relevant work', () => {
  const reisky = portfolioData.experiences.find(({ id }) => id === 'reisky');
  const featuredProjects = portfolioData.projects
    .filter(({ featured }) => featured)
    .map(({ id }) => id);

  assert.equal(reisky?.period, 'Jan 2026 - Apr 2026');
  assert.deepEqual([...featuredProjects], ['reisky', 'okra', 'apollo']);
});

test('uses the recruiter-searchable headline and CV-backed About copy', () => {
  assert.equal(
    portfolioData.personal.positioning,
    'Full-Stack Web Developer building systems people rely on.'
  );
  assert.equal(
    portfolioData.personal.summary,
    'I build responsive React products, typed APIs, secure workflows, and tested data systems from interface to deployment.'
  );
  assert.match(portfolioData.personal.bio, /relational and NoSQL databases/);
  assert.match(portfolioData.personal.bio, /authentication, authorization/);
  assert.match(portfolioData.personal.bio, /containerized development/);
});

test('publishes an OKRa case study with CV-backed proof points', () => {
  const okra = caseStudyModule.exports.getCaseStudy('okra');

  assert.equal(okra?.period, 'May 2026 – Jul 2026');
  assert.equal(okra?.metrics.map(({ value }) => value).join(','), '32,21,83');
  assert.match(okra?.summary ?? '', /work-tracking platform/);
  assert.match(JSON.stringify(okra), /S3-compatible/);
});

test('uses availability and Skills terminology consistently', () => {
  assert.equal(portfolioData.personal.availability.message, 'Available for New Opportunities');
  assert.match(navigationSource, /name: 'Skills'/);
  assert.doesNotMatch(navigationSource, /Capabilities/);
});

test('keeps project interactions restrained and case-study presentation shared', () => {
  assert.doesNotMatch(projectsSource, /spotlight|handleSpotlight|onMouseMove/);
  assert.doesNotMatch(stylesSource, /\.spotlight/);
  assert.equal(existsSync(new URL('../app/components/CaseStudyLayout.tsx', import.meta.url)), true);
  assert.match(
    readFileSync(new URL('../app/work/reisky/page.tsx', import.meta.url), 'utf8'),
    /CaseStudyLayout/
  );
  assert.match(
    readFileSync(new URL('../app/work/okra/page.tsx', import.meta.url), 'utf8'),
    /CaseStudyLayout/
  );
});
