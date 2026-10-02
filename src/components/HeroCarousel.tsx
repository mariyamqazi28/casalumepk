import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';

interface HeroCarouselProps {
  onExplore: () => void;
  onOpenMixer: () => void;
  isReady?: boolean;
}

interface Slide {
  id: number;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  featuredProduct: string;
}

// Hero Slides with the user's provided image as Slide 1
const SLIDES: Slide[] = [
  {
    id: 1,
    image: '/images/auralis-hero-user.jpg', // User's provided clean image without text overlays
    badge: 'Flagship Signature • 18+ Hours Longevity',
    title: 'CASALUME',
    subtitle: 'LUXURY PERFUMES',
    description: 'Elevate your everyday presence with long-lasting signature perfumes formulated with fine botanical oils and rich notes.',
    featuredProduct: 'Discover Auralis'
  },
  {
    id: 2,
    image: '/images/veloura-car.jpg', // Veloura in classic luxury interior
    badge: 'Velvety • Sensual • Addictive',
    title: 'LIVE THE LUXURY',
    subtitle: 'WEAR THE MEMORY',
    description: 'An enigmatic blend of bourbon amber, Turkish rose, and smoked suede designed to captivate every room you enter.',
    featuredProduct: 'Experience Veloura'
  },
  {
    id: 3,
    image: '/images/lunavelle-yacht.jpg', // Mediterranean seaside
    badge: 'Summer Essence • Mediterranean Coast',
    title: 'SMELLS LIKE VACATION',
    subtitle: 'LUNAVELLE 50 ML',
    description: 'French lavender sprigs kissed by solar sea breeze and golden stardust sand, capturing eternal coastal warmth.',
    featuredProduct: 'Explore Lunavelle'
  },
  {
    id: 4,
    image: '/images/elaria-50ml.jpg', // Clean Elaria photograph on shoreline sand with lime and ice
    badge: 'Graceful • Feminine • Timeless',
    title: 'ELARIA',
    subtitle: 'PURE FLORAL MAJESTY',
    description: 'A whisper of dewy white peony, Sicilian green lime, and crystalline white musk that lingers with effortless poise.',
    featuredProduct: 'Explore Elaria'
  }
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onExplore, onOpenMixer, isReady = true }) => {
  const [current, setCurrent] = useState(0);

  // Synchronized timer: does not count down while splash screen is active,
  // ensuring the first image receives the exact same full display time (6.0s) as all other images.
  useEffect(() => {
    if (!isReady) return;

    const timer = setTimeout(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, 6000);

    return () => clearTimeout(timer);
  }, [current, isReady]);

  const nextSlide = () => setCurrent(prev => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrent(prev => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative w-full h-[88vh] sm:h-screen min-h-[580px] overflow-hidden bg-[#0D0C0A]">
      {/* Background Imagery Cross-Fade */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={SLIDES[current].image}
            alt={SLIDES[current].title}
            className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.08]"
            loading={current === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
          {/* Subtle multi-layer luxury overlay gradients for crystal-clear readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A] via-black/45 to-black/60" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/65 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Foreground Hero Content with Minimized, Refined Typography */}
      <div className="relative z-10 max-w-5xl mx-auto h-full px-3 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="max-w-2xl flex flex-col items-center mt-12 sm:mt-6 w-full"
          >
            {/* Elegant Sub-Header Chip */}
            <span className="inline-block max-w-[96%] truncate px-2.5 xs:px-3.5 py-1 rounded-full border border-[#C5A880]/35 bg-black/40 backdrop-blur-md text-[#C5A880] text-[8.5px] xs:text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] xs:tracking-[0.18em] sm:tracking-[0.22em] font-medium mb-3 sm:mb-4 shadow-xs">
              {SLIDES[current].badge}
            </span>

            {/* Minimized Clean Heading */}
            <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-light text-[#FAF7F2] tracking-[0.14em] xs:tracking-[0.18em] sm:tracking-[0.22em] uppercase font-sans mb-2 sm:mb-2.5 drop-shadow-sm break-words max-w-full">
              {SLIDES[current].title}
            </h1>

            {/* Minimized Subtitle */}
            <p className="text-[11px] xs:text-xs sm:text-sm md:text-base font-normal text-[#C5A880] tracking-[0.16em] xs:tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4 font-sans max-w-full">
              {SLIDES[current].subtitle}
            </p>

            {/* Refined Description Body */}
            <p className="text-[11px] xs:text-xs sm:text-[13px] md:text-sm text-[#DED7CC]/90 font-light max-w-lg leading-relaxed mb-5 sm:mb-7 px-1">
              {SLIDES[current].description}
            </p>

            {/* Call To Action Buttons (Sleek & Proportional) */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-4 xs:px-6 py-2.5 xs:py-3 bg-[#FAF7F2] text-[#171513] hover:bg-[#8B5A2B] hover:text-white transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-[0.14em] xs:tracking-[0.2em] font-medium rounded-sm shadow-lg focus:outline-none flex items-center justify-center gap-2 group"
              >
                <span>Explore Collection</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>

              <button
                onClick={onOpenMixer}
                className="w-full sm:w-auto px-4 xs:px-6 py-2.5 xs:py-3 bg-black/40 hover:bg-black/60 text-[#FAF7F2] border border-[#C5A880]/40 hover:border-[#C5A880] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-[0.14em] xs:tracking-[0.2em] font-medium rounded-sm backdrop-blur-md focus:outline-none"
              >
                Brand Film
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Slide Indicators & Controls */}
        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 max-w-6xl mx-auto px-3 sm:px-6 flex items-center justify-between pointer-events-none">
          {/* Slide dots */}
          <div className="flex items-center space-x-2 pointer-events-auto">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full focus:outline-none ${
                  current === idx ? 'w-7 bg-[#C5A880]' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Quick scroll down indicator */}
          <button
            onClick={onExplore}
            className="hidden md:flex flex-col items-center gap-1 text-white/50 hover:text-[#C5A880] transition-colors pointer-events-auto cursor-pointer focus:outline-none"
            aria-label="Scroll to collection"
          >
            <span className="text-[9px] uppercase tracking-widest font-mono">SCROLL</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </button>

          {/* Prev / Next Arrows */}
          <div className="flex items-center space-x-1.5 pointer-events-auto">
            <button
              onClick={prevSlide}
              className="p-1.5 rounded-full border border-white/20 bg-black/30 hover:bg-[#8B5A2B] text-white transition-all backdrop-blur-sm focus:outline-none"
              aria-label="Previous fragrance slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-1.5 rounded-full border border-white/20 bg-black/30 hover:bg-[#8B5A2B] text-white transition-all backdrop-blur-sm focus:outline-none"
              aria-label="Next fragrance slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
