import React from 'react';
import { TabType } from '../types';
import { Moon, Sun } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
}) => {
  const navTabs: { id: TabType; label: string }[] = [
    { id: 'HOME', label: 'HOME' },
    { id: 'PROJECTS', label: 'PROJECTS' },
    { id: 'STACK', label: 'STACK' },
    { id: 'CONTACT', label: 'CONTACT' },
  ];

  return (
    <header
      id="header_nav"
      className={`w-full shrink-0 border-b transition-colors ${
        isDarkMode
          ? 'bg-[#111111] border-[#262626] text-white'
          : 'bg-[#F2F2F2] border-[#D4D4D4] text-black'
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        {/* Left Branding */}
        <div
          id="brand_logo"
          onClick={() => setActiveTab('HOME')}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <span className="font-mono font-bold tracking-tight text-sm md:text-base flex items-center gap-1.5">
            <span className="text-[#5CE883] font-extrabold group-hover:animate-pulse">
              ■
            </span>
            {PORTFOLIO_DATA.site.brand}
          </span>
        </div>

        {/* Center/Right Navigation Tabs */}
        <nav id="nav_links" className="hidden sm:flex items-center gap-6 md:gap-8 font-mono text-xs md:text-sm">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav_btn_${tab.id.toLowerCase()}`}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-1 tracking-wider uppercase transition-colors cursor-pointer ${
                  isActive
                    ? isDarkMode
                      ? 'text-white font-bold'
                      : 'text-black font-bold'
                    : isDarkMode
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-[#5CE883]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Mode Toggle */}
        <div className="flex items-center gap-3">
          <button
            id="theme_toggle_btn"
            onClick={() => setIsDarkMode((prev) => !prev)}
            className={`font-mono text-xs px-2.5 py-1.5 border flex items-center gap-2 transition-all cursor-pointer select-none ${
              isDarkMode
                ? 'border-[#333333] hover:border-[#5CE883] hover:text-[#5CE883] bg-[#161616] text-neutral-300'
                : 'border-[#CCCCCC] hover:border-black bg-white text-black'
            }`}
            title="Toggle color theme"
          >
            {isDarkMode ? (
              <>
                <Moon className="w-3.5 h-3.5 text-[#5CE883]" />
                <span className="hidden xs:inline">dark_mode</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden xs:inline">light_mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile subnav bar */}
      <div
        id="mobile_subnav"
        className={`sm:hidden flex border-t overflow-x-auto ${
          isDarkMode ? 'border-[#262626] bg-[#0e0e0e]' : 'border-[#D4D4D4] bg-[#E8E8E8]'
        }`}
      >
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={`mob_${tab.id}`}
              id={`mobile_tab_${tab.id.toLowerCase()}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 text-center font-mono text-xs whitespace-nowrap px-3 transition-colors ${
                isActive
                  ? 'bg-[#5CE883] text-black font-bold'
                  : isDarkMode
                  ? 'text-neutral-400 hover:text-white'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
