import test from 'node:test';
import assert from 'node:assert/strict';
import { loadGithubStats } from '../src/services/github.js';

test('GitHub counts preserve zero and aggregate paginated repositories', async () => {
  const calls = [];
  const fetcher = async (url) => {
    calls.push(url);
    if (url.endsWith('/Aizaz-Noor')) return { ok: true, json: async () => ({ public_repos: 101 }) };
    if (url.endsWith('page=1')) return { ok: true, json: async () => Array.from({ length: 100 }, () => ({ stargazers_count: 0, forks_count: 0 })) };
    return { ok: true, json: async () => [{ stargazers_count: 3, forks_count: 1 }] };
  };
  assert.deepEqual(await loadGithubStats(fetcher), { repos: 101, stars: 3, forks: 1 });
  assert.equal(calls.length, 3);
});

test('GitHub API failures never return fabricated counts', async () => {
  await assert.rejects(
    () => loadGithubStats(async () => ({ ok: false })),
    /GitHub is unavailable/,
  );
});
