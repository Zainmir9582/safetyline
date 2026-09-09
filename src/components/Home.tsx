import { Zap, ShieldCheck, Cpu, ArrowRight, MessageCircle, Star, PhoneCall, Mail, Clock, Calendar, Sparkles, Activity, Layers, Compass, Instagram, Facebook, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { navigate } from '../lib/router';
import { Product, Settings } from '../types';
import { testimonials as defaultTestimonials } from '../data';
import { articles } from '../data/articles';
import SEO from './SEO';
import factoryImg from '../assets/images/safetyline_exact_user_pic_1788337630939.jpg';

interface HomeProps {
  products: Product[];
  settings: Settings;
}

export default function Home({ products, settings }: HomeProps) {
  const latestProducts = products
    .filter(p => p.status === 'Active')
    .slice(0, 4);

  const featuredArticles = articles.slice(0, 3);

  const features = [
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
      title: 'Graduated Hemodynamic Support',
      tag: '15-25 mmHg',
      description: 'Targeted vascular compression profiles enhance venous blood return, reduce muscle micro-oscillations, and dramatically shorten recovery windows.'
    },
    {
      icon: <Layers className="w-6 h-6 text-[#FF5A36]" />,
      title: 'OEKO-TEX Standard 100',
      tag: 'Certified Pure',
      description: 'All raw filaments, dyes, and silicone anchor bands are laboratory tested and certified 100% free of harmful allergens, toxins, and microplastic shed.'
    }
  ];

  const metrics = [
    { value: '400', unit: 'Needle', label: 'High-Gauge Italian Looms' },
    { value: '5,000', unit: 'Cycles', label: 'Continuous Stress Testing' },
    { value: '98.4%', unit: 'Efficiency', label: 'Zero-Waste Pattern Nesting' },
    { value: '100%', unit: 'European', label: 'Swiss & Italian QC Audited' }
  ];

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': settings.companyName,
    'url': window.location.origin,
    'description': settings.aboutText,
    'telephone': settings.contactPhone,
    'email': settings.contactEmail,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': settings.officeAddress
    }
  };

  return (
    <div id="homepage-container" className="bg-white min-h-screen text-[#1A1A1A] font-sans antialiased">
      <SEO 
        title="Safety Line | High-Performance Gearwear & Technical Hosiery Catalogue"
        description="Explore Safety Line's digital product catalogue featuring premium athletic compression gearwear and Swiss-engineered technical hosiery for high performance."
        keywords="Safety Line, athletic gearwear, sports hosiery, compression socks, activewear catalogue, performance apparel"
        schema={organizationSchema}
      />

      {/* ==========================================
          HERO SECTION (Modern Athletic Minimalism)
         ========================================== */}
      <section 
        id="home-hero"
        className="relative min-h-[640px] lg:h-[760px] flex items-center px-4 sm:px-8 lg:px-16 bg-[#0B3D3B] text-white overflow-hidden pt-28 pb-16"
      >
        {/* Real Factory Complex Background Image with High-End Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={factoryImg}
            alt="Safety Line Manufacturing Complex and Showroom, Sialkot"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.70] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B3D3B]/95 via-[#0B3D3B]/85 to-[#0B3D3B]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D3B] via-transparent to-[#0B3D3B]/70" />
          <div className="absolute inset-0 athletic-grid-pattern-dark opacity-30 pointer-events-none" />
        </div>

        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-[#FF5A36]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#D9F0EC]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          
          {/* Left Hero Column */}
          <div className="w-full lg:w-1/2 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#D9F0EC]/15 text-[#D9F0EC] text-[11px] font-mono font-bold uppercase tracking-[0.22em] border border-[#D9F0EC]/20"
            >
              <Zap className="w-3.5 h-3.5 text-[#FF5A36]" />
              <span>Digital Performance Catalogue • 2026 Release</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight"
            >
              Engineered for Speed.<br/>
              <span className="text-[#D9F0EC]">Knitted for Endurance.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-base sm:text-lg text-white/80 max-w-lg leading-relaxed font-normal"
            >
              {settings.slogan}. Discover next-generation athletic compression gearwear and precision European hosiery crafted with zero-compromise textile engineering.
            </motion.p>
            
            {/* Dual CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="flex flex-wrap gap-4 pt-3"
            >
              <button
                id="hero-view-gearwear-btn"
                onClick={() => navigate('/gearwear')}
                className="px-8 py-4 bg-[#FF5A36] hover:bg-[#e44e2b] active:scale-95 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#FF5A36]/30 flex items-center gap-3 transition-all cursor-pointer group"
              >
                <span>View Gearwear</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                id="hero-view-hosiery-btn"
                onClick={() => navigate('/hosiery')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 backdrop-blur-xs"
              >
                <span>View Hosiery</span>
                <Compass className="w-4 h-4 text-[#D9F0EC]" />
              </button>
            </motion.div>
          </div>

          {/* Right Dual Athletic Showcase Windows */}
          <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center relative py-4 lg:py-0">
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5 z-10 w-full max-w-lg">
              
              {/* Gearwear Showcase Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                onClick={() => navigate('/gearwear')}
                className="group cursor-pointer aspect-[4/5] bg-[#072725] rounded-2xl overflow-hidden relative border-2 border-white/15 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FF5A36]"
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=700"
                    alt="Gearwear Athletic Line"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-80 group-hover:opacity-95"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D3B] via-[#0B3D3B]/40 to-transparent" />
                </div>

                <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <span className="bg-[#FF5A36] text-white font-mono text-[9px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                      Collection 01
                    </span>
                    <span className="text-[10px] text-[#D9F0EC] font-mono tracking-widest font-bold">
                      ACTIVE
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-display font-extrabold text-2xl tracking-tight text-white leading-none">
                      GEARWEAR
                    </h2>
                    <p className="text-[#D9F0EC] text-xs font-light line-clamp-2 leading-relaxed">
                      Zoned aerodynamic compression tops, stormshells, and thermal track pants.
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center space-x-2 bg-white text-[#0B3D3B] px-4 py-2 rounded-lg text-[10px] font-extrabold tracking-wider uppercase transition-all group-hover:bg-[#FF5A36] group-hover:text-white shadow-sm">
                        <span>Explore Gearwear</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Hosiery Showcase Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: 35 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                onClick={() => navigate('/hosiery')}
                className="group cursor-pointer aspect-[4/5] bg-[#072725] rounded-2xl overflow-hidden relative border-2 border-white/15 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FF5A36] sm:mt-8"
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=700"
                    alt="Technical Hosiery Line"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-80 group-hover:opacity-95"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D3B] via-[#0B3D3B]/40 to-transparent" />
                </div>

                <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <span className="bg-[#D9F0EC] text-[#0B3D3B] font-mono text-[9px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                      Collection 02
                    </span>
                    <span className="text-[10px] text-[#D9F0EC] font-mono tracking-widest font-bold">
                      HOSIERY
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-display font-extrabold text-2xl tracking-tight text-white leading-none">
                      HOSIERY
                    </h2>
                    <p className="text-[#D9F0EC] text-xs font-light line-clamp-2 leading-relaxed">
                      Graduated sports compression, pure silk stay-ups, and Mongolian cashmere.
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center space-x-2 bg-white text-[#0B3D3B] px-4 py-2 rounded-lg text-[10px] font-extrabold tracking-wider uppercase transition-all group-hover:bg-[#FF5A36] group-hover:text-white shadow-sm">
                        <span>Explore Hosiery</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          METRICS STRIP (Full-Bleed Soft Mint Color Block)
         ========================================== */}
      <section className="bg-[#D9F0EC] border-b border-[#0B3D3B]/10 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {metrics.map((m, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B3D3B] tracking-tight">
                {m.value} <span className="text-sm font-mono text-[#FF5A36] uppercase font-bold">{m.unit}</span>
              </div>
              <p className="text-xs font-semibold text-[#0B3D3B]/80 uppercase tracking-wider">{m.label}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ==========================================
          BUSINESS FEATURES (Why Choose Us)
         ========================================== */}
      <section id="business-features" className="py-24 bg-[#FAFCFB] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold uppercase tracking-wider">
              <span>Why Choose Safety Line</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B3D3B] tracking-tight">
              Textile Technology Built For High Output
            </h2>
            <p className="text-slate-600 font-normal text-sm sm:text-base">
              Explore the four core engineering pillars that make Safety Line gearwear and hosiery the preferred choice for athletes and luxury stockists worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, idx) => (
              <div 
                key={idx}
                className="bg-white p-7 rounded-2xl shadow-xs border border-slate-200 hover:border-[#FF5A36] hover:shadow-md transition-all duration-200 space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="bg-[#D9F0EC] p-3 rounded-xl inline-block group-hover:scale-105 transition-transform">
                    {f.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B3D3B] bg-slate-100 px-2 py-0.5 rounded">
                    {f.tag}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-[#0B3D3B] tracking-tight">
                  {f.title}
                </h3>
                <p className="text-slate-600 text-xs font-normal leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          LATEST PRODUCTS PREVIEW (DIGITAL CATALOGUE)
         ========================================== */}
      <section id="latest-products-showcase" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold uppercase tracking-wider">
                <span>Featured Catalogue Releases</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B3D3B] tracking-tight">
                Latest Performance Releases
              </h2>
              <p className="text-slate-600 font-normal text-sm sm:text-base max-w-xl">
                Browse our latest additions. Each product profile includes comprehensive technical yarn specs, sizing options, colorways, and instant inquiry channels.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/gearwear')}
                className="bg-[#D9F0EC] hover:bg-[#c2eae3] text-[#0B3D3B] px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
              >
                Gearwear Line
              </button>
              <button
                onClick={() => navigate('/hosiery')}
                className="bg-[#0B3D3B] hover:bg-[#072725] text-white px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
              >
                Hosiery Line
              </button>
            </div>
          </div>

          {/* 4 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestProducts.map((p) => (
              <div 
                key={p.id}
                onClick={() => navigate(`/product/${p.slug}`)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#FF5A36] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="aspect-[4/5] bg-slate-100 overflow-hidden relative">
                  <img 
                    src={p.coverImage} 
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-[#0B3D3B] text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    {p.categoryName}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-[#0B3D3B] font-mono text-[9px] px-2 py-0.5 rounded border border-slate-200 font-bold">
                    {p.productCode}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 font-mono tracking-wider font-semibold uppercase">
                      {p.material.split(',')[0]}
                    </p>
                    <h3 className="font-display font-bold text-[#0B3D3B] text-base group-hover:text-[#FF5A36] transition-colors line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {p.shortDescription}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#FF5A36] uppercase tracking-wider inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {p.sizes.length} Sizes
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          CLIENT TESTIMONIALS (Modern Minimalist Grid)
         ========================================== */}
      <section id="client-testimonials" className="py-24 bg-[#0B3D3B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D9F0EC]/15 text-[#D9F0EC] text-xs font-mono font-bold uppercase tracking-wider border border-[#D9F0EC]/20">
              <span>Testimonials & Endorsements</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Trusted by Elite Athletes & Performance Studios
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {defaultTestimonials.map((t) => (
              <div 
                key={t.id} 
                className="bg-[#072725] p-8 rounded-2xl border border-white/10 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex text-[#FF5A36] space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/90 font-normal leading-relaxed text-sm">
                    "{t.message}"
                  </p>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-display font-bold text-white text-sm">
                    {t.author}
                  </h4>
                  <span className="text-[11px] text-[#D9F0EC]/80 font-mono block mt-0.5">
                    {t.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          BLOG HIGHLIGHTS (SEO Growth Engine Preview)
         ========================================== */}
      <section id="blog-highlights" className="py-24 bg-[#FAFCFB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold uppercase tracking-wider">
                <span>Knowledge Base & Technical Guides</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B3D3B] tracking-tight">
                Latest Articles & Textile Science
              </h2>
              <p className="text-slate-600 font-normal text-sm sm:text-base max-w-xl">
                Expert buying guides, fabric comparisons, and garment longevity tips designed to help you select and preserve high-performance activewear.
              </p>
            </div>
            <div>
              <button
                onClick={() => navigate('/blog')}
                className="bg-[#0B3D3B] hover:bg-[#072725] text-white px-6 py-3 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Explore All Articles</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF5A36]" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => navigate(`/blog/${art.slug}`)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#FF5A36] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B3D3B] text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase shadow-xs">
                      {art.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {art.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {art.readTime}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#0B3D3B] group-hover:text-[#FF5A36] transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-slate-600 font-normal text-xs leading-relaxed line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium">{art.author.name}</span>
                  <span className="text-[11px] font-bold text-[#FF5A36] uppercase tracking-wider inline-flex items-center gap-1 transition-transform group-hover:translate-x-1">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          CONTACT PORTAL & INTERACTIVE MAP EMBED
         ========================================== */}
      <section id="contact-overview" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Contact Portal Card */}
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold uppercase tracking-wider">
                  <span>Connect With Our Team</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B3D3B] tracking-tight">
                  Inquire About Catalogues & Custom Specs
                </h2>
                <p className="text-slate-600 font-normal text-sm sm:text-base">
                  For wholesale stockist inquiries, team kit specifications, or product sample requests, our advisory desk responds promptly.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-4 bg-[#FAFCFB] p-4 rounded-xl border border-slate-200">
                  <div className="bg-[#D9F0EC] p-3 rounded-lg text-[#0B3D3B]">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-mono uppercase">Direct Phone</span>
                    <a href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`} className="text-[#0B3D3B] font-semibold font-mono text-sm hover:text-[#FF5A36] transition-colors">
                      {settings.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-[#FAFCFB] p-4 rounded-xl border border-slate-200">
                  <div className="bg-[#D9F0EC] p-3 rounded-lg text-[#0B3D3B]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-mono uppercase">General Inquiry</span>
                    <a href={`mailto:${settings.contactEmail}`} className="text-[#0B3D3B] font-semibold text-sm hover:text-[#FF5A36] transition-colors block">
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>

                {settings.salesEmail && (
                  <div className="flex items-center space-x-4 bg-[#FAFCFB] p-4 rounded-xl border border-slate-200">
                    <div className="bg-[#D9F0EC] p-3 rounded-lg text-[#0B3D3B]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400 font-mono uppercase">Sales & Wholesale Desk</span>
                      <a href={`mailto:${settings.salesEmail}`} className="text-[#0B3D3B] font-semibold text-sm hover:text-[#FF5A36] transition-colors block">
                        {settings.salesEmail}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-4 bg-[#FAFCFB] p-4 rounded-xl border border-slate-200">
                  <div className="bg-[#D9F0EC] p-3 rounded-lg text-[#0B3D3B]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-mono uppercase">Headquarters</span>
                    <span className="text-[#0B3D3B] font-semibold text-sm block">{settings.officeAddress}</span>
                    {settings.googleMapsUrl && (
                      <a
                        href={settings.googleMapsUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="inline-flex items-center gap-1 text-xs text-[#FF5A36] hover:underline font-mono font-bold transition-colors mt-0.5"
                      >
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-[#FAFCFB] p-4 rounded-xl border border-slate-200">
                  <div className="bg-emerald-100 p-3 rounded-lg text-emerald-700">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-mono uppercase">WhatsApp Advisory Desk</span>
                    <a 
                      href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      referrerPolicy="no-referrer"
                      className="text-emerald-700 hover:text-emerald-800 font-bold text-sm transition-colors inline-flex items-center space-x-1"
                    >
                      <span>Direct WhatsApp Message</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Social channels strip */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  {settings.instagramGearwear && (
                    <a
                      href={settings.instagramGearwear}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#FAFCFB] border border-slate-200 hover:border-[#E1306C] hover:text-[#E1306C] text-slate-700 text-xs font-mono transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>Gearwear IG</span>
                    </a>
                  )}
                  {settings.instagramHosiery && (
                    <a
                      href={settings.instagramHosiery}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#FAFCFB] border border-slate-200 hover:border-[#833AB4] hover:text-[#833AB4] text-slate-700 text-xs font-mono transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>Fine Hosiery IG</span>
                    </a>
                  )}
                  {settings.facebookUrl && (
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#FAFCFB] border border-slate-200 hover:border-[#1877F2] hover:text-[#1877F2] text-slate-700 text-xs font-mono transition-colors"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                      <span>Facebook</span>
                    </a>
                  )}
                </div>
              </div>

              <div>
                <button
                  onClick={() => navigate('/contact')}
                  className="bg-[#FF5A36] hover:bg-[#e44e2b] text-white font-bold text-xs tracking-wider uppercase py-4 px-8 rounded-xl inline-flex items-center space-x-2 transition-all shadow-md shadow-[#FF5A36]/25 cursor-pointer"
                >
                  <span>Open Contact & Inquiry Form</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Factory Location & Google Maps Wrapper */}
            <div className="bg-[#FAFCFB] p-5 rounded-2xl border border-slate-200 shadow-sm overflow-hidden aspect-[4/3] flex flex-col space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#FF5A36]" />
                  <div>
                    <span className="block text-xs font-mono text-[#0B3D3B] font-bold uppercase tracking-wider">
                      Factory Location & Showroom
                    </span>
                    <span className="block text-[10px] font-mono text-slate-500">
                      Safetylineindustriesofficial • Sialkot, Pakistan
                    </span>
                  </div>
                </div>
                {settings.googleMapsUrl && (
                  <a
                    href={settings.googleMapsUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#0B3D3B] hover:text-[#FF5A36] font-bold uppercase transition-colors px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <div className="w-full flex-grow rounded-xl overflow-hidden border border-slate-200 bg-slate-200 relative shadow-inner">
                <iframe
                  title="Safety Line Headquarters and Factory Location Map"
                  src={settings.googleMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
