import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Check, ArrowRight, RefreshCw, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ScentLayeringMixerProps {
  onQuickView?: (product: Product) => void;
}

interface ClockMood {
  time: string;
  label: string;
  mood: string;
  productId: string;
  pairProductId: string;
  pairName: string;
  quote: string;
  accent: string;
}

const CLOCK_MOODS: ClockMood[] = [
  {
    time: '08:00 AM',
    label: 'Morning Poise',
    mood: 'Crisp Bergamot & Mysore Sandalwood',
    productId: 'auralis',
    pairProductId: 'veloura',
    pairName: 'Veloura Extrait',
    quote: 'Awaken with sharp executive clarity and unshakeable poise that commands respect from first spray.',
    accent: '#C5A880'
  },
  {
    time: '01:00 PM',
    label: 'Sunlit Radiance',
    mood: 'Dewy Grasse Peony, Lime & White Musk',
    productId: 'elaria',
    pairProductId: 'rosalind',
    pairName: 'Rosalind Bloom',
    quote: 'A revitalizing midday floral breeze that feels effortless, clean, and radiant under the bright afternoon sun.',
    accent: '#E6D7C3'
  },
  {
    time: '06:00 PM',
    label: 'Golden Hour Sunset',
    mood: 'Solar Sea Breeze, Ambergris & French Lavender',
    productId: 'lunavelle',
    pairProductId: 'rosalind',
    pairName: 'Rosalind Breeze',
    quote: 'Golden stardust sand and coastal warm breezes as work winds down into sunset dinners and evening strolls.',
    accent: '#D4AF37'
  },
  {
    time: '10:00 PM',
    label: 'Velvet Midnight',
    mood: 'Bourbon Amber, Smoked Suede & Dark Agarwood',
    productId: 'veloura',
    pairProductId: 'auralis',
    pairName: 'Auralis Extrait',
    quote: 'An intimate, hypnotic sillage of warm amber and smoked suede designed to linger until early dawn.',
    accent: '#8B5A2B'
  }
];

