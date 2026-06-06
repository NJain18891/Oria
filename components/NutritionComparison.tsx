'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Info, ShieldCheck, Flame, Scale, Activity } from 'lucide-react';

interface ComparisonMetric {
  name: string;
  oriaValue: string;
  oriaScore: number; // 0-100 for visual health bars
  oriaOptimal: boolean;
  competitorValue: string;
  competitorScore: number;
  competitorOptimal: boolean;
  explanation: string;
}

interface CompetitorProfile {
  id: string;
  label: string;
  typeName: string;
  subTitle: string;
  summary: string;
  metrics: ComparisonMetric[];
}

const COMPARISON_DATA: CompetitorProfile[] = [
  {
    id: 'whey',
    label: 'Processed Whey',
    typeName: 'Commercial Whey Isolate Shakes',
    subTitle: 'The Hyper-Processed Dairy Extraction',
    summary: 'Whey protein is derived from commercial cheese-making waste. It undergoes heavy thermal acid filtration, completely stripping complex digestive co-factors. High levels of synthetic thickeners, artificial sweeteners, and soy lecithin emulsifiers are added to mask chemical chalkiness.',
    metrics: [
      {
        name: 'Glycemic Stability',
        oriaValue: 'Ultralow (GI 43) • No spikes',
        oriaScore: 92,
        oriaOptimal: true,
        competitorValue: 'High insulin spikes due to sugar & whey factors',
        competitorScore: 35,
        competitorOptimal: false,
        explanation: 'Ancient millets release bound carbohydrates over 5 hours, keeping baseline blood sugar flat. Whey triggers high insulin spikes due to rapid amino acid dumping.'
      },
      {
        name: 'Chemical Additives & gums',
        oriaValue: '0% Absolute Zero • Clean label',
        oriaScore: 100,
        oriaOptimal: true,
        competitorValue: 'Gum fillers, sucralose, artificial flavorings',
        competitorScore: 15,
        competitorOptimal: false,
        explanation: 'Oria contains zero xanthan gum, lecithin, carrageenan, or sucralose. We utilize sun-dried date fibers and prebiotic plants for structure.'
      },
      {
        name: 'Prebiotic Fiber Buffer',
        oriaValue: '3.6g of organic prebiotic matrix',
        oriaScore: 88,
        oriaOptimal: true,
        competitorValue: '0g of fiber • High bloating index',
        competitorScore: 10,
        competitorOptimal: false,
        explanation: 'Dietary fiber slows digesting, soothing the gut lining. Whey possesses zero fiber, leaving users with gas and upper-GI digestion friction.'
      },
      {
        name: 'Heavy Metal Transparency',
        oriaValue: '100% ICP-MS Spectroscopy Tested',
        oriaScore: 98,
        oriaOptimal: true,
        competitorValue: 'Non-transparent commercial batching',
        competitorScore: 40,
        competitorOptimal: false,
        explanation: 'We publish independent laboratory spectroscopy certificates for every single batch of millets. Industrial whey is rarely authenticated for pesticide run-offs.'
      },
      {
        name: 'Micronutrient Profile',
        oriaValue: 'Rich in Iron, Silica & ATP minerals',
        oriaScore: 85,
        oriaOptimal: true,
        competitorValue: 'Strip-refined with synthetic vitamins added',
        competitorScore: 30,
        competitorOptimal: false,
        explanation: 'Millets are naturally dense with essential magnesium, manganese, iron, and structure-helping botanical silica. Whey retains almost no native minerals.'
      }
    ]
  },
  {
    id: 'synthetic-meal',
    label: 'Synthetic Slim Meal',
    typeName: 'Synthetic Weight-Loss Drinks',
    subTitle: 'Maltodextrin-Heavy Meal Replacements',
    summary: 'Slimming products rely on cheap maltodextrin (with a Glycemic Index of up to 110, higher than white table sugar) to yield texture, combined with processed seed oils (sunflower, canola) and cheap bulk lab-engineered synthetic multi-vitamins.',
    metrics: [
      {
        name: 'Glycemic Stability',
        oriaValue: 'Slow Release (GI 43)',
        oriaScore: 92,
        oriaOptimal: true,
        competitorValue: 'Extreme Glycemic Spikes (GI 95-110)',
        competitorScore: 20,
        competitorOptimal: false,
        explanation: 'Maltodextrin spikes sugar levels forcing instant lethargic crashes. Oria utilizes slow-burning ancient grains to optimize active cognitive flow.'
      },
      {
        name: 'Lipid Oil Quality',
        oriaValue: 'Unrefined stoneground fats only',
        oriaScore: 90,
        oriaOptimal: true,
        competitorValue: 'Refined sunflower & seed oil emulsions',
        competitorScore: 25,
        competitorOptimal: false,
        explanation: 'Oria contains no industrially deodorized seed oils which promote arterial oxidation. We utilize raw kernel proteins and whole seeds.'
      },
      {
        name: 'Source Sincerity',
        oriaValue: '100% Whole Food Ancient Grains',
        oriaScore: 100,
        oriaOptimal: true,
        competitorValue: 'Engineered chemical powder isolates',
        competitorScore: 30,
        competitorOptimal: false,
        explanation: 'Our ingredients are planted, harvested, and ground in their native states without heavy petrochemical solvents or molecular separations.'
      },
      {
        name: 'Dietary Satiety Period',
        oriaValue: '4 to 5 Hours sustained fullness',
        oriaScore: 90,
        oriaOptimal: true,
        competitorValue: '1 to 2 Hours rapid digestive clearing',
        competitorScore: 45,
        competitorOptimal: false,
        explanation: 'Sustained satiety is achieved by low-GI complex carbohydrate matrixing paired with native fibers. Soluble sugars leave you starving within 90 minutes.'
      }
    ]
  },
  {
    id: 'oat-bar',
    label: 'Commercial Oat Bars',
    typeName: 'Syrup-Heavy Energy Oat Bars',
    subTitle: 'The Pre-Baked Sugar Standard',
    summary: 'While masquerading as wholesome, commercial oat and protein bars are heavily processed. Their grains are bound with high-fructose syrups, concentrated fruit juice pulps, and baked at high temperatures, turning starch into easily digestible glucose.',
    metrics: [
      {
        name: 'Glycemic Stability',
        oriaValue: 'Fibers and grain matrix intact (GI 43)',
        oriaScore: 92,
        oriaOptimal: true,
        competitorValue: 'Pre-gelatinized fast starches (GI 80+)',
        competitorScore: 40,
        competitorOptimal: false,
        explanation: 'Intense baking gelatinizes oat starches so they digest immediately. Oria grains are kept intact and stoneground raw, conserving complex structural bonds.'
      },
      {
        name: 'Free From Added Sugars',
        oriaValue: '0% Refined Sweeteners • Sweetened by Monkfruit',
        oriaScore: 98,
        oriaOptimal: true,
        competitorValue: 'Over 14g of glucose binders and syrups',
        competitorScore: 20,
        competitorOptimal: false,
        explanation: 'Most bars require copious syrups to stay solid. Oria powders completely avoid sugar paste and sweeten via gentle, zero-glycemic steviol & mogroside compounds.'
      },
      {
        name: 'Essential Amino Array',
        oriaValue: 'Complete amino profile with split peas',
        oriaScore: 88,
        oriaOptimal: true,
        competitorValue: 'Incomplete or heavy soy-protein fillers',
        competitorScore: 50,
        competitorOptimal: false,
        explanation: 'Oria contains a highly bio-available profile with a complete DIAAS amino acid ledger. Simple oats lack critical muscle repairing components.'
      }
    ]
  }
];

