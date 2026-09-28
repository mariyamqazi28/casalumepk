import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { VOLUME_PRICE_MAP } from '../data/products';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const [selectedVolume, setSelectedVolume] = useState<string>(product.volume);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  // Dynamic price based on volume
  const currentPrice = VOLUME_PRICE_MAP[product.id]?.[selectedVolume] ?? product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVolume, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-md border border-[#EAE4D9] overflow-hidden flex flex-col transition-shadow duration-300 shadow-[0_4px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(139,90,43,0.16)] hover:border-[#8B5A2B]/40 antialiased [text-rendering:optimizeLegibility]"
    >
      {/* 1. Standard E-Commerce Product Image Frame - Crisp, High-Definition without blur */}
      <div
        onClick={() => onQuickView(product)}
        className="relative w-full aspect-[4/3.8] bg-[#F7F4EE] overflow-hidden cursor-pointer select-none"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
          loading="lazy"
          decoding="async"
        />

        {/* View Notes on hover WITHOUT eye icon (only text as requested) */}
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="px-3.5 py-1.5 bg-black/80 backdrop-blur-md rounded-full text-white text-[10px] uppercase tracking-[0.16em] font-semibold border border-[#C5A880]/50 shadow-lg transform translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
            View Notes
          </span>
        </div>

        {/* Extrait / Category Badge */}
        {product.category === 'extrait' && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="bg-[#8B5A2B] text-white text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 font-bold rounded-2xs shadow-xs">
              Extrait
            </span>
          </div>
        )}
      </div>

      {/* 2. Structured Card Content Section (Crisp, High-Contrast Typography) */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-1.5 xs:space-y-2">
        <div>
          {/* Olfactory Family & Volume */}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#8B5A2B] font-bold mb-1">
            <span className="truncate mr-1">{product.notes.family}</span>
            <span className="text-[#4A4339] font-mono text-[9.5px] font-semibold shrink-0">{selectedVolume}</span>
          </div>

          {/* Fragrance Name (Crisp Bold High-Contrast Heading) */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-[13px] xs:text-[13.5px] sm:text-[14px] font-bold text-[#11100E] tracking-wide uppercase cursor-pointer hover:text-[#8B5A2B] transition-colors truncate mb-0.5"
          >
            {product.name}
          </h3>

          {/* Concise Key Scent Signature (Crisp, Non-blurred text) */}
          <p className="text-[10.5px] xs:text-[11px] text-[#332E27] font-medium truncate mb-2">
            {product.subtitle}
          </p>

          {/* Flacon Size Selection Chips with Uniform Height Slot */}
          <div className="min-h-[26px] flex items-center gap-1.5 mb-2">
            <span className="text-[8.5px] xs:text-[9px] uppercase tracking-wider text-[#4A4339] font-bold mr-0.5">
              Size:
            </span>
            {product.availableVolumes.length > 1 ? (
              <div className="flex flex-wrap gap-1">
                {product.availableVolumes.map(vol => (
                  <button
                    key={vol}
                    type="button"
                    onClick={() => setSelectedVolume(vol)}
                    className={`px-1.5 py-0.5 text-[8.5px] xs:text-[9px] font-mono transition-all rounded-2xs ${
                      selectedVolume === vol
                        ? 'bg-[#171513] text-[#FAF7F2] font-bold border border-[#171513]'
                        : 'bg-white text-[#332E27] font-semibold border border-[#DED7CC] hover:border-[#8B5A2B]'
                    }`}
                  >
                    {vol}
                  </button>
                ))}
              </div>
            ) : (
              <span className="px-1.5 py-0.5 text-[8.5px] xs:text-[9px] font-mono font-semibold bg-[#FAF7F2] text-[#332E27] border border-[#EAE4D9] rounded-2xs">
                {product.availableVolumes[0]}
              </span>
            )}
          </div>
        </div>

        {/* 3. Pricing & Compact Add to Cart Action (Strict Horizontal Rupees Alignment & Slightly Increased Button) */}
        <div className="pt-2 sm:pt-2.5 border-t border-[#F0ECE3] flex items-center justify-between gap-1.5 sm:gap-2 mt-auto min-h-11">
          {/* Price (Strictly Aligned) */}
          <div className="flex flex-col justify-center min-w-0 flex-1">
            <span className="text-[8px] uppercase tracking-wider text-[#4A4339] leading-none mb-0.5 font-bold">Price</span>
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-xs xs:text-[13px] sm:text-[14px] font-bold text-[#11100E] font-sans whitespace-nowrap">
                Rs. {currentPrice.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-[8.5px] sm:text-[9px] text-[#6B6051] line-through font-mono font-medium whitespace-nowrap">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Minimized "Add to Cart" Button (Slightly less height, compact & sleek) */}
          <button
            onClick={handleAddToCart}
            className={`h-7 sm:h-7.5 px-2 xs:px-2.5 sm:px-3 rounded-xs text-[8.5px] xs:text-[9px] sm:text-[9.5px] uppercase tracking-[0.06em] xs:tracking-[0.08em] font-bold transition-all duration-300 flex items-center justify-center gap-1 sm:gap-1.5 focus:outline-none shadow-xs whitespace-nowrap shrink-0 ${
              isAddedRecently
                ? 'bg-[#2E5A36] text-white'
                : 'bg-[#171513] text-[#FAF7F2] hover:bg-[#8B5A2B]'
            }`}
          >
            {isAddedRecently ? (
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
    </motion.div>
  );
};
