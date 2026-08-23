import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, animate, useInView } from 'motion/react';
import { ArrowRight, Github, Linkedin, Twitter, Download, Mail, Calendar, FolderGit2, ThumbsUp, Users } from 'lucide-react';
import { generateCV } from '../utils/generateCV';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import profileImage from '../../assets/profile.jpg';

const ROTATING_ROLES = [
  'Full-Stack MERN Engineer',
  'Scalable Web App Architect',
  'NestJS Microservices Specialist',
  'Conversion-Focused UI Developer',
];

const STATS = [
  { icon: Calendar, end: 1, suffix: '+', label: 'Year', detail: 'Experience' },
  { icon: FolderGit2, end: 10, suffix: '+', label: 'Projects', detail: '' },
  { icon: ThumbsUp, end: 95, suffix: '%', label: 'Client', detail: 'Satisfaction' },
  { icon: Users, end: 1, suffix: 'K+', label: 'Network', detail: '' },
];

function useCountUp(end: number, duration = 1.2, startDelay = 0) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, end, { duration, delay: startDelay, ease: 'easeOut', onUpdate: (v) => setVal(Math.round(v)) });
    return ctrl.stop;
  }, [inView, end, duration, startDelay]);
  return { ref, val };
}

const SNK_W = 64, SNK_H = 340, CARD_W = 112, GAP = 10;
const SNAKE_NODES = [
  { x: 50, y: 38, side: 'right' }, { x: 14, y: 132, side: 'left' },
  { x: 50, y: 226, side: 'right' }, { x: 14, y: 320, side: 'left' },
];
const SNAKE_PATH =
  `M ${SNAKE_NODES[0].x} ${SNAKE_NODES[0].y} C 64 70, 62 96, ${SNAKE_NODES[1].x} ${SNAKE_NODES[1].y} ` +
  `C 0 164, 28 190, ${SNAKE_NODES[2].x} ${SNAKE_NODES[2].y} C 66 258, 20 286, ${SNAKE_NODES[3].x} ${SNAKE_NODES[3].y}`;

const NODE_GLOW_TIMES = [250, 1100, 2150, 3150];

