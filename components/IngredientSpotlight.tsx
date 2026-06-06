'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Leaf, Droplets, Smile, HelpCircle, Check, Compass, ShieldCheck } from 'lucide-react';

interface IngredientTab {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  slogan: string;
  scientificFacts: string[];
  metrics: { label: string; value: string }[];
  bioStory: string;
  origin: string;
}

export default function IngredientSpotlight() {
  const [activeTab, setActiveTab] = useState<string>('millets');
  const [inspectingData, setInspectingData] = useState<string | null>(null);

  // Scroll measuring ref for circular reading progress indicator
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Native hardware-accelerated parent scroll coordinates
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Dual-plane parallax displacements to create realistic depth/layering
  const yParallaxImage = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const yParallaxDetail = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const [isVisible, setIsVisible] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(25);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Determine if a significant part of the section is inside viewport bounds
      if (rect.top < viewportHeight && rect.bottom > 0) {
        setIsVisible(true);
        const sectionHeight = rect.height;
        // Scroll entry progress mapped smoothly as we pan through the content heights
        const totalScrolled = viewportHeight - rect.top;
        const progress = Math.min(Math.max((totalScrolled / (sectionHeight + viewportHeight)) * 100, 0), 100);
        setScrollProgress(progress);
        
        const totalEstimatedTime = 25; // 25s target read duration for this scientific spot
        const countdown = Math.ceil(totalEstimatedTime * (1 - progress / 100));
        setRemainingSeconds(Math.max(countdown, 0));
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once to initialize
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs: IngredientTab[] = [
    {
      id: 'millets',
      name: 'Ancient Millets',
      subtitle: 'Slow-Release Carbohydrate Engine',
      icon: Leaf,
      slogan: 'Ancient grains for resilient modern human biology.',
      origin: 'Indus Valley - Earthy, dry-farmed organically',
      bioStory: 'Oria stands on the foundation of gluten-free ancient millets (such as Pearl, Foxtail, and Finger millet). Unlike modern hybridized wheat, millets require up to 70% less water, are rich in protective silica, block oxidative stressors, and break down exceptionally slowly inside your digestive system.',
      scientificFacts: [
        'Beta-glucans form an unmanaged food-gel matrix in the gut, smoothing out post-prandial insulin curves.',
        'High natural concentrations of phosphorus and iron support systemic oxygen carriage and ATP regeneration.',
        'Rich prebiotic fibers directly ferment into protective Short-Chain Fatty Acids (SCFAs), optimizing mental clarity via the gut-brain axis.'
      ],
      metrics: [
        { label: 'Glycemic Index', value: 'Low (43-48)' },
        { label: 'Digestion Period', value: '5-Hour Release' },
        { label: 'Prebiotic Context', value: '3.6g / Serving' }
      ]
    },
    {
      id: 'electrolytes',
      name: 'Natural Electrolytes',
      subtitle: 'Pure Intracellular Rehydration',
      icon: Droplets,
      slogan: 'Hydration isn’t about liters of water; it’s about mineral balance.',
      origin: 'Salt Ranges & Volcanic Archipelago Plaster Fields',
      bioStory: 'Isolated industrial proteins often leave the mouth feeling dry and chalky because of a lack of supporting natural salt binders. Oria solves this by marrying whole-food vegan protein with rich natural mineral structures (crystallized Pink Salt crystals, organic coconut water molecules, and red marine algae).',
      scientificFacts: [
        'Matches human plasma pressure levels to transfer nutrients through cellular membranes with minimal energy investment.',
        'Delivers over 72 active trace element minerals including bioavailable zinc and cellular magnesium.',
        'Replenishes critical sodium-potassium ATPase pumps, driving mental alertness and muscle contraction efficiency without stimulant crashes.'
      ],
      metrics: [
        { label: 'Trace Mineral Count', value: '72+ Ionic Grains' },
        { label: 'Hydration Rate', value: '98% Absorption' },
        { label: 'Synthetic Additives', value: '0% Clean Label' }
      ]
    },
    {
      id: 'sugar',
      name: 'Zero Refined Sugar',
      subtitle: 'Botanically Sweetened Architecture',
      icon: Smile,
      slogan: 'Sweetness is a sensation, not a metabolic compromise.',
      origin: 'Organic Monkfruit Vineyards & Whole Date Fibers',
      bioStory: 'We completely reject cheap high-fructose corn syrups, sugar alcohols (erythritol/xylitol), and sucrose arrays. The light, clean sweetness of Oria comes exclusively from organic monkfruit extracts and real sun-dried date fibers, offering a balanced sensation with zero aftertaste or glycemic spike.',
      scientificFacts: [
        'Mogroside sweet compounds from monkfruit bypass insulin metabolic pathways, registering zero calories.',
        'Natural whole date fibers bind active fructose compounds, resulting in slowly absorbed dietary glucose molecules.',
        'Eliminates systemic inflammation and oral microbiome feed loops caused by common white granulated sugars.'
      ],
      metrics: [
        { label: 'Insulin Response', value: 'Flatline // Zero' },
        { label: 'Artificial Esters', value: 'None' },
        { label: 'Microbiome Friendly', value: '100% Symbiotic' }
      ]
    }
  ];

  const currentData = tabs.find((t) => t.id === activeTab)!;

  return (
    <section
      ref={sectionRef}
      id="ingredients"
      className="relative py-24 sm:py-32 bg-[#FBFBFA] border-t border-brand-green/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Header Title Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 sm:mb-20">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-purple mb-3">
              Ingredient Philosophy
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-brand-green leading-tight">
              Honoring whole-food structures. No shortcuts.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm text-brand-green/75 leading-relaxed font-light">
              We leverage ancient agrarian science and clean botanical extractions. This means every single ingredient is fully traceable, organic, nutritious, and absolutely essential.
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="relative border-b border-brand-green/10 pb-2 mb-12 flex space-x-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = tab.id === activeTab;
            
            return (
              <button
                id={`tab-btn-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-4 rounded-t-2xl font-serif text-base tracking-tight transition-all duration-300 flex items-center space-x-3 text-left whitespace-nowrap ${
                  isActive ? 'text-brand-green font-medium' : 'text-brand-green/50 hover:text-brand-green'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab-line"
                    className="absolute bottom-[-9px] left-0 right-0 h-[3px] bg-[#10B981] z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <IconComponent className={isActive ? 'text-brand-sprout' : 'text-brand-green/45'} size={18} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            id={`ingredient-content-${currentData.id}`}
            key={currentData.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-brand-purple">
                <Compass size={14} className="text-brand-sprout" />
                <span>Origin: {currentData.origin}</span>
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif text-brand-green font-medium">
                {currentData.subtitle}
              </h3>

              <p className="text-sm font-semibold italic text-[#4A3B4E]">
                &ldquo;{currentData.slogan}&rdquo;
              </p>

              <p className="text-sm text-brand-green/80 leading-relaxed font-light">
                {currentData.bioStory}
              </p>

              {/* Scientific details */}
              <div className="space-y-4 pt-4 border-t border-brand-green/10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#1E2D24]">
                  Clinical Biochemical Merits:
                </h4>
                <div className="space-y-3.5">
                  {currentData.scientificFacts.map((fact, index) => (
                    <div key={index} className="flex items-start space-x-3.5">
                      <span className="w-5 h-5 rounded-full bg-brand-sprout/15 text-brand-sprout flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        <ShieldCheck size={11} strokeWidth={2.5} />
                      </span>
                      <p className="text-xs text-brand-green/85 leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Stat Grid / Bento Highlights with Parallax Images */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              
              {/* Premium Parallax Herbarium/Cereal Ingredient Plate */}
              <div className="relative h-64 sm:h-72 rounded-[32px] overflow-hidden border border-brand-green/10 bg-brand-green/5 group shadow-sm">
                <motion.img
                  src={
                    currentData.id === 'millets'
                      ? 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=700'
                      : currentData.id === 'electrolytes'
                      ? 'https://images.unsplash.com/photo-1518113001614-72c0f9949641?auto=format&fit=crop&q=80&w=700'
                      : 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=700'
                  }
                  alt={currentData.name}
                  style={{ y: yParallaxImage, scale: 1.18 }}
                  className="absolute inset-0 w-full h-[135%] object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-brand-green/35 to-transparent" />
                
                {/* Embedded dynamic indicators floating over the parallax lens */}
                <motion.div 
                  style={{ y: yParallaxDetail }}
                  className="absolute bottom-6 left-6 right-6 text-left shrink-0"
                >
                  <span className="text-[9px] font-mono font-bold text-brand-sprout uppercase tracking-widest bg-brand-green/45 px-2.5 py-1 rounded-full border border-brand-sprout/20">
                    Oria Assay Registered
                  </span>
                  <h4 className="text-lg font-serif text-white font-medium mt-2">{currentData.name}</h4>
                  <p className="text-[10px] text-white/70 font-mono mt-0.5">{currentData.origin}</p>
                </motion.div>
              </div>

              <div className="p-8 rounded-[32px] bg-brand-green/5 border border-brand-green/10 space-y-6 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase text-brand-green/45">Metrics Summary // Verified Pure</span>
                
                <div className="divide-y divide-brand-green/10">
                  {currentData.metrics.map((metric, i) => (
                    <div key={i} className="py-4.5 flex justify-between items-baseline first:pt-0 last:pb-0">
                      <span className="text-xs font-semibold text-brand-green/80 uppercase tracking-wider">
                        {metric.label}
                      </span>
                      <span className="font-serif text-lg text-brand-purple font-medium">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-[#FBFBFA]/80 border border-brand-green/5 flex items-center space-x-3 mt-4">
                  <span className="w-2 h-2 rounded-full bg-brand-sprout animate-ping" />
                  <span className="text-[11px] font-mono text-brand-green/70 uppercase tracking-widest leading-none">
                    Non-GMO Project Verified • 100% Plant-Based
                  </span>
                </div>
              </div>

              {/* Small interactive visual element */}
              <div className="p-6 rounded-[24px] border border-brand-green/10 flex items-center justify-between text-left">
                <div>
                  <h4 className="text-xs font-bold uppercase text-brand-green tracking-wider">Trace raw supply lines?</h4>
                  <p className="text-[11px] text-brand-green/60 mt-0.5">Access lab analytics & agricultural sourcing coordinates.</p>
                </div>
                <button
                  id={`btn-analytics-${currentData.id}`}
                  onClick={() => setInspectingData(currentData.name)}
                  className="px-4 py-2.5 rounded-full bg-brand-green text-[#FBFBFA] text-[10px] font-semibold uppercase tracking-wider hover:bg-[#4A3B4E] transition-all cursor-pointer"
                >
                  Inspect Assays
                </button>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* Immersive Trace Analysis Drawer Modal */}
      <AnimatePresence>
        {inspectingData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-[32px] border border-brand-green/10 p-8 max-w-lg w-full shadow-2xl relative space-y-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#10B981] font-bold">Traceability Assays</span>
                  <h3 className="font-serif text-xl text-brand-green font-medium mt-1">Chemical Spectrum Analysis</h3>
                </div>
                <button 
                  onClick={() => setInspectingData(null)}
                  className="px-2 py-1 text-xs rounded-full hover:bg-brand-green/5 text-brand-green/50 hover:text-brand-green transition-colors cursor-pointer"
                >
                  Close [×]
                </button>
              </div>

              <div className="space-y-4 text-xs text-left">
                <p className="text-brand-green/80 leading-relaxed font-sans font-light">
                  Showing official laboratory diagnostic assays for <strong className="text-brand-purple">{inspectingData}</strong>. Every Oria production campaign undergoes independent mass-spectrometer scrutiny.
                </p>

                <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-brand-green/5 font-mono space-y-2 text-[11px] text-brand-green/80">
                  <div className="flex justify-between">
                    <span className="font-bold">Heavy Metals Assays:</span>
                    <span className="text-[#10B981] font-bold">PASSED [ND]</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Pesticide Residue Assays:</span>
                    <span className="text-[#10B981] font-bold">PASSED [0.00%]</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Mycotoxins Evaluation:</span>
                    <span className="text-[#10B981] font-bold">PASSED [ND]</span>
                  </div>
                  <div className="flex justify-between border-t border-brand-green/10 pt-2 mt-2">
                    <span className="font-bold">Ecological Footprint:</span>
                    <span className="text-[#10B981] font-bold">-0.42 kg CO2e</span>
                  </div>
                </div>

                <p className="text-[10px] text-brand-green/50 leading-relaxed font-light">
                  ND: Non-Detected. Verified clean of arsenic, mercury, lead, copper, glyphosate, and industrial runoff elements. Certified Carbon-Negative under Oria agrarian standard protocol.
                </p>
              </div>

              <div className="pt-4 border-t border-brand-green/5 flex justify-end">
                <button 
                  onClick={() => setInspectingData(null)}
                  className="px-6 py-2.5 rounded-full bg-brand-green text-[#FBFBFA] text-[11px] font-semibold uppercase tracking-widest hover:bg-[#4A3B4E] transition-colors cursor-pointer"
                >
                  Acknowledge Assays
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Circular reading progress indicator */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            className="fixed bottom-6 right-6 z-50 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-brand-green/10 shadow-xl flex items-center gap-3 w-64 md:w-auto"
          >
            <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
              {/* Background track */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#FAF1E6" strokeWidth="2.5" />
                <motion.circle 
                  cx="18" 
                  cy="18" 
                  r="15" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="3" 
                  strokeDasharray="94.24" // 2 * PI * r (approx 94.2)
                  animate={{ strokeDashoffset: 94.24 - (94.24 * scrollProgress) / 100 }}
                  transition={{ duration: 0.1, ease: 'easeOut' }}
                />
              </svg>
              <span className="absolute text-[10px] font-mono font-bold text-brand-green">
                {Math.round(scrollProgress)}%
              </span>
            </div>
            <div className="text-left font-sans flex-1">
              <p className="text-[9px] font-bold text-[#10B981] uppercase tracking-widest leading-none">Ingredient Spotlight</p>
              <p className="text-[11px] font-medium text-brand-green/80 mt-1 leading-none">{remainingSeconds}s remaining read</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
