'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, ShieldCheck, Check, CreditCard, ChevronRight, Sparkles } from 'lucide-react';

export default function CheckoutFlow() {
  const {
    cartItems,
    cartTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<number>(1);
  const [shippingForm, setShippingForm] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  const [paymentForm, setPaymentForm] = useState({
    paymentMethod: 'card' as 'card' | 'upi',
    cardNumber: '',
    expiry: '',
    cvv: '',
    upiId: '',
  });

  // Handle prevention of page scrolling background-bleed when the checkout overlay is active
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCheckoutOpen]);

  // Handle closing and state reset
  const handleClose = () => {
    setIsCheckoutOpen(false);
    // Short delay to reset after transition
    setTimeout(() => {
      setStep(1);
    }, 400);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Proceed to Step 3 (Success) and immediately clear the cart state
    setStep(3);
    clearCart();
  };

  if (!isCheckoutOpen) return null;

  const standardShipping = 0; // Complimentary
  const estimatedTax = cartTotal * 0.08; // 8% Est. Tax
  const finalTotal = cartTotal + estimatedTax;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        
        {/* Rich Backdrop with elegant blur */}
        <motion.div
          id="checkout-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={step === 3 ? undefined : handleClose}
          className="fixed inset-0 bg-stone-950/40 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          id="checkout-modal"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#FAF9F5] w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl border border-brand-green/10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-brand-green/10 flex justify-between items-center bg-brand-green/5">
            <div>
              <span className="text-[10px] font-mono font-bold text-brand-sprout uppercase tracking-widest">
                Oria Ritual Dispatcher
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-brand-green font-medium mt-1">
                {step === 1 && 'Secure Shipping Details'}
                {step === 2 && 'Intracellular Balance Sourcing'}
                {step === 3 && 'Ritual Reserved successfully'}
              </h2>
            </div>
            
            {/* Show close button except on final screen */}
            {step !== 3 && (
              <button
                id="close-checkout-flow"
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-brand-green/10 text-brand-green transition-colors cursor-pointer"
                aria-label="Close checkout"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Stepper Progress Bar (for step 1 & 2) */}
          {step < 3 && (
            <div className="bg-brand-green/5 px-8 pb-4 flex items-center space-x-2">
              <div className="flex items-center space-x-1.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 1 ? 'bg-[#10B981] text-white' : 'bg-brand-green/10 text-brand-green/50'}`}>
                  1
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-mono font-semibold ${step === 1 ? 'text-[#10B981]' : 'text-brand-green/40'}`}>
                  Shipping
                </span>
              </div>
              <ChevronRight size={10} className="text-brand-green/20" />
              <div className="flex items-center space-x-1.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 2 ? 'bg-[#10B981] text-white' : 'bg-brand-green/10 text-brand-green/40'}`}>
                  2
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-mono font-semibold ${step === 2 ? 'text-[#10B981]' : 'text-brand-green/40'}`}>
                  Payment
                </span>
              </div>
            </div>
          )}

          {/* Scrollable Form Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Shipping Details Form */}
              {step === 1 && (
                <motion.form
                  id="checkout-step-1"
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleShippingSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#1E2D24]/40 font-mono border-b border-brand-green/5 pb-2">
                      Sourcing Consignee Details
                    </h3>

                    <div>
                      <label htmlFor="shipping-name" className="block text-[10px] uppercase tracking-wider font-mono font-bold text-brand-green/60 mb-2">
                        Recipient Name *
                      </label>
                      <input
                        id="shipping-name"
                        type="text"
                        required
                        value={shippingForm.name}
                        onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                        className="w-full bg-white border border-brand-green/15 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]-light rounded-xl px-4 py-3 text-sm text-brand-green font-light outline-none transition-all"
                        placeholder="e.g. Eleanor Vance"
                      />
                    </div>

                    <div>
                      <label htmlFor="shipping-address" className="block text-[10px] uppercase tracking-wider font-mono font-bold text-brand-green/60 mb-2">
                        Delivery Address *
                      </label>
                      <input
                        id="shipping-address"
                        type="text"
                        required
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                        className="w-full bg-white border border-brand-green/15 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]-light rounded-xl px-4 py-3 text-sm text-brand-green font-light outline-none transition-all"
                        placeholder="Street Name, Apartment, Suite number"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="shipping-city" className="block text-[10px] uppercase tracking-wider font-mono font-bold text-brand-green/60 mb-2">
                          City *
                        </label>
                        <input
                          id="shipping-city"
                          type="text"
                          required
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                          className="w-full bg-white border border-brand-green/15 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]-light rounded-xl px-4 py-3 text-sm text-brand-green font-light outline-none transition-all"
                          placeholder="e.g. San Francisco"
                        />
                      </div>
                      <div>
                        <label htmlFor="shipping-postal" className="block text-[10px] uppercase tracking-wider font-mono font-bold text-brand-green/60 mb-2">
                          Postal Code *
                        </label>
                        <input
                          id="shipping-postal"
                          type="text"
                          required
                          value={shippingForm.postalCode}
                          onChange={(e) => setShippingForm({ ...shippingForm, postalCode: e.target.value })}
                          className="w-full bg-white border border-brand-green/15 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]-light rounded-xl px-4 py-3 text-sm text-brand-green font-light outline-none transition-all"
                          placeholder="ZIP / Postcode"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="shipping-phone" className="block text-[10px] uppercase tracking-wider font-mono font-bold text-brand-green/60 mb-2">
                        Phone Number *
                      </label>
                      <input
                        id="shipping-phone"
                        type="tel"
                        required
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="w-full bg-white border border-brand-green/15 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]-light rounded-xl px-4 py-3 text-sm text-brand-green font-light outline-none transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-brand-green/5">
                    <button
                      id="submit-shipping"
                      type="submit"
                      className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#1e2d24] text-white hover:bg-[#10B981] text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-98 cursor-pointer"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </motion.form>
              )}

              {/* STEP 2: Minimalist Payment Form */}
              {step === 2 && (
                <motion.form
                  id="checkout-step-2"
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handlePaymentSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#1E2D24]/40 font-mono border-b border-brand-green/5 pb-2 mb-4">
                        Intracellular Sourcing Alignment
                      </h3>
                      
                      {/* Method Selector Tabs */}
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setPaymentForm({ ...paymentForm, paymentMethod: 'card' })}
                          className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                            paymentForm.paymentMethod === 'card'
                              ? 'border-[#10B981] bg-[#10B981]/5 text-brand-green'
                              : 'border-brand-green/15 hover:border-brand-green/35 text-brand-green/70 bg-white'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <CreditCard size={16} className={paymentForm.paymentMethod === 'card' ? 'text-[#10B981]' : 'text-brand-green/50'} />
                            <span className="text-xs font-bold font-mono tracking-wider uppercase">Credit Card</span>
                          </div>
                          {paymentForm.paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentForm({ ...paymentForm, paymentMethod: 'upi' })}
                          className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                            paymentForm.paymentMethod === 'upi'
                              ? 'border-[#10B981] bg-[#10B981]/5 text-brand-green'
                              : 'border-brand-green/15 hover:border-brand-green/35 text-brand-green/70 bg-white'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Sparkles size={16} className={paymentForm.paymentMethod === 'upi' ? 'text-[#10B981]' : 'text-brand-green/50'} />
                            <span className="text-xs font-bold font-mono tracking-wider uppercase">UPI Gateway</span>
                          </div>
                          {paymentForm.paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />}
                        </button>
                      </div>
                    </div>

                    {/* Conditional input fields */}
                    <AnimatePresence mode="wait">
                      {paymentForm.paymentMethod === 'card' ? (
                        <motion.div
                          id="payment-method-card-inputs"
                          key="card"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-4"
                        >
                          <div>
                            <label htmlFor="card-number" className="block text-[10px] uppercase tracking-wider font-mono font-bold text-brand-green/60 mb-2">
                              Card Number *
                            </label>
                            <input
                              id="card-number"
                              type="text"
                              required
                              pattern="\d{16}"
                              maxLength={16}
                              value={paymentForm.cardNumber}
                              onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value.replace(/\D/g, '') })}
                              className="w-full bg-white border border-brand-green/15 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]-light rounded-xl px-4 py-3 text-sm text-brand-green font-light outline-none transition-all"
                              placeholder="16-Digit Card Number (No Spaces)"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="card-expiry" className="block text-[10px] uppercase tracking-wider font-mono font-bold text-brand-green/60 mb-2">
                                Expiry Date (MM/YY) *
                              </label>
                              <input
                                id="card-expiry"
                                type="text"
                                required
                                pattern="\d{2}/\d{2}"
                                maxLength={5}
                                value={paymentForm.expiry}
                                onChange={(e) => {
                                  let val = e.target.value;
                                  if (val.length === 2 && !val.includes('/')) val += '/';
                                  setPaymentForm({ ...paymentForm, expiry: val });
                                }}
                                className="w-full bg-white border border-brand-green/15 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]-light rounded-xl px-4 py-3 text-sm text-brand-green font-light outline-none transition-all"
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label htmlFor="card-cvv" className="block text-[10px] uppercase tracking-wider font-mono font-bold text-brand-green/60 mb-2">
                                CVV / Secure Code *
                              </label>
                              <input
                                id="card-cvv"
                                type="password"
                                required
                                pattern="\d{3,4}"
                                maxLength={4}
                                value={paymentForm.cvv}
                                onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value.replace(/\D/g, '') })}
                                className="w-full bg-white border border-brand-green/15 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]-light rounded-xl px-4 py-3 text-sm text-brand-green font-light outline-none transition-all shadow-inner"
                                placeholder="•••"
                              />
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          id="payment-method-upi-inputs"
                          key="upi"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-4"
                        >
                          <div>
                            <label htmlFor="upi-id" className="block text-[10px] uppercase tracking-wider font-mono font-bold text-brand-green/60 mb-2">
                              Unified Payment ID / UPI Address *
                            </label>
                            <input
                              id="upi-id"
                              type="text"
                              required
                              pattern=".+@.+"
                              value={paymentForm.upiId}
                              onChange={(e) => setPaymentForm({ ...paymentForm, upiId: e.target.value })}
                              className="w-full bg-white border border-brand-green/15 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]-light rounded-xl px-4 py-3 text-sm text-brand-green font-light outline-none transition-all"
                              placeholder="e.g. name@okhdfcbank"
                            />
                          </div>
                          <p className="text-[10px] text-brand-green/60 leading-relaxed font-light">
                            You will receive a collect request on your associated UPI application to authorize this dispatch.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Summary Matrix Box */}
                    <div className="bg-brand-green/5 p-5 rounded-2xl border border-brand-green/5 space-y-3.5">
                      <div className="flex justify-between text-xs text-brand-green/75">
                        <span>Intracellular Grain Subtotal:</span>
                        <span className="font-semibold text-brand-green">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-brand-green/75">
                        <span>Estimated Sovereign Taxes (8.00%):</span>
                        <span className="font-semibold text-brand-green">${estimatedTax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-[#10B981] font-bold">
                        <span>Carbon-Neutral Delivery:</span>
                        <span className="uppercase tracking-widest text-[9px]">Complimentary</span>
                      </div>
                      <div className="border-t border-brand-green/10 my-1 pt-3.5 flex justify-between items-baseline text-brand-green">
                        <span className="font-serif text-sm font-semibold">Total Sourcing Estimate:</span>
                        <span className="font-serif text-lg font-bold text-[#1E2D24]">${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-brand-green/5">
                    <button
                      id="back-to-shipping"
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center space-x-1 py-2 text-xs font-bold uppercase tracking-wider text-brand-green/60 hover:text-brand-green transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={12} />
                      <span>Back</span>
                    </button>

                    <button
                      id="submit-payment"
                      type="submit"
                      className="inline-flex items-center space-x-2.5 px-8 py-3.5 rounded-full bg-[#10B981] text-white hover:bg-[#059669] text-xs font-bold uppercase tracking-widest transition-all shadow-md shadow-brand-sprout/15 active:scale-98 cursor-pointer"
                    >
                      <ShieldCheck size={14} />
                      <span>Release Sourcing Sump</span>
                    </button>
                  </div>
                </motion.form>
              )}

              {/* STEP 3: Premium success layout */}
              {step === 3 && (
                <motion.div
                  id="checkout-step-3-success"
                  key="step3"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center mx-auto text-[#10B981] relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                    >
                      <Check size={36} />
                    </motion.div>
                    
                    <span className="absolute -inset-1 rounded-full border border-[#10B981]/20 animate-ping opacity-75" />
                  </div>

                  <div className="max-w-md mx-auto space-y-3">
                    <span className="text-[10px] font-mono font-bold text-[#10B981] uppercase tracking-widest">
                      Ritual Registered & Locked
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-brand-green font-medium">
                      Your order is resting.
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1E2D24]/75 !leading-relaxed font-light">
                      Preparing your Oria morning. Our cooperative artisans in the Indus Valley are packing your fresh sprouted millet batches immediately.
                    </p>
                  </div>

                  {/* Summary Details */}
                  <div className="bg-brand-green/5 max-w-sm mx-auto p-5 rounded-2xl border border-brand-green/5 text-left text-xs space-y-2">
                    <div className="flex justify-between text-brand-green/60">
                      <span>Recipient Address:</span>
                      <span className="font-medium text-brand-green text-right">{shippingForm.name}</span>
                    </div>
                    <div className="flex justify-between text-brand-green/60">
                      <span>Delivery Location:</span>
                      <span className="font-medium text-brand-green text-right">{shippingForm.city}, {shippingForm.postalCode}</span>
                    </div>
                    <div className="flex justify-between text-brand-green/60 border-t border-brand-green/5 pt-2">
                      <span>Dispatch Window:</span>
                      <span className="font-medium text-brand-sprout uppercase tracking-widest text-[9px] font-mono">Carbon Neutral (48h)</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      id="close-checkout-success"
                      onClick={handleClose}
                      className="inline-flex items-center justify-center px-10 py-3.5 rounded-full bg-[#1e2d24] text-white hover:bg-[#10B981] text-xs font-bold uppercase tracking-widest transition-all active:scale-98 cursor-pointer"
                    >
                      Enter Morning Repose
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Secure SSL Shield indicator on step 1 & 2 */}
          {step < 3 && (
            <div className="p-4 bg-brand-green/5 border-t border-brand-green/10 flex items-center justify-center space-x-2 text-[10px] font-mono text-brand-green/40 uppercase tracking-widest">
              <ShieldCheck size={11} className="text-[#10B981]" />
              <span>Indus Sourcing Gateway Protected • 256-Bit SSL</span>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
