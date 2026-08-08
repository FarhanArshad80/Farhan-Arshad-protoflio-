import React from 'react';
import { Mail, MapPin, Github, Linkedin, Twitter, Sparkles, Briefcase } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { EnquiryForm } from './EnquiryForm';

export const ContactSection: React.FC = () => {
  const { currentTheme, setHireMeModalOpen } = useTheme();

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Mail className="w-3.5 h-3.5" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Reach Out to{' '}
            <span
              className={`bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent`}
            >
              Farhan Arshad
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Have a project in mind or want to hire me for full-stack web development? Fill in the
            enquiry form and I'll get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl space-y-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Direct Contact</span>
              </h3>

              <div className="space-y-3.5 text-xs font-mono">
                {/* Email */}
                <a
                  href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-cyan-400 hover:border-cyan-500/50 transition-colors group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="truncate">{PORTFOLIO_DATA.profile.email}</span>
                </a>

                {/* Location */}
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{PORTFOLIO_DATA.profile.location}</span>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400 mb-3">
                  CONNECT ON SOCIAL MEDIA
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={PORTFOLIO_DATA.profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={PORTFOLIO_DATA.profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={PORTFOLIO_DATA.profile.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all"
                    title="Twitter / X"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Hire Me CTA */}
              <div className="pt-2">
                <button
                  onClick={() => setHireMeModalOpen(true)}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-xs bg-gradient-to-r ${currentTheme.gradientClass} shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-amber-300" />
                  Hire Me for a Project
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Shared Contact Form */}
          <div className="lg:col-span-8">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
};
