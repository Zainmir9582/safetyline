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
import { RotatingText, ShimmerHeading } from './TransitionText';
import SmoothImage from './SmoothImage';

// Visual Assets
import safetylineLandingLogo from '../assets/images/safetyline_landing.png';
import factoryBg from '../assets/images/factorypic.jpeg';
import tacticalGlovesImg from '../assets/images/tactical_gloves_cat_1790287132299.jpg';
import jacketsCatImg from '../assets/images/jackets_cat_1790288483254.jpg';
import golfGlovesImg from '../assets/images/golf_gloves_cat_1792089120900.jpg';
import mechanicsGlovesImg from '../assets/images/mechanics_gloves_cat_1792089169596.jpg';
import motorcarsGlovesImg from '../assets/images/motorcars_gloves_cat_1792089200772.jpg';
import gymwearImg from '../assets/images/gymwear_cat_1790288454662.jpg';
import hoodiesImg from '../assets/images/hoodies_cat_1790288502434.jpg';
import tracksuitsImg from '../assets/images/tracksuits_cat_1790288520625.jpg';

export default function PortalLanding() {
  const [activeWindowTab, setActiveWindowTab] = useState<'all' | 'gearwear' | 'accessories'>('all');

  const rotatingHeadlines = [
    'PRECISION ATHLETIC GEARWEAR & ACTIVE KNITS',
    'TACTICAL HAND PROTECTION & MOTORSPORT GLOVES',
    'HIGH-PERFORMANCE GYMWEAR & APPAREL SERIES',
    'DIRECT FROM SIALKOT INDUSTRIAL MANUFACTURING COMPLEX',
    'CUSTOM OEM & PRIVATE LABEL TECHNICAL SPECIFICATIONS'
  ];

  // Quick Production Windows Data for the interactive explorer strip
  const featuredWindows = [
    {
      title: 'Golf Gloves',
      category: 'Gearwear',
      division: 'Tacticals',
      tag: 'Cabretta Leather',
      path: '/gearwear/golf-gloves',
      image: golfGlovesImg
    },
    {
      title: 'Mechanics Gloves',
      category: 'Gearwear',
      division: 'Tacticals',
      tag: 'TPR Knuckle Armor',
      path: '/gearwear/mechanics-gloves',
      image: mechanicsGlovesImg
    },
    {
      title: 'Motorcars Gloves',
      category: 'Gearwear',
      division: 'Car Categories',
      tag: 'Silicone Grip Palm',
      path: '/gearwear/motorcars-gloves',
      image: motorcarsGlovesImg
    },
    {
      title: 'Technical Jackets',
      category: 'Accessories',
      division: 'Apparel',
      tag: 'Weatherproof Shell',
      path: '/accessories/jackets',
      image: jacketsCatImg
    },
    {
      title: 'Performance Hoodies',
      category: 'Accessories',
      division: 'Apparel',
      tag: 'Brushed Thermal Fleece',
      path: '/accessories/hoodies',
      image: hoodiesImg
    },
    {
      title: 'High-Gauge GymWear',
      category: 'Accessories',
      division: 'Apparel',
      tag: 'Capillary Moisture-Wick',
      path: '/accessories/gymwear',
      image: gymwearImg
    },
    {
      title: 'Dual-Season Tracksuits',
      category: 'Accessories',
      division: 'Apparel',
      tag: 'Summer & Winter Sets',
      path: '/accessories/tracksuits',
      image: tracksuitsImg
    }
  ];

  const filteredFeaturedWindows = activeWindowTab === 'all'
    ? featuredWindows
    : featuredWindows.filter(w => w.category.toLowerCase() === activeWindowTab);

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
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Real Factory Complex with Cinematic Deep Gradients */}
        <img
          src={factoryBg}
          alt="Safety Line Industrial Manufacturing Facility Sialkot"
          className="w-full h-full object-cover object-center scale-105 opacity-20 filter contrast-125 saturate-50 transition-transform duration-1000"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        
        {/* Gradient Scrims for Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#041615]/95 via-[#041615]/80 to-[#041615]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(11,61,59,0.35),transparent)]" />
        
        {/* Animated Radiant Glow Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#FF5A36]/15 rounded-full blur-3xl animate-float-glow pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#0B3D3B]/40 rounded-full blur-3xl animate-float-glow pointer-events-none" style={{ animationDelay: '-4s' }} />
        
        {/* Precision Athletic Grid Overlay */}
        <div className="absolute inset-0 athletic-grid-pattern-dark opacity-40 pointer-events-none" />
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="tracking-widest uppercase font-semibold text-[11px]">Direct Manufacturing Complex • Sialkot, Pakistan</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-slate-300 text-[11px] font-semibold uppercase tracking-wider">
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
          {/* Logo with Glow Effect */}
          <div className="relative group p-2">
            <div className="absolute inset-0 bg-[#FF5A36]/20 rounded-full blur-xl group-hover:bg-[#FF5A36]/35 transition-all duration-500 scale-90" />
            <img
              src={safetylineLandingLogo}
              alt="Safety Line Official Insignia"
              className="relative h-28 sm:h-36 md:h-40 w-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          {/* Brand Heading with Continuous Shimmer & Transition */}
          <div className="space-y-2 text-center max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-[0.2em] uppercase leading-tight">
              <span className="text-[#FF5A36] drop-shadow-md">SAFETY</span>{' '}
              <ShimmerHeading accent="silver" className="text-white drop-shadow-md">
                LINE
              </ShimmerHeading>{' '}
              <span className="text-slate-300 text-xl sm:text-2xl font-black tracking-[0.16em]">IND</span>
            </h1>

            <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#A7F3D0] uppercase font-bold drop-shadow-sm">
              Textile Engineering & Technical Handwear Atelier
            </p>
          </div>
        </motion.div>

        {/* Eye-Catching Dynamic Text Transition Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="pt-1 max-w-2xl mx-auto"
        >
          <div className="relative p-0.5 rounded-2xl bg-gradient-to-r from-white/10 via-[#FF5A36]/30 to-white/10 shadow-xl shadow-black/40">
            <div className="bg-[#072422]/90 backdrop-blur-md px-5 py-3 rounded-2xl flex items-center justify-center gap-2.5 text-center">
              <Sparkles className="w-4 h-4 text-[#FF5A36] shrink-0" />
              <div className="text-xs sm:text-sm font-mono font-bold tracking-wider text-slate-200">
                <RotatingText 
                  phrases={rotatingHeadlines} 
                  interval={3600}
                  className="text-white font-extrabold"
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-sans tracking-wide">
            Select a specialized production division below to explore certified technical specifications and live product catalogues.
          </p>
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

                <h2 className="font-display text-3xl sm:text-4xl font-black text-white group-hover:text-[#FF7A59] transition-colors tracking-tight text-hover-lift">
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

              {/* Enter Button CTA */}
              <Link
                id="enter-gearwear-btn"
                to="/gearwear"
                className="w-full mt-3 bg-[#FF5A36] hover:bg-[#e44e2b] text-white font-bold text-xs sm:text-sm tracking-widest uppercase py-4 px-6 rounded-2xl inline-flex items-center justify-center space-x-2 transition-all shadow-xl shadow-[#FF5A36]/30 cursor-pointer group-hover:translate-y-[-2px] border border-[#FF7A59]/40"
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

                <h2 className="font-display text-3xl sm:text-4xl font-black text-white group-hover:text-[#5EEAD4] transition-colors tracking-tight text-hover-lift">
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

              {/* Enter Button CTA */}
              <Link
                id="enter-accessories-btn"
                to="/accessories"
                className="w-full mt-3 bg-[#0E4D48] hover:bg-[#115E58] text-emerald-100 font-bold text-xs sm:text-sm tracking-widest uppercase py-4 px-6 rounded-2xl inline-flex items-center justify-center space-x-2 transition-all shadow-xl shadow-black/40 cursor-pointer group-hover:translate-y-[-2px] border border-[#2DD4BF]/40"
              >
                <span>Enter Accessories Showcase</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-[#5EEAD4]" />
              </Link>
            </div>
          </motion.div>

        </div>

        {/* ========================================================
            CREATIVE INTERACTIVE SECTION: Quick Production Windows Explorer
           ======================================================== */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF5A36] uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Explorer</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight">
                Direct Production Windows Catalogue
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Jump directly into any certified category page to view detailed technical specifications and active product lines.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-mono self-start sm:self-auto">
              <button
                onClick={() => setActiveWindowTab('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  activeWindowTab === 'all'
                    ? 'bg-white/20 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Windows ({featuredWindows.length})
              </button>
              <button
                onClick={() => setActiveWindowTab('gearwear')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  activeWindowTab === 'gearwear'
                    ? 'bg-[#FF5A36] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Gearwear
              </button>
              <button
                onClick={() => setActiveWindowTab('accessories')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  activeWindowTab === 'accessories'
                    ? 'bg-[#0E4D48] text-emerald-200 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Accessories
              </button>
            </div>
          </div>

          {/* Quick Windows Carousel Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {filteredFeaturedWindows.map((item) => (
              <div
                key={item.title}
                onClick={() => navigate(item.path)}
                className="group/item cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF5A36]/60 rounded-2xl p-3 flex flex-col justify-between transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/40 mb-2.5 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                    loading="lazy"
                  />
                  <span className="absolute top-1.5 right-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/70 text-white font-bold backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white group-hover/item:text-[#FF7A59] transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[10px] font-mono text-emerald-300 line-clamp-1">
                    {item.tag}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400 group-hover/item:text-white">
                  <span>Explore</span>
                  <ChevronRight className="w-3 h-3 group-hover/item:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

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
                className="ml-2 text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-xl bg-[#FF5A36] hover:bg-[#e44e2b] text-white transition-colors cursor-pointer shadow-md shadow-[#FF5A36]/30"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Bottom Row: Facility Certification Notice */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF5A36]" />
              <span>Safety Line Manufacturing Complex • Sialkot, Pakistan • ISO 9001:2015</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#A7F3D0]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
              <span>Direct Manufacturer Digital Showcase & Technical Specs Catalogue</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