export const ScentLayeringMixer: React.FC<ScentLayeringMixerProps> = ({ onQuickView }) => {
  const { addToCart } = useCart();
  const [activeMode, setActiveMode] = useState<'persona' | 'quiz'>('persona');
  const [selectedMoodIndex, setSelectedMoodIndex] = useState(0);
  const [isSingleAdded, setIsSingleAdded] = useState(false);
  const [isDuoAdded, setIsDuoAdded] = useState(false);

  // Guarantee instant viewport alignment on page load to watch entrance animations
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Quiz State
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<{ vibe?: string; intensity?: string; occasion?: string }>({});
  const [quizRecommendation, setQuizRecommendation] = useState<Product | null>(null);

  const currentMood = CLOCK_MOODS[selectedMoodIndex];
  const activeProduct = PRODUCTS.find(p => p.id === currentMood.productId) || PRODUCTS[0];
  const pairProduct = PRODUCTS.find(p => p.id === currentMood.pairProductId) || PRODUCTS[1];

  // Duo pricing with 10% discount
  const rawDuoPrice = activeProduct.price + pairProduct.price;
  const duoPrice = Math.round(rawDuoPrice * 0.9);

  const handleAddSingleToCart = () => {
    addToCart(activeProduct, activeProduct.volume, 1);
    setIsSingleAdded(true);
    setTimeout(() => setIsSingleAdded(false), 1400);
  };

  const handleAddDuoToCart = () => {
    addToCart(activeProduct, activeProduct.volume, 1);
    addToCart(pairProduct, pairProduct.volume, 1);
    setIsDuoAdded(true);
    setTimeout(() => setIsDuoAdded(false), 1500);
  };

  // Quiz questions
  const quizQuestions = [
    {
      question: 'What olfactory vibe resonates most with your spirit?',
      options: [
        { label: 'Crisp, Airy & Effortless Poise', category: 'floral_fresh' },
        { label: 'Deep, Smoky, Mysterious & Magnetic', category: 'dark_oriental' },
        { label: 'Sun-drenched, Ocean Breeze & Lavender', category: 'aquatic_vacation' },
        { label: 'Rich, Velvety, Warm Amber & Leather', category: 'amber_suede' }
      ]
    },
    {
      question: 'What longevity and projection do you demand?',
      options: [
        { label: 'Extrait Powerhouse (18+ to 24+ Hours Projection)', category: 'extrait' },
        { label: 'Graceful & Intimate Sillage', category: 'moderate' },
        { label: 'Vibrant & Invigorating Room Presence', category: 'vibrant' }
      ]
    },
    {
      question: 'Where will you most often wear this fragrance?',
      options: [
        { label: 'Signature Daily / Executive Elegance', category: 'daily' },
        { label: 'Evening Dinners, Galas & Intimate Moments', category: 'night' },
        { label: 'Weekend Escapes & Mediterranean Vacations', category: 'vacation' }
      ]
    }
  ];

  const handleAnswerQuiz = (optionCategory: string) => {
    if (quizStep === 0) setQuizAnswers({ ...quizAnswers, vibe: optionCategory });
    if (quizStep === 1) setQuizAnswers({ ...quizAnswers, intensity: optionCategory });
    if (quizStep === 2) {
      let match = PRODUCTS.find(p => p.id === 'auralis')!;
      if (quizAnswers.vibe === 'dark_oriental') {
        match = PRODUCTS.find(p => p.id === 'obsidian-mind') || match;
      } else if (quizAnswers.vibe === 'amber_suede') {
        match = PRODUCTS.find(p => p.id === 'veloura') || match;
      } else if (quizAnswers.vibe === 'aquatic_vacation') {
        match = PRODUCTS.find(p => p.id === 'lunavelle') || match;
      } else if (quizAnswers.vibe === 'floral_fresh') {
        match = PRODUCTS.find(p => p.id === 'elaria') || match;
      }
      setQuizRecommendation(match);
      setQuizStep(3);
      return;
    }
    setQuizStep(prev => prev + 1);
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizRecommendation(null);
  };

  return (
    <section className="pt-1 sm:pt-2 pb-10 sm:pb-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header with 'Craft Your Signature Scent' on top and minimized heading */}
      <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
        <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-wide uppercase text-[#171513]">
          Craft Your Signature Scent
        </h2>
        <p className="text-[11px] xs:text-[11.5px] sm:text-xs text-[#5C5449] mt-1 leading-relaxed font-normal max-w-lg mx-auto px-1">
          Explore our signature scents by the hour or take our quick 1-minute quiz to find the perfect perfume for you.
        </p>

        {/* Mode Toggle Pills */}
        <div className="inline-flex p-1 bg-[#F0ECE3] rounded-full mt-3.5 border border-[#DED7CC] shadow-xs">
          <button
            onClick={() => setActiveMode('persona')}
            className={`px-3 xs:px-4 py-1 text-[11px] xs:text-xs uppercase tracking-wider font-semibold rounded-full transition-all ${
              activeMode === 'persona'
                ? 'bg-[#8B5A2B] text-white shadow-xs'
                : 'text-[#5C5449] hover:text-[#171513]'
            }`}
          >
            Hour & Persona
          </button>
          <button
            onClick={() => setActiveMode('quiz')}
            className={`px-3 xs:px-4 py-1 text-[11px] xs:text-xs uppercase tracking-wider font-semibold rounded-full transition-all ${
              activeMode === 'quiz'
                ? 'bg-[#8B5A2B] text-white shadow-xs'
                : 'text-[#5C5449] hover:text-[#171513]'
            }`}
          >
            Scent Finder Quiz
          </button>
        </div>
      </div>

      {activeMode === 'persona' ? (
        /* Scent Layering Container - Seamless with Page Body (#FAF7F2) with Modern Glassmorphism */
        <div className="relative rounded-2xl bg-[#FAF7F2] p-1.5 xs:p-2 sm:p-4 overflow-hidden">
          {/* Subtle Ambient Warm Glass Glow */}
          <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-[#C5A880]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-[#8B5A2B]/10 blur-3xl pointer-events-none" />

          {/* 2-Column Responsive Layout with Smooth Left & Right Entrance Animations on launch */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch relative z-10">
            {/* Div 1: Left Showcase Card (Animates gracefully from Left on mount with extended duration) */}
            <motion.div
              initial={{ opacity: 0, x: -110 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 bg-white/75 backdrop-blur-2xl p-3.5 sm:p-5 md:p-6 rounded-2xl border border-white/80 shadow-[0_12px_40px_rgba(139,90,43,0.07)] ring-1 ring-[#C5A880]/25 text-[#171513] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2.5 border-b border-[#EAE4D9] pb-2">
                <span className="text-[9.5px] xs:text-[10px] uppercase tracking-[0.16em] xs:tracking-[0.2em] font-bold text-[#8B5A2B] truncate mr-1">
                  {currentMood.label}
                </span>
                <span className="text-[9px] xs:text-[9.5px] uppercase font-semibold text-[#786E60] shrink-0">
                  {activeProduct.notes.family}
                </span>
              </div>

              {/* Bottle Visual Showcase with Increased Height */}
              <div
                onClick={() => onQuickView && onQuickView(activeProduct)}
                className="relative w-full h-48 xs:h-56 sm:h-64 md:h-72 bg-[#F5F1E8]/70 backdrop-blur-sm rounded-xl overflow-hidden flex items-center justify-center border border-[#EAE4D9] shadow-inner cursor-pointer group mb-3"
              >
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.98] group-hover:brightness-100"
                />
                {/* View Notes overlay on hover WITHOUT eye icon (only text as requested) */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="text-[10px] uppercase tracking-wider text-white font-semibold bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C5A880]/50 shadow-md">
                    View Notes
                  </span>
                </div>
              </div>

              {/* Dominant Notes Accord Pills */}
              <div>
                <span className="text-[8.5px] xs:text-[9px] uppercase tracking-wider text-[#8B5A2B] font-semibold block mb-1.5">
                  Olfactory Notes Signature:
                </span>
                <div className="flex flex-wrap gap-1">
                  {[...activeProduct.notes.top.slice(0, 2), ...activeProduct.notes.base.slice(0, 2)].map((note, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white/80 backdrop-blur-sm text-[#171513] text-[9px] xs:text-[9.5px] font-medium rounded-2xs border border-[#EAE4D9] shadow-2xs"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Div 2: Right Selection Card (Animates gracefully from Right on mount with extended duration) */}
            <motion.div
              initial={{ opacity: 0, x: 110 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 bg-white/75 backdrop-blur-2xl p-3.5 sm:p-5 md:p-6 rounded-2xl border border-white/80 shadow-[0_12px_40px_rgba(139,90,43,0.07)] ring-1 ring-[#C5A880]/25 text-[#171513] flex flex-col justify-between"
            >
              {/* Select Your Hour & Persona Title */}
              <div className="mb-3">
                <span className="text-[9px] xs:text-[9.5px] uppercase tracking-[0.18em] xs:tracking-[0.22em] text-[#8B5A2B] font-semibold block mb-0.5">
                  Timepiece Selection
                </span>
                <h3 className="text-sm xs:text-base sm:text-lg font-bold uppercase tracking-wide text-[#171513]">
                  Select Your Hour & Persona:
                </h3>
              </div>

              {/* 4 Interactive Hour Pills (Modern Frosted Glass) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 mb-3.5">
                {CLOCK_MOODS.map((mood, idx) => {
                  const isSelected = selectedMoodIndex === idx;
                  return (
                    <button
                      key={mood.time}
                      onClick={() => setSelectedMoodIndex(idx)}
                      className={`p-1.5 xs:p-2 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-[#8B5A2B] border-[#8B5A2B] text-white shadow-md scale-[1.02]'
                          : 'bg-white/60 backdrop-blur-sm border-[#EAE4D9] text-[#5C5449] hover:border-[#8B5A2B]/50 hover:bg-white hover:text-[#171513]'
                      }`}
                    >
                      <span className="font-mono text-[9.5px] xs:text-[10.5px] font-bold block leading-none">
                        {mood.time}
                      </span>
                      <span className="text-[8.5px] xs:text-[9.5px] truncate block opacity-90 mt-0.5 font-medium">
                        {mood.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Mood Details with Smooth Fade-in / Fade-out Movement */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMood.productId}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="mb-3.5"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-[#8B5A2B] text-white text-[8.5px] uppercase tracking-wider font-semibold rounded-2xs">
                      {currentMood.label}
                    </span>
                    <span className="text-[11px] text-[#8B5A2B] font-semibold font-mono">
                      {currentMood.time}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold uppercase tracking-wide text-[#171513] mt-0.5">
                    {activeProduct.name}
                  </h4>

                  <p className="text-[11px] text-[#8B5A2B] font-medium italic mt-0.5">
                    {currentMood.mood}
                  </p>

                  <p className="text-[11px] text-[#5C5449] mt-1.5 leading-relaxed font-normal bg-white/70 backdrop-blur-sm p-2 rounded-md border border-[#EAE4D9]">
                    "{currentMood.quote}"
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Single Bottle Pricing & Add to Cart Action */}
              <div className="pt-2 sm:pt-2.5 border-t border-[#EAE4D9] flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[7.5px] xs:text-[8px] uppercase tracking-wider text-[#786E60] block font-medium">
                    Bottle Price ({activeProduct.volume})
                  </span>
                  <span className="text-xs xs:text-sm sm:text-base font-bold text-[#171513] font-sans">
                    Rs. {activeProduct.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {onQuickView && (
                    <button
                      onClick={() => onQuickView(activeProduct)}
                      className="h-7 sm:h-7.5 px-2 xs:px-2.5 rounded-xs border border-[#DED7CC] hover:border-[#8B5A2B] text-[#5C5449] hover:text-[#8B5A2B] text-[8.5px] xs:text-[9.5px] uppercase tracking-wider font-semibold transition-colors bg-white/80"
                    >
                      Notes
                    </button>
                  )}

                  {/* Minimized "Add to Cart" Button */}
                  <button
                    onClick={handleAddSingleToCart}
                    className={`h-7 sm:h-7.5 px-2.5 xs:px-3 rounded-xs text-[8.5px] xs:text-[9.5px] uppercase tracking-[0.06em] xs:tracking-[0.08em] font-semibold transition-all duration-300 flex items-center justify-center gap-1 xs:gap-1.5 focus:outline-none shadow-xs whitespace-nowrap ${
                      isSingleAdded
                        ? 'bg-[#2E5A36] text-white'
                        : 'bg-[#171513] text-[#FAF7F2] hover:bg-[#8B5A2B]'
                    }`}
                  >
                    {isSingleAdded ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Curated Scent Layering Duo Option (Modern Frosted Glass) */}
              <div className="mt-2.5 pt-2 sm:pt-2.5 border-t border-dashed border-[#EAE4D9] bg-white/80 backdrop-blur-sm p-2 sm:p-2.5 rounded-lg border border-[#C5A880]/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 shadow-2xs">
                <div>
                  <span className="text-[8px] xs:text-[8.5px] uppercase tracking-wider text-[#8B5A2B] font-bold block">
                    Layering Duo Special (10% Off)
                  </span>
                  <span className="text-[10.5px] xs:text-[11px] text-[#171513] font-semibold truncate block">
                    Blend {activeProduct.name} + {currentMood.pairName}
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xs font-bold text-[#171513]">
                      Rs. {duoPrice.toLocaleString()}
                    </span>
                    <span className="text-[9px] xs:text-[9.5px] text-[#786E60] line-through font-mono">
                      Rs. {rawDuoPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddDuoToCart}
                  className={`w-full sm:w-auto h-7 sm:h-7.5 px-2.5 rounded-xs text-[8.5px] xs:text-[9px] uppercase tracking-[0.06em] xs:tracking-[0.08em] font-semibold transition-all flex items-center justify-center gap-1 shadow-xs whitespace-nowrap shrink-0 ${
                    isDuoAdded
                      ? 'bg-[#2E5A36] text-white'
                      : 'bg-[#8B5A2B] text-white hover:bg-[#5C3818]'
                  }`}
                >
                  {isDuoAdded ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Duo Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add Duo to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        /* Scent Finder Quiz in Matching Page Body Background & Modern Glass */
        <div className="bg-[#FAF7F2] rounded-2xl p-2 sm:p-4 max-w-2xl mx-auto">
          <div className="bg-white/75 backdrop-blur-2xl rounded-2xl p-5 sm:p-7 text-[#171513] shadow-[0_12px_40px_rgba(139,90,43,0.07)] border border-white/80 ring-1 ring-[#C5A880]/25">
            {quizStep < 3 ? (
              <div>
                {/* Quiz progress */}
                <div className="flex items-center justify-between text-xs text-[#8B5A2B] font-bold uppercase tracking-wider mb-3">
                  <span>Question {quizStep + 1} of 3</span>
                  <span>Discover Your Scent</span>
                </div>

                <div className="w-full h-1.5 bg-[#F0ECE3] rounded-full mb-5 overflow-hidden">
                  <div
                    className="h-full bg-[#8B5A2B] transition-all duration-300"
                    style={{ width: `${((quizStep + 1) / 3) * 100}%` }}
                  />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#171513] mb-5">
                  {quizQuestions[quizStep].question}
                </h3>

                <div className="space-y-2.5">
                  {quizQuestions[quizStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerQuiz(opt.category)}
                      className="w-full text-left p-3.5 rounded-lg border border-[#EAE4D9] hover:border-[#8B5A2B] hover:bg-white transition-colors text-xs font-medium text-[#171513] flex items-center justify-between group bg-white/60 shadow-2xs"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8B5A2B] group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Quiz Recommendation Screen */
              quizRecommendation && (
                <div className="text-center space-y-4">
                  <div className="w-10 h-10 rounded-full bg-[#8B5A2B]/10 text-[#8B5A2B] flex items-center justify-center mx-auto border border-[#8B5A2B]/30">
                    <Check className="w-5 h-5" />
                  </div>

                  <div>
                    <span className="text-[9.5px] uppercase tracking-[0.22em] text-[#8B5A2B] font-semibold block mb-1">
                      Your Fragrance Match
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wide text-[#171513]">
                      {quizRecommendation.name}
                    </h3>
                    <p className="text-xs text-[#8B5A2B] italic mt-0.5 font-medium">"{quizRecommendation.tagline}"</p>
                  </div>

                  <div className="w-36 h-48 sm:w-44 sm:h-56 mx-auto rounded-xl overflow-hidden bg-[#F7F4EE] border border-[#EAE4D9] shadow-sm">
                    <img
                      src={quizRecommendation.image}
                      alt={quizRecommendation.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="text-xs text-[#5C5449] max-w-md mx-auto leading-relaxed font-normal">
                    {quizRecommendation.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-3 border-t border-[#EAE4D9]">
                    <button
                      onClick={() => addToCart(quizRecommendation, quizRecommendation.volume, 1)}
                      className="w-full sm:w-auto h-8 px-4 bg-[#8B5A2B] text-white hover:bg-[#5C3818] transition-colors text-xs uppercase tracking-[0.12em] font-semibold rounded-xs flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add {quizRecommendation.name} to Cart</span>
                    </button>

                    <button
                      onClick={resetQuiz}
                      className="w-full sm:w-auto h-8 px-4 border border-[#DED7CC] text-[#5C5449] hover:border-[#8B5A2B] hover:text-[#171513] text-xs uppercase tracking-wider font-semibold rounded-xs flex items-center justify-center gap-1.5 bg-white"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Retake Quiz</span>
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </section>
  );
};
