import React, { useState, useEffect } from 'react';

export default React.memo(function GithubStats() {
  const [stats, setStats] = useState({ repos: 15, stars: 15, forks: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const CACHE_KEY = 'gh_stats_cache_v1';
      const CACHE_TTL = 3600000; // 1 hour

      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL) {
            setStats(parsed.data);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        // Fallthrough if localStorage is restricted
      }

      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/Aizaz-Noor'),
          fetch('https://api.github.com/users/Aizaz-Noor/repos?per_page=100')
        ]);

        if (!userRes.ok) throw new Error('Failed to fetch user');
        if (!reposRes.ok) throw new Error('Failed to fetch repos');

        const [userData, reposData] = await Promise.all([
          userRes.json(),
          reposRes.json()
        ]);

        let totalStars = 0;
        let totalForks = 0;

        for (const repo of reposData) {
          totalStars += repo.stargazers_count || 0;
          totalForks += repo.forks_count || 0;
        }

        const freshStats = {
          repos: userData.public_repos || 15,
          stars: totalStars,
          forks: totalForks,
        };

        setStats(freshStats);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: freshStats,
          }));
        } catch (e) {}
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', opacity: 0.5, justifyContent: 'center' }}>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-1)', fontFamily: 'monospace' }}>...</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Repositories</div>
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-1)', fontFamily: 'monospace' }}>...</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Stars</div>
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-1)', fontFamily: 'monospace' }}>...</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Forks</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-1)', fontFamily: 'monospace' }}>{stats.repos}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Repositories</div>
      </div>
      <div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-1)', fontFamily: 'monospace' }}>{stats.stars}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Stars</div>
      </div>
      <div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-1)', fontFamily: 'monospace' }}>{stats.forks}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Forks</div>
      </div>
    </div>
  );
});
