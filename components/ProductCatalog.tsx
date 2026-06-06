'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Star, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  sizeDesc: string;
  description: string;
  image: string;
  nutrients: { label: string; val: string }[];
  accentText: string;
}

export default function ProductCatalog() {
  const { addToCart } = useCart();

  const products: Product[] = [
    {
      id: 'oria-morning-fuel-bar',
      name: 'Morning Fuel Bar',
      subtitle: 'Ancient Millet & Cardamom Pods',
      price: 28,
      sizeDesc: 'Box of 12 Gourmet Bars',
      description: 'A dense, satisfying solid bar combining rolled organic millet grains, cold-extracted almond oil, raw botanical lavender, and wild honey.',
      image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=600&auto=format&fit=crop",
      accentText: 'Most Popular',
      nutrients: [
        { label: 'Whole Protein', val: '15g' },
        { label: 'Dietary Fiber', val: '6g' },
        { label: 'Insulin Impact', val: 'Minimal' }
      ]
    },
    {
      id: 'oria-rise-blend-shake',
      name: 'Rise Blend Shake',
      subtitle: 'Cardamom Vanilla & Ashwagandha',
      price: 34,
      sizeDesc: '15 Servings Recyclable Jar',
      description: 'Sleek botanical shake formulation featuring 10 ancient whole millet species supercharged with adaptogens to manage stress and sustain energy.',
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop",
      accentText: 'Wellness Pick',
      nutrients: [
        { label: 'Organic Protein', val: '22g' },
        { label: 'Active Adaptogen', val: '600mg' },
        { label: 'Prebiotic Fibers', val: '4g' }
      ]
    },
    {
      id: 'oria-hydra-protein-water',
      name: 'Hydra-Protein Water',
      subtitle: 'Sprout-Green & Coconut Marine',
      price: 32,
      sizeDesc: 'Pack of 12 Glass Bottles',
      description: 'A crystal-clear, refreshing coconut water base containing trace marine minerals and plant-based isolated protein structure.',
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=600&auto=format&fit=crop",
      accentText: 'New Launch',
      nutrients: [
        { label: 'Clean Hydration', val: '12g' },
        { label: 'Potassium / Salt', val: '470mg' },
        { label: 'Sugar Molecules', val: '0g' }
      ]
    }
  ];

  return (
    <section
      id="shop"
      className="relative py-24 sm:py-32 bg-[#FBFBFA] border-t border-brand-green/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Intro Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-purple mb-3">
            Oria Daily Essentials Catalog
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-green leading-tight">
            The Daily Protagonists
          </h2>
          <p className="text-sm text-brand-green/75 max-w-xl mx-auto mt-4 font-light">
            Formulated to respect cellular health, eliminate morning friction, and supply exquisite, sustained metabolic energy throughout your entire day.
          </p>
        </div>

        {/* Product Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {products.map((product) => (
            <motion.div
              id={`catalog-card-${product.id}`}
              key={product.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col justify-between rounded-[32px] bg-[#FBFBFA] border border-brand-green/10 hover:border-brand-green/20 hover:shadow-2xl hover:shadow-brand-green/5 overflow-hidden transition-all duration-500 text-left p-6 relative"
            >
              {/* Image container with aspect overlay */}
              <div className="relative aspect-square w-full rounded-[24px] overflow-hidden bg-brand-cream border border-brand-green/5 mb-6">
                <Image
                  id={`img-comp-${product.id}`}
                  src={product.image}
                  alt={`${product.name} - ${product.subtitle}`}
                  fill
                  sizes="(max-w-7xl) 30vw, 350px"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Accent Tag */}
                <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-brand-purple text-[10px] font-semibold text-brand-cream uppercase tracking-wider">
                  {product.accentText}
                </span>

                {/* Overlaid nutrition chip metrics */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between gap-1.5 z-10">
                  {product.nutrients.map((nut, index) => (
                    <div
                      key={index}
                      className="px-2.5 py-1.5 rounded-xl bg-[#FBFBFA]/90 backdrop-blur-sm border border-brand-green/5 flex flex-col items-center flex-1"
                    >
                      <span className="text-[9px] text-[#4A3B4E] uppercase tracking-wide leading-none">{nut.label}</span>
                      <span className="text-xs font-bold text-brand-green mt-1">{nut.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Contexts */}
              <div className="flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-serif text-xl text-brand-green font-medium group-hover:text-brand-purple transition-colors duration-300">
                      {product.name}
                    </h3>
                    <span className="font-serif text-lg font-medium text-brand-green leading-none">
                      ${product.price}
                    </span>
                  </div>
                  
                  <p className="text-[11px] uppercase tracking-widest text-brand-sprout font-bold mb-3">
                    {product.subtitle}
                  </p>

                  <p className="text-xs text-brand-green/75 leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>

                {/* Footer and Actions */}
                <div className="pt-4 border-t border-brand-green/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-brand-green/50 uppercase tracking-widest font-mono">
                      {product.sizeDesc}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={11} fill="#10B981" stroke="#10B981" />
                      ))}
                    </div>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    id={`cart-add-${product.id}`}
                    onClick={() => {
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        subtitle: product.subtitle,
                        image: product.image,
                      });
                    }}
                    className="w-full inline-flex items-center justify-center space-x-3.5 py-3.5 rounded-full bg-[#1E2D24] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#10B981] active:scale-98 transition-all duration-300 shadow-sm"
                  >
                    <ShoppingBag size={13} />
                    <span>Instant Reserve</span>
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Subtle delivery message hook */}
        <div className="mt-16 p-6 rounded-[24px] border border-brand-green/5 bg-brand-green/5 flex flex-col sm:flex-row sm:items-center sm:justify-between text-left gap-4 max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <span className="w-9 h-9 rounded-full bg-brand-sprout/15 text-brand-sprout flex items-center justify-center text-xs animate-spin-slow">
              <RefreshCw size={14} />
            </span>
            <div>
              <h4 className="text-xs font-semibold text-brand-green uppercase tracking-wider">Flexible subscription options</h4>
              <p className="text-[11px] text-brand-green/60">Subscribe to lock in recurring breakfast deliveries at 15% discount. Pause/cancel any cycle.</p>
            </div>
          </div>
          <button
            id="sub-learn-more"
            onClick={() => alert('Oria Concierge: Standard subscriptions will ship fresh breakfast nutrients every 30 days automatically. You will receive email reminders 3 days before standard batch roasting begins.')}
            className="px-5 py-2.5 rounded-full border border-brand-green/10 text-brand-green text-[10px] font-semibold uppercase tracking-wider hover:bg-[#1E2D24] hover:text-[#FBFBFA] transition-colors"
          >
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
}
