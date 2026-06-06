'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const { setIsOpen, cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Story', href: '#story' },
    { name: 'Micro-Nutrients', href: '#ingredients' },
    { name: 'Shop Nutrition', href: '#shop' },
  ];

  return (
    <>
      <header
        id="oria-header"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-brand-cream/80 backdrop-blur-md border-brand-green/5 py-4 shadow-sm'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <a
            id="header-logo-lnk"
            href="#"
            className="font-serif text-2xl tracking-widest text-brand-green font-medium select-none"
          >
            ORIA
          </a>

          {/* Desktop Nav */}
          <nav id="desktop-nav-links" className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a
                id={`lnk-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                key={link.name}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-widest text-brand-green/70 hover:text-brand-green transition-colors duration-300 relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-sprout transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Cart & Mobile Toggle */}
          <div className="flex items-center space-x-6">
            <button
              id="header-cart-btn"
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 text-brand-green hover:text-brand-purple hover:scale-105 active:scale-95 transition-all duration-300 rounded-full bg-brand-green/5 hover:bg-brand-green/10"
              aria-label="Open Cart"
            >
              <ShoppingBag size={18} strokeWidth={2} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-brand-sprout text-[10px] font-bold font-display text-white rounded-full flex items-center justify-center shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              id="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-brand-green hover:text-brand-purple transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-0 w-full bg-brand-cream border-b border-brand-green/5 shadow-lg z-30 md:hidden"
          >
            <nav className="flex flex-col space-y-4 px-8 py-6">
              {navLinks.map((link) => (
                <a
                  id={`mobile-lnk-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-widest text-brand-green/80 hover:text-brand-green py-2 border-b border-brand-green/5"
                >
                  {link.name}
                </a>
              ))}
              <button
                id="mobile-menu-cart-action"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsOpen(true);
                }}
                className="flex items-center justify-between text-sm font-semibold uppercase tracking-widest text-brand-green/80 hover:text-[#10B981] py-2"
              >
                <span>Cart</span>
                <span className="px-2 py-0.5 bg-brand-green/10 rounded text-xs text-brand-green">
                  {cartCount} items
                </span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
