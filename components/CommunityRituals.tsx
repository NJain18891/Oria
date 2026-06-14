'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote, Sparkles, Star, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

interface Ritual {
  id: string;
  name: string;
  location: string;
  shortQuote: string; 
  fullQuote: string;  
  energyChange: string;
  image: string;       // Author Profile Avatar
  ritualImage: string; // High-prominence lifestyle photo
  rating: number;
  tags: string[];
}

const RITUALS: Ritual[] = [
  {
    id: 'ritual-1',
    name: 'Eleanor Vance',
    location: 'Copenhagen, DK',
    shortQuote: 'Replacing my morning espresso felt revolutionary.',
    fullQuote: 'Replacing my high-caffeine espresso with the Morning Fuel bar felt revolutionary. My energy doesn’t spike and crash anymore; it’s a sustained, rhythmic baseline from sunrise to early afternoon.',
    energyChange: '+85% Rhythmic Focus',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    ritualImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop', 
    rating: 5,
    tags: ['Aesthetic Rituals', 'Balanced Mind'],
  },
  {
    id: 'ritual-2',
    name: 'Julian Thorne',
    location: 'Brooklyn, NY',
    shortQuote: 'Tastes like pure, organic nourishment.',
    fullQuote: 'The rise blend shake tastes like pure, organic nourishment. By 9 AM, I usually feel heavy, but millet and adaptogens have completely lightened my morning sluggishness.',
    energyChange: 'No Peak, Zero Slump',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
    ritualImage: 'https://images.unsplash.com/photo-1517817748493-49ec54a32465?q=80&w=600&auto=format&fit=crop', 
    rating: 5,
    tags: ['Daily Reset', 'Adaptogenic Lift'],
  },
  {
    id: 'ritual-3',
    name: 'Marlowe Reed',
    location: 'Encinitas, CA',
    shortQuote: 'Completely refined my early morning digestive rhythm.',
    fullQuote: 'I take Hydra Protein Water immediately after my meditation practice. It tastes pristine, hydrates beautifully, and has completely refined my early morning digestive rhythm.',
    energyChange: 'Optimal Cellular Calm',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    ritualImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop', 
    rating: 5,
    tags: ['Hydration Artistry', 'Post-Yoga'],
  },
  {
    id: 'ritual-4',
    name: 'Saskia van der Linden',
    location: 'Amsterdam, NL',
    shortQuote: 'My body feels warm and highly vibrant immediately.',
    fullQuote: 'Millet is so underrated. Oria has unlocked its molecular power in these gourmet food products. My body actually feels warm and highly vibrant immediately upon eating this dry-milled grain.',
    energyChange: 'Accelerated Metabolic Warmth',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
    ritualImage: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600&auto=format&fit=crop', 
    rating: 5,
    tags: ['Millet Superfood', 'Nordic Morning'],
  },
];

