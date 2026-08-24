import React from 'react';
import { TabType } from '../types';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { InteractiveTerminal } from './InteractiveTerminal';
import { ArrowUpRight, Code, Server, ArrowRight, Download, Send } from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: TabType) => void;
  isDarkMode: boolean;
  onOpenResume: () => void;
  onOpenProjectModal: (projectId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  isDarkMode,
  onOpenResume,
  onOpenProjectModal,
}) => {
  const { profile } = PORTFOLIO_DATA;

  return (
    <div id="home_view_container" className="flex flex-col gap-6 md:gap-8 max-w-[1280px] mx-auto">
      {/* Hero Headline Section */}
      <section id="hero_headline_section" className="space-y-4">
        <div>
          <h1
            id="hero_main_handle"
            className={`font-mono text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none ${
              isDarkMode ? 'text-white' : 'text-neutral-900'
            }`}
          >
            {profile.handle}
          </h1>
          <div
            id="hero_main_role"
            className="font-mono text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#00FF41] tracking-tight leading-tight mt-1"
          >
            // {profile.role}
          </div>
        </div>

        <p
          id="hero_tagline"
          className={`font-sans text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
          }`}
        >
          {profile.tagline}
        </p>

        {/* Hero Action Buttons */}
        <div id="hero_action_buttons" className="flex flex-wrap items-center gap-4 pt-2">
          <button
            id="btn_deploy_resume"
            onClick={onOpenResume}
            className="px-5 py-2.5 font-mono text-xs sm:text-sm font-semibold tracking-wider border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-all flex items-center gap-2 cursor-pointer btn-brutalist"
          >
            <span>DEPLOY_RESUME.PDF</span>
          </button>

          <button
            id="btn_init_contact"
            onClick={() => setActiveTab('CONTACT')}
            className={`px-5 py-2.5 font-mono text-xs sm:text-sm font-semibold tracking-wider border transition-all flex items-center gap-2 cursor-pointer btn-brutalist ${
              isDarkMode
                ? 'border-neutral-500 text-neutral-200 hover:bg-white hover:text-black hover:border-white'
                : 'border-neutral-800 text-neutral-900 hover:bg-black hover:text-white'
            }`}
          >
            <span>INIT_CONTACT</span>
          </button>
        </div>
      </section>

      {/* Interactive Mid Grid: Terminal (Left) + System Metrics (Right) */}
      <section
        id="hero_dashboard_grid"
        className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#262626]"
      >
        {/* Left: Bash Terminal (7 Cols) */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#262626] bg-[#141414]">
          <InteractiveTerminal
            setActiveTab={setActiveTab}
            isDarkMode={isDarkMode}
            onOpenResume={onOpenResume}
          />
        </div>

        {/* Right: Metrics & Availability Grid (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Top Metric: Experience */}
          <div
            id="metric_experience_tile"
            className={`p-4 border-b border-[#262626] flex flex-col justify-between ${
              isDarkMode ? 'bg-[#141414]' : 'bg-[#EAEAEA]'
            }`}
          >
            <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              EXPERIENCE
            </div>
            <div className="mt-2 flex items-baseline gap-1.5 font-mono">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#00FF41]">
                {profile.experienceYears}
              </span>
              <span className="text-lg sm:text-xl font-bold tracking-wider text-neutral-400">
                YRS
              </span>
            </div>
          </div>

          {/* Middle Split: Backend & Infra */}
          <div className="grid grid-cols-2 border-b border-[#262626]">
            <div
              id="tile_backend_stack"
              onClick={() => setActiveTab('STACK')}
              className={`p-4 border-r border-[#262626] flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                isDarkMode
                  ? 'bg-[#141414] hover:bg-[#1c1c1c]'
                  : 'bg-[#EAEAEA] hover:bg-[#DCDCDC]'
              }`}
            >
              <div className="font-mono text-sm font-bold text-neutral-300 flex items-center gap-1">
                &lt; &gt;
              </div>
              <span className="font-mono text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                {PORTFOLIO_DATA.site.homeTiles[0]}
              </span>
            </div>

            <div
              id="tile_infra_stack"
              onClick={() => setActiveTab('STACK')}
              className={`p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                isDarkMode
                  ? 'bg-[#141414] hover:bg-[#1c1c1c]'
                  : 'bg-[#EAEAEA] hover:bg-[#DCDCDC]'
              }`}
            >
              <div className="font-mono text-sm font-bold text-neutral-300">
                [ :: ]
              </div>
              <span className="font-mono text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                {PORTFOLIO_DATA.site.homeTiles[1]}
              </span>
            </div>
          </div>

          {/* Bottom Solid Green Status Block */}
          <div
            id="status_available_tile"
            onClick={() => setActiveTab('CONTACT')}
            className="p-4 bg-[#00FF41] text-black flex items-center justify-between cursor-pointer hover:bg-[#00e639] transition-all select-none group flex-1 min-h-[90px]"
          >
            <div>
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-black/70">
                STATUS
              </div>
              <div className="font-mono text-xl sm:text-2xl font-black tracking-wider uppercase text-black mt-0.5">
                {PORTFOLIO_DATA.site.statusLabel}
              </div>
            </div>
            <ArrowRight className="w-7 h-7 text-black stroke-[2.5] transform group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>
      </section>

      {/* Bottom Section: LATEST_DEPLOYMENT.sh */}
      <section
        id="latest_deployment_card"
        onClick={() => onOpenProjectModal(profile.latestDeployment.projectId)}
        className={`border border-[#262626] transition-all cursor-pointer group ${
          isDarkMode
            ? 'bg-[#141414] hover:border-[#00FF41]'
            : 'bg-[#EAEAEA] hover:border-black'
        }`}
      >
        {/* Card Header Bar */}
        <div className="px-4 py-2 bg-[#111111] border-b border-[#262626] flex items-center justify-between font-mono text-xs text-neutral-400">
          <span className="group-hover:text-[#00FF41] transition-colors">
            {profile.latestDeployment.id}
          </span>
          <span className="text-neutral-500">{profile.latestDeployment.version}</span>
        </div>

        {/* Card Content Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <h3 className="font-mono text-lg sm:text-xl font-bold tracking-tight text-white dark:text-white group-hover:text-[#00FF41] transition-colors">
              {profile.latestDeployment.title}
            </h3>
            <p className="font-sans text-sm text-neutral-400 leading-relaxed">
              {profile.latestDeployment.summary}
            </p>
          </div>

          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#262626] pt-4 md:pt-0 md:pl-6 space-y-3 font-mono text-xs">
            <div className="flex justify-between md:flex-col gap-1">
              <span className="text-neutral-500 tracking-wider">STACK</span>
              <span className="text-neutral-200 font-semibold">
                {profile.latestDeployment.stack}
              </span>
            </div>
            <div className="flex justify-between md:flex-col gap-1">
              <span className="text-neutral-500 tracking-wider">ROLE</span>
              <span className="text-[#00FF41] font-semibold">
                {profile.latestDeployment.role}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
