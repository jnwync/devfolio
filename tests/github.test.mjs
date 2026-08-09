import { strict as assert } from 'node:assert';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { createContext, runInContext } from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../lib/github.ts', import.meta.url), 'utf8');
const require = createRequire(import.meta.url);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;

function loadGithubModule({ fetch = globalThis.fetch, env = {} } = {}) {
  const githubModule = { exports: {} };
  runInContext(
    compiled,
    createContext({
      console,
      exports: githubModule.exports,
      fetch,
      module: githubModule,
      process: { env },
      require,
    })
  );
  return githubModule.exports;
}

function makeCalendar(overrides = {}) {
  return {
    totalContributions: 3,
    weeks: [
      {
        firstDay: '2026-07-26',
        contributionDays: [
          { date: '2026-07-26', contributionCount: 2, contributionLevel: 'SECOND_QUARTILE' },
          { date: '2026-07-27', contributionCount: 1, contributionLevel: 'FIRST_QUARTILE' },
        ],
      },
    ],
    ...overrides,
  };
}

test('normalizes the GitHub contribution calendar into the renderer shape', () => {
  const { normalizeContributionCalendar } = loadGithubModule();
  const result = normalizeContributionCalendar(makeCalendar());

  assert.deepEqual(JSON.parse(JSON.stringify(result)), {
    total: 3,
    weeks: [
      {
        firstDay: '2026-07-26',
        days: [
          { date: '2026-07-26', count: 2, level: 2 },
          { date: '2026-07-27', count: 1, level: 1 },
        ],
      },
    ],
  });
});

test('rejects malformed calendars and GraphQL error responses', () => {
  const { normalizeContributionCalendar, getContributionCalendar } = loadGithubModule({
    env: { GITHUB_TOKEN: 'test-token' },
    fetch: async () => ({ ok: true, json: async () => ({ errors: [{ message: 'rate limit' }] }) }),
  });

  assert.equal(normalizeContributionCalendar({ ...makeCalendar(), totalContributions: '3' }), null);
  assert.equal(normalizeContributionCalendar({ ...makeCalendar(), weeks: [{ firstDay: 'bad', contributionDays: [] }] }), null);
  return getContributionCalendar('jnwync').then((result) => assert.equal(result, null));
});

test('returns a safe fallback when the server token is missing or the request fails', async () => {
  const missingToken = loadGithubModule({ env: {} });
  assert.equal(await missingToken.getContributionCalendar('jnwync'), null);

  const failedRequest = loadGithubModule({
    env: { GITHUB_TOKEN: 'test-token' },
    fetch: async () => {
      throw new Error('network unavailable');
    },
  });
  assert.equal(await failedRequest.getContributionCalendar('jnwync'), null);
});

test('selects the newest six months of weeks for the mobile rendering slice', () => {
  const { getRecentWeeks } = loadGithubModule();
  const weeks = Array.from({ length: 40 }, (_, index) => ({
    firstDay: `2026-${String(index + 1).padStart(2, '0')}-01`,
    days: [],
  }));

  assert.equal(getRecentWeeks({ total: 0, weeks }, 26).length, 26);
  assert.equal(getRecentWeeks({ total: 0, weeks }, 26)[0].firstDay, '2026-15-01');
  assert.equal(getRecentWeeks({ total: 0, weeks }, 26).at(-1).firstDay, '2026-40-01');
});