const SnakePanel: React.FC<{ accentHex: string }> = ({ accentHex }) => {
  const [activeNode, setActiveNode] = useState(-1);

  useEffect(() => {
    const timers: number[] = [];
    NODE_GLOW_TIMES.forEach((delay, index) => {
      timers.push(window.setTimeout(() => setActiveNode(index), delay));
      timers.push(window.setTimeout(() => setActiveNode(-1), delay + 500));
    });
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <div className="relative select-none flex-shrink-0" style={{ width: SNK_W, height: SNK_H, overflow: 'visible' }}>
      <svg viewBox={`0 0 ${SNK_W} ${SNK_H}`} width={SNK_W} height={SNK_H} className="absolute inset-0 pointer-events-none" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="snkG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accentHex} />
            <stop offset="50%" stopColor={accentHex} />
            <stop offset="100%" stopColor={accentHex} />
          </linearGradient>
          <filter id="snkNodeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path d={SNAKE_PATH} stroke="url(#snkG)" strokeWidth="2.2" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 1.8, delay: 0.4, ease: 'easeInOut' }, opacity: { duration: 0.3, delay: 0.4 } }}
        />
        {SNAKE_NODES.map((n, i) => (
          <motion.circle key={i} cx={n.x} cy={n.y} r="3.5" fill={accentHex} stroke="#FFFFFF" strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: activeNode === i ? [1, 1.7, 1] : 1, opacity: 1 }}
            transition={{ scale: { duration: 0.5, ease: 'easeOut' }, opacity: { duration: 0.3, delay: 0.7 + i * 0.2 } }}
            filter={activeNode === i ? 'url(#snkNodeGlow)' : undefined}
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
          <motion.div key={i} className="hero-stat-card absolute flex min-h-[54px] items-center gap-1.5 px-2.5 py-2 rounded-xl bg-[#161616] border border-[#f5f0e6]/[0.08]"
            style={{ top: n.y, left: cardLeft, transform: 'translateY(-50%)', minWidth: CARD_W }}
            initial={{ opacity: 0, x: isRight ? 16 : -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 1.0 + i * 0.18, ease: 'easeOut' }}
          >
            <span className={`flex items-center justify-center w-7 h-7 rounded-lg bg-[#b7f34a] shrink-0`}>
              <Icon className="w-3.5 h-3.5 text-[#0d0d0d]" />
            </span>
            <div className="leading-none">
              <p className="text-[11px] font-black font-mono text-[#b7f34a]">
                <span ref={ref}>{val}</span>{stat.suffix}
              </p>
              <p className="text-[8px] text-[#8a8680] font-medium mt-0.5 leading-tight whitespace-nowrap">{stat.label}</p>
              {stat.detail && <p className="text-[8px] text-[#8a8680] font-medium leading-tight whitespace-nowrap">{stat.detail}</p>}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export const Hero: React.FC = () => {
  const { currentTheme } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRightRef, offset: ['start start', 'end start'] });
  const panelY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((p) => (p + 1) % ROTATING_ROLES.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161616] border border-[#f5f0e6]/[0.07] text-xs font-mono text-[#8a8680]">
            <span>{PORTFOLIO_DATA.profile.location}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight min-h-[1.2em]">
            <span className="block text-[#f5f0e6]">Hi, I'm</span>
            <span className={`block bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent`}>Farhan Arshad</span>
          </h1>

          <div className="h-9 flex items-center overflow-hidden">
            <motion.div key={roleIndex} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}
              className="flex items-center gap-2 text-lg sm:text-xl font-mono font-bold text-[#b7f34a]"
            >
              {ROTATING_ROLES[roleIndex]}
            </motion.div>
          </div>

          <p className="text-[#a8a39a] text-base sm:text-lg leading-relaxed max-w-xl">{PORTFOLIO_DATA.profile.tagline}</p>

          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <a href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161616] border border-[#f5f0e6]/[0.07] text-xs font-mono text-[#b7f34a] hover:brightness-110 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                {PORTFOLIO_DATA.profile.email}
              </a>
              <div className="h-4 w-px bg-[#f5f0e6]/10" />
              <div className="flex items-center gap-1.5">
                {[
                  { href: PORTFOLIO_DATA.profile.github, Icon: Github, title: 'GitHub' },
                  { href: PORTFOLIO_DATA.profile.linkedin, Icon: Linkedin, title: 'LinkedIn' },
                  { href: PORTFOLIO_DATA.profile.twitter, Icon: Twitter, title: 'Twitter' },
                ].map(({ href, Icon, title }) => (
                  <a key={title} href={href} target="_blank" rel="noreferrer" title={title}
                    className="p-2 rounded-lg bg-[#161616] border border-[#f5f0e6]/[0.07] text-[#8a8680] hover:text-[#f5f0e6] transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={generateCV}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#0d0d0d] bg-[#b7f34a] shadow-lg shadow-[#b7f34a]/25 hover:brightness-110 transition-all"
              >
                <Download className="w-4 h-4" />
                Download CV
              </motion.button>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-[#c8c3b8] bg-[#161616] border border-[#f5f0e6]/[0.07] hover:border-[#f5f0e6]/20 transition-colors"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4 text-[#b7f34a]" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div ref={heroRightRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-3 flex items-center justify-center" style={{ overflow: 'visible' }}
        >
          <motion.div style={{ y: panelY, opacity: panelOpacity, overflow: 'visible' }}>
            <SnakePanel accentHex={currentTheme.accentHex} />
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-3 flex items-center justify-center"
        >
          <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }} className="relative flex-shrink-0">
            <div className="relative w-44 h-60 sm:w-52 sm:h-72 rounded-[1.5rem] overflow-hidden border border-[#f5f0e6]/10 bg-[#161616]">
              <img src={profileImage} alt={PORTFOLIO_DATA.profile.name} className="w-full h-full object-cover object-top" />
            </div>
            <motion.div
              animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#161616] border border-[#f5f0e6]/10 whitespace-nowrap"
            >
              <span className="text-[9px] font-mono text-[#8a8680]">Available for Hire</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
