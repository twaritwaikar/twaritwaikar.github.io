import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { X, Check, Copy, ExternalLink } from 'lucide-react';
import { MarkdownArticle } from './MarkdownArticle';

interface ProjectDetailModalProps {
  projectId: string | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  projectId,
  onClose,
}) => {
  if (!projectId) return null;

  const project = PORTFOLIO_DATA.projects.find((p) => p.id === projectId);
  if (!project) return null;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (project.details?.codeSnippet) {
      navigator.clipboard.writeText(project.details.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const popupLinks = (() => {
    const seen = new Set<string>();
    const links: { label: string; url: string }[] = [];
    const push = (label: string, url?: string) => {
      if (!url || seen.has(url)) return;
      seen.add(url);
      links.push({ label, url });
    };
    for (const link of project.links || []) {
      push(link.label, link.url);
    }
    push(project.liveLabel || 'LIVE', project.liveUrl);
    push(project.sourceLabel || 'SOURCE', project.sourceUrl);
    return links;
  })();

  return (
    <div
      id="project_modal_backdrop"
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="project_modal_window"
        className="w-full max-w-3xl border-2 border-[#5CE883] shadow-2xl relative my-auto font-mono flex flex-col max-h-[90vh] bg-[#0f0f0f] text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-3 sm:px-4 py-3 bg-[#111] border-b border-[#262626] flex items-center justify-between text-xs select-none gap-2">
          <div className="flex items-center gap-2 text-white font-bold tracking-wider min-w-0">
            <span className="text-[#5CE883] shrink-0">■</span>
            <span className="truncate">SPEC_INSPECTOR // {project.name}</span>
            <span className="text-neutral-500 font-normal shrink-0">({project.version})</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 border border-[#333] hover:border-red-500 hover:text-red-500 text-neutral-400 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {popupLinks.length > 0 && (
          <div className="px-3 sm:px-4 py-2.5 bg-[#111] border-b border-[#262626] flex flex-wrap gap-2 shrink-0">
            {popupLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 border border-[#5CE883] text-[#5CE883] hover:bg-[#5CE883] hover:text-black bg-[#161616] flex items-center justify-center gap-1.5 text-xs tracking-wider"
              >
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs">
          {/* Overview */}
          <div>
            <div className="text-[11px] font-bold text-[#5CE883] uppercase tracking-widest mb-1">
              [ 01 // OVERVIEW ]
            </div>
            {project.article ? (
              <MarkdownArticle markdown={project.article} />
            ) : (
              <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                {project.description}
              </p>
            )}
          </div>

          {project.images && project.images.length > 0 && (
            <div className="space-y-3">
              {project.images.map((src) => (
                <img key={src} src={src} alt={project.title} className="w-full border border-[#262626]" />
              ))}
            </div>
          )}

          {/* Architecture & Metrics */}
          {project.details && (
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-[#5CE883] uppercase tracking-widest">
                [ 02 // SYSTEM_ARCHITECTURE & BENCHMARKS ]
              </div>

              <div className="p-3 bg-[#141414] border border-[#262626] space-y-2">
                <div>
                  <span className="text-neutral-500 font-bold">ARCHITECTURE: </span>
                  <span className="text-neutral-200">{project.details.architecture}</span>
                </div>
                {project.details.throughput && (
                  <div>
                    <span className="text-neutral-500 font-bold">THROUGHPUT: </span>
                    <span className="text-[#5CE883]">{project.details.throughput}</span>
                  </div>
                )}
                {project.details.latency && (
                  <div>
                    <span className="text-neutral-500 font-bold">LATENCY: </span>
                    <span className="text-[#5CE883]">{project.details.latency}</span>
                  </div>
                )}
              </div>

              {/* Key Highlights */}
              <div className="pt-1">
                <div className="text-[11px] font-bold text-neutral-400 mb-1.5 uppercase">
                  ENGINEERING_HIGHLIGHTS:
                </div>
                <ul className="space-y-1 font-sans text-xs text-neutral-300 list-disc list-inside">
                  {project.details.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Code Snippet */}
          {project.details?.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-bold text-[#5CE883] uppercase tracking-widest">
                  [ 03 // CORE_IMPLEMENTATION_SNIPPET ]
                </div>
                <button
                  onClick={handleCopy}
                  className="px-2 py-0.5 border border-[#333] hover:border-[#5CE883] text-[10px] text-neutral-300 flex items-center gap-1 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#5CE883]" />
                      <span className="text-[#5CE883]">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>COPY_CODE</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-3 bg-[#0a0a0a] border border-[#222] text-[#5CE883] overflow-x-auto text-[11px] leading-relaxed font-mono">
                <code>{project.details.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-[#111] border-t border-[#262626] flex items-center justify-between text-xs gap-3">
          <div className="flex flex-wrap gap-2 min-w-0">
            {project.tags.map((t) => (
              <span key={t} className="px-1.5 py-0.5 border border-[#333] text-[10px] text-neutral-400">
                {t}
              </span>
            ))}
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 border border-[#333] hover:border-neutral-200 text-neutral-300 text-xs cursor-pointer"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
