import React, { useState } from 'react';
import { TabType } from '../types';
import {
  Folder,
  FileText,
  Terminal,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ProjectIcon, ExperienceIcon } from './projectIcons';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenResume?: () => void;
  onOpenProjectModal?: (projectId: string) => void;
  onOpenExperienceModal?: (experienceId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenResume,
  onOpenProjectModal,
  onOpenExperienceModal,
}) => {
  const [openFolders, setOpenFolders] = useState<{ [key: string]: boolean }>({
    root: true,
    projects: true,
    experience: true,
    salesforce: true,
    about: true,
    contact: true,
  });

  const toggleFolder = (folderKey: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderKey]: !prev[folderKey],
    }));
  };

  return (
    <aside
      id="portfolio_sidebar"
      className="hidden lg:flex w-full lg:w-64 xl:w-72 shrink-0 min-h-0 overflow-y-auto border-b lg:border-b-0 lg:border-r flex-col bg-[#0f0f0f] border-[#262626] text-neutral-300"
    >
      {/* Profile Header Box */}
      <div
        id="profile_identity_box"
        className="p-4 border-b flex flex-col gap-3 border-[#262626]"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 bg-black border border-[#333333] p-0.5 overflow-hidden flex items-center justify-center shrink-0">
            {PORTFOLIO_DATA.site.avatar ? (
              <img
                src={PORTFOLIO_DATA.site.avatar}
                alt={PORTFOLIO_DATA.profile.handle}
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#5CE883_1px,transparent_1px)] [background-size:4px_4px]" />
                <svg
                  className="w-10 h-10 text-neutral-400"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="14" y="8" width="20" height="14" fill="#222" stroke="#555" strokeWidth="1" />
                  <circle cx="20" cy="14" r="2" fill="#5CE883" />
                  <circle cx="28" cy="14" r="2" fill="#5CE883" />
                  <rect x="22" y="18" width="4" height="2" fill="#5CE883" />
                  <path d="M8 40 C8 30, 16 26, 24 26 C32 26, 40 30, 40 40 Z" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
                </svg>
              </>
            )}
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-[#5CE883]" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-[#5CE883]" />
          </div>

          <div>
            <h2
              id="sidebar_user_name"
              className="font-mono font-bold text-sm tracking-tight text-white"
            >
              {PORTFOLIO_DATA.profile.handle}
            </h2>
            <div
              id="sidebar_user_role"
              className="font-mono text-[11px] font-semibold text-[#5CE883] tracking-wider"
            >
              {PORTFOLIO_DATA.profile.role}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive File System Tree */}
      <div id="file_explorer_tree" className="p-2 flex-1 flex flex-col font-mono text-xs select-none">
        <div className="px-2 py-1.5 text-[10px] uppercase font-bold tracking-wider text-neutral-500 flex items-center justify-between">
          <span>EXPLORER // SYS_TREE</span>
          <span className="text-[#5CE883] text-[9px]">[ACTIVE]</span>
        </div>

        {/* ROOT ITEM */}
        <div className="mb-1">
          <button
            id="tree_root_btn"
            onClick={() => setActiveTab('HOME')}
            className={`w-full text-left px-2 py-1.5 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'HOME'
                ? 'bg-[#5CE883] text-black font-bold'
                : 'hover:bg-[#1a1a1a] text-neutral-300'
            }`}
          >
            <ChevronDown className="w-3.5 h-3.5" />
            <Folder className="w-3.5 h-3.5" />
            <span className="tracking-wide">ROOT</span>
          </button>
        </div>

        {/* BUILD/EXPERIENCE FOLDER */}
        <div className="pl-2 mb-1">
          <button
            id="tree_folder_experience_btn"
            onClick={() => {
              toggleFolder('experience');
              setActiveTab('EXPERIENCE');
            }}
            className={`w-full text-left px-2 py-1.5 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'EXPERIENCE'
                ? 'bg-[#5CE883] text-black font-bold'
                : 'hover:bg-[#1a1a1a] text-neutral-300'
            }`}
          >
            {openFolders.experience ? (
              <ChevronDown className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            )}
            <Folder className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">BUILD/EXPERIENCE</span>
          </button>

          {openFolders.experience && (
            <div className="pl-5 pt-1 space-y-0.5 border-l border-neutral-700/50 my-1 ml-3">
              <div>
                <button
                  id="tree_folder_salesforce_btn"
                  onClick={() => {
                    toggleFolder('salesforce');
                    setActiveTab('EXPERIENCE');
                  }}
                    className="w-full text-left px-2 py-1 flex items-center gap-2 transition-colors cursor-pointer text-neutral-300 hover:text-[#5CE883] hover:bg-[#161616]"
                >
                  {openFolders.salesforce ? (
                    <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <Folder className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">SALESFORCE</span>
                </button>

                {openFolders.salesforce && (
                  <div className="pl-5 pt-0.5 space-y-0.5 border-l border-neutral-700/50 my-1 ml-3">
                    {PORTFOLIO_DATA.experience
                      .filter((exp) => exp.company === 'Salesforce')
                      .map((exp) => (
                        <button
                          key={exp.id}
                          id={`file_exp_${exp.id}`}
                          onClick={() => {
                            setActiveTab('EXPERIENCE');
                            onOpenExperienceModal?.(exp.id);
                          }}
                          className="w-full text-left px-2 py-1 flex items-center gap-2 transition-colors cursor-pointer text-neutral-400 hover:text-[#5CE883] hover:bg-[#161616]"
                        >
                          <ExperienceIcon id={exp.id} />
                          <span className="font-mono truncate">{exp.filename}</span>
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {PORTFOLIO_DATA.experience
                .filter((exp) => exp.company !== 'Salesforce')
                .map((exp) => (
                  <button
                    key={exp.id}
                    id={`file_exp_${exp.id}`}
                    onClick={() => {
                      setActiveTab('EXPERIENCE');
                      onOpenExperienceModal?.(exp.id);
                    }}
                    className="w-full text-left px-2 py-1 flex items-center gap-2 transition-colors cursor-pointer text-neutral-400 hover:text-[#5CE883] hover:bg-[#161616]"
                  >
                    <ExperienceIcon id={exp.id} />
                    <span className="font-mono truncate">{exp.filename}</span>
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* SRC/PROJECTS FOLDER */}
        <div className="pl-2 mb-1">
          <button
            id="tree_folder_projects_btn"
            onClick={() => {
              toggleFolder('projects');
              setActiveTab('PROJECTS');
            }}
            className={`w-full text-left px-2 py-1.5 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'PROJECTS'
                ? 'bg-[#5CE883] text-black font-bold'
                : 'hover:bg-[#1a1a1a] text-neutral-300'
            }`}
          >
            {openFolders.projects ? (
              <ChevronDown className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            )}
            <Folder className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">SRC/PROJECTS</span>
          </button>

          {openFolders.projects && (
            <div className="pl-5 pt-1 space-y-0.5 border-l border-neutral-700/50 my-1 ml-3">
              {PORTFOLIO_DATA.projects.map((project) => (
                <button
                  key={project.id}
                  id={`file_${project.id}`}
                  onClick={() => {
                    setActiveTab('PROJECTS');
                    onOpenProjectModal?.(project.id);
                  }}
                  className="w-full text-left px-2 py-1 flex items-center gap-2 transition-colors cursor-pointer text-neutral-400 hover:text-[#5CE883] hover:bg-[#161616]"
                >
                  <ProjectIcon id={project.id} />
                  <span className="font-mono truncate">{project.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DOCS/ABOUT FOLDER */}
        <div className="pl-2 mb-1">
          <button
            id="tree_folder_about_btn"
            onClick={() => {
              toggleFolder('about');
              setActiveTab('STACK');
            }}
            className={`w-full text-left px-2 py-1.5 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'STACK'
                ? 'bg-[#5CE883] text-black font-bold'
                : 'hover:bg-[#1a1a1a] text-neutral-300'
            }`}
          >
            {openFolders.about ? (
              <ChevronDown className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            )}
            <Folder className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">DOCS/ABOUT</span>
          </button>

          {openFolders.about && (
            <div className="pl-5 pt-1 space-y-0.5 border-l border-neutral-700/50 my-1 ml-3">
              <button
                id="file_resume_pdf"
                onClick={() => {
                  if (onOpenResume) onOpenResume();
                  else setActiveTab('STACK');
                }}
                className="w-full text-left px-2 py-1 flex items-center gap-2 transition-colors cursor-pointer text-neutral-400 hover:text-[#5CE883] hover:bg-[#161616]"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono">resume.pdf</span>
              </button>
              <button
                id="file_bio_txt"
                onClick={() => setActiveTab('STACK')}
                className={`w-full text-left px-2 py-1 flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === 'STACK'
                    ? 'text-[#5CE883] font-semibold'
                    : 'text-neutral-400 hover:text-[#5CE883] hover:bg-[#161616]'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="font-mono">bio.txt</span>
              </button>
            </div>
          )}
        </div>

        {/* BIN/CONTACT FOLDER */}
        <div className="pl-2 mb-1">
          <button
            id="tree_folder_contact_btn"
            onClick={() => {
              toggleFolder('contact');
              setActiveTab('CONTACT');
            }}
            className={`w-full text-left px-2 py-1.5 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'CONTACT'
                ? 'bg-[#5CE883] text-black font-bold'
                : 'hover:bg-[#1a1a1a] text-neutral-300'
            }`}
          >
            {openFolders.contact ? (
              <ChevronDown className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            )}
            <Folder className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">BIN/CONTACT</span>
          </button>

          {openFolders.contact && (
            <div className="pl-5 pt-1 space-y-0.5 border-l border-neutral-700/50 my-1 ml-3">
              <button
                id="file_mail_sh"
                onClick={() => setActiveTab('CONTACT')}
                className={`w-full text-left px-2 py-1 flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === 'CONTACT'
                    ? 'text-[#5CE883] font-semibold'
                    : 'text-neutral-400 hover:text-[#5CE883] hover:bg-[#161616]'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono">mail.sh</span>
              </button>
            </div>
          )}
        </div>

        {/* System Node Telemetry Summary */}
        <div className="mt-auto pt-4 border-t border-neutral-800/80 px-2 text-[11px] text-neutral-500 font-mono space-y-1">
          <div className="flex justify-between">
            <span>SYS_ENV:</span>
            <span className="text-neutral-300">LINUX_X86_64</span>
          </div>
          <div className="flex justify-between">
            <span>SECURITY:</span>
            <span className="text-[#5CE883]">ENCRYPTED_SHA256</span>
          </div>
          <div className="flex justify-between">
            <span>LOCATION:</span>
            <span className="text-neutral-300">{PORTFOLIO_DATA.site.locationShort}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
