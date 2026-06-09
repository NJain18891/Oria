'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, Feather, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

const SLIDES = [
  {
    id: 0,
    tag: "Redefining Wellness",
    headline: "Pure Grain. <br className=\"hidden sm:inline\" /><span class=\"italic text-[#10B981]\">Sustained Energy.</span>",
    subheading: "Ancient organic millets refined for deep focus and zero metabolic crash.",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1200&auto=format&fit=crop",
    floatingBadgeEmoji: "🌾",
    floatingBadgeTitle: "Millet Nutrition",
    floatingBadgeText: "Ancient grains, grown sustainably. Clean energy, just add water.",
    primaryCta: { text: "Start Your Morning", href: "#shop" },
    secondaryCta: { text: "Our Story", href: "#story" },
    valueProps: [
      { top: "100%", bottom: "Whole-Food" },
      { top: "Ancient Millets", bottom: "Sustained Energy" },
      { top: "15-22g Pack", bottom: "Clean Protein" }
    ]
  },
  {
    id: 1,
    tag: "30-Second Ritual",
    headline: "Absolute Ease. <br className=\"hidden sm:inline\" /><span class=\"italic text-[#10B981]\">Active Ritual.</span>",
    subheading: "Simply unwrap or blend in 30 seconds. Balanced, whole-food nutrition designed for busy, high-intensity days.",
    imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop",
    floatingBadgeEmoji: "⏰",
    floatingBadgeTitle: "Effortless Prep",
    floatingBadgeText: "No shaker clumping, no blender cleanup. Truly instant.",
    primaryCta: { text: "Explore Shakes", href: "#shop" },
    secondaryCta: { text: "Learn Process", href: "#story" },
    valueProps: [
      { top: "30 Sec", bottom: "Prep Time" },
      { top: "Active Life", bottom: "On-the-go" },
      { top: "Zero Mess", bottom: "No Cleaning" }
    ]
  },
  {
    id: 2,
    tag: "Glycemic Stability",
    headline: "Sustained Curve. <br className=\"hidden sm:inline\" /><span class=\"italic text-[#10B981]\">Zero Crash.</span>",
    subheading: "Millets digest slowly, maintaining flat insulin levels and calm cognitive focus for 5+ clean hours.",
    imageUrl: "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?q=80&w=1200&auto=format&fit=crop",
    floatingBadgeEmoji: "🔋",
    floatingBadgeTitle: "Metabolic Range",
    floatingBadgeText: "Flat glycemic response prevents afternoon energy slump.",
    primaryCta: { text: "Find Your Blend", href: "#shop" },
    secondaryCta: { text: "View Science", href: "#oria-nutrition-comparison" },
    valueProps: [
      { top: "5+ Hours", bottom: "Steady Focus" },
      { top: "Flat G.I.", bottom: "No Sugar Spike" },
      { top: "Prebiotics", bottom: "Fiber Buffer" }
    ]
  },
  {
    id: 3,
    tag: "Clean Assimilation",
    headline: "Clean. Organic. <br className=\"hidden sm:inline\" /><span class=\"italic text-[#10B981]\">Bioavailable.</span>",
    subheading: "Naturally rich in iron, zinc, and fiber. Our unrefined plant protein is silky-smooth, highly digestible, and lightweight.",
    imageUrl: "https://images.unsplash.com/photo-1517093602195-b40af9688b46?q=80&w=1200&auto=format&fit=crop",
    floatingBadgeEmoji: "🧬",
    floatingBadgeTitle: "Pure Absorption",
    floatingBadgeText: "Sprouted grain breaks down phytates for clean assimilation.",
    primaryCta: { text: "Shop Wellness", href: "#shop" },
    secondaryCta: { text: "Purity Assays", href: "#oria-nutrition-comparison" },
    valueProps: [
      { top: "Non-GMO", bottom: "Ancient Seed" },
      { top: "Alkaline", bottom: "Hypoallergenic" },
      { top: "0% Gums", bottom: "No Bleach/Fillers" }
    ]
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Set up scroll tracking for subtle parallax depth
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end start'],
  });

  // Calculate parallax offsets
  const yText = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 90]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 10000);
    return () => clearTimeout(timer);
  }, [current]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const activeSlide = SLIDES[current];

  return (
    <section
      id="oria-hero-section"
      ref={scrollRef}
      className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center bg-[#FBFBFA] pt-28 pb-20 overflow-hidden"
    >
      {/* Decorative background grids */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-[15%] w-px h-full bg-gradient-to-b from-brand-green/10 via-transparent to-brand-green/5" />
        <div className="absolute top-0 right-[25%] w-px h-full bg-gradient-to-b from-brand-green/10 via-transparent to-brand-green/10" />
        <div className="absolute top-[35%] left-0 w-full h-px bg-brand-green/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* Left Column: Text narrative */}
            <motion.div
              id="hero-text-container"
              style={{ y: yText }}
              className="lg:col-span-7 flex flex-col items-start space-y-8 text-left"
            >
              {/* Subtle brand tag */}
              <div
                id="hero-brand-badge"
                className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-brand-green/5 border border-brand-green/10 text-brand-purple text-[10px] sm:text-[11px] font-bold uppercase tracking-widest"
              >
                <Sparkles size={11} className="text-brand-sprout animate-pulse" />
                <span>{activeSlide.tag}</span>
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h1
                  id="hero-headline"
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-brand-green leading-[1.08] tracking-tight"
                  dangerouslySetInnerHTML={{ __html: activeSlide.headline }}
                />
                
                <p
                  id="hero-subheader"
                  className="text-base sm:text-lg text-brand-green/80 font-sans max-w-xl leading-relaxed font-light"
                >
                  {activeSlide.subheading}
                </p>
              </div>

              {/* CTA Buttons */}
              <div
                id="hero-cta-group"
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
              >
                <a
                  id="hero-cta-primary"
                  href={activeSlide.primaryCta.href}
                  className="group inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-[#10B981] text-[#FBFBFA] font-sans font-semibold text-xs uppercase tracking-widest hover:bg-[#059669] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md shadow-brand-sprout/15"
                >
                  <span>{activeSlide.primaryCta.text}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>

                <a
                  id="hero-cta-secondary"
                  href={activeSlide.secondaryCta.href}
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full border border-brand-green/10 text-brand-green font-sans font-semibold text-xs uppercase tracking-widest hover:bg-brand-green/5 hover:border-brand-green hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 animate-fade-in"
                >
                  <span>{activeSlide.secondaryCta.text}</span>
                </a>
              </div>

              {/* Slide stats and indicators */}
              <div
                id="hero-value-props"
                className="pt-6 border-t border-brand-green/10 w-full grid grid-cols-3 gap-4"
              >
                {activeSlide.valueProps.map((prop, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="font-display text-sm font-semibold text-[#10B981] flex items-center gap-1.5">
                      {idx === 0 && prop.top.includes("%") && <Feather size={12} className="text-brand-sprout" />} {prop.top}
                    </span>
                    <span className="text-[10px] text-brand-green/60 uppercase tracking-widest font-bold mt-1 leading-snug">
                      {prop.bottom}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: High-impact original photo and overlays */}
            <motion.div
              id="hero-image-wrapper"
              style={{ y: yImage }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              {/* Backing Plates */}
              <div className="absolute w-[95%] h-[95%] -bottom-4 -right-4 rounded-[40px] bg-brand-purple/5 z-0 scale-95 rotate-1" />
              <div className="absolute w-[95%] h-[95%] -top-4 -left-4 rounded-[40px] border border-brand-green/5 -rotate-1 z-0 scale-100" />

              {/* Main Image container with 4/5 portrait ratio */}
              <div className="relative w-full max-w-md lg:max-w-none aspect-[4/5] overflow-hidden rounded-[32px] sm:rounded-[40px] bg-brand-cream border border-brand-green/5 shadow-2xl shadow-brand-green/10 z-10 group">
                <Image
                  id="hero-macro-photo"
                  src={activeSlide.imageUrl}
                  alt={activeSlide.floatingBadgeTitle}
                  fill
                  sizes="(max-w-7xl) 40vw, 500px"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                  priority
                />
                <div className="absolute inset-0 bg-brand-green/5 mix-blend-multiply opacity-15 pointer-events-none" />
                
                {/* Floating dynamic info badge */}
                <motion.div
                  id="hero-floating-badge"
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-2xl bg-[#FBFBFA]/90 backdrop-blur-md border border-brand-green/5 text-left flex items-center space-x-4 shadow-lg z-20"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-sprout/10 flex items-center justify-center text-brand-sprout flex-shrink-0 text-lg animate-bounce">
                    {activeSlide.floatingBadgeEmoji}
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-medium text-brand-green">{activeSlide.floatingBadgeTitle}</h4>
                    <p className="text-[11px] text-brand-green/70 leading-normal">{activeSlide.floatingBadgeText}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel controls bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-6 border-t border-brand-green/5 relative z-20 gap-4">
          
          {/* Navigation bullets */}
          <div className="flex items-center gap-2">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrent(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  current === idx ? 'w-8 bg-[#10B981]' : 'w-2.5 bg-brand-green/15 hover:bg-brand-green/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Time indicator pill & arrow navigations */}
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-brand-green/40 uppercase tracking-widest max-sm:order-1">
              Auto-rotating every 10s
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-brand-green/10 bg-white hover:bg-brand-green/5 hover:border-brand-green/20 flex items-center justify-center text-brand-green transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-brand-green/10 bg-white hover:bg-brand-green/5 hover:border-brand-green/20 flex items-center justify-center text-brand-green transition-all"
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

