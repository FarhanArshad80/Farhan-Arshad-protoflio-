import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { SERVICES_LIST } from './ServicesSection';

interface EnquiryFormProps {
  initialService?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialService,
  onSuccess,
  compact = false,
}) => {
  const { currentTheme } = useTheme();

  const [service, setService] = useState(initialService || SERVICES_LIST[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [budget, setBudget] = useState('$500 - $1,500');
  const [usp, setUsp] = useState('');
  const [timeline, setTimeline] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Update service when the prop changes (e.g. opened from different service card)
  React.useEffect(() => {
    if (initialService) setService(initialService);
  }, [initialService]);

  const buildMailtoUrl = () => {
    const subject = encodeURIComponent(
      `Project Enquiry: ${service} — ${name}`
    );
    const body = encodeURIComponent(
      `Hello Farhan,\n\n` +
      `I would like to enquire about your services.\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `SERVICE SELECTED:   ${service}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `CLIENT DETAILS\n` +
      `Name:           ${name}\n` +
      `Email:          ${email}\n` +
      `Contact Number: ${contactNumber || 'N/A'}\n\n` +
      `PROJECT DETAILS\n` +
      `Description:    ${projectDesc}\n` +
      `Budget:         ${budget}\n` +
      `Timeline:       ${timeline || 'Flexible'}\n\n` +
      `USP / UNIQUE REQUIREMENTS\n` +
      `${usp || 'N/A'}\n\n` +
      `Best regards,\n${name}`
    );
    return `mailto:${PORTFOLIO_DATA.profile.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !projectDesc) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Open the pre-filled email client so the enquiry lands in Farhan's inbox
      window.open(buildMailtoUrl(), '_blank');

      // Save locally as a fallback record
      const existing = JSON.parse(localStorage.getItem('enquiries') || '[]');
      existing.push({
        service,
        name,
        email,
        contactNumber,
        projectDesc,
        budget,
        usp,
        timeline,
        date: new Date().toISOString(),
      });
      localStorage.setItem('enquiries', JSON.stringify(existing));

      confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 } });

      onSuccess?.();
    }, 800);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono';
  const labelClass = 'text-xs font-mono text-slate-400';

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${compact ? 'py-8' : 'p-8'} text-center space-y-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl shadow-2xl`}
      >
        <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
          <CheckCircle2 className="w-8 h-8 animate-bounce" />
        </div>
        <h3 className="text-2xl font-bold text-white">Enquiry Sent!</h3>
        <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
          Thank you, <span className="font-semibold text-white">{name}</span>. Your email client has
          opened with your enquiry pre-filled — please hit <span className="text-cyan-400 font-mono">Send</span> to
          deliver it directly to{' '}
          <span className="text-cyan-400 font-mono">{PORTFOLIO_DATA.profile.email}</span>.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a
            href={buildMailtoUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-mono text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            Re-open Email
          </a>
          <button
            onClick={() => {
              setSubmitted(false);
              setName('');
              setEmail('');
              setContactNumber('');
              setProjectDesc('');
              setUsp('');
              setTimeline('');
              setBudget('$500 - $1,500');
              setService(initialService || SERVICES_LIST[0]);
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
          >
            New Enquiry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Service Dropdown */}
        <div className="space-y-1.5">
          <label className={labelClass}>SERVICE *</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={inputClass}
            required
          >
            {SERVICES_LIST.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelClass}>YOUR NAME *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className={inputClass}
            />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>YOUR EMAIL *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. client@company.com"
              className={inputClass}
            />
          </div>
        </div>

        {/* Phone/Contact */}
        <div className="space-y-1.5">
          <label className={labelClass}>PHONE / CONTACT NUMBER</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="e.g. +1 234 567 890"
            className={inputClass}
          />
        </div>

        {/* Project Description */}
        <div className="space-y-1.5">
          <label className={labelClass}>PROJECT DESCRIPTION / DETAILS *</label>
          <textarea
            required
            rows={compact ? 3 : 4}
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
            placeholder="Describe your project, features you need, target audience, and any technical requirements..."
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Budget + Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelClass}>BUDGET</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={inputClass}
            >
              <option value="Under $500">Starter (Under $500)</option>
              <option value="$500 - $1,500">Standard ($500 – $1,500)</option>
              <option value="$1,500 - $3,500">Growth ($1,500 – $3,500)</option>
              <option value="$3,500+">Enterprise ($3,500+)</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>TIMELINE</label>
            <input
              type="text"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              placeholder="e.g. 2 weeks, 1 month, ASAP"
              className={inputClass}
            />
          </div>
        </div>

        {/* USP / Unique Requirements */}
        <div className="space-y-1.5">
          <label className={labelClass}>USP / UNIQUE REQUIREMENTS</label>
          <textarea
            rows={compact ? 2 : 3}
            value={usp}
            onChange={(e) => setUsp(e.target.value)}
            placeholder="What makes your project unique? Any specific features, integrations, or selling points we should know about?"
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl text-white font-bold text-sm bg-gradient-to-r ${currentTheme.gradientClass} shadow-lg shadow-cyan-500/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2`}
        >
          {loading ? (
            <span className="flex items-center gap-2 font-mono text-xs">
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Sending Enquiry...
            </span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Enquiry to Farhan</span>
            </>
          )}
        </button>

        <p className="text-center text-[11px] font-mono text-slate-500">
          Enquiry will be delivered to{' '}
          <span className="text-cyan-500">{PORTFOLIO_DATA.profile.email}</span>
        </p>
      </form>
    </div>
  );
};
