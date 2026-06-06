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
    answer: 'At Oria, we employ cold-milled, dynamic dehydration rather than standard structural roasting. We wash the whole grain twice, dehydrate it under warm solar temperatures to naturally sprout the micro-roots and activate the biological enzymes, then stone-grind it gently to avoid thermal expansion. This preserves cellular fiber chains.',
  },
  {
    id: 'faq-2',
    topic: 'Shelf Life & Integrity',
    question: 'What is the shelf life, and are there artificial stabilizers?',
    answer: 'None of our food formulations contain artificial preservatives, industrial emulsifiers, or fillers. We packaging using dry-nitrogen flushing in customized recycled-kraft pouches to naturally extend cellular integrity. The Morning Fuel bars remain completely fresh for 6 months, and our dry Rise Shake powder stays active for 12 months when stored in a cool place away from humidity.',
  },
  {
    id: 'faq-3',
    topic: 'Packaging & Sustainability',
    question: 'Are your glass jars and shipping containers fully recyclable?',
    answer: 'Absolutely. Environmental stewardship is aligned with human health. Our Rise Blend comes in frosted glass premium jars intended for zero-waste repurposing, and our bulk dry powders are shipped in compostable PLA pouches. Cartons are bound with water-activated starch paper instead of synthetic adhesive films.',
  },
  {
    id: 'faq-4',
    topic: 'Shipping & Transport',
    question: 'What are your delivery times, and do you ship globally?',
    answer: 'We mix and pack orders fresh twice a week in our boutique kitchen. Standard domestic carbon-neutral transit takes 2-4 business days. International direct priority takes 5-9 business days depending on customs protocols. High-end shipping tracking codes are provided instantly via SMS or email.',
  },
  {
    id: 'faq-5',
    topic: 'Cellular Digestibility',
    question: 'Is raw millet safe for highly sensitive autoimmune systems?',
    answer: 'Whole grain millet is alkaline, entirely gluten-free, and lacks standard seed-defense proteins like lectins or high saponins. Our warm dehydration sprouting phase breaks down complex phytates and release micro-nutrients, resulting in an ultra-smooth, hypoallergenic digestive integration.',
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
      className="py-24 bg-[#FBFBFA] border-t border-brand-green/5"
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
                    ? 'bg-brand-cream border-brand-green/15 shadow-sm'
                    : 'bg-white border-brand-green/5 hover:border-brand-green/10'
                }`}
              >
                {/* Header/Trigger */}
                <button
                  id={`faq-trigger-${item.id}`}
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between p-6 sm:p-7 text-left gap-4 cursor-pointer group"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] font-mono tracking-widest uppercase text-brand-yellow/80 font-semibold">
                      {item.topic}
                    </span>
                    <h3 className="text-xs sm:text-sm font-medium text-brand-green group-hover:text-[#10B981] transition-colors duration-250">
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
                      <div className="px-6 pb-7 sm:px-7 sm:pb-8 text-xs text-brand-green/80 leading-relaxed font-sans border-t border-brand-green/5 pt-4">
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
