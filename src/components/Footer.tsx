import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, Mail, Check, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setIsSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#141210] text-[#FAF7F2] border-t border-[#8B5A2B]/20 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10">
          {/* Column 1 & 2: Brand Identity & Manifesto */}
          <div className="lg:col-span-2 space-y-3.5">
            {/* Same Logo in Footer as Navbar (without REGD) */}
            <Logo variant="light" size="md" />

            <p className="text-xs text-[#DED7CC]/80 font-light leading-relaxed max-w-sm mt-2">
              "Live the luxury. Wear the memory." Artisanal perfumery and handcrafted candles
              distilled in small batches in Pakistan. Formulated with exquisite essences for 18+ hours of projection.
            </p>

            <div className="pt-1">
              <span className="text-[10px] text-white/50 block">
                Karachi • Lahore • Islamabad • Nationwide Express Courier
              </span>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A880] mb-3.5">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#DED7CC]/70">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white hover:underline transition-all"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-white hover:underline transition-all"
                >
                  All Fragrance Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mixer')}
                  className="hover:text-white hover:underline transition-all"
                >
                  Scent Layering Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white hover:underline transition-all"
                >
                  About Casalume
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Scent Families */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A880] mb-3.5">
              Creations
            </h4>
            <ul className="space-y-2 text-xs text-[#DED7CC]/70">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('collections')}>
                  Auralis Extrait (50ml / 100ml)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('collections')}>
                  Veloura Eau de Parfum
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('collections')}>
                  Obsidian Mind Extrait
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('collections')}>
                  Elaria & Rosalind Florals
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('collections')}>
                  Artisanal Scented Candles
                </span>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter & Social Club */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A880] mb-3.5">
              Private Salon
            </h4>
            <p className="text-xs text-[#DED7CC]/70 mb-3 leading-relaxed">
              Subscribe to receive exclusive invitations to private batch releases and layering insights.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-sm text-xs text-white placeholder-white/40 focus:border-[#C5A880] focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-[#C5A880] hover:text-white transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {isSubscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#C5A880] mt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Welcome to the Casalume Circle.</span>
                </div>
              )}
            </form>

            {/* Dedicated Social Media Cluster */}
            <div className="pt-3">
              <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-2 font-medium">
                Connect With Us
              </span>
              <div className="flex items-center space-x-2.5">
                {/* Official Instagram link as requested */}
                <a
                  href="https://www.instagram.com/casalume.pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-white/5 hover:bg-[#8B5A2B] text-[#DED7CC] hover:text-white transition-all duration-300 border border-white/10"
                  aria-label="Casalume Instagram @casalume.pk"
                  title="Official Instagram @casalume.pk"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-white/5 hover:bg-[#8B5A2B] text-[#DED7CC] hover:text-white transition-all duration-300 border border-white/10"
                  aria-label="Casalume Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                {/* X / Twitter */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-white/5 hover:bg-[#8B5A2B] text-[#DED7CC] hover:text-white transition-all duration-300 border border-white/10"
                  aria-label="Casalume on X"
                >
                  <Twitter className="w-4 h-4" />
                </a>

                {/* Mail contact */}
                <a
                  href="mailto:concierge@casalume.pk"
                  className="p-1.5 rounded-full bg-white/5 hover:bg-[#8B5A2B] text-[#DED7CC] hover:text-white transition-all duration-300 border border-white/10"
                  aria-label="Email Casalume Concierge"
                  title="concierge@casalume.pk"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright without REGD word */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10.5px] xs:text-[11px] text-white/40 font-light text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
            <span>© 2026 CASA LUME. All Rights Reserved.</span>
            <span>•</span>
            <a href="https://www.instagram.com/casalume.pk/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A880] transition-colors">
              @casalume.pk
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Shipping & Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
