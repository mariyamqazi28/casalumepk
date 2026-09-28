import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Droplets, Clock, Truck, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroCarousel } from './HeroCarousel';
import { ProductCard } from './ProductCard';
import { PerfumeClockVideoSection } from './PerfumeClockVideoSection';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface HomeViewProps {
  onQuickView: (product: Product) => void;
  onNavigate: (view: string) => void;
  isReady?: boolean;
}

const CUSTOMER_REVIEWS = [
  {
    name: 'Hamza Siddiqui',
    city: 'Lahore',
    product: 'Auralis Extrait',
    text: 'Auralis lasts all day! I sprayed it in the morning before leaving for work, and people were still complimenting me at dinner. Truly incredible lasting quality.',
    rating: 5,
  },
  {
    name: 'Ayesha Tariq',
    city: 'Karachi',
    product: 'Veloura & Daisy Bloom',
    text: 'Veloura smells so smooth, warm, and expensive. The Daisy Bloom candle made my whole drawing room smell fresh and calm. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Zain Malik',
    city: 'Islamabad',
    product: 'Layering Duo',
    text: 'I ordered the custom scent layering pair from this website. The blend is heavenly! Cash on delivery arrived safely within two days in pristine packaging.',
    rating: 5,
  },
  {
    name: 'Bilal Khan',
    city: 'Rawalpindi',
    product: 'Obsidian Mind',
    text: 'Obsidian Mind is deep and masculine. Got so many compliments at a wedding function. The bottle and packaging feel very high-end.',
    rating: 5,
  },
  {
    name: 'Sana Fatima',
    city: 'Faisalabad',
    product: 'Elaria Fresh Floral',
    text: 'Very fresh, clean, and gentle perfume. Perfect for everyday wear in summer. It stays on clothes even after hours in the sun.',
    rating: 5,
  },
  {
    name: 'Mustafa Raza',
    city: 'Multan',
    product: 'Iced Coffee Candle',
    text: 'The coffee candle smells just like a warm coffee cafe. My whole room fills with a cozy aroma. Will definitely order the perfume next.',
    rating: 5,
  },
];

