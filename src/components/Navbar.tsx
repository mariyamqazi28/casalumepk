import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Instagram } from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'collections', label: 'Collections' },
    { id: 'mixer', label: 'Brand Film' },
    { id: 'about', label: 'About Casalume' },
  ];

  // In the 3 sections (Collections, Mixer, About) OR when scrolled on Home:
  // Use lighter transparency (glassmorphism bg-white/80) so navigation links (li) are clearly visible with dark luxury typography!
  const isHeroTop = (activeView === 'home' && !isScrolled) || activeView === 'mixer';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isHeroTop
          ? 'bg-gradient-to-b from-black/65 via-black/20 to-transparent py-4 text-white'
          : 'bg-white/80 backdrop-blur-md border-b border-[#8B5A2B]/10 py-3 shadow-xs text-[#171513]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center text-left focus:outline-none group"
            aria-label="Casalume Home"
          >
            <Logo
              variant={isHeroTop ? 'light' : 'dark'}
              isScrolled={!isHeroTop}
              size="md"
            />
          </button>

          {/* Desktop Navigation Links (li / items clearly visible) */}
          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map(link => {
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`text-[13px] uppercase font-medium tracking-[0.18em] transition-all relative py-1 focus:outline-none ${
                    isHeroTop
                      ? isActive
                        ? 'text-[#C5A880] font-semibold'
                        : 'text-[#FAF7F2]/85 hover:text-white'
                      : isActive
                      ? 'text-[#8B5A2B] font-semibold'
                      : 'text-[#2B2722] hover:text-[#8B5A2B]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                        isHeroTop ? 'bg-[#C5A880]' : 'bg-[#8B5A2B]'
                      }`}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons (Instagram, Cart, Mobile Menu) */}
          <div className="flex items-center space-x-1.5 xs:space-x-2.5 sm:space-x-4">
            {/* Instagram Official Link */}
            <a
              href="https://www.instagram.com/casalume.pk/"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors hidden sm:flex items-center justify-center ${
                isHeroTop
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-[#423C34] hover:text-[#8B5A2B] hover:bg-[#FAF7F2]'
              }`}
              title="Official Instagram @casalume.pk"
              aria-label="Instagram @casalume.pk"
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* Shopping Cart Button with active red counter (no border radius box) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-1.5 xs:p-2 rounded-full transition-all focus:outline-none flex items-center justify-center ${
                isHeroTop
                  ? 'text-white hover:bg-white/10'
                  : 'text-[#171513] hover:bg-[#F5F0E6] hover:text-[#8B5A2B]'
              }`}
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingBag className="w-4.5 h-4.5 xs:w-5 xs:h-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={totalItems}
                  className="absolute -top-1 -right-1.5 text-red-600 font-extrabold text-[12px] leading-none drop-shadow-sm select-none"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-1.5 rounded-md focus:outline-none transition-colors ${
                  isHeroTop
                    ? 'text-white hover:bg-white/10'
                    : 'text-[#171513] hover:bg-stone-100'
                }`}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[#8B5A2B]/15 text-[#171513] overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-5 space-y-3.5">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 text-xs uppercase tracking-[0.2em] font-medium border-b border-stone-100 ${
                    activeView === link.id ? 'text-[#8B5A2B] font-semibold pl-1.5' : 'text-[#2B2722]'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-2 flex items-center justify-between">
                <a
                  href="https://www.instagram.com/casalume.pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#8B5A2B] font-medium py-1"
                >
                  <Instagram className="w-4 h-4" />
                  @casalume.pk
                </a>

                <span className="text-[10px] font-mono text-[#786E60]">
                  Luxury Perfumes
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
