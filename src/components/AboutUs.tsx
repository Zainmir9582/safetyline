import { useState } from 'react';
import { 
  Building2, 
  Copy, 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Compass, 
  Cpu, 
  Layers, 
  ArrowRight, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Sparkles, 
  Clock, 
  Truck, 
  Scale, 
  Globe2,
  FileText,
  ChevronDown
} from 'lucide-react';
import { Settings } from '../types';
import { navigate } from '../lib/router';
import SEO from './SEO';
import factoryImg from '../assets/images/safetyline_exact_user_pic_1788337630939.jpg';
import brandLogo from '../assets/images/safetyline_landing.png';

interface AboutUsProps {
  settings: Settings;
}

export default function AboutUs({ settings }: AboutUsProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'infrastructure' | 'qc' | 'oem' | 'logistics'>('overview');

  const handleCopyProfile = () => {
    const profileSummary = `
SAFETY LINE IND — OFFICIAL COMPANY PROFILE
==================================================
Legal Entity: Safety Line Ind
Established: 2012
Headquarters & Plant: Safety Line Industrial Complex, Sialkot, Punjab, Pakistan
Business Nature: Direct OEM / ODM Manufacturer & Global Exporter
Key Products:
  1. High-Performance Athletic Gearwear (compression tops, baselayers, shorts, stormshells)
  2. Technical Accessories & Precision Knitted Compression Hosiery (graduated socks, calf sleeves, joint supports)
Monthly Production Capacity: 150,000+ Units
Sampling Turnaround: 7 - 10 Business Days
Bulk Delivery: 2 - 4 Weeks
Audited Standards: ISO 9001:2015 Certified, OEKO-TEX Standard 100 Material Compliance
Export Markets: EU (Germany, UK, France, Italy), USA, Canada, UAE, Australia
Direct Contact: +92 3040000445 | safetylineind@gmail.com
Website: https://safetylineind.com
==================================================
    `.trim();

    navigator.clipboard.writeText(profileSummary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const manufacturingSteps = [
    {
      step: '01',
      title: 'Optical Filament Scanning',
      desc: 'High-precision optical sensors verify raw yarn cones for micron-level diameter uniformity and tensile consistency before automated knitting.'
    },
    {
      step: '02',
      title: 'Computerized 3D Knitting',
      desc: 'Italian Santoni multi-gauge seamless circular cylinders and 400-needle looms weave tubular profiles with zoned graduated compression.'
    },
    {
      step: '03',
      title: 'Precision Seam Finishing',
      desc: 'Specialized 4-needle 6-thread flatlock stitching technicians link toe closures, waistband anchors, and anti-slip silicone grip bands.'
    },
    {
      step: '04',
      title: 'Multi-Cycle Stress Testing',
      desc: 'Completed production blocks undergo mechanical tensile fatigue testing, colorfast friction analysis, and ISO 9001 inline inspection.'
    }
  ];

  const coreValues = [
    {
      icon: <Award className="w-6 h-6 text-[#FF5A36]" />,
      title: 'Precision Biomechanical Knits',
      text: 'Calculated stitch density and elastomeric tension mappings designed for targeted muscular stabilization, vascular support, and unrestricted motion.'
    },
    {
      icon: <Compass className="w-6 h-6 text-[#FF5A36]" />,
      title: 'Traceable Premium Fiber Sourcing',
      text: 'All raw fibers are 100% traceable. From premium combed cotton and high-tenacity polyamides to dynamic Lycra elastane and soft merino wools.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#FF5A36]" />,
      title: 'Audited Quality Standards',
      text: 'Full adherence to ISO 9001:2015 quality management procedures and OEKO-TEX Standard 100 non-toxic, skin-safe certification protocols.'
    }
  ];

  const executiveProfileData = [
    { label: 'Company Name', value: 'Safety Line Ind', highlight: true },
    { label: 'Year Established', value: '2012 (14+ Years of Industry Experience)' },
    { label: 'Factory Location', value: 'Safety Line Industrial Complex, Sialkot, Pakistan' },
    { label: 'Business Type', value: 'Direct OEM / ODM Manufacturer & Exporter' },
    { label: 'Monthly Production Capacity', value: '150,000+ Units across Apparel & Accessories', highlight: true },
    { label: 'Minimum Order Quantity (MOQ)', value: 'Flexible tiers (from 50 units for custom prototypes)' },
    { label: 'Sample Turnaround Time', value: '7 – 10 Business Days' },
    { label: 'Bulk Order Lead Time', value: '2 – 4 Weeks (Express Logistics)' },
    { label: 'Audited Standards', value: 'ISO 9001:2015 Certified, OEKO-TEX Standard 100', highlight: true },
    { label: 'Major Export Destinations', value: 'USA, Germany, UK, France, Italy, UAE, Australia, Canada' },
    { label: 'Direct Management Hotline', value: '+92 3040000445 (Voice & WhatsApp)' },
    { label: 'Official Inquiries Email', value: 'safetylineind@gmail.com / safetylineindustries@gmail.com' }
  ];

  return (
    <div id="about-us-container" className="bg-[#FAFCFB] min-h-screen pt-20 pb-24 font-sans text-[#1A1A1A]">
      
      {/* Sticky Top Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B3D3B] text-white py-3.5 px-4 sm:px-8 border-b border-white/10 shadow-lg shadow-[#0B3D3B]/20 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <img 
              src={brandLogo} 
              alt="Safety Line Logo" 
              className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex items-baseline space-x-1.5">
              <span className="font-display font-black text-sm uppercase tracking-wider">
                <span className="text-[#EA2227]">SAFETY</span> <span className="text-white">LINE</span>
              </span>
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-[#D9F0EC] font-bold">
                Profile
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 text-xs font-mono uppercase tracking-wider">
            <button
              onClick={() => navigate('/')}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              Portal
            </button>
            <button
              onClick={() => navigate('/gearwear')}
              className="hover:text-[#FF5A36] text-white/90 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer hidden sm:inline"
            >
              Gearwear
            </button>
            <button
              onClick={() => navigate('/accessories')}
              className="hover:text-[#D9F0EC] text-white/90 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer hidden sm:inline"
            >
              Accessories
            </button>
            <button
              onClick={() => scrollToSection('company-profile')}
              className="bg-[#D9F0EC] hover:bg-white text-[#0B3D3B] px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer inline-flex items-center gap-1 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Company Profile</span>
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-[#FF5A36] hover:bg-[#e44e2b] text-white px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer inline-flex items-center gap-1 shadow-md shadow-[#FF5A36]/30"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Contact Desk</span>
            </button>
          </div>
        </div>
      </header>

      <SEO 
        title="Company Profile & About Us | Safety Line Ind Sialkot"
        description="Official Company Profile of Safety Line Ind. Direct OEM/ODM manufacturer of high-performance athletic gearwear and precision knitted accessories in Sialkot, Pakistan. ISO 9001:2015 certified."
        keywords="Safety Line Ind company profile, sports apparel manufacturer Sialkot, athletic gearwear factory, compression accessories OEM, ISO 9001 certified Pakistan factory"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-6">
        
        {/* Breadcrumbs & Quick Anchor */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500 print:hidden">
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate('/')} className="hover:text-[#0B3D3B] transition-colors cursor-pointer">Portal</button>
            <span>/</span>
            <span className="text-slate-400">About</span>
            <span>/</span>
            <span className="text-[#0B3D3B] font-bold">Company Profile</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToSection('company-profile')}
              className="inline-flex items-center gap-1.5 text-[#0B3D3B] hover:text-[#FF5A36] font-bold transition-colors cursor-pointer bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-md text-[11px]"
            >
              <span>Jump to Company Profile</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Top Announcement Bar: Customer Notice */}
        <div className="bg-gradient-to-r from-[#0B3D3B] to-[#072725] text-white p-5 sm:p-6 rounded-2xl shadow-md border border-[#0B3D3B]/40 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <div className="flex items-center space-x-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#FF5A36] text-white flex items-center justify-center shrink-0 shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#D9F0EC] uppercase font-bold block">
                Official Manufacturer Credentials
              </span>
              <h2 className="font-display text-base sm:text-lg font-bold text-white">
                Safety Line Ind — Complete Industrial Company Profile
              </h2>
              <p className="text-xs text-slate-300 font-normal mt-0.5">
                Detailed below for international buyers, sports brands, athletic clubs, and sourcing agents.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => scrollToSection('company-profile')}
              className="bg-[#FF5A36] hover:bg-[#e44e2b] text-white text-xs font-mono font-bold px-4 py-2 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-md shadow-[#FF5A36]/30"
            >
              <span>View Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span>Athletic Manufacturing Heritage</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#0B3D3B] tracking-tight">
            About Safety Line Ind
          </h1>
          <p className="text-slate-600 font-normal text-base sm:text-lg leading-relaxed">
            Direct industrial manufacturer uniting high-compression aerodynamic performance wear with precision-knitted technical accessories and medical/athletic compression hosiery.
          </p>
        </div>

        {/* Corporate Story & Genuine Factory Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#D9F0EC] text-[#0B3D3B] text-[10px] font-mono font-bold uppercase tracking-wider">
              <span>Established in 2012 • Sialkot, Pakistan</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B3D3B] tracking-tight">
              A Decade of Precision Textile Engineering
            </h2>
            <p className="text-slate-700 font-normal leading-relaxed text-base">
              {settings.aboutText}
            </p>
            <p className="text-slate-600 font-normal leading-relaxed text-sm">
              Headquartered at our purpose-built industrial complex in Sialkot, Pakistan, Safety Line Ind operates computerized circular knitting machines, laser pattern cutting beds, and specialized flatlock linking stations to manufacture export-grade sportswear and technical accessories for prestigious athletic brands, clubs, and retailers worldwide.
            </p>
            
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-200">
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-[#0B3D3B] font-display">2012</span>
                <span className="text-[11px] text-slate-500 font-mono uppercase font-semibold">Established</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-[#0B3D3B] font-display">150K+</span>
                <span className="text-[11px] text-slate-500 font-mono uppercase font-semibold">Monthly Units</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-[#0B3D3B] font-display">ISO 9001</span>
                <span className="text-[11px] text-slate-500 font-mono uppercase font-semibold">Audited Quality</span>
              </div>
            </div>
          </div>

          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl relative border-4 border-white bg-slate-900 group">
            <img
              src={factoryImg}
              alt="Safety Line Industrial Manufacturing Facility and Showroom, Sialkot, Pakistan"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D9F0EC] block font-bold">
                  Direct Manufacturing Plant
                </span>
                <span className="text-xs sm:text-sm font-semibold">
                  Safety Line Industrial Complex, Sialkot, Pakistan
                </span>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#25D366] text-[10px] font-mono text-white font-bold tracking-wider uppercase">
                Active Factory
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            OFFICIAL COMPANY PROFILE SECTION (Properly Visible For Customers)
           ========================================================================= */}
        <section 
          id="company-profile" 
          className="scroll-mt-24 bg-white rounded-3xl border-2 border-[#0B3D3B]/20 shadow-xl overflow-hidden space-y-8"
        >
          {/* Header Banner */}
          <div className="bg-[#0B3D3B] text-white p-6 sm:p-10 border-b border-white/10 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#D9F0EC] text-[#0B3D3B] text-[11px] font-mono font-bold uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5 text-[#FF5A36]" />
                  <span>Official Corporate Dossier</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Official Company Profile
                </h2>
                <p className="text-[#D9F0EC]/90 text-sm font-normal leading-relaxed">
                  Safety Line Ind — Complete corporate profile, manufacturing capacities, equipment overview, quality standards, and export supply credentials for commercial clients.
                </p>
              </div>

              {/* Action Buttons for Customer */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0 print:hidden">
                <button
                  onClick={handleCopyProfile}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 border border-white/15"
                  title="Copy Company Summary to Clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
                </button>

                <button
                  onClick={() => navigate('/contact')}
                  className="bg-[#FF5A36] hover:bg-[#e44e2b] text-white text-xs font-mono font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-md shadow-[#FF5A36]/30"
                >
                  <span>Inquire Directly</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-10">
            
            {/* Executive Fact Sheet Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-xl text-[#0B3D3B] flex items-center gap-2">
                  <Scale className="w-5 h-5 text-[#FF5A36]" />
                  <span>Executive Corporate Credentials</span>
                </h3>
                <span className="text-xs font-mono text-slate-500 uppercase font-semibold">
                  Verified Manufacturing Entity
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {executiveProfileData.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-xl border transition-all ${
                      item.highlight 
                        ? 'bg-[#D9F0EC]/25 border-[#0B3D3B]/30 shadow-xs' 
                        : 'bg-slate-50/70 border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider block mb-1">
                      {item.label}
                    </span>
                    <span className={`text-xs sm:text-sm font-medium block ${
                      item.highlight ? 'text-[#0B3D3B] font-bold' : 'text-slate-800'
                    }`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Navigation Tabs */}
            <div className="border-b border-slate-200 print:hidden">
              <div className="flex flex-wrap gap-2 sm:gap-4 -mb-px text-xs font-mono uppercase tracking-wider font-bold">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-3 px-2 sm:px-3 border-b-2 transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                    activeTab === 'overview'
                      ? 'border-[#FF5A36] text-[#FF5A36]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Divisions & Scope</span>
                </button>
                <button
                  onClick={() => setActiveTab('infrastructure')}
                  className={`pb-3 px-2 sm:px-3 border-b-2 transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                    activeTab === 'infrastructure'
                      ? 'border-[#FF5A36] text-[#FF5A36]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Plant Machinery</span>
                </button>
                <button
                  onClick={() => setActiveTab('qc')}
                  className={`pb-3 px-2 sm:px-3 border-b-2 transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                    activeTab === 'qc'
                      ? 'border-[#FF5A36] text-[#FF5A36]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Quality Protocols</span>
                </button>
                <button
                  onClick={() => setActiveTab('oem')}
                  className={`pb-3 px-2 sm:px-3 border-b-2 transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                    activeTab === 'oem'
                      ? 'border-[#FF5A36] text-[#FF5A36]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>OEM & Private Label</span>
                </button>
                <button
                  onClick={() => setActiveTab('logistics')}
                  className={`pb-3 px-2 sm:px-3 border-b-2 transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                    activeTab === 'logistics'
                      ? 'border-[#FF5A36] text-[#FF5A36]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Export & Shipping</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Divisions & Scope */}
            {(activeTab === 'overview' || typeof window === 'undefined') && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Division 1 */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-[#FF5A36] text-white text-xs font-mono font-bold uppercase">
                        <span>Division 01</span>
                      </div>
                      <span className="text-xs font-mono text-[#FF5A36] font-bold">Athletic Apparel</span>
                    </div>
                    <h4 className="font-display font-bold text-xl text-[#0B3D3B]">
                      High-Performance Athletic Gearwear
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Engineered for intense training, endurance athletics, and competitive team wear. Manufactured with body-mapped zoned compression, moisture-wicking capillary channels, and high-tenacity yarns.
                    </p>
                    <div className="pt-2 border-t border-slate-200 space-y-2">
                      <span className="text-[11px] font-mono text-slate-500 uppercase font-bold block">Key Garment Offerings:</span>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                        <li>Aerodynamic High-Compression Tops & Baselayers (Long & Short Sleeve)</li>
                        <li>Thermal Wind-Resistant Quarter-Zips & Insulated Training Hoodies</li>
                        <li>Waterproof Breathable Stormshells & Running Jackets</li>
                        <li>4-Way Stretch Athletic Training Shorts & Compression Spats</li>
                        <li>Sublimated Team Uniforms & Private Label Activewear</li>
                      </ul>
                    </div>
                  </div>

                  {/* Division 2 */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-[#0B3D3B] text-white text-xs font-mono font-bold uppercase">
                        <span>Division 02</span>
                      </div>
                      <span className="text-xs font-mono text-[#0B3D3B] font-bold">Precision Hosiery</span>
                    </div>
                    <h4 className="font-display font-bold text-xl text-[#0B3D3B]">
                      Technical Accessories & Performance Hosiery
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Precision-knitted technical accessories, graduated compression socks, anatomical joint sleeves, and fine luxury hosiery crafted with microfibers, long-staple cotton, and organic blends.
                    </p>
                    <div className="pt-2 border-t border-slate-200 space-y-2">
                      <span className="text-[11px] font-mono text-slate-500 uppercase font-bold block">Key Accessory Offerings:</span>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                        <li>Graduated Vascular Compression Socks (15-20 mmHg & 20-30 mmHg)</li>
                        <li>Anatomical Calf & Knee Elastic Compression Sleeves</li>
                        <li>Anti-Blister Running Socks with Ribbed Arch Stabilization</li>
                        <li>Fine Microfiber & Pure Silk Stay-Up Legwear with Non-Slip Silicone Bands</li>
                        <li>Merino Wool Thermal Outdoor Performance Socks</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Plant Machinery */}
            {activeTab === 'infrastructure' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D9F0EC] text-[#0B3D3B] flex items-center justify-center font-bold">
                      01
                    </div>
                    <h4 className="font-display font-bold text-base text-[#0B3D3B]">Seamless Circular Cylinders</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Italian Santoni high-speed seamless circular knitting machines capable of weaving tubular garments with dynamic GSM zoning and zero side seams.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D9F0EC] text-[#0B3D3B] flex items-center justify-center font-bold">
                      02
                    </div>
                    <h4 className="font-display font-bold text-base text-[#0B3D3B]">400-Needle Sock Looms</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Computerized high-cylinder sock knitting units offering ultra-dense 400-needle weaves for snag-resistant durability and pinpoint anatomical compression.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D9F0EC] text-[#0B3D3B] flex items-center justify-center font-bold">
                      03
                    </div>
                    <h4 className="font-display font-bold text-base text-[#0B3D3B]">Automated Laser Cutters</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      High-precision computer-guided laser cutting tables achieving 98.4% fabric utilization and perfectly sealed raw edges preventing fabric fraying.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D9F0EC] text-[#0B3D3B] flex items-center justify-center font-bold">
                      04
                    </div>
                    <h4 className="font-display font-bold text-base text-[#0B3D3B]">Flatlock Stitching Arrays</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      4-needle 6-thread flatlock assembly machines producing ultra-flat, flexible, chafe-free seams that stretch with high muscular extension.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D9F0EC] text-[#0B3D3B] flex items-center justify-center font-bold">
                      05
                    </div>
                    <h4 className="font-display font-bold text-base text-[#0B3D3B]">Silicone Grip Applicators</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Automated liquid silicone dot and wave coating heads applying skin-safe, hypoallergenic stay-up bands to cuffs, waistbands, and sock tops.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D9F0EC] text-[#0B3D3B] flex items-center justify-center font-bold">
                      06
                    </div>
                    <h4 className="font-display font-bold text-base text-[#0B3D3B]">Clean-Room Packaging Lab</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Dedicated humidity-controlled packaging zone with UV disinfection, barcoding stations, and individual export polybag sealing.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Quality Protocols */}
            {activeTab === 'qc' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="inline-flex items-center gap-2 text-emerald-700 text-xs font-mono font-bold uppercase">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>ISO 9001:2015 Audited System</span>
                    </div>
                    <h4 className="font-display font-bold text-lg text-[#0B3D3B]">4-Stage In-Line Quality Verification</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Every production run is audited through 4 stringent checkpoints:
                    </p>
                    <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside pt-1">
                      <li><strong>Incoming Yarn Verification:</strong> Optical diameter scanning and tensile test per cone.</li>
                      <li><strong>On-Loom Inspection:</strong> Continuous automated sensor monitoring for skipped stitches.</li>
                      <li><strong>Post-Assembly Seam Integrity:</strong> High-tension seam stretch and burst pressure testing.</li>
                      <li><strong>Final AQL 2.5 Inspection:</strong> Comprehensive dimensional, visual, and packaging audit before carton sealing.</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="inline-flex items-center gap-2 text-emerald-700 text-xs font-mono font-bold uppercase">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>OEKO-TEX Standard 100 Material Compliance</span>
                    </div>
                    <h4 className="font-display font-bold text-lg text-[#0B3D3B]">Non-Toxic & Skin-Safe Certification</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our manufacturing protocols comply with international environmental and health standards:
                    </p>
                    <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside pt-1">
                      <li>Free from heavy metals, formaldehyde, phthalates, and banned azo colorants.</li>
                      <li>Hypoallergenic certified skin-contact silicone stay-up formulations.</li>
                      <li>Grade-4+ colorfastness to sweat, friction, and commercial laundering.</li>
                      <li>Eco-friendly low-impact dyeing methods reducing water consumption.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: OEM & Private Label */}
            {activeTab === 'oem' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase text-[#FF5A36] font-bold tracking-wider">
                      Turnkey Manufacturing Solutions
                    </span>
                    <h4 className="font-display font-bold text-2xl text-[#0B3D3B]">
                      Custom OEM & Private Label Services
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                      We help international athletic brands, athletic wear startups, gym franchises, and corporate clients launch bespoke collections with end-to-end design and manufacturing support.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-mono text-[#0B3D3B] font-bold uppercase">01. Custom Yarns</span>
                      <p className="text-xs text-slate-600">Polyamide, Elastane, Organic Cotton, Merino Wool & Recycled Fibers.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-mono text-[#0B3D3B] font-bold uppercase">02. Bespoke Branding</span>
                      <p className="text-xs text-slate-600">Heat-transfer reflective logos, jacquard waistbands, and woven brand labels.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-mono text-[#0B3D3B] font-bold uppercase">03. Custom Packaging</span>
                      <p className="text-xs text-slate-600">Retail display boxes, branded polybags, FSC paper hangtags, and EAN/UPC barcodes.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-mono text-[#0B3D3B] font-bold uppercase">04. Rapid Sampling</span>
                      <p className="text-xs text-slate-600">7 to 10 business days for complete physical counter-samples and sizing sets.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Export & Shipping */}
            {activeTab === 'logistics' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center space-x-2 text-[#0B3D3B]">
                      <Globe2 className="w-5 h-5 text-[#FF5A36]" />
                      <h4 className="font-display font-bold text-lg">Worldwide Export Logistics</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Safety Line Ind ships directly from Sialkot to global commercial hubs:
                    </p>
                    <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside">
                      <li><strong>Air Freight via Sialkot International Airport (SKT):</strong> Express delivery within 3 – 5 business days via DHL, FedEx, UPS, or direct airline cargo.</li>
                      <li><strong>Ocean Freight via Sialkot Dry Port / Port Qasim / Karachi:</strong> Cost-effective full container load (FCL) and less-than-container load (LCL) shipments (2–4 weeks transit).</li>
                      <li><strong>Trade Terms:</strong> FOB, CIF, CFR, DDP, and Ex-Works available per client requirement.</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center space-x-2 text-[#0B3D3B]">
                      <FileText className="w-5 h-5 text-[#FF5A36]" />
                      <h4 className="font-display font-bold text-lg">Full Customs Documentation</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Every commercial export shipment includes complete customs clearance paperwork:
                    </p>
                    <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside">
                      <li>Commercial Invoice & Itemized Packing List</li>
                      <li>Certificate of Origin (Chamber of Commerce Sialkot)</li>
                      <li>State Bank of Pakistan Form E clearance</li>
                      <li>Bill of Lading (Ocean) or Airway Bill (AWB)</li>
                      <li>Material Safety & OEKO-TEX declarations</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Direct Factory Contact Details Card */}
            <div className="bg-[#0B3D3B] text-white p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center md:text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D9F0EC] font-bold">
                  Direct Inquiries & Manufacturing Desk
                </span>
                <h4 className="font-display font-bold text-xl text-white">
                  Have a Manufacturing or Sourcing Requirement?
                </h4>
                <p className="text-xs text-slate-300">
                  Connect directly with factory management via WhatsApp or email for instant pricing and sampling details.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Safety%20Line%20Management,%20I%20reviewed%20your%20Company%20Profile%20and%20would%20like%20to%20inquire%20about%20manufacturing.`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="bg-[#25D366] hover:bg-[#1ebe5d] text-white font-mono font-bold text-xs px-4 py-3 rounded-xl transition-all inline-flex items-center gap-2 shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>WhatsApp (+92 3040000445)</span>
                </a>
                <button
                  onClick={() => navigate('/contact')}
                  className="bg-[#FF5A36] hover:bg-[#e44e2b] text-white font-mono font-bold text-xs px-4 py-3 rounded-xl transition-all inline-flex items-center gap-2 shadow-md shadow-[#FF5A36]/30 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Form & RFQ</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Manufacturing Process Timeline */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#D9F0EC] text-[#0B3D3B] text-[10px] font-mono font-bold uppercase tracking-wider">
              <span>Technical Operations</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B3D3B] tracking-tight">
              Our 4-Stage Manufacturing Protocol
            </h2>
            <p className="text-slate-600 font-normal text-sm">
              How technical polymers and fine spun fibers are transformed into high-performance certified garments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {manufacturingSteps.map((m) => (
              <div key={m.step} className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="font-display font-black text-3xl text-[#FF5A36] block">
                    {m.step}
                  </span>
                  <h3 className="font-display font-bold text-base text-[#0B3D3B]">
                    {m.title}
                  </h3>
                  <p className="text-slate-600 font-normal text-xs leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="bg-[#D9F0EC] text-[#0B3D3B] p-3 rounded-xl inline-block">
              <Compass className="w-6 h-6 text-[#FF5A36]" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#0B3D3B]">
              Our Athletic Mission
            </h3>
            <p className="text-slate-600 font-normal leading-relaxed text-sm">
              To equip active individuals, sports clubs, and international brands with dynamic, multi-directional compression apparel while crafting exquisite, durable accessories. We turn technical fibers into durable tools of peak daily performance.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="bg-[#D9F0EC] text-[#0B3D3B] p-3 rounded-xl inline-block">
              <Cpu className="w-6 h-6 text-[#FF5A36]" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#0B3D3B]">
              Our Sustainable Vision
            </h3>
            <p className="text-slate-600 font-normal leading-relaxed text-sm">
              We are actively developing recycled high-tenacity polyamides and organic plant-derived filaments to ensure circular lifecycle standards while preserving uncompromising athletic resilience.
            </p>
          </div>
        </div>

        {/* Brand Values */}
        <div className="bg-[#0B3D3B] text-white p-8 sm:p-14 rounded-3xl space-y-10 relative overflow-hidden">
          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D9F0EC]/15 text-[#D9F0EC] text-xs font-mono font-bold uppercase tracking-wider border border-[#D9F0EC]/20">
              <span>Core Pillars</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Our Core Design Values
            </h2>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreValues.map((v, idx) => (
              <div key={idx} className="space-y-3 bg-[#072725] p-7 rounded-2xl border border-white/10">
                <div className="bg-[#D9F0EC]/15 p-3 rounded-xl inline-block">
                  {v.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  {v.title}
                </h3>
                <p className="text-white/80 font-normal text-xs leading-relaxed">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Explore Divisions */}
        <div className="bg-white border-2 border-slate-200 p-8 sm:p-12 rounded-3xl text-center max-w-4xl mx-auto space-y-6 shadow-sm print:hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold uppercase">
            <span>Explore Digital Catalogues</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B3D3B]">
            Discover Our Complete Product Lines
          </h2>
          <p className="text-slate-600 text-sm max-w-lg mx-auto">
            Browse our specialized gearwear and technical accessories catalogues, or submit your custom OEM specifications to our team.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/gearwear')}
              className="bg-[#FF5A36] hover:bg-[#e44e2b] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Explore Gearwear
            </button>
            <button
              onClick={() => navigate('/accessories')}
              className="bg-[#0B3D3B] hover:bg-[#072725] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Explore Accessories
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-slate-100 hover:bg-slate-200 text-[#0B3D3B] font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all border border-slate-300 cursor-pointer"
            >
              Contact Wholesale Desk
            </button>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-8 px-4 sm:px-8 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#FF5A36]" />
            <span>Safety Line Ind • Textile Engineering & Technical Accessories • Sialkot, Pakistan</span>
          </div>
          <div className="flex items-center space-x-4 uppercase font-bold">
            <button onClick={() => navigate('/')} className="hover:text-[#0B3D3B] transition-colors cursor-pointer">Portal</button>
            <button onClick={() => navigate('/gearwear')} className="hover:text-[#FF5A36] transition-colors cursor-pointer">Gearwear</button>
            <button onClick={() => navigate('/accessories')} className="hover:text-[#0B3D3B] transition-colors cursor-pointer">Accessories</button>
            <button onClick={() => scrollToSection('company-profile')} className="hover:text-[#FF5A36] transition-colors cursor-pointer">Company Profile</button>
            <button onClick={() => navigate('/contact')} className="hover:text-[#0B3D3B] transition-colors cursor-pointer">Contact Us</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