export const HomeView: React.FC<HomeViewProps> = ({ onQuickView, onNavigate, isReady }) => {
  // Flagship perfumes (exclusively home-featured flagship perfumes)
  const flagshipPerfumes = PRODUCTS.filter(p => !p.collectionsOnly && (p.category === 'perfume' || p.category === 'extrait')).slice(0, 8);
  // Scented candles (exclusively home-featured candles)
  const candles = PRODUCTS.filter(p => !p.collectionsOnly && p.category === 'candle');

  const [reviewIndex, setReviewIndex] = useState(0);

  const prevReview = () => {
    setReviewIndex(prev => (prev === 0 ? CUSTOMER_REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setReviewIndex(prev => (prev === CUSTOMER_REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full overflow-hidden">
      {/* 1. Hero Carousel */}
      <HeroCarousel
        isReady={isReady}
        onExplore={() => {
          const el = document.getElementById('flagship-fragrances');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenMixer={() => {
          onNavigate('mixer');
        }}
      />

      {/* 2. Value Proposition Banner (Smooth entrance animation when viewed right after scrolling hero, with luxury box shadow) */}
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="my-6 sm:my-12 px-2.5 xs:px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="bg-white/90 backdrop-blur-xs rounded-lg border border-[#EAE4D9] shadow-[0_8px_30px_rgba(139,90,43,0.08)] hover:shadow-[0_12px_36px_rgba(139,90,43,0.12)] transition-shadow duration-300 py-4 sm:py-8 px-2.5 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 xs:gap-3 sm:gap-6 text-center">
            {/* Div 1: Longevity */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="space-y-1 sm:space-y-1.5 flex flex-col items-center p-1"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-[#EAE4D9] flex items-center justify-center shadow-2xs mb-1"
              >
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B5A2B]" />
              </motion.div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] font-semibold text-[#8B5A2B] block leading-tight">
                18+ Hours Longevity
              </span>
              <span className="text-[9px] sm:text-[11px] text-[#786E60]">High concentration oils</span>
            </motion.div>

            {/* Div 2: Hand-Poured */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="space-y-1 sm:space-y-1.5 flex flex-col items-center border-l border-[#EAE4D9] p-1"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3.0, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-[#EAE4D9] flex items-center justify-center shadow-2xs mb-1"
              >
                <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B5A2B]" />
              </motion.div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] font-semibold text-[#8B5A2B] block leading-tight">
                Hand-Crafted Batches
              </span>
              <span className="text-[9px] sm:text-[11px] text-[#786E60]">Pure botanical essences</span>
            </motion.div>

            {/* Div 3: Free Shipping */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="space-y-1 sm:space-y-1.5 flex flex-col items-center border-t pt-2.5 sm:pt-0 sm:border-t-0 lg:border-l border-[#EAE4D9] p-1"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.8, delay: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-[#EAE4D9] flex items-center justify-center shadow-2xs mb-1"
              >
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B5A2B]" />
              </motion.div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] font-semibold text-[#8B5A2B] block leading-tight">
                Free Express Shipping
              </span>
              <span className="text-[9px] sm:text-[11px] text-[#786E60]">Nationwide on Rs. 4,000+</span>
            </motion.div>

            {/* Div 4: Cash on Delivery */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="space-y-1 sm:space-y-1.5 flex flex-col items-center border-l border-t pt-2.5 sm:pt-0 sm:border-t-0 border-[#EAE4D9] p-1"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.7, delay: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-[#EAE4D9] flex items-center justify-center shadow-2xs mb-1"
              >
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B5A2B]" />
              </motion.div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] font-semibold text-[#8B5A2B] block leading-tight">
                Cash on Delivery
              </span>
              <span className="text-[9px] sm:text-[11px] text-[#786E60]">Pay safely at your door</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 3. Flagship Fragrances Grid (4 in a row) */}
      <section id="flagship-fragrances" className="py-8 sm:py-14 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8"
        >
          <div>
            <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#8B5A2B] font-semibold block mb-1">
              Signature Perfumes
            </span>
            <h2 className="text-lg sm:text-2xl font-bold uppercase tracking-wider text-[#171513]">
              Flagship Fragrances
            </h2>
          </div>

          <button
            onClick={() => onNavigate('collections')}
            className="text-xs uppercase tracking-[0.18em] font-semibold text-[#171513] hover:text-[#8B5A2B] transition-colors flex items-center gap-1.5 group"
          >
            <span>View All Perfumes</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Product Cards Grid: 4 in a row on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {flagshipPerfumes.map(product => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>
      </section>

      {/* 4. Atelier Video Reel & Perfume O'Clock Timepiece (Fixed Background Parallax) */}
      <div id="perfume-clock-video-section">
        <PerfumeClockVideoSection onQuickView={onQuickView} onNavigate={onNavigate} />
      </div>

      {/* Elegant Spacing Gap between Perfume Clock Video and Candle Section */}
      <div className="h-10 sm:h-16 md:h-20" aria-hidden="true" />

      {/* 5. Artisanal Scented Candles Spotlight */}
      <section className="py-8 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8"
        >
          <div>
            <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#8B5A2B] font-semibold block mb-1">
              "Every Flame Holds a Fragrance"
            </span>
            <h2 className="text-lg sm:text-2xl font-bold uppercase tracking-wider text-[#171513]">
              Artisanal Scented Candles
            </h2>
          </div>

          <button
            onClick={() => onNavigate('collections')}
            className="text-xs uppercase tracking-[0.18em] font-semibold text-[#171513] hover:text-[#8B5A2B] transition-colors flex items-center gap-1.5 group"
          >
            <span>Explore All Candles</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* 4 Candles in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {candles.map(candle => (
            <ProductCard key={candle.id} product={candle} onQuickView={onQuickView} />
          ))}
        </div>
      </section>

      {/* 6. Brand Atelier Spotlight Banner with FIXED BACKGROUND PARALLAX EFFECT */}
      <section
        className="relative py-16 sm:py-28 px-3 sm:px-6 lg:px-8 bg-fixed bg-cover bg-center text-[#FAF7F2] overflow-hidden"
        style={{ backgroundImage: `url('/images/signature-trio.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px]" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-2xl mx-auto text-center space-y-3 sm:space-y-3.5 z-10"
        >
          <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C5A880] font-medium block">
            Live The Luxury • Wear The Memory
          </span>
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider text-white">
            The Casalume Olfactory Philosophy
          </h2>
          <p className="text-[11px] xs:text-xs sm:text-[13px] text-[#DED7CC] max-w-lg mx-auto leading-relaxed font-normal px-2">
            Crafted with pure natural perfume oils and rich botanical essences. Every Casalume creation is formulated
            to last long on your skin, projecting warmth and supreme elegance throughout your day and night.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('about')}
              className="px-5 sm:px-6 py-2 sm:py-2.5 bg-[#FAF7F2] text-[#171513] hover:bg-[#8B5A2B] hover:text-white transition-all text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] font-semibold rounded-sm shadow-md"
            >
              Read Our Story
            </button>
          </div>
        </motion.div>
      </section>

      {/* 7. Verified Client Reviews Section: ONE ROW SCROLLING ANIMATION */}
      <section className="py-10 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-center gap-1 text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h3 className="text-lg sm:text-2xl font-bold uppercase tracking-wider text-[#171513]">
            Loved by Our Customers
          </h3>
          <p className="text-xs text-[#786E60] mt-1 font-normal">
            Over 500+ happy perfume lovers across Karachi, Lahore, Islamabad, and nationwide.
          </p>
        </motion.div>

        {/* Single Row Continuous Smooth Scrolling Animation (Looping Marquee) */}
        <div className="relative overflow-hidden py-2 max-w-full">
          <motion.div
            className="flex gap-3.5 sm:gap-5 w-max"
            animate={{ x: [0, -1100] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 25,
                ease: 'linear',
              },
            }}
          >
            {[...CUSTOMER_REVIEWS, ...CUSTOMER_REVIEWS].map((review, idx) => (
              <div
                key={`review-${idx}`}
                className="w-[240px] xs:w-[280px] sm:w-[320px] bg-white p-3.5 sm:p-5 rounded-sm border border-[#EAE4D9] shadow-[0_4px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(139,90,43,0.12)] flex-shrink-0 flex flex-col justify-between hover:border-[#8B5A2B]/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-1 text-yellow-400 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#423C34] leading-relaxed">
                    "{review.text}"
                  </p>
                </div>
                <div className="pt-2.5 sm:pt-3 mt-2.5 sm:mt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#171513] text-[11px] sm:text-xs">{review.name}</span>
                  <span className="text-[#8B5A2B] font-mono text-[9.5px] sm:text-[10.5px] font-medium">{review.city}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
