import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const posRef = useRef({ x: -200, y: -200 });
  const ringPosRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    document.documentElement.style.cursor = 'none';
    let rafId: number;
    const animate = () => {
      const rx = ringPosRef.current.x, ry = ringPosRef.current.y;
      const tx = posRef.current.x, ty = posRef.current.y;
      ringPosRef.current.x = rx + (tx - rx) * 0.11;
      ringPosRef.current.y = ry + (ty - ry) * 0.11;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-22%, -6%)`;
      if (!visibleRef.current) { visibleRef.current = true; setVisible(true); }
      const target = e.target as Element;
      setIsHovering(!!target.closest('a, button, [role="button"], input, textarea, select, label, [tabindex]'));
    };
    const onLeave = () => { visibleRef.current = false; setVisible(false); };
    const onEnter = () => { visibleRef.current = true; setVisible(true); };
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    rafId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafId);
      document.documentElement.style.cursor = '';
    };
  }, []);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) return null;

  return (
    <>
      {/* Crystal pointer. Sits at the exact pointer position. */}
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
          width={isHovering ? 30 : 24}
          height={isHovering ? 40 : 32}
          viewBox="0 0 24 32"
          style={{ display: 'block', transition: 'width 0.18s ease, height 0.18s ease', filter: 'drop-shadow(0 2px 4px rgba(15,23,42,0.35))' }}
        >
          <path d="M12 0 L24 12 L12 32 L0 12 Z" fill="#0B1B3A" />
          <path d="M12 1.6 L22.3 12.2 L12 29.4 L1.7 12.2 Z" fill="#12275A" />
          <path d="M12 5.6 L18.4 12.6 L12 25.4 L5.6 12.6 Z" fill="#2FB7F0" />
          <path d="M12 5.6 L18.4 12.6 L12 14.6 L5.6 12.6 Z" fill="#8BE3FF" />
          <path d="M12 5.6 L12 14.6 L5.6 12.6 Z" fill="#5CCDF7" />
        </svg>
      </div>

      {/* Soft follower that trails the pointer for a bit of weight. */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full"
        style={{
          width: isHovering ? 46 : 34,
          height: isHovering ? 46 : 34,
          border: `1.5px solid ${isHovering ? 'rgba(47,183,240,0.85)' : 'rgba(18,39,90,0.35)'}`,
          backgroundColor: isHovering ? 'rgba(47,183,240,0.10)' : 'transparent',
          opacity: visible ? 1 : 0,
          transition: 'width 0.22s ease, height 0.22s ease, border-color 0.2s ease, background-color 0.2s ease, opacity 0.2s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
};
