import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

interface SectionHeadingProps {
  /** Small mono label above the title. */
  eyebrow: string;
  /** Leading words, rendered in the base text colour. */
  title: string;
  /** Trailing words, rendered in the active theme gradient. */
  highlight: string;
  subtitle?: string;
  className?: string;
}

const VIEWPORT = { once: true, margin: '-60px' } as const;

/**
 * Shared section header. The title reveals word by word from behind a mask,
 * which reads as one deliberate motion rather than six separate animations.
 *
 * The reveal is driven by variants on the container rather than `whileInView`
 * on each word: a word sitting below its own `overflow-hidden` mask is clipped
 * out of the viewport, so a per-word intersection observer would never fire.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  className = 'mb-16',
}) => {
  const { currentTheme } = useTheme();
  const reduceMotion = useReducedMotion();

  const words = [
    ...title.split(' ').filter(Boolean).map((word) => ({ word, accent: false })),
    ...highlight.split(' ').filter(Boolean).map((word) => ({ word, accent: true })),
  ];

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.055 } },
  };

  const wordVariants: Variants = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { y: '110%', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };

  const ruleVariants: Variants = {
    hidden: { scaleX: reduceMotion ? 1 : 0 },
    visible: { scaleX: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className={`text-center max-w-3xl mx-auto space-y-4 ${className}`}>
      <motion.div
        className="flex items-center justify-center gap-3"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <motion.div variants={ruleVariants} className="h-px w-8 origin-right bg-[#f5f0e6]/15" />
        <span className="text-xs font-mono text-[#5a5650] tracking-widest uppercase">{eyebrow}</span>
        <motion.div variants={ruleVariants} className="h-px w-8 origin-left bg-[#f5f0e6]/15" />
      </motion.div>

      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f5f0e6] flex flex-wrap justify-center gap-x-[0.28em] gap-y-1"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {words.map(({ word, accent }, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-1">
            <motion.span
              variants={wordVariants}
              className={`inline-block ${
                accent ? `bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent` : ''
              }`}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="text-[#8a8680] text-base sm:text-lg"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
