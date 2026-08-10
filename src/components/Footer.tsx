import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock, Briefcase, Mail, Github, Linkedin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { currentTheme, setHireMeModalOpen } = useTheme();
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setLocalTime(timeStr);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Live Time */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-xl bg-gradient-to-br ${currentTheme.gradientClass} text-white font-bold flex items-center justify-center text-xs shadow-md`}
            >
              FA
            </div>
            <span className="text-slate-200 font-extrabold">{PORTFOLIO_DATA.profile.name}</span>
          </div>

          <span className="hidden sm:inline text-slate-700">|</span>

          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-violet-400" />
            <span>
              Lahore, PK:{' '}
              <span className="text-white font-semibold">{localTime || '10:00 AM'}</span> (PKT)
            </span>
          </div>
        </div>

        {/* Center: Quick Links */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <button
            onClick={() => setHireMeModalOpen(true)}
            className="flex items-center gap-1.5 text-violet-400 hover:text-violet-300 font-bold transition-colors"
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            <span>Hire Me</span>
          </button>

          <span className="text-slate-700">•</span>

          <a
            href={`mailto:${PORTFOLIO_DATA.profile.email}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{PORTFOLIO_DATA.profile.email}</span>
          </a>

          <span className="text-slate-700">•</span>

          <a
            href={PORTFOLIO_DATA.profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
            title="GitHub"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <span className="text-slate-700">•</span>

          <a
            href={PORTFOLIO_DATA.profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          id="back-to-top-button"
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 transition-all hover:scale-105 flex items-center gap-1"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4 text-violet-400" />
          <span className="hidden sm:inline">Top</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-900 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} Farhan Arshad • Full Stack MERN & NestJS Developer. All
        rights reserved.
      </div>
    </footer>
  );
};
