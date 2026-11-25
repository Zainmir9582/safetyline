import React from 'react';
import { ArrowRight } from 'lucide-react';
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
  const getWindowProductCount = (slug: string) => {
    return products.filter(p => {
      const matchCat = p.categoryId === 'cat-hosiery' || p.categoryId === 'cat-accessories';
      const matchSub = p.subcategory === slug;
      return matchCat && matchSub;
    }).length;
  };

  return (
    <section id="accessories-windows-section" className="py-14 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2DFD7] pb-6">
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#D92227] font-semibold block">
            Manufacturing Divisions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#141918] tracking-tight">
            Accessories &amp; Active Apparel
          </h2>
          <p className="text-sm text-[#525957]">
            Select an apparel line below to review fabric weights, sizing grades, and wholesale product entries.
          </p>
        </div>

        <span className="text-xs font-mono text-[#525957] tabular-nums shrink-0">
          {ACCESSORIES_WINDOWS.length} Specialized Lines
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {ACCESSORIES_WINDOWS.map((window, idx) => {
          const productCount = getWindowProductCount(window.slug);

          return (
            <article
              key={window.id}
              onClick={() => navigate(window.routePath)}
              className="group cursor-pointer bg-white rounded-sm border border-[#E2DFD7] hover:border-[#141918] transition-colors duration-150 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="aspect-[4/3] bg-[#F7F6F2] relative overflow-hidden border-b border-[#E2DFD7]">
                  <SmoothImage
                    src={window.image}
                    alt={window.title}
                    priority={idx < 3}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#525957] tabular-nums">
                    <span className="font-semibold text-[#D92227]">{window.codePrefix}</span>
                    <span>{productCount} {productCount === 1 ? 'Item' : 'Items'}</span>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#141918] group-hover:text-[#D92227] transition-colors leading-snug truncate">
                    {window.title}
                  </h3>

                  <p className="text-[#525957] text-xs leading-relaxed line-clamp-2">
                    {window.minorDetail}
                  </p>
                </div>
              </div>

              <div className="px-4 py-3 border-t border-[#ECE9E1] flex items-center justify-between text-xs font-semibold text-[#141918] group-hover:text-[#D92227] transition-colors">
                <span className="text-[11px] font-mono uppercase tracking-wider">Explore {window.shortTitle}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1" />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default AccessoriesWindowsSection;
