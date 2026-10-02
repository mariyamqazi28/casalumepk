import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ArrowUpDown, Search, X, Check } from 'lucide-react';
import { PRODUCTS, FRAGRANCE_FAMILIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface CollectionsViewProps {
  onQuickView: (product: Product) => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({ onQuickView }) => {
  const [selectedFamily, setSelectedFamily] = useState<string>('All Collections');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category / Family filter
      let matchesFamily = true;
      if (selectedFamily === 'Extrait de Parfum') {
        matchesFamily = product.category === 'extrait' || product.subtitle.includes('Extrait');
      } else if (selectedFamily === 'Signature Perfumes') {
        matchesFamily = product.category === 'perfume';
      } else if (selectedFamily === 'Artisanal Candles') {
        matchesFamily = product.category === 'candle';
      } else if (selectedFamily !== 'All Collections') {
        matchesFamily = product.notes.family === selectedFamily;
      }

      // Search query
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.top.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.notes.base.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesFamily && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedFamily, sortBy, searchQuery]);

  // Count items per category for sidebar
  const getCategoryCount = (family: string) => {
    if (family === 'All Collections') return PRODUCTS.length;
    if (family === 'Extrait de Parfum') return PRODUCTS.filter(p => p.category === 'extrait' || p.subtitle.includes('Extrait')).length;
    if (family === 'Signature Perfumes') return PRODUCTS.filter(p => p.category === 'perfume').length;
    if (family === 'Artisanal Candles') return PRODUCTS.filter(p => p.category === 'candle').length;
    return PRODUCTS.filter(p => p.notes.family === family).length;
  };

  return (
    <section className="pt-24 sm:pt-28 pb-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Banner Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-1"
      >
        <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#8B5A2B] font-semibold block mb-1.5">
          Signature Scents & Candles
        </span>
        <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold tracking-wider uppercase text-[#171513]">
          All Collections
        </h1>
        <p className="text-xs sm:text-[13px] text-[#5C5449] mt-2 leading-relaxed font-normal">
          From 18+ hours long-lasting perfumes to hand-poured sculpted soy candles.
          Every creation is bottled and packaged with pure care.
        </p>
      </motion.div>

      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden flex items-center justify-between gap-2 mb-6 bg-white p-2.5 sm:p-3.5 rounded-md border border-[#EAE4D9] shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#8B5A2B] bg-[#FAF7F2] px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-sm border border-[#8B5A2B]/20 min-w-0"
        >
          <Filter className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">
            {selectedFamily === 'All Collections' ? 'Filters' : selectedFamily}
          </span>
        </button>

        <span className="text-xs font-mono text-[#786E60] shrink-0">
          {filteredProducts.length} items
        </span>
      </div>

      {/* Main 2-Column Layout: Left Side Navbar Filter + Right Product Grid */}
      <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-8">
        {/* Left Side Navbar Filter (Desktop Sticky Sidebar) */}
        <aside
          className={`w-full md:w-64 lg:w-72 flex-shrink-0 ${
            isMobileFilterOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="bg-white p-3.5 sm:p-5 rounded-md border border-[#EAE4D9] shadow-[0_4px_20px_rgba(0,0,0,0.06)] md:sticky md:top-24 space-y-5 sm:space-y-6">
            {/* Sidebar Title */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#8B5A2B]" />
                <h3 className="text-xs uppercase tracking-[0.18em] font-bold text-[#171513]">
                  Filter Fragrances
                </h3>
              </div>
              {(selectedFamily !== 'All Collections' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedFamily('All Collections');
                    setSearchQuery('');
                  }}
                  className="text-[11px] text-[#8B5A2B] hover:underline font-bold"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Scent Search Bar */}
            <div>
              <label className="text-[10.5px] uppercase tracking-wider font-bold text-[#786E60] block mb-1.5">
                Search
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9282]" />
                <input
                  type="text"
                  placeholder="Search scent notes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-[#FAF7F2] border border-[#DED7CC] rounded-sm text-xs text-[#171513] placeholder-[#9E9282] focus:border-[#8B5A2B] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9E9282] hover:text-[#171513]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Fragrance Families Vertical Navigation Links */}
            <div>
              <label className="text-[10.5px] uppercase tracking-wider font-bold text-[#786E60] block mb-2">
                Collections & Notes
              </label>
              <div className="flex flex-col space-y-1">
                {FRAGRANCE_FAMILIES.map(family => {
                  const isSelected = selectedFamily === family;
                  const count = getCategoryCount(family);
                  return (
                    <button
                      key={family}
                      onClick={() => {
                        setSelectedFamily(family);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-sm text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#8B5A2B] text-white font-bold shadow-xs'
                          : 'text-[#2B2722] hover:bg-[#FAF7F2] hover:text-[#8B5A2B] font-medium'
                      }`}
                    >
                      <span className="truncate mr-2">{family}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-2xs ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-[#786E60]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort Order Selector */}
            <div>
              <label className="text-[10.5px] uppercase tracking-wider font-bold text-[#786E60] block mb-1.5">
                Sort By
              </label>
              <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#DED7CC] rounded-sm px-2.5 py-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#786E60]" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-semibold text-[#171513] focus:outline-none cursor-pointer w-full"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="rating">Top Rated & Loved</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Help / Concierge note */}
            <div className="pt-2 border-t border-stone-100 text-[11px] text-[#786E60] space-y-1">
              <span className="font-bold text-[#8B5A2B] block">Need help picking?</span>
              <p>Watch our Brand Film to experience our signature flacons in motion.</p>
            </div>
          </div>
        </aside>

        {/* Right Product Grid Area */}
        <main className="flex-1 min-w-0">
          {/* Top Info Bar */}
          <div className="hidden md:flex items-center justify-between pb-4 mb-6 border-b border-[#EAE4D9]">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold uppercase tracking-wider text-[#171513]">
                {selectedFamily}
              </h2>
              <span className="text-xs text-[#786E60] font-mono">
                ({filteredProducts.length} items)
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#786E60]">
              <span>Active view:</span>
              <span className="font-bold text-[#8B5A2B] uppercase tracking-wider">
                {sortBy === 'featured' ? 'Featured' : sortBy === 'rating' ? 'Top Rated' : sortBy === 'price-asc' ? 'Price Low-High' : 'Price High-Low'}
              </span>
            </div>
          </div>

          {/* Product Cards Grid: Set according to side navbar (3 columns on desktop, 4 on extra wide, 2 on tablet, 1 on mobile) */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-md border border-[#EAE4D9] shadow-xs">
              <p className="text-base font-bold text-[#171513] uppercase tracking-wider mb-2">
                No Fragrances Found
              </p>
              <p className="text-xs text-[#786E60] mb-4">
                No products matched "{searchQuery}". Try searching for another scent note or clear filters.
              </p>
              <button
                onClick={() => {
                  setSelectedFamily('All Collections');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 bg-[#8B5A2B] text-white text-xs uppercase tracking-wider font-bold rounded-sm hover:bg-[#5C3818] transition-colors"
              >
                Show All Fragrances
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedFamily}-${sortBy}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5"
              >
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product.collectionImage ? { ...product, image: product.collectionImage } : product}
                    onQuickView={onQuickView}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </main>
      </div>
    </section>
  );
};
