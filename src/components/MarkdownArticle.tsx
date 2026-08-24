import React from 'react';

function inline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern = /(!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1].startsWith('![')) {
      nodes.push(
        <img
          key={key++}
          src={match[3]}
          alt={match[2]}
          className="w-full border border-[#262626] my-3"
        />
      );
    } else if (match[1].startsWith('[')) {
      nodes.push(
        <a
          key={key++}
          href={match[5]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00FF41] underline underline-offset-2"
        >
          {match[4]}
        </a>
      );
    } else if (match[1].startsWith('**')) {
      nodes.push(
        <strong key={key++} className="text-neutral-100">
          {match[6]}
        </strong>
      );
    } else {
      nodes.push(
        <code key={key++} className="text-[#00FF41]">
          {match[7]}
        </code>
      );
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function MarkdownArticle({ markdown }: { markdown: string }) {
  const blocks = markdown.trim().split(/\n\s*\n/);

  return (
    <div className="space-y-3 font-sans text-sm text-neutral-300 leading-relaxed">
      {blocks.map((block, index) => {
        const heading = block.match(/^##\s+(.+)/);
        if (heading) {
          return (
            <h3 key={index} className="font-mono text-xs font-bold tracking-widest text-[#00FF41] uppercase pt-2">
              {heading[1]}
            </h3>
          );
        }

        const lines = block.split('\n');
        if (lines.every((line) => /^\s*[-*]\s+/.test(line) || line.trim() === '')) {
          return (
            <ul key={index} className="list-disc list-inside space-y-1">
              {lines
                .filter((line) => line.trim())
                .map((line, itemIndex) => (
                  <li key={itemIndex}>{inline(line.replace(/^\s*[-*]\s+/, ''))}</li>
                ))}
            </ul>
          );
        }

        const imageOnly = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (imageOnly) {
          return (
            <img
              key={index}
              src={imageOnly[2]}
              alt={imageOnly[1]}
              className="w-full border border-[#262626]"
            />
          );
        }

        return (
          <p key={index} className="whitespace-pre-wrap">
            {inline(block.replace(/\n/g, ' '))}
          </p>
        );
      })}
    </div>
  );
}
