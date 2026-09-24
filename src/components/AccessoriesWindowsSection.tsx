import React from 'react';
import { 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { navigate } from '../lib/router';
import { ACCESSORIES_WINDOWS } from '../data/accessoriesWindows';
import { Product } from '../types';
import SmoothImage from './SmoothImage';

interface AccessoriesWindowsSectionProps {
  products: Product[];
}

export const AccessoriesWindowsSection: React.FC<AccessoriesWindowsSectionProps> = ({
  products
}) => {
  // Count products for each window
  const getWindowProductCount = (slug: string) => {
    return products.filter(p => {
      const matchCat = p.categoryId === 'cat-hosiery' || p.categoryId === 'cat-accessories';
      const matchSub = p.subcategory === slug;
      return matchCat && matchSub;
    }).length;
  };

  return (
    <section id="accessories-windows-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-[#D9F0EC] text-[#0B3D3B] text-[11px] font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3 h-3 text-[#FF5A36]" />
            <span>Product Categories</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B3D3B] tracking-tight">
            Accessories & Activewear Categories
          </h2>
          <p className="text-slate-500 font-normal text-xs sm:text-sm">
            Select a specialized category window below to explore technical specifications and product lines.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          <span>5 Specialized Categories</span>
        </div>
      </div>

      {/* 5 Compact Category Windows Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {ACCESSORIES_WINDOWS.map((window, idx) => {
          const productCount = getWindowProductCount(window.slug);

          return (
            <motion.div
              key={window.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              onClick={() => navigate(window.routePath)}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-200 hover:border-[#FF5A36] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Category Showcase Image */}
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                  <SmoothImage
                    src={window.image}
                    alt={window.title}
                    priority={idx < 3}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Badge & Item Count */}
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider font-semibold">
                    {window.badge}
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[#0B3D3B] px-2 py-0.5 rounded text-[9px] font-mono font-bold">
                    {productCount} {productCount === 1 ? 'Item' : 'Items'}
                  </div>
                </div>

                {/* Card Content: Topic & Miner Detail */}
                <div className="p-3.5 sm:p-4 space-y-1">
                  {/* Topic */}
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-[#0B3D3B] group-hover:text-[#FF5A36] transition-colors leading-snug truncate">
                    {window.title}
                  </h3>

                  {/* Miner Detail */}
                  <p className="text-slate-600 text-xs font-normal leading-relaxed line-clamp-2">
                    {window.minorDetail}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-3.5 pb-3.5 pt-1">
                <div className="w-full py-1.5 px-2.5 rounded-lg font-bold text-[10px] uppercase tracking-wider inline-flex items-center justify-between transition-all bg-[#D9F0EC] group-hover:bg-[#0B3D3B] text-[#0B3D3B] group-hover:text-white">
                  <span>Explore {window.shortTitle}</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
};

export default AccessoriesWindowsSection;
