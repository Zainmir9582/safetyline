import { useState } from 'react';
import { ArrowRight, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { navigate, Link } from '../lib/router';
import { settings } from '../data';
import { GEARWEAR_WINDOWS } from '../data/gearwearWindows';
import { ACCESSORIES_WINDOWS } from '../data/accessoriesWindows';
import SEO from './SEO';
import { RotatingText } from './TransitionText';
import InquiryLoadingModal from './InquiryLoadingModal';
import SiteHeader from './SiteHeader';
import Footer from './Footer';

// Authentic Visual Assets
import safetylineLandingLogo from '../assets/images/safetyline_landing.png';
import factoryBg from '../assets/images/factory.jpeg';
import cg1Img from '../assets/images/cg1_slide.png';
import gg1Img from '../assets/images/golf_glove_1.png';
import wg1Img from '../assets/images/work_glove_1.png';
import mg1Img from '../assets/images/mechanics_glove_1.png';
import jacketsCatImg from '../assets/images/blank_tech_jacket_1792247565413.jpg';
import gymwearCatImg from '../assets/images/blank_gymwear_set_1792247564534.jpg';

export default function PortalLanding() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const rotatingHeadlines = [
    'Tactical Handwear & FIA-Grade Motorsport Gloves',
    'Precision Tour Golf Cabretta & Endurance Cycling Lines',
    'High-Gauge Gymwear, Jackets, Hoodies & Tracksuits',
    'Direct OEM & Private Label Manufacturing from Sialkot'
  ];

  const portalSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Safety Line',
    'url': typeof window !== 'undefined' ? window.location.origin : '',
    'description': 'Safety Line - High-Performance Gearwear & Technical Accessories Digital Product Catalogue',
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
    <div id="portal-landing-root" className="min-h-screen bg-[#F7F6F2] text-[#141918] flex flex-col font-sans overflow-x-hidden">
      <SEO
        title="Safety Line | High-Performance Gearwear & Technical Accessories"
        description="Explore Safety Line's dual specialized manufacturing divisions: Tactical Gearwear & Precision Technical Accessories. Direct OEM & export catalogue from our Sialkot manufacturing complex."
        keywords="Safety Line, Gearwear, Tactical gloves, Golf gloves, Mechanics gloves, Performance accessories, Gymwear, Hoodies, Jackets, Tracksuits, Sialkot sports manufacturing"
        schema={portalSchema}
      />

      {/* Unified Architectural Top Navigation */}
      <SiteHeader
        variant="obsidian"
        onOpenInquiry={() => setIsInquiryModalOpen(true)}
        ctaLabel="OEM Spec Desk"
      />

      {/* =====================================================================
          HERO BAND: ASYMMETRIC EDITORIAL INDUSTRIAL GATEWAY (DARK OBSIDIAN)
          ===================================================================== */}
      <section className="bg-[#0E1A19] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Authority Typography & Insignia */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="lg:col-span-7 flex flex-col justify-between space-y-8"
            >
              <div className="space-y-6">
                {/* Clean Unboxed Typographic Eyebrow */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono uppercase tracking-[0.16em] text-white/60">
                  <span className="text-[#D92227] font-semibold">Est. 2008</span>
                  <span>/</span>
                  <span>Sialkot, Pakistan</span>
                  <span>/</span>
                  <span>ISO 9001:2015 Certified</span>
                </div>

                {/* Official Insignia + Primary Display Headline */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-sm bg-white p-2.5 flex items-center justify-center shrink-0 border border-white/15">
                    <img
                      src={safetylineLandingLogo}
                      alt="Safety Line Official Insignia"
                      className="w-full h-full object-contain"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                  <div>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-[-0.025em] leading-[1.04] text-white">
                      SAFETY <span className="text-[#D92227]">LINE</span>
                    </h1>
                    <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.18em] text-white/65 mt-2">
                      Leathercraft, Tactical Handwear &amp; Technical Apparel
                    </p>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-xl">
                  International manufacturer and direct exporter of specialized motorsport, athletic, tactical handwear and high-gauge active apparel—crafted by 90 full-time artisans in Sialkot.
                </p>

                {/* Clean Hairline Specialty Ticker */}
                <div className="py-3 border-y border-white/12 text-xs sm:text-sm font-mono text-white/90">
                  <RotatingText
                    prefix="Specialty:"
                    phrases={rotatingHeadlines}
                    interval={3600}
                    className="text-white"
                  />
                </div>
              </div>

              {/* Action Hierarchy: One Dominant Primary + Restrained Secondary Links */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInquiryModalOpen(true)}
                  className="px-6 py-3.5 rounded-sm bg-[#D92227] hover:bg-[#B5191D] text-white text-xs font-semibold uppercase tracking-[0.12em] inline-flex items-center gap-2 transition-colors duration-150 cursor-pointer whitespace-nowrap"
                >
                  <span>Request OEM Spec Pack</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/gearwear"
                  className="px-5 py-3.5 rounded-sm border border-white/25 hover:border-white text-white text-xs font-semibold uppercase tracking-[0.12em] inline-flex items-center gap-2 transition-colors duration-150 whitespace-nowrap"
                >
                  <span>Browse Gearwear</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/about"
                  className="px-3 py-3 text-xs font-mono uppercase tracking-wider text-white/65 hover:text-white underline underline-offset-4 transition-colors whitespace-nowrap"
                >
                  Company Profile
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Authentic Facility Photography */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="lg:col-span-5 flex flex-col"
            >
              <div className="relative flex-1 min-h-[280px] sm:min-h-[340px] lg:min-h-0 rounded-sm overflow-hidden border border-white/15 bg-[#122B29]">
                <img
                  src={factoryBg}
                  alt="Safety Line Industrial Manufacturing Facility, Sialkot"
                  className="w-full h-full object-cover object-[center_25%]"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E1A19] via-[#0E1A19]/75 to-transparent p-5 sm:p-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#D92227] font-semibold block">
                    Manufacturing Complex · Sialkot
                  </span>
                  <p className="text-sm font-medium text-white mt-1">
                    90 Full-Time Craftsmen · 70 Stitching Machines · Automated Press Cutting
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          UNBOXED MANUFACTURING PROOF LEDGER (FULL WIDTH HAIRLINE STRIP)
          ===================================================================== */}
      <section className="bg-white border-b border-[#E2DFD7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-[#E2DFD7]">
            <div className="lg:pr-8 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#525957] block">Global Supply</span>
              <span className="text-xl sm:text-2xl font-display font-bold text-[#141918] tabular-nums block">100% Export Ready</span>
              <span className="text-xs text-[#525957] block">Europe, North America &amp; Middle East</span>
            </div>
            <div className="lg:px-8 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#525957] block">Production Floor</span>
              <span className="text-xl sm:text-2xl font-display font-bold text-[#141918] tabular-nums block">90 Craftsmen</span>
              <span className="text-xs text-[#525957] block">Dedicated full-time leather &amp; knit team</span>
            </div>
            <div className="lg:px-8 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#525957] block">Catalogue Scope</span>
              <span className="text-xl sm:text-2xl font-display font-bold text-[#141918] tabular-nums block">14 Active Lines</span>
              <span className="text-xs text-[#525957] block">From FIA racing gloves to winter tracksuits</span>
            </div>
            <div className="lg:pl-8 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#525957] block">Compliance</span>
              <span className="text-xl sm:text-2xl font-display font-bold text-[#141918] tabular-nums block">ISO 9001:2015</span>
              <span className="text-xs text-[#525957] block">OEKO-TEX Standard 100 audited materials</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MAIN DUAL DIVISION GATEWAY: EDITORIAL GALLERY PANELS
          ===================================================================== */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E2DFD7] pb-6">
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#D92227] font-semibold block">
              Catalogue Architecture
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#141918] tracking-tight">
              Select a Manufacturing Division
            </h2>
          </div>
          <p className="text-sm text-[#525957] max-w-md">
            Each division houses dedicated specification catalogues, size matrices, and private-label customization options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* ==========================================================
              DIVISION 01: GEARWEAR DIVISION
              ========================================================== */}
          <section className="bg-white border border-[#E2DFD7] rounded-sm flex flex-col justify-between overflow-hidden">
            <div>
              {/* Studio Product Showcase Mosaic */}
              <div
                onClick={() => navigate('/gearwear')}
                className="cursor-pointer bg-[#F7F6F2] border-b border-[#E2DFD7] p-6 sm:p-8 group"
              >
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.14em] text-[#525957] mb-5">
                  <span className="text-[#D92227] font-semibold">Division 01 · Gearwear</span>
                  <span className="tabular-nums">{GEARWEAR_WINDOWS.length} Production Lines</span>
                </div>

                <div className="grid grid-cols-4 gap-3 items-center">
                  {[
                    { src: cg1Img, label: 'Racing' },
                    { src: gg1Img, label: 'Golf' },
                    { src: wg1Img, label: 'Work' },
                    { src: mg1Img, label: 'Mechanics' },
                  ].map((item) => (
                    <div key={item.label} className="bg-white border border-[#E2DFD7] rounded-sm aspect-square p-2.5 flex items-center justify-center">
                      <img
                        src={item.src}
                        alt={item.label}
                        className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Division Description & Direct Line Index */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#141918] tracking-tight">
                    Gearwear &amp; Tactical Handwear
                  </h3>
                  <p className="text-sm text-[#525957] leading-relaxed">
                    Precision-cut protective gloves and performance gear engineered for motorsport circuits, tour golf, heavy construction, automotive bays, marine angling, and strength sports.
                  </p>
                </div>

                {/* Clickable Production Windows Directory */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#525957] block font-semibold">
                    Direct Access by Production Line
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {GEARWEAR_WINDOWS.map((win) => (
                      <button
                        key={win.id}
                        type="button"
                        onClick={() => navigate(win.routePath)}
                        className="text-left px-3 py-2 rounded-sm bg-[#F7F6F2] hover:bg-[#122B29] text-[#141918] hover:text-white border border-[#E2DFD7] hover:border-[#122B29] text-xs font-medium transition-colors duration-150 truncate cursor-pointer"
                      >
                        {win.shortTitle}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Spec Baseline Row */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#ECE9E1] text-xs">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#525957] block">Leather</span>
                    <span className="font-semibold text-[#141918]">AAA Cabretta</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#525957] block">Protection</span>
                    <span className="font-semibold text-[#141918]">Nomex® &amp; Kevlar®</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#525957] block">Impact</span>
                    <span className="font-semibold text-[#141918]">Molded TPR</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-6 sm:pb-8">
              <Link
                id="enter-gearwear-btn"
                to="/gearwear"
                className="w-full py-3.5 px-6 rounded-sm bg-[#D92227] hover:bg-[#B5191D] text-white font-semibold text-xs uppercase tracking-[0.12em] inline-flex items-center justify-between transition-colors duration-150"
              >
                <span>Enter Gearwear Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* ==========================================================
              DIVISION 02: ACCESSORIES DIVISION
              ========================================================== */}
          <section className="bg-white border border-[#E2DFD7] rounded-sm flex flex-col justify-between overflow-hidden">
            <div>
              {/* Studio Product Showcase Mosaic */}
              <div
                onClick={() => navigate('/accessories')}
                className="cursor-pointer bg-[#F7F6F2] border-b border-[#E2DFD7] p-6 sm:p-8 group"
              >
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.14em] text-[#525957] mb-5">
                  <span className="text-[#122B29] font-semibold">Division 02 · Accessories</span>
                  <span className="tabular-nums">{ACCESSORIES_WINDOWS.length} Apparel Lines</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-[#E2DFD7] rounded-sm aspect-[16/9] overflow-hidden">
                    <img
                      src={jacketsCatImg}
                      alt="Weatherproof Technical Jackets"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-white border border-[#E2DFD7] rounded-sm aspect-[16/9] overflow-hidden">
                    <img
                      src={gymwearCatImg}
                      alt="Performance GymWear Sets"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Division Description & Direct Line Index */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#141918] tracking-tight">
                    Technical Apparel &amp; Accessories
                  </h3>
                  <p className="text-sm text-[#525957] leading-relaxed">
                    Precision athletic gymwear, moisture-wicking micro-knit t-shirts, weather-sealed storm jackets, heavyweight fleece hoodies, and dual-season summer &amp; winter tracksuits.
                  </p>
                </div>

                {/* Clickable Production Windows Directory */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#525957] block font-semibold">
                    Direct Access by Apparel Line
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ACCESSORIES_WINDOWS.map((win) => (
                      <button
                        key={win.id}
                        type="button"
                        onClick={() => navigate(win.routePath)}
                        className="text-left px-3 py-2 rounded-sm bg-[#F7F6F2] hover:bg-[#122B29] text-[#141918] hover:text-white border border-[#E2DFD7] hover:border-[#122B29] text-xs font-medium transition-colors duration-150 truncate cursor-pointer"
                      >
                        {win.shortTitle}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Spec Baseline Row */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#ECE9E1] text-xs">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#525957] block">Knitting</span>
                    <span className="font-semibold text-[#141918]">High-Gauge 3D</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#525957] block">Warmth</span>
                    <span className="font-semibold text-[#141918]">Brushed Fleece</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#525957] block">Moisture</span>
                    <span className="font-semibold text-[#141918]">Capillary Matrix</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-6 sm:pb-8">
              <Link
                id="enter-accessories-btn"
                to="/accessories"
                className="w-full py-3.5 px-6 rounded-sm bg-[#122B29] hover:bg-[#0E1A19] text-white font-semibold text-xs uppercase tracking-[0.12em] inline-flex items-center justify-between transition-colors duration-150"
              >
                <span>Enter Accessories Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>

        {/* Bottom Architectural OEM Callout Strip */}
        <section className="bg-white border border-[#E2DFD7] rounded-sm p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-[#D92227] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Private Label &amp; Export Sourcing</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#141918]">
              Looking for Custom Team Kits, Packaging, or Material Swatches?
            </h3>
            <p className="text-sm text-[#525957]">
              Submit your specifications directly to our Sialkot manufacturing desk for custom embroidery, woven labels, blister packaging, and wholesale lead times.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsInquiryModalOpen(true)}
              className="px-5 py-3 rounded-sm bg-[#D92227] hover:bg-[#B5191D] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
            >
              Launch Spec Request
            </button>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="px-5 py-3 rounded-sm border border-[#E2DFD7] hover:border-[#141918] text-[#141918] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
            >
              Direct Directory
            </button>
          </div>
        </section>
      </main>

      {/* Unified Footer */}
      <Footer settings={settings} />

      <InquiryLoadingModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        settings={settings}
      />
    </div>
  );
}
