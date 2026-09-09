import { Award, Mail, Phone, MapPin, Sparkles, MessageCircle, Instagram, Facebook, ExternalLink } from 'lucide-react';
import { navigate } from '../lib/router';
import { Settings } from '../types';

interface FooterProps {
  settings: Settings;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNav = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(path);
  };

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`;

  return (
    <footer id="footer-root" className="bg-white text-slate-600 pt-16 pb-8 border-t border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <div 
              onClick={() => handleNav('/')}
              className="flex items-center cursor-pointer group"
            >
              <div className="flex flex-col">
                <div className="flex items-baseline space-x-1">
                  <span className="font-serif text-sm font-black tracking-wider uppercase leading-none transition-colors">
                    <span className="text-[#EA2227]">SAFETY</span> <span className="text-black">LINE</span>
                  </span>
                </div>
                <span className="text-[8px] font-mono tracking-widest text-[#FF5A36] uppercase font-bold mt-1">
                  Textile Engineering Atelier
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {settings.slogan}
            </p>
            <div className="inline-flex items-center gap-1.5 bg-[#D9F0EC] border border-[#0B3D3B]/10 rounded-md px-2.5 py-1 text-[10px] text-[#0B3D3B] font-mono font-bold tracking-wider">
              <Sparkles className="w-3 h-3 text-[#FF5A36]" />
              <span>Official Digital Catalogue</span>
            </div>

            {/* Social Channels */}
            <div className="pt-2">
              <span className="block text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider mb-2">
                Official Channels
              </span>
              <div className="flex items-center gap-2">
                {settings.instagramGearwear && (
                  <a
                    href={settings.instagramGearwear}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    title="Instagram - Safety Line Gearwear"
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#E1306C] hover:text-white text-slate-600 flex items-center justify-center transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {settings.instagramHosiery && (
                  <a
                    href={settings.instagramHosiery}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    title="Instagram - Safety Line Hosiery"
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#833AB4] hover:text-white text-slate-600 flex items-center justify-center transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {settings.facebookUrl && (
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    title="Facebook - Safety Line Industries"
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#1877F2] hover:text-white text-slate-600 flex items-center justify-center transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  title="WhatsApp Concierge (+92 3040000445)"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#25D366] hover:text-white text-slate-600 flex items-center justify-center transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div>
            <h3 className="font-display text-[#0B3D3B] font-bold text-xs tracking-wider uppercase mb-4">
              Product Categories
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => handleNav('/gearwear')} 
                  className="text-slate-600 hover:text-[#0B3D3B] hover:underline font-medium transition-colors text-left cursor-pointer"
                >
                  Gearwear Athletic Performance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/accessories')} 
                  className="text-slate-600 hover:text-[#0B3D3B] hover:underline font-medium transition-colors text-left cursor-pointer"
                >
                  Technical Accessories & Performance Socks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/blog')} 
                  className="text-slate-600 hover:text-[#0B3D3B] hover:underline font-medium transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Textile Science & Guides</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate & Heritage */}
          <div>
            <h3 className="font-display text-[#0B3D3B] font-bold text-xs tracking-wider uppercase mb-4">
              Company & Standards
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => handleNav('/about')} 
                  className="text-slate-600 hover:text-[#0B3D3B] hover:underline font-medium transition-colors text-left cursor-pointer"
                >
                  About Our Heritage & ISO Certs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/contact')} 
                  className="text-slate-600 hover:text-[#0B3D3B] hover:underline font-medium transition-colors text-left cursor-pointer"
                >
                  Showroom & Wholesale Desk
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/contact')} 
                  className="text-slate-600 hover:text-[#0B3D3B] hover:underline font-medium transition-colors text-left cursor-pointer"
                >
                  Wholesale & Sample Packs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div className="space-y-3">
            <h3 className="font-display text-[#0B3D3B] font-bold text-xs tracking-wider uppercase mb-4">
              Headquarters & Desk
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF5A36] mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-normal leading-relaxed text-slate-600">{settings.officeAddress}</span>
                  {settings.googleMapsUrl && (
                    <a
                      href={settings.googleMapsUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#0B3D3B] hover:text-[#FF5A36] font-medium transition-colors mt-0.5"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                <a href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`} className="font-mono text-slate-600 hover:text-[#0B3D3B] transition-colors font-semibold">
                  {settings.contactPhone}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="text-slate-600 hover:text-[#0B3D3B] transition-colors font-medium">
                  {settings.contactEmail}
                </a>
              </li>
              {settings.salesEmail && (
                <li className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-[#0B3D3B] shrink-0" />
                  <a href={`mailto:${settings.salesEmail}`} className="text-slate-600 hover:text-[#0B3D3B] transition-colors font-medium">
                    {settings.salesEmail}
                  </a>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500 font-medium tracking-wider">
            &copy; {currentYear} <span className="text-[#EA2227] font-bold">SAFETY</span> <span className="text-black font-bold">LINE</span> APPAREL INDUSTRIES INC. ALL RIGHTS RESERVED.
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Swiss Testing Active</span>
            </div>
            <div className="h-3 w-px bg-slate-200"></div>
            <span className="border border-slate-200 bg-[#FAFCFB] rounded px-2 py-0.5 text-slate-500 text-[9px] font-mono">
              Digital Product Catalogue • No Checkout
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
