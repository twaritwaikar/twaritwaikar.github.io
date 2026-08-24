import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Maximize2, RefreshCw } from 'lucide-react';
import { ExperienceIcon } from './projectIcons';
import { MarkdownInline } from './MarkdownArticle';

interface ExperienceViewProps {
  onOpenExperienceModal: (experienceId: string) => void;
}

export const ExperienceView: React.FC<ExperienceViewProps> = ({
  onOpenExperienceModal,
}) => {
  const { experience } = PORTFOLIO_DATA;

  return (
    <div id="experience_view_container" className="h-auto lg:h-full lg:min-h-0 flex flex-col gap-3 max-w-[1280px] mx-auto overflow-visible lg:overflow-hidden">
      <section id="experience_header_section" className="shrink-0">
        <div className="flex items-stretch gap-3">
          <span className="w-1.5 bg-white shrink-0" />
          <div className="flex flex-col justify-center gap-1.5 py-0.5">
            <h1
              id="experience_heading"
              className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-white leading-none"
            >
              BUILD/EXPERIENCE
            </h1>
            <p className="font-mono text-xs text-[#5CE883] leading-none">
              ~ $ cat ./execution_log
            </p>
          </div>
        </div>
      </section>

      <section
        id="box_execution_log"
        className="border border-[#2a2a2a] p-4 lg:flex-1 lg:min-h-0 lg:overflow-hidden flex flex-col bg-[#141414]"
      >
        <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 pb-3 border-b border-[#262626] mb-3 shrink-0">
          <RefreshCw className="w-3.5 h-3.5 text-[#5CE883]" />
          <span className="tracking-widest uppercase">EXECUTION_LOG</span>
        </div>

        <div className="space-y-2 overflow-visible lg:overflow-y-auto min-h-0 pr-1">
          {experience.map((exp) => (
            <div
              role="button"
              tabIndex={0}
              key={exp.id}
              id={`experience_entry_${exp.id}`}
              onClick={() => onOpenExperienceModal(exp.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onOpenExperienceModal(exp.id);
                }
              }}
              className="group w-full text-left grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 p-3 border border-transparent hover:border-[#5CE883] cursor-pointer transition-colors hover:bg-[#1a1a1a]"
            >
              <div className="sm:col-span-3 font-mono text-xs text-neutral-400 tracking-wider flex items-start gap-2">
                <ExperienceIcon id={exp.id} />
                <span>{exp.period}</span>
              </div>
              <div className="sm:col-span-8 space-y-1 min-w-0">
                <h3
                  className="font-mono text-sm sm:text-base font-bold tracking-tight text-white"
                >
                  {exp.role}
                </h3>
                <div className="font-mono text-xs text-[#5CE883]">
                  {exp.company} // {exp.location}
                </div>
                <p className="font-sans text-sm text-neutral-400 leading-relaxed line-clamp-2">
                  <MarkdownInline markdown={exp.bullets[0] || exp.description} />
                </p>
              </div>
              <div className="sm:col-span-1 flex items-end justify-end">
                <span
                  title="Open details"
                  className="w-8 h-8 border border-[#333333] group-hover:border-[#5CE883] group-hover:text-[#5CE883] bg-[#161616] text-neutral-300 flex items-center justify-center"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
