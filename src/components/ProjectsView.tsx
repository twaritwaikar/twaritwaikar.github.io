import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ExternalLink, Lock, Maximize2, Wrench } from 'lucide-react';
import { MarkdownInline } from './MarkdownArticle';
import { ProjectIcon } from './projectIcons';

interface ProjectsViewProps {
  onOpenProjectModal: (projectId: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  onOpenProjectModal,
}) => {
  const { projects } = PORTFOLIO_DATA;

  return (
    <div id="projects_view_container" className="h-auto lg:h-full lg:min-h-0 flex flex-col gap-3 max-w-[1280px] mx-auto overflow-visible lg:overflow-hidden">
      <section id="projects_header_section" className="space-y-0.5 shrink-0">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-6 sm:h-7 bg-white" />
          <h1
            id="projects_heading"
            className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-white"
          >
            SRC/PROJECTS
          </h1>
        </div>
        <p className="font-mono text-xs text-[#5CE883] pl-4">
          ~ $ ls -la ./deployments
        </p>
      </section>

      <section
        id="projects_grid"
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0 lg:flex-1 lg:overflow-y-auto pr-1"
      >
        {projects.map((project) => {
          return (
            <div
              key={project.id}
              id={`project_card_${project.id}`}
              onClick={() => onOpenProjectModal(project.id)}
              className="border border-[#2a2a2a] flex flex-col justify-between min-h-0 cursor-pointer transition-colors bg-[#141414] hover:border-[#5CE883]"
            >
              <div className="min-h-0 flex flex-col">
                <div className="px-4 py-2.5 bg-[#111111] border-b border-[#2a2a2a] flex items-center justify-between font-mono text-xs text-neutral-300">
                  <span className="font-bold tracking-wide flex items-center gap-2 min-w-0">
                    <ProjectIcon id={project.id} />
                    <span className="truncate">{project.name}</span>
                  </span>
                  <span className="text-neutral-500 font-medium shrink-0 ml-2">{project.version}</span>
                </div>

                <div className="p-4 sm:p-5 flex-1 min-h-0">
                  <p className="font-sans text-sm text-neutral-400 leading-relaxed">
                    <MarkdownInline markdown={project.description} />
                  </p>

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

              <div
                className="p-2 bg-[#111111] border-t border-[#2a2a2a] flex items-center gap-2 font-mono text-xs"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  id={`btn_source_${project.id}`}
                  onClick={() => {
                    if (project.sourceUrl) {
                      window.open(project.sourceUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className="flex-1 py-1.5 px-2 border border-[#333333] hover:border-[#5CE883] hover:text-[#5CE883] bg-[#161616] text-neutral-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>&lt; &gt;</span>
                  <span className="truncate">{project.sourceLabel || 'SOURCE'}</span>
                </button>

                {project.status === 'LIVE' && (
                  <button
                    id={`btn_live_${project.id}`}
                    onClick={() => {
                      if (project.liveUrl) {
                        window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="flex-1 py-1.5 px-2 border border-[#5CE883] text-[#5CE883] hover:bg-[#5CE883] hover:text-black bg-[#161616] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3 h-3 shrink-0" />
                    <span className="truncate">{project.liveLabel || 'LIVE'}</span>
                  </button>
                )}

                {project.status === 'OFFLINE' && (
                  <button
                    id={`btn_offline_${project.id}`}
                    className="flex-1 py-1.5 px-2 border border-neutral-700 text-neutral-400 bg-[#161616] flex items-center justify-center gap-1"
                  >
                    <Lock className="w-3 h-3" />
                    <span>OFFLINE</span>
                  </button>
                )}

                {project.status === 'PRIVATE' && (
                  <button
                    id={`btn_private_${project.id}`}
                    className="flex-1 py-1.5 px-2 border border-neutral-700 text-neutral-400 bg-[#161616] flex items-center justify-center gap-1"
                  >
                    <Lock className="w-3 h-3" />
                    <span>PRIVATE</span>
                  </button>
                )}

                {project.status === 'BUILD_FAIL' && (
                  <button
                    id={`btn_buildfail_${project.id}`}
                    className="flex-1 py-1.5 px-2 border border-amber-900/60 text-amber-500/80 bg-[#161616] flex items-center justify-center gap-1"
                  >
                    <Wrench className="w-3 h-3 text-amber-500" />
                    <span>BUILD_FAIL</span>
                  </button>
                )}

                <button
                  id={`btn_more_${project.id}`}
                  onClick={() => onOpenProjectModal(project.id)}
                  title="More details"
                  className="shrink-0 w-8 h-8 border border-[#333333] hover:border-[#5CE883] hover:text-[#5CE883] bg-[#161616] text-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
