import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Star } from 'lucide-react';
import { projectCardBackground } from '../media';
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
    <div id="projects_view_container" className="h-auto lg:h-full lg:min-h-0 flex flex-col gap-3 w-full overflow-visible lg:overflow-hidden">
      <section id="projects_header_section" className="shrink-0">
        <div className="flex items-stretch gap-3">
          <span className="w-1.5 bg-white shrink-0" />
          <div className="flex flex-col justify-center gap-1.5 py-0.5">
            <h1
              id="projects_heading"
              className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-white leading-none"
            >
              SRC/PROJECTS
            </h1>
            <p className="font-mono text-xs text-[var(--accent)] leading-none">
              ~ $ ls -la ./src/projects
            </p>
          </div>
        </div>
      </section>

      <section
        id="projects_grid"
        className="grid gap-3 md:gap-4 min-h-0 lg:flex-1 lg:overflow-y-auto lg:content-start pr-1 grid-cols-[repeat(auto-fill,minmax(min(100%,max(20rem,calc((100%-2rem)/3))),1fr))]"
      >
        {projects.map((project) => {
          const background = projectCardBackground(
            project.featuredImage?.src || project.images?.[0]?.src
          );

          return (
            <div
              key={project.id}
              id={`project_card_${project.id}`}
              onClick={() => onOpenProjectModal(project.id)}
              className="group relative flex flex-col min-w-0 cursor-pointer border border-[#2a2a2a] bg-[#141414] transition-colors hover:border-[var(--accent)]"
            >
              {background ? <CardBackground media={background} /> : null}

              <div
                className={`relative z-10 px-4 py-2.5 border-b border-[#2a2a2a] flex items-center justify-between font-mono text-xs text-neutral-300 shrink-0 ${
                  background ? 'bg-[#111111]/95' : 'bg-[#111111]'
                }`}
              >
                <span className="font-bold tracking-wide flex items-center gap-2 min-w-0">
                  <ProjectIcon id={project.id} />
                  <span className="truncate">{project.name}</span>
                </span>
                {project.githubStars != null && (
                  <span className="text-neutral-400 font-medium shrink-0 ml-2 inline-flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {project.githubStars.toLocaleString('en-US')}
                  </span>
                )}
              </div>

              <div className="relative z-10 p-4 sm:p-5 flex-1 flex flex-col min-h-[11rem]">
                <p
                  className={`font-sans text-sm leading-relaxed line-clamp-4 ${
                    background
                      ? 'text-neutral-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]'
                      : 'text-neutral-400'
                  }`}
                >
                  <MarkdownInline markdown={project.description} />
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 shrink-0">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 font-mono text-[10px] uppercase tracking-wider border border-[#333333] bg-[#1a1a1a]/90 text-neutral-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

function CardBackground({
  media,
}: {
  media: { kind: 'image' | 'video'; src: string };
}) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {media.kind === 'video' ? (
        <video
          src={media.src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover brightness-[0.4]"
        />
      ) : (
        <img
          src={media.src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover brightness-[0.4]"
        />
      )}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/35 transition-colors" />
    </div>
  );
}
