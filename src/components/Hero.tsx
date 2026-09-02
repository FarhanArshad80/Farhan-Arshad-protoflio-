import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, animate, useInView, useReducedMotion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Twitter, Download, Mail, Calendar, FolderGit2, ThumbsUp, Users } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import profileImage from '../../assets/profile-cutout.png';

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

function useCountUp(end: number, duration = 1.2, startDelay = 0, enabled = true) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || !enabled) return;
    if (reduceMotion) {
      setVal(end);
      return;
    }
    const ctrl = animate(0, end, {
      duration,
      delay: startDelay,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return ctrl.stop;
  }, [inView, enabled, reduceMotion, end, duration, startDelay]);

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

// The path draws over PATH_DELAY..PATH_DELAY+PATH_DURATION; every other beat is
// pinned to that sweep so the line, the nodes and the cards read as one motion.
const PATH_DELAY = 0.3;
const PATH_DURATION = 1.45;
const nodeReachedAt = (i: number) => PATH_DELAY + (i / (SNAKE_NODES.length - 1)) * PATH_DURATION;
const NODE_GLOW_TIMES = SNAKE_NODES.map((_, i) => Math.round(nodeReachedAt(i) * 1000));

type StatNode = (typeof SNAKE_NODES)[number];

const StatCard: React.FC<{ stat: (typeof STATS)[number]; node: StatNode; index: number; ready: boolean }> = ({
  stat,
  node,
  index,
  ready,
}) => {
  const arriveAt = nodeReachedAt(index) + 0.1;
  const { ref, val } = useCountUp(stat.end, 1.2, arriveAt + 0.1, ready);
  const Icon = stat.icon;
  const isRight = node.side === 'right';
  const cardLeft = isRight ? node.x + GAP : node.x - GAP - CARD_W;
  const hidden = { opacity: 0, x: isRight ? 16 : -16, y: '-50%' };

  return (
    <motion.div
      className="hero-stat-card absolute flex min-h-[54px] items-center gap-1.5 px-2.5 py-2 rounded-xl bg-[#161616] border border-[#f5f0e6]/[0.08]"
      style={{ top: node.y, left: cardLeft, minWidth: CARD_W }}
      initial={hidden}
      animate={ready ? { opacity: 1, x: 0, y: '-50%' } : hidden}
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.45, delay: arriveAt, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#b7f34a] shrink-0">
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
};

const SnakePanel: React.FC<{ accentHex: string; ready: boolean }> = ({ accentHex, ready }) => {
  const [activeNode, setActiveNode] = useState(-1);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!ready || reduceMotion) return;
    const timers: number[] = [];
    NODE_GLOW_TIMES.forEach((delay, index) => {
      timers.push(window.setTimeout(() => setActiveNode(index), delay));
      timers.push(window.setTimeout(() => setActiveNode(-1), delay + 500));
    });
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [ready, reduceMotion]);

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
          animate={ready ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  pathLength: { duration: PATH_DURATION, delay: PATH_DELAY, ease: 'easeInOut' },
                  opacity: { duration: 0.3, delay: PATH_DELAY },
                }
          }
        />
        {SNAKE_NODES.map((n, i) => (
          <motion.circle key={i} cx={n.x} cy={n.y} r="3.5" fill={accentHex} stroke="#FFFFFF" strokeWidth="1"
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              ready
                ? { scale: activeNode === i ? [1, 1.7, 1] : 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              scale: { duration: 0.5, ease: 'easeOut' },
              opacity: { duration: 0.25, delay: nodeReachedAt(i) },
            }}
            filter={activeNode === i ? 'url(#snkNodeGlow)' : undefined}
          />
        ))}
      </svg>
      {STATS.map((stat, i) => (
        <StatCard key={stat.label + i} stat={stat} node={SNAKE_NODES[i]} index={i} ready={ready} />
      ))}
    </div>
  );
};

interface HeroProps {
  /**
   * False while the loading screen still covers the page. Without this the
   * whole entrance — the drawn path, the node pulses and the counting stats —
   * plays out behind the loader and is already finished by the time it lifts.
   */
  ready?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ ready = true }) => {
  const { currentTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [cvLoading, setCvLoading] = useState(false);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRightRef, offset: ['start start', 'end start'] });
  const panelY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((p) => (p + 1) % ROTATING_ROLES.length), 3000);
    return () => clearInterval(id);
  }, []);

  const handleDownloadCV = async () => {
    setCvLoading(true);
    try {
      const { generateCV } = await import('../utils/generateCV');
      generateCV();
    } catch (error) {
      console.error('CV generation failed:', error);
    } finally {
      setCvLoading(false);
    }
  };

  return (
    <section id="hero" className="relative min-h-svh pt-28 pb-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }} transition={{ duration: 0.7 }} className="hero-copy lg:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161616] border border-[#f5f0e6]/[0.07] text-xs font-mono text-[#8a8680]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#b7f34a]" />
            <span>{PORTFOLIO_DATA.profile.location}</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight min-h-[1.2em]">
            <span className="block text-[#f5f0e6]">Hi, I'm</span>
            <motion.span
              className={`block bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent hero-name-sheen`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Farhan Arshad
            </motion.span>
          </h1>

          <div className="h-9 flex items-center overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={roleIndex}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -22 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 text-lg sm:text-xl font-mono font-bold text-[#b7f34a]"
              >
                <span className="text-[#5a5650]">&lt;/&gt;</span>
                {ROTATING_ROLES[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-[#a8a39a] text-base sm:text-lg leading-relaxed max-w-xl">{PORTFOLIO_DATA.profile.tagline}</p>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <a href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                className="flex min-w-0 items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161616] border border-[#f5f0e6]/[0.07] text-[11px] sm:text-xs font-mono text-[#b7f34a] hover:brightness-110 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">{PORTFOLIO_DATA.profile.email}</span>
              </a>
              <div className="hidden sm:block h-4 w-px bg-[#f5f0e6]/10" />
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
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={handleDownloadCV} disabled={cvLoading}
                className="btn-shine group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#0d0d0d] bg-[#b7f34a] shadow-lg shadow-[#b7f34a]/25 hover:brightness-110 transition-all disabled:opacity-70"
              >
                <Download className={`w-4 h-4 ${cvLoading ? 'animate-bounce' : 'transition-transform group-hover:translate-y-0.5'}`} />
                {cvLoading ? 'Preparing CV…' : 'Download CV'}
              </motion.button>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} href="#projects"
                className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-[#c8c3b8] bg-[#161616] border border-[#f5f0e6]/[0.07] hover:border-[#f5f0e6]/20 transition-colors"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4 text-[#b7f34a] transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div ref={heroRightRef} initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-3 flex items-center justify-center" style={{ overflow: 'visible' }}
        >
          <motion.div style={{ y: panelY, opacity: panelOpacity, overflow: 'visible' }}>
            <SnakePanel accentHex={currentTheme.accentHex} ready={ready} />
          </motion.div>
        </motion.div>

        {/* Portrait anchors the right edge of the hero. */}
        <div className="lg:col-span-4 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.25 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.25 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderColor: currentTheme.accentHex }}
            className="hero-portrait relative flex-shrink-0 w-72 h-72 sm:w-80 sm:h-80 lg:w-[22rem] lg:h-[22rem] xl:w-[27rem] xl:h-[27rem] 2xl:w-[31.25rem] 2xl:h-[31.25rem] rounded-full overflow-hidden bg-white border-4"
          >
            <img
              src={profileImage}
              alt={PORTFOLIO_DATA.profile.name}
              className="w-full h-full object-cover object-top select-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
