'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';

interface BentoPillar {
  id: string;
  title: string;
  summary: string;
  deepDive: string;
  iconType: 'sourcing' | 'synthetic' | 'carbon' | 'digestive';
}

const PILLARS_DATA: BentoPillar[] = [
  {
    id: 'pillar-1',
    title: 'Traceable Sourcing',
    summary: 'We contract harvest every millet batch directly from generational farmers in the ancient Indus soil belts, guaranteeing biological purity.',
    deepDive: 'By bypassing commercial grain exchanges, Oria establishes direct bilateral agreements. We pre-fund up to 60% of crop cycles for 45+ women-led family farms. Each parcel is mapped to precise coordinates, and raw materials are scanned using ICP-MS heavy-metal spectroscopy to guarantee that absolutely no chemical runoff or industrial contaminants enter our mill ecosystem.',
    iconType: 'sourcing',
  },
  {
    id: 'pillar-2',
    title: 'Zero Synthetic Compromise',
    summary: 'No artificial emulsifiers, soy, gums, heavy metal isolates, or chalky synthetics. Standardized nutrition cleanly extracted from true food structures.',
    deepDive: 'Most health products rely on cheap industrial binders like xanthan gum or soy lecithin that compromise the intestinal lining. Oria objects to these tricks. Our structural integrity is derived entirely from stone-ground whole seed carbohydrates, sun-dried date fibers, and organic prebiotic banana fruit starches. We sweeten purely using organic native monkfruit extracts.',
    iconType: 'synthetic',
  },
  {
    id: 'pillar-3',
    title: 'Carbon-Negative Footprint',
    summary: 'Millet crops are exceptionally resilient and carbon-locking, requiring zero global irrigation networks. We offset 120% of distribution gases.',
    deepDive: 'Millets are ancient, climate-hardy C4 photosynthetic grasses. They require up to 90% less water than wheat or rice and absorb massive quantities of subterranean carbon within their extensive, three-meter fibrous root systems. Not only do we operate an irrigation-free growing model, but we also proactively track and purchase certified over-offsets at 120% of our supply-chain footprint.',
    iconType: 'carbon',
  },
  {
    id: 'pillar-4',
    title: 'Digestive Resilience',
    summary: 'Infused with premium prebiotic fiber strands to nourish the human gut flora, optimize nutrient passage speed, and eliminate bloating.',
    deepDive: 'Our stone-grinding process preserves the natural cellular envelope of the millet grain. Because these walls dissolve slowly, starch is delivered gradually into the gut. Packed with insoluble lignins and prebiotic hemicellulose, Oria acts as a steady fermentation source, stimulating the natural synthesis of short-chain fatty acids (SCFAs) like butyrate to heal the bowel barrier.',
    iconType: 'digestive',
  },
];

