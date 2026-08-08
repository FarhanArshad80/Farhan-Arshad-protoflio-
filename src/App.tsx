import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CanvasBackground } from './components/CanvasBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TechStackSection } from './components/TechStackSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TerminalView } from './components/TerminalView';
import { CommandPalette } from './components/CommandPalette';
import { HireMeModal } from './components/HireMeModal';

function MainAppContent() {
  const { currentTheme } = useTheme();

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-500 ${currentTheme.bgClass}`}>
      {/* Dynamic particle background */}
      <CanvasBackground />

      {/* Main navigation header */}
      <Navbar />

      {/* Portfolio sections */}
      <main className="relative z-10">
        <Hero />
        <AboutSection />
        <TechStackSection />
        <ProjectsSection />
        <ExperienceSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Overlays & Hire Me Modal */}
      <HireMeModal />
      <TerminalView />
      <CommandPalette />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}
