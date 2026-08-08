import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Command, Terminal, Palette, User, Briefcase, History, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme, THEME_OPTIONS } from '../context/ThemeContext';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const CommandPalette: React.FC = () => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setThemeId,
    setTerminalOpen,
    setHireMeModalOpen,
  } = useTheme();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      } else if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const actions = [
    { id: 'hire', label: 'Hire Farhan Arshad (Select Service)', icon: Sparkles, action: () => { setHireMeModalOpen(true); setCommandPaletteOpen(false); } },
    { id: 'about', label: 'Go to About Section', icon: User, action: () => { window.location.hash = '#about'; setCommandPaletteOpen(false); } },
    { id: 'skills', label: 'Go to Tech Stack (MERN/NestJS)', icon: Briefcase, action: () => { window.location.hash = '#skills'; setCommandPaletteOpen(false); } },
    { id: 'projects', label: 'Explore Web Projects', icon: Briefcase, action: () => { window.location.hash = '#projects'; setCommandPaletteOpen(false); } },
    { id: 'experience', label: 'View Career History', icon: History, action: () => { window.location.hash = '#experience'; setCommandPaletteOpen(false); } },
    { id: 'contact', label: 'Contact Farhan Arshad', icon: Mail, action: () => { window.location.hash = '#contact'; setCommandPaletteOpen(false); } },
    { id: 'cli', label: 'Launch Interactive CLI Terminal', icon: Terminal, action: () => { setTerminalOpen(true); setCommandPaletteOpen(false); } },
  ];

  const themeActions = THEME_OPTIONS.map((t) => ({
    id: `theme-${t.id}`,
    label: `Switch Theme: ${t.name}`,
    icon: Palette,
    action: () => { setThemeId(t.id); setCommandPaletteOpen(false); },
  }));

  const allItems = [...actions, ...themeActions].filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCommandPaletteOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-10 overflow-hidden flex flex-col"
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sections, hire services, or themes..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              autoFocus
            />
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">ESC</span>
          </div>

          {/* Results List */}
          <div className="p-2 max-h-80 overflow-y-auto space-y-1">
            {allItems.length > 0 ? (
              allItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors group text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span>{item.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-slate-500">
                No matching actions found for "{query}"
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
