import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { Code2, Server, Gauge, Plug, Cloud, MonitorSmartphone } from 'lucide-react';
import { SectionHeading } from './motion/SectionHeading';
import { SpotlightCard } from './motion/SpotlightCard';

const SKILL_ICONS = {
  Code2,
  Server,
  Gauge,
  Plug,
  Cloud,
  MonitorSmartphone,
};

export const TechStackSection: React.FC = () => {

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills &amp;"
          highlight="Tech Stack"
          subtitle="A specialized toolkit focused on building scalable web apps, robust APIs, and performant user interfaces."
          className="mb-12"
        />

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.skills.map((skill, index) => {
            const Icon = SKILL_ICONS[skill.iconName as keyof typeof SKILL_ICONS] || Code2;
            return (
              <SpotlightCard key={skill.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }} whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-[#161616] border border-[#f5f0e6]/[0.07] hover:border-[#b7f34a]/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-5">
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="p-3 rounded-2xl bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] group-hover:border-[#b7f34a]/30 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-[#b7f34a]" />
                  </motion.div>
                  <h3 className="font-bold text-base text-[#f5f0e6] group-hover:text-[#b7f34a] transition-colors">{skill.name}</h3>
                </div>
                <p className="text-xs text-[#8a8680] leading-relaxed min-h-[88px]">{skill.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[#f5f0e6]/[0.07]">
                  {skill.techTags.map((tag, tagIndex) => (
                    <motion.span key={tag}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.3, delay: index * 0.06 + 0.25 + tagIndex * 0.04 }}
                      className="px-2.5 py-1 rounded-md bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] text-[10px] font-mono text-[#8a8680] transition-colors hover:border-[#b7f34a]/40 hover:text-[#b7f34a]"
                    >{tag}</motion.span>
                  ))}
                </div>
              </SpotlightCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
