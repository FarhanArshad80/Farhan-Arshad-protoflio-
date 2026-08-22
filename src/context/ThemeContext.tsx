import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeId, ThemeOption } from '../types';

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'cyber-neon',
    name: 'Clean Blue',
    bgClass: 'bg-[#F8FAFC] text-[#0F172A]',
    cardBgClass: 'bg-white border-[#E2E8F0] backdrop-blur-xl shadow-sm',
    accentHex: '#2563EB',
    textAccentClass: 'text-[#2563EB]',
    borderAccentClass: 'border-[#2563EB]/30',
    gradientClass: 'from-[#2563EB] to-[#3B82F6]',
    previewColors: ['#F8FAFC', '#2563EB', '#0F172A'],
  },
  {
    id: 'emerald-obsidian',
    name: 'Emerald Obsidian',
    bgClass: 'bg-[#06140E] text-emerald-50',
    cardBgClass: 'bg-emerald-950/40 border-emerald-900/60 backdrop-blur-xl',
    accentHex: '#10B981',
    textAccentClass: 'text-emerald-400',
    borderAccentClass: 'border-emerald-500/40',
    gradientClass: 'from-emerald-400 via-teal-500 to-amber-500',
    previewColors: ['#06140E', '#10B981', '#F59E0B'],
  },
  {
    id: 'violet-pulsar',
    name: 'Violet Cosmic Pulsar',
    bgClass: 'bg-[#0C0A19] text-purple-50',
    cardBgClass: 'bg-purple-950/40 border-purple-900/60 backdrop-blur-xl',
    accentHex: '#A855F7',
    textAccentClass: 'text-purple-400',
    borderAccentClass: 'border-purple-500/40',
    gradientClass: 'from-purple-500 via-fuchsia-500 to-pink-500',
    previewColors: ['#0C0A19', '#A855F7', '#EC4899'],
  },
  {
    id: 'solar-amber',
    name: 'Solar Amber Onyx',
    bgClass: 'bg-[#120E0B] text-amber-50',
    cardBgClass: 'bg-stone-900/60 border-amber-900/50 backdrop-blur-xl',
    accentHex: '#F59E0B',
    textAccentClass: 'text-amber-400',
    borderAccentClass: 'border-amber-500/40',
    gradientClass: 'from-amber-400 via-orange-500 to-red-500',
    previewColors: ['#120E0B', '#F59E0B', '#EF4444'],
  },
  {
    id: 'minimal-light',
    name: 'Minimal Warm Porcelain',
    bgClass: 'bg-[#FAFAFB] text-slate-900',
    cardBgClass: 'bg-white/80 border-slate-200 backdrop-blur-xl shadow-sm',
    accentHex: '#4F46E5',
    textAccentClass: 'text-indigo-600',
    borderAccentClass: 'border-indigo-500/30',
    gradientClass: 'from-indigo-600 via-blue-600 to-violet-600',
    previewColors: ['#FAFAFB', '#4F46E5', '#0F172A'],
  },
];

interface ThemeContextType {
  currentTheme: ThemeOption;
  setThemeId: (id: ThemeId) => void;
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  hireMeModalOpen: boolean;
  setHireMeModalOpen: (open: boolean, service?: string) => void;
  selectedService: string;
  setSelectedService: (service: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('portfolio-theme-id');
    return (saved as ThemeId) || 'cyber-neon';
  });

  const [terminalOpen, setTerminalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [hireMeModalOpen, setHireMeModalOpenState] = useState(false);
  const [selectedService, setSelectedService] = useState('Full Stack Web Application (MERN Stack)');

  const setHireMeModalOpen = (open: boolean, service?: string) => {
    if (service) {
      setSelectedService(service);
    }
    setHireMeModalOpenState(open);
  };

  const setThemeId = (id: ThemeId) => {
    setThemeIdState(id);
    localStorage.setItem('portfolio-theme-id', id);
  };

  const currentTheme = THEME_OPTIONS.find((t) => t.id === themeId) || THEME_OPTIONS[0];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeId);
    if (themeId === 'cyber-neon' || themeId === 'minimal-light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [themeId]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setThemeId,
        terminalOpen,
        setTerminalOpen,
        commandPaletteOpen,
        setCommandPaletteOpen,
        hireMeModalOpen,
        setHireMeModalOpen,
        selectedService,
        setSelectedService,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
