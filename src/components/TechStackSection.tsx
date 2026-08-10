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
  const filteredSkills = PORTFOLIO_DATA.skills.filter((s) => s.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return <Code2 className="w-4 h-4 text-[#b7f34a]" />;
      case 'backend': return <Server className="w-4 h-4 text-[#b7f34a]/70" />;
      case 'database': return <Database className="w-4 h-4 text-emerald-400" />;
      case 'tools': return <Wrench className="w-4 h-4 text-amber-400" />;
      default: return <Sparkles className="w-4 h-4 text-[#b7f34a]" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#f5f0e6]/15" />
            <span className="text-xs font-mono text-[#5a5650] tracking-widest uppercase">Technical Proficiency</span>
            <div className="h-px w-8 bg-[#f5f0e6]/15" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f5f0e6]">
            MERN & <span className={`bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent`}>Full Stack Stack</span>
          </h2>
          <p className="text-[#8a8680] text-base sm:text-lg">Production-tested expertise across modern web development: React, NestJS, Express, Node.js, MongoDB, Git version control, cloud deployments, automated testing & long-term maintenance.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#b7f34a] text-[#0d0d0d] border-2 border-[#b7f34a] shadow-lg shadow-[#b7f34a]/20 font-bold'
                  : 'bg-[#161616] text-[#8a8680] border border-[#f5f0e6]/[0.07] hover:text-[#f5f0e6] hover:border-[#f5f0e6]/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <motion.div key={skill.id} layout initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }} whileHover={{ y: -8, scale: 1.02 }}
                className="p-6 rounded-3xl bg-[#161616] border border-[#f5f0e6]/[0.07] shadow-xl hover:border-[#b7f34a]/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute -right-12 -top-12 w-28 h-28 bg-[#b7f34a]/5 rounded-full blur-2xl group-hover:bg-[#b7f34a]/10 transition-all pointer-events-none" />
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] group-hover:border-[#b7f34a]/30 transition-colors">
                      {getCategoryIcon(skill.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#f5f0e6] group-hover:text-[#b7f34a] transition-colors">{skill.name}</h3>
                      <span className="text-xs font-mono text-[#5a5650] capitalize">{skill.category} • {skill.yearsOfExp} Yrs Exp</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] font-mono text-xs text-[#b7f34a] font-bold">{skill.proficiency}%</span>
                </div>
                <p className="text-xs text-[#8a8680] leading-relaxed mb-4 min-h-[36px]">{skill.description}</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono text-[#5a5650]">
                    <span>Mastery Level</span>
                    <span>{skill.proficiency >= 90 ? 'Expert' : 'Advanced'}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#0d0d0d] overflow-hidden p-0.5 border border-[#f5f0e6]/[0.07]">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.proficiency}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-[#b7f34a]"
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
