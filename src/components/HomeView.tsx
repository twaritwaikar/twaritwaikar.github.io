import React from 'react';
import { TabType } from '../types';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { MarkdownInline } from './MarkdownArticle';

interface HomeViewProps {
  setActiveTab: (tab: TabType) => void;
  onOpenResume: () => void;
  onOpenExperienceModal: (experienceId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  onOpenResume,
  onOpenExperienceModal,
}) => {
  const { profile, experience } = PORTFOLIO_DATA;
  const currentRole = profile.currentRole;
  const panel = 'bg-[#141414]';
  const summary = currentRole?.bullets[0] || currentRole?.description || profile.tagline;
  const stack = currentRole?.technologies?.slice(0, 6).join(', ') || currentRole?.company || '';

  return (
    <div id="home_view_container" className="h-auto lg:h-full lg:min-h-0 flex flex-col gap-3 md:gap-4 max-w-[1280px] mx-auto lg:overflow-hidden">
      <section id="hero_headline_section" className="space-y-2 shrink-0">
        <div>
          <h1
            id="hero_main_handle"
            className="font-mono text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-white"
          >
            {profile.handle}
          </h1>
          <div
            id="hero_main_role"
            className="font-mono text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--accent)] tracking-tight leading-tight mt-0.5"
          >
            // {profile.headline}
          </div>
        </div>

        <p
          id="hero_tagline"
            className="font-sans text-sm md:text-base max-w-3xl leading-relaxed text-neutral-400"
        >
          {profile.tagline}
        </p>

        {profile.education && (
          <p
            id="hero_education"
            className="font-mono text-xs sm:text-sm tracking-wide text-neutral-500"
          >
            <span className="text-neutral-500">EDU:</span>{' '}
            <span className="text-neutral-300">
              {profile.education.degree}
            </span>
            <span className="hidden sm:inline text-neutral-600"> // </span>
            <span className="block sm:inline text-[var(--accent)]">{profile.education.detail}</span>
          </p>
        )}

        <div id="hero_action_buttons" className="flex flex-wrap items-center gap-3 pt-1">
          <button
            id="btn_open_resume"
            onClick={onOpenResume}
            className="px-5 py-2.5 font-mono text-xs sm:text-sm font-semibold tracking-wider border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-all flex items-center gap-2 cursor-pointer btn-brutalist"
          >
            <span>OPEN_RESUME.PDF</span>
          </button>

          <button
            id="btn_init_contact"
            onClick={() => setActiveTab('CONTACT')}
            className="px-5 py-2.5 font-mono text-xs sm:text-sm font-semibold tracking-wider border transition-all flex items-center gap-2 cursor-pointer btn-brutalist border-neutral-500 text-neutral-200 hover:bg-white hover:text-black hover:border-white"
          >
            <span>INIT_CONTACT</span>
          </button>
        </div>
      </section>

      <section className="lg:flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#262626] overflow-hidden">
        <article
          id="latest_deployment_card"
          onClick={() => currentRole && onOpenExperienceModal(currentRole.id)}
          className={`lg:col-span-8 border-b lg:border-b-0 lg:border-r border-[#262626] transition-all cursor-pointer group flex flex-col min-h-0 ${panel} hover:border-[var(--accent)]`}
        >
          <div className="px-4 py-2 bg-[#111111] border-b border-[#262626] flex items-center justify-between font-mono text-xs text-neutral-400 shrink-0">
            <span className="group-hover:text-[var(--accent)] transition-colors">LATEST_DEPLOYMENT.sh</span>
            <span className="flex items-center gap-2">
              <span className="text-neutral-500">{currentRole?.period}</span>
              <span
                id="btn_expand_latest_deployment"
                title="Open details"
                className="w-7 h-7 border border-[#333333] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] bg-[#161616] text-neutral-300 flex items-center justify-center"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </span>
            </span>
          </div>

          <div className="p-3 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center flex-1 min-h-0">
            <div className="md:col-span-8 space-y-2 min-w-0">
              <h3 className="font-mono text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[var(--accent)] transition-colors">
                {currentRole?.role}
              </h3>
              <p className="font-sans text-sm text-neutral-400 leading-relaxed">
                <MarkdownInline markdown={summary} />
              </p>
            </div>

            <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#262626] pt-4 md:pt-0 md:pl-6 space-y-3 font-mono text-xs">
              <div className="flex justify-between md:flex-col gap-1">
                <span className="text-neutral-500 tracking-wider">ORG</span>
                <span className="text-neutral-200 font-semibold">{currentRole?.company}</span>
              </div>
              <div className="flex justify-between md:flex-col gap-1">
                <span className="text-neutral-500 tracking-wider">STACK</span>
                <span className="text-[var(--accent)] font-semibold break-words text-right md:text-left">{stack}</span>
              </div>
            </div>
          </div>
        </article>

        <button
          type="button"
          id="focus_areas_tile"
          onClick={() => setActiveTab('STACK')}
          className="lg:col-span-4 bg-[var(--accent)] text-black p-3 sm:p-4 lg:p-5 flex flex-col justify-between gap-3 lg:gap-4 cursor-pointer hover:bg-[var(--accent-hover)] transition-all select-none group text-left w-full min-h-0 lg:min-h-[160px]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-black/60">
                {PORTFOLIO_DATA.site.homeFocusLabel}
              </div>
              <div className="mt-0.5 font-mono text-[10px] font-semibold tracking-widest uppercase text-black/50">
                {PORTFOLIO_DATA.site.homeTiles.join(' Â· ')}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="lg:hidden font-mono text-[10px] font-bold tracking-widest uppercase text-black/70">
                OPEN_BIO
              </span>
              <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 text-black stroke-[2.5] transform group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          <ul className="flex flex-wrap lg:flex-col gap-x-3 gap-y-1 lg:gap-1">
            {PORTFOLIO_DATA.site.homeHighlights.map((item) => (
              <li
                key={item}
                className="font-mono text-sm sm:text-base lg:text-2xl font-black tracking-tight uppercase text-black leading-none"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="hidden lg:block font-mono text-[11px] font-bold tracking-widest uppercase text-black/60">
            OPEN_BIO
          </div>
        </button>
      </section>

      <section
        id="build_experience_section"
        className={`border border-[#262626] lg:flex-1 lg:min-h-0 lg:overflow-hidden flex flex-col ${panel}`}
      >
        <div className="px-4 py-2 bg-[#111111] border-b border-[#262626] flex items-center justify-between font-mono text-xs text-neutral-400 shrink-0">
          <span>BUILD/EXPERIENCE</span>
          <button
            type="button"
            onClick={() => setActiveTab('EXPERIENCE')}
            className="text-[var(--accent)] hover:underline cursor-pointer"
          >
            OPEN_LOG
          </button>
        </div>
        <div className="overflow-y-auto min-h-0 divide-y divide-[#222]">
          {experience.map((exp) => (
            <button
              key={exp.id}
              type="button"
              onClick={() => onOpenExperienceModal(exp.id)}
              className="w-full text-left px-4 py-2 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 sm:items-center cursor-pointer hover:bg-[#1a1a1a] transition-colors group"
            >
              <span className="sm:col-span-3 font-mono text-[11px] text-neutral-500 leading-none flex items-center">
                {exp.period}
              </span>
              <span className="sm:col-span-8 flex flex-col sm:flex-row sm:items-center sm:gap-3 min-w-0">
                <span className="font-mono text-sm font-bold text-white leading-none">
                  {exp.role}
                </span>
                <span className="font-mono text-xs text-[var(--accent)] truncate leading-none">
                  {exp.company} // {exp.location}
                </span>
              </span>
              <span
                title="Open details"
                className="sm:col-span-1 w-8 h-8 ml-auto border border-[#333333] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] bg-[#161616] text-neutral-300 flex items-center justify-center"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
