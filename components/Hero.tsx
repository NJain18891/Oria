'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, Feather } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
const heroImageUrl = "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1200&auto=format&fit=crop";

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Set up scroll tracking for parallax depth
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end start'],
  });

  // Calculate parallax offsets to create custom layered depth transitions
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const yBackingPlate = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const rotateBackingPlate = useTransform(scrollYProgress, [0, 1], [-2, 8]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacityBadge = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  } as const;

  const badgeVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  } as const;

  return (
    <section
      id="oria-hero-section"
      ref={scrollRef}
      className="relative min-h-screen flex items-center justify-center bg-[#FBFBFA] pt-24 pb-16 overflow-hidden"
    >
      {/* Decorative architectural background grids */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-[15%] w-px h-full bg-gradient-to-b from-brand-green/10 via-transparent to-brand-green/5" />
        <div className="absolute top-0 right-[25%] w-px h-full bg-gradient-to-b from-brand-green/10 via-transparent to-brand-green/10" />
        <div className="absolute top-[35%] left-0 w-full h-px bg-brand-green/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Text narrative */}
        <motion.div
          id="hero-text-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: yText }}
          className="lg:col-span-7 flex flex-col items-start space-y-8 text-left"
        >
          {/* Subtle eco-luxury tag */}
          <motion.div
            id="hero-brand-badge"
            variants={badgeVariants}
            style={{ opacity: opacityBadge }}
            className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-brand-green/5 border border-brand-green/10 text-brand-purple text-[11px] font-bold uppercase tracking-widest"
          >
            <Sparkles size={11} className="text-brand-sprout animate-pulse" />
            <span>Redefining Wellness</span>
          </motion.div>

          {/* Emotional hook header */}
          <div className="space-y-4">
            <motion.h1
              id="hero-headline"
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-brand-green leading-[1.12] tracking-tight"
            >
              Your morning ritual, <br />
              <span className="italic text-brand-purple">redefined</span> by nature.
            </motion.h1>
            
            <motion.p
              id="hero-subheader"
              variants={itemVariants}
              className="text-base sm:text-lg text-brand-green/85 font-sans max-w-xl leading-relaxed font-light"
            >
              Reclaim your morning rhythm. Real whole-food protein and dense ancient millets form an elegant, complete breakfast in under 30 seconds. Absolutely no chalky synthetics, no refined sugar, just clean performance.
            </motion.p>
          </div>

          {/* Minimal CTA Pair */}
          <motion.div
            id="hero-cta-group"
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              id="hero-cta-primary"
              href="#shop"
              className="group inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-[#10B981] text-[#FBFBFA] font-sans font-semibold text-xs uppercase tracking-widest hover:bg-[#059669] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md shadow-brand-sprout/15"
            >
              <span>Start Your Morning</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>

            <a
              id="hero-cta-secondary"
              href="#story"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full border border-brand-green/10 text-brand-green font-sans font-semibold text-xs uppercase tracking-widest hover:bg-brand-green/5 hover:border-brand-green hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <span>Our Story</span>
            </a>
          </motion.div>

          {/* Luxury core selling highlights */}
          <motion.div
            id="hero-value-props"
            variants={itemVariants}
            className="pt-6 border-t border-brand-green/10 w-full grid grid-cols-3 gap-4"
          >
            <div className="flex flex-col">
              <span className="font-display text-sm font-semibold text-[#10B981] flex items-center gap-1.5">
                <Feather size={12} className="text-brand-sprout" /> 100%
              </span>
              <span className="text-[10px] text-brand-green/60 uppercase tracking-widest font-bold mt-1">Whole-Food</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-semibold text-[#10B981]">Ancient Millets</span>
              <span className="text-[10px] text-brand-green/60 uppercase tracking-widest font-bold mt-1">Sustained Energy</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-semibold text-[#10B981]">15-22g Pack</span>
              <span className="text-[10px] text-brand-green/60 uppercase tracking-widest font-bold mt-1">Clean Protein</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Hero Macro-Shot Image Container */}
        <motion.div
          id="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          {/* Aesthetic backing panel */}
          <motion.div 
            style={{ y: yBackingPlate, rotate: rotateBackingPlate }}
            className="absolute w-[95%] h-[95%] -bottom-4 -right-4 rounded-[40px] bg-brand-purple/5 z-0 scale-95" 
          />
          <div className="absolute w-[95%] h-[95%] -top-4 -left-4 rounded-[40px] border border-brand-green/5 rotate-1 z-0 scale-100" />

          {/* Primary image container */}
          <motion.div 
            style={{ y: yImage, scale: scaleImage }}
            className="relative w-full max-w-md lg:max-w-none aspect-square lg:aspect-[4/5] xl:aspect-square overflow-hidden rounded-[32px] sm:rounded-[40px] bg-brand-cream border border-brand-green/5 shadow-2xl shadow-brand-green/10 z-10 group"
          >
            <Image
              id="hero-macro-photo"
              src={heroImageUrl}
              alt="Oria Raw Ancient Millet Breakfast Elements and Glass Container Editorial Shoot"
              fill
              sizes="(max-w-7xl) 40vw, 500px"
              className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              referrerPolicy="no-referrer"
              priority
            />
            {/* Visual ambient warm shade */}
            <div className="absolute inset-0 bg-brand-green/5 mix-blend-multiply opacity-20 pointer-events-none" />
            
            {/* floating card */}
            <motion.div
              id="hero-floating-badge"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-2xl bg-[#FBFBFA]/90 backdrop-blur-md border border-brand-green/5 text-left flex items-center space-x-4 shadow-lg"
            >
              <div className="w-10 h-10 rounded-full bg-brand-sprout/10 flex items-center justify-center text-brand-sprout flex-shrink-0 animate-bounce">
                🌾
              </div>
              <div>
                <h4 className="font-serif text-sm font-medium text-brand-green">Millet Revolution</h4>
                <p className="text-[11px] text-brand-green/70">Densely packed essential mineral profile. Easily digestible. Smart agriculture.</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
