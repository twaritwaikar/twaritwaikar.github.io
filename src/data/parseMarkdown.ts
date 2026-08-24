import type {
  ContactContent,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SiteConfig,
  TechStackCategory,
} from '../types';

export function parseMarkdownFile(raw: string): {
  data: Record<string, unknown>;
  body: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw.trim() };
  return { data: parseSimpleYaml(match[1]), body: match[2].replace(/^\r?\n/, '').trim() };
}

function unquote(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function coerce(value: string): unknown {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return value;
}

function parseSimpleYaml(src: string): Record<string, unknown> {
  const lines = src.replace(/\t/g, '  ').split(/\r?\n/);
  const data: Record<string, unknown> = {};
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) {
      i += 1;
      continue;
    }

    const keyed = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!keyed) {
      i += 1;
      continue;
    }

    const key = keyed[1];
    const rest = keyed[2];

    if (rest === '') {
      const items: string[] = [];
      while (i + 1 < lines.length && /^\s+-\s+/.test(lines[i + 1])) {
        i += 1;
        items.push(unquote(lines[i].replace(/^\s+-\s+/, '')));
      }
      data[key] = items;
    } else if (rest.startsWith('[') && rest.endsWith(']')) {
      data[key] = rest
        .slice(1, -1)
        .split(',')
        .map((item) => coerce(unquote(item)))
        .filter((item) => item !== '');
    } else {
      data[key] = coerce(unquote(rest));
    }

    i += 1;
  }

  return data;
}

export function str(data: Record<string, unknown>, key: string, fallback = ''): string {
  const value = data[key];
  return value == null ? fallback : String(value);
}

export function strList(data: Record<string, unknown>, key: string): string[] {
  const value = data[key];
  if (Array.isArray(value)) return value.map((item) => String(item));
  if (typeof value === 'string' && value.trim()) {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

export function bool(data: Record<string, unknown>, key: string, fallback = false): boolean {
  const value = data[key];
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === 'true';
  return fallback;
}

export function paragraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);
}

export function bullets(body: string): string[] {
  return body
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*-\s+(.+)/)?.[1]?.trim())
    .filter((line): line is string => Boolean(line));
}

export function splitBodyAndCode(body: string): { description: string; codeSnippet?: string } {
  const match = body.match(/```[\w+-]*\r?\n([\s\S]*?)```\s*$/);
  if (!match || match.index == null) return { description: body.trim() };
  return {
    description: body.slice(0, match.index).trim(),
    codeSnippet: match[1].replace(/\s+$/, ''),
  };
}

export function parseStackMarkdown(body: string): TechStackCategory[] {
  const categories: TechStackCategory[] = [];
  let current: TechStackCategory | null = null;

  for (const line of body.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+)/);
    if (heading) {
      current = { category: heading[1].trim(), items: [] };
      categories.push(current);
      continue;
    }
    const item = line.match(/^\s*-\s+(.+)/);
    if (item && current) current.items.push(item[1].trim());
  }

  return categories;
}

export function sortContentPaths(paths: string[]): string[] {
  return [...paths].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export function asSite(data: Record<string, unknown>, body: string): SiteConfig {
  const tiles = strList(data, 'home_tiles');
  return {
    brand: str(data, 'brand', 'PORTFOLIO'),
    year: str(data, 'year', String(new Date().getFullYear())),
    copyright: str(data, 'copyright', body) || `${str(data, 'brand')} // BUILT_IN_INDIA`,
    avatar: str(data, 'avatar'),
    resumeUrl: str(data, 'resume'),
    email: str(data, 'email'),
    github: str(data, 'github'),
    linkedin: str(data, 'linkedin'),
    homeTiles: [tiles[0] || 'SYSTEMS', tiles[1] || 'GRAPHICS'],
    statusLabel: str(data, 'status_label', 'OPERATIONAL'),
    locationShort: str(data, 'location_short', 'INDIA'),
  };
}

export function asExperience(data: Record<string, unknown>, body: string): ExperienceItem {
  const list = bullets(body);
  return {
    period: str(data, 'period'),
    role: str(data, 'role'),
    company: str(data, 'company'),
    location: str(data, 'location'),
    description: list.length ? list.join(' ') : paragraphs(body).join(' '),
    bullets: list,
  };
}

export function parseLinks(data: Record<string, unknown>): { label: string; url: string }[] {
  return strList(data, 'links')
    .map((item) => {
      const split = item.indexOf('|');
      if (split === -1) return null;
      return { label: item.slice(0, split).trim(), url: item.slice(split + 1).trim() };
    })
    .filter((item): item is { label: string; url: string } => Boolean(item?.label && item.url));
}

export function asProject(data: Record<string, unknown>, body: string): ProjectItem {
  const { description, codeSnippet } = splitBodyAndCode(body);
  const highlights = strList(data, 'highlights');
  const architecture = str(data, 'architecture');
  const status = str(data, 'status', 'LIVE').toUpperCase() as ProjectItem['status'];
  const paras = paragraphs(description);

  return {
    id: str(data, 'id'),
    name: str(data, 'filename', str(data, 'name')),
    title: str(data, 'title', str(data, 'filename')),
    version: str(data, 'version'),
    description: str(data, 'summary') || paras[0] || '',
    article: description.trim() || undefined,
    tags: strList(data, 'tags').map((tag) => tag.toUpperCase()),
    hasPreview: bool(data, 'preview'),
    liveUrl: str(data, 'live') || undefined,
    liveLabel: str(data, 'live_label') || undefined,
    sourceUrl: str(data, 'source') || undefined,
    sourceLabel: str(data, 'source_label') || undefined,
    status: ['LIVE', 'OFFLINE', 'PRIVATE', 'BUILD_FAIL'].includes(status) ? status : 'LIVE',
    featured: bool(data, 'featured'),
    role: str(data, 'role') || undefined,
    stackLine: str(data, 'stack_line') || undefined,
    images: strList(data, 'images'),
    links: parseLinks(data),
    details:
      architecture || highlights.length || codeSnippet
        ? {
            architecture,
            throughput: str(data, 'throughput') || undefined,
            latency: str(data, 'latency') || undefined,
            highlights,
            codeSnippet,
          }
        : undefined,
  };
}

export function asContact(data: Record<string, unknown>, body: string): ContactContent {
  return {
    heading: str(data, 'heading', 'ESTABLISH_CONNECTION'),
    body: body.trim(),
  };
}

export function asEducation(data: Record<string, unknown>): EducationItem | undefined {
  const degree = str(data, 'education_degree');
  if (!degree) return undefined;
  return {
    degree,
    detail: str(data, 'education_detail'),
  };
}
