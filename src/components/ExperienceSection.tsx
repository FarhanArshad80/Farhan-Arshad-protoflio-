import React, { useState } from 'react';
import { motion } from 'motion/react';
import { History, Building2, Calendar, MapPin, Award, CheckCircle2, GraduationCap, Shield } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

export const ExperienceSection: React.FC = () => {
  const { currentTheme } = useTheme();
  const [expandedId, setExpandedId] = useState<string | null>(PORTFOLIO_DATA.experiences[0].id);

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
            <History className="w-3.5 h-3.5" />
            <span>CAREER & CERTIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Work <span className={`bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent`}>Experience & Track Record</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Proven trajectory building software products, leading engineering squads, and deploying robust systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Career Timeline */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2 mb-6">
              <Building2 className="w-5 h-5 text-cyan-400" />
              Professional Career Journey
            </h3>

            <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-8">
              {PORTFOLIO_DATA.experiences.map((exp) => {
                const isExpanded = expandedId === exp.id;
                return (
                  <div key={exp.id} className="relative group">
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

                      <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Key Achievements List */}
                      <div className="mt-4 space-y-2">
                        <div className="text-xs font-mono font-semibold text-slate-400">KEY IMPACT & DELIVERABLES:</div>
                        {exp.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-normal">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Skills Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-slate-800/60">
                        {exp.skills.map((s, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Education & Verified Certifications */}
          <div className="lg:col-span-4 space-y-8">
            {/* Certifications Card */}
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl space-y-4">
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-400" />
                Verified Certifications
              </h3>

              <div className="space-y-3">
                {PORTFOLIO_DATA.certifications.map((cert) => (
                  <div key={cert.id} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                    <div className="font-bold text-xs text-white flex items-center justify-between">
                      <span>{cert.title}</span>
                      <span className="text-[10px] font-mono text-cyan-400">{cert.date}</span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono">{cert.issuer}</div>
                    {cert.credentialId && (
                      <div className="text-[10px] text-slate-500 font-mono">ID: {cert.credentialId}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education Card */}
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl space-y-4">
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
                Education Background
              </h3>

              {PORTFOLIO_DATA.education.map((edu) => (
                <div key={edu.id} className="space-y-2">
                  <div className="font-bold text-sm text-white">{edu.degree}</div>
                  <div className="text-xs text-cyan-400 font-mono">{edu.institution}</div>
                  <div className="text-xs text-slate-400">{edu.period}</div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">{edu.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
