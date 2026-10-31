import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft as ArrowLeftIcon, 
  Search as SearchIcon, 
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  ShieldCheck as ShieldCheckIcon,
  CheckCircle2 as CheckCircle2Icon,
  Filter as FilterIcon,
  Sparkles as SparklesIcon,
  Flame as FlameIcon,
  Zap as ZapIcon,
  Eye as EyeIcon,
  LayoutGrid as LayoutGridIcon,
  List as ListIcon,
  X as XIcon,
  Gauge as GaugeIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { navigate, Link } from '../lib/router';
import { GearwearWindow, GEARWEAR_WINDOWS } from '../data/gearwearWindows';
import { Product, Settings } from '../types';
import SmoothImage from './SmoothImage';
import SEO from './SEO';
import brandLogo from '../assets/images/safetyline_landing.png';
import InquiryLoadingModal from './InquiryLoadingModal';

// Four Official Motorsport Car Racing Gloves Assets (excluding removed cg2)
import cg1Img from '../assets/images/cg1.png';
import cg3Img from '../assets/images/cg3.png';
import cg4Img from '../assets/images/cg4.png';
import cg5Img from '../assets/images/cg5.png';

// Isolated Transparent Slide Animation Images (background removed exclusively for the slide animation)
import cg1SlideImg from '../assets/images/cg1_slide.png';
import cg3SlideImg from '../assets/images/cg3_slide.png';
import cg4SlideImg from '../assets/images/cg4_slide.png';
import cg5SlideImg from '../assets/images/cg5_slide.png';

interface GearwearWindowPageProps {
  window: GearwearWindow;
  products: Product[];
  settings: Settings;
}

// Dedicated metadata for the 4 car racing glove models
export interface CarRacingGloveSpec {
  code: string;
  name: string;
  livery: string;
  image: string;
  slideImage: string;
  badge: string;
  flameRating: string;
  palmMatrix: string;
  seamType: string;
  knuckleArmor: string;
  targetDiscipline: string;
  summary: string;
}

