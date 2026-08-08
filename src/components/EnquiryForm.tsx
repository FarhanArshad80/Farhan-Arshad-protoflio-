import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Mail, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { SERVICES_LIST } from './ServicesSection';

interface EnquiryFormProps {
  initialService?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

/* ─── Validation helpers ─────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-().]{6,19}$/; // allows +, digits, spaces, hyphens, parens

interface Errors {
  name?: string;
  email?: string;
  contactNumber?: string;
  projectDesc?: string;
}

function validate(fields: {
  name: string;
  email: string;
  contactNumber: string;
  projectDesc: string;
}): Errors {
  const errs: Errors = {};

  if (!fields.name.trim()) {
    errs.name = 'Name is required.';
  } else if (fields.name.trim().length < 2) {
    errs.name = 'Name must be at least 2 characters.';
  }

  if (!fields.email.trim()) {
    errs.email = 'Email is required.';
  } else if (!EMAIL_RE.test(fields.email.trim())) {
    errs.email = 'Please enter a valid email address.';
  }

  if (fields.contactNumber.trim() && !PHONE_RE.test(fields.contactNumber.trim())) {
    errs.contactNumber = 'Please enter a valid phone number (e.g. +92 300 1234567).';
  }

  if (!fields.projectDesc.trim()) {
    errs.projectDesc = 'Project description is required.';
  } else if (fields.projectDesc.trim().length < 20) {
    errs.projectDesc = 'Please describe your project in at least 20 characters.';
  }

  return errs;
}

/* ─── Component ──────────────────────────────────────────────── */
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
  const [timeline, setTimeline] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState('');

  // Sync service when opened from a different service card
  React.useEffect(() => {
    if (initialService) setService(initialService);
  }, [initialService]);

  /* ── Inline field error component ── */
  const FieldError: React.FC<{ msg?: string }> = ({ msg }) =>
    msg ? (
      <p className="flex items-center gap-1 text-[11px] text-red-400 mt-1 font-mono">
        <AlertCircle className="w-3 h-3 shrink-0" />
        {msg}
      </p>
    ) : null;

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError('');

    const errs = validate({ name, email, contactNumber, projectDesc });
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_name: 'Farhan Arshad',
          to_email: PORTFOLIO_DATA.profile.email,
          from_name: name.trim(),
          from_email: email.trim(),
          contact_number: contactNumber.trim() || 'Not provided',
          service: service,
          project_description: projectDesc.trim(),
          budget: budget,
          timeline: timeline.trim() || 'Flexible / Not specified',
          reply_to: email.trim(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setSubmitted(true);
      confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 } });
      onSuccess?.();
    } catch (err: any) {
      console.error('EmailJS error:', err);
      setSendError(
        'Could not send your enquiry right now. Please email directly at ' +
          PORTFOLIO_DATA.profile.email,
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setContactNumber('');
    setProjectDesc('');
    setBudget('$500 - $1,500');
    setTimeline('');
    setErrors({});
    setSendError('');
    setService(initialService || SERVICES_LIST[0]);
  };

  /* ── Shared class strings ── */
  const inputBase =
    'w-full px-4 py-3 rounded-xl bg-slate-950 border text-sm text-white placeholder:text-slate-600 focus:outline-none font-mono transition-colors';
  const inputOk = 'border-slate-800 focus:border-cyan-500';
  const inputErr = 'border-red-500/70 focus:border-red-400';
  const labelClass = 'text-xs font-mono text-slate-400';

  /* ── Success state ── */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 text-center space-y-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl shadow-2xl"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
          <CheckCircle2 className="w-8 h-8 animate-bounce" />
        </div>
        <h3 className="text-2xl font-bold text-white">Enquiry Sent!</h3>
        <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
          Thank you, <span className="font-semibold text-white">{name}</span>! Your enquiry for{' '}
          <span className="text-cyan-400 font-semibold">{service}</span> has been delivered to{' '}
          <span className="text-cyan-400 font-mono">{PORTFOLIO_DATA.profile.email}</span>. Farhan
          will get back to you soon.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a
            href={`mailto:${PORTFOLIO_DATA.profile.email}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-mono text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email Directly
          </a>
          <button
            onClick={resetForm}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
          >
            New Enquiry
          </button>
        </div>
      </motion.div>
    );
  }

  /* ── Form ── */
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>

        {/* Service */}
        <div className="space-y-1.5">
          <label className={labelClass}>SERVICE *</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={`${inputBase} ${inputOk}`}
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
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
              }}
              placeholder="e.g. Alex Morgan"
              className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
            />
            <FieldError msg={errors.name} />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>YOUR EMAIL *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
              }}
              placeholder="e.g. client@company.com"
              className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
            />
            <FieldError msg={errors.email} />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className={labelClass}>PHONE / CONTACT NUMBER</label>
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => {
              setContactNumber(e.target.value);
              if (errors.contactNumber)
                setErrors((p) => ({ ...p, contactNumber: undefined }));
            }}
            placeholder="e.g. +92 300 1234567"
            className={`${inputBase} ${errors.contactNumber ? inputErr : inputOk}`}
          />
          <FieldError msg={errors.contactNumber} />
        </div>

        {/* Project Description */}
        <div className="space-y-1.5">
          <label className={labelClass}>PROJECT DESCRIPTION / DETAILS *</label>
          <textarea
            rows={compact ? 3 : 4}
            value={projectDesc}
            onChange={(e) => {
              setProjectDesc(e.target.value);
              if (errors.projectDesc)
                setErrors((p) => ({ ...p, projectDesc: undefined }));
            }}
            placeholder="Describe your project, key features, target audience, and technical requirements..."
            className={`${inputBase} ${errors.projectDesc ? inputErr : inputOk} resize-none`}
          />
          <FieldError msg={errors.projectDesc} />
        </div>

        {/* Budget + Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelClass}>BUDGET</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={`${inputBase} ${inputOk}`}
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
              className={`${inputBase} ${inputOk}`}
            />
          </div>
        </div>

        {/* Global send error */}
        {sendError && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            {sendError}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl text-white font-bold text-sm bg-gradient-to-r ${currentTheme.gradientClass} shadow-lg shadow-cyan-500/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <span className="flex items-center gap-2 font-mono text-xs">
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Sending Enquiry...
            </span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Enquiry to Farhan
            </>
          )}
        </button>

        <p className="text-center text-[11px] font-mono text-slate-500">
          Delivered to{' '}
          <span className="text-cyan-500">{PORTFOLIO_DATA.profile.email}</span>
        </p>
      </form>
    </div>
  );
};
