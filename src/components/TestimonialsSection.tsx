import React from 'react';
import { motion } from 'motion/react';
import { MessageSquareQuote, Star, Quote } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

export const TestimonialsSection: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <section id="testimonials" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-amber-400">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>ENDORSEMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            What Engineering Leaders <span className={`bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent`}>Say About Ahmed</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Direct feedback from engineering leaders, product directors, and founders I have collaborated with.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.testimonials.map((test) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl hover:border-amber-500/40 transition-all flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-slate-800 absolute top-6 right-6 group-hover:text-amber-500/20 transition-colors" />

              <div className="space-y-4 relative z-10">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{test.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-800/80">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">{test.name}</h4>
                  <p className="text-xs font-mono text-slate-400">
                    {test.role} @ <span className="text-cyan-400">{test.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
