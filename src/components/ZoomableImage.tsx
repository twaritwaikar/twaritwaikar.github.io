import React, { useRef } from 'react';
import { Maximize2, X } from 'lucide-react';

export function ZoomableImage({
  src,
  alt,
  className,
  wrapperClassName,
  caption,
}: {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  caption?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openedAt = useRef(0);

  const open = (event: React.MouseEvent) => {
    event.stopPropagation();
    openedAt.current = Date.now();
    dialogRef.current?.showModal();
  };

  const close = (event?: React.MouseEvent) => {
    event?.stopPropagation();
    dialogRef.current?.close();
  };

  return (
    <>
      <button
        type="button"
        title="View fullscreen"
        aria-label={alt ? `View ${alt} fullscreen` : 'View image fullscreen'}
        onClick={open}
        className={`group relative cursor-zoom-in bg-transparent p-0 text-left ${wrapperClassName ?? 'block w-full'}`}
      >
        <img src={src} alt={alt} className={className} />
        <span className="pointer-events-none absolute top-2 right-2 flex h-8 w-8 items-center justify-center border border-[#333] bg-[#161616]/90 text-neutral-300 opacity-0 transition-opacity [@media(hover:none)]:opacity-70 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] group-hover:opacity-100 group-focus-visible:border-[var(--accent)] group-focus-visible:text-[var(--accent)] group-focus-visible:opacity-100">
          <Maximize2 className="h-3.5 w-3.5" />
        </span>
      </button>
      <dialog
        ref={dialogRef}
        aria-label={alt ? `${alt} fullscreen` : 'Fullscreen image'}
        className="m-0 h-dvh max-h-dvh w-screen max-w-none border-0 bg-black/92 p-4 text-neutral-200 open:flex open:items-center open:justify-center sm:p-8"
        onClick={(event) => {
          if (Date.now() - openedAt.current < 250) return;
          if (event.target === event.currentTarget) close(event);
        }}
      >
        <button
          type="button"
          aria-label="Close fullscreen image"
          onClick={close}
          className="absolute top-4 right-4 cursor-pointer border border-[#333] bg-[#161616] p-1 text-neutral-400 hover:border-red-500 hover:text-red-500"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex max-h-full max-w-full flex-col items-center gap-3">
          <img
            src={src}
            alt={alt}
            className="max-h-[min(100%,calc(100dvh-6rem))] max-w-full object-contain border border-[#262626]"
          />
          {caption ? (
            <p className="max-w-3xl px-2 text-center font-mono text-[11px] leading-relaxed text-neutral-400">
              {caption}
            </p>
          ) : null}
        </div>
      </dialog>
    </>
  );
}
