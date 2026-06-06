'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Star, Sparkles } from 'lucide-react';

export default function BottomStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bar after scrolling past 450px (beyond hero)
      if (window.scrollY > 450) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="oria-floating-bottom-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-2xl"
        >
          {/* Aesthetic floating glass panel */}
          <div className="bg-[#FBFBFA]/90 backdrop-blur-lg rounded-full border border-brand-green/10 shadow-xl shadow-brand-green/10 px-4 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between gap-4">
            
            {/* Slogans and Stars */}
            <div className="flex items-center space-x-3 text-left">
              <span className="hidden sm:flex w-8 h-8 rounded-full bg-brand-green/5 text-brand-sprout items-center justify-center text-xs flex-shrink-0">
                <Sparkles size={12} className="animate-pulse" />
              </span>
              <div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={9} fill="#10B981" stroke="#10B981" />
                  ))}
                  <span className="text-[10px] text-brand-green/60 font-semibold tracking-wide ml-1.5 uppercase hidden md:inline">
                    4.9/5 stars rating
                  </span>
                </div>
                <p className="text-xs font-serif text-brand-green font-medium leading-tight mt-0.5 whitespace-nowrap">
                  Fresh batch baking now.
                </p>
              </div>
            </div>

            {/* Middle decorative text */}
            <div className="hidden lg:block h-5 w-px bg-brand-green/10" />
            <div className="hidden lg:block text-left">
              <p className="text-[10px] text-brand-green/50 uppercase tracking-widest font-mono">Formula 01</p>
              <p className="text-[10px] text-[#4A3B4E] font-semibold uppercase tracking-wider">100% Ancient Grains</p>
            </div>

            {/* CTA action */}
            <a
              id="sticky-bar-cta"
              href="#shop"
              className="inline-flex items-center justify-center space-x-2.5 px-6 py-2.5 rounded-full bg-[#10B981] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#059669] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md shadow-brand-sprout/10 whitespace-nowrap"
            >
              <ShoppingBag size={11} />
              <span>Shop Oria</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
