import { useState, useMemo } from 'react';
import {
  ArrowRight, Star, FileCheck2, ArrowUpRight, ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { navigate } from '../lib/router';
import { Product, Settings } from '../types';
import { certifications, testimonials } from '../data';
import SEO from './SEO';
import ListingModal from './ListingModal';
import SmoothImage from './SmoothImage';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import InquiryLoadingModal from './InquiryLoadingModal';
import gearwearHeroBg from '../assets/images/blank_tactical_glove_1792247540904.jpg';
import hosieryHeroImg from '../assets/images/blank_tech_jacket_1792247565413.jpg';
import GearwearWindowsSection from './GearwearWindowsSection';
import AccessoriesWindowsSection from './AccessoriesWindowsSection';
import { RotatingText } from './TransitionText';

interface CategoryHubProps {
  categorySlug: 'gearwear' | 'accessories' | 'hosiery';
  products: Product[];
  settings: Settings;
  onUpdateProduct?: (product: Product) => void;
  onAddProduct?: (product: Product) => void;
  onDeleteProduct?: (productId: string) => void;
}

export default function CategoryHub({
  categorySlug,
  products,
  settings,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct
}: CategoryHubProps) {
  const isGearwear = categorySlug === 'gearwear';

  // Listing & Inquiry modal states
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [productToEdit] = useState<Product | null>(null);
  const [selectedWindowForModal] = useState<string>('tactical-gloves');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const handleSaveListing = (savedProd: Product) => {
    if (productToEdit) {
      if (onUpdateProduct) onUpdateProduct(savedProd);
    } else {
      if (onAddProduct) onAddProduct(savedProd);
    }
  };

  // Filter products by category
  const categoryProducts = useMemo(() => {
    return products.filter(p => {
      const isMatch = isGearwear
        ? p.categoryId === 'cat-gearwear'
        : (p.categoryId === 'cat-hosiery' || p.categoryId === 'cat-accessories');
      return isMatch && p.status === 'Active';
    });
  }, [products, isGearwear]);

  // Category-specific features
  const categoryFeatures = useMemo(() => {
    if (isGearwear) {
      return [
        {
          code: '01',
          tag: 'Dynamic Airflow',
          title: 'AeroStrand™ Zoned Weave',
          description: 'Engineered capillary-action knit matrices that maximize convective cooling while stabilizing active muscle groups during high-velocity movement.'
        },
        {
          code: '02',
          tag: 'Flatlock Tech',
          title: 'Zero-Friction Micro-Seams',
          description: 'Ultra-flat anatomical seams and reverse external stitching prevent chafing, pressure points, and skin abrasion across extended sessions.'
        },
        {
          code: '03',
          tag: 'Impact & Grip',
          title: 'Ergonomic Tendon Articulation',
          description: 'Pre-curved hand geometry with Kevlar® reinforcements, molded TPR shielding, and high-tack Cabretta palm overlays.'
        },
        {
          code: '04',
          tag: 'Certified Pure',
          title: 'OEKO-TEX Standard 100',
          description: 'All raw hides, aramid fibers, dyes, and elastic closures are laboratory tested and certified free of harmful substances.'
        }
      ];
    } else {
      return [
        {
          code: '01',
          tag: 'High-Gauge Knit',
          title: '3D Circular Loom Architecture',
          description: 'Precision knitting looms delivering consistent fabric density, zero laddering, and calibrated four-way stretch retention.'
        },
        {
          code: '02',
          tag: 'Moisture Transfer',
          title: 'Capillary Thermal Management',
          description: 'Dual-density performance knits and brushed interior fleece engineered to dump heat under exertion or insulate in cold warm-ups.'
        },
        {
          code: '03',
          tag: 'Seam Integrity',
          title: 'Reinforced Flatlock Joinery',
          description: 'High-tension bonded thread joinery engineered to endure heavy barbell complexes, trail wind, and industrial wash cycles.'
        },
        {
          code: '04',
          tag: 'Tailored Grading',
          title: 'Full Export Size Architecture',
          description: 'Consistent anatomical grading from XS through 3XL across European and North American apparel sizing specifications.'
        }
      ];
    }
  }, [isGearwear]);

  const categoryTestimonials = useMemo(() => {
    if (isGearwear) {
      return testimonials.filter(t => t.id === 't-02' || t.author.includes('Coach') || t.author.includes('Athletics'));
    } else {
      return testimonials.filter(t => t.id !== 't-02');
    }
  }, [isGearwear]);

  const navScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -84;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const pageTitle = isGearwear
    ? 'Gearwear & Tactical Handwear Catalogue | Safety Line'
    : 'Technical Accessories & Activewear Catalogue | Safety Line';
  const pageDescription = isGearwear
    ? "Explore Safety Line's motorsport, golf, cycling, industrial work, mechanics, tactical, and strength gearwear engineered in Sialkot."
    : "Explore Safety Line's engineered gymwear, technical t-shirts, weatherproof jackets, hoodies, and dual-season tracksuits.";

  return (
    <div id={`${categorySlug}-hub-page`} className="bg-[#F7F6F2] min-h-screen text-[#141918] font-sans antialiased flex flex-col">
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={isGearwear ? 'Safety Line gearwear, FIA racing gloves, golf gloves, mechanics gloves, tactical handwear' : 'Safety Line accessories, gymwear, technical jackets, athletic hoodies, tracksuits'}
      />

      {/* Unified Top Architectural Navbar */}
      <SiteHeader
        variant="obsidian"
        onOpenInquiry={() => setIsInquiryModalOpen(true)}
        ctaLabel="Wholesale Inquiry"
      />

      {/* =====================================================================
          HERO SECTION: EDITORIAL ASYMMETRICAL SPLIT
          ===================================================================== */}
      <section
        id="hero-section"
        className="bg-[#0E1A19] text-white border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono uppercase tracking-[0.16em] text-white/60">
                <span className="text-[#D92227] font-semibold">
                  {isGearwear ? 'Division 01 · Gearwear' : 'Division 02 · Accessories'}
                </span>
                <span>/</span>
                <span className="tabular-nums">{categoryProducts.length} Active Models</span>
                <span>/</span>
                <span>Sialkot Manufacturing</span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-display text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-white tracking-[-0.025em] leading-[1.06]"
              >
                {isGearwear
                  ? 'Precision Handwear & Tactical Gearwear'
                  : 'Engineered Activewear & Technical Apparel'}
              </motion.h1>

              <div className="py-3 border-y border-white/12 text-xs sm:text-sm font-mono text-white/85">
                <RotatingText
                  prefix="Focus:"
                  phrases={isGearwear ? [
                    'FIA-Grade Nomex® Car Racing & Road Cycling Gloves',
                    'Grade-AAA Cabretta Tour Golf & Marine Kevlar® Gloves',
                    'ANSI Level TPR Work & Workshop Mechanics Handwear',
                    'Direct Sialkot OEM & Private Label Manufacturing'
                  ] : [
                    'High-Gauge Compression GymWear Sets',
                    'Moisture-Wicking Micro-Mesh Technical T-Shirts',
                    'Weather-Sealed Shell Jackets & Thermal Fleece Hoodies',
                    'Dual-Season Summer & Winter Team Tracksuits'
                  ]}
                  interval={3500}
                  className="text-white"
                />
              </div>

              <p className="text-white/75 text-base leading-relaxed max-w-2xl">
                {isGearwear
                  ? 'Constructed by 90 experienced leatherworkers and stitchers using press-cut ergonomic patterns, Kevlar® reinforcement, and homologated fire-retardant materials.'
                  : 'Engineered with high-gauge circular knitting, capillary moisture-wicking matrices, and clean architectural seaming for athletic teams and global stockists.'}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => navScroll('items-section')}
                  className="px-6 py-3.5 rounded-sm bg-[#D92227] hover:bg-[#B5191D] text-white font-semibold text-xs uppercase tracking-[0.12em] inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Browse {isGearwear ? 'Production Lines' : 'Apparel Lines'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => navScroll('features-section')}
                  className="px-5 py-3.5 rounded-sm border border-white/25 hover:border-white text-white font-semibold text-xs uppercase tracking-[0.12em] inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Manufacturing Standards</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Clean Unboxed Key Metrics */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/12 max-w-xl">
                <div>
                  <span className="block font-display font-bold text-2xl text-white tabular-nums">
                    {isGearwear ? '9 Lines' : '5 Lines'}
                  </span>
                  <span className="text-[11px] font-mono text-white/55 uppercase">
                    {isGearwear ? 'Specialized Gloves' : 'Apparel Series'}
                  </span>
                </div>
                <div>
                  <span className="block font-display font-bold text-2xl text-white tabular-nums">ISO 9001</span>
                  <span className="text-[11px] font-mono text-white/55 uppercase">Quality Audited</span>
                </div>
                <div>
                  <span className="block font-display font-bold text-2xl text-white tabular-nums">OEM / ODM</span>
                  <span className="text-[11px] font-mono text-white/55 uppercase">Private Labeling</span>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Editorial Photography */}
            <div className="lg:col-span-5">
              <div className="aspect-[4/4] sm:aspect-[5/4] lg:aspect-[4/5] rounded-sm overflow-hidden border border-white/15 bg-[#122B29]">
                <SmoothImage
                  src={isGearwear ? gearwearHeroBg : hosieryHeroImg}
                  alt={isGearwear ? 'Safety Line Tactical Gearwear' : 'Safety Line Technical Apparel'}
                  priority={true}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          PRODUCTION WINDOWS DIRECTORY
          ===================================================================== */}
      <div id="items-section">
        {isGearwear ? (
          <GearwearWindowsSection products={products} />
        ) : (
          <AccessoriesWindowsSection products={products} />
        )}
      </div>

      {/* =====================================================================
          TECHNICAL STANDARDS LEDGER (HAIRLINE NUMBERED INDEX)
          ===================================================================== */}
      <section id="features-section" className="py-16 sm:py-20 bg-white border-y border-[#E2DFD7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E2DFD7] pb-6">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-[11px] font-mono uppercase font-semibold tracking-[0.16em] text-[#D92227] block">
                Engineering Standards
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#141918] tracking-tight">
                {isGearwear ? 'Built for Critical Handwear Performance' : 'Crafted for Endurance Apparel'}
              </h2>
            </div>
            <p className="text-sm text-[#525957] max-w-md">
              {isGearwear
                ? 'Every hide cut, Kevlar® liner, and seam tolerance is verified before factory dispatch.'
                : 'Every yarn cone, flatlock joint, and zipper seal undergoes tensile and shrinkage inspection.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#E2DFD7] divide-y sm:divide-y-0 sm:divide-x divide-[#E2DFD7]">
            {categoryFeatures.map((f) => (
              <div key={f.code} className="p-6 sm:p-7 space-y-3 bg-white">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-[#D92227] tabular-nums">{f.code}</span>
                  <span className="uppercase tracking-wider text-[#525957]">{f.tag}</span>
                </div>
                <h3 className="font-display font-bold text-base text-[#141918]">
                  {f.title}
                </h3>
                <p className="text-[#525957] text-xs leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>

          {/* Compliance Architectural Strip */}
          <div className="bg-[#0E1A19] text-white p-8 sm:p-10 rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-2">
              <span className="text-[#D92227] font-mono text-[11px] font-semibold uppercase tracking-[0.14em] block">
                Audited Compliance
              </span>
              <h3 className="font-display font-bold text-2xl text-white">
                International Export Benchmarks
              </h3>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {certifications.slice(0, 2).map((c, i) => (
                <div key={i} className="border-t border-white/15 pt-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-white">
                    <FileCheck2 className="w-4 h-4 text-[#D92227] shrink-0" />
                    <span className="text-xs font-mono font-semibold uppercase">{c.name}</span>
                  </div>
                  <p className="text-xs text-white/65 leading-relaxed">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ENDORSEMENTS & PARTNER FEEDBACK
          ===================================================================== */}
      <section className="py-16 sm:py-20 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase font-semibold tracking-[0.16em] text-[#D92227] block">
                Client Verification
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#141918]">
                {isGearwear ? 'Team & Distributor Reports' : 'Stockist & Apparel Partner Feedback'}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="text-xs font-mono font-semibold uppercase tracking-wider text-[#141918] hover:text-[#D92227] inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <span>Request Trade References</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryTestimonials.map((t) => (
              <blockquote key={t.id} className="bg-white p-7 sm:p-8 rounded-sm border border-[#E2DFD7] flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#D92227]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-[#141918] text-sm sm:text-base leading-relaxed font-serif italic">
                    &ldquo;{t.message}&rdquo;
                  </p>
                </div>
                <footer className="border-t border-[#ECE9E1] pt-4">
                  <cite className="not-italic block font-bold text-xs text-[#141918]">{t.author}</cite>
                  <span className="block text-[11px] text-[#525957] font-mono mt-0.5">{t.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Footer */}
      <Footer settings={settings} />

      <InquiryLoadingModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        settings={settings}
        defaultCategory={isGearwear ? 'Tactical Gloves (Golf, Fish, Police, Mechanics)' : 'Full OEM Product Line'}
      />

      <ListingModal
        isOpen={isListingModalOpen}
        onClose={() => setIsListingModalOpen(false)}
        productToEdit={productToEdit}
        defaultCategory={isGearwear ? 'gearwear' : 'accessories'}
        defaultSubcategory={selectedWindowForModal}
        onSave={handleSaveListing}
        onDelete={onDeleteProduct}
      />
    </div>
  );
}
