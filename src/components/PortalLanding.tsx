import { ArrowRight, Sparkles, ShieldCheck, Cpu, Layers, Phone, Mail, Instagram, Facebook, MessageCircle, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { navigate } from '../lib/router';
import { settings } from '../data';
import SEO from './SEO';
import safetylineLandingLogo from '../assets/images/safetyline_landing.png';
import factoryBg from '../assets/images/factorypic.jpeg';

export default function PortalLanding() {
  const portalSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Safety Line',
    'url': window.location.origin,
    'description': 'Safety Line - Premium Athletic Gearwear & Precision Accessories Digital Product Catalogue',
    'logo': `${window.location.origin}/safetyline_landing.png`,
    'telephone': settings.contactPhone,
    'email': settings.contactEmail,
    'sameAs': [
      settings.instagramGearwear,
      settings.instagramHosiery,
      settings.facebookUrl
    ].filter(Boolean)
  };

  return (
    <div id="portal-landing-root" className="min-h-screen bg-white text-[#1A1A1A] flex flex-col justify-between font-sans relative select-none overflow-x-hidden">
      {/* Real Safety Line Manufacturing Complex Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={factoryBg}
          alt="Safety Line Industrial Manufacturing Facility"
          className="w-full h-full object-cover object-center scale-100 opacity-25 filter contrast-[1.05]"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        {/* Architectural atmospheric gradient to preserve clean white canvas */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_35%,rgba(11,61,59,0.06),rgba(255,255,255,0.7))]" />
      </div>

      <SEO
        title="Safety Line | Athletic Gearwear & Precision Accessories Catalogue"
        description="Choose between Safety Line's two specialized divisions: High-Performance Athletic Gearwear or Precision Performance Accessories. Direct from our Sialkot manufacturing complex."
        keywords="Safety Line, Gearwear, Accessories, Athletic activewear, compression wear, technical socks, performance accessories, Sialkot factory"
        schema={portalSchema}
      />

      {/* Top Header Section with Official Intertwined SL Logo & Brand Name */}
      <header className="relative z-10 pt-6 sm:pt-8 pb-3 px-4 sm:px-8 text-center max-w-4xl mx-auto space-y-3">
        {/* Brand Monogram & Name in Prestigious Form */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Official Emblem & Brand Title */}
          <div className="flex flex-col items-center max-w-lg w-full space-y-4">
            {/* Official Safety Line Logo */}
            <div className="flex items-center justify-center p-1">
              <img
                src={safetylineLandingLogo}
                alt="Safety Line Ind Logo"
                className="h-32 sm:h-40 md:h-44 w-auto object-contain transition-transform duration-300 hover:scale-105"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>

            {/* Brand Title & Heritage */}
            <div className="space-y-1.5 text-center">
              <h1 className="text-2xl sm:text-3xl font-display font-black tracking-[0.22em] uppercase">
                <span className="text-[#EA2227]">SAFETY</span> <span className="text-black">LINE</span> <span className="text-black text-lg sm:text-xl font-black tracking-[0.18em] ml-1">IND</span>
              </h1>
              <p className="text-[10px] sm:text-xs font-mono tracking-[0.28em] text-slate-600 uppercase font-bold">
                Textile Engineering & Technical Accessories Atelier
              </p>
            </div>

            {/* Direct Facility Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-[#0B3D3B] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
              <span>Direct Manufacturing Facility • Sialkot, Pakistan</span>
            </div>
          </div>
        </motion.div>

        {/* Subtitle Directive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="pt-1"
        >
          <p className="inline-block bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-slate-700 text-xs sm:text-sm font-medium border border-slate-200 shadow-sm">
            Select a division below to enter its specialized digital showcase and product specifications catalogue.
          </p>
        </motion.div>
      </header>

      {/* Main Dual-Selection Options Portal */}
      <main className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
          
          {/* ========================================================
              OPTION 1: GEARWEAR DIVISION
             ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => navigate('/gearwear')}
            className="group cursor-pointer relative bg-white/95 backdrop-blur-md hover:bg-white rounded-3xl overflow-hidden border-2 border-slate-200 hover:border-[#FF5A36] transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF5A36]/15 shadow-xl shadow-slate-200/60 flex flex-col justify-between min-h-[360px] sm:min-h-[400px]"
          >
            {/* Ambient Division Accent Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FF5A36]/5 rounded-full blur-3xl group-hover:bg-[#FF5A36]/10 transition-all" />
            </div>

            {/* Top Badge */}
            <div className="relative z-10 p-6 sm:p-7 flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[#FF5A36] text-white text-xs font-mono font-bold tracking-wider uppercase shadow-md shadow-[#FF5A36]/30">
                <Cpu className="w-3.5 h-3.5" />
                <span>Division 01</span>
              </div>
              <span className="text-xs font-mono text-[#FF5A36] uppercase tracking-wider font-bold bg-[#FF5A36]/10 px-2.5 py-1 rounded-md border border-[#FF5A36]/20">
                Athletic Compression
              </span>
            </div>

            {/* Bottom Content & CTA Button */}
            <div className="relative z-10 p-6 sm:p-7 space-y-4">
              <div className="space-y-1.5">
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B3D3B] group-hover:text-[#FF5A36] transition-colors tracking-tight">
                  Gearwear
                </h2>
                <p className="text-slate-600 font-normal text-xs sm:text-sm leading-relaxed">
                  High-compression aerodynamic tees, thermal baselayers, weather stormshells, and seamless athletic shorts.
                </p>
              </div>

              {/* Technical Features Tag */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
                  3D Seamless Knits
                </span>
                <span className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
                  AeroStrand™ Zoned Weave
                </span>
                <span className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
                  Zero-Chafe Flatlock
                </span>
              </div>

              {/* Big CTA Button */}
              <button
                id="enter-gearwear-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/gearwear');
                }}
                className="w-full mt-2 bg-[#FF5A36] hover:bg-[#e44e2b] text-white font-bold text-xs sm:text-sm tracking-wider uppercase py-3.5 px-6 rounded-xl inline-flex items-center justify-center space-x-2 transition-all shadow-md shadow-[#FF5A36]/30 cursor-pointer group-hover:translate-y-[-2px]"
              >
                <span>Enter Gearwear Showcase</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* ========================================================
              OPTION 2: ACCESSORIES DIVISION
             ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => navigate('/accessories')}
            className="group cursor-pointer relative bg-white/95 backdrop-blur-md hover:bg-white rounded-3xl overflow-hidden border-2 border-slate-200 hover:border-[#0B3D3B] transition-all duration-300 hover:shadow-2xl hover:shadow-[#0B3D3B]/15 shadow-xl shadow-slate-200/60 flex flex-col justify-between min-h-[360px] sm:min-h-[400px]"
          >
            {/* Ambient Division Accent Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#0B3D3B]/5 rounded-full blur-3xl group-hover:bg-[#0B3D3B]/10 transition-all" />
            </div>

            {/* Top Badge */}
            <div className="relative z-10 p-6 sm:p-7 flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[#0B3D3B] text-white text-xs font-mono font-bold tracking-wider uppercase shadow-md">
                <Layers className="w-3.5 h-3.5" />
                <span>Division 02</span>
              </div>
              <span className="text-xs font-mono text-[#0B3D3B] uppercase tracking-wider font-bold bg-[#D9F0EC] px-2.5 py-1 rounded-md border border-[#0B3D3B]/20">
                Technical & Performance Accessories
              </span>
            </div>

            {/* Bottom Content & CTA Button */}
            <div className="relative z-10 p-6 sm:p-7 space-y-4">
              <div className="space-y-1.5">
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B3D3B] transition-colors tracking-tight">
                  Accessories
                </h2>
                <p className="text-slate-600 font-normal text-xs sm:text-sm leading-relaxed">
                  High-density compression socks, merino wool thermal accessories, ergonomic calf sleeves, and engineered performance essentials.
                </p>
              </div>

              {/* Technical Features Tag */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
                  Technical Compression Socks
                </span>
                <span className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
                  Ergonomic Joint Sleeves
                </span>
                <span className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
                  OEKO-TEX Standard 100
                </span>
              </div>

              {/* Big CTA Button */}
              <button
                id="enter-accessories-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/accessories');
                }}
                className="w-full mt-2 bg-[#0B3D3B] hover:bg-[#072725] text-white font-bold text-xs sm:text-sm tracking-wider uppercase py-3.5 px-6 rounded-xl inline-flex items-center justify-center space-x-2 transition-all shadow-md shadow-[#0B3D3B]/20 cursor-pointer group-hover:translate-y-[-2px]"
              >
                <span>Enter Accessories Showcase</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Bottom Information Footer with Official Contact & Social Media Links */}
      <footer className="relative z-10 py-6 px-4 sm:px-8 max-w-6xl mx-auto w-full">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl shadow-slate-200/60">
          {/* Top row: Contact info and Social Media Links */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100 text-xs font-mono">
            {/* Direct Contact details */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-slate-700">
              <a 
                href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`} 
                className="inline-flex items-center gap-1.5 hover:text-[#0B3D3B] font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF5A36]" />
                <span>{settings.contactPhone}</span>
              </a>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <a 
                href={`mailto:${settings.contactEmail}`} 
                className="inline-flex items-center gap-1.5 hover:text-[#0B3D3B] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#FF5A36]" />
                <span>{settings.contactEmail}</span>
              </a>
              {settings.salesEmail && (
                <>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <a 
                    href={`mailto:${settings.salesEmail}`} 
                    className="inline-flex items-center gap-1.5 hover:text-[#0B3D3B] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#0B3D3B]" />
                    <span>{settings.salesEmail}</span>
                  </a>
                </>
              )}
              {settings.googleMapsUrl && (
                <>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <a 
                    href={settings.googleMapsUrl} 
                    target="_blank" 
                    referrerPolicy="no-referrer" 
                    className="inline-flex items-center gap-1.5 text-[#0B3D3B] hover:text-[#FF5A36] font-semibold transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#FF5A36]" />
                    <span>Sialkot Factory on Google Maps</span>
                  </a>
                </>
              )}
            </div>

            {/* Social Media Links & WhatsApp */}
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] text-slate-400 font-sans mr-1 hidden sm:inline">Connect:</span>
              {settings.instagramGearwear && (
                <a
                  href={settings.instagramGearwear}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  title="Instagram: Gearwear"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#E1306C] hover:text-white text-slate-700 flex items-center justify-center transition-all border border-slate-200 shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.instagramHosiery && (
                <a
                  href={settings.instagramHosiery}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  title="Instagram: Accessories"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#833AB4] hover:text-white text-slate-700 flex items-center justify-center transition-all border border-slate-200 shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  title="Facebook: Safety Line"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#1877F2] hover:text-white text-slate-700 flex items-center justify-center transition-all border border-slate-200 shadow-sm"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                referrerPolicy="no-referrer"
                title="Direct WhatsApp Advisory"
                className="w-8 h-8 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
              </a>
              <button
                onClick={() => navigate('/contact')}
                className="ml-2 text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-[#0B3D3B] hover:bg-[#072725] text-white transition-colors cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Bottom row: Facility & ISO info */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF5A36]" />
              <span>Safety Line Manufacturing Complex • Sialkot, Pakistan • ISO 9001:2015</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-[#0B3D3B] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
              <span>Direct Manufacturer Product Catalogue</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
