import React, { useState } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ProjectsView } from './components/ProjectsView';
import { StackView } from './components/StackView';
import { ContactView } from './components/ContactView';
import { ResumeModal } from './components/ResumeModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('HOME');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleOpenProjectModal = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleCloseProjectModal = () => {
    setSelectedProjectId(null);
  };

  return (
    <div
      id="app_root"
      className={`min-h-screen flex flex-col font-mono selection:bg-[#00FF41] selection:text-black transition-colors ${
        isDarkMode
          ? 'bg-black text-neutral-200 bg-drafting-grid-dark'
          : 'bg-[#F4F4F4] text-neutral-900 bg-drafting-grid-light'
      }`}
    >
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content Area with Sidebar Layout */}
      <div className="flex-1 max-w-[1500px] w-full mx-auto flex flex-col lg:flex-row border-x border-[#262626]/50">
        {/* Left Interactive Tree Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenProjectModal={handleOpenProjectModal}
        />

        {/* Dynamic View Display Area */}
        <main
          id="main_viewport"
          className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto"
        >
          {activeTab === 'HOME' && (
            <HomeView
              setActiveTab={setActiveTab}
              isDarkMode={isDarkMode}
              onOpenResume={() => setIsResumeOpen(true)}
              onOpenProjectModal={handleOpenProjectModal}
            />
          )}

          {activeTab === 'PROJECTS' && (
            <ProjectsView
              isDarkMode={isDarkMode}
              onOpenProjectModal={handleOpenProjectModal}
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

      {/* Global Application Footer */}
      <Footer isDarkMode={isDarkMode} />

      {/* Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        isDarkMode={isDarkMode}
      />

      <ProjectDetailModal
        projectId={selectedProjectId}
        onClose={handleCloseProjectModal}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
