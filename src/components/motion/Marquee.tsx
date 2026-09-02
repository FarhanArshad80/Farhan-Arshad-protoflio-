import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface MarqueeProps {
  items: string[];
  /** Seconds for one full pass. Longer = slower. */
  duration?: number;
  /** 'left' sends items off the left edge; 'right' reverses it. */
  direction?: 'left' | 'right';
}

/**
 * Seamless scrolling band. The item list is rendered twice and the track slides
 * exactly one copy's width, so the moment the first copy leaves on one side the
 * second is already in place — the words appear to loop back around from the
 * other edge with no gap or jump.
 */
export const Marquee: React.FC<MarqueeProps> = ({ items, duration = 34, direction = 'left' }) => {
  const { currentTheme } = useTheme();

  const copy = (key: string) => (
    <ul key={key} className="marquee-track-copy flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={`${key}-${i}`} className="flex shrink-0 items-center">
          <span className="px-6 text-sm font-semibold tracking-tight text-[#c8c3b8] whitespace-nowrap">
            {item}
          </span>
          <span
            aria-hidden
            className="h-1.5 w-1.5 shrink-0 rotate-45"
            style={{ backgroundColor: currentTheme.accentHex }}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee group relative flex overflow-hidden py-4" aria-label={items.join(', ')}>
      <div
        className="marquee-track flex w-max"
        style={{ animationDuration: `${duration}s`, animationDirection: direction === 'left' ? 'normal' : 'reverse' }}
      >
        {copy('a')}
        {/* Duplicate is decorative — screen readers already have the list above. */}
        <div aria-hidden className="flex">{copy('b')}</div>
      </div>
    </div>
  );
};
