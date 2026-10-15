import React, { useState } from 'react';
import { 
  ChevronRight,
  Sparkles,
  ShieldAlert,
  Car,
  Bike,
  Dumbbell,
  Wrench,
  Fish,
  Compass,
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { navigate } from '../lib/router';
import { GEARWEAR_WINDOWS, GearwearWindow, GearwearGroup } from '../data/gearwearWindows';
import { Product } from '../types';
import SmoothImage from './SmoothImage';
import { ShimmerHeading } from './TransitionText';

interface GearwearWindowsSectionProps {
  products: Product[];
}

export const GearwearWindowsSection: React.FC<GearwearWindowsSectionProps> = ({
  products
}) => {
  // Tab state: 'all' | 'tactical' | 'car' | 'athletic'
  const [activeTab, setActiveTab] = useState<'all' | GearwearGroup>('all');

  // Count products for each window
  const getWindowProductCount = (slug: string) => {
    return products.filter(p => {
      const matchCat = p.categoryId === 'cat-gearwear';
      const matchSub = p.subcategory === slug;
      return matchCat && matchSub;
    }).length;
  };

  // Grouped windows
  const tacticalWindows = GEARWEAR_WINDOWS.filter(w => w.group === 'tactical');
  const carWindows = GEARWEAR_WINDOWS.filter(w => w.group === 'car');
  const athleticWindows = GEARWEAR_WINDOWS.filter(w => w.group === 'athletic');

  // Filtered list based on active tab
  const displayedWindows = activeTab === 'all' 
    ? GEARWEAR_WINDOWS 
    : GEARWEAR_WINDOWS.filter(w => w.group === activeTab);

  // Helper for icons
  const renderWindowIcon = (name: string, className: string = 'w-4 h-4') => {
    switch (name) {
      case 'Compass': return <Compass className={className} />;
      case 'Fish': return <Fish className={className} />;
      case 'Wrench': return <Wrench className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Car': return <Car className={className} />;
      case 'Bike': return <Bike className={className} />;
      case 'Dumbbell': return <Dumbbell className={className} />;
      default: return <Layers className={className} />;
    }
  };

  return (
    <section id="gearwear-windows-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span>Manufacturing Divisions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-[#0B3D3B] tracking-tight">
            <ShimmerHeading accent="ember" className="text-[#0B3D3B]">Gearwear</ShimmerHeading>
          </h2>
          <p className="text-slate-600 font-normal text-sm leading-relaxed">
            Browse our specialized production lines engineered for military, industrial, motorsport, and athletic applications. Select any line below to explore specifications and product image catalogues.
          </p>
        </div>

        {/* Division Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#0B3D3B] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0B3D3B] hover:bg-white/60'
            }`}
          >
            All Lines ({GEARWEAR_WINDOWS.length})
          </button>
          <button
            onClick={() => setActiveTab('tactical')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'tactical'
                ? 'bg-[#0B3D3B] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0B3D3B] hover:bg-white/60'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span>Tacticals ({tacticalWindows.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('car')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'car'
                ? 'bg-[#0B3D3B] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0B3D3B] hover:bg-white/60'
            }`}
          >
            <Car className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span>Car & Motorsport ({carWindows.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('athletic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'athletic'
                ? 'bg-[#0B3D3B] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0B3D3B] hover:bg-white/60'
            }`}
          >
            <Bike className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span>Athletic ({athleticWindows.length})</span>
          </button>
        </div>
      </div>

      {/* Render Categorized View if 'all' is selected */}
      {activeTab === 'all' ? (
        <div className="space-y-12">
          
          {/* SECTION 1: TACTICAL GLOVES CATEGORIES */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-[#0B3D3B] text-[#D9F0EC]">
                  <ShieldAlert className="w-5 h-5 text-[#FF5A36]" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-[#0B3D3B] flex items-center gap-2">
                    <span>Tactical Gloves</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#D9F0EC] text-[#0B3D3B]">
                      5 Specialized Lines
                    </span>
                  </h3>
                  <p className="text-slate-500 text-xs">
                    Golf, fishing, heavy work, automotive mechanics, and law enforcement tactical handwear.
                  </p>
                </div>
              </div>
            </div>

            {/* Tactical Grid: 5 columns on 2xl, 3 on lg, 2 on sm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {tacticalWindows.map((win, idx) => (
                <WindowCard 
                  key={win.id} 
                  window={win} 
                  productCount={getWindowProductCount(win.slug)} 
                  idx={idx} 
                  renderIcon={renderWindowIcon}
                />
              ))}
            </div>
          </div>

          {/* SECTION 2: CAR & MOTORSPORT */}
          <div className="space-y-5 pt-4 border-t border-slate-200/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-[#0B3D3B] text-[#D9F0EC]">
                  <Car className="w-5 h-5 text-[#FF5A36]" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-[#0B3D3B] flex items-center gap-2">
                    <span>Car & Motorsport Gloves</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#D9F0EC] text-[#0B3D3B]">
                      2 Speed Disciplines
                    </span>
                  </h3>
                  <p className="text-slate-500 text-xs">
                    Motorcars racing gloves and performance road cycling gloves.
                  </p>
                </div>
              </div>
            </div>

            {/* Car Grid: 2 columns on sm/lg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-3xl gap-5">
              {carWindows.map((win, idx) => (
                <WindowCard 
                  key={win.id} 
                  window={win} 
                  productCount={getWindowProductCount(win.slug)} 
                  idx={idx} 
                  renderIcon={renderWindowIcon}
                  isFeatured
                />
              ))}
            </div>
          </div>

          {/* SECTION 3: ATHLETIC & POWER CATEGORIES */}
          <div className="space-y-5 pt-4 border-t border-slate-200/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-[#0B3D3B] text-[#D9F0EC]">
                  <Dumbbell className="w-5 h-5 text-[#FF5A36]" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-[#0B3D3B] flex items-center gap-2">
                    <span>Athletic & Strength Wear</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#D9F0EC] text-[#0B3D3B]">
                      2 Specialized Divisions
                    </span>
                  </h3>
                  <p className="text-slate-500 text-xs">
                    Aerodynamic road cycling apparel and heavy powerlifting belts & wrist accessories.
                  </p>
                </div>
              </div>
            </div>

            {/* Athletic Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-3xl gap-5">
              {athleticWindows.map((win, idx) => (
                <WindowCard 
                  key={win.id} 
                  window={win} 
                  productCount={getWindowProductCount(win.slug)} 
                  idx={idx} 
                  renderIcon={renderWindowIcon}
                />
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Render Filtered Grid */
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              displayedWindows.length >= 4 
                ? 'lg:grid-cols-3 xl:grid-cols-4' 
                : 'lg:grid-cols-2 max-w-4xl'
            } gap-5`}
          >
            {displayedWindows.map((win, idx) => (
              <WindowCard 
                key={win.id} 
                window={win} 
                productCount={getWindowProductCount(win.slug)} 
                idx={idx} 
                renderIcon={renderWindowIcon}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

    </section>
  );
};

interface WindowCardProps {
  window: GearwearWindow;
  productCount: number;
  idx: number;
  renderIcon: (name: string, className?: string) => React.ReactNode;
  isFeatured?: boolean;
}

const WindowCard: React.FC<WindowCardProps> = ({
  window,
  productCount,
  idx,
  renderIcon,
  isFeatured = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: idx * 0.05 }}
      onClick={() => navigate(window.routePath)}
      className="group cursor-pointer bg-white rounded-2xl border border-slate-200 hover:border-[#FF5A36] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Category Showcase Image */}
        <div className={`relative overflow-hidden bg-slate-100 ${isFeatured ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
          <SmoothImage
            src={window.image}
            alt={window.title}
            priority={idx < 4}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Badge & Item Count */}
          <div className="absolute top-2.5 left-2.5 bg-black/65 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-xs">
            {renderIcon(window.iconName, 'w-3 h-3 text-[#FF5A36]')}
            <span>{window.badge}</span>
          </div>

          <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-[#0B3D3B] px-2 py-0.5 rounded-md text-[10px] font-mono font-bold shadow-xs">
            {productCount} {productCount === 1 ? 'Item' : 'Items'}
          </div>
        </div>

        {/* Card Content: Topic & Miner Detail */}
        <div className="p-4 space-y-2">
          {/* Topic */}
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-display font-extrabold text-base text-[#0B3D3B] group-hover:text-[#FF5A36] transition-colors leading-snug text-hover-lift">
              {window.title}
            </h4>
            <span className="text-[10px] font-mono font-semibold text-slate-400">
              {window.codePrefix}
            </span>
          </div>

          {/* Minor Detail */}
          <p className="text-slate-600 text-xs font-normal leading-relaxed line-clamp-2">
            {window.minorDetail}
          </p>

          {/* Key Spec Chips */}
          <div className="pt-1 flex flex-wrap gap-1">
            {window.specs.slice(0, 2).map((spec, sIdx) => (
              <span 
                key={sIdx}
                className="inline-block px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono truncate max-w-full"
              >
                {spec.value}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-4 pb-4 pt-1">
        <div className="btn-glow-shine w-full py-2.5 px-3.5 rounded-xl font-bold text-[11px] uppercase tracking-wider inline-flex items-center justify-between transition-all bg-[#D9F0EC] group-hover:bg-[#0B3D3B] text-[#0B3D3B] group-hover:text-white shadow-xs group-hover:shadow-md">
          <span>Explore {window.shortTitle}</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
        </div>
      </div>

    </motion.div>
  );
};

export default GearwearWindowsSection;
