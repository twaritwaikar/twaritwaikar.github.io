import React from 'react';
import { X, Printer, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { MarkdownInline } from './MarkdownArticle';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const { profile, experience, techStack, site } = PORTFOLIO_DATA;

  const handlePrint = () => {
    if (site.resumeUrl) {
      window.open(site.resumeUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    window.print();
  };

  return (
    <div
      id="resume_modal_backdrop"
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="resume_modal_window"
        className="w-full max-w-4xl border-2 border-[var(--accent)] shadow-2xl relative my-auto font-mono flex flex-col max-h-[90vh] bg-[#0f0f0f] text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Title Bar */}
        <div className="px-4 py-3 bg-[#111] border-b border-[#262626] flex items-center justify-between text-xs select-none">
          <div className="flex items-center gap-2 text-[var(--accent)] font-bold tracking-wider">
            <FileText className="w-4 h-4" />
            <span>OPEN_RESUME.PDF // ARCHITECT_PROFILE</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-2.5 py-1 border border-[#333] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[11px] flex items-center gap-1.5 cursor-pointer"
              title="Print / Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 border border-[#333] hover:border-red-500 hover:text-red-500 text-neutral-400 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs">
          {/* Header section */}
          <div className="border-b border-[#333] pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {profile.handle}
              </h1>
              <div className="text-sm font-bold text-[var(--accent)] tracking-wider mt-0.5">
                // {profile.headline}
              </div>
            </div>
            <div className="text-right text-[11px] text-neutral-400 space-y-1">
              <div>LOC: {profile.location}</div>
              <div>EXPERIENCE: {profile.experienceYears}+ YEARS</div>
              <div className="text-[var(--accent)]">STATUS: {profile.status} // {site.statusLabel}</div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-widest">
              [ 01 // ARCHITECTURAL_PHILOSOPHY ]
            </div>
            <p className="font-sans text-sm text-neutral-300 leading-relaxed">
              {profile.bio.join(' ')}
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <div className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-widest">
              [ 02 // EXECUTION_LOG & WORK_EXPERIENCE ]
            </div>

            {experience.map((exp, idx) => (
            <div key={`${exp.company}-${exp.period}`} className={`border-l-2 pl-4 space-y-2 ${idx === 0 ? 'border-[var(--accent)]' : 'border-[#333]'}`}>
              <div className="flex justify-between items-baseline flex-wrap">
                <span className="font-bold text-sm text-white">
                  {exp.role.toUpperCase()} — {exp.company.toUpperCase()}
                </span>
                <span className="text-neutral-400 text-[11px]">{exp.period} // {exp.location}</span>
              </div>
              <ul className="font-sans text-xs text-neutral-300 space-y-1.5 list-disc list-inside">
                {(exp.bullets.length ? exp.bullets : [exp.description]).map((item) => (
                  <li key={item}>
                    <MarkdownInline markdown={item} />
                  </li>
                ))}
              </ul>
            </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-widest">
              [ 03 // CORE_CAPABILITIES & STACK ]
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {techStack.map((category) => (
              <div key={category.category} className="p-2.5 bg-[#141414] border border-[#262626]">
                <div className="text-[var(--accent)] font-bold mb-1">{category.category}</div>
                <div className="text-neutral-300">{category.items.join(', ')}</div>
              </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2 pt-2 border-t border-[#333]">
            <div className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-widest">
              [ 04 // ACADEMIC_CREDENTIALS ]
            </div>
            {profile.education && (
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-white">
                {profile.education.degree}
              </span>
              <span className="text-neutral-400">{profile.education.detail}</span>
            </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-3 bg-[#111] border-t border-[#262626] flex items-center justify-between text-xs">
          <span className="text-neutral-500 font-mono">MD5: e7b2...9f41 // VERIFIED</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[var(--accent)] text-black font-bold tracking-wider uppercase cursor-pointer hover:bg-[var(--accent-hover)]"
          >
            CLOSE_DOCUMENT
          </button>
        </div>
      </div>
    </div>
  );
};