export default function CommunityRituals() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    if (scrollWidth - clientWidth <= 0) return;
    setScrollProgress(scrollLeft / (scrollWidth - clientWidth));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const { clientWidth } = containerRef.current;
    const scrollAmount = clientWidth * 0.75;
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="community-rituals-section"
      className="pt-42 pb-42 bg-[#261c29] border-t border-brand-green/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-12">
        
        {/* Corrected Header Block: Restructured into a clean centralized stack */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-4 gap-4">
          
          {/* Badge Pill */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white border border-brand-green/10 text-brand-green text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
            <Sparkles size={14} className="text-brand-green animate-pulse" />
            <span className="text-[12px] font-bold uppercase tracking-widest">
              Community Rituals
            </span>
          </div>
          
          {/* Main Headline */}
          <h2 className="pt-8 font-serif text-4xl sm:text-5xl text-[#FBFBFA] font-medium leading-tight tracking-tight max-w-4xl">
            Honest Feedback from our Morning Collective
          </h2>
          
          {/* Subtitle description adjusted to max-w-xl for clean editorial tracking balance */}
          <p className="pt-4 text-xs sm:text-sm text-[#FBFBFA]/70 leading-relaxed font-serif max-w-xl">
            Hear from global creators, modern leaders, and wellness pioneers who trust Oria’s raw millet cellular energy baseline.
          </p>
        </div>

        {/* Carousel Arrows */}
        <div className="flex items-center gap-3 mb-6 justify-end">
          <button
            id="slider-control-left"
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-brand-green/10 bg-white hover:bg-[#10b981] hover:scale-110 active:scale-95 hover:border-brand-green/20 flex items-center justify-center text-brand-green transition-all cursor-pointer"
            aria-label="Scroll left"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            id="slider-control-right"
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-brand-green/10 bg-white hover:bg-[#10b981] hover:scale-110 active:scale-95 hover:border-brand-green/20 flex items-center justify-center text-brand-green transition-all cursor-pointer"
            aria-label="Scroll right"
          >
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Horizontal Scroll Layout */}
        <div className="relative">
          <div
            id="rituals-carousel-container"
            ref={containerRef}
            onScroll={handleScroll}
            className="flex gap-6 sm:gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none items-start text-center transition-all duration-300"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {RITUALS.map((ritual) => (
              <RitualCard key={ritual.id} ritual={ritual} />
            ))}
          </div>

          {/* Premium Progress Bar */}
          <div className="w-full h-1 bg-[#FBFBFA]/10 rounded-full mt-8 overflow-hidden max-w-sm mx-auto">
            <motion.div
              id="rituals-carousel-progress"
              className="h-full bg-[#10B981] rounded-full"
              style={{
                width: `${Math.max(10, scrollProgress * 100)}%`,
                transformOrigin: 'left',
              }}
              animate={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

function RitualCard({ ritual }: { ritual: Ritual }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      id={`ritual-card-${ritual.id}`}
      className="flex-none w-[320px] sm:w-[460px] snap-start bg-[#FBFBFA] rounded-[32px] px-4 py-4 sm:px-4 sm:py-4 border-[3px] border-[#10B981] hover:border-[#059669] shadow-sm transition-colors duration-300 hover:shadow-md flex flex-col justify-between"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div>
        {/* Rating Stars and Energy stat */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-0.5">
            {[...Array(ritual.rating)].map((_, i) => (
              <Star key={i} size={14} className="fill-[#10B981] text-[#10B981]" />
            ))}
          </div>
          <span className="text-[12px] font-serif font-bold uppercase px-3 py-1 bg-[#1E2D24]/5 text-[#1E2D24] rounded-full">
            {ritual.energyChange}
          </span>
        </div>

        {/* Master Flex Container */}
        <div className="flex gap-5 sm:gap-6 items-center justify-between mb-6">
          
          {/* Left Side Container */}
          <motion.div layout="position" className="flex-1 relative">
            <Quote className="absolute -top-3 -left-2 text-[#1E2D24]/10 w-8 h-8 -z-0" />
            <p className={`text-[#1E2D24]/85 leading-relaxed font-serif italic relative z-10 pr-1 transition-all duration-300 ${
              isExpanded 
                ? 'text-base text-4xl font-medium text-[#1E2D24]' 
                : 'text-xl font-bold'
            }`}>
              &ldquo;{isExpanded ? ritual.fullQuote : ritual.shortQuote}&rdquo;
            </p>
          </motion.div>

          {/* Right Side Container */}
          <AnimatePresence mode="popLayout">
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, x: 30, transition: { duration: 0.25 } }}
                className="relative w-[130px] h-[150px] sm:w-[210px] sm:h-[220px] rounded-[24px] overflow-hidden shadow-md shrink-0 border border-[#1E2D24]/5"
              >
                <Image
                  src={ritual.ritualImage}
                  alt="Ritual detail aesthetic setup"
                  fill
                  sizes="(max-w-640px) 130px, 210px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Author Info & Interactive Toggle Row */}
      <div className="flex items-center justify-between pt-6 border-t border-[#1E2D24]/5 mt-auto">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#1E2D24]/10 flex-shrink-0">
            <Image
              src={ritual.image}
              alt={ritual.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-[#1E2D24]">{ritual.name}</h4>
            <p className="text-[10px] font-serif text-[#1E2D24]/50 mt-0.5">{ritual.location}</p>
            {/* Tags */}
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {ritual.tags.map((tag) => (
                <span key={tag} className="text-[8px] tracking-wide text-[#1E2D24]/60 bg-[#FBFBFA] py-0.5 px-2 rounded border border-[#1E2D24]/5 uppercase font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-10 h-10 rounded-full bg-[#1E2D24]/5 hover:bg-[#10B981] text-[#1E2D24] hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 ml-4 group shadow-sm"
          aria-label={isExpanded ? "Show less review text" : "Show full review text"}
          title={isExpanded ? "Show Less" : "Read Full Review"}
        >
          {isExpanded ? (
            <ChevronUp size={16} className="transition-transform duration-300" />
          ) : (
            <ChevronDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          )}
        </button>
      </div>
    </motion.div>
  );
}