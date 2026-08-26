import React, { useEffect, useState } from 'react';
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

const CONTACT_SENT_HASH = '#contact-sent';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>(
    window.location.hash === CONTACT_SENT_HASH ? 'CONTACT' : 'HOME'
  );
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

  useEffect(() => {
    const onOpenProject = (event: Event) => {
      const id = (event as CustomEvent<{ id: string }>).detail?.id;
      if (!id || !PORTFOLIO_DATA.projects.some((project) => project.id === id)) {
        return;
      }
      setSelectedExperienceId(null);
      setActiveTab('PROJECTS');
      setSelectedProjectId(id);
    };

    window.addEventListener('portfolio:open-project', onOpenProject);
    return () => window.removeEventListener('portfolio:open-project', onOpenProject);
  }, []);

  return (
    <div
      id="app_root"
      className="h-dvh max-h-dvh overflow-hidden flex flex-col font-mono selection:bg-[var(--accent)] selection:text-black bg-black text-neutral-200 bg-drafting-grid-dark"
    >
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 min-h-0 max-w-[1500px] w-full mx-auto flex flex-col lg:flex-row border-x border-[#262626]/50 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenResume={openResume}
          onOpenProjectModal={handleOpenProjectModal}
          onOpenExperienceModal={handleOpenExperienceModal}
        />

        <main
          id="main_viewport"
          className="flex-1 min-h-0 p-3 sm:p-4 md:p-5 lg:p-6 overflow-y-auto lg:overflow-hidden flex flex-col"
        >
          {activeTab === 'HOME' && (
            <HomeView
              setActiveTab={setActiveTab}
              onOpenResume={openResume}
              onOpenExperienceModal={handleOpenExperienceModal}
            />
          )}

          {activeTab === 'PROJECTS' && (
            <ProjectsView
              onOpenProjectModal={handleOpenProjectModal}
            />
          )}

          {activeTab === 'EXPERIENCE' && (
            <ExperienceView
              onOpenExperienceModal={handleOpenExperienceModal}
            />
          )}

          {activeTab === 'ABOUT' && (
            <StackView
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'CONTACT' && (
            <ContactView />
          )}
        </main>
      </div>

      <ProjectDetailModal
        projectId={selectedProjectId}
        onClose={handleCloseProjectModal}
      />
      <ExperienceDetailModal
        experienceId={selectedExperienceId}
        onClose={handleCloseExperienceModal}
      />
    </div>
  );
}
