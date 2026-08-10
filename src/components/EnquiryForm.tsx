import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { PORTFOLIO_DATA } from "../data/portfolio";
import { useTheme } from "../context/ThemeContext";
import { SERVICES_LIST } from "./ServicesSection";

interface EnquiryFormProps {
  initialService?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ initialService, onSuccess, compact = false }) => {
  const { currentTheme } = useTheme();
  const [service, setService] = useState(initialService || SERVICES_LIST[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [budget, setBudget] = useState("$500 - $1,500");
  const [timeline, setTimeline] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  React.useEffect(() => { if (initialService) setService(initialService); }, [initialService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !projectDesc) return;
    setLoading(true);
    setErrorMessage("");
    const templateParams = { name, email, service, contact_number: contactNumber || "N/A", project_desc: projectDesc, budget, timeline: timeline || "Flexible" };
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
    if (!serviceId || !templateId || !publicKey) {
      setLoading(false);
      setErrorMessage("Email service is not configured. Missing EmailJS environment variables.");
      return;
    }
    try {
      await emailjs.send(serviceId, templateId, templateParams, { publicKey });
      setLoading(false);
      setSubmitted(true);
      const existing = JSON.parse(localStorage.getItem("enquiries") || "[]");
      existing.push({ service, name, email, contactNumber, projectDesc, budget, timeline, date: new Date().toISOString() });
      localStorage.setItem("enquiries", JSON.stringify(existing));
      onSuccess?.();
    } catch (error) {
      setLoading(false);
      console.error("EmailJS Submission Error:", error);
      setErrorMessage("Failed to send email directly. Please check keys or try again.");
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] text-sm text-[#f5f0e6] placeholder:text-[#5a5650] focus:outline-none focus:border-[#b7f34a]/50 font-mono";
  const labelClass = "text-xs font-mono text-[#5a5650]";

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
        className={`${compact ? "py-8" : "p-8"} text-center space-y-5 rounded-3xl bg-[#161616] border border-[#f5f0e6]/[0.07] shadow-2xl`}
      >
        <div className="w-16 h-16 rounded-full bg-[#b7f34a]/10 border border-[#b7f34a]/30 text-[#b7f34a] flex items-center justify-center mx-auto shadow-xl">
          <CheckCircle2 className="w-8 h-8 animate-bounce" />
        </div>
        <h3 className="text-2xl font-bold text-[#f5f0e6]">Enquiry Sent!</h3>
        <p className="text-[#a8a39a] max-w-md mx-auto text-sm leading-relaxed">
          Thank you, <span className="font-semibold text-[#f5f0e6]">{name}</span>. Your enquiry has been delivered directly to{" "}
          <span className="text-[#b7f34a] font-mono">{PORTFOLIO_DATA.profile.email}</span>.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => { setSubmitted(false); setName(""); setEmail(""); setContactNumber(""); setProjectDesc(""); setTimeline(""); setBudget("$500 - $1,500"); setService(initialService || SERVICES_LIST[0]); }}
            className="px-5 py-2.5 rounded-xl bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] hover:border-[#f5f0e6]/20 text-xs font-mono text-[#8a8680] transition-colors"
          >
            New Enquiry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#161616] border border-[#f5f0e6]/[0.07] shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className={labelClass}>SERVICE *</label>
          <select value={service} onChange={(e) => setService(e.target.value)} className={inputClass} required>
            {SERVICES_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelClass}>YOUR NAME *</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>YOUR EMAIL *</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className={inputClass} />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className={labelClass}>PHONE / CONTACT NUMBER</label>
          <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="+1 234 567 890" className={inputClass} />
        </div>
        <div className="space-y-1.5">
          <label className={labelClass}>PROJECT DESCRIPTION / DETAILS *</label>
          <textarea required rows={compact ? 3 : 4} value={projectDesc} onChange={(e) => setProjectDesc(e.target.value)} placeholder="Describe your project..." className={`${inputClass} resize-none`} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelClass}>BUDGET</label>
            <select value={budget} onChange={(e) => setBudget(e.target.value)} className={inputClass}>
              <option value="Under $500">Starter (Under $500)</option>
              <option value="$500 - $1,500">Standard ($500 – $1,500)</option>
              <option value="$1,500 - $3,500">Growth ($1,500 – $3,500)</option>
              <option value="$3,500+">Enterprise ($3,500+)</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>TIMELINE</label>
            <input type="text" value={timeline} onChange={(e) => setTimeline(e.target.value)} placeholder="e.g. 2 weeks, 1 month" className={inputClass} />
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-4 rounded-xl text-[#0d0d0d] font-bold text-sm bg-[#b7f34a] shadow-lg shadow-[#b7f34a]/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2 font-mono text-xs">
              <span className="animate-spin w-4 h-4 border-2 border-[#0d0d0d] border-t-transparent rounded-full" />
              Sending Enquiry...
            </span>
          ) : (
            <><Send className="w-4 h-4" /><span>Send Enquiry to Farhan</span></>
          )}
        </button>
        {errorMessage && <p className="text-center text-xs text-red-400 font-mono mt-2">{errorMessage}</p>}
        <p className="text-center text-[11px] font-mono text-[#5a5650]">
          Enquiry will be delivered to{" "}
          <span className="text-[#b7f34a]">{PORTFOLIO_DATA.profile.email}</span>
        </p>
      </form>
    </div>
  );
};
