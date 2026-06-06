'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import NarrativeHook from '@/components/NarrativeHook';
import IngredientSpotlight from '@/components/IngredientSpotlight';
import ProductCatalog from '@/components/ProductCatalog';
import BottomStickyBar from '@/components/BottomStickyBar';
import CartDrawer from '@/components/CartDrawer';
import { Mail, Compass, HelpCircle, Heart, Anchor, Sun } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const [emailInput, setEmailInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    setNewsletterSubscribed(true);
    setEmailInput('');
  };

  return (
    <main className="min-h-screen bg-[#FBFBFA] selection:bg-[#10B981] selection:text-[#FBFBFA] overflow-x-hidden">
      {/* Global Interactive Elements */}
      <Header />
      <CartDrawer />
      <BottomStickyBar />

      {/* Narrative Section Sequence */}
      <Hero />
      
      <NarrativeHook />
      
      <IngredientSpotlight />
      
      <ProductCatalog />

      {/* Dynamic Brand Value Grid (Aesthetic Bento) */}
      <section className="py-20 bg-[#FBFBFA] border-t border-brand-green/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="p-8 rounded-[24px] border border-brand-green/5 bg-brand-green/5 hover:border-brand-green/10 transition-colors text-left space-y-4">
              <span className="text-xl">🏔️</span>
              <h4 className="font-serif text-base text-brand-green font-medium">Traceable Sourcing</h4>
              <p className="text-xs text-brand-green/70 leading-relaxed font-light">
                We contract harvest every millet batch directly from generational farmers in the ancient Indus soil belts, guaranteeing biological purity.
              </p>
            </div>

            <div className="p-8 rounded-[24px] border border-brand-green/5 bg-brand-green/5 hover:border-brand-green/10 transition-colors text-left space-y-4">
              <span className="text-xl">🛡️</span>
              <h4 className="font-serif text-base text-brand-green font-medium">Zero Synthetic Compromise</h4>
              <p className="text-xs text-brand-green/70 leading-relaxed font-light">
                No artificial emulsifiers, soy, gums, heavy metal isolates, or chalky synthetics. Standardized nutrition cleanly extracted from true food structures.
              </p>
            </div>

            <div className="p-8 rounded-[24px] border border-brand-green/5 bg-brand-green/5 hover:border-brand-green/10 transition-colors text-left space-y-4">
              <span className="text-xl">🌿</span>
              <h4 className="font-serif text-base text-brand-green font-medium">Carbon-Negative Footprint</h4>
              <p className="text-xs text-brand-green/70 leading-relaxed font-light">
                Millet crops are exceptionally resilient and carbon-locking, requiring zero global irrigation networks. We offset 120% of distribution gases.
              </p>
            </div>

            <div className="p-8 rounded-[24px] border border-brand-green/5 bg-brand-green/5 hover:border-brand-green/10 transition-colors text-left space-y-4">
              <span className="text-xl">🌾</span>
              <h4 className="font-serif text-base text-brand-green font-medium">Digestive Resilience</h4>
              <p className="text-xs text-brand-green/70 leading-relaxed font-light">
                Infused with premium prebiotic fiber strands to nourish the human gut flora, optimize nutrient passage speed, and eliminate bloating.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Premium Brand Editorial Footer */}
      <footer className="bg-[#1E2D24] text-[#FBFBFA]/90 pt-24 pb-12 border-t border-brand-green/15 relative overflow-hidden">
        
        {/* Soft abstract graphic background */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-sprout blur-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#FBFBFA]/10">
            {/* Title / Slogan Column */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-serif text-4xl tracking-widest text-[#FBFBFA] font-medium">
                ORIA
              </h3>
              <p className="text-sm text-[#FBFBFA]/70 leading-relaxed font-light max-w-sm">
                Sustainably crafted whole-food morning rituals. Reclaiming human nutrition with the ancient, enduring intelligence of organic millets.
              </p>
              
              <div className="flex items-center space-x-3 text-xs text-[#FBFBFA]/50 uppercase tracking-widest font-mono">
                <Compass size={14} className="text-[#10B981] animate-spin-slow" />
                <span>Indus Valley • Organic Co-Op Harvest</span>
              </div>
            </div>

            {/* Newsletter Dispatch Component */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="font-serif text-lg font-medium text-[#FBFBFA]">
                Subscribe to Oria Dispatch
              </h4>
              <p className="text-xs text-[#FBFBFA]/60 leading-relaxed font-light">
                Receive botanical research diaries, early limited-harvest product announcements, and nutritional assays. No spam. One email per month.
              </p>

              {newsletterSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl border border-brand-sprout/20 bg-brand-sprout/10 flex items-center space-x-3 text-brand-sprout text-xs"
                >
                  <Sun size={14} className="animate-pulse" />
                  <span>Assay dispatcher active. Welcome to Oria, friend.</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-2.5 mt-2">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-grow px-4 py-3 text-xs bg-[#FBFBFA]/5 border border-[#FBFBFA]/10 rounded-full text-[#FBFBFA] focus:outline-none focus:border-[#10B981] placeholder-[#FBFBFA]/40 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-[#10B981] text-[#1E2D24] text-xs font-bold uppercase tracking-widest hover:bg-[#059669] hover:text-white transition-all transform hover:-translate-y-0.5 duration-300"
                  >
                    Dispatch
                  </button>
                </form>
              )}
            </div>

            {/* Directory Link Column */}
            <div className="lg:col-span-3 grid grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <h5 className="text-[10px] uppercase tracking-widest font-bold text-[#FBFBFA]/40">Explorations</h5>
                <ul className="space-y-2.5 text-xs font-light">
                  <li><a href="#story" className="hover:text-[#10B981] transition-colors">Our Sourcing</a></li>
                  <li><a href="#story" className="hover:text-[#10B981] transition-colors">Glycemic Science</a></li>
                  <li><a href="#shop" className="hover:text-[#10B981] transition-colors">Millet Bar</a></li>
                  <li><a href="#shop" className="hover:text-[#10B981] transition-colors">Rise Blend</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="text-[10px] uppercase tracking-widest font-bold text-[#FBFBFA]/40">Integrity</h5>
                <ul className="space-y-2.5 text-xs font-light">
                  <li><a onClick={() => alert('Assays: Heavy metal clean, 100% natural pesticide-free soil chromatography.')} className="hover:text-[#10B981] transition-colors cursor-pointer">Heavy Metal Assays</a></li>
                  <li><a onClick={() => alert('Tracing: GPS coordinates available for organic Indus valley farms upon reservation.')} className="hover:text-[#10B981] transition-colors cursor-pointer">GPS Sourcing Maps</a></li>
                  <li><a onClick={() => alert('Delivery: Zero-waste certified recyclable cardboard and plant-starch binders.')} className="hover:text-[#10B981] transition-colors cursor-pointer">Eco Logistics</a></li>
                  <li><a onClick={() => alert('Support: Send questions to concierge@oria.wellness for immediate personal clinical assistance.')} className="hover:text-[#10B981] transition-colors cursor-pointer">Concierge Care</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sub-footer Legalities */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#FBFBFA]/40 space-y-4 md:space-y-0">
            <p className="order-2 md:order-1 font-light">
              &copy; {new Date().getFullYear()} Oria Wellness Corporation. All rights reserved. Sourced with deep respect.
            </p>
            <div className="flex items-center space-x-6 order-1 md:order-2">
              <span className="flex items-center space-x-1 hover:text-[#FBFBFA] transition-colors select-none">
                <Anchor size={11} />
                <span>Indus Cooperative Co.</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1 hover:text-[#FBFBFA] transition-colors select-none">
                <Heart size={11} className="text-brand-sprout" />
                <span>Carbon Neutral</span>
              </span>
            </div>
          </div>

        </div>
      </footer>
    </main>
  );
}
