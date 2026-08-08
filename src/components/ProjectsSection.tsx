import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Sparkles, Layers, CheckCircle2, FileCode, Check, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { Project } from '../types';
import { useTheme } from '../context/ThemeContext';

export const ProjectsSection: React.FC = () => {
  const { currentTheme, setHireMeModalOpen } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const projects = PORTFOLIO_DATA.projects;

  const handleCopySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Layers className="w-3.5 h-3.5" />
            <span>FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Production{' '}
            <span className={`bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent`}>
              Projects & Code
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A showcase of real-world MERN stack platforms, NestJS API microservices, e-commerce suites,
            and real-time workspaces engineered by Farhan Arshad.
          </p>
        </div>

        {/* 4-column grid (2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedProject(project)}
              className="group relative flex flex-col rounded-3xl overflow-hidden border backdrop-blur-xl shadow-xl cursor-pointer bg-slate-900/60 border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-cyan-500/10"
            >
              {/* Card header gradient */}
              <div
                className={`relative h-28 bg-gradient-to-br ${currentTheme.gradientClass} flex items-center justify-center overflow-hidden`}
              >
                <div className="absolute inset-0 bg-slate-950/20" />
                {project.featured && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono text-amber-200 bg-slate-950/60 border border-amber-300/40 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-950/60 border border-white/20 font-mono text-[10px] text-white uppercase tracking-wide">
                  {project.category}
                </span>
                <FileCode className="w-9 h-9 text-white/30" />
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5 line-clamp-1">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 flex-1">
                  {project.description}
                </p>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-cyan-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action links */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`flex-1 text-center px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-white bg-gradient-to-r ${currentTheme.gradientClass} shadow-sm`}
                    >
                      Live →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-slate-200 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl my-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            >
              <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase">
                    {selectedProject.category} PROJECT
                  </span>
                  <h3 className="text-xl font-bold text-white">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto">
                <div>
                  <h4 className="text-xs font-mono text-slate-400 mb-1">PROJECT DESCRIPTION</h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {selectedProject.keyFeatures && (
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 mb-2">CORE HIGHLIGHTS</h4>
                    <div className="space-y-1.5">
                      {selectedProject.keyFeatures.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {selectedProject.codeSnippet && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-cyan-400">
                        <FileCode className="w-3.5 h-3.5" />
                        {selectedProject.codeSnippet.filename}
                      </span>
                      <button
                        onClick={() =>
                          handleCopySnippet(selectedProject.codeSnippet!.code, selectedProject.id)
                        }
                        className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
                      >
                        {copiedCodeId === selectedProject.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <span>Copy Snippet</span>
                        )}
                      </button>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
                      <pre>
                        <code>{selectedProject.codeSnippet.code}</code>
                      </pre>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Launch Live App
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs"
                      >
                        <Github className="w-3.5 h-3.5" />
                        GitHub Repository
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      const title = selectedProject.title;
                      setSelectedProject(null);
                      setHireMeModalOpen(true, `Build App like ${title}`);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-md"
                  >
                    Hire Farhan for Similar Project
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
