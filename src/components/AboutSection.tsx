import React from 'react';
import { motion } from 'motion/react';
import { User, Mail, MapPin, CheckCircle, Github, Linkedin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

export const AboutSection: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-slate-700" />
            <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">Background &amp; Experience</span>
            <div className="h-px w-8 bg-slate-700" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            About <span className={`bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent`}>me</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Full Stack Developer specializing in MERN Stack, NestJS microservices, REST APIs, Git/GitHub, deployments, and full project lifecycle maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Avatar / Profile Graphic Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl shadow-2xl space-y-6 overflow-hidden group hover:border-violet-500/40 transition-all">
              {/* Profile Badge */}
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentTheme.gradientClass} text-white font-extrabold text-2xl flex items-center justify-center shadow-xl shadow-violet-500/20`}>
                  FA
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{PORTFOLIO_DATA.profile.name}</h3>
                  <p className="text-xs font-mono text-cyan-400">{PORTFOLIO_DATA.profile.title}</p>
                </div>
              </div>

              {/* Direct Details Box */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80 font-mono text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
                  <Mail className="w-4 h-4 text-violet-400 shrink-0" />
                  <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="truncate hover:text-cyan-300">
                    {PORTFOLIO_DATA.profile.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{PORTFOLIO_DATA.profile.location}</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
                  <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
                  <a
                    href="https://www.linkedin.com/in/farhan-arshad-aa5991370/"
                    target="_blank"
                    rel="noreferrer"
                    className="truncate hover:text-blue-300"
                  >
                    linkedin.com/in/farhan-arshad
                  </a>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
                  <Github className="w-4 h-4 text-slate-300 shrink-0" />
                  <a
                    href="https://github.com/FarhanArshad80"
                    target="_blank"
                    rel="noreferrer"
                    className="truncate hover:text-white"
                  >
                    github.com/FarhanArshad80
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Narrative & Core Skills Checklist */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
              <p>
                {PORTFOLIO_DATA.profile.bio}
              </p>
              <p>
                Whether building complex MERN stack web platforms from the ground up, implementing NestJS microservices, tuning MongoDB performance, or deploying containerized apps with zero-downtime, I prioritize clean code architecture and seamless user experiences.
              </p>
            </div>

            {/* Specialized Competencies */}
            <div className="pt-2 space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                PRIMARY COMPETENCIES:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Full Stack MERN Architecture (React, Express, Node, MongoDB)',
                  'Enterprise NestJS TypeScript Microservices',
                  'Git & GitHub Version Control & Code Reviews',
                  'Cloud Deployments (Vercel, Render, Netlify, Docker)',
                  'Automated Unit & Integration Testing (Jest, Postman)',
                  'Long-term App Refactoring, Bug Fixing & Maintenance',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
                    whileHover={{ scale: 1.03, y: -3 }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/50 border border-slate-700/60 text-xs font-medium text-slate-200 shadow-[0_4px_16px_-2px_rgba(0,0,0,0.5),0_0_0_1px_rgba(148,163,184,0.06)] hover:border-cyan-500/50 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 cursor-default"
                  >
                    <motion.span
                      initial={{ scale: 0, rotate: -90 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: 'backOut' }}
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
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