import React, { useState } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { ProjectsView } from './components/ProjectsView';
import { ExperienceView } from './components/ExperienceView';
import { StackView } from './components/StackView';
import { ContactView } from './components/ContactView';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ExperienceDetailModal } from './components/ExperienceDetailModal';
import { PORTFOLIO_DATA } from './data/portfolioData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('HOME');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null);

  const openResume = () => {
    window.open(PORTFOLIO_DATA.site.resumeUrl || '/resume.pdf', '_blank', 'noopener,noreferrer');
  };

  const handleOpenProjectModal = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleCloseProjectModal = () => {
    setSelectedProjectId(null);
  };

  const handleOpenExperienceModal = (experienceId: string) => {
    setSelectedExperienceId(experienceId);
  };

  const handleCloseExperienceModal = () => {
    setSelectedExperienceId(null);
  };

  return (
    <div
      id="app_root"
      className={`h-dvh max-h-dvh overflow-hidden flex flex-col font-mono selection:bg-[#5CE883] selection:text-black transition-colors ${
        isDarkMode
          ? 'dark bg-black text-neutral-200 bg-drafting-grid-dark'
          : 'bg-[#F4F4F4] text-neutral-900 bg-drafting-grid-light'
      }`}
    >
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <div className="flex-1 min-h-0 max-w-[1500px] w-full mx-auto flex flex-col lg:flex-row border-x border-[#262626]/50 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
          onOpenResume={openResume}
          onOpenProjectModal={handleOpenProjectModal}
          onOpenExperienceModal={handleOpenExperienceModal}
        />

        <main
          id="main_viewport"
          className="flex-1 min-h-0 p-3 sm:p-4 md:p-5 lg:p-6 overflow-hidden flex flex-col"
        >
          {activeTab === 'HOME' && (
            <HomeView
              setActiveTab={setActiveTab}
              isDarkMode={isDarkMode}
              onOpenResume={openResume}
              onOpenExperienceModal={handleOpenExperienceModal}
            />
          )}

          {activeTab === 'PROJECTS' && (
            <ProjectsView
              isDarkMode={isDarkMode}
              onOpenProjectModal={handleOpenProjectModal}
            />
          )}

          {activeTab === 'EXPERIENCE' && (
            <ExperienceView
              isDarkMode={isDarkMode}
              onOpenExperienceModal={handleOpenExperienceModal}
            />
          )}

          {activeTab === 'STACK' && (
            <StackView
              setActiveTab={setActiveTab}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'CONTACT' && (
            <ContactView isDarkMode={isDarkMode} />
          )}
        </main>
      </div>

      <ProjectDetailModal
        projectId={selectedProjectId}
        onClose={handleCloseProjectModal}
        isDarkMode={isDarkMode}
      />
      <ExperienceDetailModal
        experienceId={selectedExperienceId}
        onClose={handleCloseExperienceModal}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
