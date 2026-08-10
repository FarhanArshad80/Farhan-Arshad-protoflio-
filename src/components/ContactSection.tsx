import React from 'react';
import { Mail, MapPin, Github, Linkedin, Twitter, Briefcase } from 'lucide-react';
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
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#171717]/15" />
            <span className="text-xs font-mono text-[#9ca3af] tracking-widest uppercase">Let's Connect</span>
            <div className="h-px w-8 bg-[#171717]/15" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171717]">
            Reach Out to{' '}
            <span
              className={`bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent`}
            >
              Farhan Arshad
            </span>
          </h2>
          <p className="text-[#6b7280] text-base sm:text-lg">
            Have a project in mind or want to hire me for full-stack web development? Fill in the
            enquiry form and I'll get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#171717]/10 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-[#171717]">
                Direct Contact
              </h3>

              <div className="space-y-3.5 text-xs font-mono">
                {/* Email */}
                <a
                  href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#f7f7f5] border border-[#171717]/10 text-orange-500 hover:border-orange-500/30 transition-colors group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="truncate">{PORTFOLIO_DATA.profile.email}</span>
                </a>

                {/* Location */}
                <div className="p-3.5 rounded-2xl bg-[#f7f7f5] border border-[#171717]/10 flex items-center gap-3 text-[#374151]">
                  <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>{PORTFOLIO_DATA.profile.location}</span>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-[#171717]/10">
                <div className="text-[11px] font-mono text-[#9ca3af] mb-3">
                  CONNECT ON SOCIAL MEDIA
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={PORTFOLIO_DATA.profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#f7f7f5] border border-[#171717]/10 hover:border-[#171717]/20 text-[#6b7280] hover:text-[#171717] transition-all"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={PORTFOLIO_DATA.profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#f7f7f5] border border-[#171717]/10 hover:border-[#171717]/20 text-[#6b7280] hover:text-[#171717] transition-all"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={PORTFOLIO_DATA.profile.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#f7f7f5] border border-[#171717]/10 hover:border-[#171717]/20 text-[#6b7280] hover:text-[#171717] transition-all"
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
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-xs bg-gradient-to-r ${currentTheme.gradientClass} shadow-lg shadow-orange-500/20 hover:brightness-110 transition-all`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
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