export const CAR_RACING_GLOVE_MODELS: CarRacingGloveSpec[] = [
  {
    code: 'GW-CR-01',
    name: 'Safety Line Signature Flame FIA Racing Gloves',
    livery: 'Purple / Black Tiger Flame',
    image: cg1Img,
    slideImage: cg1SlideImg,
    badge: 'FIA 8856-2018',
    flameRating: '15s+ Direct Contact Flame Resistance',
    palmMatrix: 'Reinforced Suede Steering Grip with Knuckle Padding',
    seamType: 'External Reverse Seams with Safety Line Wrist Strap',
    knuckleArmor: 'Metacarpal Impact Dampener & Suede Upper Shield',
    targetDiscipline: 'Circuit Racing, Touring & Sprint Track Days',
    summary: 'Official Safety Line FIA-compliant fireproof racing gloves featuring iconic purple tiger flame Nomex® backing, suede reinforced grip, and embroidered SL insignia on the safety gauntlet.'
  },
  {
    code: 'GW-CR-03',
    name: 'Safety Line Veloce High-Visibility Endurance Gloves',
    livery: 'Signal Neon Yellow / Black',
    image: cg3Img,
    slideImage: cg3SlideImg,
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
    slideImage: cg4SlideImg,
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
    slideImage: cg5SlideImg,
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryProductTitle, setInquiryProductTitle] = useState<string>(
    isCarRacing ? 'Car Racing Gloves Series' : `${currentWindow.title} Line`
  );

  // Auto slide animation index
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  // Quick Inspection Modal State
  const [inspectGlove, setInspectGlove] = useState<CarRacingGloveSpec | null>(null);

  // Automatic continuous slideshow cycling every 3 seconds
  useEffect(() => {
    if (!isCarRacing) return;

    const timer = setInterval(() => {
      setSlideDirection('next');
      setActiveSlideIdx((prev) => (prev + 1) % CAR_RACING_GLOVE_MODELS.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isCarRacing]);

  const goToNextSlide = () => {
    setSlideDirection('next');
    setActiveSlideIdx((prev) => (prev + 1) % CAR_RACING_GLOVE_MODELS.length);
  };

  const goToPrevSlide = () => {
    setSlideDirection('prev');
    setActiveSlideIdx((prev) => (prev - 1 + CAR_RACING_GLOVE_MODELS.length) % CAR_RACING_GLOVE_MODELS.length);
  };

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

  const activeGlove = CAR_RACING_GLOVE_MODELS[activeSlideIdx] || CAR_RACING_GLOVE_MODELS[0];

  // Calculate previous and next glove indexes for the visual 3D carousel effect
  const prevGloveIdx = (activeSlideIdx - 1 + CAR_RACING_GLOVE_MODELS.length) % CAR_RACING_GLOVE_MODELS.length;
  const nextGloveIdx = (activeSlideIdx + 1) % CAR_RACING_GLOVE_MODELS.length;
  const prevGlove = CAR_RACING_GLOVE_MODELS[prevGloveIdx];
  const nextGlove = CAR_RACING_GLOVE_MODELS[nextGloveIdx];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      id="gearwear-category-page" 
      className="min-h-screen font-sans bg-[#F8FAFC] text-[#0F172A] pb-24"
    >
      <SEO
        title={`${isCarRacing ? 'FIA Car Racing Gloves' : currentWindow.title} | Safety Line Motorsport & Protective Handwear`}
        description={`${currentWindow.title}: ${currentWindow.minorDetail} Engineered at Safety Line's Sialkot industrial facilities.`}
        keywords={`${currentWindow.title}, car racing gloves, FIA 8856, Nomex racing gloves, motorsport handwear, Safety Line, Gearwear`}
        image={currentWindow.image}
      />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#070D14]/95 backdrop-blur-md text-white border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Category Identification with Premium Presentation Badge */}
          <Link to="/" className="flex items-center space-x-3.5 sm:space-x-4 cursor-pointer group">
            {/* High-contrast Emblem Badge ensuring the red 'S' and black 'L' stand out brilliantly */}
            <div className="relative shrink-0 flex items-center justify-center p-2 rounded-2xl bg-gradient-to-b from-white via-white to-slate-100 shadow-lg shadow-black/50 border border-white/80 group-hover:border-[#EA2227] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(234,34,39,0.4)]">
              <img
                src={brandLogo}
                alt="Safety Line"
                className="h-9 sm:h-10 w-auto object-contain filter drop-shadow-xs"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-base sm:text-lg tracking-[0.18em] uppercase leading-none">
                <span className="text-[#EA2227] drop-shadow-[0_0_12px_rgba(234,34,39,0.4)]">SAFETY</span>{' '}
                <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]">LINE</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-300 uppercase mt-1 flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA2227] animate-pulse" />
                <span>Gearwear • {currentWindow.shortTitle}</span>
              </span>
            </div>
          </Link>

          {/* Top Actions */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            <button
              onClick={() => navigate('/gearwear')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border border-slate-700 hover:border-slate-500 shadow-sm"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5" />
              <span>All Gearwear</span>
            </button>
            <button
              onClick={() => {
                setInquiryProductTitle(isCarRacing ? 'Car Racing Gloves Series' : `${currentWindow.title} Line`);
                setIsInquiryModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4.5 py-2 rounded-xl bg-gradient-to-r from-[#EA2227] to-[#C91A1E] hover:from-[#f52d32] hover:to-[#EA2227] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#EA2227]/30 hover:shadow-[#EA2227]/50 active:scale-95"
            >
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Wholesale Inquiry</span>
            </button>
          </div>

        </div>

        {/* Quick Category Bar */}
        <div className="bg-[#05090F] border-t border-slate-800/80 px-4 sm:px-8 py-2 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
              Gearwear Windows:
            </span>
            {GEARWEAR_WINDOWS.map((win) => {
              const isActive = win.slug === currentWindow.slug;
              return (
                <button
                  key={win.id}
                  onClick={() => navigate(win.routePath)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#EA2227] text-white font-bold shadow-sm shadow-[#EA2227]/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
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
          FULL HEADER BANNER (EXPANDED HIGH-IMPACT VISUAL SHOWCASE WITH AUTOMATED SLIDING ANIMATION & NO TEXT)
          ========================================================================= */}
      {isCarRacing ? (
        <section className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] xl:h-[680px] bg-gradient-to-b from-[#04070D] via-[#08101A] to-[#0C1523] border-b border-slate-800 overflow-hidden flex items-center justify-center select-none">
          
          {/* Subtle Dynamic Racetrack & Circuit Light Ambience */}
          <div className="absolute inset-0 bg-[radial-gradient(#EA2227_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
          
          {/* Giant Atmospheric Safety Line Watermark Crest in Header Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] lg:w-[540px] aspect-square opacity-[0.045] pointer-events-none flex items-center justify-center">
            <img
              src={brandLogo}
              alt=""
              className="w-full h-full object-contain filter invert contrast-200"
            />
          </div>

          {/* Deep Colored Atmospheric Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#EA2227]/15 blur-[150px] pointer-events-none" />
          <div className="absolute top-10 right-12 w-96 h-96 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-10 left-12 w-96 h-96 rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />

          {/* Illuminated Center Racetrack Pedestal with Glowing Ground Rings */}
          <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-[85%] max-w-4xl h-24 bg-gradient-to-r from-transparent via-[#EA2227]/25 to-transparent rounded-[100%] blur-2xl pointer-events-none" />
          <div className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 w-[60%] max-w-2xl h-10 bg-cyan-500/15 rounded-[100%] blur-xl pointer-events-none" />
          <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 w-[70%] max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-[50%] max-w-xl h-[1.5px] bg-gradient-to-r from-transparent via-[#EA2227]/80 to-transparent pointer-events-none shadow-[0_0_10px_#EA2227]" />

          {/* Full Header Carousel Stage: Displays the Glove Slide Animation in Auto */}
          <div className="relative w-full max-w-7xl h-full flex items-center justify-center px-4 sm:px-12">
            
            {/* Left Background Adjacent Glove (Visual Depth Preview - No Text) */}
            <div 
              onClick={goToPrevSlide}
              className="hidden md:flex absolute left-4 lg:left-12 xl:left-16 z-10 w-56 sm:w-64 lg:w-80 aspect-square items-center justify-center opacity-30 hover:opacity-60 transition-all duration-300 cursor-pointer transform -translate-x-8 sm:-translate-x-12 scale-85 hover:scale-90"
              title="Previous Model"
            >
              <img
                src={prevGlove.slideImage}
                alt=""
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* Center Active Glove: Animated Floating & Sliding Presentation (Much Bigger & Ultra Clear) */}
            <div className="relative z-20 w-full max-w-[460px] sm:max-w-[560px] lg:max-w-[640px] xl:max-w-[700px] aspect-square flex items-center justify-center">
              
              {/* Backlight Halo behind active glove */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.75, 0.4]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-2 sm:inset-6 rounded-full bg-gradient-to-tr from-[#EA2227]/35 via-slate-500/20 to-cyan-400/30 blur-3xl pointer-events-none"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={`hero-glove-${activeSlideIdx}`}
                  initial={{ 
                    opacity: 0, 
                    x: slideDirection === 'next' ? 80 : -80,
                    scale: 0.9 
                  }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    scale: 1,
                    y: [0, -14, 0]
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: slideDirection === 'next' ? -80 : 80,
                    scale: 0.9 
                  }}
                  transition={{
                    opacity: { duration: 0.4 },
                    x: { duration: 0.45 },
                    scale: { duration: 0.45 },
                    y: {
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  onClick={() => setInspectGlove(activeGlove)}
                  className="relative z-10 w-full h-full flex items-center justify-center p-0 cursor-pointer"
                >
                  <img
                    src={activeGlove.slideImage}
                    alt=""
                    className="w-full h-full object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)] drop-shadow-[0_0_40px_rgba(234,34,39,0.3)] transition-transform duration-500 hover:scale-[1.04]"
                  />
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Right Background Adjacent Glove (Visual Depth Preview - No Text) */}
            <div 
              onClick={goToNextSlide}
              className="hidden md:flex absolute right-4 lg:right-12 xl:right-16 z-10 w-56 sm:w-64 lg:w-80 aspect-square items-center justify-center opacity-30 hover:opacity-60 transition-all duration-300 cursor-pointer transform translate-x-8 sm:translate-x-12 scale-85 hover:scale-90"
              title="Next Model"
            >
              <img
                src={nextGlove.slideImage}
                alt=""
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* Left Chevron Navigation Arrow (Glassmorphism & Neon Red Glow) */}
            <button
              onClick={goToPrevSlide}
              className="absolute left-3 sm:left-8 lg:left-12 z-30 p-3 sm:p-3.5 rounded-2xl bg-slate-900/80 hover:bg-[#EA2227] text-white/80 hover:text-white transition-all duration-300 backdrop-blur-md border border-white/15 hover:border-[#EA2227] shadow-xl hover:shadow-[0_0_20px_rgba(234,34,39,0.5)] active:scale-90 cursor-pointer"
              title="Previous Glove"
            >
              <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Chevron Navigation Arrow (Glassmorphism & Neon Red Glow) */}
            <button
              onClick={goToNextSlide}
              className="absolute right-3 sm:right-8 lg:right-12 z-30 p-3 sm:p-3.5 rounded-2xl bg-slate-900/80 hover:bg-[#EA2227] text-white/80 hover:text-white transition-all duration-300 backdrop-blur-md border border-white/15 hover:border-[#EA2227] shadow-xl hover:shadow-[0_0_20px_rgba(234,34,39,0.5)] active:scale-90 cursor-pointer"
              title="Next Glove"
            >
              <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Carousel Slide Indicators at Bottom (Sleek Telemetry Indicators - No Text) */}
            <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 sm:space-x-3 bg-slate-950/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
              {CAR_RACING_GLOVE_MODELS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSlideDirection(idx > activeSlideIdx ? 'next' : 'prev');
                    setActiveSlideIdx(idx);
                  }}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeSlideIdx === idx 
                      ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-[#EA2227] shadow-[0_0_12px_#EA2227]' 
                      : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </section>
      ) : (
        /* Standard Header Banner for other non-car categories */
        <section className="bg-gradient-to-b from-[#0B151E] to-[#080D14] text-white py-10 sm:py-12 border-b border-slate-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
            
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/gearwear" className="hover:text-white transition-colors">Gearwear</Link>
              <span>/</span>
              <span className="text-slate-300">{currentWindow.groupLabel}</span>
              <span>/</span>
              <span className="text-white font-bold">{currentWindow.title}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono font-semibold uppercase tracking-wider">
                  <span>{currentWindow.badge}</span>
                  <span>•</span>
                  <span>{currentWindow.codePrefix} Series</span>
                </div>

                <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                  {currentWindow.title}
                </h1>

                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                  {currentWindow.minorDetail}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setInquiryProductTitle(`${currentWindow.title} Line`);
                      setIsInquiryModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EA2227] hover:bg-[#d0171c] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-md shadow-[#EA2227]/30 active:scale-95 transition-all cursor-pointer border border-[#FF5A36]/40"
                  >
                    <SparklesIcon className="w-3.5 h-3.5" />
                    <span>Request OEM Spec Pack</span>
                  </button>
                </div>
              </div>

              <div className="shrink-0 w-36 sm:w-48 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-slate-700 shadow-xl bg-slate-900">
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
          PRODUCT CATALOGUE & FILTERS PORTION (CLEAN, SUITABLE MODERN E-COMMERCE DESIGN)
          ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-8">
        
        {/* Breadcrumb Trail */}
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/gearwear" className="hover:text-slate-900 transition-colors">Gearwear</Link>
          <span>/</span>
          {isCarRacing ? (
            <>
              <span className="text-[#EA2227] font-semibold">Motorsport Handwear</span>
              <span>/</span>
              <span className="text-slate-900 font-bold">Car Racing Gloves</span>
            </>
          ) : (
            <span className="text-slate-900 font-bold">{currentWindow.title}</span>
          )}
        </div>

        {/* Filter, View Switcher & Search Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Item count & active label */}
          <div className="flex items-center space-x-3">
            <span className="font-display font-black text-lg text-slate-900">
              {isCarRacing ? 'Official Safety Line Racing Gloves' : 'Products'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#EA2227]/10 text-[#EA2227] border border-[#EA2227]/20">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Model' : 'Models'}
            </span>
          </div>

          {/* Search, Size Filters & View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* View Mode Switcher (Grid vs List) */}
            <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Grid View"
              >
                <LayoutGridIcon className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Detailed List View"
              >
                <ListIcon className="w-3.5 h-3.5" />
                <span>Detailed List</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-grow sm:w-64">
              <SearchIcon className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${currentWindow.shortTitle}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl py-1.5 pl-8 pr-3 text-xs bg-slate-50 border border-slate-200 focus:border-[#EA2227] focus:bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <XIcon className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Size Filter Dropdown */}
            {availableSizes.length > 1 && (
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600">
                <span className="hidden lg:inline text-slate-400">Size:</span>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="rounded-xl py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 focus:border-[#EA2227] text-slate-800 outline-none cursor-pointer"
                >
                  {availableSizes.map(s => (
                    <option key={s} value={s}>{s === 'All' ? 'All Sizes' : `Size ${s}`}</option>
                  ))}
                </select>
              </div>
            )}

          </div>

        </div>

        {/* =====================================================================
            VIEW MODE 1: GRID VIEW (CLEAN, MODERN E-COMMERCE CARDS)
            ===================================================================== */}
        {viewMode === 'grid' && (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => {
                const isCarProduct = product.productCode?.startsWith('GW-CR');
                const matchingSpec = CAR_RACING_GLOVE_MODELS.find(m => m.code === product.productCode);

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className="group bg-white rounded-2xl border border-slate-200 hover:border-[#EA2227]/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Product Image Frame */}
                      <div 
                        className="aspect-[4/3] bg-gradient-to-b from-slate-50 to-slate-100/60 relative overflow-hidden flex items-center justify-center p-4 border-b border-slate-100 cursor-pointer"
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
                          className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-out group-hover:scale-108"
                        />

                        {/* Product Code Badge */}
                        <div className="absolute top-3 left-3 bg-[#EA2227] text-white px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase shadow-sm">
                          {product.productCode}
                        </div>

                        {/* Homologation / Safety Badge */}
                        {isCarProduct && (
                          <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-xs text-white border border-slate-700 px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase">
                            FIA 8856
                          </div>
                        )}

                        {/* Quick View Button on Hover */}
                        <div className="absolute bottom-3 right-3 bg-slate-900/85 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                          <EyeIcon className="w-3 h-3 text-[#EA2227]" />
                          <span>Quick View</span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#EA2227] font-bold">
                            {product.material ? product.material.split(',')[0] : currentWindow.title}
                          </span>
                          {product.sizes && product.sizes.length > 0 && (
                            <span className="text-[10px] font-mono text-slate-400">
                              {product.sizes.length} Sizes Available
                            </span>
                          )}
                        </div>

                        <h3 
                          onClick={() => {
                            if (matchingSpec) setInspectGlove(matchingSpec);
                            else navigate(`/product/${product.slug}`);
                          }}
                          className="font-display font-bold text-base text-slate-900 group-hover:text-[#EA2227] transition-colors leading-snug cursor-pointer line-clamp-1"
                          title={product.name}
                        >
                          {product.name}
                        </h3>

                        <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-2">
                          {product.shortDescription}
                        </p>

                        {/* Features Snippet */}
                        {product.features && product.features.length > 0 && (
                          <div className="pt-2 border-t border-slate-100 space-y-1">
                            {product.features.slice(0, 2).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-1.5 text-xs text-slate-600">
                                <CheckCircle2Icon className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-tight truncate">{feat}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Action Footer */}
                    <div className="p-5 pt-0 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            if (matchingSpec) setInspectGlove(matchingSpec);
                            else navigate(`/product/${product.slug}`);
                          }}
                          className="py-2 px-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
                        >
                          <EyeIcon className="w-3.5 h-3.5 text-slate-600" />
                          <span>Specs</span>
                        </button>

                        <button
                          onClick={() => {
                            setInquiryProductTitle(`${product.productCode} - ${product.name}`);
                            setIsInquiryModalOpen(true);
                          }}
                          className="py-2 px-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1 bg-[#EA2227] hover:bg-[#d0171c] text-white shadow-xs transition-colors cursor-pointer"
                        >
                          <SparklesIcon className="w-3.5 h-3.5" />
                          <span>Quote</span>
                        </button>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* =====================================================================
            VIEW MODE 2: DETAILED LIST VIEW (EXHAUSTIVE MOTORSPORT SPECIFICATION)
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
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-[#EA2227]/80 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-6">
                      
                      {/* Left: Product Image */}
                      <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
                        <div 
                          className="aspect-[4/3] rounded-xl bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden flex items-center justify-center p-3 border border-slate-100 cursor-pointer group"
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
                            className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-out group-hover:scale-108"
                          />

                          {/* Code Badge */}
                          <div className="absolute top-2.5 left-2.5 bg-[#EA2227] text-white px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase shadow-sm">
                            {product.productCode}
                          </div>

                          {isCarProduct && (
                            <div className="absolute top-2.5 right-2.5 bg-slate-900/90 text-white border border-slate-700 px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase">
                              FIA 8856-2018
                            </div>
                          )}
                        </div>

                        {/* Livery info */}
                        {product.colors && product.colors.length > 0 && (
                          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                            <span className="font-semibold text-slate-700">Livery:</span>
                            <div className="flex flex-wrap gap-1">
                              {product.colors.map(c => (
                                <span 
                                  key={c} 
                                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Middle: Title, Description, Technical highlights */}
                      <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#EA2227] font-bold block">
                            {product.material ? product.material.split(',')[0] : currentWindow.title}
                          </span>

                          <h3 
                            onClick={() => {
                              if (matchingSpec) setInspectGlove(matchingSpec);
                              else navigate(`/product/${product.slug}`);
                            }}
                            className="font-display font-bold text-lg sm:text-xl text-slate-900 hover:text-[#EA2227] transition-colors leading-snug cursor-pointer"
                          >
                            {product.name}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            {product.shortDescription}
                          </p>

                          {/* Technical Highlights Grid */}
                          <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                              <span className="text-[10px] font-mono text-slate-400 uppercase block">Material Core</span>
                              <span className="font-semibold text-[11px] text-slate-900 truncate block" title={product.material}>
                                {product.material || 'Nomex® Aramid Matrix'}
                              </span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                              <span className="text-[10px] font-mono text-slate-400 uppercase block">Homologation</span>
                              <span className="font-semibold text-[#EA2227] text-[11px] truncate block">
                                {isCarProduct ? 'FIA 8856-2018 / SFI 3.3/5' : 'EN ISO Safety Standard'}
                              </span>
                            </div>
                          </div>

                          {/* Available sizes */}
                          {product.sizes && product.sizes.length > 0 && (
                            <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] font-mono text-slate-400 uppercase">Available Sizes:</span>
                              {product.sizes.map(s => (
                                <span 
                                  key={s} 
                                  className="w-6 h-6 rounded border border-slate-200 bg-slate-50 text-slate-800 font-mono text-[10px] font-bold flex items-center justify-center"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Key Features */}
                        {product.features && product.features.length > 0 && (
                          <div className="pt-2 border-t border-slate-100 space-y-1">
                            {product.features.slice(0, 3).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-1.5 text-xs text-slate-600">
                                <CheckCircle2Icon className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-tight">{feat}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Actions, OEM Request */}
                      <div className="lg:col-span-3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 space-y-3">
                        
                        <div className="rounded-xl p-3 bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-700 block">
                            OEM Manufacturing
                          </span>
                          <ul className="text-[11px] text-slate-600 space-y-1">
                            <li>• Custom Racing Team Liveries</li>
                            <li>• Direct Nomex® Embroidery</li>
                            <li>• Export-Grade Packaging</li>
                          </ul>
                        </div>

                        <div className="space-y-2 pt-2">
                          <button
                            onClick={() => {
                              setInquiryProductTitle(`${product.productCode} - ${product.name}`);
                              setIsInquiryModalOpen(true);
                            }}
                            className="w-full py-2.5 px-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-all bg-[#EA2227] hover:bg-[#d0171c] text-white shadow-xs cursor-pointer"
                          >
                            <SparklesIcon className="w-3.5 h-3.5" />
                            <span>Request OEM Quote</span>
                          </button>

                          <button
                            onClick={() => {
                              if (matchingSpec) setInspectGlove(matchingSpec);
                              else navigate(`/product/${product.slug}`);
                            }}
                            className="w-full py-2 px-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-all bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
                          >
                            <EyeIcon className="w-3.5 h-3.5" />
                            <span>Full Data Sheet</span>
                          </button>
                        </div>

                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Empty state if search yields no results */}
        {filteredProducts.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-3 shadow-sm">
            <FilterIcon className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-display font-bold text-base text-slate-900">
              No products found matching your filter
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
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

        {/* Other Gearwear Categories Switcher */}
        <section className="pt-12 border-t border-slate-200/90 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-slate-900">
              Explore Other Gearwear Collections
            </h3>
            <Link
              to="/gearwear"
              className="text-xs font-mono font-bold text-[#EA2227] hover:underline uppercase inline-flex items-center gap-1"
            >
              <span>View All Categories</span>
              <ChevronRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherWindows.map((win) => (
              <div
                key={win.id}
                onClick={() => navigate(win.routePath)}
                className="group cursor-pointer p-4 rounded-xl border border-slate-200 bg-white hover:border-[#EA2227] transition-all hover:shadow-md flex items-center space-x-3.5"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={win.image}
                    alt={win.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#EA2227] transition-colors truncate">
                    {win.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate font-normal">
                    {win.minorDetail}
                  </p>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-slate-400 group-hover:text-[#EA2227] group-hover:translate-x-0.5 transition-all shrink-0" />
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl relative text-slate-900"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-[#0B151E] text-white p-5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded bg-[#EA2227] text-white text-[10px] font-mono font-bold">
                    {inspectGlove.code}
                  </span>
                  <span className="text-xs font-mono text-slate-300">Motorsport Specification Sheet</span>
                </div>
                <button
                  onClick={() => setInspectGlove(null)}
                  className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  <div className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center p-4 border border-slate-200">
                    <img
                      src={inspectGlove.image}
                      alt={inspectGlove.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)]"
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-[#EA2227] uppercase">
                      Livery: {inspectGlove.livery}
                    </span>
                    <h4 className="font-display font-black text-xl text-slate-900 leading-tight">
                      {inspectGlove.name}
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {inspectGlove.summary}
                    </p>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
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
                        <span className="text-slate-500">Primary Discipline:</span>
                        <span className="font-semibold text-slate-800">{inspectGlove.targetDiscipline}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-200">
                  <button
                    onClick={() => {
                      setInquiryProductTitle(`${inspectGlove.code} - ${inspectGlove.name}`);
                      setInspectGlove(null);
                      setIsInquiryModalOpen(true);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 bg-[#EA2227] hover:bg-[#d0171c] text-white shadow-md shadow-[#EA2227]/25 cursor-pointer"
                  >
                    <SparklesIcon className="w-4 h-4" />
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
};

export default GearwearWindowPage;
