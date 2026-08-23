import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { Code2, Server, Gauge, Plug, Cloud, MonitorSmartphone } from 'lucide-react';

const SKILL_ICONS = {
  Code2,
  Server,
  Gauge,
  Plug,
  Cloud,
  MonitorSmartphone,
};

export const TechStackSection: React.FC = () => {
  const { currentTheme } = useTheme();

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
            Skills & <span className={`bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent`}>Tech Stack</span>
          </h2>
          <p className="text-[#8a8680] text-base sm:text-lg">A specialized toolkit focused on building scalable web apps, robust APIs, and performant user interfaces.</p>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.skills.map((skill, index) => {
            const Icon = SKILL_ICONS[skill.iconName as keyof typeof SKILL_ICONS] || Code2;
            return (
              <motion.div key={skill.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }} whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-[#161616] border border-[#f5f0e6]/[0.07] hover:border-[#b7f34a]/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 rounded-2xl bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] group-hover:border-[#b7f34a]/30 transition-colors">
                    <Icon className="w-5 h-5 text-[#b7f34a]" />
                  </div>
                  <h3 className="font-bold text-base text-[#f5f0e6] group-hover:text-[#b7f34a] transition-colors">{skill.name}</h3>
                </div>
                <p className="text-xs text-[#8a8680] leading-relaxed min-h-[88px]">{skill.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[#f5f0e6]/[0.07]">
                  {skill.techTags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] text-[10px] font-mono text-[#8a8680]">{tag}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