// Helper component for thin-stroke animated SVG icons
// Framer Motion automatically propagates nested variant properties from parent cards to children!
function AnimatedBentoIcon({ type }: { type: string }) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeInOut' as const, delay: 0.1 } 
    }
  };

  if (type === 'sourcing') {
    return (
      <svg className="w-10 h-10 text-brand-purple" viewBox="0 0 40 40" fill="none" stroke="currentColor">
        {/* Outer Circular Compass ring */}
        <motion.circle 
          cx="20" cy="20" r="16" strokeWidth="1.2" strokeDasharray="3,3"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        {/* Landscape Mountains Peak inside */}
        <motion.path 
          d="M 11 25 L 18 15 L 23 21 L 29 13 L 31 16"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
        />
        {/* Stylized Crosshairs / Coordinates finder */}
        <motion.path 
          d="M 20 4 L 20 8 M 20 32 L 20 36 M 4 20 L 8 20 M 32 20 L 36 20"
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={pathVariants}
        />
        <motion.circle 
          cx="20" cy="20" r="2" fill="#10B981"
          variants={{
            hidden: { scale: 0 },
            visible: { scale: 1, transition: { delay: 0.6, duration: 0.3 } }
          }}
        />
      </svg>
    );
  }

  if (type === 'synthetic') {
    return (
      <svg className="w-10 h-10 text-[#10B981]" viewBox="0 0 40 40" fill="none" stroke="currentColor">
        {/* Clean Shield Outline */}
        <motion.path 
          d="M 12 8 C 20 8 20 5 20 5 C 20 5 20 8 28 8 C 28 17 26 27 20 34 C 14 27 12 17 12 8 Z"
          strokeWidth="1.5"
          strokeLinejoin="round"
          variants={pathVariants}
        />
        {/* Center Sprout leaf */}
        <motion.path 
          d="M 20 25 C 20 18 25 15 25 15 C 25 15 18 16 17 22 C 16 26 20 25 20 25 Z"
          strokeWidth="1.2"
          fill="rgba(16, 185, 129, 0.1)"
          variants={pathVariants}
        />
        {/* Small diagonal checkmark */}
        <motion.path
          d="M 20 25 L 20 13"
          strokeWidth="1.2"
          strokeLinecap="round"
          variants={pathVariants}
        />
      </svg>
    );
  }

  if (type === 'carbon') {
    return (
      <svg className="w-10 h-10 text-brand-green" viewBox="0 0 40 40" fill="none" stroke="currentColor">
        {/* Botanical leaf flow shape */}
        <motion.path 
          d="M 10 20 C 10 11 20 10 30 10 C 30 19 20 30 10 30 C 10 30 10 24 10 20 Z"
          strokeWidth="1.5"
          strokeLinejoin="round"
          variants={pathVariants}
        />
        {/* Intracellular leaf rib vector */}
        <motion.path 
          d="M 10 30 L 24 16 M 15 21 L 18 18 M 20 26 L 25 21"
          strokeWidth="1.2"
          strokeLinecap="round"
          variants={pathVariants}
        />
        {/* Carbon looping wind lines */}
        <motion.path 
          d="M 6 12 Q 15 6 24 14"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="2,2"
          variants={pathVariants}
        />
      </svg>
    );
  }

  return (
    <svg className="w-10 h-10 text-[#F59E0B]" viewBox="0 0 40 40" fill="none" stroke="currentColor">
      {/* Digestive wave structures representing biological canal absorption */}
      <motion.path 
        d="M 8 12 C 14 12 14 18 20 18 C 26 18 26 12 32 12"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={pathVariants}
      />
      <motion.path 
        d="M 8 20 C 14 20 14 26 20 26 C 26 26 26 20 32 20"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={pathVariants}
      />
      <motion.path 
        d="M 8 28 C 14 28 14 34 20 34 C 26 34 26 28 32 28"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={pathVariants}
      />
      {/* Dynamic microbe dots floating in the prebiotic network */}
      <motion.circle 
        cx="12" cy="15" r="1.5" fill="#10B981" 
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 0.5 } }
        }}
      />
      <motion.circle 
        cx="28" cy="23" r="1.2" fill="#10B981" 
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 0.7 } }
        }}
      />
      <motion.circle 
        cx="18" cy="31" r="1.5" fill="#10B981" 
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 0.9 } }
        }}
      />
    </svg>
  );
}

