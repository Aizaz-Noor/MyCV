import { memo, useEffect, useState } from 'react';
import { loadGithubStats } from '../services/github';

const CACHE_KEY = 'gh_stats_cache_v2';
const CACHE_TTL = 60 * 60 * 1000;

function readCache() {
  try {
    const stored = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (stored && Number.isFinite(stored.timestamp) &&
      Number.isFinite(stored.data?.repos) &&
      Number.isFinite(stored.data?.stars) &&
      Number.isFinite(stored.data?.forks)) {
      return { ...stored, fresh: Date.now() - stored.timestamp < CACHE_TTL };
    }
  } catch {
    // Storage may be disabled or contain stale schema.
  }
  return null;
}

function GithubStats() {
  const [cached] = useState(readCache);
  const [stats, setStats] = useState(cached?.data ?? null);
  const [status, setStatus] = useState(
    cached?.fresh ? 'ready' : 'loading'
  );

  useEffect(() => {
    if (cached?.fresh) return;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    let active = true;

    loadGithubStats(fetch, controller.signal).then((fresh) => {
      if (!active) return;
      setStats(fresh);
      setStatus('ready');
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: fresh }));
      } catch {
        // Live values still render when storage is unavailable.
      }
    }).catch(() => {
      if (active) setStatus(cached ? 'stale' : 'unavailable');
    }).finally(() => clearTimeout(timeout));

    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [cached]);

  return (
    <div className="github-stats" aria-live="polite">
      <div className="github-stats-values">
        {[
          ['Repositories', 'repos'],
          ['Total stars', 'stars'],
          ['Total forks', 'forks'],
        ].map(([label, key]) => (
          <div key={key}>
            <strong>{stats ? stats[key] : status === 'loading' ? '…' : '—'}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      {status === 'stale' && <p>GitHub is unavailable. Showing previously saved counts.</p>}
      {status === 'unavailable' && <p>GitHub counts are unavailable. <a href="https://github.com/Aizaz-Noor">View the profile</a>.</p>}
    </div>
  );
}

export default memo(GithubStats);
