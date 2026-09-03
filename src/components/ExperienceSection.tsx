import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { Building2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { SectionHeading } from './motion/SectionHeading';

export const ExperienceSection: React.FC = () => {
  const { currentTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  // Track the timeline's own travel through the viewport so the accent line
  // draws itself downward at exactly the reader's pace.
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 80%', 'end 65%'] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Work"
          highlight="Experience &amp; Track Record"
          subtitle="Proven track record of building performant web applications, designing scalable APIs, and delivering reliable software solutions."
          className="mb-16"
        />

        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-[#f5f0e6] font-mono flex items-center gap-2 mb-8">
            <Building2 className="w-5 h-5 text-[#b7f34a]" />
            Professional Career Journey
          </h3>

          <div ref={timelineRef} className="relative ml-4 pl-6 space-y-8">
            <div aria-hidden className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#f5f0e6]/10 rounded-full" />
            <motion.div
              aria-hidden
              className="absolute left-0 top-0 bottom-0 w-0.5 origin-top rounded-full"
              style={{
                scaleY: reduceMotion ? 1 : lineProgress,
                backgroundImage: `linear-gradient(to bottom, ${currentTheme.accentHex}, ${currentTheme.accentHex}b3, ${currentTheme.accentHex}1a)`,
              }}
            />
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <motion.div key={exp.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: 'easeOut' }} className="relative group"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-25% 0px -25% 0px' }}
                  transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                  className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#0d0d0d] border-2 border-[#b7f34a] shadow-md shadow-[#b7f34a]/20 group-hover:scale-125 transition-transform"
                >
                  {idx === 0 && (
                    <span aria-hidden className="absolute inset-0 rounded-full border-2 border-[#b7f34a] animate-ping opacity-60" />
                  )}
                </motion.div>
                <div className="p-6 rounded-3xl bg-[#161616] border border-[#f5f0e6]/[0.07] hover:border-[#b7f34a]/20 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#f5f0e6]/[0.07]">
                    <div>
                      <h4 className="text-lg font-bold text-[#f5f0e6]">{exp.role}</h4>
                      <div className="text-sm font-semibold text-[#b7f34a] flex items-center gap-2">
                        <span>{exp.company}</span>
                        <span className="text-xs text-[#5a5650]">•</span>
                        <span className="text-xs font-mono text-[#8a8680] flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] text-xs font-mono text-[#8a8680] w-fit">
                      <Calendar className="w-3.5 h-3.5 text-[#b7f34a]/60" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-[#a8a39a] leading-relaxed">{exp.description}</p>
                  <div className="mt-4 space-y-2">
                    <div className="text-xs font-mono font-semibold text-[#5a5650]">KEY IMPACT & DELIVERABLES:</div>
                    {exp.highlights.map((item, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
                        className="flex items-start gap-2 text-xs text-[#c8c3b8] leading-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#b7f34a] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-[#f5f0e6]/[0.07]">
                    {exp.skills.map((s, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-md bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] text-[11px] font-mono text-[#8a8680]">{s}</span>
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
