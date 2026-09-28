import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Clock, Wind, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { VOLUME_PRICE_MAP } from '../data/products';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedVolume, setSelectedVolume] = useState<string>(product?.volume || '50 ML');
  const [activeImage, setActiveImage] = useState<string>(product?.image || '');
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  // Sync state if product changes
  React.useEffect(() => {
    if (product) {
      setSelectedVolume(product.volume);
      setActiveImage(product.image);
      setIsAddedRecently(false);
    }
  }, [product]);

  if (!product) return null;

  const currentPrice = VOLUME_PRICE_MAP[product.id]?.[selectedVolume] ?? product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedVolume, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-sm shadow-2xl border border-[#EAE4D9] overflow-hidden z-10 my-4 sm:my-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-1.5 sm:p-2 text-[#786E60] hover:text-[#171513] bg-white/80 backdrop-blur-sm rounded-full transition-colors"
            aria-label="Close details"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Product Imagery Showcase */}
            <div className="p-3.5 sm:p-6 bg-[#F5F0E6] flex flex-col justify-center items-center">
              <div className="relative w-full aspect-[4/4.5] max-h-[220px] xs:max-h-[260px] sm:max-h-[320px] rounded-sm overflow-hidden bg-white shadow-sm">
                <img
                  src={activeImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Thumbnail Gallery (if multiple) */}
              {product.galleryImages.length > 1 && (
                <div className="flex gap-2 justify-center mt-3">
                  {product.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-10 h-12 rounded-2xs overflow-hidden border-2 transition-all ${
                        activeImage === img ? 'border-[#8B5A2B] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Concise Olfactory Details & Purchase */}
            <div className="p-3.5 sm:p-7 flex flex-col justify-between space-y-3 sm:space-y-4">
              <div className="space-y-2.5 sm:space-y-3">
                {/* Olfactory Family & Volume */}
                <div className="flex items-center justify-between text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium text-[#8B5A2B]">
                  <span>{product.notes.family}</span>
                  <span className="text-[#9E9282] font-mono text-[9.5px] sm:text-[10px]">{selectedVolume}</span>
                </div>

                {/* Fragrance Name & Subtitle */}
                <div>
                  <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold tracking-wide uppercase text-[#171513]">
                    {product.name}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[#786E60] font-normal tracking-wide mt-0.5">
                    {product.subtitle}
                  </p>
                </div>

                {/* Concise Essence Summary */}
                <p className="text-[11px] sm:text-xs text-[#5C5449] leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {product.description}
                </p>

                {/* Concise Notes Summary */}
                <div className="bg-white p-2.5 sm:p-3 rounded-2xs border border-[#EAE4D9] space-y-1 sm:space-y-1.5 text-xs">
                  <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <span className="text-[9px] sm:text-[9.5px] uppercase tracking-wider font-semibold text-[#8B5A2B] min-w-[34px] sm:min-w-[38px]">
                      Top:
                    </span>
                    <span className="text-[#423C34] text-[10.5px] sm:text-[11px] truncate">{product.notes.top.join(', ')}</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <span className="text-[9px] sm:text-[9.5px] uppercase tracking-wider font-semibold text-[#8B5A2B] min-w-[34px] sm:min-w-[38px]">
                      Heart:
                    </span>
                    <span className="text-[#423C34] text-[10.5px] sm:text-[11px] truncate">{product.notes.heart.join(', ')}</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <span className="text-[9px] sm:text-[9.5px] uppercase tracking-wider font-semibold text-[#8B5A2B] min-w-[34px] sm:min-w-[38px]">
                      Base:
                    </span>
                    <span className="text-[#423C34] text-[10.5px] sm:text-[11px] truncate">{product.notes.base.join(', ')}</span>
                  </div>
                </div>

                {/* Flacon Size Selector (if multiple) */}
                {product.availableVolumes.length > 1 && (
                  <div className="pt-0.5">
                    <span className="text-[9px] sm:text-[9.5px] uppercase tracking-wider text-[#9E9282] font-medium block mb-1">
                      Size:
                    </span>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {product.availableVolumes.map(vol => (
                        <button
                          key={vol}
                          type="button"
                          onClick={() => setSelectedVolume(vol)}
                          className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9.5px] sm:text-[10.5px] font-mono transition-all rounded-2xs ${
                            selectedVolume === vol
                              ? 'bg-[#171513] text-[#FAF7F2] font-semibold border border-[#171513]'
                              : 'bg-white text-[#5C5449] border border-[#DED7CC] hover:border-[#8B5A2B]'
                          }`}
                        >
                          {vol}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price & Add to Cart button */}
              <div className="pt-2.5 sm:pt-3 border-t border-[#EAE4D9] flex items-center justify-between gap-2 sm:gap-3">
                <div className="min-w-0">
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#9E9282] block">Total Price</span>
                  <span className="text-base sm:text-xl font-semibold text-[#171513] font-sans whitespace-nowrap">
                    Rs. {currentPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`py-2 px-2.5 xs:px-3 sm:px-4 rounded-xs text-[9px] xs:text-[10px] sm:text-[10.5px] uppercase tracking-[0.08em] xs:tracking-[0.12em] font-semibold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap shrink-0 ${
                    isAddedRecently
                      ? 'bg-[#2E5A36] text-white'
                      : 'bg-[#171513] text-white hover:bg-[#8B5A2B]'
                  }`}
                >
                  {isAddedRecently ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
