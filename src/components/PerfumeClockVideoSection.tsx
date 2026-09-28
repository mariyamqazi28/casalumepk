import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface PerfumeClockVideoSectionProps {
  onQuickView?: (product: any) => void;
  onNavigate: (view: string) => void;
}

export const PerfumeClockVideoSection: React.FC<PerfumeClockVideoSectionProps> = ({
  onNavigate
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Guarantee seamless video playback on mobile screens (iOS Safari, Android Chrome)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback for mobile power-saver mode: play on first scroll or touch
        const handleInteraction = () => {
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
          window.removeEventListener('touchstart', handleInteraction);
          window.removeEventListener('scroll', handleInteraction);
        };
        window.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
        window.addEventListener('scroll', handleInteraction, { once: true, passive: true });
      });
    }
  }, []);

  return (
    <section className="relative py-16 sm:py-22 md:py-26 px-3 sm:px-6 lg:px-8 text-white overflow-hidden flex items-center justify-center min-h-[360px] sm:min-h-[430px] md:min-h-[470px]">
      {/* 1. Real Video Playing on Background with Full Opacity (Elevated presence, plays on mobile) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/veloura-car.jpg"
          preload="auto"
          className="w-full h-full object-cover scale-[1.01]"
        >
          <source src="/videos/perfume-clock-video.mp4" type="video/mp4" />
          <source src="/videos/homepage-background.mp4" type="video/mp4" />
        </video>

        {/* Minimal subtle vignette so video shines through with full clarity */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      <div className="relative max-w-lg mx-auto z-10 w-full text-center">
        {/* Custom Fragrance Gateway Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5 }}
          onClick={() => onNavigate('mixer')}
          className="bg-black/50 backdrop-blur-md border border-[#C5A880]/40 hover:border-[#C5A880]/80 rounded-xl p-3.5 xs:p-4 sm:p-5 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-pointer group transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#C5A880] font-semibold block mb-1">
            Custom Fragrance
          </span>

          {/* Minimized Heading Font Size */}
          <h3 className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider text-white mb-1.5">
            Craft Your Signature Scent
          </h3>

          <p className="text-[10.5px] xs:text-[11px] sm:text-[11.5px] text-[#DED7CC]/95 max-w-sm mx-auto leading-relaxed mb-3.5 sm:mb-4 font-light">
            Blend your custom signature duo in our Scent Layering Studio.
          </p>

          {/* Launch Button with Expanded Background Width to ensure arrow stays inside on hover */}
          <button
            type="button"
            className="px-4 xs:px-6 sm:px-7 pr-5 xs:pr-7 sm:pr-8 py-2 sm:py-2.5 bg-[#8B5A2B] group-hover:bg-[#A67C52] text-white text-[9.5px] xs:text-[10px] sm:text-[10.5px] uppercase tracking-[0.14em] sm:tracking-[0.16em] font-semibold rounded-xs shadow-md whitespace-nowrap transition-all inline-flex items-center justify-center gap-1.5 sm:gap-2 overflow-hidden"
          >
            <span>Launch Scent Layering</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
