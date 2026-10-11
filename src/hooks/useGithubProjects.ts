import { useEffect, useState } from 'react';
import type { Project } from '../data/portfolio';
import { portfolio } from '../data/portfolio';
import { safeExternalUrl } from '../lib/links';

type GithubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  html_url: string;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
};

type Status = 'disabled' | 'loading' | 'loaded' | 'error' | 'empty';

export function useGithubProjects(): { status: Status; projects: Project[] } {
  const { enabled, username, repositories, maxProjects } = portfolio.githubIntegration;
  const [state, setState] = useState<{ status: Status; projects: Project[] }>({
    status: enabled && username.trim() ? 'loading' : 'disabled',
    projects: [],
  });

  useEffect(() => {
    if (!enabled || !username.trim()) return;
    const controller = new AbortController();
    const name = encodeURIComponent(username.trim());

    async function getRepo(url: string): Promise<GithubRepo | GithubRepo[]> {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
      return response.json() as Promise<GithubRepo | GithubRepo[]>;
    }

    async function load() {
      try {
        let chosen: GithubRepo[];
        if (repositories.length) {
          // Fetch named repositories directly: no missing projects after the first 100.
          const found = await Promise.all(repositories.map(repo =>
            getRepo(`https://api.github.com/repos/${name}/${encodeURIComponent(repo)}`),
          ));
          chosen = found.flatMap(repo => Array.isArray(repo) ? repo : [repo]);
        } else {
          const repos = await getRepo(`https://api.github.com/users/${name}/repos?per_page=100&type=owner&sort=updated`);
          chosen = Array.isArray(repos) ? repos : [repos];
        }
        const selected = chosen.filter(repo => !repo.fork && !repo.archived).slice(0, maxProjects)
          .map((repo, i): Project => ({
            id: repo.name,
            title: repo.name.replace(/[-_]/g, ' '),
            description: repo.description?.trim() || 'Explore this public repository on GitHub.',
            technologies: [...new Set([repo.language, ...(repo.topics ?? [])].filter((s): s is string => Boolean(s)))].slice(0, 4),
            githubUrl: safeExternalUrl(repo.html_url),
            demoUrl: safeExternalUrl(repo.homepage),
            image: null,
            category: `GITHUB PROJECT / ${String(i + 1).padStart(2, '0')}`,
          }));
        if (!controller.signal.aborted) setState({ status: selected.length ? 'loaded' : 'empty', projects: selected });
      } catch (error) {
        if (!controller.signal.aborted) {
          console.warn('GitHub projects could not load; showing configured projects.', error);
          setState({ status: 'error', projects: [] });
        }
      }
    }
    void load();
    return () => controller.abort();
  }, [enabled, username, repositories, maxProjects]);

  return state;
}
