import React, { useState } from 'react';
import { TabType } from '../types';
import { Moon, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { accentLabel, cycleAccent, initAccent } from '../theme/accent';
import { UiGravityOverlay } from '../gravity/UiGravityOverlay';
import { playRandomMysterySfx } from '../sfx/mysterySfx';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [lightModeDenied, setLightModeDenied] = useState(false);
  const [accent, setAccent] = useState(initAccent);
  const [gravityOn, setGravityOn] = useState(false);
  const navTabs: { id: TabType; label: string; mobileLabel: string }[] = [
    { id: 'HOME', label: 'HOME', mobileLabel: 'HOME' },
    { id: 'EXPERIENCE', label: 'EXPERIENCE', mobileLabel: 'EXP' },
    { id: 'PROJECTS', label: 'PROJECTS', mobileLabel: 'PROJ' },
    { id: 'STACK', label: 'STACK', mobileLabel: 'STACK' },
    { id: 'CONTACT', label: 'CONTACT', mobileLabel: 'PING' },
  ];

  return (
    <header
      id="header_nav"
      className="w-full shrink-0 border-b bg-[#111111] border-[#262626] text-white"
    >
      <div className="max-w-[1500px] mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <div
          id="brand_logo"
          onClick={() => setActiveTab('HOME')}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <span className="font-mono font-bold tracking-tight text-sm md:text-base flex items-center gap-1.5">
            <span className="text-[var(--accent)] font-extrabold group-hover:animate-pulse">
              ■
            </span>
            {PORTFOLIO_DATA.site.brand}
          </span>
        </div>

        <nav id="nav_links" className="hidden sm:flex items-center gap-4 md:gap-6 font-mono text-xs md:text-sm">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav_btn_${tab.id.toLowerCase()}`}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-1 tracking-wider uppercase transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-[var(--accent)]" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            id="accent_toggle_btn"
            type="button"
            onClick={() => setAccent((current) => cycleAccent(current))}
            className="font-mono text-xs p-1.5 border flex items-center justify-center transition-all cursor-pointer select-none border-[#333333] hover:border-[var(--accent)] bg-[#161616]"
            title={`Accent: ${accentLabel(accent)} — click to cycle`}
            aria-label="Change accent color"
          >
            <span
              className="block w-3.5 h-3.5 border border-black/40"
              style={{ backgroundColor: accent }}
            />
          </button>
          <button
            id="theme_toggle_btn"
            type="button"
            onClick={() => setLightModeDenied(true)}
            className="font-mono text-xs p-1.5 border flex items-center justify-center transition-all cursor-pointer select-none border-[#333333] hover:border-red-500 hover:text-red-400 bg-[#161616] text-neutral-300"
            title="Light mode is not available"
            aria-label="Theme"
          >
            <Moon className="w-3.5 h-3.5 text-[var(--accent)]" />
          </button>
          <button
            id="pixel_burst_btn"
            type="button"
            onClick={() => {
              playRandomMysterySfx();
              setGravityOn(true);
            }}
            className="font-mono text-xs p-1.5 border flex items-center justify-center transition-all cursor-pointer select-none border-[#333333] hover:border-[var(--accent)] bg-[#161616] text-[var(--accent)]"
            title="Don't click"
            aria-label="Don't click"
          >
            ?
          </button>
        </div>
      </div>

      <div
        id="mobile_subnav"
        className="sm:hidden flex border-t overflow-x-auto border-[#262626] bg-[#0e0e0e]"
      >
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={`mob_${tab.id}`}
              id={`mobile_tab_${tab.id.toLowerCase()}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-0 py-2.5 text-center font-mono text-[10px] whitespace-nowrap px-1.5 transition-colors ${
                isActive
                  ? 'bg-[var(--accent)] text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab.mobileLabel}
            </button>
          );
        })}
      </div>

      {lightModeDenied && (
        <div
          id="light_mode_denied_overlay"
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4"
          onClick={() => setLightModeDenied(false)}
        >
          <div
            className="w-full max-w-md border-2 border-red-500 bg-[#0f0f0f] p-5 font-mono shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-red-500 font-bold tracking-widest text-xs sm:text-sm">
                ERROR // LIGHT_MODE_DENIED
              </div>
              <button
                type="button"
                onClick={() => setLightModeDenied(false)}
                className="p-1 border border-[#333] hover:border-red-500 hover:text-red-500 text-neutral-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-4 text-sm text-neutral-200 leading-relaxed">
              This website is never going to have a light mode.
            </p>
            <button
              type="button"
              onClick={() => setLightModeDenied(false)}
              className="mt-5 px-3 py-1.5 border border-red-500 text-red-400 hover:bg-red-500 hover:text-black text-xs tracking-wider cursor-pointer"
            >
              ACKNOWLEDGE
            </button>
          </div>
        </div>
      )}
      <UiGravityOverlay
        active={gravityOn}
        kickId="pixel_burst_btn"
        onStop={() => setGravityOn(false)}
      />
    </header>
  );
};
