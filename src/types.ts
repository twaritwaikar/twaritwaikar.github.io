export type TabType = 'HOME' | 'PROJECTS' | 'EXPERIENCE' | 'ABOUT' | 'CONTACT';

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
  homeFocusLabel: string;
  homeHighlights: string[];
}

export interface ProjectMedia {
  src: string;
  caption?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  title: string;
  version: string;
  githubStars?: number;
  description: string;
  tags: string[];
  hasPreview?: boolean;
  liveUrl?: string;
  liveLabel?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  status: 'LIVE' | 'OFFLINE' | 'PRIVATE' | 'BUILD_FAIL';
  featured?: boolean;
  featuredImage?: ProjectMedia;
  role?: string;
  stackLine?: string;
  images?: ProjectMedia[];
  links?: { label: string; url: string }[];
  article?: string;
  details?: {
    throughput?: string;
    latency?: string;
    highlights: string[];
    codeSnippet?: string;
  };
}

export interface ExperienceItem {
  id: string;
  filename: string;
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
