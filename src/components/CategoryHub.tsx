import React, { useState, useMemo } from 'react';
import { 
  Search, ShieldCheck, Cpu, ArrowRight, MessageCircle, Star, PhoneCall, 
  Mail, Sparkles, Activity, Layers, Award, FileCheck2, 
  CheckCircle2, Compass, Send, ArrowUpRight, Filter, ChevronRight, Menu, X,
  Instagram, Facebook, ExternalLink, MapPin, Image as ImageIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { navigate } from '../lib/router';
import { Product, Settings } from '../types';
import { certifications, testimonials } from '../data';
import SEO from './SEO';
import ListingModal from './ListingModal';
import brandLogo from '../assets/images/safetyline_landing.png';
import gearwearHeroImg from '../assets/images/regenerated_image_1788778657693.jpg';
import gearwearHeroBg from '../assets/images/regenerated_image_1788778660220.jpg';
import hosieryHeroImg from '../assets/images/regenerated_image_1788779200971.jpg';

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

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Listing Window Modal state
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const openNewListingModal = () => {
    setProductToEdit(null);
    setIsListingModalOpen(true);
  };

  const handleSaveListing = (savedProd: Product) => {
    if (productToEdit) {
      if (onUpdateProduct) onUpdateProduct(savedProd);
    } else {
      if (onAddProduct) onAddProduct(savedProd);
    }
  };

  // Search and filter state for product items
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubcat, setSelectedSubcat] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');

  // Contact form state
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    inquiryType: isGearwear ? 'Gearwear Wholesale & Team Kits' : 'Accessories Wholesale & Custom Orders',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Filter products by category
  const categoryProducts = useMemo(() => {
    return products.filter(p => {
      const isMatch = isGearwear 
        ? p.categoryId === 'cat-gearwear' 
        : (p.categoryId === 'cat-hosiery' || p.categoryId === 'cat-accessories');
      return isMatch && p.status === 'Active';
    });
  }, [products, isGearwear]);

  // Extract available subcategories and sizes
  const subcategories = useMemo(() => {
    if (isGearwear) {
      return ['All', 'Tops & Compression', 'Bottoms & Shorts', 'Weather Shells'];
    } else {
      return ['All', 'Activewear & Sets', 'Jackets & Outerwear', 'Tanks & Tops', 'Fine Knits & Legwear'];
    }
  }, [isGearwear]);

  const allSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    categoryProducts.forEach(p => {
      p.sizes?.forEach(s => sizeSet.add(s));
    });
    return ['All', ...Array.from(sizeSet)];
  }, [categoryProducts]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(p => {
      // Query filter
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = q === '' || 
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.productCode.toLowerCase().includes(q);

      // Subcategory heuristic
      let matchSubcat = true;
      if (selectedSubcat !== 'All') {
        const nameDesc = (p.name + ' ' + p.shortDescription + ' ' + p.material).toLowerCase();
        if (isGearwear) {
          if (selectedSubcat === 'Tops & Compression') matchSubcat = nameDesc.includes('tee') || nameDesc.includes('top') || nameDesc.includes('aero');
          if (selectedSubcat === 'Bottoms & Shorts') matchSubcat = nameDesc.includes('short') || nameDesc.includes('legging') || nameDesc.includes('pant');
          if (selectedSubcat === 'Weather Shells') matchSubcat = nameDesc.includes('shell') || nameDesc.includes('jacket') || nameDesc.includes('weather');
        } else {
          if (selectedSubcat === 'Activewear & Sets') matchSubcat = nameDesc.includes('set') || nameDesc.includes('bra') || nameDesc.includes('tights') || nameDesc.includes('legging') || nameDesc.includes('aeroflex');
          if (selectedSubcat === 'Jackets & Outerwear') matchSubcat = nameDesc.includes('jacket') || nameDesc.includes('puffer') || nameDesc.includes('parka') || nameDesc.includes('storm') || nameDesc.includes('shell');
          if (selectedSubcat === 'Tanks & Tops') matchSubcat = nameDesc.includes('tank') || nameDesc.includes('stringer') || nameDesc.includes('crew') || nameDesc.includes('pullover') || nameDesc.includes('top');
          if (selectedSubcat === 'Fine Knits & Legwear') matchSubcat = nameDesc.includes('sock') || nameDesc.includes('silk') || nameDesc.includes('stocking') || nameDesc.includes('cashmere') || nameDesc.includes('tights');
        }
      }

      // Size filter (only applies to accessories)
      const matchSize = isGearwear || selectedSize === 'All' || (p.sizes && p.sizes.includes(selectedSize));

      return matchQuery && matchSubcat && matchSize;
    });
  }, [categoryProducts, searchQuery, selectedSubcat, selectedSize, isGearwear]);

  // Category-specific features
  const categoryFeatures = useMemo(() => {
    if (isGearwear) {
      return [
        {
          icon: <Cpu className="w-6 h-6 text-[#FF5A36]" />,
          title: 'AeroStrand™ Zoned Weave',
          tag: 'Dynamic Airflow',
          description: 'Engineered capillary-action knit matrices that maximize convective cooling while stabilizing active muscle groups during high-velocity movement.'
        },
        {
          icon: <ShieldCheck className="w-6 h-6 text-[#FF5A36]" />,
          title: 'Zero-Friction Micro-Seams',
          tag: 'Flatlock Tech',
          description: 'Ultra-flat anatomical seams and circular knit tubular geometries prevent chafing, pressure marks, and skin abrasion over marathon distances.'
        },
        {
          icon: <Activity className="w-6 h-6 text-[#FF5A36]" />,
          title: 'Vascular Muscle Stabilization',
          tag: 'Targeted Elasticity',
          description: 'Multi-directional memory recoil dampens muscle micro-oscillations, reducing lactic accumulation and accelerating recovery windows.'
        },
        {
          icon: <Layers className="w-6 h-6 text-[#FF5A36]" />,
          title: 'OEKO-TEX Standard 100',
          tag: 'Certified Pure',
          description: 'All raw polymers, dyes, and elastic anchor trims are laboratory tested and certified 100% free of harmful allergens and toxic substances.'
        }
      ];
    } else {
      return [
        {
          icon: <Layers className="w-6 h-6 text-[#FF5A36]" />,
          title: '400-Needle Italian Looms',
          tag: 'High-Gauge Knit',
          description: 'Operating high-cylinder Italian circular knitting looms that deliver flawless denier uniformity, zero laddering, and a second-skin feel.'
        },
        {
          icon: <Award className="w-6 h-6 text-[#FF5A36]" />,
          title: 'Grade-6A Mulberry Silk',
          tag: 'Organic Fiber',
          description: 'Spun from long-fiber organic mulberry silk offering a pearlescent natural sheen, breathability, and weightless thermal comfort.'
        },
        {
          icon: <Activity className="w-6 h-6 text-[#FF5A36]" />,
          title: 'Graduated Hemodynamic Rating',
          tag: '15-25 mmHg Support',
          description: 'Calibrated millimeter-mercury pressure gradient from ankle to calf to enhance venous return for active individuals and travel.'
        },
        {
          icon: <ShieldCheck className="w-6 h-6 text-[#FF5A36]" />,
          title: 'Hand-Linked Seamless Toes',
          tag: 'Artisan Precision',
          description: 'Every toe closure and waistband anchor is linked under high-power optical magnification to guarantee zero pressure points.'
        }
      ];
    }
  }, [isGearwear]);

  // Testimonials filtered or customized
  const categoryTestimonials = useMemo(() => {
    if (isGearwear) {
      return testimonials.filter(t => t.id === 't-02' || t.author.includes('Coach') || t.author.includes('Athletics'));
    } else {
      return testimonials.filter(t => t.id !== 't-02');
    }
  }, [isGearwear]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        inquiryType: isGearwear ? 'Gearwear Wholesale & Team Kits' : 'Accessories Wholesale & Custom Orders',
        message: ''
      });
    }, 1000);
  };

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Safety Line Concierge, I am inquiring regarding the ${isGearwear ? 'Gearwear Athletic Collection' : 'Technical Accessories Collection'}. Please share wholesale catalogue specifications and swatch availability.`
  )}`;

  const navScroll = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const pageTitle = isGearwear 
    ? "Gearwear Athletic Performance Showcase | Safety Line"
    : "Technical Accessories & Performance Legwear Showcase | Safety Line";
  const pageDescription = isGearwear
    ? "Explore Safety Line's high-compression athletic gearwear, seamless 3D knit tops, and weather stormshells engineered for professional athletes."
    : "Explore Safety Line's engineered technical accessories, graduated compression socks, protective sleeves, and high-performance essentials.";

  return (
    <div id={`${categorySlug}-hub-page`} className="bg-[#FAFCFB] min-h-screen text-[#1A1A1A] font-sans antialiased">
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords={isGearwear ? "Safety Line gearwear, compression wear, athletic activewear, 3D seamless sportswear" : "Safety Line accessories, compression socks, technical sleeves, athletic accessories, cashmere socks"}
      />

      {/* =========================================================================
          STICKY TOP NAVBAR (Category-Specific, Strict Separation)
         ========================================================================= */}
      <nav 
        id={`${categorySlug}-navbar`}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0B3D3B] text-white py-3.5 px-4 sm:px-8 border-b border-white/10 shadow-lg shadow-[#0B3D3B]/20"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Category Identification Badge */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src={brandLogo}
              alt="Safety Line Logo"
              className="h-9 w-auto object-contain filter drop-shadow-sm transition-transform group-hover:scale-105"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-sm uppercase tracking-wider block leading-none">
                  <span className="text-[#EA2227]">SAFETY</span> <span className="text-white">LINE</span>
                </span>
                <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-white/15 text-white tracking-wider">
                  {isGearwear ? 'GEARWEAR' : 'ACCESSORIES'}
                </span>
              </div>
              <span className="block text-[9px] text-[#D9F0EC]/80 font-mono tracking-[0.16em] uppercase font-semibold mt-1">
                {isGearwear ? 'Athletic Performance Division' : 'Technical Accessories Division'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Strictly for this category) */}
          <div className="hidden lg:flex items-center space-x-5 xl:space-x-7 text-xs font-semibold uppercase tracking-wider">
            <button 
              onClick={() => navScroll('items-section')}
              className="text-white/80 hover:text-white transition-colors cursor-pointer py-1"
            >
              Collection ({categoryProducts.length})
            </button>
            <button 
              onClick={() => navScroll('features-section')}
              className="text-white/80 hover:text-white transition-colors cursor-pointer py-1"
            >
              Standards
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="text-[#D9F0EC] hover:text-white transition-colors cursor-pointer py-1 font-bold"
            >
              About Us & Profile
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="text-white/80 hover:text-[#FF5A36] transition-colors cursor-pointer py-1 font-bold"
            >
              Contact Us
            </button>
          </div>

          {/* Right Action: Return to Main Portal button & Inquiry CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => navigate('/')}
              className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-1.5"
              title="Return to Division Selector"
            >
              <span>← Portal</span>
            </button>

            <button
              onClick={() => navScroll('contact-section')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer inline-flex items-center gap-1.5 ${
                isGearwear 
                  ? 'bg-[#FF5A36] hover:bg-[#e44e2b] text-white shadow-[#FF5A36]/30' 
                  : 'bg-[#D9F0EC] hover:bg-white text-[#0B3D3B]'
              }`}
            >
              <span>Inquire</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => navigate('/')}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 text-white text-[10px] font-mono uppercase tracking-wider"
            >
              Portal
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/10 space-y-2 text-xs font-semibold uppercase tracking-wider animate-in slide-in-from-top">
            <button 
              onClick={() => navScroll('items-section')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-white/10 text-white"
            >
              Collection ({categoryProducts.length} Items)
            </button>
            <button 
              onClick={() => navScroll('features-section')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-white/10 text-white"
            >
              Standards & Tech
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-white/10 text-[#D9F0EC] font-bold"
            >
              About Us & Company Profile
            </button>
            <button 
              onClick={() => navScroll('contact-section')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-white/10 text-white"
            >
              Inquiry Desk
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-white/10 text-[#D9F0EC] font-bold"
            >
              About Safety Line
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="block w-full text-left py-2 px-3 rounded hover:bg-white/10 text-[#FF5A36] font-bold"
            >
              Contact Us Desk
            </button>
            <div className="pt-2 border-t border-white/10 flex gap-2">
              <button
                onClick={() => navigate('/')}
                className="w-1/2 py-2.5 text-center bg-white/10 text-white rounded-lg text-xs font-mono uppercase"
              >
                ← Main Portal
              </button>
              <button
                onClick={() => navScroll('contact-section')}
                className={`w-1/2 py-2.5 text-center rounded-lg text-xs font-bold uppercase ${
                  isGearwear ? 'bg-[#FF5A36] text-white' : 'bg-[#D9F0EC] text-[#0B3D3B]'
                }`}
              >
                Inquire Desk
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* =========================================================================
          HERO SECTION (Category Specific)
         ========================================================================= */}
      <section 
        id="hero-section"
        className="relative pt-32 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-[#0B3D3B] text-white overflow-hidden"
      >
        <div className="absolute inset-0 athletic-grid-pattern-dark opacity-35 pointer-events-none" />
        <div className={`absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
          isGearwear ? 'bg-[#FF5A36]/15' : 'bg-[#D9F0EC]/15'
        }`} />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#D9F0EC]/15 text-[#D9F0EC] text-xs font-mono font-bold tracking-wider uppercase border border-[#D9F0EC]/20"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGearwear ? 'text-[#FF5A36]' : 'text-[#D9F0EC]'}`} />
              <span>{isGearwear ? 'Division: Athletic Gearwear' : 'Division: Technical Accessories'}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]"
            >
              {isGearwear ? (
                <>High-Performance <span className="text-[#FF5A36]">Gearwear</span> & Active Knits</>
              ) : (
                <>Precision Engineered <span className="text-[#D9F0EC]">Technical Accessories</span> & Performance Wear</>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 font-normal text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              {isGearwear 
                ? "Engineered with 3D seamless circular looms, graduated vascular compression, and moisture-wicking capillary matrices for elite endurance athletes and trainers."
                : "Spun from Grade-6A raw Mulberry Silk, combed Egyptian cotton, and calibrated 15-25 mmHg elastomeric cores on high-cylinder Italian circular machines."
              }
            </motion.p>

            {/* Quick Action CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => navScroll('items-section')}
                className={`px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center space-x-2 transition-all shadow-lg cursor-pointer ${
                  isGearwear 
                    ? 'bg-[#FF5A36] hover:bg-[#e44e2b] text-white shadow-[#FF5A36]/30' 
                    : 'bg-[#D9F0EC] hover:bg-white text-[#0B3D3B] shadow-[#D9F0EC]/20'
                }`}
              >
                <span>Browse {isGearwear ? 'Gearwear' : 'Accessories'} Items</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navScroll('contact-section')}
                className="px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
              >
                <span>Request Wholesale Pack</span>
                <ArrowUpRight className="w-4 h-4 text-[#D9F0EC]" />
              </button>
            </motion.div>

            {/* Micro Highlights Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-xl">
              <div>
                <span className="block font-display font-black text-2xl text-white">
                  {isGearwear ? '100%' : 'Grade 6A'}
                </span>
                <span className="text-[10px] font-mono text-[#D9F0EC] uppercase">
                  {isGearwear ? 'Seamless 3D Knits' : 'Organic Mulberry Silk'}
                </span>
              </div>
              <div>
                <span className="block font-display font-black text-2xl text-white">15-25</span>
                <span className="text-[10px] font-mono text-[#D9F0EC] uppercase">mmHg Graduated</span>
              </div>
              <div>
                <span className="block font-display font-black text-2xl text-white">ISO 9001</span>
                <span className="text-[10px] font-mono text-[#D9F0EC] uppercase">Audited Facilities</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-900"
            >
              <img
                src={isGearwear 
                  ? gearwearHeroBg
                  : hosieryHeroImg
                }
                alt={isGearwear ? "Athletic Gearwear" : "Technical Accessories Collection"}
                className="w-full h-full object-cover transition-opacity duration-300"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ITEMS / PRODUCTS CATALOGUE SECTION
         ========================================================================= */}
      <section id="items-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold tracking-wider uppercase">
            <span>Catalogue Archive</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B3D3B] tracking-tight">
            {isGearwear ? 'Gearwear Performance Items' : 'Technical Accessories & Performance Collection'}
          </h2>
          <p className="text-slate-600 font-normal text-sm sm:text-base leading-relaxed">
            {isGearwear 
              ? "Explore engineered compression tees, hydrophobic shells, and athletic training shorts with full technical specifications."
              : "Discover pure silk lace stockings, cashmere lounge socks, graduated compression wear, and technical textile accessories."
            }
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search input */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${isGearwear ? 'gearwear' : 'accessories'} items, materials, codes...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#1A1A1A] placeholder:text-slate-400 outline-none transition-colors"
              />
            </div>

            {/* Size Dropdown filter (only for accessories, hidden for gearwear) */}
            {!isGearwear && (
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-slate-500 uppercase font-semibold">Size:</span>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="bg-[#FAFCFB] border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-[#0B3D3B] outline-none cursor-pointer"
                >
                  {allSizes.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

          </div>

          {/* Subcategory Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold mr-1">Filter:</span>
            {subcategories.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubcat(sub)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  selectedSubcat === sub
                    ? 'bg-[#0B3D3B] text-white shadow-xs'
                    : 'bg-[#FAFCFB] text-slate-600 hover:bg-slate-100 hover:text-[#0B3D3B] border border-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate(`/product/${p.slug}`)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#FF5A36] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Full Shape Product Image Container */}
                  <div className="aspect-square bg-[#F8FAFB] relative overflow-hidden flex items-center justify-center p-3.5 border-b border-slate-100">
                    <img
                      src={p.coverImage}
                      alt={p.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B3D3B] text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase shadow-xs">
                      {p.productCode}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF5A36] font-bold block">
                      {p.material ? p.material.split(',')[0] : 'Custom Material'}
                    </span>

                    <h3 className="font-display font-bold text-base text-[#0B3D3B] group-hover:text-[#FF5A36] transition-colors leading-snug line-clamp-1">
                      {p.name}
                    </h3>

                    <p className="text-slate-600 text-xs font-normal leading-relaxed line-clamp-2">
                      {p.shortDescription}
                    </p>

                    {/* Features checklist snippet */}
                    {p.features && p.features.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 space-y-1">
                        <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{p.features[0]}</span>
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
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3">
            <Filter className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-display text-base font-bold text-[#0B3D3B]">No {isGearwear ? 'Gearwear' : 'Accessories'} items match your filter</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">Try resetting your search query or selecting "All" subcategories.</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => { setSearchQuery(''); setSelectedSubcat('All'); setSelectedSize('All'); }}
                className="bg-[#0B3D3B] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs hover:bg-[#072725] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

      </section>

      {/* =========================================================================
          TECHNICAL FEATURES & QUALITY STANDARDS SECTION
         ========================================================================= */}
      <section id="features-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold uppercase tracking-wider">
            <span>Technical Pillars</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B3D3B] tracking-tight">
            {isGearwear ? 'Engineered For Athletic Supremacy' : 'Crafted For Weightless Elegance'}
          </h2>
          <p className="text-slate-600 font-normal text-sm">
            {isGearwear 
              ? "Every stitch count, elastomeric ratio, and moisture-wicking capillary channel is rigorously tested for high-velocity sports."
              : "Every yarn cone, lace border, and silicone anchor band undergoes dermatological and tensile auditing."
            }
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryFeatures.map((f, idx) => (
            <div key={idx} className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="bg-[#D9F0EC] p-3 rounded-xl inline-block">
                  {f.icon}
                </div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#FF5A36] block">
                  {f.tag}
                </span>
                <h3 className="font-display font-bold text-base text-[#0B3D3B]">
                  {f.title}
                </h3>
                <p className="text-slate-600 font-normal text-xs leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Audited Certifications Banner */}
        <div className="bg-[#0B3D3B] text-white p-8 sm:p-12 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-1 md:col-span-1">
            <span className="text-[#D9F0EC] font-mono text-xs font-bold uppercase tracking-wider block">Audited Compliance</span>
            <h3 className="font-display font-extrabold text-2xl text-white">European Quality Benchmarks</h3>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.slice(0, 2).map((c, i) => (
              <div key={i} className="bg-white/10 p-4 rounded-xl border border-white/15 space-y-1">
                <div className="flex items-center space-x-2 text-[#FF5A36]">
                  <FileCheck2 className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold uppercase text-white">{c.name}</span>
                </div>
                <p className="text-[11px] text-slate-200 font-normal">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* =========================================================================
          TESTIMONIALS SECTION
         ========================================================================= */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase font-bold text-[#FF5A36]">Industry Endorsements</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B3D3B]">
              {isGearwear ? 'What Athletic Coaches & Teams Say' : 'What Boutique Buyers & Stockists Say'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {categoryTestimonials.map((t) => (
              <div key={t.id} className="bg-[#FAFCFB] p-7 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed">
                  "{t.message}"
                </p>
                <div className="border-t border-slate-200 pt-3">
                  <span className="block font-bold text-xs text-[#0B3D3B]">{t.author}</span>
                  <span className="block text-[11px] text-slate-500 font-mono">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTACT & WHOLESALE INQUIRY SECTION (Category Specific)
         ========================================================================= */}
      <section id="contact-section" className="py-20 bg-[#0B3D3B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D9F0EC]/15 text-[#D9F0EC] text-xs font-mono font-bold uppercase tracking-wider border border-[#D9F0EC]/20">
              <PhoneCall className="w-3.5 h-3.5 text-[#FF5A36]" />
              <span>{isGearwear ? 'Gearwear Concierge' : 'Accessories Concierge'}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Request {isGearwear ? 'Gearwear' : 'Accessories'} Specifications & Sample Swatches
            </h2>
            <p className="text-slate-300 font-normal text-xs sm:text-sm leading-relaxed">
              Connect directly with our materials advisory team for bulk sample swatches, team kit configurations, or stockist allocations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Portal Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white/10 p-7 rounded-2xl border border-white/15 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <h3 className="font-display font-bold text-lg text-white">
                      Direct Advisory Channels
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#D9F0EC] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 border border-white/15">
                    {isGearwear ? 'Gearwear Advisory' : 'Accessories Advisory'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our materials laboratory and production engineers welcome performance teams, sportswear brands, and bulk retail stockists for direct consultations.
                </p>

                <div className="space-y-3 pt-1 text-xs font-mono">
                  <div className="flex items-center space-x-3 text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <Mail className="w-4 h-4 text-[#FF5A36] shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase">General Inquiry</span>
                      <a href={`mailto:${settings.contactEmail}`} className="hover:text-white font-medium transition-colors">
                        {settings.contactEmail}
                      </a>
                    </div>
                  </div>
                  {settings.salesEmail && (
                    <div className="flex items-center space-x-3 text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
                      <Mail className="w-4 h-4 text-[#D9F0EC] shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase">Sales & Wholesale Desk</span>
                        <a href={`mailto:${settings.salesEmail}`} className="hover:text-white font-medium transition-colors">
                          {settings.salesEmail}
                        </a>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-3 text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <PhoneCall className="w-4 h-4 text-[#FF5A36] shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase">Direct Phone & WhatsApp</span>
                      <a href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`} className="hover:text-white font-semibold transition-colors">
                        {settings.contactPhone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <MapPin className="w-4 h-4 text-[#FF5A36] shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase">Factory & Showroom</span>
                      <span className="text-slate-200 font-medium">{settings.officeAddress}</span>
                      {settings.googleMapsUrl && (
                        <a
                          href={settings.googleMapsUrl}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="inline-flex items-center gap-1 text-[11px] text-[#D9F0EC] hover:text-white underline underline-offset-2 transition-colors mt-1 font-semibold"
                        >
                          <span>Open in Google Maps</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Instant WhatsApp Button */}
                <div className="pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs tracking-wider uppercase py-3.5 px-4 rounded-xl inline-flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire via WhatsApp Advisory</span>
                  </a>
                </div>

                {/* Link to Contact Us portion for full corporate directory & social channels */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 text-[11px]">Official social & corporate channels:</span>
                  <button
                    onClick={() => navigate('/contact')}
                    className="text-[#D9F0EC] hover:text-white font-bold underline transition-colors cursor-pointer text-[11px]"
                  >
                    View on Contact Us →
                  </button>
                </div>
              </div>

              {/* Factory Location & Showroom Map Portion */}
              <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-200">
                    <MapPin className="w-4 h-4 text-[#FF5A36]" />
                    <div>
                      <span className="font-mono text-[11px] font-bold block text-white">Factory Location & Showroom</span>
                      <span className="text-[10px] text-slate-400 font-mono">Safetylineindustriesofficial • Sialkot, Pakistan</span>
                    </div>
                  </div>
                  {settings.googleMapsUrl && (
                    <a
                      href={settings.googleMapsUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-[#D9F0EC] hover:text-white font-bold transition-colors underline underline-offset-2 px-2 py-1 rounded bg-white/10 hover:bg-white/20"
                    >
                      <span>Open in Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <div className="rounded-xl overflow-hidden border border-white/15 aspect-[16/9] bg-slate-800 shadow-inner">
                  <iframe
                    title="Safety Line Headquarters and Factory Location"
                    src={settings.googleMapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-[10px] font-mono text-slate-400 px-1">
                  Visits for sample verification, technical fabric audits, and production inspections are scheduled through the advisory channel.
                </p>
              </div>
            </div>

            {/* Right Inquiry Form */}
            <div className="lg:col-span-7 bg-white text-[#1A1A1A] p-8 sm:p-10 rounded-2xl shadow-xl space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#FF5A36] tracking-wider">
                  Official Technical Request
                </span>
                <h3 className="font-display text-2xl font-extrabold text-[#0B3D3B]">
                  Submit {isGearwear ? 'Gearwear' : 'Accessories'} Inquiry
                </h3>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                  <h4 className="font-display font-bold text-emerald-900 text-lg">Inquiry Received Successfully</h4>
                  <p className="text-emerald-800 text-xs max-w-sm mx-auto leading-relaxed">
                    Thank you. Your message has been routed to our {isGearwear ? 'Gearwear' : 'Accessories'} technical desk. A specialist will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider py-2 px-5 rounded-lg transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="E.g., Marcus Vance"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3.5 py-2.5 text-xs text-[#1A1A1A] outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Organization / Club</label>
                      <input
                        type="text"
                        placeholder="E.g., Apex Sports Club"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3.5 py-2.5 text-xs text-[#1A1A1A] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="E.g., marcus@apex.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3.5 py-2.5 text-xs text-[#1A1A1A] outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 0199"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3.5 py-2.5 text-xs text-[#1A1A1A] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Inquiry Requirements *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder={`Please describe your ${isGearwear ? 'gearwear' : 'accessories'} requirements, requested quantity, or sizing inquiries...`}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3.5 py-2.5 text-xs text-[#1A1A1A] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className={`w-full py-3.5 px-6 rounded-lg text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer disabled:opacity-50 ${
                      isGearwear ? 'bg-[#FF5A36] hover:bg-[#e44e2b]' : 'bg-[#0B3D3B] hover:bg-[#072725]'
                    }`}
                  >
                    {formSubmitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send {isGearwear ? 'Gearwear' : 'Accessories'} Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          CATEGORY-SPECIFIC FOOTER
         ========================================================================= */}
      <footer className="bg-white border-t border-slate-200 py-12 text-slate-600 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="flex items-baseline space-x-1">
                  <span className="font-serif font-black text-xs uppercase tracking-wider">
                    <span className="text-[#EA2227]">SAFETY</span> <span className="text-black">LINE</span>
                  </span>
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase ml-1">
                    • {isGearwear ? 'GEARWEAR' : 'ACCESSORIES'}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                {isGearwear 
                  ? "High-compression aerodynamic sportswear and seamless active knits engineered for athletes."
                  : "Technical accessories, luxury legwear, pure mulberry silk stockings, and graduated compression gear."
                }
              </p>
            </div>

            <div>
              <h4 className="font-display font-bold text-xs text-[#0B3D3B] uppercase tracking-wider mb-3">
                {isGearwear ? 'Gearwear Sections' : 'Accessories Sections'}
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li><button onClick={() => navScroll('items-section')} className="hover:text-[#0B3D3B] cursor-pointer">Browse Items</button></li>
                <li><button onClick={() => navScroll('features-section')} className="hover:text-[#0B3D3B] cursor-pointer">Standards & Specifications</button></li>
                <li><button onClick={() => navigate('/about')} className="hover:text-[#0B3D3B] cursor-pointer font-medium">Company Profile</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-xs text-[#0B3D3B] uppercase tracking-wider mb-3">
                Corporate & Navigation
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button onClick={() => navigate('/')} className="hover:text-[#FF5A36] cursor-pointer font-bold inline-flex items-center gap-1">
                    <span>← Switch Division / Portal</span>
                  </button>
                </li>
                <li><button onClick={() => navigate('/about')} className="hover:text-[#0B3D3B] cursor-pointer">About Safety Line</button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-[#0B3D3B] cursor-pointer">Contact & Advisory Desk</button></li>
                <li><button onClick={() => navScroll('contact-section')} className="hover:text-[#0B3D3B] cursor-pointer">Wholesale Desk</button></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 font-mono">
            <span>&copy; {new Date().getFullYear()} <span className="text-[#EA2227] font-bold">SAFETY</span> <span className="text-black font-bold">LINE</span> • {isGearwear ? 'GEARWEAR DIVISION' : 'ACCESSORIES DIVISION'}. ALL RIGHTS RESERVED.</span>
            <div className="flex items-center gap-2">
              <button onClick={() => navigate('/')} className="text-[#FF5A36] hover:underline cursor-pointer font-bold">
                Main Portal Home
              </button>
              <span>•</span>
              <span>Digital Showcase (No Checkout)</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Listing Modal for Adding/Editing Product Listings */}
      <ListingModal
        isOpen={isListingModalOpen}
        onClose={() => setIsListingModalOpen(false)}
        productToEdit={productToEdit}
        defaultCategory={isGearwear ? 'gearwear' : 'accessories'}
        onSave={handleSaveListing}
        onDelete={onDeleteProduct}
      />
    </div>
  );
}
