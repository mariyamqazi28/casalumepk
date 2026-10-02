import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScentLayeringMixerProps {
  onQuickView?: (product?: any) => void;
  onNavigate?: (view?: string) => void;
}

export const ScentLayeringMixer: React.FC<ScentLayeringMixerProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = 'https://v1.pinimg.com/videos/iht/expMp4/49/86/14/4986148c7f16c1169e3aa4963c9febb2_720w.mp4';
  const posterSrc = 'https://i.pinimg.com/736x/58/21/bc/5821bc8dcb53b3acd79629936e166979.jpg';

  useEffect(() => {
    window.scrollTo(0, 0);

    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback for mobile autoplay policy
        const handleTouch = () => {
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
          window.removeEventListener('touchstart', handleTouch);
          window.removeEventListener('click', handleTouch);
        };
        window.addEventListener('touchstart', handleTouch, { once: true });
        window.addEventListener('click', handleTouch, { once: true });
      });
    }
  }, []);

  return (
    <div className="relative w-full h-[100dvh] min-h-[500px] overflow-hidden bg-[#0A0908] select-none text-white flex items-end justify-center">
      {/* 1. Full-Screen Edge-to-Edge 3D Perfume Film */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={posterSrc}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none scale-[1.01]"
      >
        <source src={videoSrc} type="video/mp4" />
        <source src="/videos/perfume-clock-video.mp4" type="video/mp4" />
        <source src="/videos/homepage-background.mp4" type="video/mp4" />
      </video>

      {/* 2. Soft Ambient Vignette for Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none z-10" />

      {/* 3. Single Minimal Line with Easy Vocabulary & Small Font Size */}
      <div className="relative z-20 pb-8 sm:pb-12 px-4 text-center pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-xs sm:text-sm tracking-[0.26em] sm:tracking-[0.32em] font-light uppercase text-[#FAF7F2]/80 drop-shadow-md"
        >
          The Art of Perfume
        </motion.p>
      </div>
    </div>
  );
};
