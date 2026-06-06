'use client';

import React from 'react';
import { XCircle, CheckCircle, Clock, Zap, Activity, Sun } from 'lucide-react';
import { motion } from 'motion/react';

export default function NarrativeHook() {
  const scrollTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
  } as const;

  return (
    <section
      id="story"
      className="relative py-24 sm:py-32 bg-[#FBFBFA] border-t border-brand-green/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative">
        {/* Editorial Brand Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={scrollTransition}
            className="text-[11px] font-bold uppercase tracking-widest text-brand-purple mb-3 flex items-center justify-center gap-1.5"
          >
            <Sun size={12} className="text-brand-sprout" /> The Morning Narrative
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ ...scrollTransition, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-serif text-brand-green leading-tight"
          >
            Modern mornings shouldn’t demand a compromise on cellular wellness.
          </motion.h2>
        </div>

        {/* Narrative Split-screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          {/* Side A: The Rushed Reality (Stark, raw, muted) */}
          <motion.div
            id="side-rushed-reality"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={scrollTransition}
            className="p-8 sm:p-12 rounded-[32px] bg-stone-100/70 border border-stone-200/40 flex flex-col justify-between space-y-10"
          >
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <XCircle size={22} strokeWidth={1.5} />
                </span>
                <span className="font-display text-xs font-bold uppercase tracking-widest text-[#4A3B4E]">
                  01 // The Rushed Reality
                </span>
              </div>
              
              <h3 className="text-2xl font-serif text-brand-green/90 mb-4 tracking-tight">
                Sugary wrappers, synthetics, or simply skipping.
              </h3>
              
              <p className="text-sm text-brand-green/75 leading-relaxed font-light mb-8">
                In a frantic rush to leave the house, we often resort to quick-fix snacks. Typical options are packed with refined glucose, chalky soy insolubles, artificial emulsifiers, and synthetic preservatives.
              </p>

              {/* Problem Painpoints */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-mono mt-0.5 text-xs">─</span>
                  <div>
                    <h4 className="text-xs font-semibold text-brand-green uppercase tracking-wider">The Insulin Rollercoaster</h4>
                    <p className="text-xs text-brand-green/60 mt-0.5">Refined syrups cause sharp blood glucose spikes followed by a harsh midday crash and energy drain.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-mono mt-0.5 text-xs">─</span>
                  <div>
                    <h4 className="text-xs font-semibold text-brand-green uppercase tracking-wider">The Synthetic Bloat</h4>
                    <p className="text-xs text-brand-green/60 mt-0.5">Chalky, laboratory-manufactured protein powders contain heavy isolates that sit heavy and trigger inflammation.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-mono mt-0.5 text-xs">─</span>
                  <div>
                    <h4 className="text-xs font-semibold text-brand-green uppercase tracking-wider">Rushed & Depleted</h4>
                    <p className="text-xs text-brand-green/60 mt-0.5">Skipping mornings drains the body’s cortisol reserves, leaving you dependent on endless cups of espresso.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200/50 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-brand-green/45">Status: Fatigue Loop</span>
              <span className="text-xs text-red-600/80 font-semibold tracking-wide">Inefficient Metabolic Fuel</span>
            </div>
          </motion.div>

          {/* Side B: The Oria Solution (Vibrant, breathing, clean cream) */}
          <motion.div
            id="side-oria-solution"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ ...scrollTransition, delay: 0.15 }}
            className="p-8 sm:p-12 rounded-[32px] bg-brand-green/5 border border-brand-green/10 flex flex-col justify-between space-y-10 relative"
          >
            {/* Visual branding glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-sprout/5 blur-3xl rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center space-x-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-brand-sprout/10 text-[#10B981] flex items-center justify-center">
                  <CheckCircle size={22} strokeWidth={1.5} className="text-brand-sprout" />
                </span>
                <span className="font-display text-xs font-bold uppercase tracking-widest text-[#10B981]">
                  02 // The Oria Solution
                </span>
              </div>
              
              <h3 className="text-2xl font-serif text-brand-green mb-4 tracking-tight">
                Slow-release millets and unrefined botanicals.
              </h3>
              
              <p className="text-sm text-brand-green/85 leading-relaxed font-light mb-8">
                Oria rebuilds your fast-paced mornings around non-gmo ancient millets. Combined with clean legumes and unrefined prebiotic dietary fibers, you digest effortlessly and feel sustainably full.
              </p>

              {/* Solution Highlights */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock size={16} className="text-brand-sprout mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-brand-green uppercase tracking-wider">30-Second Absolute Ritual</h4>
                    <p className="text-xs text-brand-green/70 mt-0.5">Simply unwrap your bar or shake with organic oat milk. Nutrient dense, fully balanced fuel designed for modern, high-intensity days.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Activity size={16} className="text-brand-sprout mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-brand-green uppercase tracking-wider">Smooth, Persistent Glycemic Curve</h4>
                    <p className="text-xs text-brand-green/70 mt-0.5">Millet carbs break down slowly, maintaining sharp mental focus and steady ATP production for 5+ clean hours.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Zap size={16} className="text-brand-sprout mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-brand-green uppercase tracking-wider">Clean Organic Assimilation</h4>
                    <p className="text-xs text-brand-green/70 mt-0.5">Naturally high in zinc, iron, and fiber. Cold-extracted plant protein is smooth, non-gritty, and highly bioavailable.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-brand-green/10 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-brand-green/45">Status: Active Resilience</span>
              <span className="text-xs text-brand-sprout font-semibold tracking-wide flex items-center gap-1">
                <span>●</span> Elevated Balance
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
