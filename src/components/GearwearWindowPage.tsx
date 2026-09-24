import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { navigate, Link } from '../lib/router';
import { GearwearWindow, GEARWEAR_WINDOWS } from '../data/gearwearWindows';
import { Product, Settings } from '../types';
import SmoothImage from './SmoothImage';
import SEO from './SEO';
import brandLogo from '../assets/images/safetyline_landing.png';

interface GearwearWindowPageProps {
  window: GearwearWindow;
  products: Product[];
  settings: Settings;
}

export const GearwearWindowPage: React.FC<GearwearWindowPageProps> = ({
  window: currentWindow,
  products,
  settings
}) => {
  // Search and size filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState('All');

  // Filter products belonging to this specific category window
  const windowProducts = useMemo(() => {
    return products.filter(p => {
      if (p.categoryId !== 'cat-gearwear') return false;
      
      const sub = (p.subcategory || '').toLowerCase();
      const slug = currentWindow.slug.toLowerCase();
      const pName = p.name.toLowerCase();
      const pCode = (p.productCode || '').toLowerCase();

      // Check subcategory match or keywords
      const isSubMatch = sub === slug;
      let isKeywordMatch = false;

      if (slug === 'tactical-gloves') {
        isKeywordMatch = pName.includes('tactical') || pName.includes('glove') || pCode.includes('tg');
      } else if (slug === 'road-cycling-apparel') {
        isKeywordMatch = pName.includes('cycl') || pName.includes('road') || pName.includes('aero') || pCode.includes('rc');
      } else if (slug === 'car-racing') {
        isKeywordMatch = pName.includes('racing') || pName.includes('motor') || pName.includes('kart') || pCode.includes('cr');
      } else if (slug === 'weight-lifting') {
        isKeywordMatch = pName.includes('lift') || pName.includes('weight') || pName.includes('belt') || pCode.includes('wl');
      }

      return isSubMatch || isKeywordMatch;
    });
  }, [products, currentWindow.slug]);

  // Extract available sizes in this category
  const availableSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    windowProducts.forEach(p => {
      p.sizes?.forEach(s => sizeSet.add(s));
    });
    return ['All', ...Array.from(sizeSet)];
  }, [windowProducts]);

  // Filter products by search and size
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

  // Other windows for quick switcher
  const otherWindows = useMemo(() => {
    return GEARWEAR_WINDOWS.filter(w => w.slug !== currentWindow.slug);
  }, [currentWindow.slug]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      id="gearwear-category-page" 
      className="min-h-screen bg-[#FAFCFB] text-[#1A1A1A] font-sans pb-24"
    >
      <SEO
        title={`${currentWindow.title} | Safety Line Product Catalogue`}
        description={`${currentWindow.title}: ${currentWindow.minorDetail} Engineered at Safety Line's Sialkot industrial facilities.`}
        keywords={`${currentWindow.title}, Safety Line, Gearwear, sports manufacturing, ${currentWindow.shortTitle}`}
        image={currentWindow.image}
      />

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0B3D3B] text-white border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo & Category Identification */}
          <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
            <img
              src={brandLogo}
              alt="Safety Line"
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display font-black text-sm sm:text-base tracking-[0.16em] uppercase leading-none">
                <span className="text-[#EA2227]">SAFETY</span> <span className="text-white">LINE</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#D9F0EC] uppercase">
                Gearwear • {currentWindow.shortTitle}
              </span>
            </div>
          </Link>

          {/* Navigation link back to all categories */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => navigate('/gearwear')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Categories</span>
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF5A36] hover:bg-[#e44e2b] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Wholesale Inquiry</span>
            </button>
          </div>

        </div>

        {/* Quick Category Bar */}
        <div className="bg-[#072725] border-t border-white/10 px-4 sm:px-8 py-2 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline">
              Categories:
            </span>
            {GEARWEAR_WINDOWS.map((win) => {
              const isActive = win.slug === currentWindow.slug;
              return (
                <button
                  key={win.id}
                  onClick={() => navigate(win.routePath)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FF5A36] text-white font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {win.title}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Category Banner */}
      <section className="bg-gradient-to-b from-[#0B3D3B] to-[#082D2B] text-white py-10 sm:py-12 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          
          {/* Breadcrumb Trail */}
          <div className="flex items-center space-x-2 text-xs font-mono text-[#D9F0EC]">
            <Link to="/" className="hover:text-white transition-colors">Portal</Link>
            <span>/</span>
            <Link to="/gearwear" className="hover:text-white transition-colors">Gearwear</Link>
            <span>/</span>
            <span className="text-white font-bold">{currentWindow.title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Left Content */}
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[#D9F0EC] text-[11px] font-mono font-semibold uppercase tracking-wider">
                <span>{currentWindow.badge}</span>
                <span>•</span>
                <span>{currentWindow.codePrefix} Series</span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                {currentWindow.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
                {currentWindow.minorDetail}
              </p>
            </div>

            {/* Right Thumbnail Visual */}
            <div className="shrink-0 w-36 sm:w-44 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-slate-800">
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

      {/* Product Listing Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-8">
        
        {/* Filter and Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Item count & active label */}
          <div className="flex items-center space-x-2">
            <span className="font-display font-extrabold text-lg text-[#0B3D3B]">
              Products
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>

          {/* Search & Size Filters */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-grow sm:w-60">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder={`Search in ${currentWindow.shortTitle}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-xl py-1.5 pl-8 pr-3 text-xs text-[#1A1A1A] placeholder:text-slate-400 outline-none transition-colors"
              />
            </div>

            {/* Size Filter Dropdown */}
            {availableSizes.length > 2 && (
              <div className="flex items-center space-x-1.5">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Size:</span>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="bg-[#FAFCFB] border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono text-[#0B3D3B] outline-none cursor-pointer"
                >
                  {availableSizes.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            {(searchQuery || selectedSize !== 'All') && (
              <button
                onClick={() => { setSearchQuery(''); setSelectedSize('All'); }}
                className="text-[11px] font-mono text-[#FF5A36] hover:underline uppercase font-bold cursor-pointer"
              >
                Reset ×
              </button>
            )}

          </div>

        </div>

        {/* Product Listing Grid with Transitions */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                onClick={() => navigate(`/product/${product.slug}`)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200 hover:border-[#FF5A36] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Product Image Frame */}
                  <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden flex items-center justify-center p-3 border-b border-slate-100">
                    <SmoothImage
                      src={product.coverImage}
                      alt={product.name}
                      priority={idx < 3}
                      fallbackText={product.productCode}
                      containerClassName="w-full h-full flex items-center justify-center"
                      className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-106"
                    />

                    {/* Product Code Badge */}
                    <div className="absolute top-3 left-3 bg-[#0B3D3B] text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase shadow-xs">
                      {product.productCode}
                    </div>

                    {/* Sizing Indicator */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[#0B3D3B] px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase shadow-xs">
                        {product.sizes.length} Sizes
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF5A36] font-bold block">
                      {product.material ? product.material.split(',')[0] : currentWindow.title}
                    </span>

                    <h3 className="font-display font-bold text-base text-[#0B3D3B] group-hover:text-[#FF5A36] transition-colors leading-snug">
                      {product.name}
                    </h3>

                    <p className="text-slate-600 text-xs font-normal leading-relaxed line-clamp-2">
                      {product.shortDescription}
                    </p>

                    {/* Features snippet */}
                    {product.features && product.features.length > 0 && (
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[11px] text-slate-500 flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{product.features[0]}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0">
                  <div className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center justify-between transition-all bg-[#D9F0EC] group-hover:bg-[#0B3D3B] text-[#0B3D3B] group-hover:text-white">
                    <span>View Specifications</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state if search yields no results */}
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Filter className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="font-display font-bold text-base text-[#0B3D3B]">
              No products found matching your filter
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Try adjusting your search terms or clearing active filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedSize('All'); }}
              className="mt-2 bg-[#0B3D3B] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Switch Category Strip */}
        <section className="pt-12 border-t border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-[#0B3D3B]">
              Explore Other Categories
            </h3>
            <Link
              to="/gearwear"
              className="text-xs font-mono font-bold text-[#FF5A36] hover:underline uppercase inline-flex items-center gap-1"
            >
              <span>View All 4 Categories</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherWindows.map((win) => (
              <div
                key={win.id}
                onClick={() => navigate(win.routePath)}
                className="group cursor-pointer bg-white p-4 rounded-xl border border-slate-200 hover:border-[#FF5A36] transition-all hover:shadow-md flex items-center space-x-3.5"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={win.image}
                    alt={win.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-display font-bold text-xs sm:text-sm text-[#0B3D3B] group-hover:text-[#FF5A36] transition-colors truncate">
                    {win.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate font-normal">
                    {win.minorDetail}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF5A36] group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))}
          </div>
        </section>

      </main>

    </motion.div>
  );
};

export default GearwearWindowPage;
