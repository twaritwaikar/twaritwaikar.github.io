import React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';

const linkClass =
  'text-accent underline underline-offset-2 hover:opacity-80';
const codeClass = 'text-accent font-mono text-[0.9em]';

function MarkdownLink({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  const isMail = href?.startsWith('mailto:');
  return (
    <a
      href={href}
      target={isMail ? undefined : '_blank'}
      rel={isMail ? undefined : 'noopener noreferrer'}
      className={linkClass}
      onClick={(event) => event.stopPropagation()}
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
    <img src={src} alt={alt ?? ''} className="w-full border border-[#262626] my-3" />
  ),
};

const articleComponents: Components = {
  ...sharedComponents,
  p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
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
    <ul className="list-disc list-inside space-y-1 mb-3 last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-1 mb-3 last:mb-0">{children}</ol>
  ),
  li: ({ children }) => <li>{children}</li>,
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
  return (
    <span className={className}>
      <ReactMarkdown components={inlineComponents}>{markdown}</ReactMarkdown>
    </span>
  );
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
