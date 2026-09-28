import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [statusMessage, setStatusMessage] = useState('DISTILLING BOTANICAL ESSENCES');

  useEffect(() => {
    // Paced comfortably to stay for ~5.5 to 6.0 seconds as requested
    const intervalTime = 52; // 100 steps * 52ms = ~5.2s + 450ms settle
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoaded(true);
            if (onFinish) onFinish();
          }, 450);
          return 100;
        }

        const next = prev + 1;
        if (next < 25) {
          setStatusMessage('DISTILLING BOTANICAL ESSENCES');
        } else if (next < 50) {
          setStatusMessage('AGING RARE ABSOLUTES IN FINE GLASS');
        } else if (next < 75) {
          setStatusMessage('HARMONIZING FLACON PYRAMIDS');
        } else if (next < 95) {
          setStatusMessage('BLENDING SIGNATURE NOTES');
        } else {
          setStatusMessage('ENTERING CASALUME ATELIER');
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onFinish]);

  const handleSkip = () => {
    setIsLoaded(true);
    if (onFinish) onFinish();
  };

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-[#171513] overflow-hidden select-none"
        >
          {/* Subtle warm luxury ambient radial background on bright white */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,90,43,0.06),transparent_65%)] pointer-events-none" />

          {/* Skip option on top-right */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[10px] sm:text-[11px] uppercase font-mono tracking-widest text-[#8B5A2B] hover:text-[#5C3818] transition-colors py-1.5 px-3 rounded-full border border-[#8B5A2B]/30 hover:border-[#8B5A2B] bg-[#FAF7F2] z-20 shadow-2xs"
          >
            Skip →
          </button>

          {/* Logo CL Letter Emblem as in Navbar (Same Font Color Brown) */}
          <div className="relative mb-6 sm:mb-7 flex items-center justify-center">
            {/* Outer soft ambient ring */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-[#8B5A2B]/20 pointer-events-none"
            />
            
            {/* Elegant Emblem Container */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#FAF7F2] border border-[#8B5A2B]/30 p-3.5 sm:p-5 flex items-center justify-center shadow-lg relative z-10"
            >
              <img
                src="/images/logo_cl_brown.png"
                alt="Casalume CL Emblem"
                className="w-full h-full object-contain filter drop-shadow-sm"
                loading="eager"
              />
            </motion.div>
          </div>

          {/* Luxury Brand Typography (CASA LUME in Brown & Dark, Bold Headings) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center space-y-1.5 sm:space-y-2 z-10"
          >
            <h1 className="text-xl xs:text-2xl md:text-3xl font-bold tracking-[0.2em] sm:tracking-[0.28em] uppercase flex items-center justify-center gap-1.5 sm:gap-2">
              <span className="text-[#171513]">CASA</span>
              <span className="text-[#8B5A2B]">LUME</span>
            </h1>
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8B5A2B] font-semibold">
              Luxury Perfumes
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <div className="mt-6 sm:mt-8 flex flex-col items-center gap-2 z-10 px-4">
            <div className="w-48 xs:w-56 h-[3px] bg-stone-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#8B5A2B] to-[#C5A880]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <div className="flex justify-between w-48 xs:w-56 text-[9.5px] xs:text-[10.5px] font-mono tracking-wider text-[#786E60]">
              <span className="truncate mr-2 font-medium">{statusMessage}</span>
              <span className="text-[#8B5A2B] font-bold shrink-0">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
