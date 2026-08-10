import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);
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
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      if (!visible) setVisible(true);
      const target = e.target as Element;
      setIsHovering(!!target.closest('a, button, [role="button"], input, textarea, select, label, [tabindex]'));
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
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
  }, [visible]);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) return null;

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{ width: isHovering ? 10 : 6, height: isHovering ? 10 : 6, backgroundColor: '#b7f34a', opacity: visible ? 1 : 0, transition: 'width 0.18s ease, height 0.18s ease, opacity 0.2s ease', willChange: 'transform' }}
      />
      <div ref={ringRef} className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full"
        style={{ width: isHovering ? 44 : 32, height: isHovering ? 44 : 32, border: `1.5px solid ${isHovering ? 'rgba(183,243,74,0.85)' : 'rgba(183,243,74,0.4)'}`, backgroundColor: isHovering ? 'rgba(183,243,74,0.07)' : 'transparent', opacity: visible ? 1 : 0, transition: 'width 0.22s ease, height 0.22s ease, border-color 0.2s ease, background-color 0.2s ease, opacity 0.2s ease', willChange: 'transform' }}
      />
    </>
  );
};
