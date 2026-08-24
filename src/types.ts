export type TabType = 'HOME' | 'PROJECTS' | 'STACK' | 'CONTACT';

export interface SiteConfig {
  brand: string;
  year: string;
  copyright: string;
  avatar: string;
  resumeUrl: string;
  email: string;
  github: string;
  linkedin: string;
  homeTiles: [string, string];
  statusLabel: string;
  locationShort: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  title: string;
  version: string;
  description: string;
  tags: string[];
  hasPreview?: boolean;
  liveUrl?: string;
  liveLabel?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  status: 'LIVE' | 'OFFLINE' | 'PRIVATE' | 'BUILD_FAIL';
  featured?: boolean;
  role?: string;
  stackLine?: string;
  images?: string[];
  links?: { label: string; url: string }[];
  article?: string;
  details?: {
    architecture: string;
    throughput?: string;
    latency?: string;
    highlights: string[];
    codeSnippet?: string;
  };
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  bullets: string[];
  technologies?: string[];
}

export interface TechStackCategory {
  category: string;
  items: string[];
}

export interface TerminalLog {
  text: string;
  type?: 'system' | 'success' | 'warning' | 'error' | 'input';
}

export interface ContactContent {
  heading: string;
  body: string;
}

export interface EducationItem {
  degree: string;
  detail: string;
}
