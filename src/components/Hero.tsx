import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  animate,
  useInView,
} from 'motion/react';
import {
  ArrowRight, Github, Linkedin, Twitter, Sparkles,
  Mail, Briefcase, Zap, Calendar, FolderGit2,
  ThumbsUp, Users,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

import profileImage from '../../assets/profile.jpg';

const ROTATING_ROLES = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'NestJS API Specialist',
  'MongoDB & Database Architect',
  'React UI Craftsperson',
];

const STATS = [
  { icon: Calendar, end: 3, suffix: ' Yrs', label: 'Experience' },
  { icon: FolderGit2, end: 30, suffix: '+', label: 'Projects' },
  { icon: ThumbsUp, end: 100, suffix: '%', label: 'Satisfaction' },
  { icon: Users, end: 24, suffix: 'k+', label: 'Network' },
];

function useCountUp(end: number, duration = 1.2, startDelay = 0) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, end, {
      duration,
      delay: startDelay,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return ctrl.stop;
  }, [inView, end, duration, startDelay]);

  return { ref, val };
}

// Removed useTypewriterLoop as per your request

const SNK_W = 60;
const SNK_H = 320;
const CARD_W = 118;
const GAP = 10;

const SNAKE_NODES = [
  { x: 48, y: 40, side: 'right' },
  { x: 12, y: 120, side: 'left' },
  { x: 48, y: 200, side: 'right' },
  { x: 12, y: 280, side: 'left' },
];

const SNAKE_PATH =
  `M ${SNAKE_NODES[0].x} ${SNAKE_NODES[0].y} ` +
  `C 48 70, 12 90, ${SNAKE_NODES[1].x} ${SNAKE_NODES[1].y} ` +
  `C 12 150, 48 170, ${SNAKE_NODES[2].x} ${SNAKE_NODES[2].y} ` +
  `C 48 230, 12 250, ${SNAKE_NODES[3].x} ${SNAKE_NODES[3].y}`;

const SnakePanel: React.FC<{ gradientClass: string }> = ({ gradientClass }) => (
  <div
    className="relative select-none flex-shrink-0"
    style={{ width: SNK_W, height: SNK_H, overflow: 'visible' }}
  >
    <svg
      viewBox={`0 0 ${SNK_W} ${SNK_H}`}
      width={SNK_W}
      height={SNK_H}
      className="absolute inset-0 pointer-events-none"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="snkG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <filter id="snkGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d={SNAKE_PATH}
        stroke="url(#snkG)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 8"
        fill="none"
        filter="url(#snkGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.4, ease: 'easeInOut' }}
      />

      {SNAKE_NODES.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="5"
          fill="#0f172a"
          stroke="url(#snkG)"
          strokeWidth="2.5"
          filter="url(#snkGlow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.7 + i * 0.2 }}
        />
      ))}
    </svg>

    {STATS.map((stat, i) => {
      const n = SNAKE_NODES[i];
      const Icon = stat.icon;
      const { ref, val } = useCountUp(stat.end, 1.1, 0.7 + i * 0.2);
      const isRight = n.side === 'right';
      const cardLeft = isRight ? n.x + GAP : n.x - GAP - CARD_W;

      return (
        <motion.div
          key={i}
          className="absolute flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 shadow-lg shadow-black/40"
          style={{
            top: n.y,
            left: cardLeft,
            transform: 'translateY(-50%)',
            minWidth: CARD_W,
          }}
          initial={{ opacity: 0, x: isRight ? 16 : -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 1.0 + i * 0.18, ease: 'easeOut' }}
        >
          <span className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${gradientClass} shrink-0`}>
            <Icon className="w-3.5 h-3.5 text-white" />
          </span>
          <div className="leading-none">
            <p className={`text-sm font-black font-mono bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
              <span ref={ref}>{val}</span>{stat.suffix}
            </p>
            <p className="text-[9px] text-slate-400 font-medium mt-0.5 whitespace-nowrap">{stat.label}</p>
          </div>
        </motion.div>
      );
    })}
  </div>
);

export const Hero: React.FC = () => {
  const { currentTheme, setHireMeModalOpen } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);

  const heroRightRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRightRef,
    offset: ['start start', 'end start'],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((p) => (p + 1) % ROTATING_ROLES.length),
      3000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      {/* subtle bg glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6 space-y-6"
        >
          {/* location pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{PORTFOLIO_DATA.profile.location}</span>
          </div>

          {/* Static heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight min-h-[1.2em]">
            <span className="block text-white">Hi, I'm</span>
            <span className={`block bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent`}>
              Farhan Arshad
            </span>
          </h1>

          {/* rotating role */}
          <div className="h-9 flex items-center overflow-hidden">
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2 text-lg sm:text-xl font-mono font-bold text-cyan-400"
            >
              <Zap className="w-5 h-5 text-amber-400 shrink-0" />
              {ROTATING_ROLES[roleIndex]}
            </motion.div>
          </div>

          {/* bio */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
            {PORTFOLIO_DATA.profile.tagline}
          </p>

          {/* CTAs + social row grouped together with tighter, independent spacing */}
          <div className="space-y-3">
            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => setHireMeModalOpen(true)}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold
                            text-sm text-white bg-gradient-to-r ${currentTheme.gradientClass}
                            shadow-lg hover:shadow-cyan-500/30 transition-shadow`}
              >
                <Briefcase className="w-4 h-4 text-amber-300" />
                Hire Me (Select Service)
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold
                           text-sm text-slate-200 bg-slate-900 hover:bg-slate-800
                           border border-slate-800 transition-colors"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </motion.a>
            </div>

            {/* social row with email icon */}
            <div className="flex items-center gap-4">
              <a
                href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80
                           border border-slate-800 text-xs font-mono text-cyan-400 hover:text-cyan-300"
              >
                <Mail className="w-3.5 h-3.5" />
                {PORTFOLIO_DATA.profile.email}
              </a>

              <div className="h-4 w-px bg-slate-800" />
              <div className="flex items-center gap-1.5">
                {[
                  { href: PORTFOLIO_DATA.profile.github, Icon: Github, title: 'GitHub' },
                  { href: PORTFOLIO_DATA.profile.linkedin, Icon: Linkedin, title: 'LinkedIn' },
                  { href: PORTFOLIO_DATA.profile.twitter, Icon: Twitter, title: 'Twitter' },
                ].map(({ href, Icon, title }) => (
                  <a
                    key={title} href={href} target="_blank" rel="noreferrer" title={title}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800
                               text-slate-400 hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* MIDDLE COLUMN: snake */}
        <motion.div
          ref={heroRightRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-3 flex items-center justify-center"
          style={{ overflow: 'visible' }}
        >
          <motion.div style={{ y: panelY, opacity: panelOpacity, overflow: 'visible' }}>
            <SnakePanel gradientClass={currentTheme.gradientClass} />
          </motion.div>
        </motion.div>

        {/* PROFILE IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-3 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
            className="relative flex-shrink-0"
          >
            {/* shadow pulse */}
            <motion.div
              className={`absolute -inset-1 rounded-[1.6rem] bg-gradient-to-br ${currentTheme.gradientClass} blur-md`}
              animate={{ opacity: [0.4, 0.75, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* profile photo */}
            <div className="relative w-44 h-60 sm:w-52 sm:h-72 rounded-[1.5rem] overflow-hidden border border-slate-700 shadow-2xl bg-slate-900">
              <img
                src={profileImage}
                alt={PORTFOLIO_DATA.profile.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* available badge */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 border border-slate-700 shadow-lg whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono text-slate-300">Available for Hire</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};