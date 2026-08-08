import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Copy, Check, Code, Layers, Zap } from 'lucide-react';
import { Project } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { currentTheme } = useTheme();
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'code'>('overview');

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl z-10 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800/80 sticky top-0 bg-slate-900/90 backdrop-blur-md z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-950/80 border border-amber-800/80 px-2.5 py-0.5 rounded-md">
                    Featured Project
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mt-1">{project.title}</h3>
            </div>

            <button
              onClick={onClose}
              id="close-project-modal"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subheader Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 py-3 bg-slate-950/60 border-b border-slate-800/80 text-xs font-mono">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Overview & Features
            </button>
            {project.architectureOverview && (
              <button
                onClick={() => setActiveTab('architecture')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'architecture' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Architecture
              </button>
            )}
            {project.codeSnippet && (
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Code Snippet
              </button>
            )}
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {project.longDescription || project.description}
                </p>

                {/* Key Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                        <div className="text-xl font-mono font-bold text-cyan-400">{metric.value}</div>
                        <div className="text-xs text-slate-400 font-medium">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Features List */}
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-white font-mono flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Key Capabilities & Innovations
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.keyFeatures.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <h4 className="font-bold text-xs text-slate-400 font-mono">TECHNOLOGY STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-4">
                <h4 className="font-bold text-base text-white flex items-center gap-2 font-mono">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  System Architecture & Data Flow
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-mono bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  {project.architectureOverview}
                </p>
              </div>
            )}

            {activeTab === 'code' && project.codeSnippet && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>File: {project.codeSnippet.filename}</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-end gap-3 rounded-b-3xl">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium text-xs bg-gradient-to-r ${currentTheme.gradientClass} shadow-md hover:brightness-110 transition-all`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
