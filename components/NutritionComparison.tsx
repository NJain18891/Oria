'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check, Minus, Sparkles, ShieldCheck } from 'lucide-react';
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
      className="py-24 sm:py-32 bg-white border-t border-brand-green/5 relative overflow-hidden"
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
        <div className="w-full overflow-x-auto scrollbar-none rounded-3xl border border-brand-green/10 bg-[#FBFBFA]/40 backdrop-blur-sm">
          <div className="min-w-[800px] p-6 sm:p-10">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-6 items-center pb-8 border-b border-brand-green/10 text-left">
              <div className="col-span-3">
                <span className="text-[10px] font-mono text-brand-green/40 uppercase tracking-widest block">Metric Comparison</span>
              </div>
              <div className="col-span-3 bg-brand-green/[0.03] border border-[#10B981]/15 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative shadow-sm">
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 inline-flex items-center gap-1 text-[8px] uppercase tracking-widest font-bold text-white bg-[#10B981] py-0.5 px-2.5 rounded-full">
                  <ShieldCheck size={8} /> Golden Standard
                </span>
                <OriaLogo showText={false} iconOnly={true} className="h-7 w-auto mt-1" />
                <span className="text-xs font-serif font-semibold text-brand-green mt-1.5 tracking-wide">Oria (Millet Base)</span>
              </div>
              <div className="col-span-3 text-center flex flex-col items-center">
                <span className="text-xs font-semibold text-brand-green/80 uppercase tracking-wider">Synthetic Powders</span>
                <span className="text-[10px] text-brand-green/40 mt-1 font-mono">Standard Whey / Isolates</span>
              </div>
              <div className="col-span-3 text-center flex flex-col items-center">
                <span className="text-xs font-semibold text-brand-green/80 uppercase tracking-wider">Sugary Bars</span>
                <span className="text-[10px] text-brand-green/40 mt-1 font-mono">Commercial Oats / Wheat</span>
              </div>
            </div>

            {/* Table Body rows */}
            <div className="divide-y divide-brand-green/[0.05]">
              {MATRIX_METRICS.map((row) => (
                <div key={row.name} className="grid grid-cols-12 gap-6 items-center py-6.5 text-left transition-all duration-150 hover:bg-brand-green/[0.01]">
                  
                  {/* Metric Name */}
                  <div className="col-span-3">
                    <span className="text-xs sm:text-sm font-semibold text-brand-green uppercase tracking-wider block font-sans">
                      {row.name}
                    </span>
                  </div>

                  {/* Render based on Metric Type */}
                  {row.type === 'text' ? (
                    <>
                      {/* Oria value */}
                      <div className="col-span-3 flex flex-col items-center justify-center text-center px-4">
                        {row.oria.positive ? (
                          <div className="flex items-center justify-center gap-1.5 text-[#10B981]">
                            <span className="w-5 h-5 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                              <Check size={11} strokeWidth={3} />
                            </span>
                            <span className="text-xs font-medium text-brand-green">{row.oria.value}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5 text-brand-green/40">
                            <Minus size={14} className="text-brand-green/30" />
                            <span className="text-xs">{row.oria.value}</span>
                          </div>
                        )}
                      </div>

                      {/* Synthetic value */}
                      <div className="col-span-3 flex flex-col items-center justify-center text-center px-4">
                        {row.synthetic.positive ? (
                          <div className="flex items-center justify-center gap-1.5 text-[#10B981]">
                            <span className="w-5 h-5 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                              <Check size={11} strokeWidth={3} />
                            </span>
                            <span className="text-xs font-medium text-brand-green">{row.synthetic.value}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5 text-brand-green/45">
                            <Minus size={14} className="text-brand-green/30" />
                            <span className="text-xs font-light">{row.synthetic.value}</span>
                          </div>
                        )}
                      </div>

                      {/* Sugary value */}
                      <div className="col-span-3 flex flex-col items-center justify-center text-center px-4">
                        {row.sugary.positive ? (
                          <div className="flex items-center justify-center gap-1.5 text-[#10B981]">
                            <span className="w-5 h-5 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                              <Check size={11} strokeWidth={3} />
                            </span>
                            <span className="text-xs font-medium text-brand-green">{row.sugary.value}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5 text-brand-green/45">
                            <Minus size={14} className="text-brand-green/30" />
                            <span className="text-xs font-light">{row.sugary.value}</span>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Oria bar */}
                      <div className="col-span-3 flex flex-col justify-center px-4">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[10px] font-mono font-bold text-[#10B981] uppercase tracking-wider">Optimal</span>
                          <span className="text-[10px] font-mono text-brand-green/70">{row.oriaValue}%</span>
                        </div>
                        <div className="w-full bg-brand-green/5 h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${row.oriaValue}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className="bg-gradient-to-r from-[#10B981] to-brand-sprout h-full rounded-full"
                          />
                        </div>
                      </div>

                      {/* Synthetic bar */}
                      <div className="col-span-3 flex flex-col justify-center px-4">
                        <div className="flex justify-between items-center mb-1.5 text-brand-green/40">
                          <span className="text-[10px] font-mono uppercase tracking-wider">Muted</span>
                          <span className="text-[10px] font-mono">{row.syntheticValue}%</span>
                        </div>
                        <div className="w-full bg-brand-green/5 h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${row.syntheticValue}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className="bg-brand-green/20 h-full rounded-full"
                          />
                        </div>
                      </div>

                      {/* Sugary bar */}
                      <div className="col-span-3 flex flex-col justify-center px-4">
                        <div className="flex justify-between items-center mb-1.5 text-brand-green/40">
                          <span className="text-[10px] font-mono uppercase tracking-wider">Muted</span>
                          <span className="text-[10px] font-mono">{row.sugaryValue}%</span>
                        </div>
                        <div className="w-full bg-brand-green/5 h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${row.sugaryValue}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className="bg-brand-green/20 h-full rounded-full"
                          />
                        </div>
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
