import React from 'react';
import {
  Box,
  Cloud,
  Code2,
  Cog,
  Cpu,
  FileCode,
  Flag,
  GitBranch,
  GitMerge,
  Layers,
  Search,
  Server,
  Sparkles,
} from 'lucide-react';

export function ProjectIcon({
  id,
  className = 'w-3.5 h-3.5 shrink-0',
}: {
  id: string;
  className?: string;
}) {
  switch (id) {
    case 'p4-fusion':
      return <GitBranch className={`${className} text-orange-400`} />;
    case 'rootex':
      return <Box className={`${className} text-violet-400`} />;
    case 'godot-vcs':
      return <GitMerge className={`${className} text-sky-400`} />;
    case 'rubeus':
      return <Layers className={`${className} text-amber-400`} />;
    case 'g-for-golf':
      return <Flag className={`${className} text-lime-400`} />;
    default:
      return <FileCode className={`${className} text-blue-400`} />;
  }
}

export function ExperienceIcon({
  id,
  className = 'w-3.5 h-3.5 shrink-0',
}: {
  id: string;
  className?: string;
}) {
  switch (id) {
    case 'salesforce-smts':
      return <Search className={`${className} text-emerald-400`} />;
    case 'salesforce-mts':
      return <Server className={`${className} text-sky-400`} />;
    case 'salesforce-amts':
      return <Cpu className={`${className} text-violet-400`} />;
    case 'salesforce-intern':
      return <Cloud className={`${className} text-cyan-400`} />;
    case 'gsoc-godot':
      return <Sparkles className={`${className} text-amber-400`} />;
    case 'bosch':
      return <Cog className={`${className} text-orange-400`} />;
    case 'sdslabs':
      return <Code2 className={`${className} text-lime-400`} />;
    default:
      return <Cpu className={`${className} text-neutral-400`} />;
  }
}
