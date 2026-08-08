import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Send, Sparkles, Phone, Mail, Check, Code2, Server, Database, Layers, Wrench, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

export const HIRE_SERVICES = [
  {
    id: 'mern-fullstack',
    title: 'Full Stack Web App (MERN)',
    icon: Code2,
    badge: 'Popular',
    description: 'Complete end-to-end web application with React 19, Node.js, Express, MongoDB & Tailwind.',
    estimatedDelivery: '1 - 3 Weeks',
  },
  {
    id: 'nestjs-backend',
    title: 'NestJS REST API Architecture',
    icon: Server,
    badge: 'Enterprise',
    description: 'Scalable TypeScript backend, JWT authentication, modular controllers, and database services.',
    estimatedDelivery: '1 - 2 Weeks',
  },
  {
    id: 'react-frontend',
    title: 'React / Next.js Frontend UI',
    icon: Sparkles,
    badge: 'UI / UX',
    description: 'Ultra-fast responsive web UI, state management, animations, and clean glassmorphism styling.',
    estimatedDelivery: '3 - 7 Days',
  },
  {
    id: 'mongodb-database',
    title: 'Database Architecture & Tuning',
    icon: Database,
    badge: 'Database',
    description: 'MongoDB schema design, indexing, aggregation pipelines, and PostgreSQL migrations.',
    estimatedDelivery: '2 - 5 Days',
  },
  {
    id: 'maintenance-testing',
    title: 'Testing, Deployment & Maintenance',
    icon: Wrench,
    badge: 'Support',
    description: 'Docker setup, Vercel/Render deployments, Jest test suites, bug fixes & ongoing maintenance.',
    estimatedDelivery: 'Ongoing / Flexible',
  },
];

export const HireMeModal: React.FC = () => {
  const { currentTheme, hireMeModalOpen, setHireMeModalOpen, selectedService, setSelectedService } = useTheme();

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [budget, setBudget] = useState('$500 - $1,500');
  const [projectMessage, setProjectMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!hireMeModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !projectMessage) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Save submission locally so data is never lost
      const existing = JSON.parse(localStorage.getItem('hire-me-requests') || '[]');
      existing.push({
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        service: selectedService,
        budget,
        message: projectMessage,
        date: new Date().toISOString(),
      });
      localStorage.setItem('hire-me-requests', JSON.stringify(existing));

      // Trigger Confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
      });
    }, 900);
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Hire Request: ${selectedService} - ${clientName}`);
    const body = encodeURIComponent(
      `Hello Farhan,\n\nI would like to hire you for the following service:\n\n` +
      `Service: ${selectedService}\n` +
      `Name: ${clientName}\n` +
      `Email: ${clientEmail}\n` +
      `Phone/WhatsApp: ${clientPhone || 'N/A'}\n` +
      `Budget Range: ${budget}\n\n` +
      `Project Details:\n${projectMessage}\n\n` +
      `Best regards,\n${clientName}`
    );
    return `mailto:${PORTFOLIO_DATA.profile.email}?subject=${subject}&body=${body}`;
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `*Hire Request for Farhan Arshad*\n\n` +
      `*Service:* ${selectedService}\n` +
      `*Name:* ${clientName}\n` +
      `*Email:* ${clientEmail}\n` +
      `*Budget:* ${budget}\n\n` +
      `*Project:* ${projectMessage}`
    );
    return `https://wa.me/923264082349?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-3xl my-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-2xl"
        >
          {/* Top Bar / Header */}
          <div className="flex items-center justify-between px-6 py-5 bg-slate-950/80 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl bg-gradient-to-r ${currentTheme.gradientClass} text-white shadow-md`}>
                <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Hire Farhan Arshad</h3>
                <p className="text-xs font-mono text-cyan-400">Select a service & transmit project scope</p>
              </div>
            </div>

            <button
              onClick={() => {
                setHireMeModalOpen(false);
                setSubmitted(false);
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-500/60 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-2xl font-extrabold text-white">Hire Request Registered!</h4>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-white">{clientName}</span>! Your inquiry for <span className="text-cyan-400 font-semibold">{selectedService}</span> has been logged.
                  </p>
                </div>

                {/* Instant Transmission Actions */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 max-w-lg mx-auto">
                  <p className="text-xs font-mono text-slate-400">GET AN INSTANT DIRECT RESPONSE VIA:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={getMailtoLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-all shadow-md"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Direct Email</span>
                    </a>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-all shadow-md"
                    >
                      <Phone className="w-4 h-4" />
                      <span>WhatsApp Direct Message</span>
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setHireMeModalOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors"
                >
                  Close Modal
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selection Cards */}
                <div className="space-y-3">
                  <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                    <span>1. SELECT SERVICE</span>
                    <span className="text-cyan-400 font-normal">Click to select</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {HIRE_SERVICES.map((srv) => {
                      const IconComponent = srv.icon;
                      const isSelected = selectedService === srv.title;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => setSelectedService(srv.title)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all relative overflow-hidden group ${
                            isSelected
                              ? `bg-slate-950 border-cyan-500/80 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/50`
                              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className={`p-2 rounded-xl ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-900 text-slate-400 group-hover:text-slate-200'}`}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <span className="font-bold text-sm text-white">{srv.title}</span>
                            </div>

                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shrink-0">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            )}
                          </div>

                          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                            {srv.description}
                          </p>

                          <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                            <span>Timeframe: <span className="text-slate-200">{srv.estimatedDelivery}</span></span>
                            <span className="text-cyan-400 font-semibold">{srv.badge}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Contact & Scope Details */}
                <div className="space-y-4 pt-2">
                  <label className="text-xs font-mono font-bold text-slate-300">2. YOUR CONTACT & PROJECT SCOPE</label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-400">NAME *</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-400">EMAIL *</label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-400">PHONE / WHATSAPP</label>
                      <input
                        type="text"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="e.g. +1 234 567 890"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-400">ESTIMATED BUDGET</label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                      >
                        <option value="<$500">Starter (&lt; $500)</option>
                        <option value="$500 - $1,500">Standard ($500 - $1,500)</option>
                        <option value="$1,500 - $3,500">Growth ($1,500 - $3,500)</option>
                        <option value="$3,500+">Enterprise ($3,500+)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-400">DIRECT EMAIL</label>
                      <div className="px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 truncate flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{PORTFOLIO_DATA.profile.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">PROJECT DETAILS & REQUIREMENTS *</label>
                    <textarea
                      required
                      rows={3}
                      value={projectMessage}
                      onChange={(e) => setProjectMessage(e.target.value)}
                      placeholder="Briefly describe your project features, target launch date, or technical needs..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono resize-none"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 rounded-2xl text-white font-bold text-sm bg-gradient-to-r ${currentTheme.gradientClass} shadow-lg shadow-cyan-500/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2 font-mono text-xs">
                      <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Logging Hire Request...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Hire Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
