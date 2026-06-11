'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check, Minus, Sparkles, ShieldCheck, X } from 'lucide-react';
import OriaLogo from '@/components/OriaLogo';

interface TextMetric {
  type: 'text';
  name: string;
  oria: { value: string; positive: boolean };
  synthetic: { value: string; positive: boolean };
  sugary: { value: string; positive: boolean };
}

interface BarMetric {
  type: 'bar';
  name: string;
  oriaValue: number; // 0-100
  syntheticValue: number;
  sugaryValue: number;
}

type MetricRow = TextMetric | BarMetric;

const MATRIX_METRICS: MetricRow[] = [
  {
    type: 'text',
    name: 'Base Grain',
    oria: { value: 'Sprouted Millet', positive: true },
    synthetic: { value: 'None (Dairy Isolate)', positive: false },
    sugary: { value: 'Processed Oats/Wheat', positive: false }
  },
  {
    type: 'text',
    name: 'Additives',
    oria: { value: '0% Gums & Fillers', positive: true },
    synthetic: { value: 'Silicon, Soy Lecithin', positive: false },
    sugary: { value: 'Xanthan Gum, Syrups', positive: false }
  },
  {
    type: 'text',
    name: 'Prebiotics',
    oria: { value: 'Active Seed Fibers', positive: true },
    synthetic: { value: 'Absent', positive: false },
    sugary: { value: 'Soluble Dextrose', positive: false }
  },
  {
    type: 'text',
    name: 'Sourcing',
    oria: { value: 'Generational Farms', positive: true },
    synthetic: { value: 'Industrial Batching', positive: false },
    sugary: { value: 'Commercial Brokerage', positive: false }
  },
  {
    type: 'bar',
    name: 'Sustained Energy',
    oriaValue: 96,
    syntheticValue: 20,
    sugaryValue: 35
  },
  {
    type: 'bar',
    name: 'Nutrient Density',
    oriaValue: 98,
    syntheticValue: 30,
    sugaryValue: 15
  },
  {
    type: 'bar',
    name: 'Digestive Ease',
    oriaValue: 95,
    syntheticValue: 15,
    sugaryValue: 40
  }
];

