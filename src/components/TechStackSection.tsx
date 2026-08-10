import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { Code2, Server, Database, Wrench, Sparkles } from 'lucide-react';

const CATEGORIES = [
  { id: 'frontend', label: 'Frontend (React/TS)' },
  { id: 'backend', label: 'Backend (Node/Nest)' },
  { id: 'database', label: 'Database (MongoDB/SQL)' },
  { id: 'tools', label: 'Tools, Testing & Deploy' },
];

export const TechStackSection: React.FC = () => {
  const { currentTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);

  const filteredSkills = PORTFOLIO_DATA.skills.filter(
    (skill) => skill.category === activeCategory,
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend':
        return <Code2 className="w-4 h-4 text-cyan-400" />;
      case 'backend':
        return <Server className="w-4 h-4 text-indigo-400" />;
      case 'database':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'tools':
        return <Wrench className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-slate-700" />
            <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">Technical Proficiency</span>
            <div className="h-px w-8 bg-slate-700" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            MERN & <span className={`bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent`}>Full Stack Stack</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Production-tested expertise across modern web development: React, NestJS, Express, Node.js, MongoDB, Git version control, cloud deployments, automated testing & long-term maintenance.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeCategory === cat.id
                  ? `bg-[#111] text-white border-2 border-violet-500 shadow-lg shadow-violet-500/20 font-bold`
                  : 'bg-[#0d0d0d] text-slate-400 border border-white/[0.07] hover:text-slate-200 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Animated Skill Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-xl hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all group relative overflow-hidden"
              >
                {/* Background Ambient Hover Shimmer */}
                <div className="absolute -right-12 -top-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                      {getCategoryIcon(skill.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-xs font-mono text-slate-400 capitalize">
                        {skill.category} • {skill.yearsOfExp} Yrs Exp
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-400 font-bold">
                    {skill.proficiency}%
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 min-h-[36px]">
                  {skill.description}
                </p>

                {/* Animated Skill Meter */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Mastery Level</span>
                    <span>{skill.proficiency >= 90 ? 'Expert' : 'Advanced'}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden p-0.5 border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${currentTheme.gradientClass}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};