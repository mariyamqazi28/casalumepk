import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Droplets, Flame, Award } from 'lucide-react';
import { Logo } from './Logo';

export const AboutView: React.FC = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* 1. Top Brand Logo Hero Showcase with Animation Movement (Starts from Top, Viewable Without Scrolling) */}
      <section className="relative w-full h-[40vh] sm:h-[50vh] min-h-[290px] sm:min-h-[340px] flex items-center justify-center overflow-hidden bg-[#0D0C0A]">
        {/* Animated Background Image Movement (Smooth Slow Zoom & Pan) */}
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/images/signature-trio.jpg"
            alt="Casalume Logo Showcase Background"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1]"
            loading="eager"
          />
          {/* Subtle warm overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#FAF7F2]" />
        </motion.div>

        {/* Floating Brand Emblem & Typography in Center with Smooth Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-3"
        >
          {/* Animated CL Emblem */}
          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-full bg-white/90 backdrop-blur-md border-2 border-[#C5A880]/50 p-3 xs:p-4 shadow-2xl flex items-center justify-center mb-2.5 xs:mb-3"
          >
            <img
              src="/images/logo_cl_brown.png"
              alt="Casalume Logo"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </motion.div>

          <h1 className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-semibold tracking-[0.16em] xs:tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white flex items-center justify-center gap-1.5 xs:gap-2 drop-shadow-md">
            <span>CASA</span>
            <span className="text-[#C5A880]">LUME</span>
          </h1>

          <p className="text-[9.5px] xs:text-[11px] sm:text-xs uppercase tracking-[0.16em] xs:tracking-[0.2em] sm:tracking-[0.25em] text-[#E6D7C3] font-medium mt-1.5 drop-shadow-sm">
            Luxury Perfumes & Scented Candles
          </p>
        </motion.div>
      </section>

      {/* 2. Main Content Wrapper */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* GAP before The Art of Casalume section so it is not sticky with the hero image */}
        <section className="pt-10 sm:pt-16 pb-8 sm:pb-14 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2.5"
          >
            <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#8B5A2B] font-semibold block mb-1">
              Our Journey & Passion
            </span>
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-semibold uppercase tracking-wide text-[#171513]">
              The Art of Casalume
            </h2>
            <p className="text-xs sm:text-[13px] uppercase tracking-[0.2em] text-[#8B5A2B] font-semibold">
              Luxury Perfumes & Handcrafted Scents
            </p>
            <p className="text-xs sm:text-sm md:text-base text-[#423C34] leading-relaxed font-normal pt-2">
              Casalume was founded with a deep devotion to unforgettable fragrances. We believe that true luxury
              takes patience and devotion. Every perfume flacon and scented candle is hand-poured in micro-batches
              using high-concentration essential essences, designed to stay on your skin for 18+ hours and create
              beautiful memories wherever you go.
            </p>
          </motion.div>
        </section>

        {/* Visual Showcase Collage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-3.5 sm:p-4 rounded-md border border-[#EAE4D9] shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(139,90,43,0.14)] flex flex-col hover:border-[#8B5A2B]/40 transition-all duration-300"
          >
            <div className="aspect-[4/4.5] rounded-sm overflow-hidden bg-[#FAF7F2] mb-3">
              <img
                src="/images/signature-trio.jpg"
                alt="Casalume Signature Trio"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="text-xs sm:text-[13px] uppercase tracking-[0.16em] font-semibold text-[#171513]">
              Signature Extraits
            </h3>
            <p className="text-xs text-[#5C5449] mt-1 leading-relaxed">
              Long-lasting formulas guaranteeing 18+ hours of radiant, unforgettable scent.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-3.5 sm:p-4 rounded-md border border-[#EAE4D9] shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(139,90,43,0.14)] flex flex-col md:-translate-y-3 hover:border-[#8B5A2B]/40 transition-all duration-300"
          >
            <div className="aspect-[4/4.5] rounded-sm overflow-hidden bg-[#FAF7F2] mb-3">
              <img
                src="/images/perfume-mist-spray.jpg"
                alt="Fine Atomizer Mist"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="text-xs sm:text-[13px] uppercase tracking-[0.16em] font-semibold text-[#171513]">
              Fine Mist Spray
            </h3>
            <p className="text-xs text-[#5C5449] mt-1 leading-relaxed">
              Micro-mist atomizer diffusion that wraps your clothes and pulse points in a soft fragrance cloud.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-3.5 sm:p-4 rounded-md border border-[#EAE4D9] shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(139,90,43,0.14)] flex flex-col sm:col-span-2 md:col-span-1 hover:border-[#8B5A2B]/40 transition-all duration-300"
          >
            <div className="aspect-[4/4.5] rounded-sm overflow-hidden bg-[#FAF7F2] mb-3">
              <img
                src="/images/candle-lifestyle-warm.jpg"
                alt="Artisanal Hand-Poured Scented Candles"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="text-xs sm:text-[13px] uppercase tracking-[0.16em] font-semibold text-[#171513]">
              "Every Flame Holds a Fragrance"
            </h3>
            <p className="text-xs text-[#5C5449] mt-1 leading-relaxed">
              Clean-burning natural soy and coconut wax candles hand-poured in sculptural shapes.
            </p>
          </motion.div>
        </div>

        {/* 3. The Casalume Standard / Pillars of Integrity Section */}
        {/* Background color: Lume Logo Brown #8B5A2B, Animated Icons, Minimal Bottom Gap before Footer */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-[#8B5A2B] rounded-lg border border-[#A67C52] p-4 xs:p-6 sm:p-10 md:p-12 text-white shadow-2xl mb-10 sm:mb-16"
        >
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-10">
            <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#FAF7F2]/90 font-semibold block mb-1">
              The Casalume Standard
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold uppercase tracking-wide text-white">
              Pillars of Integrity
            </h2>
            <p className="text-xs text-[#FAF7F2]/80 mt-1.5 font-normal">
              Our core promises of quality and craftsmanship in every bottle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Pillar 1 */}
            <div className="text-center space-y-2.5">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="w-12 h-12 rounded-full bg-white text-[#8B5A2B] flex items-center justify-center mx-auto shadow-md cursor-pointer"
              >
                <Droplets className="w-5 h-5 stroke-[2.2]" />
              </motion.div>
              <h4 className="text-sm uppercase tracking-wider font-semibold text-white">
                Pure Natural Oils
              </h4>
              <p className="text-xs text-[#FAF7F2]/85 leading-relaxed">
                Made with premium French florals, Taif rose, Mysore sandalwood, and warm amber resins.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="text-center space-y-2.5">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.15, rotate: -5 }}
                className="w-12 h-12 rounded-full bg-white text-[#8B5A2B] flex items-center justify-center mx-auto shadow-md cursor-pointer"
              >
                <Award className="w-5 h-5 stroke-[2.2]" />
              </motion.div>
              <h4 className="text-sm uppercase tracking-wider font-semibold text-white">
                18+ Hours Longevity
              </h4>
              <p className="text-xs text-[#FAF7F2]/85 leading-relaxed">
                High-concentration oils formulated to endure from morning work into late-night dinners.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="text-center space-y-2.5">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="w-12 h-12 rounded-full bg-white text-[#8B5A2B] flex items-center justify-center mx-auto shadow-md cursor-pointer"
              >
                <Flame className="w-5 h-5 stroke-[2.2]" />
              </motion.div>
              <h4 className="text-sm uppercase tracking-wider font-semibold text-white">
                Hand-Crafted in Batches
              </h4>
              <p className="text-xs text-[#FAF7F2]/85 leading-relaxed">
                Every candle and perfume is hand-blended in small fresh batches to ensure supreme freshness.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="text-center space-y-2.5">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.15, rotate: -5 }}
                className="w-12 h-12 rounded-full bg-white text-[#8B5A2B] flex items-center justify-center mx-auto shadow-md cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </motion.div>
              <h4 className="text-sm uppercase tracking-wider font-semibold text-white">
                Authentic Quality
              </h4>
              <p className="text-xs text-[#FAF7F2]/85 leading-relaxed">
                Trusted by thousands across Pakistan with prompt doorstep delivery and safe Cash on Delivery.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
