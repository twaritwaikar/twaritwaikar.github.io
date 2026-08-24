import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface FooterProps {
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer
      id="portfolio_footer"
      className={`w-full border-t font-mono text-xs transition-colors select-none ${
        isDarkMode
          ? 'bg-[#0f0f0f] border-[#262626] text-neutral-400'
          : 'bg-[#EAEAEA] border-[#D4D4D4] text-neutral-600'
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div id="footer_copyright" className="tracking-wider flex items-center gap-2">
          <span>{PORTFOLIO_DATA.site.copyright}</span>
        </div>

        <div id="footer_socials" className="flex items-center gap-6 text-neutral-400 font-semibold text-xs tracking-wider">
          {PORTFOLIO_DATA.networkNodes.map((node) => (
            <a
              key={node.name}
              id={`footer_link_${node.name.toLowerCase()}`}
              href={node.url}
              target={node.url.startsWith('mailto:') ? undefined : '_blank'}
              rel={node.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="hover:text-[#00FF41] transition-colors"
            >
              {node.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
