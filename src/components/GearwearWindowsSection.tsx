import React from 'react';
import { 
  ShieldAlert, 
  Bike, 
  Flame, 
  Dumbbell, 
  ArrowRight, 
  Plus, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  ImageIcon,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { navigate } from '../lib/router';
import { GEARWEAR_WINDOWS, GearwearWindow } from '../data/gearwearWindows';
import { Product } from '../types';

interface GearwearWindowsSectionProps {
  products: Product[];
  onOpenListingModalForWindow?: (windowSlug: string) => void;
}

const ICON_MAP: Record<GearwearWindow['iconName'], React.ComponentType<{ className?: string }>> = {
  ShieldAlert: ShieldAlert,
  Bike: Bike,
  Flame: Flame,
  Dumbbell: Dumbbell,
};

export const GearwearWindowsSection: React.FC<GearwearWindowsSectionProps> = ({
  products,
  onOpenListingModalForWindow
}) => {
  // Count products added to each window
  const getWindowProductCount = (slug: string) => {
    return products.filter(p => {
      const matchCat = p.categoryId === 'cat-gearwear';
      const matchSub = p.subcategory === slug || 
        (slug === 'tactical-gloves' && p.name.toLowerCase().includes('tactical')) ||
        (slug === 'road-cycling-apparel' && (p.name.toLowerCase().includes('cycl') || p.name.toLowerCase().includes('road'))) ||
        (slug === 'car-racing' && (p.name.toLowerCase().includes('racing') || p.name.toLowerCase().includes('motor'))) ||
        (slug === 'weight-lifting' && (p.name.toLowerCase().includes('lift') || p.name.toLowerCase().includes('weight')));
      return matchCat && matchSub;
    }).length;
  };

  return (
    <section id="gearwear-windows-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold tracking-wider uppercase">
          <Layers className="w-3.5 h-3.5 text-[#FF5A36]" />
          <span>Production Windows & Product Pages</span>
        </div>
        
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D3B] tracking-tight">
          Gearwear Specialized Windows
        </h2>
        
        <p className="text-slate-600 font-normal text-sm sm:text-base leading-relaxed">
          Explore Safety Line's four core manufacturing windows. Select any window to enter its dedicated page and manage product list images, technical specifications, and industrial model codes.
        </p>
      </div>

      {/* 4 Windows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {GEARWEAR_WINDOWS.map((window, idx) => {
          const Icon = ICON_MAP[window.iconName] || Layers;
          const productCount = getWindowProductCount(window.slug);

          return (
            <motion.div
              key={window.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative bg-white rounded-3xl border-2 border-slate-200 hover:border-[#FF5A36] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Accent Stripe */}
              <div 
                className="h-2 w-full transition-all duration-300 group-hover:h-2.5"
                style={{ backgroundColor: window.themeColor }}
              />

              <div className="p-7 sm:p-9 space-y-6">
                
                {/* Header row: Icon & Status Badge */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm"
                      style={{ 
                        backgroundColor: window.themeColor === '#0B3D3B' ? '#D9F0EC' : '#FFF0ED',
                        color: window.themeColor
                      }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF5A36] block">
                        {window.badge}
                      </span>
                      <h3 className="font-display font-extrabold text-2xl text-[#0B3D3B] group-hover:text-[#FF5A36] transition-colors">
                        {window.title}
                      </h3>
                    </div>
                  </div>

                  {/* Product Count Pill */}
                  <div className="text-right shrink-0">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-semibold">
                      <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>{productCount} {productCount === 1 ? 'Image' : 'Images'}</span>
                    </div>
                  </div>
                </div>

                {/* Tagline & Description */}
                <div className="space-y-2">
                  <p className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wide">
                    {window.tagline}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                    {window.description}
                  </p>
                </div>

                {/* Key Features Bullet List */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                    Engineering Standards & Capabilities:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {window.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 font-normal">
                        <CheckCircle2 className="w-4 h-4 text-[#0B3D3B] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Specs Grid */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 bg-[#FAFCFB] -mx-7 sm:-mx-9 px-7 sm:px-9 py-4">
                  {window.specs.slice(0, 2).map((s, sIdx) => (
                    <div key={sIdx} className="space-y-0.5">
                      <span className="block text-[10px] font-mono text-slate-400 uppercase font-semibold truncate">
                        {s.label}
                      </span>
                      <span className="block text-xs font-bold text-[#0B3D3B] truncate">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Buttons Footer */}
              <div className="p-6 sm:p-7 pt-0 bg-white flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate(window.routePath)}
                  className="w-full sm:flex-1 py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all bg-[#0B3D3B] hover:bg-[#072725] text-white shadow-sm hover:shadow-md cursor-pointer group/btn"
                >
                  <span>Open {window.shortTitle} Page</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>

                {onOpenListingModalForWindow && (
                  <button
                    type="button"
                    onClick={() => onOpenListingModalForWindow(window.slug)}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-all bg-[#FFF0ED] hover:bg-[#FF5A36] text-[#FF5A36] hover:text-white border border-[#FF5A36]/30 cursor-pointer"
                    title={`Add product list images to ${window.title}`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Image</span>
                  </button>
                )}
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Helpful Operational Directive Bar */}
      <div className="bg-[#FAFCFB] rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#0B3D3B] text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#FF5A36]" />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-[#0B3D3B]">
              Direct Product List Management
            </h4>
            <p className="text-xs text-slate-500 font-normal">
              Click into any of the 4 window pages above to add photos, specs, codes, and create your complete product list.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate('/contact')}
            className="px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-slate-600 hover:text-[#0B3D3B] hover:bg-slate-100 transition-colors"
          >
            Custom OEM Specs
          </button>
        </div>
      </div>

    </section>
  );
};

export default GearwearWindowsSection;
