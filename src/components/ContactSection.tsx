import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle2, Phone, MapPin, Clock, Github, Linkedin, Twitter, MessageSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

const TOPICS = [
  'Hire for Full Stack MERN App',
  'NestJS API Backend Project',
  'Code Maintenance & Bug Fixes',
  'General Inquiry / Reach Out',
];

export const ContactSection: React.FC = () => {
  const { currentTheme, setHireMeModalOpen } = useTheme();
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Save submission in localStorage
      const submissions = JSON.parse(localStorage.getItem('contact-messages') || '[]');
      submissions.push({
        topic: selectedTopic,
        name,
        email,
        phone,
        message,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('contact-messages', JSON.stringify(submissions));

      // Celebration Confetti
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 },
      });
    }, 900);
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`Contact Form: ${selectedTopic} - ${name}`);
    const body = encodeURIComponent(
      `Hello Farhan,\n\nI am contacting you regarding: ${selectedTopic}\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || 'N/A'}\n\n` +
      `Message:\n${message}\n`
    );
    return `mailto:${PORTFOLIO_DATA.profile.email}?subject=${subject}&body=${body}`;
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `*New Message for Farhan Arshad*\n\n` +
      `*Topic:* ${selectedTopic}\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Phone:* ${phone}\n\n` +
      `*Message:* ${message}`
    );
    return `https://wa.me/923264082349?text=${text}`;
  };

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
            Reach Out to <span className={`bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent`}>Farhan Arshad</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Have a project in mind, an application to build or maintain, or want to hire me for full stack web development? Transmit your message directly below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl space-y-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Direct Contact Channels</span>
              </h3>

              <div className="space-y-3.5 text-xs font-mono">
                {/* Email link */}
                <a
                  href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-cyan-400 hover:border-cyan-500/50 transition-colors group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="truncate">{PORTFOLIO_DATA.profile.email}</span>
                </a>

                {/* Phone & WhatsApp link */}
                <a
                  href="https://wa.me/923264082349"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-emerald-400 hover:border-emerald-500/50 transition-colors group"
                >
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform shrink-0" />
                  <span>{PORTFOLIO_DATA.profile.phone} (WhatsApp Direct)</span>
                </a>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{PORTFOLIO_DATA.profile.location}</span>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400 mb-3">CONNECT ON SOCIAL MEDIA</div>
                <div className="flex items-center gap-3">
                  <a
                    href={PORTFOLIO_DATA.profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={PORTFOLIO_DATA.profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={PORTFOLIO_DATA.profile.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Hire Me CTA Quick Launcher */}
              <div className="pt-2">
                <button
                  onClick={() => setHireMeModalOpen(true)}
                  className={`w-full py-3.5 rounded-2xl text-white font-bold text-xs bg-gradient-to-r ${currentTheme.gradientClass} shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all`}
                >
                  Hire Me for a Project (Select Service)
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl shadow-2xl">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 className="w-8 h-8 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Transmitted!</h3>
                  <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                    Thank you, <span className="font-semibold text-white">{name}</span>. Farhan Arshad will respond to your message at <span className="text-cyan-400 font-mono">{email}</span> as soon as possible.
                  </p>

                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <a
                      href={getMailtoUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-mono text-white transition-colors"
                    >
                      Open Email App
                    </a>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-mono text-white transition-colors"
                    >
                      Send WhatsApp Message
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setPhone('');
                        setMessage('');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
                    >
                      New Message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Topic Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-300">TOPIC OF INQUIRY:</label>
                    <div className="flex flex-wrap gap-2">
                      {TOPICS.map((topic) => (
                        <button
                          type="button"
                          key={topic}
                          onClick={() => setSelectedTopic(topic)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                            selectedTopic === topic
                              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                              : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">YOUR NAME *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Farhan's Client"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">YOUR EMAIL *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. client@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">PHONE / WHATSAPP NUMBER</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0326 4082349"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">YOUR MESSAGE *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Detail your application idea, MERN stack requirements, bug fix needs, or contract duration..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    id="submit-contact-form"
                    className={`w-full py-4 rounded-xl text-white font-bold text-sm bg-gradient-to-r ${currentTheme.gradientClass} shadow-lg shadow-cyan-500/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2 font-mono text-xs">
                        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Sending Message...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to Farhan</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
