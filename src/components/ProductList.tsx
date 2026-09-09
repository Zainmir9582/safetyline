import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowRight, Layers, Sparkles, X } from 'lucide-react';
import { motion } from 'motion/react';
import { navigate } from '../lib/router';
import { Product, Category } from '../types';
import SEO from './SEO';

interface ProductListProps {
  categorySlug: 'gearwear' | 'hosiery';
  products: Product[];
  categories: Category[];
}

export default function ProductList({ categorySlug, products, categories }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');

  const currentCategory = useMemo(() => {
    return categories.find(c => c.slug === categorySlug);
  }, [categories, categorySlug]);

  // Filter products by category, search, sizes, and colors
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (p.status !== 'Active') return false;
      if (currentCategory && p.categoryId !== currentCategory.id) return false;

      const s = searchQuery.toLowerCase().trim();
      const matchesSearch = s === '' || 
        p.name.toLowerCase().includes(s) ||
        p.shortDescription.toLowerCase().includes(s) ||
        p.productCode.toLowerCase().includes(s) ||
        p.material.toLowerCase().includes(s);

      const matchesSize = selectedSize === 'All' || p.sizes.includes(selectedSize);
      const matchesColor = selectedColor === 'All' || p.colors.includes(selectedColor);

      return matchesSearch && matchesSize && matchesColor;
    });
  }, [products, currentCategory, searchQuery, selectedSize, selectedColor]);

  // Extract all available sizes and colors for dynamic filtering dropdowns
  const filterOptions = useMemo(() => {
    const sizesSet = new Set<string>();
    const colorsSet = new Set<string>();

    products.forEach((p) => {
      if (p.status === 'Active' && currentCategory && p.categoryId === currentCategory.id) {
        p.sizes.forEach(s => sizesSet.add(s));
        p.colors.forEach(c => colorsSet.add(c));
      }
    });

    return {
      sizes: ['All', ...Array.from(sizesSet)],
      colors: ['All', ...Array.from(colorsSet)]
    };
  }, [products, currentCategory]);

  const itemListSchema = useMemo(() => {
    if (!currentCategory) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': `${currentCategory.name} Collection`,
      'description': currentCategory.description,
      'url': window.location.href,
      'numberOfItems': filteredProducts.length,
      'itemListElement': filteredProducts.map((p, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'Product',
          'name': p.name,
          'image': p.coverImage,
          'description': p.shortDescription,
          'sku': p.productCode,
          'url': `${window.location.origin}/product/${p.slug}`
        }
      }))
    };
  }, [currentCategory, filteredProducts]);

  return (
    <div id="product-list-container" className="bg-[#FAFCFB] min-h-screen pt-28 pb-24 font-sans text-[#1A1A1A]">
      <SEO 
        title={`${currentCategory?.name || (categorySlug === 'gearwear' ? 'Gearwear' : 'Hosiery')} Collection | Safety Line`}
        description={currentCategory?.description || 'Browse our performance line of high-compression athletic gearwear and precision European hosiery.'}
        keywords={`Safety Line ${currentCategory?.name || categorySlug}, performance ${currentCategory?.name || categorySlug}, athletic sportswear, high-gauge knitting`}
        schema={itemListSchema}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
          <button onClick={() => navigate('/')} className="hover:text-[#0B3D3B] transition-colors cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#0B3D3B] font-bold">{currentCategory?.name || (categorySlug === 'gearwear' ? 'Gearwear' : 'Hosiery')}</span>
        </div>

        {/* Category Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span>Safety Line Digital Catalogue</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#0B3D3B] tracking-tight">
            {currentCategory?.name || (categorySlug === 'gearwear' ? 'Gearwear' : 'Hosiery')}
          </h1>
          <p className="text-slate-600 font-normal text-base sm:text-lg leading-relaxed">
            {currentCategory?.description || 'Browse our performance line of high-compression athletic gearwear and precision European hosiery.'}
          </p>
        </div>

        {/* Dynamic Filters Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-6">
          
          {/* Search input */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              id="product-search-input"
              type="text"
              placeholder="Search products, materials, codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#1A1A1A] placeholder:text-slate-400 outline-none transition-colors"
            />
          </div>

          {/* Sizes & Colors dropdown filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-1.5 text-slate-400 text-xs font-mono uppercase tracking-wider font-bold">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters:</span>
            </div>

            {/* Size Dropdown - Hidden for gearwear */}
            {currentCategory !== 'gearwear' && (
              <select
                id="filter-size-select"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="bg-[#FAFCFB] border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-medium text-slate-800 outline-none focus:border-[#0B3D3B] cursor-pointer transition-colors"
              >
                {filterOptions.sizes.map(size => (
                  <option key={size} value={size}>
                    {size === 'All' ? 'All Sizes' : `Size: ${size}`}
                  </option>
                ))}
              </select>
            )}

            {/* Color Dropdown */}
            <select
              id="filter-color-select"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="bg-[#FAFCFB] border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-medium text-slate-800 outline-none focus:border-[#0B3D3B] cursor-pointer transition-colors"
            >
              {filterOptions.colors.map(color => (
                <option key={color} value={color}>
                  {color === 'All' ? 'All Colors' : `Color: ${color}`}
                </option>
              ))}
            </select>

            {/* Clear Filters Button */}
            {(searchQuery !== '' || selectedSize !== 'All' || selectedColor !== 'All') && (
              <button
                id="clear-filters-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSize('All');
                  setSelectedColor('All');
                }}
                className="text-xs text-[#FF5A36] hover:text-[#e44e2b] font-bold tracking-wider uppercase transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Products Grid (4 per row desktop, 2 per row tablet, 1 on mobile) */}
        {filteredProducts.length > 0 ? (
          <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.3 }}
                id={`product-card-${p.slug}`}
                onClick={() => navigate(`/product/${p.slug}`)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#FF5A36] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col"
              >
                {/* Product Cover image - Full shape uncropped */}
                <div className="aspect-square bg-[#F8FAFB] overflow-hidden relative flex items-center justify-center p-3.5 border-b border-slate-100">
                  <img
                    src={p.coverImage}
                    alt={p.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-3 right-3 bg-[#0B3D3B] text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    {p.categoryName}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-[#0B3D3B] font-mono text-[9px] px-2 py-0.5 rounded border border-slate-200 font-bold">
                    {p.productCode}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 font-mono tracking-wider font-semibold uppercase">
                      {p.material.split(',')[0]}
                    </p>
                    <h2 className="font-display font-bold text-[#0B3D3B] text-base group-hover:text-[#FF5A36] transition-colors line-clamp-1">
                      {p.name}
                    </h2>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {p.shortDescription}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#FF5A36] uppercase tracking-wider inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>View Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    {currentCategory !== 'gearwear' && p.sizes && p.sizes.length > 0 && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        {p.sizes.length} Sizes
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div id="no-products-found" className="text-center py-20 bg-white rounded-2xl border border-slate-200 space-y-4">
            <Layers className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-display text-lg font-bold text-[#0B3D3B]">
              No matching products found
            </h3>
            <p className="text-slate-500 font-normal text-sm max-w-sm mx-auto">
              Try clearing search terms or selecting a different size or color attribute.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSize('All');
                setSelectedColor('All');
              }}
              className="bg-[#0B3D3B] hover:bg-[#072725] text-white px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
