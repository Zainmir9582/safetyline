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
  ArrowUpRight,
  Flame,
  Zap,
  Award,
  Eye,
  Check,
  LayoutGrid,
  List,
  X,
  Gauge,
  SlidersHorizontal,
  Download,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { navigate, Link } from '../lib/router';
import { GearwearWindow, GEARWEAR_WINDOWS } from '../data/gearwearWindows';
import { Product, Settings } from '../types';
import SmoothImage from './SmoothImage';
import SEO from './SEO';
import brandLogo from '../assets/images/safetyline_landing.png';
import InquiryLoadingModal from './InquiryLoadingModal';

// Motorsport Car Racing Gloves Assets
import cgHeroImg from '../assets/images/cg_hero.png';
import cg1Img from '../assets/images/cg1.png';
import cg2Img from '../assets/images/cg2.png';
import cg3Img from '../assets/images/cg3.png';
import cg4Img from '../assets/images/cg4.png';
import cg5Img from '../assets/images/cg5.png';

interface GearwearWindowPageProps {
  window: GearwearWindow;
  products: Product[];
  settings: Settings;
}

// Dedicated metadata for the 5 car racing glove models
interface CarRacingGloveSpec {
  code: string;
  name: string;
  livery: string;
  image: string;
  badge: string;
  flameRating: string;
  palmMatrix: string;
  seamType: string;
  knuckleArmor: string;
  targetDiscipline: string;
  summary: string;
}

const CAR_RACING_GLOVE_MODELS: CarRacingGloveSpec[] = [
  {
    code: 'GW-CR-01',
    name: 'Safety Line Signature Flame FIA Racing Gloves',
    livery: 'Purple / Black Tiger Flame',
    image: cg1Img,
    badge: 'FIA 8856-2018',
    flameRating: '15s+ Direct Contact Flame Resistance',
    palmMatrix: 'Reinforced Suede Steering Grip with Knuckle Padding',
    seamType: 'External Reverse Seams with Safety Line Wrist Strap',
    knuckleArmor: 'Metacarpal Impact Dampener & Suede Upper Shield',
    targetDiscipline: 'Circuit Racing, Touring & Sprint Track Days',
    summary: 'Official Safety Line FIA-compliant fireproof racing gloves featuring iconic purple tiger flame Nomex® backing, suede reinforced grip, and embroidered SL insignia on the safety gauntlet.'
  },
  {
    code: 'GW-CR-02',
    name: 'Safety Line Apex Tech Biomechanical Racing Gloves',
    livery: 'Electric Blue / Black',
    image: cg2Img,
    badge: 'Biomechanical Carbon',
    flameRating: 'FIA 8856-2018 & SFI 3.3/5 Homologated',
    palmMatrix: '3D Pressure-Mapped High-Tack Silicone',
    seamType: 'Seamless Palm Base with External Fingers',
    knuckleArmor: 'Articulated Carbon Fiber Kinetic Deflector',
    targetDiscipline: 'GT3, GT4, Touring Cars & Track Days',
    summary: 'Biomechanical articulated carbon knuckle shield allows natural hand flexing while dispersing violent steering kickbacks. Touchscreen conductive aramid index finger for telemetry screens.'
  },
  {
    code: 'GW-CR-03',
    name: 'Safety Line Veloce High-Visibility Endurance Gloves',
    livery: 'Signal Neon Yellow / Black',
    image: cg3Img,
    badge: 'Night Stint Hi-Vis',
    flameRating: 'FIA 8856-2000 & SFI 3.3/5 Certified',
    palmMatrix: 'Full Palm Traction Grips with Thumb Saddle Reinforcement',
    seamType: 'External Seams with Hook-and-Loop Safety Line Strap',
    knuckleArmor: 'High-Density Impact Zone & Ergonomic Flex Articulation',
    targetDiscipline: '24-Hour Endurance, Night Stints & Rally Stages',
    summary: 'Optimized for night stints and endurance GT racing where visual signaling in dark cockpits is vital. Fluorescent signal yellow Nomex® aramid with Safety Line wrist closure and embroidered SL emblem.'
  },
  {
    code: 'GW-CR-04',
    name: 'Safety Line Pro-Circuit Two-Tone Racing Gloves',
    livery: 'Monochrome Stealth Black / Pure White',
    image: cg4Img,
    badge: 'FIA 8856 Pro-Circuit',
    flameRating: 'FIA 8856-2018 Benchmark Tested',
    palmMatrix: 'Reinforced White Leather Palmar Cushioning',
    seamType: 'External Seam Finger Framing with Zero Internal Friction',
    knuckleArmor: 'Integrated White Metacarpal Padded Shield',
    targetDiscipline: 'Single-Seaters, Formula Regional & GT Racing',
    summary: 'Classic high-contrast two-tone black and white Nomex® racing gloves engineered with padded knuckles, reverse-stitched palm, and embroidered SL safety gauntlet.'
  },
  {
    code: 'GW-CR-05',
    name: 'Safety Line Grand Prix Monza Flame-Retardant Racing Gloves',
    livery: 'Championship Monza Red / White',
    image: cg5Img,
    badge: 'FIA 8856 Grand Prix',
    flameRating: 'FIA 8856-2018 & SFI Approved',
    palmMatrix: 'Soft White Leather Ergonomic Palm Grip',
    seamType: 'Pre-Curved External Seams with Extended Safety Gauntlet',
    knuckleArmor: 'Padded Metacarpal Bar with Safety Line Strap',
    targetDiscipline: 'Formula Racing, Historic Touring & Hillclimb',
    summary: 'Championship-grade fire-retardant racing gloves in radiant Monza Red with white finger sidewalls, extended Nomex safety gauntlet, and iconic SL insignia.'
  }
];

