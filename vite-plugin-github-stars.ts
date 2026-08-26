import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { githubRepoFromUrl } from './src/data/githubRepo';

const VIRTUAL_ID = 'virtual:github-stars';
const RESOLVED_ID = `\0${VIRTUAL_ID}`;

function collectGithubRepos(projectsDir: string): string[] {
  if (!fs.existsSync(projectsDir)) return [];

  const repos = new Set<string>();
  for (const file of fs.readdirSync(projectsDir)) {
    if (!file.endsWith('.md')) continue;
    const raw = fs.readFileSync(path.join(projectsDir, file), 'utf8');
    const source = raw.match(/^source:\s*(.+)$/m)?.[1]?.trim();
    const repo = githubRepoFromUrl(source);
    if (repo) repos.add(repo);
  }
  return [...repos];
}

async function fetchStarCount(repo: string): Promise<number | undefined> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'twarit.cc-portfolio',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers,
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.warn(`[github-stars] ${repo}: ${response.status} ${response.statusText}`);
      return undefined;
    }
    const data = (await response.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === 'number' ? data.stargazers_count : undefined;
  } catch (error) {
    console.warn(`[github-stars] ${repo}:`, error);
    return undefined;
  }
}

export function githubStarsPlugin(rootDir: string): Plugin {
  const projectsDir = path.join(rootDir, 'content', 'projects');
  let cache: Record<string, number> | null = null;

  async function loadStars(): Promise<Record<string, number>> {
    if (cache) return cache;
    const stars: Record<string, number> = {};
    const repos = collectGithubRepos(projectsDir);
    await Promise.all(
      repos.map(async (repo) => {
        const count = await fetchStarCount(repo);
        if (count != null) stars[repo] = count;
      })
    );
    cache = stars;
    return stars;
  }

  return {
    name: 'github-stars',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    async load(id) {
      if (id !== RESOLVED_ID) return;
      const stars = await loadStars();
      return `export default ${JSON.stringify(stars)}`;
    },
  };
}
