'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Star, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

// Custom parallax image dynamic viewport tracking component
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const elementMiddle = rect.top + rect.height / 2;
      const viewportMiddle = viewportHeight / 2;
      const distanceFromMiddle = elementMiddle - viewportMiddle;
      
      // Map normal scroll speed to a subtle offset vector (-50px to +50px shift)
      const maxDistance = 600;
      const clampedDistance = Math.min(Math.max(distanceFromMiddle, -maxDistance), maxDistance);
      const parallaxShift = (clampedDistance / maxDistance) * 20; // 20px delta
      setOffsetY(parallaxShift);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initial alignment cycle
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-brand-cream">
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        animate={{ y: offsetY }}
        transition={{ type: 'spring', stiffness: 120, damping: 25 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-w-7xl) 30vw, 350px"
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </div>
  );
}

export default function ProductCatalog() {
  const { addToCart } = useCart();
  const [showSubDetails, setShowSubDetails] = React.useState(false);
  const [toasts, setToasts] = React.useState<{ id: number; itemName: string }[]>([]);
  const toastIdRef = React.useRef(0);

  const triggerToast = (itemName: string) => {
    toastIdRef.current += 1;
    const id = toastIdRef.current;
    setToasts((prev) => [...prev, { id, itemName }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

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
                
                {/* Parallax Image Render */}
                <ParallaxImage src={product.image} alt={product.name} />
                
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
                      triggerToast(product.name);
                    }}
                    className="w-full inline-flex items-center justify-center space-x-3.5 py-3.5 rounded-full bg-[#1E2D24] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#10B981] active:scale-98 transition-all duration-300 shadow-sm cursor-pointer"
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
            onClick={() => setShowSubDetails(true)}
            className="px-5 py-2.5 rounded-full border border-brand-green/10 text-brand-green text-[10px] font-semibold uppercase tracking-wider hover:bg-[#1E2D24] hover:text-[#FBFBFA] transition-colors cursor-pointer text-center"
          >
            Learn More
          </button>
        </div>

      </div>

      {/* Modern Subscription Drawer Modal */}
      <AnimatePresence>
        {showSubDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-[32px] border border-brand-green/10 p-8 max-w-md w-full shadow-2xl relative space-y-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#10B981] font-bold">Oria Auto-Shipment</span>
                  <h3 className="font-serif text-xl text-brand-green font-medium mt-1">Sustenence Orchestrator</h3>
                </div>
                <button
                  onClick={() => setShowSubDetails(false)}
                  className="px-2 py-1 text-xs rounded-full hover:bg-brand-green/5 text-brand-green/50 hover:text-brand-green transition-colors cursor-pointer"
                >
                  Close [×]
                </button>
              </div>

              <div className="space-y-4 text-xs font-light text-[#1E2D24]">
                <p className="leading-relaxed">
                  Our subscription delivers raw-grain fresh nutritional batches to your residence at a lock-in <strong className="text-brand-purple">15% reduction</strong>. 
                </p>
                <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-brand-green/5 space-y-3 font-mono text-[11px]">
                  <div className="flex gap-2">
                    <span className="text-[#10B981]">✔</span>
                    <span>Standard ships every 30 days</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#10B981]">✔</span>
                    <span>Notify with 3 days reminder warnings</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#10B981]">✔</span>
                    <span>Zero-fee cycles pause / cancellation</span>
                  </div>
                </div>
                <p className="text-[10px] text-brand-green/65 leading-relaxed">
                  Batch grinds occur inside our zero-waste mills. You retain absolute control over biological shipment cadences.
                </p>
              </div>

              <div className="pt-4 border-t border-brand-green/5 flex justify-end">
                <button
                  onClick={() => setShowSubDetails(false)}
                  className="px-6 py-2.5 rounded-full bg-[#1E2D24] text-white text-[11px] font-semibold uppercase tracking-widest hover:bg-[#10B981] transition-colors cursor-pointer"
                >
                  Confirm Understanding
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification Stack */}
      <div 
        id="added-to-ritual-toasts-portal" 
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4 sm:px-0"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.22, ease: 'easeIn' } }}
              layout
              className="bg-[#1E2D24] text-[#FBFBFA] border border-[#10B981]/25 px-5 py-4 rounded-[22px] shadow-2xl flex items-center space-x-3.5 pointer-events-auto"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse shrink-0" />
              <div className="flex-1 flex flex-col items-start text-left">
                <span className="text-[9px] text-[#10B981] uppercase tracking-widest font-mono font-bold">Added to Ritual</span>
                <span className="text-xs font-serif font-medium mt-1">{toast.itemName} has been reserved.</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
  );
}
