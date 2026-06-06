'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingOverlay() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading or component mounting
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          id="oria-loading-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-[#FBFBFA] flex flex-col items-center justify-center pointer-events-auto"
        >
          <div className="relative flex flex-col items-center space-y-6">
            {/* Pulsing architectural ring background */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.1, 1], opacity: [0, 0.4, 0.15] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-44 h-44 rounded-full border border-brand-green/20"
            />

            {/* Glowing Brand typography */}
            <motion.h1
              id="loader-brand-title"
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              animate={{ opacity: [0, 1, 1], letterSpacing: ['0.2em', '0.4em', '0.4em'] }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="font-serif text-3xl font-medium tracking-widest text-[#1E2D24] relative z-10"
            >
              ORIA
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-[10px] uppercase font-mono tracking-widest text-brand-green/40 relative z-10"
            >
              Aligning Cellular Balance
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
