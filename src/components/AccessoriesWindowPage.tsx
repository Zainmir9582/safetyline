import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronRight,
  CheckCircle2,
  Filter,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { navigate, Link } from '../lib/router';
import { AccessoriesWindow, ACCESSORIES_WINDOWS } from '../data/accessoriesWindows';
import { Product, Settings } from '../types';
import SmoothImage from './SmoothImage';
import SEO from './SEO';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import InquiryLoadingModal from './InquiryLoadingModal';

interface AccessoriesWindowPageProps {
  window: AccessoriesWindow;
  products: Product[];
  settings: Settings;
}

export const AccessoriesWindowPage: React.FC<AccessoriesWindowPageProps> = ({
  window: currentWindow,
  products,
  settings
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState('All');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const windowProducts = useMemo(() => {
    return products.filter(p => {
      const isAccessory = p.categoryId === 'cat-hosiery' || p.categoryId === 'cat-accessories';
      if (!isAccessory) return false;

      const sub = (p.subcategory || '').toLowerCase();
      const slug = currentWindow.slug.toLowerCase();
      const pName = p.name.toLowerCase();
      const pCode = (p.productCode || '').toLowerCase();

      const isSubMatch = sub === slug;
      let isKeywordMatch = false;

      if (slug === 'gymwear') {
        isKeywordMatch = pName.includes('gym') || pName.includes('workout') || pName.includes('flexcore') || pCode.includes('gw');
      } else if (slug === 't-shirts') {
        isKeywordMatch = pName.includes('t-shirt') || pName.includes('tee') || pName.includes('crewneck') || pCode.includes('ts');
      } else if (slug === 'jackets') {
        isKeywordMatch = pName.includes('jacket') || pName.includes('windbreaker') || pCode.includes('jk');
      } else if (slug === 'hoodies') {
        isKeywordMatch = pName.includes('hoodie') || pName.includes('pullover') || pCode.includes('hd');
      } else if (slug === 'tracksuits') {
        isKeywordMatch = pName.includes('tracksuit') || pName.includes('track') || pCode.includes('tr');
      }

      return isSubMatch || isKeywordMatch;
    });
  }, [products, currentWindow.slug]);

  const availableSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    windowProducts.forEach(p => {
      p.sizes?.forEach(s => sizeSet.add(s));
    });
    return ['All', ...Array.from(sizeSet)];
  }, [windowProducts]);

  const filteredProducts = useMemo(() => {
    return windowProducts.filter(p => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        p.productCode.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q);

      const matchSize = selectedSize === 'All' || (p.sizes && p.sizes.includes(selectedSize));

      return matchSearch && matchSize;
    });
  }, [windowProducts, searchQuery, selectedSize]);

  const otherWindows = useMemo(() => {
    return ACCESSORIES_WINDOWS.filter(w => w.slug !== currentWindow.slug);
  }, [currentWindow.slug]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      id="accessories-category-page"
      className="min-h-screen bg-[#F7F6F2] text-[#141918] font-sans flex flex-col"
    >
      <SEO
        title={`${currentWindow.title} | Safety Line Accessories`}
        description={`${currentWindow.title}: ${currentWindow.minorDetail} Manufactured at Safety Line's Sialkot industrial facilities.`}
        keywords={`${currentWindow.title}, Safety Line, Accessories, activewear, ${currentWindow.shortTitle}`}
        image={currentWindow.image}
      />

      {/* Unified Architectural Header + Clean Line Switcher */}
      <SiteHeader
        variant="obsidian"
        ctaLabel="Wholesale Inquiry"
        onOpenInquiry={() => setIsInquiryModalOpen(true)}
        subBar={
          <div className="bg-[#091211] border-t border-white/10 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
            <div className="max-w-7xl mx-auto flex items-center gap-1 h-10 text-xs">
              <span className="text-[10px] font-mono text-white/45 uppercase tracking-[0.14em] mr-3 hidden sm:inline shrink-0">
                Apparel Lines
              </span>
              {ACCESSORIES_WINDOWS.map((win) => {
                const isActive = win.slug === currentWindow.slug;
                return (
                  <button
                    key={win.id}
                    type="button"
                    onClick={() => navigate(win.routePath)}
                    className={`relative px-3 h-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <span>{win.title}</span>
                    {isActive && (
                      <span className="absolute left-2 right-2 bottom-0 h-[2px] bg-[#D92227]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        }
      />

      {/* Category Editorial Banner */}
      <section className="bg-[#0E1A19] text-white py-10 sm:py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-white/55">
                <Link to="/accessories" className="hover:text-white transition-colors">Accessories</Link>
                <span>/</span>
                <span className="text-[#D92227] font-semibold">{currentWindow.badge}</span>
                <span>/</span>
                <span>{currentWindow.codePrefix} Series</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                {currentWindow.title}
              </h1>

              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                {currentWindow.minorDetail}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsInquiryModalOpen(true)}
                  className="px-5 py-3 rounded-sm bg-[#D92227] hover:bg-[#B5191D] text-white text-xs font-semibold uppercase tracking-[0.12em] transition-colors cursor-pointer"
                >
                  Request Window OEM Spec Pack
                </button>
              </div>
            </div>

            <div className="shrink-0 w-44 sm:w-56 aspect-[4/3] rounded-sm overflow-hidden border border-white/15 bg-[#122B29]">
              <SmoothImage
                src={currentWindow.image}
                alt={currentWindow.title}
                priority={true}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalogue Listing */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
        {/* Search & Size Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-sm border border-[#E2DFD7] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <h2 className="font-display font-bold text-lg text-[#141918]">
              Apparel Models
            </h2>
            <span className="text-xs font-mono font-semibold text-[#D92227] tabular-nums">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-grow sm:w-64">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#525957]" />
              <input
                type="text"
                placeholder={`Search in ${currentWindow.shortTitle}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F7F6F2] border border-[#E2DFD7] focus:border-[#141918] focus:bg-white rounded-sm py-2 pl-8 pr-3 text-xs text-[#141918] placeholder:text-[#8A908E] outline-none transition-colors"
              />
            </div>

            {availableSizes.length > 2 && (
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="bg-[#F7F6F2] border border-[#E2DFD7] focus:border-[#141918] rounded-sm px-3 py-2 text-xs font-mono text-[#141918] outline-none cursor-pointer"
              >
                {availableSizes.map(s => (
                  <option key={s} value={s}>{s === 'All' ? 'All Sizes' : `Size ${s}`}</option>
                ))}
              </select>
            )}

            {(searchQuery || selectedSize !== 'All') && (
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedSize('All'); }}
                className="text-[11px] font-mono text-[#D92227] hover:underline uppercase font-semibold cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => (
            <article
              key={product.id}
              onClick={() => navigate(`/product/${product.slug}`)}
              className="group cursor-pointer bg-white rounded-sm border border-[#E2DFD7] hover:border-[#141918] transition-colors flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="aspect-[4/3] bg-[#F7F6F2] relative overflow-hidden flex items-center justify-center p-4 border-b border-[#E2DFD7]">
                  <SmoothImage
                    src={product.coverImage}
                    alt={product.name}
                    priority={idx < 3}
                    fallbackText={product.productCode}
                    containerClassName="w-full h-full flex items-center justify-center"
                    className="w-full h-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono tabular-nums">
                    <span className="font-semibold text-[#D92227] uppercase">{product.productCode}</span>
                    <span className="text-[#525957] truncate">
                      {product.sizes && product.sizes.length > 0 ? `${product.sizes.length} Sizes` : currentWindow.title}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#141918] group-hover:text-[#D92227] transition-colors leading-snug">
                    {product.name}
                  </h3>

                  <p className="text-[#525957] text-xs leading-relaxed line-clamp-2">
                    {product.shortDescription}
                  </p>

                  {product.features && product.features.length > 0 && (
                    <div className="pt-2.5 border-t border-[#ECE9E1]">
                      <span className="text-[11px] text-[#525957] flex items-center gap-1.5 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#122B29] shrink-0" />
                        <span className="truncate">{product.features[0]}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-5 py-3.5 border-t border-[#ECE9E1] flex items-center justify-between text-xs font-semibold text-[#141918] group-hover:text-[#D92227] transition-colors">
                <span className="text-[11px] font-mono uppercase tracking-wider">View Specifications</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-sm border border-[#E2DFD7] p-12 text-center space-y-3">
            <Filter className="w-7 h-7 text-[#525957] mx-auto" />
            <h3 className="font-display font-bold text-base text-[#141918]">
              No products found matching your filter
            </h3>
            <p className="text-xs text-[#525957] max-w-xs mx-auto">
              Adjust your search terms or clear active filters.
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedSize('All'); }}
              className="mt-2 bg-[#141918] hover:bg-[#D92227] text-white px-5 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Switch Apparel Lines */}
        <section className="pt-10 border-t border-[#E2DFD7] space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-[#141918]">
              Explore Other Apparel Lines
            </h3>
            <Link
              to="/accessories"
              className="text-xs font-mono font-semibold text-[#D92227] hover:underline uppercase inline-flex items-center gap-1"
            >
              <span>View All 5 Lines</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherWindows.map((win) => (
              <button
                key={win.id}
                type="button"
                onClick={() => navigate(win.routePath)}
                className="group text-left cursor-pointer bg-white p-3.5 rounded-sm border border-[#E2DFD7] hover:border-[#141918] transition-colors flex items-center gap-3.5"
              >
                <div className="w-12 h-12 rounded-sm overflow-hidden shrink-0 bg-[#F7F6F2] border border-[#ECE9E1]">
                  <img
                    src={win.image}
                    alt={win.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-display font-bold text-xs sm:text-sm text-[#141918] group-hover:text-[#D92227] transition-colors truncate">
                    {win.title}
                  </h4>
                  <p className="text-[11px] text-[#525957] truncate">
                    {win.minorDetail}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#525957] group-hover:text-[#D92227] shrink-0" />
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Unified Footer */}
      <Footer settings={settings} />

      <InquiryLoadingModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        settings={settings}
        defaultCategory={`Accessories: ${currentWindow.title}`}
        defaultProductTitle={`${currentWindow.title} Category Window`}
      />
    </motion.div>
  );
};

export default AccessoriesWindowPage;
