import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Sparkles, CheckCircle2, FileCode, Check, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { Project } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useModalBehavior } from '../hooks/useModalBehavior';
import { SectionHeading } from './motion/SectionHeading';

export const ProjectsSection: React.FC = () => {
  const { currentTheme, setHireMeModalOpen } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const projects = PORTFOLIO_DATA.projects;

  const closeProject = useCallback(() => setSelectedProject(null), []);
  useModalBehavior(!!selectedProject, closeProject);

  const handleCopySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured Work"
          title="Production"
          highlight="Projects &amp; Code"
          subtitle="A showcase of real-world MERN stack platforms, NestJS API microservices, e-commerce suites, and real-time workspaces engineered by Farhan Arshad."
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project, index) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }} whileHover={{ y: -6 }} whileTap={{ scale: 0.985 }}
              onClick={() => setSelectedProject(project)}
              role="button" tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(project); }
              }}
              className="group relative flex flex-col rounded-3xl overflow-hidden border shadow-xl cursor-pointer bg-[#161616] border-[#f5f0e6]/[0.07] hover:border-[#b7f34a]/30 hover:shadow-[#b7f34a]/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b7f34a]/60"
            >
              <div className={`relative h-28 bg-gradient-to-br ${currentTheme.gradientClass} flex items-center justify-center overflow-hidden`}>
                <div className="card-scrim absolute inset-0" />
                {/* Light sweeps across the header once on hover. */}
                <div aria-hidden className="card-sheen absolute inset-0" />
                {project.featured && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono text-[#0d0d0d] bg-[#b7f34a]/80 border border-[#b7f34a]/40 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#0d0d0d]/50 border border-[#f5f0e6]/20 font-mono text-[10px] text-[#f5f0e6] uppercase tracking-wide">{project.category}</span>
                <FileCode className="w-9 h-9 text-[#0d0d0d]/30 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
              </div>

              <div className="flex flex-col flex-1 p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-[#f5f0e6] leading-snug line-clamp-2">{project.title}</h3>
                  <p className="text-[11px] font-mono text-[#5a5650] mt-0.5 line-clamp-1">{project.subtitle}</p>
                </div>
                <p className="text-xs text-[#8a8680] leading-relaxed line-clamp-3 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded-md bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] text-[10px] font-mono text-[#b7f34a]">{tech}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-[#f5f0e6]/[0.07]">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                      className="flex-1 text-center px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-[#0d0d0d] bg-[#b7f34a] shadow-sm"
                    >Live →</a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] text-[#8a8680] hover:text-[#f5f0e6] transition-colors" title="GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-[#c8c3b8] bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] hover:border-[#b7f34a]/30 hover:text-[#b7f34a] transition-colors"
                  >Details</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              key="project-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeProject}
              role="dialog"
              aria-modal="true"
              aria-label={selectedProject.title}
              className="modal-scrim fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                className="relative w-full max-w-3xl my-8 rounded-3xl bg-[#161616] border border-[#f5f0e6]/[0.07] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
              >
                <div className="p-6 bg-[#0d0d0d] border-b border-[#f5f0e6]/[0.07] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#b7f34a] uppercase">{selectedProject.category} PROJECT</span>
                    <h3 className="text-xl font-bold text-[#f5f0e6]">{selectedProject.title}</h3>
                  </div>
                  <button onClick={closeProject} className="p-2 rounded-xl bg-[#161616] border border-[#f5f0e6]/[0.07] text-[#8a8680] hover:text-[#f5f0e6] transition-colors" aria-label="Close">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto">
                  <div>
                    <h4 className="text-xs font-mono text-[#5a5650] mb-1">PROJECT DESCRIPTION</h4>
                    <p className="text-sm text-[#c8c3b8] leading-relaxed">{selectedProject.longDescription}</p>
                  </div>
                  {selectedProject.keyFeatures && (
                    <div>
                      <h4 className="text-xs font-mono text-[#5a5650] mb-2">CORE HIGHLIGHTS</h4>
                      <div className="space-y-1.5">
                        {selectedProject.keyFeatures.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#c8c3b8]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#b7f34a] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-lg bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] text-[11px] font-mono text-[#8a8680]">{tech}</span>
                  ))}
                </div>
                {selectedProject.codeSnippet && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#5a5650]">
                      <span className="flex items-center gap-1 text-[#b7f34a]">
                        <FileCode className="w-3.5 h-3.5" />{selectedProject.codeSnippet.filename}
                      </span>
                      <button onClick={() => handleCopySnippet(selectedProject.codeSnippet!.code, selectedProject.id)} className="flex items-center gap-1 text-[#b7f34a]/70 hover:text-[#b7f34a]">
                        {copiedCodeId === selectedProject.id ? (
                          <><Check className="w-3.5 h-3.5" /><span>Copied</span></>
                        ) : <span>Copy Snippet</span>}
                      </button>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] text-xs font-mono text-[#c8c3b8] overflow-x-auto">
                      <pre><code>{selectedProject.codeSnippet.code}</code></pre>
                    </div>
                  </div>
                )}
                <div className="pt-4 border-t border-[#f5f0e6]/[0.07] flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    {selectedProject.liveUrl && (
                      <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[#0d0d0d] bg-[#b7f34a] font-bold text-xs shadow-md">
                        <ExternalLink className="w-3.5 h-3.5" />Launch Live App
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] text-[#c8c3b8] font-bold text-xs hover:border-[#f5f0e6]/20 transition-colors">
                        <Github className="w-3.5 h-3.5" />GitHub Repository
                      </a>
                    )}
                  </div>
                  <button onClick={() => { const title = selectedProject.title; setSelectedProject(null); setHireMeModalOpen(true, `Build App like ${title}`); }}
                    className="px-4 py-2 rounded-xl text-[#0d0d0d] bg-[#b7f34a] font-bold text-xs shadow-md hover:brightness-110 transition-all"
                  >
                    Hire Farhan for Similar Project
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
};
