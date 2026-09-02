import React from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, CheckCircle, Github, Linkedin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { SectionHeading } from './motion/SectionHeading';
import { SpotlightCard } from './motion/SpotlightCard';

export const AboutSection: React.FC = () => {

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Background &amp; Experience"
          title="About"
          highlight="me"
          subtitle="Full-Stack Developer crafting fast MERN web apps, scalable APIs, and clean user experiences."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-5 min-w-0">
            <SpotlightCard
              className="p-8 rounded-3xl bg-[#161616] border border-[#f5f0e6]/[0.07] shadow-2xl hover:border-[#b7f34a]/30 transition-all"
              contentClassName="space-y-6"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: -6, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 14 }}
                  className="w-16 h-16 rounded-2xl bg-[#b7f34a] text-[#0d0d0d] font-extrabold text-2xl flex items-center justify-center shadow-xl shadow-[#b7f34a]/20"
                >
                  FA
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-[#f5f0e6]">{PORTFOLIO_DATA.profile.name}</h3>
                  <p className="text-xs font-mono text-[#b7f34a]">{PORTFOLIO_DATA.profile.title}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#f5f0e6]/[0.07] font-mono text-xs">
                <div className="flex min-w-0 items-center gap-3 p-3 rounded-xl bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] text-[#c8c3b8] transition-all duration-300 hover:border-[#b7f34a]/25 hover:translate-x-1">
                  <Mail className="w-4 h-4 text-[#b7f34a] shrink-0" />
                  <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="min-w-0 truncate hover:text-[#b7f34a] transition-colors">{PORTFOLIO_DATA.profile.email}</a>
                </div>
                <div className="flex min-w-0 items-center gap-3 p-3 rounded-xl bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] text-[#c8c3b8] transition-all duration-300 hover:border-[#b7f34a]/25 hover:translate-x-1">
                  <MapPin className="w-4 h-4 text-[#b7f34a]/70 shrink-0" />
                  <span>{PORTFOLIO_DATA.profile.location}</span>
                </div>
                <div className="flex min-w-0 items-center gap-3 p-3 rounded-xl bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] text-[#c8c3b8] transition-all duration-300 hover:border-[#b7f34a]/25 hover:translate-x-1">
                  <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
                  <a href="https://www.linkedin.com/in/farhan-arshad-aa5991370/" target="_blank" rel="noreferrer" className="min-w-0 truncate hover:text-blue-400 transition-colors">linkedin.com/in/farhan-arshad</a>
                </div>
                <div className="flex min-w-0 items-center gap-3 p-3 rounded-xl bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] text-[#c8c3b8] transition-all duration-300 hover:border-[#b7f34a]/25 hover:translate-x-1">
                  <Github className="w-4 h-4 text-[#c8c3b8] shrink-0" />
                  <a href="https://github.com/FarhanArshad80" target="_blank" rel="noreferrer" className="min-w-0 truncate hover:text-[#f5f0e6] transition-colors">github.com/FarhanArshad80</a>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-7 min-w-0 space-y-6">
            <div className="space-y-4 text-[#a8a39a] leading-relaxed text-sm sm:text-base">
              <p>{PORTFOLIO_DATA.profile.bio}</p>
              <p>{PORTFOLIO_DATA.profile.bioSecondary}</p>
            </div>

            <div className="pt-2 space-y-3">
              <h4 className="text-xs font-mono font-bold text-[#5a5650] uppercase tracking-wider">PRIMARY COMPETENCIES:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Full-Stack MERN Architecture (React, Node.js, Express, MongoDB)',
                  'Scalable Microservices & APIs (NestJS, RESTful APIs)',
                  'Clean Code & Refactoring (Maintainable & Modular Code)',
                  'Version Control & Workflows (Git, GitHub, Collaborative Workflows)',
                  'Cloud Deployment & Hosting (Vercel, Render, Netlify)',
                  'API Testing & Debugging (Postman, Performance Tuning)',
                ].map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }} whileHover={{ scale: 1.03, y: -3 }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[#161616] border border-[#f5f0e6]/[0.07] text-xs font-medium text-[#c8c3b8] hover:border-[#b7f34a]/30 transition-all duration-300 cursor-default"
                  >
                    <motion.span initial={{ scale: 0, rotate: -90 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: 'backOut' }}>
                      <CheckCircle className="w-4 h-4 text-[#b7f34a] shrink-0" />
                    </motion.span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
