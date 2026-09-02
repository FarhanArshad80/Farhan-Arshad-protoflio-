import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock, Briefcase, Mail, Github, Linkedin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { Marquee } from './motion/Marquee';

const MARQUEE_ITEMS = [
  'Full Stack Engineer',
  'MERN Stack Developer',
  'React',
  'Next.js',
  'React Native',
  'Node.js',
  'NestJS',
  'TypeScript',
  'MongoDB',
  'REST APIs',
  'Tailwind CSS',
  'Cloud Deployment',
  'Available for Freelance',
];

export const Footer: React.FC = () => {
  const { currentTheme, setHireMeModalOpen } = useTheme();
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative z-10 border-t border-[#f5f0e6]/[0.07] bg-[#0d0d0d] pb-4 text-[#5a5650] text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#b7f34a] text-[#0d0d0d] font-bold flex items-center justify-center text-xs shadow-md">FA</div>
            <span className="text-[#f5f0e6] font-extrabold">{PORTFOLIO_DATA.profile.name}</span>
          </div>
          <span className="hidden sm:inline text-[#f5f0e6]/10">|</span>
          <div className="flex items-center gap-1.5 text-[#5a5650]">
            <Clock className="w-3.5 h-3.5 text-[#b7f34a]" />
            <span>Lahore, PK: <span className="text-[#c8c3b8] font-semibold">{localTime || '10:00 AM'}</span> (PKT)</span>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <button onClick={() => setHireMeModalOpen(true)} className="flex items-center gap-1.5 text-[#b7f34a] hover:brightness-110 font-bold transition-all">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Hire Me</span>
          </button>
          <span className="text-[#f5f0e6]/10">•</span>
          <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="flex items-center gap-1.5 hover:text-[#c8c3b8] transition-colors">
            <Mail className="w-3.5 h-3.5" />
            <span>{PORTFOLIO_DATA.profile.email}</span>
          </a>
          <span className="text-[#f5f0e6]/10">•</span>
          <a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#c8c3b8] transition-colors" title="GitHub">
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <span className="text-[#f5f0e6]/10">•</span>
          <a href={PORTFOLIO_DATA.profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#c8c3b8] transition-colors" title="LinkedIn">
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
        </div>

        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} id="back-to-top-button"
          className="p-2.5 rounded-xl bg-[#161616] border border-[#f5f0e6]/[0.07] hover:border-[#b7f34a]/30 text-[#c8c3b8] transition-all hover:scale-105 flex items-center gap-1" title="Back to top"
        >
          <ArrowUp className="w-4 h-4 text-[#b7f34a]" />
          <span className="hidden sm:inline">Top</span>
        </button>
      </div>

      <div className="mt-8 pt-2 border-t border-[#f5f0e6]/[0.05]">
        <Marquee items={MARQUEE_ITEMS} duration={38} />
      </div>
    </footer>
  );
};
