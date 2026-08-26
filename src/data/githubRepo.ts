const GITHUB_REPO_RE = /github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)/i;

export function githubRepoFromUrl(url?: string): string | undefined {
  if (!url) return undefined;
  const match = url.match(GITHUB_REPO_RE);
  if (!match) return undefined;
  return `${match[1]}/${match[2].replace(/\.git$/i, '')}`;
}