export default function NutritionComparison() {
  const [activeCompId, setActiveCompId] = useState<string>('whey');
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  const activeComp = COMPARISON_DATA.find((c) => c.id === activeCompId) || COMPARISON_DATA[0];

  return (
    <section
      id="oria-nutrition-comparison"
      className="py-24 bg-white border-t border-brand-green/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Title Block */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-purple mb-3.5 inline-flex items-center gap-1.5">
            <Activity size={12} className="text-[#10B981]" /> Scientific Contrast
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-green leading-[1.12]">
            Whole Food Nutrition vs. <br className="hidden sm:inline" />
            <span className="italic text-brand-purple">Processed Isolation</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-brand-green/70 max-w-xl mx-auto leading-relaxed">
            Many healthy options rely on molecular isolates and cheap chemical fillers that strain your gut. Compare how Oria remains metabolically distinct.
          </p>

          {/* Competitor Selector Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-10">
            {COMPARISON_DATA.map((comp) => (
              <button
                key={comp.id}
                id={`btn-alt-select-${comp.id}`}
                onClick={() => setActiveCompId(comp.id)}
                className={`px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 border cursor-pointer ${
                  comp.id === activeCompId
                    ? 'bg-[#1E2D24] text-[#10B981] border-[#1E2D24]'
                    : 'bg-[#FBFBFA] text-brand-green border-brand-green/10 hover:border-brand-green/30'
                }`}
              >
                vs. {comp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Oria Column (Always Left on Large) - 6 Columns */}
          <div className="lg:col-span-6 bg-brand-green/[0.02] border border-[#10B981]/15 rounded-[40px] p-8 sm:p-10 relative">
            {/* Sparkling premium badge */}
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-white bg-[#10B981] py-1 px-3 rounded-full shadow-sm">
                <ShieldCheck size={10} className="animate-pulse" /> The Oria Standard
              </span>
            </div>

            <div className="space-y-2 mb-8">
              <span className="text-[10px] font-mono text-[#10B981] uppercase tracking-widest font-semibold">Native Nutrition</span>
              <h3 className="font-serif text-2xl text-brand-green font-medium">Stoneground Ancient Millets</h3>
              <p className="text-xs text-brand-green/70 leading-relaxed font-sans max-w-md">
                We grind clean whole millets with native fiber buffers. Because starch is structurally linked within complex grain cells, starches break down safely over hours.
              </p>
            </div>

            {/* Metric Bars */}
            <div className="space-y-6">
              {activeComp.metrics.map((metric, i) => (
                <div
                  key={metric.name}
                  id={`oria-metric-row-${i}`}
                  onMouseEnter={() => setHoveredMetric(metric.name)}
                  onMouseLeave={() => setHoveredMetric(null)}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    hoveredMetric === metric.name 
                      ? 'bg-white border-[#10B981]/30 shadow-md' 
                      : 'bg-white/40 border-transparent hover:border-[#10B981]/15'
                  }`}
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs font-semibold text-brand-green uppercase tracking-wider">{metric.name}</span>
                    <span className="text-[10px] font-mono font-bold text-[#10B981] flex items-center gap-1 uppercase">
                      <Check size={11} /> Optimal
                    </span>
                  </div>
                  
                  {/* Styled Level Meter */}
                  <div className="w-full bg-brand-green/5 h-1.5 rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.oriaScore}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="bg-gradient-to-r from-[#10B981] to-brand-sprout h-full rounded-full"
                    />
                  </div>

                  <p className="text-xs font-medium text-brand-green text-left">
                    {metric.oriaValue}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Competitor Contrast Column - 6 Columns */}
          <div className="lg:col-span-6 bg-[#FAF9F5] border border-brand-green/5 rounded-[40px] p-8 sm:p-10 relative flex flex-col justify-between h-full">
            <div>
              <div className="space-y-2 mb-8">
                <span className="text-[10px] font-mono text-brand-purple uppercase tracking-widest font-semibold">Contrast profile</span>
                <span className="font-serif text-2xl text-brand-green font-medium block">
                  {activeComp.typeName}
                </span>
                <p className="text-xs text-brand-green/70 leading-relaxed font-sans mt-2">
                  {activeComp.summary}
                </p>
              </div>

              {/* Competitor Metrics */}
              <div className="space-y-6">
                {activeComp.metrics.map((metric, i) => (
                  <div
                    key={metric.name}
                    id={`comp-metric-row-${i}`}
                    onMouseEnter={() => setHoveredMetric(metric.name)}
                    onMouseLeave={() => setHoveredMetric(null)}
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
                      hoveredMetric === metric.name 
                        ? 'bg-white border-brand-purple/20 shadow-md' 
                        : 'bg-white/40 border-transparent hover:border-brand-purple/10'
                    }`}
                  >
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xs font-semibold text-brand-green uppercase tracking-wider">{metric.name}</span>
                      <span className="text-[10px] font-mono font-bold text-brand-purple/80 flex items-center gap-1 uppercase">
                        <X size={11} className="text-brand-purple" /> Synthetic / Suboptimal
                      </span>
                    </div>

                    {/* Styled Level Meter */}
                    <div className="w-full bg-brand-green/5 h-1.5 rounded-full overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.competitorScore}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="bg-brand-purple/50 h-full rounded-full"
                      />
                    </div>

                    <p className="text-xs font-medium text-brand-green/90 text-left">
                      {metric.competitorValue}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Informational Context Box */}
            <div className="mt-8 p-4.5 rounded-2xl bg-white border border-brand-green/5 text-left flex items-start space-x-3">
              <Info size={16} className="text-brand-purple flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[11px] font-bold uppercase text-brand-green tracking-wider">Metabolic Factsheet</h4>
                <p className="text-[11px] text-brand-green/70 mt-1 leading-relaxed">
                  Oria starch structures are naturally bound with prebiotic lipids and proteins, meaning enzymes take hours to separate starch into sugar. Synthetics are stripped clean, meaning they crash into the duodenum instantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparative explanation narrative drawer */}
        <div className="mt-12 bg-brand-cream/30 p-6 rounded-[28px] border border-brand-green/5 text-left">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#1E2D24] mb-3 flex items-center gap-1.5">
            <Flame size={12} className="text-brand-sprout" /> Biochemical Insight
          </h4>
          <p className="text-xs sm:text-sm text-brand-green/85 leading-relaxed font-sans font-light">
            {activeCompId === 'whey' && 'Our ancient, stoneground millets preserve the intact cellular architecture of starch. This slow-absorption biochemistry represents a massive paradigm shift from isolate-heavy nutrition, protecting the pancreatic insulin reserves from chronic long-term oxidative fatigue.'}
            {activeCompId === 'synthetic-meal' && 'Bulk replacement formulations are designed solely on calories and volume, which triggers bloating. Pure whole-food millets act as a physical prebiotic gel matrices in the gastrointestinal canal, maintaining nutrient delivery for over four solid hours.'}
            {activeCompId === 'oat-bar' && 'Bake-heating breaks the alpha-glucan grain chains so they dissolve too quickly, producing simple sugar-laden spikes. Oria avoids heat-damaging baking processes, preserving the structural complex bonds so starches digest at their natural pace.'}
          </p>
        </div>

      </div>
    </section>
  );
}
