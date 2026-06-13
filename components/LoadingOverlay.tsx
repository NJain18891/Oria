'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import OriaLogo from './OriaLogo';

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
          className="fixed inset-0 z-[100] bg-[#E2D7E5] flex flex-col items-center justify-center pointer-events-auto"
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

            {/* Glowing Brand layout */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative z-10 flex flex-col items-center"
            >
              <OriaLogo layout="vertical" className="text-[#1E2D24]" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
