import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { EnquiryForm } from './EnquiryForm';

export const HireMeModal: React.FC = () => {
  const { currentTheme, hireMeModalOpen, setHireMeModalOpen, selectedService } = useTheme();
  if (!hireMeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d0d0d]/70 backdrop-blur-md overflow-y-auto">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-2xl my-8 rounded-3xl bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 bg-[#161616] border-b border-[#f5f0e6]/[0.07]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#b7f34a] text-[#0d0d0d] shadow-md">
                <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#f5f0e6] tracking-tight">Hire Farhan Arshad</h3>
                <p className="text-xs font-mono text-[#b7f34a]">Fill in your project details and I'll be in touch</p>
              </div>
            </div>
            <button onClick={() => setHireMeModalOpen(false)}
              className="p-2 rounded-xl bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] hover:border-[#f5f0e6]/20 text-[#8a8680] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
            <EnquiryForm initialService={selectedService} compact onSuccess={() => {}} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
