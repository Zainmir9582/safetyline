import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  MapPin,
  ChevronRight,
  Shield,
  Activity,
  Award,
  Globe2,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { navigate, Link } from '../lib/router';
import { settings } from '../data';
import SEO from './SEO';
import { RotatingText } from './TransitionText';
import SmoothImage from './SmoothImage';
import InquiryLoadingModal from './InquiryLoadingModal';

// Visual Assets
import safetylineLandingLogo from '../assets/images/safetyline_landing.png';
import factoryBg from '../assets/images/factory.jpeg';
import tacticalGlovesImg from '../assets/images/blank_tactical_glove_1792247540904.jpg';
import jacketsCatImg from '../assets/images/blank_tech_jacket_1792247565413.jpg';

export default function PortalLanding() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const rotatingHeadlines = [
    'PRECISION ATHLETIC GEARWEAR & ACTIVE KNITS',
    'TACTICAL HAND PROTECTION & MOTORSPORT GLOVES',
    'HIGH-PERFORMANCE GYMWEAR & APPAREL SERIES',
    'DIRECT FROM SIALKOT INDUSTRIAL MANUFACTURING ATELIER',
    'CUSTOM OEM & PRIVATE LABEL TECHNICAL SPECIFICATIONS'
  ];


  const portalSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Safety Line',
    'url': typeof window !== 'undefined' ? window.location.origin : '',
    'description': 'Safety Line - Premium Athletic Gearwear & Precision Accessories Digital Product Catalogue',
    'logo': `${typeof window !== 'undefined' ? window.location.origin : ''}/safetyline_landing.png`,
    'telephone': settings.contactPhone,
    'email': settings.contactEmail,
    'sameAs': [
      settings.instagramGearwear,
      settings.instagramHosiery,
      settings.facebookUrl
    ].filter(Boolean)
  };

  return (
    <div id="portal-landing-root" className="min-h-screen bg-[#041615] text-white flex flex-col justify-between font-sans relative selection:bg-[#FF5A36] selection:text-white overflow-x-hidden">
      
      {/* Dynamic Ambient Background & Factory Architectural Canvas */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Real Factory Facility with Atmospheric Architectural Scrims */}
        <img
          src={factoryBg}
          alt="Safety Line Industrial Manufacturing Facility Sialkot"
          className="w-full h-full object-cover object-[center_25%] scale-100 opacity-60 sm:opacity-65 filter contrast-105 brightness-90 saturate-95 transition-all duration-700"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
        
        {/* Cinematic Multi-Stop Dark Teal Scrims for Flawless Readability & Industrial Mood */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#041615]/85 via-[#041615]/55 via-[#041615]/65 to-[#041615]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_85%_at_50%_30%,transparent_15%,rgba(4,22,21,0.60)_55%,rgba(4,22,21,0.95)_100%)]" />
        
        {/* Ambient Subtle Luster Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(94,234,212,0.18)_0%,rgba(255,90,54,0.10)_45%,transparent_70%)] blur-2xl pointer-events-none animate-light-beam" />
        
        {/* Soft Background Radial Accents */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#FF5A36]/15 rounded-full blur-3xl animate-float-glow pointer-events-none" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#2DD4BF]/15 rounded-full blur-3xl animate-float-glow pointer-events-none" style={{ animationDelay: '-4s' }} />
        
        {/* Precision Fine Grid Overlay */}
        <div className="absolute inset-0 athletic-grid-pattern-dark opacity-15 pointer-events-none" />
      </div>

      <SEO
        title="Safety Line | High-Performance Gearwear & Technical Accessories"
        description="Explore Safety Line's dual specialized manufacturing divisions: Tactical Gearwear & Precision Technical Accessories. Direct OEM & export catalogue from our Sialkot manufacturing complex."
        keywords="Safety Line, Gearwear, Tactical gloves, Golf gloves, Mechanics gloves, Performance accessories, Gymwear, Hoodies, Jackets, Tracksuits, Sialkot sports manufacturing"
        schema={portalSchema}
      />

      {/* ========================================================
          TOP HEADER SECTION: Brand Mark & Kinetic Heading Transition
         ======================================================== */}
      <header className="relative z-10 pt-8 sm:pt-12 pb-6 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto space-y-6">
        
        {/* Top Facility Badge & Live Production Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="tracking-widest uppercase font-semibold text-[11px]">Direct Manufacturing • Sialkot, Pakistan</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-slate-200 text-[11px] font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span>ISO 9001:2015 Certified</span>
          </div>
        </motion.div>

        {/* Brand Monogram & Shimmer Brand Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center space-y-4"
        >
          {/* Logo with Multi-Layer Radiant Glow Shine */}
          <div className="relative group p-3">
            {/* Ambient radiant disk shine */}
            <div className="absolute -inset-6 bg-gradient-to-r from-emerald-400/35 via-white/40 via-[#FF5A36]/35 to-emerald-400/35 rounded-full blur-2xl group-hover:scale-115 transition-all duration-700 pointer-events-none animate-pulse" />
            <div className="absolute -inset-2 bg-white/10 rounded-full blur-md" />
            <img
              src={safetylineLandingLogo}
              alt="Safety Line Official Insignia"
              className="relative h-28 sm:h-36 md:h-44 w-auto object-contain filter drop-shadow-[0_12px_28px_rgba(255,255,255,0.3)] transition-transform duration-500 group-hover:scale-105"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          {/* Brand Heading without shine on LINE */}
          <div className="space-y-2 text-center max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-[0.2em] uppercase leading-tight flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span className="text-[#FF5A36] drop-shadow-[0_2px_15px_rgba(255,90,54,0.6)]">SAFETY</span>
              <span className="text-white drop-shadow-sm font-black">LINE</span>
              <span className="text-slate-300 text-xl sm:text-2xl font-black tracking-[0.16em] drop-shadow-sm">IND</span>
            </h1>

            <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#5EEAD4] uppercase font-bold drop-shadow-[0_0_10px_rgba(94,234,212,0.4)]">
              Textile Engineering & Technical Handwear Atelier
            </p>
          </div>
        </motion.div>

        {/* Dynamic Text Transition Box with Crisp Motion */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="pt-1 max-w-2xl mx-auto space-y-3"
        >
          <div className="relative p-0.5 rounded-2xl bg-gradient-to-r from-emerald-400/40 via-white/40 via-[#FF5A36]/50 to-emerald-400/40 shadow-2xl shadow-emerald-950/50">
            <div className="bg-[#072422]/95 backdrop-blur-md px-5 py-3 rounded-2xl flex items-center justify-center gap-2.5 text-center">
              <Sparkles className="w-4 h-4 text-[#FF5A36] shrink-0" />
              <div className="text-xs sm:text-sm font-mono font-bold tracking-wider text-slate-100">
                <RotatingText 
                  phrases={rotatingHeadlines} 
                  interval={3600}
                  className="text-white font-extrabold"
                />
              </div>
            </div>
          </div>

          {/* Quick Interactive Button with Shine Sweep */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="btn-glow-shine inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5A36] to-[#FF7A59] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#FF5A36]/30 hover:shadow-[#FF5A36]/50 active:scale-95 transition-all cursor-pointer border border-[#FF7A59]/50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct OEM & Spec Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-slate-400 font-sans tracking-wide">
              Certified technical specifications & live production lines
            </span>
          </div>
        </motion.div>
      </header>

      {/* ========================================================
          MAIN DUAL DIVISION CARDS: Stylized, Creative & High-Impact
         ======================================================== */}
      <main className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-grow flex flex-col justify-center space-y-12">
        
        {/* Dual Division Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          
          {/* ========================================================
              DIVISION 01: GEARWEAR DIVISION (Stylized High-Contrast)
             ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => navigate('/gearwear')}
            className="group cursor-pointer relative bg-gradient-to-b from-[#0B2E2B]/90 to-[#061F1D]/95 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/15 hover:border-[#FF5A36] transition-all duration-400 hover:shadow-[0_0_40px_rgba(255,90,54,0.25)] shadow-2xl flex flex-col justify-between min-h-[440px]"
          >
            {/* Visual Preview Image Backdrop with Cinematic Scrim */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={tacticalGlovesImg}
                alt="Safety Line Gearwear Division"
                className="w-full h-full object-cover object-center opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700 ease-out filter saturate-125"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061F1D] via-[#061F1D]/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#061F1D]/90 via-transparent to-transparent" />
            </div>

            {/* Top Division Badges & Department Identifier */}
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-[#FF5A36] text-white text-xs font-mono font-bold tracking-wider uppercase shadow-lg shadow-[#FF5A36]/30">
                <Cpu className="w-3.5 h-3.5" />
                <span>Division 01</span>
              </div>
              <span className="text-[11px] font-mono text-[#FF7A59] uppercase tracking-wider font-bold bg-[#FF5A36]/10 px-3 py-1 rounded-lg border border-[#FF5A36]/30 backdrop-blur-md">
                Tactical Handwear & Motorsport
              </span>
            </div>

            {/* Card Content & Interactive Spec Preview */}
            <div className="relative z-10 p-6 sm:p-8 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#FF5A36] uppercase tracking-widest">
                    Tactical Series
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-xs font-mono text-slate-300">9 Active Production Windows</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Gearwear Division
                </h2>
                
                <p className="text-slate-300 font-normal text-xs sm:text-sm leading-relaxed max-w-lg">
                  Specialized tactical handwear and technical apparel engineered for defense, automotive motorsport, cycling, and weight training.
                </p>
              </div>

              {/* Categorized Production Windows Quick Pills */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Featured Production Windows:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Golf Gloves', 
                    'Fish Gloves', 
                    'Work Gloves', 
                    'Mechanics Gloves', 
                    'Tactical Police', 
                    'Motorcars', 
                    'Cycling Gloves',
                    'Road & Cycling',
                    'Weight Lifting'
                  ].map((catName) => (
                    <span 
                      key={catName}
                      className="text-[11px] font-mono bg-white/10 hover:bg-white/20 text-slate-200 px-2.5 py-1 rounded-md border border-white/10 transition-colors backdrop-blur-xs font-medium"
                    >
                      {catName}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Highlights */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-slate-300 text-[11px] font-mono">
                <div>
                  <span className="block text-white font-bold">AAA Cabretta</span>
                  <span className="text-[10px] text-slate-400">Tour Grade Leather</span>
                </div>
                <div>
                  <span className="block text-white font-bold">Kevlar® Fiber</span>
                  <span className="text-[10px] text-slate-400">Cut & Puncture Guard</span>
                </div>
                <div>
                  <span className="block text-white font-bold">TPR Knuckle</span>
                  <span className="text-[10px] text-slate-400">Impact Shielding</span>
                </div>
              </div>

              {/* Enter Button CTA with Radiant Shine Sweep */}
              <Link
                id="enter-gearwear-btn"
                to="/gearwear"
                className="btn-glow-shine w-full mt-3 bg-gradient-to-r from-[#FF5A36] to-[#FF7A59] hover:from-[#e44e2b] hover:to-[#FF5A36] text-white font-bold text-xs sm:text-sm tracking-widest uppercase py-4 px-6 rounded-2xl inline-flex items-center justify-center space-x-2 transition-all shadow-xl shadow-[#FF5A36]/30 hover:shadow-[#FF5A36]/50 cursor-pointer active:scale-[0.98] border border-[#FF7A59]/50"
              >
                <span>Enter Gearwear Showcase</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </div>
          </motion.div>

          {/* ========================================================
              DIVISION 02: ACCESSORIES DIVISION (Stylized Emerald Slate)
             ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => navigate('/accessories')}
            className="group cursor-pointer relative bg-gradient-to-b from-[#0B2E2B]/90 to-[#061F1D]/95 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/15 hover:border-[#2DD4BF] transition-all duration-400 hover:shadow-[0_0_40px_rgba(45,212,191,0.2)] shadow-2xl flex flex-col justify-between min-h-[440px]"
          >
            {/* Visual Preview Image Backdrop with Cinematic Scrim */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={jacketsCatImg}
                alt="Safety Line Accessories Division"
                className="w-full h-full object-cover object-center opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700 ease-out filter saturate-125"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061F1D] via-[#061F1D]/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#061F1D]/90 via-transparent to-transparent" />
            </div>

            {/* Top Division Badges & Department Identifier */}
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-[#0F534F] text-emerald-200 text-xs font-mono font-bold tracking-wider uppercase shadow-lg border border-emerald-500/30">
                <Layers className="w-3.5 h-3.5" />
                <span>Division 02</span>
              </div>
              <span className="text-[11px] font-mono text-[#5EEAD4] uppercase tracking-wider font-bold bg-[#0F534F]/30 px-3 py-1 rounded-lg border border-[#2DD4BF]/30 backdrop-blur-md">
                Technical Apparel & Activewear
              </span>
            </div>

            {/* Card Content & Interactive Spec Preview */}
            <div className="relative z-10 p-6 sm:p-8 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#5EEAD4] uppercase tracking-widest">
                    Performance Knits
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-xs font-mono text-slate-300">5 Active Production Windows</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Accessories Division
                </h2>
                
                <p className="text-slate-300 font-normal text-xs sm:text-sm leading-relaxed max-w-lg">
                  Precision athletic gymwear, technical high-filament t-shirts, weather-resistant jackets, warm-up hoodies, and dual-season tracksuits.
                </p>
              </div>

              {/* Categorized Production Windows Quick Pills */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Featured Production Windows:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'GymWear', 
                    'T-shirts', 
                    'Jackets', 
                    'Hoodies', 
                    'Tracksuits (Summer & Winter)'
                  ].map((catName) => (
                    <span 
                      key={catName}
                      className="text-[11px] font-mono bg-white/10 hover:bg-white/20 text-slate-200 px-2.5 py-1 rounded-md border border-white/10 transition-colors backdrop-blur-xs font-medium"
                    >
                      {catName}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Highlights */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-slate-300 text-[11px] font-mono">
                <div>
                  <span className="block text-white font-bold">High-Gauge Knit</span>
                  <span className="text-[10px] text-slate-400">Micro-Mesh Breathability</span>
                </div>
                <div>
                  <span className="block text-white font-bold">Thermal Fleece</span>
                  <span className="text-[10px] text-slate-400">Brushed Cold-Shield</span>
                </div>
                <div>
                  <span className="block text-white font-bold">Capillary Tech</span>
                  <span className="text-[10px] text-slate-400">Moisture-Wicking Matrix</span>
                </div>
              </div>

              {/* Enter Button CTA with Radiant Shine Sweep */}
              <Link
                id="enter-accessories-btn"
                to="/accessories"
                className="btn-glow-shine w-full mt-3 bg-gradient-to-r from-[#0E4D48] to-[#146B64] hover:from-[#115E58] hover:to-[#0E4D48] text-emerald-100 font-bold text-xs sm:text-sm tracking-widest uppercase py-4 px-6 rounded-2xl inline-flex items-center justify-center space-x-2 transition-all shadow-xl shadow-black/40 hover:shadow-emerald-900/50 cursor-pointer active:scale-[0.98] border border-[#2DD4BF]/50"
              >
                <span>Enter Accessories Showcase</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-[#5EEAD4]" />
              </Link>
            </div>
          </motion.div>

        </div>



        {/* ========================================================
            FACILITY TRUST METRICS STRIP: High-Tech Manufacturing Proof
           ======================================================== */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-[#FF5A36] mb-1">
              <Globe2 className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Global Reach</span>
            </div>
            <div className="text-2xl font-display font-black text-white">100% Export</div>
            <div className="text-[11px] text-slate-400 mt-1">North America & European certified standards</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Compliance</span>
            </div>
            <div className="text-2xl font-display font-black text-white">ISO 9001:2015</div>
            <div className="text-[11px] text-slate-400 mt-1">Strict tensile & tolerance laboratory tests</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-[#FF5A36] mb-1">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Production</span>
            </div>
            <div className="text-2xl font-display font-black text-white">50+ Windows</div>
            <div className="text-[11px] text-slate-400 mt-1">From Cabretta golf to Kevlar® police gloves</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Solutions</span>
            </div>
            <div className="text-2xl font-display font-black text-white">Custom OEM</div>
            <div className="text-[11px] text-slate-400 mt-1">Private label embroidery, sublimation & tech packs</div>
          </div>
        </section>

      </main>

      {/* ========================================================
          BOTTOM INFORMATION FOOTER: Luxury Industrial Form
         ======================================================== */}
      <footer className="relative z-10 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-[#061F1D]/90 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          
          {/* Top row: Direct Contacts and Social Links */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10 text-xs font-mono">
            
            {/* Direct Contact Details */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-slate-300">
              <a 
                href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`} 
                className="inline-flex items-center gap-2 hover:text-[#FF5A36] font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-[#FF5A36]" />
                <span>{settings.contactPhone}</span>
              </a>
              <span className="text-white/20 hidden sm:inline">•</span>
              <a 
                href={`mailto:${settings.contactEmail}`} 
                className="inline-flex items-center gap-2 hover:text-[#FF5A36] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#FF5A36]" />
                <span>{settings.contactEmail}</span>
              </a>
              {settings.salesEmail && (
                <>
                  <span className="text-white/20 hidden sm:inline">•</span>
                  <a 
                    href={`mailto:${settings.salesEmail}`} 
                    className="inline-flex items-center gap-2 hover:text-emerald-400 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>{settings.salesEmail}</span>
                  </a>
                </>
              )}
              {settings.googleMapsUrl && (
                <>
                  <span className="text-white/20 hidden sm:inline">•</span>
                  <a 
                    href={settings.googleMapsUrl} 
                    target="_blank" 
                    referrerPolicy="no-referrer" 
                    className="inline-flex items-center gap-2 text-emerald-300 hover:text-[#FF5A36] font-semibold transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-[#FF5A36]" />
                    <span>Sialkot Factory on Google Maps</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </>
              )}
            </div>

            {/* Social Media Links & WhatsApp */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-400 font-sans mr-1 hidden sm:inline">Connect Direct:</span>
              {settings.instagramGearwear && (
                <a
                  href={settings.instagramGearwear}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  title="Instagram: Gearwear"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#E1306C] hover:text-white text-slate-300 flex items-center justify-center transition-all border border-white/10 shadow-sm"
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
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#833AB4] hover:text-white text-slate-300 flex items-center justify-center transition-all border border-white/10 shadow-sm"
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
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#1877F2] hover:text-white text-slate-300 flex items-center justify-center transition-all border border-white/10 shadow-sm"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                referrerPolicy="no-referrer"
                title="Direct WhatsApp Advisory"
                className="w-9 h-9 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
              </a>
              <button
                onClick={() => navigate('/contact')}
                className="btn-glow-shine ml-2 text-xs font-mono font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5A36] to-[#FF7A59] hover:from-[#e44e2b] hover:to-[#FF5A36] text-white transition-all cursor-pointer shadow-md shadow-[#FF5A36]/30 active:scale-95 border border-[#FF7A59]/40"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Bottom Row: Facility Certification Notice */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF5A36]" />
              <span>Safety Line • Sialkot, Pakistan • ISO 9001:2015</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#A7F3D0]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
              <span>Direct Manufacturer Digital Showcase & Technical Specs Catalogue</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Multi-Stage Animated Spec & OEM Loading Form Modal */}
      <InquiryLoadingModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        settings={settings}
      />

    </div>
  );
}
