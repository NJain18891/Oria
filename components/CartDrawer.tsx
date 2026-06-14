'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, Lock, Leaf } from 'lucide-react';

export default function CartDrawer() {
  const {
    cartItems,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
    setIsCheckoutOpen,
  } = useCart();

  // Prevent page scrolling background-bleed when the cart drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleProceedToCheckout = () => {
    setIsOpen(false);
    setIsCheckoutOpen(true);
  };

  const getFallbackItemIcon = (id: string) => {
    if (id.includes('bar')) return '🌾';
    if (id.includes('shake')) return '🥛';
    return '💧';
  };

  const estimatedTax = cartTotal * 0.08; // 8% Est Taxes
  const totalWithTax = cartTotal + estimatedTax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Phase 2 Overlay Backdrop Blur */}
          <motion.div
            id="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-stone-950/20 backdrop-blur-sm z-50 transition-all duration-300"
          />

          {/* Phase 2 Sliding Drawer Panel */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 32 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FAF9F5] z-50 flex flex-col justify-between shadow-2xl border-l border-brand-green/10"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-green/10 flex items-center justify-between bg-brand-green/5">
              <div>
                <h3 className="font-serif text-lg sm:text-xl text-brand-green font-medium">Your Morning Reserve</h3>
                <p className="text-[10px] text-brand-green/50 uppercase tracking-widest font-serif mt-0.5">
                  {cartCount} Items Selected
                </p>
              </div>
              <button
                id="cart-close-btn"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-brand-green/10 text-brand-green transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Items Listing / Scrollable viewport */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-none">
              {cartItems.length === 0 ? (
                <div id="cart-empty-view" className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <span className="text-4xl animate-bounce">🌾</span>
                  <p className="text-sm font-serif text-brand-green/80 font-medium">Your morning ritual is empty.</p>
                  <p className="text-xs text-brand-green/60 max-w-xs leading-relaxed">
                    Start your morning alignment by reserving our proprietary sprouted whole-grain millet breakfast formulas.
                  </p>
                  <a
                    id="cart-empty-cta"
                    href="#shop"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex px-6 py-3 rounded-full bg-[#1e2d24] text-white hover:bg-[#10B981] text-[10px] font-semibold uppercase tracking-widest transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    Select Your Ritual
                  </a>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    id={`cart-item-${item.id}`}
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 rounded-2xl border border-brand-green/10 flex items-center space-x-4 bg-white"
                  >
                    {/* Item Image Thumbnail with proper optimization */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-brand-green/5 border border-brand-green/5 flex-shrink-0 flex items-center justify-center">
                      {item.image ? (
                        <Image
                          id={`item-thumbnail-${item.id}`}
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-2xl">{getFallbackItemIcon(item.id)}</span>
                      )}
                    </div>

                    {/* Meta information & fluid increment controls */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <div className="min-w-0">
                          <h4 className="font-serif text-sm font-medium text-brand-green leading-snug truncate">{item.name}</h4>
                          <p className="text-[10px] text-brand-green/60 leading-tight truncate">{item.subtitle}</p>
                        </div>
                        <span className="font-serif text-sm font-medium text-brand-green whitespace-nowrap">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Fluid Math Modulator & instant removal trigger */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center space-x-2 border border-brand-green/10 rounded-lg p-0.5 bg-brand-green/5">
                          <button
                            id={`qty-dec-${item.id}`}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded text-brand-green/75 hover:bg-white hover:text-brand-green active:scale-90 transition-all cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-xs font-semibold font-serif text-brand-green min-w-[18px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            id={`qty-inc-${item.id}`}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded text-brand-green/75 hover:bg-white hover:text-brand-green active:scale-90 transition-all cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={10} />
                          </button>
                        </div>

                        <button
                          id={`item-remove-${item.id}`}
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 rounded-full hover:bg-red-50 text-brand-green/55 hover:text-red-500 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Calculations & Secure Action Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-brand-green/10 space-y-5 bg-brand-green/5 rounded-t-[28px] shrink-0">
                
                {/* Math Columns Subdivided clearly */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center text-brand-green/70">
                    <span>Millet Batch Subtotal:</span>
                    <span className="font-semibold text-brand-green">${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-brand-green/70">
                    <span>Estimated Taxes (8.00%):</span>
                    <span className="font-semibold text-brand-green">${estimatedTax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center text-brand-green/70">
                    <span>Carbon-Neutral Shipping:</span>
                    <span className="text-[#10B981] font-bold uppercase tracking-wider text-[9px] flex items-center gap-1 font-serif">
                      <Leaf size={10} /> Complimentary
                    </span>
                  </div>
                  
                  <div className="h-px bg-brand-green/10 my-0.5" />
                  
                  <div className="flex justify-between items-baseline text-brand-green pt-1">
                    <span className="font-serif text-sm font-semibold">Intracellular Order Total:</span>
                    <span className="font-serif text-xl font-bold text-brand-green">
                      ${totalWithTax.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Secure Checkout Trigger */}
                <div className="space-y-3">
                  <button
                    id="checkout-action-btn"
                    onClick={handleProceedToCheckout}
                    className="w-full inline-flex items-center justify-center space-x-3.5 py-4 rounded-full bg-[#1e2d24] text-[#FBFBFA] hover:bg-[#10B981] text-xs font-semibold uppercase tracking-widest active:scale-98 transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <Lock size={12} className="shrink-0" />
                    <span>Proceed to Checkout</span>
                  </button>

                  <div className="flex justify-center items-center space-x-2 text-[9px] text-brand-green/35 uppercase tracking-widest font-serif">
                    <span>256-Bit SSL Secured</span>
                    <span>•</span>
                    <span>Batched Fresh</span>
                  </div>
                </div>

              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
