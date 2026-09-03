import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { SectionHeading } from './motion/SectionHeading';
import { SpotlightCard } from './motion/SpotlightCard';
import profileImage from '../../assets/profile.jpg';

export const AboutSection: React.FC = () => {

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About"
          highlight="me"
          subtitle="Full-Stack Engineer crafting fast MERN web apps, scalable APIs, and clean user experiences."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-5 min-w-0">
            <SpotlightCard
              className="h-full min-h-[22rem] rounded-3xl bg-[#161616] border border-[#f5f0e6]/[0.07] shadow-2xl hover:border-[#b7f34a]/30 transition-all overflow-hidden"
              contentClassName="h-full"
            >
              {/* The name sits on the photo, so its colour is set inline rather
                  than through a themed text-* class — the theme rewrites those
                  to dark ink, which would vanish against the scrim. */}
              <div className="relative h-full overflow-hidden">
                <img
                  src={profileImage}
                  alt={`${PORTFOLIO_DATA.profile.name}, ${PORTFOLIO_DATA.profile.title}`}
                  className="absolute inset-0 w-full h-full object-cover object-[50%_18%] transition-transform duration-700 group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-2xl font-bold leading-tight" style={{ color: '#fff' }}>{PORTFOLIO_DATA.profile.name}</h3>
                  <p className="text-xs font-mono mt-1" style={{ color: 'rgba(255,255,255,0.78)' }}>{PORTFOLIO_DATA.profile.title}</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-7 min-w-0 space-y-6">
            <div className="space-y-4 text-[#a8a39a] leading-relaxed text-sm sm:text-base">
              <p>{PORTFOLIO_DATA.profile.bio}</p>
            </div>

            <div className="pt-2 space-y-3">
              <h4 className="text-xs font-mono font-bold text-[#5a5650] uppercase tracking-wider">PRIMARY COMPETENCIES:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Full-Stack MERN Architecture (React, Node.js, Express, MongoDB)',
                  'Scalable Microservices & APIs (NestJS, RESTful APIs)',
                  'Clean Code & Refactoring (Maintainable & Modular Code)',
                  'Version Control & Workflows (Git, GitHub, Collaborative Workflows)',
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
