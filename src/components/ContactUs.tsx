import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  MessageCircle,
  Instagram,
  Facebook,
  ExternalLink,
  Building2,
  FileCheck,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { Settings } from '../types';
import { navigate } from '../lib/router';
import SEO from './SEO';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import InquiryLoadingModal from './InquiryLoadingModal';

interface ContactUsProps {
  settings: Settings;
}

export default function ContactUs({ settings }: ContactUsProps) {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const personalEmail = settings.companyPersonalEmail || 'safetylineindustriesofficial@gmail.com';
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Safety Line Advisory Desk, I am inquiring regarding wholesale orders and technical specifications.'
  )}`;

  return (
    <div id="contact-us-container" className="bg-[#F7F6F2] min-h-screen font-sans text-[#141918] flex flex-col">
      <SEO
        title="Contact Us & Corporate Advisory Desk | Safety Line"
        description="Get in touch with Safety Line corporate offices and advisory desk for wholesale inquiries, custom team kits, and performance catalogue distribution."
        keywords="Safety Line contact, athletic gearwear inquiry, custom sportswear order, wholesale accessories distribution, performance textiles"
      />

      <SiteHeader
        variant="obsidian"
        ctaLabel="Launch Spec Desk"
        onOpenInquiry={() => setIsInquiryModalOpen(true)}
      />

      {/* Obsidian Advisory Hero & Spec Desk Banner */}
      <section className="bg-[#0E1A19] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-8">
          <div className="flex items-center gap-2 text-xs font-mono text-white/50">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors cursor-pointer">
              Portal
            </button>
            <span>/</span>
            <span className="text-white">Contact &amp; Advisory Desk</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#D92227]">
                Corporate Headquarters &amp; Advisory Desk
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05]">
                Connect With Our Specialists
              </h1>
              <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-2xl">
                Direct channels for wholesale stockists, team kit specifications, custom OEM/ODM manufacturing, and product sample requests.
              </p>
            </div>

            {/* Technical Spec Dispatch Strip */}
            <div className="lg:col-span-5 bg-white/5 border border-white/15 rounded-sm p-6 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#D92227] font-semibold block">
                  Instant Technical Dispatch System
                </span>
                <h2 className="font-display font-bold text-lg text-white">
                  Official OEM &amp; Sample Specification Desk
                </h2>
                <p className="text-xs text-white/70 leading-relaxed">
                  Generate certified laboratory tolerances, CAD patterns, and sample swatch dispatch records in real time.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsInquiryModalOpen(true)}
                className="w-full sm:w-auto bg-[#D92227] hover:bg-[#B5191D] text-white font-mono font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Launch Interactive Spec Desk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Direct Corporate Channels */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#0E1A19] text-white p-7 sm:p-8 rounded-sm border border-white/10 space-y-6">
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#D92227] font-semibold block">
                    Executive Headquarters &amp; Plant
                  </span>
                  <h2 className="font-display text-2xl font-extrabold tracking-tight text-white">
                    Safety Line Industries
                  </h2>
                  <p className="text-white/70 text-xs leading-relaxed">
                    Materials laboratory, manufacturing complex, and showroom open to international stockists and OEM partners.
                  </p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/65 border border-white/15 px-2.5 py-1 rounded-sm shrink-0">
                  Direct Desk
                </span>
              </div>

              {/* Clean Hairline Directory List */}
              <div className="divide-y divide-white/10 text-xs font-mono">
                <div className="py-3.5 first:pt-0 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D92227] mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <span className="text-[10px] text-white/50 uppercase block">Factory &amp; Showroom</span>
                    <span className="leading-relaxed text-white block">{settings.officeAddress}</span>
                    {settings.googleMapsUrl && (
                      <a
                        href={settings.googleMapsUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="inline-flex items-center gap-1 text-[11px] text-white/85 hover:text-white underline underline-offset-4 mt-0.5"
                      >
                        <span>Open on Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="py-3.5 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D92227] shrink-0" />
                  <div>
                    <span className="text-[10px] text-white/50 uppercase block">Direct Phone / WhatsApp</span>
                    <a
                      href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`}
                      className="text-white hover:underline font-semibold tabular-nums"
                    >
                      {settings.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="py-3.5 flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D92227] shrink-0" />
                  <div>
                    <span className="text-[10px] text-white/50 uppercase block">General Inquiries</span>
                    <a href={`mailto:${settings.contactEmail}`} className="text-white hover:underline break-all">
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>

                {settings.salesEmail && (
                  <div className="py-3.5 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-white/50 shrink-0" />
                    <div>
                      <span className="text-[10px] text-white/50 uppercase block">Sales &amp; Wholesale Desk</span>
                      <a href={`mailto:${settings.salesEmail}`} className="text-white hover:underline break-all">
                        {settings.salesEmail}
                      </a>
                    </div>
                  </div>
                )}

                <div className="py-3.5 flex items-center gap-3">
                  <Mail className="w-4 h-4 text-white shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] text-white/50 uppercase block">
                      Company Personal Mail · Executive
                    </span>
                    <a
                      href={`mailto:${personalEmail}`}
                      className="text-white hover:underline font-semibold break-all"
                    >
                      {personalEmail}
                    </a>
                  </div>
                </div>

                <div className="py-3.5 last:pb-0 flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#D92227] shrink-0" />
                  <div>
                    <span className="text-[10px] text-white/50 uppercase block">Operating Hours</span>
                    <span className="text-white/85">{settings.businessHours}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Concierge CTA & Social Row */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#D92227] hover:bg-[#B5191D] text-white font-mono font-bold text-xs tracking-wider uppercase py-3.5 px-4 rounded-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp Advisory Desk</span>
                </a>

                <div>
                  <span className="block text-[10px] font-mono text-white/50 uppercase tracking-wider mb-2">
                    Official Social Channels
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {settings.instagramGearwear && (
                      <a
                        href={settings.instagramGearwear}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="flex items-center justify-between border border-white/15 hover:border-white/40 px-3 py-2 rounded-sm transition-colors text-white/85 hover:text-white"
                      >
                        <span className="inline-flex items-center gap-2 truncate">
                          <Instagram className="w-3.5 h-3.5 shrink-0" />
                          <span className="text-[11px] truncate">IG: Gearwear</span>
                        </span>
                        <ArrowUpRight className="w-3 h-3 shrink-0 text-white/50" />
                      </a>
                    )}
                    {settings.instagramHosiery && (
                      <a
                        href={settings.instagramHosiery}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="flex items-center justify-between border border-white/15 hover:border-white/40 px-3 py-2 rounded-sm transition-colors text-white/85 hover:text-white"
                      >
                        <span className="inline-flex items-center gap-2 truncate">
                          <Instagram className="w-3.5 h-3.5 shrink-0" />
                          <span className="text-[11px] truncate">IG: Accessories Division</span>
                        </span>
                        <ArrowUpRight className="w-3 h-3 shrink-0 text-white/50" />
                      </a>
                    )}
                    {settings.facebookUrl && (
                      <a
                        href={settings.facebookUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="col-span-full flex items-center justify-between border border-white/15 hover:border-white/40 px-3 py-2 rounded-sm transition-colors text-white/85 hover:text-white"
                      >
                        <span className="inline-flex items-center gap-2 truncate">
                          <Facebook className="w-3.5 h-3.5 shrink-0" />
                          <span className="text-[11px] truncate">Facebook: Safety Line Official</span>
                        </span>
                        <ArrowUpRight className="w-3 h-3 shrink-0 text-white/50" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Advisory & Production Commitments Ledger */}
            <div className="bg-white p-6 sm:p-7 rounded-sm border border-[#E2DFD7] space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E2DFD7]">
                <FileCheck className="w-4 h-4 text-[#D92227]" />
                <h3 className="font-display text-sm font-bold text-[#141918] uppercase tracking-wider">
                  Advisory &amp; Production Commitments
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#525957]">
                <div className="flex items-start gap-2.5 p-3 bg-[#F7F6F2] border border-[#E2DFD7] rounded-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#D92227] shrink-0 mt-0.5" />
                  <span><strong className="text-[#141918]">12-Hour SLA:</strong> All sample orders and catalogue pricing sheets dispatched within one business day.</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 bg-[#F7F6F2] border border-[#E2DFD7] rounded-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#D92227] shrink-0 mt-0.5" />
                  <span><strong className="text-[#141918]">Lab Certificates:</strong> OEKO-TEX Standard 100 &amp; tensile stress test sheets provided with fabric swatches.</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 bg-[#F7F6F2] border border-[#E2DFD7] rounded-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#D92227] shrink-0 mt-0.5" />
                  <span><strong className="text-[#141918]">Bespoke Customization:</strong> Sublimation printing, jacquard weaving, and silicone band branding available.</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 bg-[#F7F6F2] border border-[#E2DFD7] rounded-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#D92227] shrink-0 mt-0.5" />
                  <span><strong className="text-[#141918]">Global Freight:</strong> DDP/FOB export shipping arrangements to Europe, North America, Middle East, and Asia.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Department Directory & Facility Map */}
          <div className="lg:col-span-6 space-y-6">
            {/* Department Routing Directory */}
            <div className="bg-white rounded-sm border border-[#E2DFD7] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E2DFD7] flex items-center justify-between">
                <h2 className="font-display text-sm font-bold text-[#141918] uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#D92227]" />
                  <span>Department Directory</span>
                </h2>
                <span className="text-[11px] font-mono text-[#525957]">Direct Routing</span>
              </div>

              <div className="divide-y divide-[#E2DFD7]">
                <div className="p-5 sm:p-6 space-y-1.5 hover:bg-[#F7F6F2]/60 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display font-bold text-sm text-[#141918]">Wholesale &amp; Global Distribution</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#525957]">B2B Sales</span>
                  </div>
                  <p className="text-xs text-[#525957] leading-relaxed">
                    Bulk distributor orders, minimum order quantities (MOQs), and regional distribution agreements.
                  </p>
                  <div className="pt-1">
                    <a
                      href={`mailto:${settings.salesEmail || settings.contactEmail}`}
                      className="text-xs font-mono font-semibold text-[#141918] hover:text-[#D92227] transition-colors inline-flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#D92227]" />
                      <span>{settings.salesEmail || settings.contactEmail}</span>
                    </a>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-1.5 hover:bg-[#F7F6F2]/60 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display font-bold text-sm text-[#141918]">Custom OEM/ODM &amp; Team Kits</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#525957]">Design Lab</span>
                  </div>
                  <p className="text-xs text-[#525957] leading-relaxed">
                    Technical CAD files, team colorway matching, custom siliconized grips, and bespoke athletic sizing.
                  </p>
                  <div className="pt-1">
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="text-xs font-mono font-semibold text-[#141918] hover:text-[#D92227] transition-colors inline-flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#D92227]" />
                      <span>{settings.contactEmail}</span>
                    </a>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-1.5 hover:bg-[#F7F6F2]/60 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display font-bold text-sm text-[#141918]">Material Swatches &amp; Physical Samples</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#525957]">Sample Desk</span>
                  </div>
                  <p className="text-xs text-[#525957] leading-relaxed">
                    Physical fabric swatches, compression test certificates, and sample garment dispatches.
                  </p>
                  <div className="pt-1">
                    <a
                      href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`}
                      className="text-xs font-mono font-semibold text-[#141918] hover:text-[#D92227] transition-colors inline-flex items-center gap-1.5 tabular-nums"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D92227]" />
                      <span>{settings.contactPhone}</span>
                    </a>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-1.5 bg-[#F7F6F2]/70 hover:bg-[#ECE9E1]/50 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display font-bold text-sm text-[#141918]">Company Personal Mail</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D92227] font-semibold">Executive Office</span>
                  </div>
                  <p className="text-xs text-[#525957] leading-relaxed">
                    Confidential business communications, official corporate correspondence, executive partnerships, and direct management inquiries.
                  </p>
                  <div className="pt-1">
                    <a
                      href={`mailto:${personalEmail}`}
                      className="text-xs font-mono font-semibold text-[#141918] hover:text-[#D92227] transition-colors inline-flex items-center gap-1.5 break-all"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#D92227] shrink-0" />
                      <span>{personalEmail}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Factory Location & Showroom Map Card */}
            <div className="bg-white p-6 rounded-sm border border-[#E2DFD7] space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D92227] shrink-0" />
                  <div>
                    <span className="block text-xs font-mono text-[#141918] font-bold uppercase tracking-wider">
                      Factory Location &amp; Showroom
                    </span>
                    <span className="block text-[11px] font-mono text-[#525957]">
                      Safetylineindustriesofficial · Sialkot, Pakistan
                    </span>
                  </div>
                </div>
                {settings.googleMapsUrl && (
                  <a
                    href={settings.googleMapsUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#141918] hover:text-[#D92227] font-semibold uppercase transition-colors px-3 py-1.5 rounded-sm border border-[#E2DFD7] hover:border-[#141918]"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="w-full h-80 rounded-sm overflow-hidden border border-[#E2DFD7] bg-[#ECE9E1]">
                <iframe
                  title="Safety Line Headquarters Map Location"
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
      </div>

      <Footer settings={settings} />

      <InquiryLoadingModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        settings={settings}
      />
    </div>
  );
}
