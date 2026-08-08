import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { EnquiryForm } from './EnquiryForm';

export const HireMeModal: React.FC = () => {
  const { currentTheme, hireMeModalOpen, setHireMeModalOpen, selectedService } = useTheme();

  if (!hireMeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-2xl my-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 bg-slate-950/80 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl bg-gradient-to-r ${currentTheme.gradientClass} text-white shadow-md`}
              >
                <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Hire Farhan Arshad</h3>
                <p className="text-xs font-mono text-cyan-400">
                  Fill in your project details and I'll be in touch
                </p>
              </div>
            </div>
            <button
              onClick={() => setHireMeModalOpen(false)}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shared Enquiry Form */}
          <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
            <EnquiryForm
              initialService={selectedService}
              compact
              onSuccess={() => {
                // Keep modal open to show success state
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
