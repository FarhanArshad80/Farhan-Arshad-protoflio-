import React from 'react';
import { motion } from 'motion/react';
import { History, Building2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

export const ExperienceSection: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-slate-700" />
            <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">Career History</span>
            <div className="h-px w-8 bg-slate-700" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Work{' '}
            <span
              className={`bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent`}
            >
              Experience & Track Record
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Proven trajectory building software products, leading engineering squads, and deploying
            robust systems.
          </p>
        </div>

        {/* Career Timeline — full width */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2 mb-8">
            <Building2 className="w-5 h-5 text-cyan-400" />
            Professional Career Journey
          </h3>

          <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-8">
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: 'easeOut' }}
                className="relative group"
              >
                {/* Glowing Timeline Dot */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 transition-transform" />

                {/* Timeline Card */}
                <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl hover:border-slate-700/80 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/60">
                    <div>
                      <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                      <div className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
                        <span>{exp.company}</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 w-fit">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-300 leading-relaxed">{exp.description}</p>

                  {/* Key Achievements */}
                  <div className="mt-4 space-y-2">
                    <div className="text-xs font-mono font-semibold text-slate-400">
                      KEY IMPACT & DELIVERABLES:
                    </div>
                    {exp.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-slate-800/60">
                    {exp.skills.map((s, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
