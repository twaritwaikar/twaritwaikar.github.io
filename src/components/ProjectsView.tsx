import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  ExternalLink,
  Code2,
  Lock,
  Wrench,
  Activity,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface ProjectsViewProps {
  isDarkMode: boolean;
  onOpenProjectModal: (projectId: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  isDarkMode,
  onOpenProjectModal,
}) => {
  const { projects } = PORTFOLIO_DATA;
  const [activeOpsTab, setActiveOpsTab] = useState<'PROJECTS' | 'ANALYTICS' | 'CONTRIBUTIONS' | 'SETTINGS'>('PROJECTS');

  return (
    <div id="projects_view_container" className="flex flex-col gap-6 max-w-[1280px] mx-auto">
      {/* Title & Path Header */}
      <section id="projects_header_section" className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-7 sm:h-9 bg-white" />
          <h1
            id="projects_heading"
            className={`font-mono text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase ${
              isDarkMode ? 'text-white' : 'text-neutral-900'
            }`}
          >
            SRC/PROJECTS
          </h1>
        </div>
        <p className="font-mono text-xs sm:text-sm text-[#00FF41] pl-4">
          ~ $ ls -la ./deployments
        </p>
      </section>

      {/* Projects 2x2 Grid with 1px border style */}
      <section
        id="projects_grid"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {projects.map((project) => {
          return (
            <div
              key={project.id}
              id={`project_card_${project.id}`}
              onClick={() => onOpenProjectModal(project.id)}
              className={`border border-[#2a2a2a] flex flex-col justify-between transition-all group cursor-pointer ${
                isDarkMode ? 'bg-[#141414] hover:border-[#00FF41]' : 'bg-[#EAEAEA] hover:border-black'
              }`}
            >
              <div>
                {/* Card Title Bar */}
                <div className="px-4 py-2.5 bg-[#111111] border-b border-[#2a2a2a] flex items-center justify-between font-mono text-xs text-neutral-300">
                  <span className="font-bold tracking-wide group-hover:text-[#00FF41] transition-colors">
                    {project.name}
                  </span>
                  <span className="text-neutral-500 font-medium">{project.version}</span>
                </div>

                {/* Embedded Mini Telemetry / Ops Widget if ops_dashboard */}
                {project.hasPreview && (
                  <div className="p-3 border-b border-[#2a2a2a] bg-[#0c0c0c] font-mono text-[10px] text-neutral-300 select-none overflow-x-auto">
                    {/* Micro Tabs */}
                    <div className="flex items-center gap-2 border-b border-[#222] pb-1.5 mb-2">
                      {(['PROJECTS', 'ANALYTICS', 'CONTRIBUTIONS', 'SETTINGS'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveOpsTab(tab)}
                          className={`px-1.5 py-0.5 uppercase cursor-pointer ${
                            activeOpsTab === tab
                              ? 'text-white border-b border-[#00FF41] font-bold'
                              : 'text-neutral-500 hover:text-neutral-300'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Mini Activity Line Chart */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-neutral-400 text-[9px]">
                        <span>PROJECT ACTIVITY // (Q3 2024)</span>
                        <span className="text-[#00FF41]">STATUS: 99.8%</span>
                      </div>
                      
                      {/* SVG Line Graph */}
                      <div className="h-14 w-full bg-[#111] border border-[#222] p-1 relative flex items-end">
                        <svg className="w-full h-full" viewBox="0 0 300 60" fill="none" preserveAspectRatio="none">
                          {/* Grid horizontal lines */}
                          <line x1="0" y1="15" x2="300" y2="15" stroke="#222" strokeDasharray="2 2" />
                          <line x1="0" y1="35" x2="300" y2="35" stroke="#222" strokeDasharray="2 2" />
                          {/* Data path line */}
                          <path
                            d="M 0,45 L 30,42 L 60,25 L 90,30 L 120,15 L 150,22 L 180,10 L 210,18 L 240,8 L 270,14 L 300,5"
                            stroke="#00FF41"
                            strokeWidth="1.5"
                            fill="none"
                          />
                          {/* Area fill */}
                          <path
                            d="M 0,45 L 30,42 L 60,25 L 90,30 L 120,15 L 150,22 L 180,10 L 210,18 L 240,8 L 270,14 L 300,5 L 300,60 L 0,60 Z"
                            fill="rgba(0, 255, 65, 0.08)"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Repository Mini Status Table */}
                    <div className="mt-2 pt-1 border-t border-[#1f1f1f] text-[9px] text-neutral-400 space-y-1">
                      <div className="grid grid-cols-5 text-neutral-500 font-bold">
                        <span>PROJECT</span>
                        <span>STATUS</span>
                        <span>LANG</span>
                        <span>COMMITS</span>
                        <span>PUSH</span>
                      </div>
                      <div className="grid grid-cols-5 text-neutral-300">
                        <span className="text-[#00FF41]">[ECHO-SYS]</span>
                        <span>ACTIVE</span>
                        <span>TS</span>
                        <span>48</span>
                        <span>2h ago</span>
                      </div>
                      <div className="grid grid-cols-5 text-neutral-300">
                        <span className="text-white">[KAIZEN-UI]</span>
                        <span>ACTIVE</span>
                        <span>REACT</span>
                        <span>186</span>
                        <span>5h ago</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Description */}
                <div className="p-4 sm:p-5">
                  <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed min-h-[52px]">
                    {project.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 font-mono text-[10px] uppercase tracking-wider border border-[#333333] bg-[#1a1a1a] text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Row matching screenshot */}
              <div className="p-3 bg-[#111111] border-t border-[#2a2a2a] grid grid-cols-2 gap-2 font-mono text-xs" onClick={(event) => event.stopPropagation()}>
                {/* Source Button */}
                <button
                  id={`btn_source_${project.id}`}
                  onClick={() => {
                    if (project.sourceUrl) {
                      window.open(project.sourceUrl, '_blank', 'noopener,noreferrer');
                      return;
                    }
                    onOpenProjectModal(project.id);
                  }}
                  className="py-1.5 px-3 border border-[#333333] hover:border-[#00FF41] hover:text-[#00FF41] bg-[#161616] text-neutral-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="text-[11px]">&lt; &gt;</span>
                  <span>{project.sourceLabel || 'SOURCE'}</span>
                </button>

                {project.status === 'LIVE' && (
                  <button
                    id={`btn_live_${project.id}`}
                    onClick={() => {
                      if (project.liveUrl) {
                        window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                        return;
                      }
                      onOpenProjectModal(project.id);
                    }}
                    className="py-1.5 px-3 border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black bg-[#161616] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>{project.liveLabel || 'LIVE'}</span>
                  </button>
                )}

                {project.status === 'OFFLINE' && (
                  <button
                    id={`btn_offline_${project.id}`}
                    onClick={() => onOpenProjectModal(project.id)}
                    className="py-1.5 px-3 border border-neutral-700 text-neutral-400 bg-[#161616] flex items-center justify-center gap-1.5 cursor-pointer hover:border-neutral-500"
                  >
                    <Lock className="w-3 h-3" />
                    <span>OFFLINE</span>
                  </button>
                )}

                {project.status === 'PRIVATE' && (
                  <button
                    id={`btn_private_${project.id}`}
                    onClick={() => onOpenProjectModal(project.id)}
                    className="py-1.5 px-3 border border-neutral-700 text-neutral-400 bg-[#161616] flex items-center justify-center gap-1.5 cursor-pointer hover:border-neutral-500"
                  >
                    <Lock className="w-3 h-3" />
                    <span>PRIVATE</span>
                  </button>
                )}

                {project.status === 'BUILD_FAIL' && (
                  <button
                    id={`btn_buildfail_${project.id}`}
                    onClick={() => onOpenProjectModal(project.id)}
                    className="py-1.5 px-3 border border-amber-900/60 text-amber-500/80 bg-[#161616] flex items-center justify-center gap-1.5 cursor-pointer hover:border-amber-500"
                  >
                    <Wrench className="w-3 h-3 text-amber-500" />
                    <span>BUILD_FAIL</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
