'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';

interface Ritual {
  id: string;
  name: string;
  location: string;
  quote: string;
  energyChange: string;
  image: string;
  rating: number;
  tags: string[];
}

const RITUALS: Ritual[] = [
  {
    id: 'ritual-1',
    name: 'Eleanor Vance',
    location: 'Copenhagen, DK',
    quote: 'Replacing my high-caffeine espresso with the Morning Fuel bar felt revolutionary. My energy doesn’t spike and crash anymore; it’s a sustained, rhythmic baseline from sunrise to early afternoon.',
    energyChange: '+85% Rhythmic Focus',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    rating: 5,
    tags: ['Aesthetic Rituals', 'Balanced Mind'],
  },
  {
    id: 'ritual-2',
    name: 'Julian Thorne',
    location: 'Brooklyn, NY',
    quote: 'The rise blend shake tastes like pure, organic nourishment. By 9 AM, I usually feel heavy, but millet and adaptogens have completely lightened my morning sluggishness.',
    energyChange: 'No Peak, Zero Slump',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
    rating: 5,
    tags: ['Daily Reset', 'Adaptogenic Lift'],
  },
  {
    id: 'ritual-3',
    name: 'Marlowe Reed',
    location: 'Encinitas, CA',
    quote: 'I take Hydra Protein Water immediately after my meditation practice. It tastes pristine, hydrates beautifully, and has completely refined my early morning digestive rhythm.',
    energyChange: 'Optimal Cellular Calm',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    rating: 5,
    tags: ['Hydration Artistry', 'Post-Yoga'],
  },
  {
    id: 'ritual-4',
    name: 'Saskia van der Linden',
    location: 'Amsterdam, NL',
    quote: 'Millet is so underrated. Oria has unlocked its molecular power in these gourmet food products. My body actually feels warm and highly vibrant immediately upon eating this dry-milled grain.',
    energyChange: 'Accelerated Metabolic Warmth',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
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
      className="py-24 bg-brand-cream border-t border-brand-green/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#10B981] mb-3 flex items-center gap-1.5">
              <Sparkles size={12} className="text-brand-sprout animate-pulse" /> Community Rituals
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E2D24] font-medium leading-[1.15] tracking-tight">
              Honest Feedback from our Morning Collective
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-brand-green/75 leading-relaxed font-sans max-w-lg">
              Hear from global creators, modern leaders, and wellness pioneers who trust Oria’s raw millet cellular energy baseline.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              id="slider-control-left"
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full border border-brand-green/10 flex items-center justify-center text-brand-green hover:bg-[#1E2D24] hover:border-[#1E2D24] hover:text-white hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="Scroll left"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              id="slider-control-right"
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full border border-brand-green/10 flex items-center justify-center text-brand-green hover:bg-[#1E2D24] hover:border-[#1E2D24] hover:text-white hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="Scroll right"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Layout */}
        <div className="relative">
          <div
            id="rituals-carousel-container"
            ref={containerRef}
            onScroll={handleScroll}
            className="flex gap-6 sm:gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {RITUALS.map((ritual) => (
              <div
                key={ritual.id}
                id={`ritual-card-${ritual.id}`}
                className="flex-none w-[320px] sm:w-[460px] snap-start bg-[#FBFBFA] rounded-[32px] p-6 sm:p-8 border border-brand-green/5 hover:border-brand-green/15 shadow-sm transition-all duration-500 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars and Energy stat */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-0.5">
                      {[...Array(ritual.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-[#10B981] text-[#10B981]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-medium uppercase px-3 py-1 bg-[#1E2D24]/5 text-brand-green rounded-full">
                      {ritual.energyChange}
                    </span>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="relative mb-6">
                    <Quote className="absolute -top-3 -left-2 text-brand-green/10 w-8 h-8 -z-0" />
                    <p className="text-xs sm:text-sm text-brand-green/85 leading-relaxed font-sans italic relative z-10">
                      &ldquo;{ritual.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-brand-green/5">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-brand-green/10 flex-shrink-0">
                    <Image
                      src={ritual.image}
                      alt={ritual.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-brand-green">{ritual.name}</h4>
                    <p className="text-[10px] font-mono text-brand-green/50 mt-0.5">{ritual.location}</p>
                    {/* Tags */}
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {ritual.tags.map((tag) => (
                        <span key={tag} className="text-[8px] tracking-wide text-brand-green/60 bg-brand-cream/60 py-0.5 px-2 rounded border border-brand-green/5 uppercase font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Progress Bar */}
          <div className="w-full h-1 bg-[#1E2D24]/5 rounded-full mt-8 overflow-hidden max-w-sm mx-auto">
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
