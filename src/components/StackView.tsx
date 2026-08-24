import React from 'react';
import { TabType } from '../types';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LayoutGrid } from 'lucide-react';
import { MarkdownArticle } from './MarkdownArticle';

interface StackViewProps {
  setActiveTab: (tab: TabType) => void;
  isDarkMode: boolean;
}

export const StackView: React.FC<StackViewProps> = ({ setActiveTab, isDarkMode }) => {
  const { profile, techStack } = PORTFOLIO_DATA;

  return (
    <div id="stack_view_container" className="h-auto lg:h-full lg:min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 max-w-[1280px] mx-auto overflow-visible lg:overflow-hidden">
      {/* Left Column: SYS.INFO // PROFILE_DATA */}
      <section
        id="sys_info_panel"
        className={`lg:col-span-5 border border-[#2a2a2a] p-4 sm:p-5 flex flex-col min-h-0 overflow-visible lg:overflow-hidden ${
          isDarkMode ? 'bg-[#141414]' : 'bg-[#EAEAEA]'
        }`}
      >
        <div className="space-y-3 min-h-0 overflow-visible lg:overflow-y-auto">
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
            <span className="w-2.5 h-2.5 bg-[#5CE883] inline-block" />
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
          <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-1.5 font-mono text-xs border-y border-[#262626] py-3">
            <span className="text-neutral-500">LOC:</span>
            <span className="text-[#5CE883] font-semibold">{profile.location}</span>
            <span className="text-neutral-500">STATUS:</span>
            <span className="text-[#5CE883] font-semibold">{profile.status}</span>
          </div>

          {/* Bio text in Inter font */}
          <div className="pt-1">
            <MarkdownArticle markdown={profile.bio.join('\n\n')} />
          </div>
        </div>

        {/* Contact Protocol Action Button */}
        <div className="pt-4 shrink-0">
          <button
            id="btn_init_contact_protocol"
            onClick={() => setActiveTab('CONTACT')}
            className="w-full py-3 px-4 font-mono text-xs font-bold tracking-widest uppercase border border-[#333333] hover:border-[#5CE883] hover:text-[#5CE883] bg-[#161616] text-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer btn-brutalist"
          >
            <span>[ INIT_CONTACT_PROTOCOL ]</span>
          </button>
        </div>
      </section>

      {/* Right Column: TECH_STACK.JSON + EXECUTION_LOG */}
      <section id="tech_and_log_panel" className="lg:col-span-7 flex flex-col gap-3 min-h-0 overflow-visible lg:overflow-hidden">
        {/* Top: TECH_STACK.JSON Box */}
        <div
          id="box_tech_stack"
          className={`border border-[#2a2a2a] p-4 flex-1 min-h-0 overflow-y-auto ${
            isDarkMode ? 'bg-[#141414]' : 'bg-[#EAEAEA]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 pb-4 border-b border-[#262626] mb-4">
            <LayoutGrid className="w-3.5 h-3.5 text-[#5CE883]" />
            <span className="tracking-widest uppercase">TECH_STACK.JSON</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4">
            {techStack.map((category) => (
              <div key={category.category} className="space-y-1.5">
                <div className="font-mono text-[11px] font-bold tracking-widest text-[#5CE883] uppercase">
                  {category.category}
                </div>
                <ul className="space-y-0.5 font-mono text-xs text-neutral-700 dark:text-neutral-300">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
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
      </section>
    </div>
  );
};
