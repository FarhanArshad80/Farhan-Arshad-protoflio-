import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Sparkles, CheckCircle2, FileCode, Check, X } from 'lucide-react';
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
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#171717]/15" />
            <span className="text-xs font-mono text-[#9ca3af] tracking-widest uppercase">Featured Work</span>
            <div className="h-px w-8 bg-[#171717]/15" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171717]">
            Production{' '}
            <span className={`bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent`}>
              Projects & Code
            </span>
          </h2>
          <p className="text-[#6b7280] text-base sm:text-lg">
            A showcase of real-world MERN stack platforms, NestJS API microservices, e-commerce suites,
            and real-time workspaces engineered by Farhan Arshad.
          </p>
        </div>

        {/* 4-column grid */}
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
              className="group relative flex flex-col rounded-3xl overflow-hidden border shadow-sm cursor-pointer bg-white border-[#171717]/10 hover:border-orange-500/30 hover:shadow-md transition-all duration-300"
            >
              {/* Card header gradient */}
              <div
                className={`relative h-28 bg-gradient-to-br ${currentTheme.gradientClass} flex items-center justify-center overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10" />
                {project.featured && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono text-white bg-black/20 border border-white/20 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/20 border border-white/20 font-mono text-[10px] text-white uppercase tracking-wide">
                  {project.category}
                </span>
                <FileCode className="w-9 h-9 text-white/40" />
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-[#171717] leading-snug line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-[11px] font-mono text-[#9ca3af] mt-0.5 line-clamp-1">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-xs text-[#6b7280] leading-relaxed line-clamp-3 flex-1">
                  {project.description}
                </p>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-[#f7f7f5] border border-[#171717]/10 text-[10px] font-mono text-orange-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action links */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#171717]/10">
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
                      className="p-1.5 rounded-lg bg-[#f7f7f5] border border-[#171717]/10 text-[#6b7280] hover:text-[#171717] transition-colors"
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
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-[#374151] bg-[#f7f7f5] border border-[#171717]/10 hover:border-orange-500/30 transition-colors"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/30 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl my-8 rounded-3xl bg-[#f7f7f5] border border-[#171717]/10 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            >
              <div className="p-6 bg-white border-b border-[#171717]/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-orange-500 uppercase">
                    {selectedProject.category} PROJECT
                  </span>
                  <h3 className="text-xl font-bold text-[#171717]">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl bg-[#f7f7f5] border border-[#171717]/10 text-[#6b7280] hover:text-[#171717]"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto">
                <div>
                  <h4 className="text-xs font-mono text-[#9ca3af] mb-1">PROJECT DESCRIPTION</h4>
                  <p className="text-sm text-[#374151] leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {selectedProject.keyFeatures && (
                  <div>
                    <h4 className="text-xs font-mono text-[#9ca3af] mb-2">CORE HIGHLIGHTS</h4>
                    <div className="space-y-1.5">
                      {selectedProject.keyFeatures.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#374151]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
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
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#171717]/10 text-[11px] font-mono text-[#374151]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {selectedProject.codeSnippet && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#9ca3af]">
                      <span className="flex items-center gap-1 text-orange-500">
                        <FileCode className="w-3.5 h-3.5" />
                        {selectedProject.codeSnippet.filename}
                      </span>
                      <button
                        onClick={() =>
                          handleCopySnippet(selectedProject.codeSnippet!.code, selectedProject.id)
                        }
                        className="flex items-center gap-1 text-orange-500 hover:text-orange-600"
                      >
                        {copiedCodeId === selectedProject.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-500">Copied</span>
                          </>
                        ) : (
                          <span>Copy Snippet</span>
                        )}
                      </button>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#171717] border border-[#171717]/10 text-xs font-mono text-[#d1d5db] overflow-x-auto">
                      <pre>
                        <code>{selectedProject.codeSnippet.code}</code>
                      </pre>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-[#171717]/10 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-bold text-xs bg-gradient-to-r ${currentTheme.gradientClass} shadow-md`}
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
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f7f7f5] border border-[#171717]/10 text-[#374151] font-bold text-xs hover:border-[#171717]/20 transition-colors"
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
                    className={`px-4 py-2 rounded-xl text-white font-bold text-xs bg-gradient-to-r ${currentTheme.gradientClass} shadow-md`}
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
