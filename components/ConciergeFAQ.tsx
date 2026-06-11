'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

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
      className="py-24 bg-[#E2D7E5] border-t border-brand-green/5"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-12">
        {/* Label Block */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#10B981] mb-3 inline-flex items-center gap-1.5 justify-center">
            <HelpCircle size={12} className="text-brand-sprout" /> Oria Concierge
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E2D24] font-medium leading-none tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-brand-green/70 leading-relaxed font-sans max-w-md mx-auto">
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
                    ? 'bg-[#1E2D24] border-brand-green/15 shadow-sm text-white font-mono'
                    : 'bg-[#1E2D24] border-brand-green/5 hover:border-brand-green/10 text-white font-mono'
                }`}
              >
                {/* Header/Trigger */}
                <button
                  id={`faq-trigger-${item.id}`}
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between p-6 sm:p-7 text-left gap-4 cursor-pointer group"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] font-mono tracking-widest uppercase text-white/50 font-semibold">
                      {item.topic}
                    </span>
                    <h3 className="text-xs sm:text-sm font-serif font-medium text-white group-hover:text-[#10B981] transition-colors duration-250">
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
                      <div className="px-6 pb-7 sm:px-7 sm:pb-8 text-sm text-green/15 leading-relaxed font-mono border-t border-brand-green/15 pt-4">
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
        <div className="mt-16 bg-[#1E2D24] rounded-[28px] p-8 text-white relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Subtle decoration */}
          <div className="absolute right-0 top-0 w-32 h-32 bg-brand-sprout/5 rounded-full blur-2xl" />

          <div>
            <h4 className="font-serif text-lg font-medium">Still have questions about our grains?</h4>
            <p className="text-[11px] text-white/50 font-mono tracking-wider mt-1.5">
              Speak with a certified bio-nutritionist on our concierge desk
            </p>
          </div>
          <a
            href="mailto:concierge@oriawellness.com"
            className="flex-shrink-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest bg-[#10B981] text-white hover:bg-neutral-100 hover:text-[#1E2D24] active:scale-95 transition-all duration-300 px-6 py-3.5 rounded-full"
          >
            Ask Oria Support <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
