import React from 'react';
import { TabType } from '../types';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { RefreshCw, LayoutGrid } from 'lucide-react';
import { MarkdownArticle } from './MarkdownArticle';

interface StackViewProps {
  setActiveTab: (tab: TabType) => void;
  isDarkMode: boolean;
}

export const StackView: React.FC<StackViewProps> = ({ setActiveTab, isDarkMode }) => {
  const { profile, techStack, experience } = PORTFOLIO_DATA;

  return (
    <div id="stack_view_container" className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1280px] mx-auto">
      {/* Left Column: SYS.INFO // PROFILE_DATA */}
      <section
        id="sys_info_panel"
        className={`lg:col-span-5 border border-[#2a2a2a] p-5 sm:p-7 flex flex-col justify-between ${
          isDarkMode ? 'bg-[#141414]' : 'bg-[#EAEAEA]'
        }`}
      >
        <div className="space-y-6">
          {/* Header Tag */}
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
            <span className="w-2.5 h-2.5 bg-[#00FF41] inline-block" />
            <span className="tracking-widest uppercase">SYS.INFO // PROFILE_DATA</span>
          </div>

          {/* Large Title */}
          <div>
            <h1
              id="profile_system_title"
              className={`font-mono text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-neutral-900'
              }`}
            >
              &gt; {profile.title}
            </h1>
          </div>

          {/* Telemetry metadata */}
          <div className="space-y-1.5 font-mono text-xs pt-1 border-y border-[#262626] py-3">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">LOC:</span>
              <span className="text-[#00FF41] font-semibold">{profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">STATUS:</span>
              <span className="text-[#00FF41] font-semibold">{profile.status}</span>
            </div>
          </div>

          {/* Bio text in Inter font */}
          <div className="pt-1">
            <MarkdownArticle markdown={profile.bio.join('\n\n')} />
          </div>
        </div>

        {/* Contact Protocol Action Button */}
        <div className="pt-8">
          <button
            id="btn_init_contact_protocol"
            onClick={() => setActiveTab('CONTACT')}
            className="w-full py-3 px-4 font-mono text-xs font-bold tracking-widest uppercase border border-[#333333] hover:border-[#00FF41] hover:text-[#00FF41] bg-[#161616] text-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer btn-brutalist"
          >
            <span>[ INIT_CONTACT_PROTOCOL ]</span>
          </button>
        </div>
      </section>

      {/* Right Column: TECH_STACK.JSON + EXECUTION_LOG */}
      <section id="tech_and_log_panel" className="lg:col-span-7 flex flex-col gap-6">
        {/* Top: TECH_STACK.JSON Box */}
        <div
          id="box_tech_stack"
          className={`border border-[#2a2a2a] p-5 ${
            isDarkMode ? 'bg-[#141414]' : 'bg-[#EAEAEA]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 pb-4 border-b border-[#262626] mb-4">
            <LayoutGrid className="w-3.5 h-3.5 text-[#00FF41]" />
            <span className="tracking-widest uppercase">TECH_STACK.JSON</span>
          </div>

          {/* 6 Category Columns Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
            {techStack.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="font-mono text-[11px] font-bold tracking-widest text-[#00FF41] uppercase">
                  {category.category}
                </div>
                <ul className="space-y-1 font-mono text-xs text-neutral-300">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-neutral-600 text-[10px]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: EXECUTION_LOG (EXPERIENCE) Box */}
        <div
          id="box_execution_log"
          className={`border border-[#2a2a2a] p-5 flex-1 ${
            isDarkMode ? 'bg-[#141414]' : 'bg-[#EAEAEA]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 pb-4 border-b border-[#262626] mb-5">
            <RefreshCw className="w-3.5 h-3.5 text-[#00FF41]" />
            <span className="tracking-widest uppercase">
              EXECUTION_LOG (EXPERIENCE)
            </span>
          </div>

          {/* Experience Timeline Entries */}
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 pb-5 border-b border-[#222] last:border-b-0 last:pb-0"
              >
                {/* Period on left */}
                <div className="sm:col-span-3 font-mono text-xs text-neutral-400 tracking-wider">
                  {exp.period}
                </div>

                {/* Role and Details on right */}
                <div className="sm:col-span-9 space-y-1.5">
                  <h3
                    className={`font-mono text-sm sm:text-base font-bold tracking-tight ${
                      isDarkMode ? 'text-white' : 'text-neutral-900'
                    }`}
                  >
                    {exp.role}
                  </h3>
                  <div className="font-mono text-xs text-[#00FF41]">
                    {exp.company} // {exp.location}
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed pt-1">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
