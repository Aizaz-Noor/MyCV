export async function loadGithubStats(fetcher = fetch, signal) {
  const base = 'https://api.github.com/users/Aizaz-Noor';
  const [userResponse, firstReposResponse] = await Promise.all([
    fetcher(base, { signal }),
    fetcher(`${base}/repos?per_page=100&page=1`, { signal }),
  ]);
  if (!userResponse.ok || !firstReposResponse.ok) throw new Error('GitHub is unavailable');

  const user = await userResponse.json();
  const firstPage = await firstReposResponse.json();
  if (!Array.isArray(firstPage) || !Number.isFinite(user.public_repos)) {
    throw new Error('Unexpected GitHub response');
  }

  const repositories = [...firstPage];
  const pageCount = Math.ceil(user.public_repos / 100);
  for (let page = 2; page <= pageCount; page += 1) {
    const response = await fetcher(`${base}/repos?per_page=100&page=${page}`, { signal });
    if (!response.ok) throw new Error('GitHub is unavailable');
    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error('Unexpected GitHub response');
    repositories.push(...batch);
    if (batch.length < 100) break;
  }

  return {
    repos: user.public_repos,
    stars: repositories.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0),
    forks: repositories.reduce((sum, repo) => sum + (repo.forks_count ?? 0), 0),
  };
}
