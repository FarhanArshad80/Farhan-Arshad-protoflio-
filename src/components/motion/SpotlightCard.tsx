import React, { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

type SpotlightCardProps = HTMLMotionProps<'div'> & {
  /** 0-1 strength of the glow that follows the pointer. */
  intensity?: number;
  /**
   * Classes for the inner content wrapper. The wrapper exists so the glow can
   * paint behind the content, so any layout classes the children rely on
   * (`flex flex-col`, `h-full`, …) belong here rather than on the card.
   */
  contentClassName?: string;
};

/**
 * Card shell with a soft accent glow that tracks the pointer. The glow is
 * driven by motion values rather than React state, so moving the mouse never
 * re-renders the card.
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  contentClassName = '',
  intensity = 0.14,
  ...motionProps
}) => {
  const { currentTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const alpha = Math.round(Math.min(Math.max(intensity, 0), 1) * 255)
    .toString(16)
    .padStart(2, '0');
  const background = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, ${currentTheme.accentHex}${alpha}, transparent 72%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-500);
    mouseY.set(-500);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={reduceMotion ? undefined : handleMouseMove}
      onMouseLeave={reduceMotion ? undefined : handleMouseLeave}
      className={`group relative ${className}`}
      {...motionProps}
    >
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      <div className={`relative ${contentClassName}`}>{children}</div>
    </motion.div>
  );
};
