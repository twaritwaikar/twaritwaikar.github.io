import siteRaw from '../../content/site.md?raw';
import profileRaw from '../../content/profile.md?raw';
import stackRaw from '../../content/stack.md?raw';
import contactRaw from '../../content/contact.md?raw';
import {
  asContact,
  asEducation,
  asExperience,
  asProject,
  asSite,
  parseMarkdownFile,
  parseStackMarkdown,
  sortContentPaths,
  str,
  strList,
} from './parseMarkdown';
import type { ProjectItem } from '../types';

const experienceFiles = import.meta.glob('../../content/experience/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const projectFiles = import.meta.glob('../../content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const siteFile = parseMarkdownFile(siteRaw);
const profileFile = parseMarkdownFile(profileRaw);
const stackFile = parseMarkdownFile(stackRaw);
const contactFile = parseMarkdownFile(contactRaw);

const site = asSite(siteFile.data, siteFile.body);
const profileMeta = profileFile.data;

const projects = sortContentPaths(Object.keys(projectFiles)).map((path) =>
  asProject(...toPair(projectFiles[path]))
);

const experience = sortContentPaths(Object.keys(experienceFiles)).map((path) =>
  asExperience(...toPair(experienceFiles[path]))
);

const featured = projects.find((project) => project.featured) ?? projects[0];
const currentRole = experience[0];

function toPair(raw: string) {
  const parsed = parseMarkdownFile(raw);
  return [parsed.data, parsed.body] as const;
}

function latestFrom(project?: ProjectItem) {
  if (!project) {
    return {
      id: 'LATEST_DEPLOYMENT.sh',
      version: '',
      title: '',
      summary: '',
      stack: '',
      role: '',
      projectId: '',
    };
  }
  return {
    id: 'LATEST_DEPLOYMENT.sh',
    version: project.version,
    title: project.title,
    summary: project.description,
    stack: project.stackLine || project.tags.join(', '),
    role: project.role || 'AUTHOR',
    projectId: project.id,
  };
}

export const PORTFOLIO_DATA = {
  site,
  profile: {
    handle: str(profileMeta, 'handle'),
    role: str(profileMeta, 'role'),
    headline: str(profileMeta, 'headline') || str(profileMeta, 'role'),
    title: str(profileMeta, 'title'),
    tagline: str(profileMeta, 'tagline'),
    location: str(profileMeta, 'location'),
    status: str(profileMeta, 'status'),
    experienceYears: str(profileMeta, 'experience_years'),
    bio: profileFile.body
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .filter(Boolean),
    latestDeployment: latestFrom(featured),
    currentRole,
    education: asEducation(profileMeta),
    terminalBoot: strList(profileMeta, 'terminal_boot'),
  },
  projects,
  techStack: parseStackMarkdown(stackFile.body),
  experience,
  contact: asContact(contactFile.data, contactFile.body),
  networkNodes: [
    { name: 'GITHUB', url: site.github },
    { name: 'LINKEDIN', url: site.linkedin },
    { name: 'EMAIL', url: `mailto:${site.email}` },
  ].filter((node) => node.url),
};
