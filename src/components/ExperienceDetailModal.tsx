import React from 'react';
import { X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ExperienceIcon } from './projectIcons';
import { MarkdownInline } from './MarkdownArticle';

interface ExperienceDetailModalProps {
  experienceId: string | null;
  onClose: () => void;
}

export const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({
  experienceId,
  onClose,
}) => {
  const exp = PORTFOLIO_DATA.experience.find((item) => item.id === experienceId);
  if (!experienceId || !exp) return null;

  return (
    <div
      id="experience_modal_backdrop"
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="experience_modal_window"
        className="w-full max-w-3xl border-2 border-[var(--accent)] shadow-2xl relative my-auto font-mono flex flex-col max-h-[90vh] bg-[#0f0f0f] text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 bg-[#111] border-b border-[#262626] flex items-center justify-between text-xs select-none">
          <div className="flex items-center gap-2 text-white font-bold tracking-wider min-w-0">
            <ExperienceIcon id={exp.id} />
            <span className="truncate">EXECUTION_INSPECTOR // {exp.filename}</span>
            <span className="text-neutral-500 font-normal shrink-0">({exp.period})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 border border-[#333] hover:border-red-500 hover:text-red-500 text-neutral-400 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs">
          <div>
            <div className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-widest mb-2">
              [ 01 // ROLE ]
            </div>
            <h3
              className="font-mono text-lg font-bold tracking-tight text-white"
            >
              {exp.role}
            </h3>
            <div className="font-mono text-xs text-[var(--accent)] mt-1">
              {exp.company} // {exp.location}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-widest mb-2">
              [ 02 // EXECUTION_LOG ]
            </div>
            <ul className="font-sans text-sm text-neutral-300 leading-relaxed space-y-2 list-disc list-inside">
              {exp.bullets.map((bullet) => (
                <li key={bullet}>
                  <MarkdownInline markdown={bullet} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-4 py-3 bg-[#111] border-t border-[#262626] flex items-center justify-between text-xs gap-3">
          <div className="flex flex-wrap gap-2 min-w-0">
            {(exp.technologies || []).map((tag) => (
              <span key={tag} className="px-1.5 py-0.5 border border-[#333] text-[10px] text-neutral-400">
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 border border-[#333] hover:border-neutral-200 text-neutral-300 text-xs cursor-pointer shrink-0"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
