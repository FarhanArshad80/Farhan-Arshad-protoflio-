import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Menu, X, Sparkles, Check, ChevronDown, Briefcase } from 'lucide-react';
import { useTheme, THEME_OPTIONS } from '../context/ThemeContext';
import { PORTFOLIO_DATA } from '../data/portfolio';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const {
    currentTheme,
    setThemeId,
    setHireMeModalOpen,
  } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? `${currentTheme.cardBgClass} border-b py-3 shadow-xl backdrop-blur-2xl`
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand & Name */}
        <a href="#" className="flex items-center gap-3 group" id="brand-logo-link">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 text-white font-extrabold text-base shadow-lg shadow-cyan-500/20"
          >
            FA
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900"></span>
            </span>
          </motion.div>

          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight group-hover:text-cyan-400 transition-colors">
              {PORTFOLIO_DATA.profile.name}
            </span>

            {/* Animated "Full Stack Developer" badge */}
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              className="text-[11px] flex items-center gap-1.5 font-mono"
            >
              <span className="relative flex h-1.5 w-1.5">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-cyan-400"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
              </span>

              <motion.span
                className="bg-clip-text text-transparent bg-[length:200%_auto]"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #22d3ee, #818cf8, #a855f7, #22d3ee)',
                }}
                animate={{ backgroundPosition: ['0% center', '200% center'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                Full Stack Developer
              </motion.span>
            </motion.span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md shadow-inner">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              
              <a
                key={link.href}
                href={link.href}
                id={`nav-link-${link.href.substring(1)}`}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentTheme.gradientClass} opacity-90 -z-10 shadow-md`}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-2">
          {/* Theme Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              id="theme-selector-button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 text-slate-200 transition-colors"
              title="Change Theme"
            >
              <Palette className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{currentTheme.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            <AnimatePresence>
              {themeDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 p-2 shadow-2xl z-50 backdrop-blur-2xl"
                >
                  <div className="px-3 py-1.5 text-xs font-mono text-slate-400 border-b border-slate-800 mb-1 flex items-center justify-between">
                    <span>SELECT THEME</span>
                    <Sparkles className="w-3 h-3 text-amber-400" />
                  </div>
                  {THEME_OPTIONS.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        setThemeId(theme.id);
                        setThemeDropdownOpen(false);
                      }}
                      id={`theme-option-${theme.id}`}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                        currentTheme.id === theme.id
                          ? 'bg-slate-800 text-white font-semibold'
                          : 'text-slate-300 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex items-center -space-x-1">
                          {theme.previewColors.map((color, i) => (
                            <span
                              key={i}
                              className="w-3 h-3 rounded-full border border-slate-900"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span>{theme.name}</span>
                      </div>
                      {currentTheme.id === theme.id && (
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PROMINENT "HIRE ME" BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setHireMeModalOpen(true)}
            id="navbar-hire-me-button"
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-xl text-white bg-gradient-to-r ${currentTheme.gradientClass} shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all border border-white/20`}
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
            <span>Hire Me</span>
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="md:hidden p-2 rounded-xl bg-slate-800/70 text-slate-200 border border-slate-700/60"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/98 border-b border-slate-800 backdrop-blur-2xl px-4 py-4 space-y-3"
          >
            {NAV_LINKS.map((link) => (
              
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setHireMeModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r ${currentTheme.gradientClass} rounded-xl shadow-md`}
              >
                <Briefcase className="w-4 h-4 text-amber-300" />
                Hire Me (Select Service)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};