export default function NutritionComparison() {
  return (
    <section
      id="oria-nutrition-comparison"
      className="py-24 sm:py-32 bg-[#E2D7E5] border-t border-brand-green/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Title Block */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-purple mb-4 inline-flex items-center gap-1.5 bg-brand-purple/5 px-3.5 py-1.5 rounded-full">
            <Sparkles size={11} className="text-brand-purple" /> Scientific Comparison Matrix
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-green leading-[1.12]">
            Pure Grain. <br className="hidden sm:inline" />
            <span className="italic text-brand-purple">Zero Crash.</span>
          </h2>
        </div>

        {/* Matrix Container */}
        <div className="w-full overflow-x-auto scrollbar-none rounded-3xl border-2 border-brand-green/15 bg-[#FBFBFA]/60 backdrop-blur-sm shadow-xl">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-12 items-stretch border-b-2 border-brand-green/15 text-left bg-brand-green/[0.02]">
              <div className="col-span-3 pt-5 px-6 flex flex-col justify-center items-center text-center border-r border-brand-green/15">
                <span className="text-sm font-sans font-extrabold text-brand-green/90 uppercase tracking-wider block">Metric Comparison</span>
              </div>
              <div className="col-span-3 bg-[#10B981]/5 pt-5 px-6 flex flex-col items-center justify-start text-center relative border-r-2 border-[#10B981]/20">
                <span className="text-sm font-sans font-extrabold text-brand-green uppercase tracking-wider block">Oria (Millet Base)</span>
                <OriaLogo showText={false} iconOnly={true} className="h-16 w-auto" />
              </div>
              <div className="col-span-3 text-center flex flex-col items-center justify-start pt-5 px-6 border-r border-brand-green/15">
                <span className="text-sm font-sans font-extrabold text-brand-green/90 uppercase tracking-wider block">Synthetic Powders</span>
                <span className="text-xs sm:text-[13px] text-brand-green/80 mt-5 font-sans font-bold tracking-wide">Standard Whey / Isolates</span>
              </div>
              <div className="col-span-3 text-center flex flex-col items-center justify-start pt-5 px-6">
                <span className="text-sm font-sans font-extrabold text-brand-green/90 uppercase tracking-wider block">Sugary Bars</span>
                <span className="text-xs sm:text-[13px] text-brand-green/80 mt-5 font-sans font-bold tracking-wide">Commercial Oats / Wheat</span>
              </div>
            </div>

            {/* Table Body rows */}
            <div className="divide-y border-b border-brand-green/15 divide-brand-green/15">
              {MATRIX_METRICS.map((row) => (
                <div key={row.name} className="grid grid-cols-12 items-stretch text-left transition-all duration-150 hover:bg-brand-green/[0.02]">
                  
                  {/* Metric Name */}
                  <div className="col-span-3 p-6 flex items-center justify-center text-center border-r border-brand-green/15 bg-brand-green/[0.01]">
                    <span className="text-xs sm:text-sm font-bold text-brand-green uppercase tracking-wider block font-sans w-full text-center">
                      {row.name}
                    </span>
                  </div>

                  {/* Render based on Metric Type */}
                  {row.type === 'text' ? (
                    <>
                      {/* Oria value */}
                      <div className="col-span-3 flex flex-col items-center justify-center text-center px-4 py-6 border-r-2 border-[#10B981]/20 bg-[#10B981]/[0.02]">
                        <div className="flex items-center justify-center text-[#10B981]">
                          <span className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200" title={row.oria.value}>
                            <Check size={22} strokeWidth={4} />
                          </span>
                        </div>
                      </div>
 
                      {/* Synthetic value */}
                      <div className="col-span-3 flex flex-col items-center justify-center text-center px-4 py-6 border-r border-brand-green/15">
                        <div className="flex items-center justify-center text-rose-500/90 hover:scale-105 transition-transform duration-200" title={row.synthetic.value}>
                          <span className="w-9 h-9 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                            <X size={18} strokeWidth={3.5} />
                          </span>
                        </div>
                      </div>
 
                      {/* Sugary value */}
                      <div className="col-span-3 flex flex-col items-center justify-center text-center px-4 py-6">
                        <div className="flex items-center justify-center text-rose-500/90 hover:scale-105 transition-transform duration-200" title={row.sugary.value}>
                          <span className="w-9 h-9 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                            <X size={18} strokeWidth={3.5} />
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Oria score */}
                      <div className="col-span-3 flex flex-col items-center justify-center text-center px-4 py-6 border-r-2 border-[#10B981]/20 bg-[#10B981]/[0.02]">
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="text-3xl sm:text-4xl font-serif font-bold text-[#10B981] tracking-tight block"
                        >
                          {row.oriaValue}%
                        </motion.span>
                        <span className="text-[10px] font-mono font-extrabold text-[#10B981]/90 uppercase tracking-widest mt-1">Optimal</span>
                      </div>
 
                      {/* Synthetic score */}
                      <div className="col-span-3 flex flex-col items-center justify-center text-center px-4 py-6 border-r border-brand-green/15">
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="text-2xl sm:text-3xl font-serif font-bold text-brand-green/60 tracking-tight block"
                        >
                          {row.syntheticValue}%
                        </motion.span>
                        <span className="text-[9px] font-mono font-bold text-brand-green/45 uppercase tracking-widest mt-1">Muted</span>
                      </div>
 
                      {/* Sugary score */}
                      <div className="col-span-3 flex flex-col items-center justify-center text-center px-4 py-6">
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="text-2xl sm:text-3xl font-serif font-bold text-brand-green/60 tracking-tight block"
                        >
                          {row.sugaryValue}%
                        </motion.span>
                        <span className="text-[9px] font-mono font-bold text-brand-green/45 uppercase tracking-widest mt-1">Muted</span>
                      </div>
                    </>
                  )}

                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