export const GearwearWindowPage: React.FC<GearwearWindowPageProps> = ({
  window: currentWindow,
  products,
  settings
}) => {
  const isCarRacing = currentWindow.slug === 'motorcars-gloves' || currentWindow.slug === 'car-racing';

  // Search, size and view filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState('All');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryProductTitle, setInquiryProductTitle] = useState<string>(
    isCarRacing ? 'Car Racing Gloves Series' : `${currentWindow.title} Line`
  );

  // Car racing hero animated glove switcher state
  // 0-4 correspond to CG1-CG5, 5 is the Hero render
  const [activeHeroGloveIdx, setActiveHeroGloveIdx] = useState<number>(0);
  const [activeHeroGloveMode, setActiveHeroGloveMode] = useState<'model' | 'hero'>('model');

  // Quick Inspection Modal State
  const [inspectGlove, setInspectGlove] = useState<CarRacingGloveSpec | null>(null);

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

      if (slug === 'golf-gloves') {
        isKeywordMatch = pName.includes('golf') || pCode.includes('gg');
      } else if (slug === 'fish-gloves') {
        isKeywordMatch = pName.includes('fish') || pName.includes('marine') || pName.includes('angling') || pCode.includes('fg');
      } else if (slug === 'work-gloves') {
        isKeywordMatch = pName.includes('work') || pName.includes('rigg') || pName.includes('construct') || pCode.includes('wg');
      } else if (slug === 'mechanics-gloves') {
        isKeywordMatch = pName.includes('mechanic') || pName.includes('workshop') || pName.includes('tpr') || pCode.includes('mg');
      } else if (slug === 'tactical-police-gloves' || slug === 'tactical-gloves') {
        isKeywordMatch = pName.includes('tactical') || pName.includes('police') || pName.includes('swat') || pCode.includes('tp') || pCode.includes('tg');
      } else if (slug === 'motorcars-gloves' || slug === 'car-racing') {
        isKeywordMatch = sub === 'car-racing' || sub === 'motorcars-gloves' || pName.includes('motorcar') || pName.includes('racing') || pName.includes('nomex') || pName.includes('rally') || pCode.includes('mc') || pCode.includes('cr');
      } else if (slug === 'cycling-gloves') {
        isKeywordMatch = (pName.includes('cycl') && pName.includes('glove')) || pCode.includes('cg');
      } else if (slug === 'road-cycling-apparel') {
        isKeywordMatch = (pName.includes('cycl') && !pName.includes('glove')) || pName.includes('road') || pName.includes('aero') || pCode.includes('rc');
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

  const activeGloveSpec = CAR_RACING_GLOVE_MODELS[activeHeroGloveIdx] || CAR_RACING_GLOVE_MODELS[0];
  const activeDisplayedHeroImage = activeHeroGloveMode === 'hero' ? cgHeroImg : activeGloveSpec.image;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      id="gearwear-category-page" 
      className={`min-h-screen font-sans pb-24 transition-colors duration-300 ${
        isCarRacing ? 'bg-[#030908] text-slate-100' : 'bg-[#FAFCFB] text-[#1A1A1A]'
      }`}
    >
      <SEO
        title={`${isCarRacing ? 'FIA Car Racing Gloves' : currentWindow.title} | Safety Line Motorsport & Protective Handwear`}
        description={`${currentWindow.title}: ${currentWindow.minorDetail} Engineered at Safety Line's Sialkot industrial facilities.`}
        keywords={`${currentWindow.title}, car racing gloves, FIA 8856, Nomex racing gloves, motorsport handwear, Safety Line, Gearwear`}
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
              <span>All Gearwear</span>
            </button>
            <button
              onClick={() => {
                setInquiryProductTitle(isCarRacing ? 'Car Racing Gloves Series' : `${currentWindow.title} Line`);
                setIsInquiryModalOpen(true);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF5A36] hover:bg-[#e44e2b] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm shadow-[#FF5A36]/30"
            >
              <span>Wholesale Inquiry</span>
            </button>
          </div>

        </div>

        {/* Quick Category Bar */}
        <div className="bg-[#072725] border-t border-white/10 px-4 sm:px-8 py-2 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
              Gearwear:
            </span>
            {GEARWEAR_WINDOWS.map((win) => {
              const isActive = win.slug === currentWindow.slug;
              return (
                <button
                  key={win.id}
                  onClick={() => navigate(win.routePath)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#FF5A36] text-white font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{win.shortTitle}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN HEAD PORTION (ENHANCED FOR CAR RACING GLOVES WITH ANIMATED GLOVE HERO)
          ========================================================================= */}
      {/* =========================================================================
          GRAND MOTORSPORT BILLBOARD HEADER (ILLUMINATED SAFETY LINE LOGO & ANIMATED GLOVE)
          ========================================================================= */}
      {isCarRacing ? (
        <section className="bg-gradient-to-b from-[#020706] via-[#051715] to-[#040C0B] text-white py-10 sm:py-16 border-b border-white/10 relative overflow-hidden">
          {/* Night-Circuit Racetrack Ambient Backdrops */}
          <div className="absolute inset-0 bg-[radial-gradient(#EA2227_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
          <div className="absolute -top-36 left-1/4 w-[500px] h-[500px] rounded-full bg-[#EA2227]/25 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 -right-20 w-[450px] h-[450px] rounded-full bg-[#00F0FF]/15 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-20 left-10 w-96 h-96 rounded-full bg-[#FF5A36]/20 blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
            
            {/* Breadcrumb Trail */}
            <div className="flex items-center space-x-2 text-xs font-mono text-[#D9F0EC]/80">
              <Link to="/" className="hover:text-white transition-colors">Portal</Link>
              <span>/</span>
              <Link to="/gearwear" className="hover:text-white transition-colors">Gearwear</Link>
              <span>/</span>
              <span className="text-[#EA2227] font-semibold">Motorsport Division</span>
              <span>/</span>
              <span className="text-white font-bold">Car Racing Gloves</span>
            </div>

            {/* ===============================================================
                THE GRAND MOTORSPORT BILLBOARD STRUCTURE
                =============================================================== */}
            <div className="relative pt-6">
              
              {/* Overhead Stadium Light Gantries Shining Down on the Billboard */}
              <div className="hidden sm:flex justify-around px-16 relative z-20 -mb-2.5">
                {[0, 1, 2].map((lightIdx) => (
                  <div key={lightIdx} className="flex flex-col items-center">
                    {/* Metal Gantry Bracket */}
                    <div className="w-2.5 h-6 bg-gradient-to-b from-slate-600 to-slate-800 rounded-t border-t border-x border-slate-500 shadow-sm" />
                    {/* Industrial Floodlight Housing */}
                    <div className="w-12 h-4.5 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-sm border border-slate-400 shadow-md flex items-center justify-center relative">
                      {/* Intense Floodlight Bulb */}
                      <div className="w-9 h-2 rounded-xs bg-amber-100 shadow-[0_0_15px_#FFEBA3] animate-pulse" />
                    </div>
                    {/* Downward Light Beam Cone */}
                    <div className="w-36 h-20 bg-gradient-to-b from-amber-200/25 via-amber-100/10 to-transparent clip-path-polygon pointer-events-none -mt-0.5" 
                      style={{ clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)' }}
                    />
                  </div>
                ))}
              </div>

              {/* Billboard Outer Heavy Metal Steel / Carbon Chassis */}
              <div className="relative bg-gradient-to-b from-slate-800 via-slate-900 to-black rounded-3xl p-3 sm:p-5 border-2 border-slate-600/80 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)]">
                
                {/* Industrial Corner Screws / Bolts */}
                <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-slate-400 border border-slate-700 shadow-inner flex items-center justify-center">
                  <div className="w-1.5 h-0.5 bg-slate-700" />
                </div>
                <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-slate-400 border border-slate-700 shadow-inner flex items-center justify-center">
                  <div className="w-1.5 h-0.5 bg-slate-700" />
                </div>
                <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-slate-400 border border-slate-700 shadow-inner flex items-center justify-center">
                  <div className="w-1.5 h-0.5 bg-slate-700" />
                </div>
                <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-slate-400 border border-slate-700 shadow-inner flex items-center justify-center">
                  <div className="w-1.5 h-0.5 bg-slate-700" />
                </div>

                {/* Top Billboard Header Bar */}
                <div className="flex items-center justify-between px-3 py-1.5 mb-2 bg-black/60 rounded-xl border border-white/10 text-[10px] font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#EA2227] animate-ping" />
                    <span className="text-[#FFA494] font-bold uppercase tracking-wider">
                      SAFETY LINE TRACKSIDE ARENA BILLBOARD
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 text-slate-400">
                    <span>CIRCUIT MONZA / SPA / SILVERSTONE</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">LIVE TELEMETRY FEED</span>
                  </div>
                </div>

                {/* Billboard Main Display Face */}
                <div className="relative bg-gradient-to-br from-[#030908] via-[#071614] to-[#040C0B] rounded-2xl border border-white/15 p-5 sm:p-8 lg:p-10 overflow-hidden shadow-inner">
                  
                  {/* Subtle Digital Screen Scanline & Grid Effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-40" />
                  
                  {/* Animated Light Sheen Beam Gliding Across the Billboard */}
                  <motion.div
                    animate={{
                      x: ['-100%', '250%']
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      repeatDelay: 2
                    }}
                    className="absolute inset-y-0 w-48 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none z-10"
                  />

                  {/* Main Billboard Interior Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">
                    
                    {/* Left: Prominent Illuminated Safety Line Branding & Technical Specs */}
                    <div className="lg:col-span-7 space-y-5">
                      
                      {/* Safety Line Official Logo Integrated Billboard Marquee */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-2 border-b border-white/10">
                        {/* Illuminated Safety Line Emblem */}
                        <div className="relative shrink-0 flex items-center justify-center p-3 rounded-2xl bg-black/60 border-2 border-[#EA2227]/70 shadow-[0_0_30px_rgba(234,34,39,0.5)] group">
                          <img
                            src={brandLogo}
                            alt="Safety Line Official Logo"
                            className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(234,34,39,0.8)]"
                          />
                          <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EA2227] opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EA2227]" />
                          </span>
                        </div>

                        {/* Brand Billboard Typography with Neon Illumination */}
                        <div>
                          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EA2227]/20 border border-[#EA2227]/40 text-[#FFA494] text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                            <Flame className="w-3 h-3 text-[#FF5A36]" />
                            <span>FIA 8856-2018 HOMOLOGATED RACING DIVISION</span>
                          </div>
                          
                          <div className="flex items-baseline space-x-2">
                            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none">
                              <span className="text-[#EA2227] drop-shadow-[0_0_20px_rgba(234,34,39,0.9)]">SAFETY</span>{' '}
                              <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]">LINE</span>
                            </h2>
                            <span className="text-xs sm:text-sm font-mono font-bold text-cyan-400 tracking-widest uppercase">
                              MOTORSPORT
                            </span>
                          </div>

                          <p className="text-xs font-mono text-slate-300 tracking-wide mt-1">
                            SIALKOT ADVANCED PROTECTIVE HANDWEAR FACILITY
                          </p>
                        </div>
                      </div>

                      {/* Main Billboard Headline */}
                      <div className="space-y-2">
                        <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                          Professional Formula & GT3 Racing Gloves
                        </h1>
                        <p className="text-xs sm:text-sm text-[#D9F0EC] leading-relaxed">
                          Championship-grade fire-retardant handwear crafted with dual-layer Nomex® aramid, 100% external reverse-seam finger construction, and ultra-high-friction silicone Alcantara steering matrices.
                        </p>
                      </div>

                      {/* Illuminated Telemetry Badges */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        <div className="bg-black/60 border border-[#EA2227]/40 rounded-xl p-2.5 shadow-sm">
                          <div className="flex items-center gap-1.5 text-[#FF5A36] text-xs font-mono font-bold">
                            <Flame className="w-3.5 h-3.5" />
                            <span>15s+ FLAME</span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-0.5">Flash test approved</p>
                        </div>
                        <div className="bg-black/60 border border-emerald-500/40 rounded-xl p-2.5 shadow-sm">
                          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-bold">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>0% BLISTERS</span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-0.5">External reverse seams</p>
                        </div>
                        <div className="bg-black/60 border border-cyan-500/40 rounded-xl p-2.5 shadow-sm col-span-2 sm:col-span-1">
                          <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono font-bold">
                            <Zap className="w-3.5 h-3.5" />
                            <span>TACTILE GRIP</span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-0.5">High-tack silicone matrix</p>
                        </div>
                      </div>

                      {/* Interactive Billboard Livery Selector Tabs */}
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                            <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF5A36]" />
                            <span>Switch Billboard Showcase Livery:</span>
                          </span>
                          <span className="text-[#FFA494] font-bold">{activeGloveSpec.code} • {activeGloveSpec.livery}</span>
                        </div>

                        <div className="grid grid-cols-5 gap-2">
                          {CAR_RACING_GLOVE_MODELS.map((glove, idx) => {
                            const isSelected = activeHeroGloveMode === 'model' && activeHeroGloveIdx === idx;
                            return (
                              <button
                                key={glove.code}
                                onClick={() => {
                                  setActiveHeroGloveIdx(idx);
                                  setActiveHeroGloveMode('model');
                                }}
                                className={`relative group rounded-xl p-1.5 text-left transition-all border cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#EA2227]/30 border-[#EA2227] shadow-[0_0_15px_rgba(234,34,39,0.5)] ring-1 ring-[#EA2227]'
                                    : 'bg-black/50 border-white/10 hover:bg-white/10 hover:border-white/20'
                                }`}
                              >
                                <div className="aspect-square rounded-lg bg-black/60 overflow-hidden flex items-center justify-center p-1 mb-1">
                                  <img
                                    src={glove.image}
                                    alt={glove.code}
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                                  />
                                </div>
                                <div className="text-[10px] font-mono font-bold text-center text-white truncate">
                                  {glove.code.replace('GW-', '')}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Billboard CTAs */}
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => {
                            setInquiryProductTitle(`Motorsport Car Racing Gloves (${activeGloveSpec.code})`);
                            setIsInquiryModalOpen(true);
                          }}
                          className="btn-glow-shine inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#EA2227] via-[#FF5A36] to-[#FF7A59] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#EA2227]/30 active:scale-95 transition-all cursor-pointer border border-[#FF7A59]/40"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Request OEM Spec Pack & Pricing</span>
                        </button>

                        <button
                          onClick={() => setInspectGlove(activeGloveSpec)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono uppercase tracking-wider border border-white/15 transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Quick Data Sheet Overlay</span>
                        </button>
                      </div>

                    </div>

                    {/* Right: ANIMATED RACING GLOVE INTEGRATED DIRECTLY IN THE BILLBOARD */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                      
                      {/* Billboard Giant Display Showcase Frame */}
                      <div className="relative w-full max-w-[360px] sm:max-w-[440px] aspect-square flex items-center justify-center">
                        
                        {/* Outer Pulsing Neon Radial Aura Glow */}
                        <motion.div
                          animate={{ 
                            scale: [1, 1.15, 1],
                            opacity: [0.4, 0.75, 0.4]
                          }}
                          transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#EA2227]/40 via-[#FF5A36]/30 to-[#00F0FF]/30 blur-3xl pointer-events-none"
                        />

                        {/* Concentric Telemetry Target Rings */}
                        <div className="absolute inset-4 rounded-full border border-white/10 pointer-events-none animate-[spin_60s_linear_infinite]" />
                        <div className="absolute inset-12 rounded-full border border-dashed border-[#EA2227]/40 pointer-events-none animate-[spin_40s_linear_infinite_reverse]" />
                        <div className="absolute inset-20 rounded-full border border-cyan-500/20 pointer-events-none" />

                        {/* Billboard Neon Emblem Backlight Halo */}
                        <div className="absolute inset-16 rounded-full bg-[#EA2227]/20 blur-2xl pointer-events-none" />

                        {/* Floating & Breathing 3D Animated Car Racing Glove Showcase */}
                        <motion.div
                          key={`${activeHeroGloveMode}-${activeHeroGloveIdx}`}
                          initial={{ opacity: 0, scale: 0.88, y: 15 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1,
                            y: [0, -14, 0],
                            rotate: [-2, 2.5, -2]
                          }}
                          exit={{ opacity: 0, scale: 0.88 }}
                          transition={{
                            opacity: { duration: 0.4 },
                            scale: { duration: 0.4 },
                            y: {
                              duration: 4.2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            },
                            rotate: {
                              duration: 5.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
                          }}
                          className="relative z-10 w-full h-full flex items-center justify-center p-4 cursor-pointer"
                          onClick={() => setInspectGlove(activeGloveSpec)}
                          title="Click to inspect full technical telemetry"
                        >
                          <img
                            src={activeDisplayedHeroImage}
                            alt={activeGloveSpec.name}
                            className="w-full h-full object-contain filter drop-shadow-[0_25px_40px_rgba(234,34,39,0.55)] transition-transform duration-500 hover:scale-108"
                          />
                        </motion.div>

                        {/* Floating Billboard Telemetry Badges */}
                        <div className="absolute top-2 left-0 bg-black/80 backdrop-blur-md border border-[#EA2227]/60 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono shadow-[0_0_15px_rgba(234,34,39,0.4)] flex items-center gap-1.5 animate-bounce [animation-duration:3.2s]">
                          <Flame className="w-3 h-3 text-[#EA2227]" />
                          <span>FIA 8856-2018</span>
                        </div>

                        <div className="absolute top-2 right-0 bg-black/80 backdrop-blur-md border border-cyan-500/60 text-cyan-300 px-2.5 py-1 rounded-lg text-[10px] font-mono shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-1.5">
                          <Zap className="w-3 h-3 text-cyan-400" />
                          <span>Hi-Tack Silicone</span>
                        </div>

                        <div className="absolute bottom-4 left-2 bg-black/80 backdrop-blur-md border border-emerald-500/60 text-emerald-300 px-2.5 py-1 rounded-lg text-[10px] font-mono shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>External Seams</span>
                        </div>

                        <div className="absolute bottom-4 right-2 bg-black/80 backdrop-blur-md border border-white/25 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono shadow-xl flex items-center gap-1.5">
                          <Gauge className="w-3 h-3 text-[#FF5A36]" />
                          <span>Nomex® Aramid</span>
                        </div>

                      </div>

                      {/* Billboard Model Caption Bar */}
                      <div className="mt-3 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-white/20 text-xs font-mono text-slate-200 shadow-md">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-bold text-white">{activeGloveSpec.name}</span>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Lower Girder with Racetrack Caution Stripes & Official Plaque */}
                <div className="mt-2.5 flex items-center justify-between px-4 py-2 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700/80 text-[10px] font-mono">
                  {/* Left Hazard Stripe Box */}
                  <div className="w-16 h-3 bg-[repeating-linear-gradient(45deg,#EA2227,#EA2227_6px,#000_6px,#000_12px)] rounded-xs opacity-80" />
                  
                  <div className="text-center text-slate-300 font-bold uppercase tracking-wider truncate px-2">
                    SAFETY LINE OFFICIAL MOTORSPORT RACING HANDWEAR • FIA 8856-2018 HOMOLOGATED
                  </div>

                  {/* Right Hazard Stripe Box */}
                  <div className="w-16 h-3 bg-[repeating-linear-gradient(45deg,#EA2227,#EA2227_6px,#000_6px,#000_12px)] rounded-xs opacity-80" />
                </div>

              </div>

            </div>

          </div>
        </section>
      ) : (
        /* Standard Header Banner for other categories */
        <section className="bg-gradient-to-b from-[#0B3D3B] to-[#082D2B] text-white py-10 sm:py-12 border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
            
            {/* Breadcrumb Trail */}
            <div className="flex items-center space-x-2 text-xs font-mono text-[#D9F0EC]">
              <Link to="/" className="hover:text-white transition-colors">Portal</Link>
              <span>/</span>
              <Link to="/gearwear" className="hover:text-white transition-colors">Gearwear</Link>
              <span>/</span>
              <span className="text-[#D9F0EC]/80">{currentWindow.groupLabel}</span>
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

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setInquiryProductTitle(`${currentWindow.title} Line`);
                      setIsInquiryModalOpen(true);
                    }}
                    className="btn-glow-shine inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5A36] to-[#FF7A59] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-md shadow-[#FF5A36]/30 active:scale-95 transition-all cursor-pointer border border-[#FF7A59]/40"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Request Window OEM Spec Pack</span>
                  </button>
                </div>
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
      )}

      {/* =========================================================================
          PRODUCT LISTING & DETAILS PORTION (SUPPORTING DETAILED LIST AND GRID VIEW)
          ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-8">
        
        {/* Filter, View Switcher & Search Bar */}
        <div className={`p-4 sm:p-5 rounded-2xl border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
          isCarRacing ? 'bg-[#081816] border-[#153B36] text-white shadow-xl' : 'bg-white border-slate-200 text-[#1A1A1A]'
        }`}>
          
          {/* Item count & active label */}
          <div className="flex items-center space-x-3">
            <span className={`font-display font-extrabold text-lg ${isCarRacing ? 'text-white' : 'text-[#0B3D3B]'}`}>
              {isCarRacing ? 'Car Racing Gloves & Handwear' : 'Products'}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
              isCarRacing ? 'bg-[#EA2227]/20 border border-[#EA2227]/40 text-[#FFA494]' : 'bg-[#D9F0EC] text-[#0B3D3B]'
            }`}>
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Model' : 'Models'} Available
            </span>
          </div>

          {/* Search, Size Filters & View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* View Mode Switcher (List vs Grid) */}
            <div className={`inline-flex rounded-xl p-1 border text-xs font-mono ${
              isCarRacing ? 'bg-[#030908] border-[#153B36]' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? isCarRacing ? 'bg-[#0B2421] text-white shadow-xs' : 'bg-white text-[#0B3D3B] shadow-xs'
                    : isCarRacing ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Detailed List View with Full Specifications"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">List & Details</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? isCarRacing ? 'bg-[#0B2421] text-white shadow-xs' : 'bg-white text-[#0B3D3B] shadow-xs'
                    : isCarRacing ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Compact Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-grow sm:w-60">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${currentWindow.shortTitle}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full rounded-xl py-1.5 pl-8 pr-3 text-xs outline-none transition-colors ${
                  isCarRacing 
                    ? 'bg-[#030908] border border-[#153B36] focus:border-[#EA2227] text-white placeholder:text-slate-500' 
                    : 'bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] text-[#1A1A1A] placeholder:text-slate-400'
                }`}
              />
            </div>

            {/* Size Filter Dropdown */}
            {availableSizes.length > 2 && (
              <div className="flex items-center space-x-1.5">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Size:</span>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-mono outline-none cursor-pointer ${
                    isCarRacing
                      ? 'bg-[#030908] border border-[#153B36] text-white'
                      : 'bg-[#FAFCFB] border border-slate-200 text-[#0B3D3B]'
                  }`}
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

        {/* =====================================================================
            VIEW MODE 1: DETAILED LIST VIEW (EXHAUSTIVE TECHNICAL MOTORSPORT VIEW)
            ===================================================================== */}
        {viewMode === 'list' && (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => {
                const isCarProduct = product.productCode?.startsWith('GW-CR');
                const matchingSpec = CAR_RACING_GLOVE_MODELS.find(m => m.code === product.productCode);

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className={`rounded-2xl border shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                      isCarRacing 
                        ? 'bg-[#081816] border-[#153B36] hover:border-[#EA2227]/80 text-white' 
                        : 'bg-white border-slate-200 hover:border-[#EA2227]/60 text-[#1A1A1A]'
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-6">
                      
                      {/* Left: Product Image & Badges */}
                      <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
                        <div 
                          className={`aspect-[4/3] rounded-xl relative overflow-hidden flex items-center justify-center p-3 border cursor-pointer group ${
                            isCarRacing ? 'bg-[#020706] border-[#122E2A]' : 'bg-slate-900 border-slate-800'
                          }`}
                          onClick={() => {
                            if (matchingSpec) setInspectGlove(matchingSpec);
                            else navigate(`/product/${product.slug}`);
                          }}
                        >
                          <SmoothImage
                            src={product.coverImage}
                            alt={product.name}
                            priority={idx < 4}
                            fallbackText={product.productCode}
                            containerClassName="w-full h-full flex items-center justify-center"
                            className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out group-hover:scale-108"
                          />

                          {/* Top Badges */}
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                            <span className="bg-[#EA2227] text-white px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase shadow-sm">
                              {product.productCode}
                            </span>
                            {isCarProduct && (
                              <span className="bg-black/80 backdrop-blur-xs text-white border border-white/20 px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase">
                                FIA 8856
                              </span>
                            )}
                          </div>

                          {/* Quick Inspect Hover Icon */}
                          <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-xs text-white border border-white/20 px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-3 h-3 text-[#FF5A36]" />
                            <span>Quick Inspect</span>
                          </div>
                        </div>

                        {/* Colors / Livery preview */}
                        {product.colors && product.colors.length > 0 && (
                          <div className={`flex items-center gap-1.5 text-xs font-mono ${isCarRacing ? 'text-slate-400' : 'text-slate-500'}`}>
                            <span className={`font-semibold ${isCarRacing ? 'text-slate-300' : 'text-slate-700'}`}>Livery:</span>
                            <div className="flex flex-wrap gap-1">
                              {product.colors.map(c => (
                                <span 
                                  key={c} 
                                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                                    isCarRacing ? 'bg-[#030908] border border-[#153B36] text-slate-300' : 'bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Middle: Title, Descriptions, Specifications */}
                      <div className="lg:col-span-5 space-y-3.5 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF5A36] font-bold">
                              {product.material ? product.material.split(',')[0] : currentWindow.title}
                            </span>
                          </div>

                          <h3 
                            onClick={() => navigate(`/product/${product.slug}`)}
                            className={`font-display font-bold text-lg sm:text-xl transition-colors leading-snug cursor-pointer ${
                              isCarRacing ? 'text-white hover:text-[#EA2227]' : 'text-[#0B3D3B] hover:text-[#EA2227]'
                            }`}
                          >
                            {product.name}
                          </h3>

                          <p className={`text-xs sm:text-sm font-normal leading-relaxed ${isCarRacing ? 'text-slate-300' : 'text-slate-600'}`}>
                            {product.shortDescription}
                          </p>

                          {/* Technical Highlights Grid */}
                          <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
                            <div className={`p-2 rounded-lg border ${
                              isCarRacing ? 'bg-[#030908] border-[#153B36]' : 'bg-slate-50 border-slate-100'
                            }`}>
                              <span className="text-[10px] font-mono text-slate-400 uppercase block">Material Core</span>
                              <span className={`font-semibold text-[11px] truncate block ${isCarRacing ? 'text-white' : 'text-[#0B3D3B]'}`} title={product.material}>
                                {product.material || 'Nomex® Aramid Matrix'}
                              </span>
                            </div>
                            <div className={`p-2 rounded-lg border ${
                              isCarRacing ? 'bg-[#030908] border-[#153B36]' : 'bg-slate-50 border-slate-100'
                            }`}>
                              <span className="text-[10px] font-mono text-slate-400 uppercase block">Certification</span>
                              <span className="font-semibold text-[#EA2227] text-[11px] truncate block">
                                {isCarProduct ? 'FIA 8856-2018 / SFI 3.3/5' : 'EN ISO Safety Standard'}
                              </span>
                            </div>
                          </div>

                          {/* Sizing tags */}
                          {product.sizes && product.sizes.length > 0 && (
                            <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] font-mono text-slate-400 uppercase">Available Sizes:</span>
                              {product.sizes.map(s => (
                                <span 
                                  key={s} 
                                  className={`w-6 h-6 rounded border font-mono text-[10px] font-bold flex items-center justify-center ${
                                    isCarRacing ? 'border-[#153B36] text-white bg-[#030908]' : 'border-slate-200 text-[#0B3D3B] bg-white'
                                  }`}
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Top Features */}
                        {product.features && product.features.length > 0 && (
                          <div className={`pt-2 border-t space-y-1 ${isCarRacing ? 'border-[#153B36]' : 'border-slate-100'}`}>
                            {product.features.slice(0, 3).map((feat, fIdx) => (
                              <div key={fIdx} className={`flex items-start gap-1.5 text-xs ${isCarRacing ? 'text-slate-300' : 'text-slate-600'}`}>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span className="leading-tight">{feat}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Actions, OEM Request, Spec Sheet */}
                      <div className={`lg:col-span-3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6 space-y-3 ${
                        isCarRacing ? 'border-[#153B36]' : 'border-slate-100'
                      }`}>
                        
                        <div className="space-y-2">
                          <div className={`rounded-xl p-3 border ${
                            isCarRacing ? 'bg-[#030908] border-[#153B36]' : 'bg-[#D9F0EC]/50 border-[#0B3D3B]/10'
                          }`}>
                            <span className={`text-[10px] font-mono uppercase tracking-wider font-bold block mb-1 ${
                              isCarRacing ? 'text-[#FFA494]' : 'text-[#0B3D3B]'
                            }`}>
                              Manufacturing Specs
                            </span>
                            <ul className={`text-[11px] space-y-1 ${isCarRacing ? 'text-slate-300' : 'text-slate-600'}`}>
                              <li>• Custom Team Branding Available</li>
                              <li>• Fireproof Thread & Embroidery</li>
                              <li>• Export Packaging & Barcoding</li>
                            </ul>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <button
                            onClick={() => navigate(`/product/${product.slug}`)}
                            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
                              isCarRacing 
                                ? 'bg-[#EA2227] hover:bg-[#c9181d] text-white shadow-[#EA2227]/25' 
                                : 'bg-[#0B3D3B] hover:bg-[#124f4d] text-white'
                            }`}
                          >
                            <span>View Full Specifications</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              setInquiryProductTitle(`${product.productCode} - ${product.name}`);
                              setIsInquiryModalOpen(true);
                            }}
                            className="w-full py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-all bg-[#FF5A36] hover:bg-[#e44e2b] text-white shadow-xs cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Request OEM Quote</span>
                          </button>

                          {matchingSpec && (
                            <button
                              onClick={() => setInspectGlove(matchingSpec)}
                              className={`w-full py-1.5 px-3 rounded-lg text-[11px] font-mono text-center transition-colors cursor-pointer ${
                                isCarRacing 
                                  ? 'text-slate-400 hover:text-white hover:bg-white/10' 
                                  : 'text-slate-500 hover:text-[#0B3D3B] hover:bg-slate-100'
                              }`}
                            >
                              Quick Data Sheet Overlay
                            </button>
                          )}
                        </div>

                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* =====================================================================
            VIEW MODE 2: GRID VIEW (COMPACT MOTORSPORT CATALOGUE CARDS)
            ===================================================================== */}
        {viewMode === 'grid' && (
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
                  className={`group cursor-pointer rounded-2xl border shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isCarRacing 
                      ? 'bg-[#081816] border-[#153B36] hover:border-[#EA2227] text-white' 
                      : 'bg-white border-slate-200 hover:border-[#EA2227] text-[#1A1A1A]'
                  }`}
                >
                  <div>
                    {/* Product Image Frame */}
                    <div className={`aspect-[4/3] relative overflow-hidden flex items-center justify-center p-3 border-b ${
                      isCarRacing ? 'bg-[#020706] border-[#122E2A]' : 'bg-slate-900 border-slate-800'
                    }`}>
                      <SmoothImage
                        src={product.coverImage}
                        alt={product.name}
                        priority={idx < 3}
                        fallbackText={product.productCode}
                        containerClassName="w-full h-full flex items-center justify-center"
                        className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out group-hover:scale-108"
                      />

                      {/* Product Code Badge */}
                      <div className="absolute top-3 left-3 bg-[#EA2227] text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase shadow-xs">
                        {product.productCode}
                      </div>

                      {/* Sizing Indicator */}
                      {product.sizes && product.sizes.length > 0 && (
                        <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase shadow-xs border border-white/20">
                          {product.sizes.length} Sizes
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF5A36] font-bold block">
                        {product.material ? product.material.split(',')[0] : currentWindow.title}
                      </span>

                      <h3 className={`font-display font-bold text-base transition-colors leading-snug ${
                        isCarRacing ? 'text-white group-hover:text-[#EA2227]' : 'text-[#0B3D3B] group-hover:text-[#EA2227]'
                      }`}>
                        {product.name}
                      </h3>

                      <p className={`text-xs font-normal leading-relaxed line-clamp-2 ${
                        isCarRacing ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {product.shortDescription}
                      </p>

                      {/* Features snippet */}
                      {product.features && product.features.length > 0 && (
                        <div className={`pt-2 border-t ${isCarRacing ? 'border-[#153B36]' : 'border-slate-100'}`}>
                          <span className={`text-[11px] flex items-center gap-1.5 truncate ${
                            isCarRacing ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">{product.features[0]}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-5 pt-0">
                    <div className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center justify-between transition-all ${
                      isCarRacing
                        ? 'bg-[#030908] text-slate-200 group-hover:bg-[#EA2227] group-hover:text-white border border-[#153B36]'
                        : 'bg-[#D9F0EC] group-hover:bg-[#0B3D3B] text-[#0B3D3B] group-hover:text-white'
                    }`}>
                      <span>View Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state if search yields no results */}
        {filteredProducts.length === 0 && (
          <div className={`rounded-2xl border p-12 text-center space-y-3 ${
            isCarRacing ? 'bg-[#081816] border-[#153B36] text-white' : 'bg-white border-slate-200 text-[#1A1A1A]'
          }`}>
            <Filter className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className={`font-display font-bold text-base ${isCarRacing ? 'text-white' : 'text-[#0B3D3B]'}`}>
              No products found matching your filter
            </h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Try adjusting your search terms or clearing active filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedSize('All'); }}
              className="mt-2 bg-[#EA2227] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* =========================================================================
            MOTORSPORT COMPARISON MATRIX (DEDICATED SECTION FOR CAR RACING GLOVES)
            ========================================================================= */}
        {isCarRacing && (
          <section className="bg-[#081816] rounded-2xl border border-[#153B36] p-6 sm:p-8 space-y-6 shadow-xl text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#153B36] pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#EA2227] uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Technical Specification Matrix</span>
                </div>
                <h3 className="font-display font-bold text-xl text-white mt-1">
                  Car Racing Gloves Lineup Comparison
                </h3>
              </div>
            </div>

            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#153B36] bg-[#030908] text-slate-300 font-mono text-[11px] uppercase">
                    <th className="py-3 px-3">Glove Model</th>
                    <th className="py-3 px-3">Homologation</th>
                    <th className="py-3 px-3">Knuckle Protection</th>
                    <th className="py-3 px-3">Palm Grip Technology</th>
                    <th className="py-3 px-3">Primary Discipline</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#153B36]">
                  {CAR_RACING_GLOVE_MODELS.map((glove) => (
                    <tr key={glove.code} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={glove.image}
                            alt={glove.code}
                            className="w-10 h-10 object-contain rounded bg-[#020706] border border-[#153B36] p-0.5 shrink-0"
                          />
                          <div>
                            <span className="font-mono font-bold text-white block">{glove.code}</span>
                            <span className="text-[11px] text-slate-300 font-medium">{glove.name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-[#EA2227]/20 border border-[#EA2227]/40 text-[#FFA494] font-mono font-bold text-[10px]">
                          {glove.badge}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-200 font-medium">
                        {glove.knuckleArmor}
                      </td>
                      <td className="py-3.5 px-3 text-slate-200 font-medium">
                        {glove.palmMatrix}
                      </td>
                      <td className="py-3.5 px-3 text-slate-300">
                        {glove.targetDiscipline}
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => setInspectGlove(glove)}
                          className="px-2.5 py-1 rounded-lg bg-[#030908] hover:bg-[#EA2227] hover:text-white text-slate-200 font-mono text-[10px] uppercase font-bold transition-colors cursor-pointer border border-[#153B36]"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Switch Category Strip */}
        <section className={`pt-12 border-t space-y-4 ${isCarRacing ? 'border-[#153B36]' : 'border-slate-200/80'}`}>
          <div className="flex items-center justify-between">
            <h3 className={`font-display font-bold text-lg ${isCarRacing ? 'text-white' : 'text-[#0B3D3B]'}`}>
              Explore Other Gearwear
            </h3>
            <Link
              to="/gearwear"
              className="text-xs font-mono font-bold text-[#FF5A36] hover:underline uppercase inline-flex items-center gap-1"
            >
              <span>View All Gearwear</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherWindows.map((win) => (
              <div
                key={win.id}
                onClick={() => navigate(win.routePath)}
                className={`group cursor-pointer p-4 rounded-xl border transition-all hover:shadow-md flex items-center space-x-3.5 ${
                  isCarRacing 
                    ? 'bg-[#081816] border-[#153B36] hover:border-[#FF5A36] text-white' 
                    : 'bg-white border-slate-200 hover:border-[#FF5A36]'
                }`}
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                  <img
                    src={win.image}
                    alt={win.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className={`font-display font-bold text-xs sm:text-sm group-hover:text-[#FF5A36] transition-colors truncate ${
                    isCarRacing ? 'text-white' : 'text-[#0B3D3B]'
                  }`}>
                    {win.title}
                  </h4>
                  <p className={`text-[11px] truncate font-normal ${isCarRacing ? 'text-slate-400' : 'text-slate-500'}`}>
                    {win.minorDetail}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF5A36] group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* =========================================================================
          QUICK GLOVE INSPECTION MODAL (FOR MOTORSPORT CAR RACING GLOVES)
          ========================================================================= */}
      <AnimatePresence>
        {inspectGlove && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#081816] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#153B36] shadow-2xl relative text-white"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-[#030908] text-white p-5 flex items-center justify-between border-b border-[#153B36]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#EA2227] text-white text-[10px] font-mono font-bold">
                    {inspectGlove.code}
                  </span>
                  <span className="text-xs font-mono text-[#D9F0EC]">Motorsport Telemetry Data Sheet</span>
                </div>
                <button
                  onClick={() => setInspectGlove(null)}
                  className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  <div className="aspect-square bg-[#020706] rounded-2xl flex items-center justify-center p-4 border border-[#122E2A]">
                    <img
                      src={inspectGlove.image}
                      alt={inspectGlove.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(234,34,39,0.4)]"
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-[#EA2227] uppercase">
                      Livery: {inspectGlove.livery}
                    </span>
                    <h4 className="font-display font-black text-xl text-white leading-tight">
                      {inspectGlove.name}
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {inspectGlove.summary}
                    </p>
                    <div className="p-3 rounded-xl bg-[#030908] border border-[#153B36] space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Flame Rating:</span>
                        <span className="font-mono font-bold text-[#EA2227]">{inspectGlove.flameRating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Seam Type:</span>
                        <span className="font-semibold text-slate-200">{inspectGlove.seamType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Knuckle Armor:</span>
                        <span className="font-semibold text-slate-200">{inspectGlove.knuckleArmor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Target Series:</span>
                        <span className="font-semibold text-slate-200">{inspectGlove.targetDiscipline}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-[#153B36]">
                  <button
                    onClick={() => {
                      setInquiryProductTitle(`${inspectGlove.code} - ${inspectGlove.name}`);
                      setInspectGlove(null);
                      setIsInquiryModalOpen(true);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 bg-[#EA2227] hover:bg-[#c9181d] text-white shadow-md shadow-[#EA2227]/25 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Request Quotation & OEM Customization</span>
                  </button>

                  <button
                    onClick={() => setInspectGlove(null)}
                    className="py-3 px-5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[#030908] hover:bg-white/10 text-slate-300 border border-[#153B36] cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Multi-Stage Animated Spec & OEM Loading Form Modal */}
      <InquiryLoadingModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        settings={settings}
        defaultCategory={`Gearwear: ${currentWindow.title}`}
        defaultProductTitle={inquiryProductTitle}
      />

    </motion.div>
  );
}

export default GearwearWindowPage;
