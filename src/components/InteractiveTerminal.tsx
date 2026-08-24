import React, { useState, useRef, useEffect } from 'react';
import { TabType } from '../types';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface InteractiveTerminalProps {
  setActiveTab: (tab: TabType) => void;
  isDarkMode: boolean;
  onOpenResume?: () => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  setActiveTab,
  isDarkMode,
  onOpenResume,
}) => {
  const bootLogs = PORTFOLIO_DATA.profile.terminalBoot.length
    ? PORTFOLIO_DATA.profile.terminalBoot
    : [
        '> System boot sequence initiated...',
        '> Loading core modules... [OK]',
        '> Establishing secure connection... [OK]',
        '> Locating developer...',
        '> Done. [India]',
      ];

  const [commandHistory, setCommandHistory] = useState<{ text: string; isOutput?: boolean; isGreen?: boolean; isError?: boolean }[]>(
    bootLogs.map((text) => ({ text, isGreen: true }))
  );

  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [pastInputs, setPastInputs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setPastInputs((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newLogs = [...commandHistory, { text: `$ ${trimmed}`, isOutput: false }];

    const lower = trimmed.toLowerCase();
    const parts = lower.split(' ');
    const mainCmd = parts[0];
    const arg = parts[1];

    if (mainCmd === 'clear' || mainCmd === 'cls') {
      setCommandHistory([]);
      setInputVal('');
      return;
    } else if (mainCmd === 'help') {
      newLogs.push({
        text: `AVAILABLE COMMANDS:
  help               - Display system commands
  projects           - Navigate to projects directory
  experience         - Open execution log / work history
  stack              - Inspect technical stack & architecture
  contact            - Open connection transmit node
  resume             - Open curriculum vitae document
  whoami             - Query developer identity info
  ls                 - List file system hierarchy
  cat <file>         - Read file contents (e.g. cat bio.txt)
  status             - View infrastructure telemetry
  ping               - Test network latency
  matrix             - Trigger system visualizer
  clear              - Wipe terminal buffer`,
        isOutput: true,
      });
    } else if (mainCmd === 'projects' || mainCmd === 'cd projects' || (mainCmd === 'cd' && arg === 'projects')) {
      newLogs.push({ text: `Navigating to SRC/PROJECTS...`, isGreen: true });
      setTimeout(() => setActiveTab('PROJECTS'), 350);
    } else if (mainCmd === 'experience' || mainCmd === 'work' || mainCmd === 'jobs') {
      newLogs.push({ text: `Opening execution log...`, isGreen: true });
      setTimeout(() => setActiveTab('EXPERIENCE'), 350);
    } else if (mainCmd === 'stack' || mainCmd === 'skills') {
      newLogs.push({ text: `Loading system tech stack...`, isGreen: true });
      setTimeout(() => setActiveTab('STACK'), 350);
    } else if (mainCmd === 'contact' || mainCmd === 'email' || mainCmd === 'mail') {
      newLogs.push({ text: `Opening secure connection node...`, isGreen: true });
      setTimeout(() => setActiveTab('CONTACT'), 350);
    } else if (mainCmd === 'resume' || mainCmd === 'cv') {
      newLogs.push({ text: `Deploying resume document...`, isGreen: true });
      if (onOpenResume) setTimeout(onOpenResume, 300);
    } else if (mainCmd === 'whoami') {
      newLogs.push({
        text: `USER: ${PORTFOLIO_DATA.profile.handle}
ROLE: ${PORTFOLIO_DATA.profile.role}
EXPERIENCE: ${PORTFOLIO_DATA.profile.experienceYears} Years
STATUS: ${PORTFOLIO_DATA.profile.status} // ${PORTFOLIO_DATA.site.statusLabel}
LOCATION: ${PORTFOLIO_DATA.profile.location}`,
        isOutput: true,
      });
    } else if (mainCmd === 'ls' || mainCmd === 'dir') {
      newLogs.push({
        text: `drwxr-xr-x  ROOT/
  drwxr-xr-x  SRC/PROJECTS/ (${PORTFOLIO_DATA.projects.map((project) => project.name).join(', ')})
  drwxr-xr-x  DOCS/ABOUT/   (resume.pdf, bio.txt)
  drwxr-xr-x  BIN/CONTACT/  (mail.sh)`,
        isOutput: true,
      });
    } else if (mainCmd === 'cat') {
      if (arg === 'bio.txt') {
        newLogs.push({
          text: PORTFOLIO_DATA.profile.bio.join('\n\n'),
          isOutput: true,
        });
      } else if (arg === 'resume.pdf' || arg === 'resume.md') {
        newLogs.push({
          text: `## ${PORTFOLIO_DATA.profile.handle} — ${PORTFOLIO_DATA.profile.role}
${PORTFOLIO_DATA.profile.tagline}
Experience: ${PORTFOLIO_DATA.profile.experienceYears} Yrs | Location: ${PORTFOLIO_DATA.profile.location}
(Type 'resume' or click DEPLOY_RESUME to view complete document)`,
          isOutput: true,
        });
      } else {
        const project = PORTFOLIO_DATA.projects.find(
          (item) => item.name.toLowerCase() === (arg || '').toLowerCase() || item.id === arg
        );
        if (project) {
          newLogs.push({
            text: project.details?.codeSnippet || project.description,
            isOutput: true,
          });
        } else {
          newLogs.push({
            text: `cat: ${arg || 'filename'}: No such file or directory. Try: cat bio.txt, cat resume.pdf`,
            isError: true,
          });
        }
      }
    } else if (mainCmd === 'status' || mainCmd === 'uptime') {
      newLogs.push({
        text: `STATUS: OPERATIONAL
UPTIME: 99.998% (428 days 14 hrs)
LOAD AVG: 0.12, 0.08, 0.05
MEMORY: 3.2GB / 32GB (10%)
NETWORK: 10Gbps Fiber Uplink [ACTIVE]`,
        isOutput: true,
      });
    } else if (mainCmd === 'ping') {
      newLogs.push({
        text: `64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.482 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.395 ms
--- dev_architect ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1002ms`,
        isOutput: true,
      });
    } else if (mainCmd === 'matrix') {
      newLogs.push({
        text: `01000100 01000101 01010110 01011111 01000001 01010010 01000011 01001000
Wake up, engineer...
The Matrix has you.
Follow the white rabbit -> ${PORTFOLIO_DATA.site.brand} initialized.`,
        isGreen: true,
      });
    } else {
      newLogs.push({
        text: `zsh: command not found: ${trimmed}. Type 'help' for available commands.`,
        isError: true,
      });
    }

    setCommandHistory(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastInputs.length > 0) {
        const nextIdx = historyIndex === -1 ? pastInputs.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(pastInputs[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (pastInputs.length > 0 && historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= pastInputs.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIdx);
          setInputVal(pastInputs[nextIdx]);
        }
      }
    }
  };

  return (
    <div
      id="terminal_system_init"
      className={`flex flex-col font-mono text-xs transition-colors h-[170px] md:h-[190px] border-0 ${
        isDarkMode
          ? 'bg-[#181818] text-neutral-200'
          : 'bg-[#1f1f1f] text-neutral-100'
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title Bar matching screenshot: "bash - system_init" + 3 colored blocks */}
      <div className="h-8 px-3 bg-[#111111] border-b border-[#2a2a2a] flex items-center justify-between select-none">
        <span className="text-[11px] text-neutral-400 font-mono tracking-tight">
          bash - system_init
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-[#e06c75] inline-block" />
          <span className="w-2.5 h-2.5 bg-[#e5c07b] inline-block" />
          <span className="w-2.5 h-2.5 bg-[#98c379] inline-block" />
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div
        ref={scrollRef}
        className="p-3 flex-1 overflow-y-auto font-mono space-y-1 text-xs select-text"
      >
        {commandHistory.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.isGreen
                ? 'text-[#5CE883]'
                : line.isError
                ? 'text-red-400'
                : 'text-neutral-300'
            }`}
          >
            {line.text}
          </div>
        ))}

        {/* Input prompt line */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[#5CE883] font-bold select-none">$</span>
          <input
            ref={inputRef}
            type="text"
            id="terminal_input_prompt"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs focus:ring-0 p-0"
            placeholder="Type 'help' or explore..."
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Quick Interactive Command Chips */}
      <div className="px-3 py-1.5 bg-[#121212] border-t border-[#262626] flex items-center gap-1.5 overflow-x-auto text-[10px] text-neutral-400">
        <span className="shrink-0 text-neutral-500">QUICK_RUN:</span>
        {['help', 'projects', 'stack', 'contact', 'cat bio.txt', 'whoami', 'clear'].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCommand(cmd);
            }}
            className="px-1.5 py-0.5 border border-[#333333] hover:border-[#5CE883] hover:text-[#5CE883] bg-[#1a1a1a] transition-colors cursor-pointer shrink-0"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
