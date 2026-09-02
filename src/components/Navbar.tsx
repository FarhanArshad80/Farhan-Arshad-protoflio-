import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Briefcase } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PORTFOLIO_DATA } from '../data/portfolio';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const { currentTheme, setHireMeModalOpen } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    // getBoundingClientRect forces layout, so coalesce the reads into one per
    // frame instead of running them on every scroll event.
    let frame = 0;
    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map((l) => l.href.substring(1));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 220) { setActiveSection(section); break; }
      }
    };
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <motion.header
      id="main-header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-[#0d0d0d]/95 border-b border-[#f5f0e6]/[0.07] py-3 shadow-xl backdrop-blur-2xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 sm:gap-3 group min-w-0 flex-shrink" id="brand-logo-link">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 2 }} whileTap={{ scale: 0.95 }}
            className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-[#b7f34a] text-[#0d0d0d] font-extrabold text-sm sm:text-base shadow-lg shadow-[#b7f34a]/25"
          >
            FA
          </motion.div>
          <div className="flex flex-col min-w-0">
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#f5f0e6] group-hover:text-[#b7f34a] transition-colors truncate">
              {PORTFOLIO_DATA.profile.name}
            </span>
            <span className="hidden sm:block text-[11px] font-mono text-[#8a8680] truncate">Full Stack Engineer</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1 bg-[#161616] p-1.5 rounded-full border border-[#f5f0e6]/[0.07] backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href} href={link.href} id={`nav-link-${link.href.substring(1)}`}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                  isActive ? 'text-[#0d0d0d]' : 'text-[#8a8680] hover:text-[#f5f0e6] link-underline'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full bg-[#b7f34a] -z-10 shadow-md shadow-[#b7f34a]/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setHireMeModalOpen(true)} id="navbar-hire-me-button"
            className="btn-shine relative flex items-center gap-2 px-3 sm:px-4 py-1.5 text-xs font-bold rounded-xl text-[#0d0d0d] bg-[#b7f34a] shadow-lg shadow-[#b7f34a]/25 hover:brightness-110 transition-all shrink-0"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">Hire Me</span>
          </motion.button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} id="mobile-menu-toggle"
            className="md:hidden p-2 rounded-xl bg-[#161616] border border-[#f5f0e6]/[0.07] text-[#c8c3b8]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d0d0d]/98 border-b border-[#f5f0e6]/[0.07] backdrop-blur-2xl px-4 py-4 space-y-3"
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-[#c8c3b8] hover:bg-[#f5f0e6]/5 transition-colors"
              >{link.label}</a>
            ))}
            <div className="pt-3 border-t border-[#f5f0e6]/[0.07]">
              <button
                onClick={() => { setHireMeModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-[#0d0d0d] bg-[#b7f34a] rounded-xl shadow-md"
              >
                <Briefcase className="w-4 h-4" />
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
