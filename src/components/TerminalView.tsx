import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Terminal as TerminalIcon, Maximize2, Minimize2 } from 'lucide-react';
import { useTheme, THEME_OPTIONS } from '../context/ThemeContext';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const TerminalView: React.FC = () => {
  const { terminalOpen, setTerminalOpen, setThemeId } = useTheme();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-emerald-400">
          <div>Farhan Arshad Interactive UNIX Terminal v3.0.0</div>
          <div className="text-slate-400">Type <span className="text-yellow-400 font-bold">help</span> to list available commands or <span className="text-cyan-400 font-bold">exit</span> to close.</div>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [maximized, setMaximized] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (terminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [terminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!terminalOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput('');

    const lower = cmd.toLowerCase();
    let output: React.ReactNode = null;

    if (lower === 'clear') {
      setHistory([]);
      return;
    } else if (lower === 'exit' || lower === 'quit') {
      setTerminalOpen(false);
      return;
    } else if (lower === 'help') {
      output = (
        <div className="space-y-1 text-slate-300">
          <div className="text-yellow-400 font-bold mb-1">Available Commands:</div>
          <div><span className="text-cyan-400 w-24 inline-block font-bold">whoami</span> - About Farhan Arshad</div>
          <div><span className="text-cyan-400 w-24 inline-block font-bold">skills</span> - List MERN & NestJS tech stack</div>
          <div><span className="text-cyan-400 w-24 inline-block font-bold">projects</span> - Show featured web applications</div>
          <div><span className="text-cyan-400 w-24 inline-block font-bold">contact</span> - Get Farhan's email & phone</div>
          <div><span className="text-cyan-400 w-24 inline-block font-bold">clear</span> - Clear terminal screen</div>
          <div><span className="text-cyan-400 w-24 inline-block font-bold">exit</span> - Close terminal</div>
        </div>
      );
    } else if (lower === 'whoami') {
      output = (
        <div className="text-slate-200 space-y-1">
          <div className="text-cyan-400 font-bold">{PORTFOLIO_DATA.profile.name} - {PORTFOLIO_DATA.profile.title}</div>
          <div className="text-slate-400">{PORTFOLIO_DATA.profile.bio}</div>
          <div className="text-emerald-400">Phone: {PORTFOLIO_DATA.profile.phone}</div>
          <div className="text-emerald-400">Email: {PORTFOLIO_DATA.profile.email}</div>
        </div>
      );
    } else if (lower === 'skills') {
      output = (
        <div className="space-y-1 text-slate-300">
          <div className="text-purple-400 font-bold">Technical Skills:</div>
          {PORTFOLIO_DATA.skills.slice(0, 8).map((s) => (
            <div key={s.id} className="flex justify-between w-64">
              <span className="text-cyan-300">{s.name}:</span>
              <span className="text-emerald-400 font-bold">{s.proficiency}%</span>
            </div>
          ))}
        </div>
      );
    } else if (lower === 'projects') {
      output = (
        <div className="space-y-2 text-slate-300">
          <div className="text-amber-400 font-bold">Featured Projects:</div>
          {PORTFOLIO_DATA.projects.map((p) => (
            <div key={p.id}>
              <span className="text-cyan-400 font-bold">• {p.title}</span>
              <div className="text-xs text-slate-400 ml-3">{p.description}</div>
            </div>
          ))}
        </div>
      );
    } else if (lower === 'contact') {
      output = (
        <div className="space-y-1 text-slate-300">
          <div>Email: <span className="text-cyan-400">{PORTFOLIO_DATA.profile.email}</span></div>
          <div>Phone: <span className="text-emerald-400">{PORTFOLIO_DATA.profile.phone}</span></div>
          <div>GitHub: <span className="text-cyan-400">{PORTFOLIO_DATA.profile.github}</span></div>
        </div>
      );
    } else {
      output = (
        <div className="text-red-400">
          Command not found: '{cmd}'. Type <span className="text-yellow-400 underline font-bold">help</span>.
        </div>
      );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setTerminalOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full ${
            maximized ? 'h-[95vh] max-w-[98vw]' : 'h-[500px] max-w-3xl'
          } rounded-2xl bg-slate-950 border border-emerald-500/40 shadow-2xl z-10 flex flex-col font-mono text-xs overflow-hidden`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-slate-200 font-bold">farhan@portfolio-cli:~</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMaximized(!maximized)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Toggle Maximize"
              >
                {maximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setTerminalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Close CLI"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Buffer Logs */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-black/90">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400">guest@farhanarshad:~$</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Line */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-t border-slate-800">
            <span className="text-emerald-400 font-bold shrink-0">guest@farhanarshad:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command ('help' for list)..."
              className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-slate-600 font-mono"
            />
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
