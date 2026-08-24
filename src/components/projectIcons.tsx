import React from 'react';
import { Box, FileCode, Flag, GitBranch, GitMerge, Layers } from 'lucide-react';

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
