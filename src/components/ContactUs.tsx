import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle2, Sparkles, MessageCircle, ShieldCheck, ArrowRight, Info, Instagram, Facebook, ExternalLink } from 'lucide-react';
import { Settings } from '../types';
import { navigate } from '../lib/router';
import SEO from './SEO';

interface ContactUsProps {
  settings: Settings;
}

export default function ContactUs({ settings }: ContactUsProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    messageCategory: 'Wholesale Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        messageCategory: 'Wholesale Inquiry',
        message: ''
      });
    }, 1000);
  };

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Safety Line Advisory Desk, I am inquiring regarding wholesale orders and technical specifications.`
  )}`;

  return (
    <div id="contact-us-container" className="bg-[#FAFCFB] min-h-screen pt-20 pb-24 font-sans text-[#1A1A1A]">
      {/* Sticky Top Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B3D3B] text-white py-3.5 px-4 sm:px-8 border-b border-white/10 shadow-lg shadow-[#0B3D3B]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => navigate('/')}
            className="flex items-center cursor-pointer group"
          >
            <div className="flex items-baseline space-x-1.5">
              <span className="font-serif font-black text-sm uppercase tracking-wider transition-colors">
                <span className="text-[#EA2227]">SAFETY</span> <span className="text-white">LINE</span>
              </span>
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-[#FF5A36] font-bold ml-1">
                Inquiry Desk
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
              className="hover:text-[#FF5A36] text-white/90 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              Gearwear
            </button>
            <button
              onClick={() => navigate('/accessories')}
              className="hover:text-[#D9F0EC] text-white/90 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              Accessories
            </button>
            <button
              onClick={() => navigate('/about')}
              className="hover:text-[#D9F0EC] text-white/90 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              About Us
            </button>
          </div>
        </div>
      </header>

      <SEO 
        title="Contact Us & Wholesale Inquiry Desk | Safety Line"
        description="Get in touch with Safety Line corporate offices and advisory desk for wholesale inquiries, custom team kits, and performance catalogue distribution."
        keywords="Safety Line contact, athletic gearwear inquiry, custom sportswear order, wholesale accessories distribution, performance textiles"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-6">
        
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
          <button onClick={() => navigate('/')} className="hover:text-[#0B3D3B] transition-colors cursor-pointer">Portal</button>
          <span>/</span>
          <span className="text-[#0B3D3B] font-bold">Contact & Inquiry Desk</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span>Global Inquiries & Advisory Desk</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#0B3D3B] tracking-tight">
            Connect With Our Specialists
          </h1>
          <p className="text-slate-600 font-normal text-base sm:text-lg leading-relaxed">
            Submit fabric specification requests, team kit inquiries, or catalogue sample requests directly to our advisory desk.
          </p>
        </div>

        {/* 2-Column Portal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
            {/* Left Column: Direct Corporate Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B3D3B] text-white p-8 rounded-2xl space-y-6 relative overflow-hidden shadow-md">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#D9F0EC] font-mono text-xs uppercase tracking-wider block font-bold">
                    Corporate Headquarters
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Live Advisory
                  </span>
                </div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-white">
                  Safety Line Industries
                </h2>
                <p className="text-white/80 font-normal text-xs leading-relaxed">
                  Our materials laboratory, design division, and executive showroom welcome sports organizations, retail stockists, and corporate partners.
                </p>
              </div>

              <div className="space-y-3.5 text-xs font-normal border-t border-white/10 pt-5 font-mono">
                {/* Address */}
                <div className="flex items-start space-x-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <MapPin className="w-4 h-4 text-[#FF5A36] mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 uppercase">Factory & Showroom</span>
                    <span className="leading-relaxed text-white/95 font-medium">{settings.officeAddress}</span>
                    {settings.googleMapsUrl && (
                      <a
                        href={settings.googleMapsUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#D9F0EC] hover:text-white font-mono mt-1 underline underline-offset-2 transition-colors font-bold"
                      >
                        <span>Open on Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Phone className="w-4 h-4 text-[#FF5A36] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 uppercase">Direct Phone / WhatsApp</span>
                    <a href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`} className="text-white hover:text-[#D9F0EC] font-semibold transition-colors">
                      {settings.contactPhone}
                    </a>
                  </div>
                </div>

                {/* General Inquiry Email */}
                <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Mail className="w-4 h-4 text-[#FF5A36] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 uppercase">General Inquiries</span>
                    <a href={`mailto:${settings.contactEmail}`} className="text-white hover:text-[#D9F0EC] transition-colors font-medium">
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>

                {/* Sales Inquiry Email */}
                {settings.salesEmail && (
                  <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <Mail className="w-4 h-4 text-[#D9F0EC] shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/60 uppercase">Sales & Wholesale Desk</span>
                      <a href={`mailto:${settings.salesEmail}`} className="text-white hover:text-[#D9F0EC] transition-colors font-medium">
                        {settings.salesEmail}
                      </a>
                    </div>
                  </div>
                )}

                {/* Business Hours */}
                <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Clock className="w-4 h-4 text-[#FF5A36] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 uppercase">Operating Hours</span>
                    <span className="text-white/90">{settings.businessHours}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Concierge CTA */}
              <div className="pt-2 border-t border-white/10 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs tracking-wider uppercase py-3.5 px-4 rounded-xl inline-flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Direct WhatsApp Advisory Desk</span>
                </a>

                {/* Social Connect Links */}
                <div className="pt-2">
                  <span className="block text-[10px] font-mono text-white/70 uppercase tracking-wider mb-2 font-bold">
                    Official Social Profiles
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {settings.instagramGearwear && (
                      <a
                        href={settings.instagramGearwear}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="flex items-center space-x-2 bg-white/10 hover:bg-[#E1306C] p-2 rounded-lg transition-colors text-white"
                      >
                        <Instagram className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[11px] truncate">IG: Gearwear</span>
                      </a>
                    )}
                    {settings.instagramHosiery && (
                      <a
                        href={settings.instagramHosiery}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="flex items-center space-x-2 bg-white/10 hover:bg-[#833AB4] p-2 rounded-lg transition-colors text-white"
                      >
                        <Instagram className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[11px] truncate">IG: Accessories Division</span>
                      </a>
                    )}
                    {settings.facebookUrl && (
                      <a
                        href={settings.facebookUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="col-span-full flex items-center space-x-2 bg-white/10 hover:bg-[#1877F2] p-2 rounded-lg transition-colors text-white"
                      >
                        <Facebook className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[11px] truncate">Facebook: Safety Line Official</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Guarantees */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-display text-sm font-bold text-[#0B3D3B] uppercase tracking-wider">
                Advisory Commitments
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0B3D3B] shrink-0 mt-0.5" />
                  <span><strong>12-Hour SLA:</strong> All sample orders and catalogue pricing sheets dispatched within one business day.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0B3D3B] shrink-0 mt-0.5" />
                  <span><strong>Lab Certificates:</strong> OEKO-TEX Standard 100 and tensile stress test sheets provided with fabric swatches.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0B3D3B] shrink-0 mt-0.5" />
                  <span><strong>Bespoke Customization:</strong> Sublimation printing, jacquard weaving, and silicone band branding available.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form & Map */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="space-y-1">
                <h2 className="font-display text-xl font-bold text-[#0B3D3B]">
                  Send an Inquiry
                </h2>
                <p className="text-slate-500 font-normal text-xs">
                  Fill out the form below and our textile technicians will review your specifications.
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-[#D9F0EC]/40 border border-[#0B3D3B]/20 rounded-xl p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#0B3D3B] text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-[#D9F0EC]" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#0B3D3B]">
                    Inquiry Received
                  </h3>
                  <p className="text-xs text-slate-600 font-normal max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Safety Line. A senior textile representative has received your request and will contact you via email or phone within 12 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#0B3D3B] hover:bg-[#072725] text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Full Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="E.g., Marcus Vance"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3.5 py-2.5 text-xs text-[#1A1A1A] outline-none transition-colors"
                      />
                    </div>

                    {/* Company / Organization */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Company / Club Name</label>
                      <input
                        type="text"
                        placeholder="E.g., Alpine Athletic Club"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3.5 py-2.5 text-xs text-[#1A1A1A] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Business Email *</label>
                      <input
                        required
                        type="email"
                        placeholder="E.g., contact@organization.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3.5 py-2.5 text-xs text-[#1A1A1A] outline-none transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="E.g., +1 (555) 0199"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3.5 py-2.5 text-xs text-[#1A1A1A] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message Category */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Inquiry Category</label>
                    <select
                      value={formData.messageCategory}
                      onChange={(e) => setFormData({ ...formData, messageCategory: e.target.value })}
                      className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3.5 py-2.5 text-xs text-[#1A1A1A] outline-none transition-colors cursor-pointer"
                    >
                      <option value="Wholesale Inquiry">B2B Wholesale / Stockist Application</option>
                      <option value="Fabric Customization">Custom Team Kit & Specifications</option>
                      <option value="Sample Request">Material Swatch & Sample Order</option>
                      <option value="Other">General Inquiry</option>
                    </select>
                  </div>

                  {/* Message details */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Requirements & Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please describe your requirements, desired quantity scale, or sizing inquiries..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-lg px-3.5 py-2.5 text-xs text-[#1A1A1A] outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-inquiry-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FF5A36] hover:bg-[#e44e2b] text-white font-bold text-xs tracking-wider uppercase py-3.5 px-6 rounded-lg inline-flex items-center justify-center space-x-2 transition-all shadow-md shadow-[#FF5A36]/25 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Official Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Factory Location & Showroom Map Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm aspect-[16/9] flex flex-col space-y-2.5">
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
              <div className="w-full flex-grow rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
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

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#FF5A36]" />
            <span>Safety Line Textile Engineering & Advisory Desk</span>
          </div>
          <div className="flex items-center space-x-4 uppercase font-bold">
            <button onClick={() => navigate('/')} className="hover:text-[#0B3D3B] transition-colors cursor-pointer">Portal</button>
            <button onClick={() => navigate('/gearwear')} className="hover:text-[#FF5A36] transition-colors cursor-pointer">Gearwear</button>
            <button onClick={() => navigate('/accessories')} className="hover:text-[#0B3D3B] transition-colors cursor-pointer">Accessories</button>
            <button onClick={() => navigate('/about')} className="hover:text-[#0B3D3B] transition-colors cursor-pointer">About Us</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
