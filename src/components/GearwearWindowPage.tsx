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
    name: 'Pro Apex Formula FIA-8856 Racing Gloves',
    livery: 'Red / Stealth Black',
    image: cg1Img,
    badge: 'FIA 8856-2018',
    flameRating: '15s+ Direct Contact Flame Resistance',
    palmMatrix: 'High-Tack Multi-Zone Silicone Grid',
    seamType: '100% External Reverse Seam (0% Blisters)',
    knuckleArmor: 'Molded Carbon-Composite Impact Shield',
    targetDiscipline: 'Formula 1, F2, F3 & Open Cockpit Sprint',
    summary: 'Constructed with double-layer Nomex® aramid knit certified to withstand direct flame contact. Features reverse-seam finger construction to eliminate blisters against high-G steering loads.'
  },
  {
    code: 'GW-CR-02',
    name: 'Apex Tech 1-ZX Biomechanical Carbon Gloves',
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
    name: 'Veloce ZX-W High-Visibility Endurance Gloves',
    livery: 'Hi-Vis Yellow / Grey',
    image: cg3Img,
    badge: 'Night Stint Hi-Vis',
    flameRating: 'FIA 8856-2000 & SFI 3.3/5 Certified',
    palmMatrix: 'Perforated Leather & Silicone Grip Zones',
    seamType: 'External Reverse Seam with Bound Cuffs',
    knuckleArmor: 'Rigid Carbon-Weave Metacarpal Plate',
    targetDiscipline: '24-Hour Le Mans / Nürburgring & Night Rally',
    summary: 'Optimized for night stints and 24-hour endurance GT racing where visual signaling in dark cockpits is vital. Fluorescent yellow Nomex® aramid stands out sharply under cockpit ambient lighting.'
  },
  {
    code: 'GW-CR-04',
    name: 'Formula F1 Fastback Ultra-Lightweight Sprint Gloves',
    livery: 'Crimson Red / Pure White',
    image: cg4Img,
    badge: 'Ultra-Lightweight',
    flameRating: 'FIA 8856-2018 Benchmark Tested',
    palmMatrix: 'Direct-Fused Silicone Topography Print',
    seamType: 'Flatlock External Zero-Bulk Seams',
    knuckleArmor: 'Low-Profile Flexible Aramid Dampener',
    targetDiscipline: 'Single-Seaters, Formula Regional & Sim Racing',
    summary: 'Engineered specifically for single-seater open cockpit formula racing where every gram counts. Features an ultra-lightweight single-layer palm with dual-layer gauntlet compliance.'
  },
  {
    code: 'GW-CR-05',
    name: 'GT Endurance Suede-Reinforced Touring Gloves',
    livery: 'Stealth Black / Titanium',
    image: cg5Img,
    badge: 'Pittards® Suede',
    flameRating: 'FIA 8856-2018 & SFI Approved',
    palmMatrix: 'Genuine Fireproof Suede Reinforcements',
    seamType: 'Heavy-Duty Reinforced External Seaming',
    knuckleArmor: 'Metacarpal Memory Foam & Carbon Accents',
    targetDiscipline: 'GT Endurance, WRC Rally & Historic Touring',
    summary: 'Built for high vibration and abrasive steering wheels. Features genuine fire-retardant treated suede leather palm patches and titanium-silver reflective heat panels on gauntlets.'
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
      className="min-h-screen bg-[#FAFCFB] text-[#1A1A1A] font-sans pb-24"
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
      {isCarRacing ? (
        <section className="bg-gradient-to-br from-[#061817] via-[#092B29] to-[#041211] text-white py-10 sm:py-14 border-b border-white/10 relative overflow-hidden">
          {/* Subtle grid pattern & glowing telemetry aura */}
          <div className="absolute inset-0 bg-[radial-gradient(#EA2227_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#EA2227]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 right-10 w-96 h-96 rounded-full bg-[#00F0FF]/15 blur-3xl pointer-events-none" />

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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Badges, Specs, Selector */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* FIA Homologation Tag */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA2227]/20 border border-[#EA2227]/40 text-[#FFA494] text-xs font-mono font-bold uppercase tracking-wider shadow-inner">
                    <span className="w-2 h-2 rounded-full bg-[#EA2227] animate-ping" />
                    <Flame className="w-3.5 h-3.5 text-[#FF5A36]" />
                    <span>FIA 8856-2018 & SFI 3.3/5 HOMOLOGATED</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">GW-CR Series</span>
                </div>

                {/* Main Head Title */}
                <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]">
                  Car Racing Gloves
                </h1>

                {/* Subtitle / Minor detail */}
                <p className="text-base sm:text-lg text-[#D9F0EC] font-medium leading-relaxed">
                  Track-tested Formula, GT3 endurance, and rally motorsport racing handwear engineered with genuine double-layer Nomex® aramid, external reverse seams, and high-tack silicone steering grip matrices.
                </p>

                {/* Telemetry Highlights Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <div className="flex items-center gap-1.5 text-[#FF5A36] text-xs font-mono font-bold">
                      <Flame className="w-3.5 h-3.5" />
                      <span>15s+ FLAME</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">Direct contact flash test</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>0% BLISTERS</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">100% external reverse seams</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 col-span-2 sm:col-span-1">
                    <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono font-bold">
                      <Zap className="w-3.5 h-3.5" />
                      <span>HIGH-TACK GRIP</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">Silicone Alcantara matrix</p>
                  </div>
                </div>

                {/* Interactive Glove Model Quick Switcher */}
                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                    <span className="uppercase tracking-wider flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF5A36]" />
                      <span>Select Glove Model to Inspect:</span>
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
                              ? 'bg-[#EA2227]/25 border-[#EA2227] shadow-lg shadow-[#EA2227]/30 ring-1 ring-[#EA2227]'
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="aspect-square rounded-lg bg-black/40 overflow-hidden flex items-center justify-center p-1 mb-1">
                            <img
                              src={glove.image}
                              alt={glove.code}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform"
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

                {/* Head CTAs */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
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
                    onClick={() => {
                      setActiveHeroGloveMode(activeHeroGloveMode === 'hero' ? 'model' : 'hero');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono uppercase tracking-wider border border-white/15 transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{activeHeroGloveMode === 'hero' ? 'Show Selected Model' : 'View 3D Telemetry Render'}</span>
                  </button>
                </div>

              </div>

              {/* Right Column: ANIMATED CAR RACING GLOVE HERO SHOWCASE */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                
                {/* Radial Telemetry Speed Rings */}
                <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square flex items-center justify-center">
                  
                  {/* Outer Pulsing Aura Glow */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.15, 1],
                      opacity: [0.35, 0.7, 0.35]
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#EA2227]/40 via-[#FF5A36]/30 to-[#00F0FF]/30 blur-3xl pointer-events-none"
                  />

                  {/* Concentric Telemetry Circles */}
                  <div className="absolute inset-4 rounded-full border border-white/10 pointer-events-none animate-[spin_60s_linear_infinite]" />
                  <div className="absolute inset-12 rounded-full border border-dashed border-[#EA2227]/30 pointer-events-none animate-[spin_40s_linear_infinite_reverse]" />
                  <div className="absolute inset-20 rounded-full border border-white/15 pointer-events-none" />

                  {/* Floating Animated Car Racing Glove Showcase */}
                  <motion.div
                    key={`${activeHeroGloveMode}-${activeHeroGloveIdx}`}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      y: [0, -12, 0],
                      rotate: [-1, 1.5, -1]
                    }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.4 },
                      y: {
                        duration: 4.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      rotate: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    className="relative z-10 w-full h-full flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setInspectGlove(activeGloveSpec)}
                    title="Click to quick-inspect full engineering specifications"
                  >
                    <img
                      src={activeDisplayedHeroImage}
                      alt={activeGloveSpec.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(234,34,39,0.45)] transition-transform duration-500 hover:scale-105"
                    />
                  </motion.div>

                  {/* Floating Telemetry Badges Overlay */}
                  <div className="absolute top-2 left-0 bg-black/75 backdrop-blur-md border border-[#EA2227]/50 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono shadow-xl flex items-center gap-1.5 animate-bounce [animation-duration:3s]">
                    <Flame className="w-3 h-3 text-[#EA2227]" />
                    <span>FIA 8856-2018</span>
                  </div>

                  <div className="absolute top-2 right-0 bg-black/75 backdrop-blur-md border border-cyan-500/50 text-cyan-300 px-2.5 py-1 rounded-lg text-[10px] font-mono shadow-xl flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    <span>Hi-Tack Silicone</span>
                  </div>

                  <div className="absolute bottom-4 left-2 bg-black/75 backdrop-blur-md border border-emerald-500/50 text-emerald-300 px-2.5 py-1 rounded-lg text-[10px] font-mono shadow-xl flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>External Seams</span>
                  </div>

                  <div className="absolute bottom-4 right-2 bg-black/75 backdrop-blur-md border border-white/20 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono shadow-xl flex items-center gap-1.5">
                    <Gauge className="w-3 h-3 text-[#FF5A36]" />
                    <span>Nomex® Aramid</span>
                  </div>

                </div>

                {/* Animated Glove Caption Bar */}
                <div className="mt-2 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-white">{activeHeroGloveMode === 'hero' ? 'Interactive 3D Telemetry Glove' : activeGloveSpec.name}</span>
                  </div>
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
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Item count & active label */}
          <div className="flex items-center space-x-3">
            <span className="font-display font-extrabold text-lg text-[#0B3D3B]">
              {isCarRacing ? 'Car Racing Gloves & Apparel' : 'Products'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Model' : 'Models'} Available
            </span>
          </div>

          {/* Search, Size Filters & View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* View Mode Switcher (List vs Grid) */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-[#0B3D3B] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
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
                    ? 'bg-white text-[#0B3D3B] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
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
                    className="bg-white rounded-2xl border border-slate-200 hover:border-[#EA2227]/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-6">
                      
                      {/* Left: Product Image & Badges */}
                      <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
                        <div 
                          className="aspect-[4/3] bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center p-3 border border-slate-800 cursor-pointer group"
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
                            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-108"
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
                          <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[#0B3D3B] px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-3 h-3 text-[#FF5A36]" />
                            <span>Quick Inspect</span>
                          </div>
                        </div>

                        {/* Colors / Livery preview */}
                        {product.colors && product.colors.length > 0 && (
                          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                            <span className="font-semibold text-slate-700">Livery:</span>
                            <div className="flex flex-wrap gap-1">
                              {product.colors.map(c => (
                                <span key={c} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
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
                            className="font-display font-bold text-lg sm:text-xl text-[#0B3D3B] hover:text-[#EA2227] transition-colors leading-snug cursor-pointer"
                          >
                            {product.name}
                          </h3>

                          <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                            {product.shortDescription}
                          </p>

                          {/* Technical Highlights Grid */}
                          <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                              <span className="text-[10px] font-mono text-slate-400 uppercase block">Material Core</span>
                              <span className="font-semibold text-[#0B3D3B] text-[11px] truncate block" title={product.material}>
                                {product.material || 'Nomex® Aramid Matrix'}
                              </span>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
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
                                  className="w-6 h-6 rounded border border-slate-200 text-[#0B3D3B] font-mono text-[10px] font-bold flex items-center justify-center bg-white"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Top Features */}
                        {product.features && product.features.length > 0 && (
                          <div className="pt-2 border-t border-slate-100 space-y-1">
                            {product.features.slice(0, 3).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-1.5 text-xs text-slate-600">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-tight">{feat}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Actions, OEM Request, Spec Sheet */}
                      <div className="lg:col-span-3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 space-y-3">
                        
                        <div className="space-y-2">
                          <div className="bg-[#D9F0EC]/50 border border-[#0B3D3B]/10 rounded-xl p-3">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#0B3D3B] font-bold block mb-1">
                              Manufacturing Specs
                            </span>
                            <ul className="text-[11px] text-slate-600 space-y-1">
                              <li>• Custom Team Branding Available</li>
                              <li>• Fireproof Thread & Embroidery</li>
                              <li>• Export Packaging & Barcoding</li>
                            </ul>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <button
                            onClick={() => navigate(`/product/${product.slug}`)}
                            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all bg-[#0B3D3B] hover:bg-[#124f4d] text-white shadow-xs cursor-pointer"
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
                              className="w-full py-1.5 px-3 rounded-lg text-[11px] font-mono text-slate-500 hover:text-[#0B3D3B] hover:bg-slate-100 text-center transition-colors cursor-pointer"
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
                  className="group cursor-pointer bg-white rounded-2xl border border-slate-200 hover:border-[#EA2227] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Product Image Frame */}
                    <div className="aspect-[4/3] bg-slate-900 relative overflow-hidden flex items-center justify-center p-3 border-b border-slate-800">
                      <SmoothImage
                        src={product.coverImage}
                        alt={product.name}
                        priority={idx < 3}
                        fallbackText={product.productCode}
                        containerClassName="w-full h-full flex items-center justify-center"
                        className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-108"
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

                      <h3 className="font-display font-bold text-base text-[#0B3D3B] group-hover:text-[#EA2227] transition-colors leading-snug">
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
        )}

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

        {/* =========================================================================
            MOTORSPORT COMPARISON MATRIX (DEDICATED SECTION FOR CAR RACING GLOVES)
            ========================================================================= */}
        {isCarRacing && (
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#EA2227] uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Technical Specification Matrix</span>
                </div>
                <h3 className="font-display font-bold text-xl text-[#0B3D3B] mt-1">
                  Car Racing Gloves Lineup Comparison
                </h3>
              </div>
              <button
                onClick={() => {
                  setInquiryProductTitle('Full Car Racing Gloves Lineup (CG-01 to CG-05)');
                  setIsInquiryModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B3D3B] hover:bg-[#124f4d] text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Request All 5 Data Sheets</span>
              </button>
            </div>

            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-mono text-[11px] uppercase">
                    <th className="py-3 px-3">Glove Model</th>
                    <th className="py-3 px-3">Homologation</th>
                    <th className="py-3 px-3">Knuckle Protection</th>
                    <th className="py-3 px-3">Palm Grip Technology</th>
                    <th className="py-3 px-3">Primary Discipline</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CAR_RACING_GLOVE_MODELS.map((glove) => (
                    <tr key={glove.code} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={glove.image}
                            alt={glove.code}
                            className="w-10 h-10 object-contain rounded bg-slate-900 p-0.5 shrink-0"
                          />
                          <div>
                            <span className="font-mono font-bold text-[#0B3D3B] block">{glove.code}</span>
                            <span className="text-[11px] text-slate-500 font-medium">{glove.name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-[#EA2227]/10 text-[#EA2227] font-mono font-bold text-[10px]">
                          {glove.badge}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-700 font-medium">
                        {glove.knuckleArmor}
                      </td>
                      <td className="py-3.5 px-3 text-slate-700 font-medium">
                        {glove.palmMatrix}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600">
                        {glove.targetDiscipline}
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => setInspectGlove(glove)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#0B3D3B] hover:text-white text-[#0B3D3B] font-mono text-[10px] uppercase font-bold transition-colors cursor-pointer"
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
        <section className="pt-12 border-t border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-[#0B3D3B]">
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
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-[#0B3D3B] text-white p-5 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#EA2227] text-white text-[10px] font-mono font-bold">
                    {inspectGlove.code}
                  </span>
                  <span className="text-xs font-mono text-[#D9F0EC]">Motorsport Data Sheet</span>
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
                  <div className="aspect-square bg-slate-900 rounded-2xl flex items-center justify-center p-4 border border-slate-800">
                    <img
                      src={inspectGlove.image}
                      alt={inspectGlove.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(234,34,39,0.3)]"
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-[#EA2227] uppercase">
                      Livery: {inspectGlove.livery}
                    </span>
                    <h4 className="font-display font-black text-xl text-[#0B3D3B] leading-tight">
                      {inspectGlove.name}
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {inspectGlove.summary}
                    </p>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Flame Rating:</span>
                        <span className="font-mono font-bold text-[#EA2227]">{inspectGlove.flameRating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Seam Type:</span>
                        <span className="font-semibold text-slate-800">{inspectGlove.seamType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Knuckle Armor:</span>
                        <span className="font-semibold text-slate-800">{inspectGlove.knuckleArmor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Target Series:</span>
                        <span className="font-semibold text-slate-800">{inspectGlove.targetDiscipline}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-100">
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
                    className="py-3 px-5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
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