export default function ValueBentoGrid() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Stagger variants for the container cards
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section
      id="oria-values-bento"
      className="py-24 bg-[#FBFBFA] border-t border-brand-green/5 relative overflow-hidden"
    >
      {/* Decorative botanical blueprint coordinate background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02]">
        <svg className="absolute inset-x-0 top-0 h-full w-full" width="100%" height="100%">
          <defs>
            <pattern id="bento-blueprint" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.2" fill="currentColor" className="text-brand-green" />
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" className="text-brand-green" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bento-blueprint)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Small introductory banner details */}
        <div className="max-w-xl mx-auto text-center mb-16 space-y-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#10B981] font-bold">
            Essential Values
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-brand-green font-medium">
            Architectural Commitments
          </h3>
          <p className="text-xs text-brand-green/70 leading-relaxed font-sans font-light">
            Behind our minimalist brand lies an uncompromised scientific discipline. Click on any card below to reveal the complete technical deep dive.
          </p>
        </div>

        {/* Dynamic Bento Cards Staggered viewport entrance */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
        >
          {PILLARS_DATA.map((pillar) => {
            const isExpanded = expandedId === pillar.id;
            return (
              <motion.div
                key={pillar.id}
                id={`value-card-${pillar.id}`}
                variants={cardVariants}
                onClick={() => toggleExpand(pillar.id)}
                whileHover={{ 
                  y: -6, 
                  borderColor: 'rgba(16, 185, 129, 0.4)',
                  transition: { duration: 0.2, ease: 'easeOut' }
                }}
                className={`p-8 rounded-[28px] border transition-all duration-300 text-left bg-white relative cursor-pointer group shadow-sm flex flex-col justify-between ${
                  isExpanded 
                    ? 'border-[#10B981] lg:col-span-2 shadow-md shadow-brand-green/5' 
                    : 'border-brand-green/5 hover:shadow-lg hover:shadow-brand-green/[0.02]'
                }`}
              >
                {/* Visual accent bar inside when active */}
                <div className={`absolute left-0 top-1/4 bottom-1/4 w-1.5 rounded-r-lg transition-transform duration-300 transform origin-left ${
                  isExpanded ? 'bg-[#10B981] scale-100' : 'bg-transparent scale-0'
                }`} />

                <div className="space-y-4">
                  
                  {/* SVG Animated Icon Container */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-brand-green/[0.03] border border-brand-green/[0.06] flex items-center justify-center group-hover:bg-[#10B981]/5 group-hover:border-[#10B981]/25 transition-colors">
                      <AnimatedBentoIcon type={pillar.iconType} />
                    </div>
                    
                    {/* Expand/Collapse Chevron Indicator */}
                    <span className={`text-brand-green/40 group-hover:text-[#10B981] transition-colors p-1 rounded-full ${
                      isExpanded ? 'rotate-180 text-[#10B981] bg-[#10B981]/5' : ''
                    }`}>
                      <ChevronDown size={14} className="transition-transform duration-300" />
                    </span>
                  </div>

                  {/* Text Header Content */}
                  <div>
                    <h4 className="font-serif text-lg text-brand-green font-medium group-hover:text-brand-purple transition-colors flex items-center gap-2">
                      {pillar.title}
                    </h4>
                    
                    <p className="text-xs text-brand-green/75 leading-relaxed font-light mt-3">
                      {pillar.summary}
                    </p>
                  </div>

                  {/* Expandable Technical Deep Dive segment */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-brand-green/5 pt-4 text-left"
                      >
                        <div className="bg-[#FAF9F5]/80 p-4.5 rounded-2xl border border-[#10B981]/15 space-y-3">
                          <span className="text-[9px] uppercase tracking-widest font-mono text-[#10B981] font-bold block flex items-center gap-1">
                            <ShieldCheck size={11} /> LABORATORY DOSSIER // TECHNICAL DOSAGE
                          </span>
                          <p className="text-[11px] text-brand-green/90 leading-relaxed font-sans font-normal">
                            {pillar.deepDive}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

                {/* Micro Expand Tip on Bottom Margin */}
                <div className="mt-5 pt-3 border-t border-brand-green/[0.03] flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-brand-green/40 group-hover:text-brand-green/60">
                    {isExpanded ? '[ Click to close ]' : '[ Click to inspect ]'}
                  </span>
                  <ArrowRight size={10} className="text-brand-green/30 group-hover:text-[#10B981] group-hover:translate-x-1.5 transition-all" />
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
