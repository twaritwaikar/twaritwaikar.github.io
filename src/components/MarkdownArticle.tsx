import React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import { isVideoSrc } from '../media';
import { TweetEmbed, tweetIdFromUrl } from './TweetEmbed';
import { ZoomableImage } from './ZoomableImage';

const linkClass =
  'text-accent underline underline-offset-2 hover:opacity-80';
const codeClass = 'text-accent font-mono text-[0.9em]';

const PROJECT_LINK_PREFIX = '#project-';

function MarkdownLink({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  const isMail = href?.startsWith('mailto:');
  const projectId = href?.startsWith(PROJECT_LINK_PREFIX)
    ? href.slice(PROJECT_LINK_PREFIX.length)
    : null;

  return (
    <a
      href={href}
      target={isMail || projectId ? undefined : '_blank'}
      rel={isMail || projectId ? undefined : 'noopener noreferrer'}
      className={linkClass}
      onClick={(event) => {
        event.stopPropagation();
        if (!projectId) return;
        event.preventDefault();
        window.dispatchEvent(
          new CustomEvent('portfolio:open-project', { detail: { id: projectId } })
        );
      }}
    >
      {children}
    </a>
  );
}

const sharedComponents: Components = {
  a: ({ href, children }) => <MarkdownLink href={href}>{children}</MarkdownLink>,
  strong: ({ children }) => (
    <strong className="text-neutral-100 font-semibold">
      {children}
    </strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ className, children }) => {
    if (className) {
      return <code className={`${className} font-mono text-[11px]`}>{children}</code>;
    }
    return <code className={codeClass}>{children}</code>;
  },
  pre: ({ children }) => (
    <pre className="overflow-x-auto border border-[#262626] bg-[#0a0a0a] p-3 text-[11px] my-3">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt ?? ''}
      className="my-3 mx-auto block max-h-64 sm:max-h-72 w-auto max-w-full object-contain border border-[#262626]"
    />
  ),
};

function MediaCaption({
  children,
  className,
}: {
  children?: string;
  className?: string;
}) {
  if (!children) return null;
  return (
    <figcaption
      className={`mt-1.5 px-1 text-center font-mono text-[11px] leading-relaxed text-neutral-400 ${className ?? ''}`}
    >
      {children}
    </figcaption>
  );
}

function MarkdownImage({ src, alt }: { src?: string; alt?: string }) {
  const caption = alt?.trim();
  if (!src) return null;

  if (tweetIdFromUrl(src)) {
    return (
      <figure className="my-3 flex w-full flex-col items-center">
        <TweetEmbed url={src} className="my-0 w-full" />
        <MediaCaption className="max-w-[550px]">{caption}</MediaCaption>
      </figure>
    );
  }

  if (isVideoSrc(src)) {
    return (
      <figure className="my-3 flex flex-col items-center">
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          controls
          className="max-h-64 sm:max-h-72 w-auto max-w-full border border-[#262626]"
        />
        <MediaCaption>{caption}</MediaCaption>
      </figure>
    );
  }

  return (
    <figure className="my-3 flex flex-col items-center">
      <ZoomableImage
        src={src}
        alt={caption || ''}
        caption={caption}
        className="max-h-64 sm:max-h-72 w-auto max-w-full object-contain border border-[#262626]"
        wrapperClassName="inline-block max-w-full"
      />
      <MediaCaption>{caption}</MediaCaption>
    </figure>
  );
}

function isWhitespaceNode(node: React.ReactNode): boolean {
  return typeof node === 'string' && node.trim() === '';
}

function tweetUrlFromChildren(children: React.ReactNode): string | null {
  const items = React.Children.toArray(children).filter((node) => !isWhitespaceNode(node));
  if (items.length !== 1) return null;

  const only = items[0];
  if (typeof only === 'string') {
    const url = only.trim();
    return tweetIdFromUrl(url) ? url : null;
  }
  if (!React.isValidElement(only) || only.type === TweetEmbed) return null;

  const props = only.props as { href?: string; src?: string; children?: React.ReactNode };
  for (const candidate of [props.href, props.src]) {
    if (candidate && tweetIdFromUrl(candidate)) return candidate;
  }
  return tweetUrlFromChildren(props.children);
}

const articleComponents: Components = {
  ...sharedComponents,
  img: MarkdownImage,
  p: ({ children }) => {
    const items = React.Children.toArray(children).filter((node) => !isWhitespaceNode(node));
    if (
      items.length === 1 &&
      React.isValidElement(items[0]) &&
      (items[0].type === TweetEmbed || items[0].type === MarkdownImage)
    ) {
      return items[0];
    }
    const tweetUrl = tweetUrlFromChildren(children);
    if (tweetUrl) return <TweetEmbed url={tweetUrl} />;
    return <p className="mb-3 last:mb-0">{children}</p>;
  },
  h1: ({ children }) => (
    <h3 className="font-mono text-xs font-bold tracking-widest text-accent uppercase pt-2 mb-2">
      {children}
    </h3>
  ),
  h2: ({ children }) => (
    <h3 className="font-mono text-xs font-bold tracking-widest text-accent uppercase pt-2 mb-2">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4 className="font-mono text-xs font-bold tracking-widest text-accent uppercase pt-2 mb-2">
      {children}
    </h4>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-5 space-y-1 mb-3 last:mb-0 [&_ul]:my-1 [&_ul]:list-[circle] [&_ul_ul]:list-[square]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside pl-5 space-y-1 mb-3 last:mb-0 [&_ol]:my-1">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="pl-0.5 [&>p]:mb-1 [&>p:last-child]:mb-0">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-2 border-[var(--accent)] bg-[#141414] px-4 py-3 [&>p]:mb-2 [&>p:last-child]:mb-0">
      {children}
    </blockquote>
  ),
};

const inlineComponents: Components = {
  ...sharedComponents,
  p: ({ children }) => <>{children}</>,
  h1: ({ children }) => <>{children}</>,
  h2: ({ children }) => <>{children}</>,
  h3: ({ children }) => <>{children}</>,
  ul: ({ children }) => <>{children}</>,
  ol: ({ children }) => <>{children}</>,
  li: ({ children }) => <>{children}</>,
  br: () => <> </>,
};

export function MarkdownInline({
  markdown,
  className,
}: {
  markdown: string;
  className?: string;
}) {
  const content = (
    <ReactMarkdown components={inlineComponents}>{markdown}</ReactMarkdown>
  );
  if (!className) return content;
  return <span className={className}>{content}</span>;
}

export function MarkdownArticle({
  markdown,
  className,
}: {
  markdown: string;
  className?: string;
}) {
  return (
    <div
      className={`font-sans text-sm leading-relaxed text-neutral-300 ${className ?? ''}`}
    >
      <ReactMarkdown components={articleComponents}>{markdown}</ReactMarkdown>
    </div>
  );
}
