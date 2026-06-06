'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Calendar, ArrowRight, Shield, Award, Sparkles, Sprout } from 'lucide-react';

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  impactScore: string;
  historicalContext: string;
  quote: string;
  accentColor: string;
}

export default function HistoryTimeline() {
  const [activeEra, setActiveEra] = useState<string>('indus');

  const eras: TimelineEvent[] = [
    {
      id: 'indus',
      year: '3500 BCE',
      title: 'Indus Valley Origin',
      subtitle: 'Dry-Farmed Resilient Agriculture',
      description: 'The earliest archaeological evidence of domesticated Pearl and Foxtail millets. Thriving with up to 70% less hydration than wheat, these hardy crops established robust carbohydrate pathways for early human civilizations across the semi-arid Harappan basins.',
      impactScore: 'Survival & Cellular Foundations',
      historicalContext: 'Organically carbonized grain deposits confirmed at site level across Lothal and Harappa layers.',
      quote: '"The crop that laughs in the face of persistent drought, feeding the early human spark."',
      accentColor: 'text-[#10B981]'
    },
    {
      id: 'ayurveda',
      year: '1500 BCE',
      title: 'Vedic Botanical Codices',
      subtitle: 'Recorded Ayurvedic Science',
      description: 'Millets are canonized in early Sanskrit Ayurvedic codices (including the Yajurveda texts) under the category "Kudhanya" or "Trina Dhanya" — praised for their cooling properties, blood-sugar stability, and gut balancing effects.',
      impactScore: 'Systemic Metabolic Balance',
      historicalContext: 'Recognized as premium dietary fuel to settle nervous tremors and improve cognitive focus.',
      quote: '"Light to digest, hot in energy, dry to the touch, restoring the humors in perfect flow."',
      accentColor: 'text-[#8B5CF6]'
    },
    {
      id: 'maratha',
      year: '1600 CE',
      title: 'Maratha Field Rations',
      subtitle: 'High-Density Mobility Fuel',
      description: 'Finger millet (Ragi) cakes serve as the primary field ration of the Maratha light cavalry. The high natural concentration of amino acids, calcium, and phosphorus enabled rapid multi-day marches across harsh mountain terrains under Shivaji Mahavatar.',
      impactScore: 'Endurance & Fast Absorption',
      historicalContext: 'Carried in simple cotton pouches, instantly consumed with salt-algae binders for electrolyte replenishment.',
      quote: '"A handful of dry flour and water sustained weeks of relentless peak physical performance."',
      accentColor: 'text-[#F59E0B]'
    },
    {
      id: 'chasm',
      year: '1960s',
      title: 'The Industrial Chasm',
      subtitle: 'Discarding Ancient Grains',
      description: 'The Green Revolution heavily subsidizes modern hybridized dwarf wheat and high-fructose corn syrup structures. Ancient grains are marginalized as "primitive," leading to systemic modern ailments such as glycemic spikes and chronic inflammation.',
      impactScore: 'Systemic Metabolic Breakdown',
      historicalContext: 'Global standard food models swap slow-release fibers for cheap, inflammatory processing starch.',
      quote: '"In exchanging cellular balance for volume, we created the era of chronic tiredness."',
      accentColor: 'text-[#EF4444]'
    },
    {
      id: 'oria',
      year: '2026',
      title: 'The Oria Renaissance',
      subtitle: 'Biomolecular Activated Processing',
      description: 'Oria reclaims ancient millet species with modern organic co-operative farms and gentle cold-milling technology. We preserve trace minerals, lock in slow-release β-glucans, and combine them with natural electrolytes to fuel morning cognitive performance.',
      impactScore: 'The Clean Peak Evolution',
      historicalContext: 'Supplies slow-release 5-hour fuel with zero refined sugar or glycemic rebound spikes.',
      quote: '"Uniting Harappan resiliency with modern clinical molecular accuracy to revive your morning routine."',
      accentColor: 'text-brand-purple'
    }
  ];

  const currentEra = eras.find((e) => e.id === activeEra)!;

  return (
    <section
      id="history-timeline"
      className="py-24 sm:py-32 bg-[#FAF9F5] border-t border-brand-green/5 relative overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1E2D24_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16 sm:mb-24 text-left">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#10B981] mb-3">
            Agronomic Heritage Timeline
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-brand-green leading-tight font-medium">
            3500 Years of Botanical Resilience
          </h2>
          <p className="text-sm text-brand-green/75 max-w-xl mt-4 font-light leading-relaxed">
            From drought-defying Indus soil to optimized biomolecular activation. Trace how your daily breakfast fuel evolved across centuries of human history.
          </p>
        </div>

        {/* Timeline Visual Track */}
        <div className="relative mb-12">
          {/* Horizontal Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-brand-green/10 -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
            {eras.map((era) => {
              const isActive = era.id === activeEra;
              return (
                <button
                  key={era.id}
                  id={`timeline-step-${era.id}`}
                  onClick={() => setActiveEra(era.id)}
                  className={`p-6 rounded-3xl border text-left transition-all duration-500 flex flex-col justify-between h-36 relative cursor-pointer ${
                    isActive 
                      ? 'bg-white border-[#10B981] shadow-xl shadow-[#10B981]/5 -translate-y-1' 
                      : 'bg-white/40 border-brand-green/5 hover:border-brand-green/20'
                  }`}
                >
                  {/* Subtle active state indicators */}
                  {isActive && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                  )}

                  <span className="text-[11px] font-mono uppercase text-brand-purple tracking-widest font-bold">
                    {era.year}
                  </span>
                  
                  <div>
                    <h3 className="font-serif text-sm font-semibold text-brand-green mb-0.5">
                      {era.title}
                    </h3>
                    <p className="text-[10px] text-brand-green/50 truncate">
                      {era.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Era Narrative Spotlight Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEra.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-[40px] border border-brand-green/5 shadow-2xl p-8 sm:p-12 text-left"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Deep Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-sprout/10 rounded-full text-[10px] font-bold text-brand-purple uppercase tracking-widest">
                    <Calendar size={11} className="text-brand-sprout" /> {currentEra.year} Epoch
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#10B981]/10 rounded-full text-[10px] font-bold text-[#10B981] uppercase tracking-widest font-mono">
                    Impact: {currentEra.impactScore}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3.5xl text-brand-green font-medium">
                  {currentEra.subtitle}
                </h3>

                <p className="text-xs sm:text-sm text-brand-green/80 leading-relaxed font-light">
                  {currentEra.description}
                </p>

                {/* Micro historical detail check */}
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-brand-green/5 space-y-1">
                  <span className="text-[9px] font-mono uppercase text-brand-green/45 block">Agrarian Archeology Dossier</span>
                  <p className="text-[11px] text-brand-green/80 font-mono">
                    📊 {currentEra.historicalContext}
                  </p>
                </div>
              </div>

              {/* Right Column: Historical Quotation Card & Callout */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                
                {/* Visual Quote Box */}
                <div className="p-8 rounded-[32px] bg-brand-green/5 border border-brand-green/5 relative flex flex-col justify-between min-h-[160px] italic">
                  <span className="absolute top-6 left-6 text-5xl font-serif text-[#10B981]/20 select-none pointer-events-none">&ldquo;</span>
                  <p className="text-xs leading-relaxed text-brand-green/90 font-serif relative z-10 pt-4">
                    {currentEra.quote}
                  </p>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#10B981] font-bold text-right w-full mt-4 block">
                    — Historical Transcription
                  </span>
                </div>

                {/* Botanical verification seal */}
                <div className="p-5 rounded-2xl border border-brand-green/10 flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981] flex-shrink-0">
                    <Sprout size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-green uppercase tracking-wider">Oria Preservation Council</h4>
                    <p className="text-[10px] text-brand-green/60 mt-0.5">Protecting ancient crop diversities under non-GMO agronomy structures.</p>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
