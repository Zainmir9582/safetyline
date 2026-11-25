import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { navigate } from '../lib/router';
import { GEARWEAR_WINDOWS, GearwearWindow, GearwearGroup } from '../data/gearwearWindows';
import { Product } from '../types';
import SmoothImage from './SmoothImage';

interface GearwearWindowsSectionProps {
  products: Product[];
}

export const GearwearWindowsSection: React.FC<GearwearWindowsSectionProps> = ({
  products
}) => {
  const [activeTab, setActiveTab] = useState<'all' | GearwearGroup>('all');

  const getWindowProductCount = (slug: string) => {
    return products.filter(p => p.categoryId === 'cat-gearwear' && p.subcategory === slug).length;
  };

  const tacticalWindows = GEARWEAR_WINDOWS.filter(w => w.group === 'tactical');
  const carWindows = GEARWEAR_WINDOWS.filter(w => w.group === 'car');
  const athleticWindows = GEARWEAR_WINDOWS.filter(w => w.group === 'athletic');

  const displayedWindows = activeTab === 'all'
    ? GEARWEAR_WINDOWS
    : GEARWEAR_WINDOWS.filter(w => w.group === activeTab);

  return (
    <section id="gearwear-windows-section" className="py-14 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header & Clean Underline Tab Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E2DFD7] pb-6">
        <div className="space-y-1.5 max-w-2xl">
          <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#D92227] font-semibold block">
            Manufacturing Divisions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#141918] tracking-tight">
            Gearwear Production Lines
          </h2>
          <p className="text-sm text-[#525957] leading-relaxed">
            Select any specialized handwear or strength equipment line to inspect individual models, material matrices, and technical specifications.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {[
            { id: 'all', label: `All Lines (${GEARWEAR_WINDOWS.length})` },
            { id: 'tactical', label: `Tacticals (${tacticalWindows.length})` },
            { id: 'car', label: `Motorsport & Cycling (${carWindows.length})` },
            { id: 'athletic', label: `Athletic (${athleticWindows.length})` },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as 'all' | GearwearGroup)}
                className={`px-3.5 py-2 rounded-sm text-xs font-mono font-semibold whitespace-nowrap transition-colors duration-150 cursor-pointer border ${
                  active
                    ? 'bg-[#141918] text-white border-[#141918]'
                    : 'bg-white text-[#525957] border-[#E2DFD7] hover:border-[#141918] hover:text-[#141918]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'all' ? (
        <div className="space-y-14">
          {/* 01 · TACTICAL GLOVES */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#ECE9E1] pb-3">
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-mono font-bold text-[#D92227]">01</span>
                <h3 className="font-display font-bold text-xl text-[#141918]">
                  Tactical &amp; Industrial Handwear
                </h3>
              </div>
              <span className="text-xs font-mono text-[#525957] tabular-nums">
                5 Lines · Golf, Fish, Work, Mechanics, Police
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {tacticalWindows.map((win, idx) => (
                <WindowCard
                  key={win.id}
                  window={win}
                  productCount={getWindowProductCount(win.slug)}
                  idx={idx}
                />
              ))}
            </div>
          </div>

          {/* 02 · MOTORSPORT & CYCLING */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#ECE9E1] pb-3">
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-mono font-bold text-[#D92227]">02</span>
                <h3 className="font-display font-bold text-xl text-[#141918]">
                  Car Racing &amp; Cycling Gloves
                </h3>
              </div>
              <span className="text-xs font-mono text-[#525957] tabular-nums">
                2 Speed Disciplines · FIA Nomex® &amp; Aero Gel
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
              {carWindows.map((win, idx) => (
                <WindowCard
                  key={win.id}
                  window={win}
                  productCount={getWindowProductCount(win.slug)}
                  idx={idx}
                  isFeatured
                />
              ))}
            </div>
          </div>

          {/* 03 · ATHLETIC & STRENGTH */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#ECE9E1] pb-3">
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-mono font-bold text-[#D92227]">03</span>
                <h3 className="font-display font-bold text-xl text-[#141918]">
                  Athletic Apparel &amp; Strength Wear
                </h3>
              </div>
              <span className="text-xs font-mono text-[#525957] tabular-nums">
                2 Divisions · Road Cycling Kits &amp; Powerlifting
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
              {athleticWindows.map((win, idx) => (
                <WindowCard
                  key={win.id}
                  window={win}
                  productCount={getWindowProductCount(win.slug)}
                  idx={idx}
                  isFeatured
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
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
            />
          ))}
        </div>
      )}
    </section>
  );
};

interface WindowCardProps {
  window: GearwearWindow;
  productCount: number;
  idx: number;
  isFeatured?: boolean;
}

const WindowCard: React.FC<WindowCardProps> = ({
  window,
  productCount,
  idx,
  isFeatured = false
}) => {
  return (
    <article
      onClick={() => navigate(window.routePath)}
      className="group cursor-pointer bg-white rounded-sm border border-[#E2DFD7] hover:border-[#141918] transition-colors duration-150 flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Clean Transparent-Friendly Gallery Ground */}
        <div className={`relative overflow-hidden bg-[#F7F6F2] border-b border-[#E2DFD7] flex items-center justify-center p-5 ${isFeatured ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
          <SmoothImage
            src={window.image}
            alt={window.title}
            priority={idx < 4}
            containerClassName="w-full h-full flex items-center justify-center"
            className="w-full h-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
        </div>

        {/* Clean Unboxed Metadata */}
        <div className="p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-wider text-[#525957] tabular-nums">
            <span className="font-semibold text-[#D92227]">{window.codePrefix}</span>
            <span>{productCount} {productCount === 1 ? 'Model' : 'Models'}</span>
          </div>

          <h4 className="font-display font-bold text-base text-[#141918] group-hover:text-[#D92227] transition-colors leading-snug">
            {window.title}
          </h4>

          <p className="text-[#525957] text-xs leading-relaxed line-clamp-2">
            {window.minorDetail}
          </p>

          {window.specs.length > 0 && (
            <div className="pt-2 border-t border-[#ECE9E1] text-[11px] font-mono text-[#525957] truncate">
              {window.specs[0].value}
            </div>
          )}
        </div>
      </div>

      {/* Crisp Footer CTA */}
      <div className="px-4 sm:px-5 py-3 border-t border-[#ECE9E1] flex items-center justify-between text-xs font-semibold text-[#141918] group-hover:text-[#D92227] transition-colors">
        <span className="text-[11px] font-mono uppercase tracking-wider">Explore {window.shortTitle}</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1" />
      </div>
    </article>
  );
};

export default GearwearWindowsSection;
