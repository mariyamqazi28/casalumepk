import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  isScrolled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'auto',
  isScrolled = false,
  size = 'md',
  className = ''
}) => {
  const isLightMode = variant === 'light' || (variant === 'auto' && !isScrolled);

  const emblemSizes = {
    sm: 'w-6 h-6 sm:w-7 sm:h-7',
    md: 'w-7 h-7 xs:w-8 xs:h-8 md:w-9 md:h-9',
    lg: 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14'
  };

  const textSizes = {
    sm: 'text-xs sm:text-sm tracking-[0.16em] sm:tracking-[0.2em]',
    md: 'text-[13px] xs:text-sm sm:text-base md:text-lg tracking-[0.14em] xs:tracking-[0.18em] sm:tracking-[0.25em]',
    lg: 'text-lg sm:text-xl md:text-2xl tracking-[0.2em] sm:tracking-[0.3em]'
  };

  const subSizes = {
    sm: 'text-[8px] sm:text-[9px] tracking-[0.16em] sm:tracking-[0.2em]',
    md: 'text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.14em] xs:tracking-[0.18em] sm:tracking-[0.24em]',
    lg: 'text-[10px] sm:text-[12px] tracking-[0.2em] sm:tracking-[0.28em]'
  };

  return (
    <div className={`inline-flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 select-none transition-all duration-300 ${className}`}>
      {/* Pristine transparent CL emblem extracted from provided brand logo */}
      <div className={`relative ${emblemSizes[size]} flex-shrink-0 flex items-center justify-center`}>
        <img
          src={isLightMode ? '/images/logo_cl_gold.png' : '/images/logo_cl_black.png'}
          alt="Casalume Emblem"
          className="w-full h-full object-contain filter drop-shadow-sm transition-opacity duration-300"
          loading="eager"
        />
      </div>

      {/* Brand Typography: Black & Brown combination (REGD word removed as requested) */}
      <div className="flex flex-col justify-center leading-none">
        <div className={`font-semibold uppercase flex items-baseline gap-1.5 ${textSizes[size]}`}>
          {/* First word "CASA" */}
          <span className={`transition-colors duration-300 ${isLightMode ? 'text-[#FAF7F2]' : 'text-[#171513]'}`}>
            CASA
          </span>
          {/* Second word "LUME" in warm signature bronze brown */}
          <span className={`transition-colors duration-300 font-medium ${isLightMode ? 'text-[#C5A880]' : 'text-[#8B5A2B]'}`}>
            LUME
          </span>
        </div>
        
        {/* Luxury Category Subtitle */}
        <span className={`uppercase font-medium mt-1 transition-colors duration-300 ${subSizes[size]} ${isLightMode ? 'text-[#E6D7C3]/90' : 'text-[#786E60]'}`}>
          Luxury Perfumes
        </span>
      </div>
    </div>
  );
};
