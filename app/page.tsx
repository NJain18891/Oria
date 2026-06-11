'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import OriaLogo from '@/components/OriaLogo';
import ProductCatalog from '@/components/ProductCatalog';
import BottomStickyBar from '@/components/BottomStickyBar';
import CartDrawer from '@/components/CartDrawer';
import CheckoutFlow from '@/components/CheckoutFlow';
import LoadingOverlay from '@/components/LoadingOverlay';
import CommunityRituals from '@/components/CommunityRituals';
import ConciergeFAQ from '@/components/ConciergeFAQ';
import FindYourRitualQuiz from '@/components/FindYourRitualQuiz';
import NutritionComparison from '@/components/NutritionComparison';
import ValueBentoGrid from '@/components/ValueBentoGrid';
import { Mail, Compass, HelpCircle, Heart, Anchor, Sun, X, CheckCircle, ArrowUp } from 'lucide-react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';

export default function Home() {
  const [emailInput, setEmailInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Force scroll position to the top of the viewport on initial page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Monitor scroll height to show/hide bottom right scroll button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Synchronize the HTML document class for accessible styling overrides
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('theme-high-contrast');
    } else {
      document.documentElement.classList.remove('theme-high-contrast');
    }
  }, [highContrast]);
  
  // Custom elegant state to manage boutique notifications instead of window.alert()
  const [notification, setNotification] = useState<{ show: boolean; msg: string; type: 'success' | 'info' | 'error' }>({
    show: false,
    msg: '',
    type: 'info'
  });

  const triggerNotification = (msg: string, type: 'success' | 'info' | 'error' = 'info') => {
    setNotification({ show: true, msg, type });
    setTimeout(() => {
      setNotification((prev) => (prev.msg === msg ? { ...prev, show: false } : prev));
    }, 4500);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      triggerNotification('Please enter a valid cellular dispatch email address.', 'error');
      return;
    }
    setNewsletterSubscribed(true);
    setEmailInput('');
    triggerNotification('You have successfully subscribed to Oria Dispatch.', 'success');
  };

  // Scroll Progress logic using standard framer-motion setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-screen bg-[#FBFBFA] selection:bg-[#10B981] selection:text-[#FBFBFA] overflow-x-hidden relative">
      
      {/* 1. Branded Loading Overlay */}
      <LoadingOverlay />

      {/* 2. Scroll Progress Bar */}
      <motion.div
        id="viewport-scroll-progress"
        className="fixed top-0 left-0 right-0 h-1 bg-[#10B981] origin-left z-[90] pointer-events-none"
        style={{ scaleX }}
      />

      {/* Global Interactive Elements */}
      <Header />
      <CartDrawer />
      <CheckoutFlow />
      <BottomStickyBar />

      {/* Narrative Section Sequence */}
      <Hero />

      {/* 2. Primary Product Showcase */}
      <ProductCatalog />

      {/* 5. Clean Nutrition vs Processing Comparison Metrics */}
      <NutritionComparison />

      {/* 1. Custom Interactive Daily Habit Matcher Quiz */}
      <FindYourRitualQuiz />

      {/* Dynamic Brand Value Grid (Aesthetic Bento with custom animations and click expand details) */}
      <ValueBentoGrid />

      {/* 6. Social Proof Collective Stories */}
      <CommunityRituals />

      {/* 7. Concierge Advisory and FAQs */}
      <ConciergeFAQ />

      {/* Premium Brand Editorial Footer */}
      <footer className="bg-[#1E2D24] text-[#FBFBFA]/90 pt-12 pb-12 border-t border-brand-green/15 relative overflow-hidden">
        
        {/* Soft abstract graphic background */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-sprout blur-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#FBFBFA]/10">
            {/* Title / Slogan Column */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-start">
              <div className="h-8 flex items-center">
                <a href="#" className="inline-block select-none" aria-label="Oria Wellness Home">
                  <OriaLogo className="w-32 h-16 text-[#FBFBFA] flex items-center justify-start" />
                </a>
              </div>
              <p className="text-xs sm:text-sm text-[#FBFBFA]/70 leading-relaxed font-light max-w-sm">
                Sustainably crafted whole-food morning rituals. Reclaiming human nutrition with the ancient, enduring intelligence of organic millets.
              </p>
              
              <div className="flex items-center space-x-3 text-xs text-[#FBFBFA]/50 uppercase tracking-widest font-mono pt-2">
                <Compass size={14} className="text-[#10B981] animate-spin-slow" />
                <span>Indus Valley • Organic Co-Op Harvest</span>
              </div>
            </div>

            {/* Newsletter Dispatch Component */}
            <div className="lg:col-span-4 space-y-4 flex flex-col justify-start">
              <div className="h-8 flex items-center">
                <h4 className="font-serif text-base sm:text-lg font-medium text-[#FBFBFA]">
                  Subscribe to Oria Dispatch
                </h4>
              </div>
              <p className="text-xs text-[#FBFBFA]/60 leading-relaxed font-light">
                Receive botanical research diaries, early limited-harvest product announcements, and nutritional assays. One email per month.
              </p>

              {newsletterSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl border border-brand-sprout/20 bg-brand-sprout/10 flex items-center space-x-3 text-[#10B981] text-xs mt-2"
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
                    className="px-6 py-3 rounded-full bg-[#10B981] text-[#1E2D24] text-xs font-bold uppercase tracking-widest hover:bg-[#059669] hover:text-white transition-all transform hover:-translate-y-0.5 duration-300 cursor-pointer"
                  >
                    Dispatch
                  </button>
                </form>
              )}
            </div>

            {/* Directory Link Column */}
            <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 gap-8 text-left">
              <div className="space-y-4 flex flex-col justify-start">
                <div className="h-8 flex items-center">
                  <h5 className="text-[10px] uppercase tracking-widest font-bold text-[#FBFBFA]/40">Explorations</h5>
                </div>
                <ul className="space-y-2.5 text-xs font-light text-[#FBFBFA]/75">
                  <li><a href="#story" className="hover:text-[#10B981] transition-colors">Our Sourcing</a></li>
                  <li><a href="#ingredients" className="hover:text-[#10B981] transition-colors">Glycemic Science</a></li>
                  <li><a href="#shop" className="hover:text-[#10B981] transition-colors">Millet Bar</a></li>
                  <li><a href="#shop" className="hover:text-[#10B981] transition-colors">Rise Blend</a></li>
                </ul>
              </div>
              <div className="space-y-4 flex flex-col justify-start">
                <div className="h-8 flex items-center">
                  <h5 className="text-[10px] uppercase tracking-widest font-bold text-[#FBFBFA]/40">Integrity</h5>
                </div>
                <ul className="space-y-2.5 text-xs font-light text-[#FBFBFA]/75">
                  <li><a onClick={() => triggerNotification('Assays: Heavy metal clean, 100% natural pesticide-free soil chromatography.', 'info')} className="hover:text-[#10B981] transition-colors cursor-pointer">Heavy Metal Assays</a></li>
                  <li><a onClick={() => triggerNotification('Tracing: GPS coordinates available for organic Indus valley farms upon reservation.', 'info')} className="hover:text-[#10B981] transition-colors cursor-pointer">GPS Sourcing Maps</a></li>
                  <li><a onClick={() => triggerNotification('Delivery: Zero-waste certified recyclable cardboard and plant-starch binders.', 'info')} className="hover:text-[#10B981] transition-colors cursor-pointer">Eco Logistics</a></li>
                  <li><a onClick={() => triggerNotification('Support: Send questions to concierge@oria.wellness for immediate personal clinical assistance.', 'info')} className="hover:text-[#10B981] transition-colors cursor-pointer">Concierge Care</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sub-footer Legalities */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#FBFBFA]/40 space-y-4 md:space-y-0">
            <p className="order-2 md:order-1 font-light col-span-1">
              &copy; {new Date().getFullYear()} Oria Wellness Corporation. All rights reserved. Sourced with deep respect.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 order-1 md:order-2">
              <span className="flex items-center space-x-1 hover:text-[#FBFBFA] transition-colors select-none">
                <Anchor size={11} />
                <span>Indus Cooperative Co.</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1 hover:text-[#FBFBFA] transition-colors select-none">
                <Heart size={11} className="text-brand-sprout" />
                <span>Carbon Neutral</span>
              </span>
              <span>•</span>
              <button
                id="footer-high-contrast-toggle"
                onClick={() => setHighContrast(!highContrast)}
                className="flex items-center space-x-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/15 hover:border-white/30 text-white rounded-full transition-all cursor-pointer font-semibold uppercase tracking-widest text-[10px]"
                aria-label="Toggle High Contrast Mode"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${highContrast ? 'bg-[#10B981] animate-pulse' : 'bg-white/30'}`} />
                <span>High Contrast</span>
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Boutique Toast Notification UI */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm"
          >
            <div className="bg-[#1E2D24] text-[#FBFBFA] p-4 rounded-2xl flex items-start gap-3.5 shadow-2xl border border-white/10">
              <div className="mt-0.5">
                {notification.type === 'success' ? (
                  <CheckCircle size={16} className="text-[#10B981]" />
                ) : (
                  <Compass size={16} className="text-brand-yellow animate-spin-slow" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs font-sans leading-relaxed text-[#FBFBFA]/90">
                  {notification.msg}
                </p>
              </div>
              <button
                onClick={() => setNotification((prev) => ({ ...prev, show: false }))}
                className="text-[#FBFBFA]/40 hover:text-[#FBFBFA] p-0.5 rounded transition-colors"
                aria-label="Close notification"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Global Scroll to Top (Bottom Right) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            id="oria-scroll-to-top-container"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-45"
          >
            <button
              onClick={scrollToTop}
              className="p-4 rounded-full bg-[#1E2D24] hover:bg-[#10B981] text-[#FBFBFA] shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border border-[#FBFBFA]/10 group"
              aria-label="Scroll to top of Oria page"
            >
              <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
