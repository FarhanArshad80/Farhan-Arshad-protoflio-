import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const { currentTheme } = useTheme();
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    document.documentElement.classList.add('has-custom-cursor');
    const onMove = (e: MouseEvent) => {
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (!visibleRef.current) { visibleRef.current = true; setVisible(true); }
      const target = e.target as Element;
      setIsHovering(!!target.closest('a, button, [role="button"], input, textarea, select, label, [tabindex]'));
    };
    const onLeave = () => { visibleRef.current = false; setVisible(false); };
    const onEnter = () => { visibleRef.current = true; setVisible(true); };
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) return null;

  return (
    /* Flat arrow pointer. The path tip is the SVG origin, so the wrapper's
       translate puts it on the exact pointer position — a (0,0) hotspot, like
       a native cursor. */
    <div
      ref={dotRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s ease',
        willChange: 'transform',
      }}
    >
      <svg
        width={isHovering ? 34 : 28}
        height={isHovering ? 34 : 28}
        viewBox="0 0 22 22"
        style={{
          display: 'block',
          overflow: 'visible',
          transition: 'width 0.18s ease, height 0.18s ease',
          filter: 'drop-shadow(0 1px 2px rgba(15,23,42,0.35))',
        }}
      >
        <path
          d="M0 0 L19.6 7.8 L9.6 9.6 L7.8 19.6 Z"
          fill={currentTheme.accentHex}
          stroke="rgba(15,23,42,0.45)"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
