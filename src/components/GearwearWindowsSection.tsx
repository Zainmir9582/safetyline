import React from 'react';
import { 
  ArrowRight, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { navigate } from '../lib/router';
import { GEARWEAR_WINDOWS, GearwearWindow } from '../data/gearwearWindows';
import { Product } from '../types';
import SmoothImage from './SmoothImage';

interface GearwearWindowsSectionProps {
  products: Product[];
}

export const GearwearWindowsSection: React.FC<GearwearWindowsSectionProps> = ({
  products
}) => {
  // Count products for each window
  const getWindowProductCount = (slug: string) => {
    return products.filter(p => {
      const matchCat = p.categoryId === 'cat-gearwear';
      const matchSub = p.subcategory === slug;
      return matchCat && matchSub;
    }).length;
  };

  return (
    <section id="gearwear-windows-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-[#D9F0EC] text-[#0B3D3B] text-[11px] font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3 h-3 text-[#FF5A36]" />
            <span>Product Categories</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B3D3B] tracking-tight">
            Gearwear Category Windows
          </h2>
          <p className="text-slate-500 font-normal text-xs sm:text-sm">
            Select a specialized category window below to explore technical specifications and product lines.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          <span>4 Production Divisions</span>
        </div>
      </div>

      {/* 4 Compact Category Windows Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {GEARWEAR_WINDOWS.map((window, idx) => {
          const productCount = getWindowProductCount(window.slug);

          return (
            <motion.div
              key={window.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              onClick={() => navigate(window.routePath)}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-200 hover:border-[#FF5A36] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Category Showcase Image */}
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                  <SmoothImage
                    src={window.image}
                    alt={window.title}
                    priority={idx < 2}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Badge & Item Count */}
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold">
                    {window.badge}
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[#0B3D3B] px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                    {productCount} {productCount === 1 ? 'Item' : 'Items'}
                  </div>
                </div>

                {/* Card Content: Topic & Miner Detail */}
                <div className="p-4 sm:p-4.5 space-y-1.5">
                  {/* Topic */}
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-[#0B3D3B] group-hover:text-[#FF5A36] transition-colors leading-snug">
                    {window.title}
                  </h3>

                  {/* Miner Detail */}
                  <p className="text-slate-600 text-xs font-normal leading-relaxed line-clamp-2">
                    {window.minorDetail}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-4 pb-4 pt-1">
                <div className="w-full py-2 px-3 rounded-xl font-bold text-[11px] uppercase tracking-wider inline-flex items-center justify-between transition-all bg-[#D9F0EC] group-hover:bg-[#0B3D3B] text-[#0B3D3B] group-hover:text-white">
                  <span>Explore {window.shortTitle}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
};

export default GearwearWindowsSection;
