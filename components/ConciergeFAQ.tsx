'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  topic: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    topic: 'Millet Processing',
    question: 'How is the raw, organic millet processed to preserve nutrients?',
    answer: 'We sprouted-dry and stone-grind our whole millets under gentle solar temperatures, completely avoiding high-temp roasting. This retains the native grain fiber structures and prevents enzyme degradation.',
  },
  {
    id: 'faq-2',
    topic: 'Shelf Life & Integrity',
    question: 'What is the shelf life, and are there artificial stabilizers?',
    answer: 'We utilize dry-nitrogen flushing without chemical preservatives to naturally preserve freshness. The Morning Fuel bars remain fresh for 6 months, and our dry blend shake powder stays active for 12 months.',
  },
  {
    id: 'faq-3',
    topic: 'Packaging & Sustainability',
    question: 'Are your glass jars and shipping containers fully recyclable?',
    answer: 'Yes, our jars are premium frosted glass intended for reusable storage, and bulk powders ship in fully compostable pouches. Even our shipping boxes are sealed with non-synthetic, water-activated starch paper.',
  },
  {
    id: 'faq-4',
    topic: 'Shipping & Transport',
    question: 'What are your delivery times, and do you ship globally?',
    answer: 'Orders are blended and shipped fresh twice per week. Domestic carbon-neutral shipping takes 2-4 business days, while international priority takes 5-9 days.',
  },
  {
    id: 'faq-5',
    topic: 'Cellular Digestibility',
    question: 'Is raw millet safe for highly sensitive autoimmune systems?',
    answer: 'Sprouted millet is naturally alkaline, hypoallergenic, and entirely gluten-free. The warm sprouting process breaks down phytates, making it exceptionally light on the digestion.',
  },
];

export default function ConciergeFAQ() {
  const [activeId, setActiveId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section
      id="concierge-faq-section"
      className="w-full min-h-screen pt-8 pb-8 relative overflow-hidden bg-[#261c29]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Label Block */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white border border-brand-green/10 text-brand-green text-[10px] sm:text-[11px] font-bold uppercase tracking-widest"
          >          
            <Sparkles size={14} className="text-brand-green animate-pulse" />
            <p className="text-[12px] font-bold uppercase tracking-widest">
              Oria Concierge
            </p>
          </div>
          <h2 className="pt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-white leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-white/100 max-w-2xl mx-auto mt-6 font-light font-serif">
            Everything you need to know about our organic, high-nutrition sprouted millet, shelf life, and sustainable distribution.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4" id="faq-accordion-group">
          {FAQ_ITEMS.map((item) => {
            const isOpen = activeId === item.id;
            return (
              <div
                key={item.id}
                id={`faq-item-card-${item.id}`}
                className={`rounded-[24px] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#E2D7E5] border-brand-green/15 shadow-sm text-black font-serif'
                    : 'bg-[#E2D7E5] border-brand-green/5 hover:border-brand-green/10 text-black font-serif'
                }`}
              >
                {/* Header/Trigger */}
                <button
                  id={`faq-trigger-${item.id}`}
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between p-6 sm:p-7 text-left gap-4 cursor-pointer group"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-serif tracking-widest uppercase text-black/50 font-semibold">
                      {item.topic}
                    </span>
                    <h3 className="text-md sm:text-lg font-serif font-medium text-black group-hover:text-[#10B981] transition-colors duration-250">
                      {item.question}
                    </h3>
                  </div>

                  {/* Animated Chevron Indicator */}
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#1E2D24] border-[#1E2D24] text-white'
                        : 'border-brand-green/10 text-brand-green group-hover:border-brand-green/20'
                    }`}
                  >
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </div>
                </button>

                {/* Animated Body Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-6 pb-7 sm:px-7 sm:pb-8 text-md text-green/15 leading-relaxed font-serif border-t border-brand-green/15 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Call to action card */}
        <div className="mt-16 bg-[#E2D7E5] rounded-[28px] p-8 text-black relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Subtle decoration */}
          <div className="absolute right-0 top-0 w-32 h-32 bg-brand-sprout/5 rounded-full blur-2xl" />

          <div>
            <h4 className="font-serif text-lg font-medium">Still have questions about our grains?</h4>
            <p className="text-[14px] text-black font-serif tracking-wider mt-2">
              Speak with a certified bio-nutritionist on our concierge desk
            </p>
          </div>
          <a
            href="mailto:concierge@oriawellness.com"
            className="flex-shrink-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest bg-[#10B981] text-black hover:bg-[#261c29] hover:text-[#10B981] active:scale-95 transition-all duration-300 px-6 py-3.5 rounded-full"
          >
            Ask Oria Support <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
