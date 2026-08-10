import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import profileImage from '../../assets/profile.jpg';

interface Props {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const DURATION = 2300;
    const start = performance.now();

    const tick = (now: number) => {
      const pct = Math.min(((now - start) / DURATION) * 100, 100);
      if (barRef.current) {
        barRef.current.style.width = `${pct}%`;
      }
      if (pct < 100) {
        requestAnimationFrame(tick);
      }
    };

    const rafId = requestAnimationFrame(tick);

    const exitTimer = setTimeout(() => {
      onComplete();
    }, DURATION + 450);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080808] select-none"
    >
      {/* Profile image + spinning ring */}
      <div className="relative mb-8" style={{ width: 152, height: 152 }}>
        {/* Spinning conic-gradient ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, #7C3AED 0%, #A78BFA 45%, transparent 55%, transparent 100%)',
          }}
        />
        {/* Static dim ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: 'conic-gradient(from 0deg, rgba(255,255,255,0.04) 100%)' }}
        />
        {/* Profile photo */}
        <motion.div
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="absolute inset-[5px] rounded-full overflow-hidden border border-white/10 shadow-2xl shadow-violet-900/50"
        >
          <img
            src={profileImage}
            alt="Farhan Arshad"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
      </div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-2xl font-extrabold text-white tracking-tight mb-1.5"
      >
        Farhan Arshad
      </motion.h1>

      {/* Role */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.45 }}
        className="text-[11px] font-mono text-violet-400 tracking-[0.22em] uppercase mb-10"
      >
        Full Stack Developer
      </motion.p>

      {/* Progress bar track */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="relative w-44 h-px bg-white/10 rounded-full overflow-hidden"
      >
        <div
          ref={barRef}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: '0%',
            background: 'linear-gradient(90deg, #7C3AED, #A78BFA)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};
