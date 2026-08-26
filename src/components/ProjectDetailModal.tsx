import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { X, Check, Copy, ExternalLink, Star } from 'lucide-react';
import { isGifSrc, isVideoSrc, youtubeEmbedId } from '../media';
import { MarkdownArticle, MarkdownInline } from './MarkdownArticle';
import { TweetEmbed, tweetIdFromUrl } from './TweetEmbed';
import { ZoomableImage } from './ZoomableImage';

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

  const allImages = project.images ?? [];
  const featuredSrc = project.featuredImage?.src || allImages[0]?.src;
  const featured = featuredSrc
    ? {
        src: featuredSrc,
        caption:
          project.featuredImage?.caption ||
          allImages.find((item) => item.src === featuredSrc)?.caption,
      }
    : undefined;
  const galleryItems = allImages.filter((item) => item.src !== featuredSrc);

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
        className="w-full max-w-3xl border-2 border-[var(--accent)] shadow-2xl relative my-auto font-mono flex flex-col max-h-[90vh] bg-[#0f0f0f] text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-3 sm:px-4 py-3 bg-[#111] border-b border-[#262626] flex items-start justify-between text-xs select-none gap-2">
          <div className="flex items-start gap-2 text-white font-bold tracking-wider min-w-0">
            <span className="text-[var(--accent)] shrink-0">■</span>
            <div className="min-w-0 flex flex-col">
              <span className="truncate">
                SPEC_INSPECTOR // {project.title || project.name}
              </span>
              {project.title && project.title !== project.name && (
                <span className="truncate font-normal text-neutral-500 tracking-wide">
                  {project.name}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.githubStars != null && (
              <span className="text-neutral-500 font-normal inline-flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                {project.githubStars.toLocaleString('en-US')}
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1 border border-[#333] hover:border-red-500 hover:text-red-500 text-neutral-400 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {popupLinks.length > 0 && (
          <div className="px-3 sm:px-4 py-2.5 bg-[#111] border-b border-[#262626] flex flex-wrap gap-2 shrink-0">
            {popupLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black bg-[#161616] flex items-center justify-center gap-1.5 text-xs tracking-wider"
              >
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto text-xs">
          {featured && (
            <div id="project_modal_featured" className="bg-black border-b border-[#262626]">
              <ProjectImage
                src={featured.src}
                alt={featured.caption || project.title}
                caption={featured.caption}
                featured
              />
            </div>
          )}
          <div className="p-4 sm:p-6 space-y-5">
          {(project.details?.throughput || project.details?.latency) && (
            <div className="p-3 bg-[#141414] border border-[#262626] space-y-2">
              {project.details.throughput && (
                <div>
                  <span className="text-neutral-500 font-bold">THROUGHPUT: </span>
                  <span className="text-[var(--accent)]">{project.details.throughput}</span>
                </div>
              )}
              {project.details.latency && (
                <div>
                  <span className="text-neutral-500 font-bold">LATENCY: </span>
                  <span className="text-[var(--accent)]">{project.details.latency}</span>
                </div>
              )}
            </div>
          )}

          {project.details?.highlights && project.details.highlights.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-neutral-400 mb-1.5 uppercase">
                ENGINEERING_HIGHLIGHTS:
              </div>
              <ul className="space-y-1 font-sans text-xs text-neutral-300 list-disc list-inside">
                {project.details.highlights.map((h, i) => (
                  <li key={i}>
                    <MarkdownInline markdown={h} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.article ? (
            <MarkdownArticle markdown={project.article} />
          ) : (
            <p className="font-sans text-sm text-neutral-300 leading-relaxed">
              {project.description}
            </p>
          )}

          {galleryItems.length > 0 && (
            <div className="space-y-3">
              {galleryItems.map((item) => (
                <ProjectImage
                  key={item.src}
                  src={item.src}
                  alt={item.caption || project.title}
                  caption={item.caption}
                />
              ))}
            </div>
          )}

          {/* Code Snippet */}
          {project.details?.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-widest">
                  [ 01 // CORE_IMPLEMENTATION_SNIPPET ]
                </div>
                <button
                  onClick={handleCopy}
                  className="px-2 py-0.5 border border-[#333] hover:border-[var(--accent)] text-[10px] text-neutral-300 flex items-center gap-1 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[var(--accent)]" />
                      <span className="text-[var(--accent)]">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>COPY_CODE</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-3 bg-[#0a0a0a] border border-[#222] text-[var(--accent)] overflow-x-auto text-[11px] leading-relaxed font-mono">
                <code>{project.details.codeSnippet}</code>
              </pre>
            </div>
          )}
          </div>
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

function isCompactLogo(src: string) {
  return /\/rootex\.png$/i.test(src);
}

function ProjectImage({
  src,
  alt,
  caption,
  featured = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  featured?: boolean;
}) {
  const videoId = youtubeEmbedId(src);
  let media: React.ReactNode;

  if (videoId) {
    media = (
      <div className={featured ? undefined : 'border border-[#262626]'}>
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={alt}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    );
  } else if (tweetIdFromUrl(src)) {
    media = <TweetEmbed url={src} className={featured ? 'my-0 py-3' : 'my-0'} />;
  } else if (isVideoSrc(src)) {
    media = (
      <div className={featured ? undefined : 'flex justify-center'}>
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          controls
          className={
            featured
              ? 'w-full max-h-72 sm:max-h-96 bg-black'
              : 'max-h-64 sm:max-h-72 w-auto max-w-full border border-[#262626]'
          }
        />
      </div>
    );
  } else if (isCompactLogo(src)) {
    media = (
      <div className={`flex justify-center ${featured ? 'py-4 px-4' : ''}`}>
        <ZoomableImage
          src={src}
          alt={alt}
          caption={caption}
          className="h-28 w-auto border border-[#262626]"
          wrapperClassName="inline-block"
        />
      </div>
    );
  } else {
    media = (
      <div className={featured ? undefined : 'flex justify-center'}>
        <ZoomableImage
          src={src}
          alt={alt}
          caption={caption}
          className={
            featured
              ? isGifSrc(src)
                ? 'w-full max-h-72 sm:max-h-96 object-contain'
                : 'w-full max-h-56 sm:max-h-64 object-contain'
              : 'max-h-64 sm:max-h-72 w-auto max-w-full object-contain border border-[#262626]'
          }
          wrapperClassName={featured ? undefined : 'inline-block max-w-full'}
        />
      </div>
    );
  }

  return (
    <figure>
      {media}
      {caption ? (
        <figcaption
          className={`px-3 py-2 text-center font-mono text-[11px] leading-relaxed text-neutral-400 ${
            featured ? 'border-t border-[#262626] bg-[#111]' : 'pt-2'
          }`}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
