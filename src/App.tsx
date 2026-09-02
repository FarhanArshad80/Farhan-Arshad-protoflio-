import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TechStackSection } from './components/TechStackSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TerminalView } from './components/TerminalView';
import { CommandPalette } from './components/CommandPalette';
import { HireMeModal } from './components/HireMeModal';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';

function MainAppContent() {
  const { currentTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <CustomCursor />

      <AnimatePresence>
        {isLoading && (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className={`portfolio-shell min-h-screen relative font-sans transition-colors duration-500 ${currentTheme.bgClass}`}>
        {/* Main navigation header */}
        <Navbar />

        {/* Portfolio sections */}
        <main className="relative z-10">
          <Hero ready={!isLoading} />
          <AboutSection />
          <TechStackSection />
          <ServicesSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Shared Hire Me / Enquiry Modal */}
        <HireMeModal />
        <TerminalView />
        <CommandPalette />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}
