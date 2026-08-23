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
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#f5f0e6]/15" />
            <span className="text-xs font-mono text-[#5a5650] tracking-widest uppercase">Let's Connect</span>
            <div className="h-px w-8 bg-[#f5f0e6]/15" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f5f0e6]">
            Let's <span className={`bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent`}>Work Together</span>
          </h2>
          <p className="text-[#8a8680] text-base sm:text-lg">Have a project in mind or want to hire me for full-stack web development? Fill in the enquiry form and I'll get back to you promptly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#161616] border border-[#f5f0e6]/[0.07] space-y-6 shadow-2xl">
              <h3 className="text-xl font-bold text-[#f5f0e6]">Direct Contact</h3>
              <div className="space-y-3.5 text-xs font-mono">
                <a href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] text-[#b7f34a] hover:border-[#b7f34a]/30 transition-colors group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="truncate">{PORTFOLIO_DATA.profile.email}</span>
                </a>
                <div className="p-3.5 rounded-2xl bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] flex items-center gap-3 text-[#c8c3b8]">
                  <MapPin className="w-4 h-4 text-[#b7f34a]/60 shrink-0" />
                  <span>{PORTFOLIO_DATA.profile.location}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-[#f5f0e6]/[0.07]">
                <div className="text-[11px] font-mono text-[#5a5650] mb-3">CONNECT ON SOCIAL MEDIA</div>
                <div className="flex items-center gap-3">
                  {[
                    { href: PORTFOLIO_DATA.profile.github, Icon: Github, title: 'GitHub' },
                    { href: PORTFOLIO_DATA.profile.linkedin, Icon: Linkedin, title: 'LinkedIn' },
                    { href: PORTFOLIO_DATA.profile.twitter, Icon: Twitter, title: 'Twitter / X' },
                  ].map(({ href, Icon, title }) => (
                    <a key={title} href={href} target="_blank" rel="noreferrer"
                      className="p-3 rounded-xl bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] hover:border-[#b7f34a]/30 text-[#8a8680] hover:text-[#f5f0e6] transition-all" title={title}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="pt-2">
                <button onClick={() => setHireMeModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[#0d0d0d] font-bold text-xs bg-[#b7f34a] shadow-lg shadow-[#b7f34a]/20 hover:brightness-110 transition-all"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  Hire Me for a Project
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
};
