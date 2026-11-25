import { Mail, Phone, MapPin, MessageCircle, Instagram, Facebook, ExternalLink } from 'lucide-react';
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
  const personalEmail = settings.companyPersonalEmail || 'safetylineindustriesofficial@gmail.com';

  return (
    <footer id="footer-root" className="bg-[#0E1A19] text-white/80 pt-16 pb-10 border-t border-white/10 font-sans print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand Identity & Heritage */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => handleNav('/')}
              className="text-left cursor-pointer group"
            >
              <span className="font-display text-base font-extrabold tracking-[0.16em] uppercase block text-white">
                <span className="text-[#D92227]">SAFETY</span> LINE INDUSTRIES
              </span>
              <span className="text-[11px] font-mono tracking-wider text-white/50 uppercase block mt-1">
                Sialkot, Pakistan · Est. 2008
              </span>
            </button>

            <p className="text-sm text-white/65 leading-relaxed max-w-sm">
              {settings.slogan}
            </p>

            {/* Clean Social & Direct Channels */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {settings.instagramGearwear && (
                <a
                  href={settings.instagramGearwear}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-white/15 hover:border-white/40 text-xs text-white/80 hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Gearwear</span>
                </a>
              )}
              {settings.instagramHosiery && (
                <a
                  href={settings.instagramHosiery}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-white/15 hover:border-white/40 text-xs text-white/80 hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Accessories</span>
                </a>
              )}
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  aria-label="Facebook"
                  className="p-2 rounded-sm border border-white/15 hover:border-white/40 text-white/80 hover:text-white transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              )}
              <a
                href={whatsappUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                aria-label="WhatsApp"
                className="p-2 rounded-sm border border-white/15 hover:border-white/40 text-white/80 hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Manufacturing Divisions */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-white/45">
              Divisions
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('/gearwear')} className="text-white/75 hover:text-white transition-colors text-left cursor-pointer">
                  Gearwear &amp; Gloves
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/accessories')} className="text-white/75 hover:text-white transition-colors text-left cursor-pointer">
                  Technical Accessories
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/gearwear/motorcars-gloves')} className="text-white/75 hover:text-white transition-colors text-left cursor-pointer">
                  Motorcars Racing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/gearwear/golf-gloves')} className="text-white/75 hover:text-white transition-colors text-left cursor-pointer">
                  Tour Golf Gloves
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-white/45">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('/about')} className="text-white/75 hover:text-white transition-colors text-left cursor-pointer">
                  Company Profile
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="text-white/75 hover:text-white transition-colors text-left cursor-pointer">
                  Advisory Desk
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="text-white/75 hover:text-white transition-colors text-left cursor-pointer">
                  OEM &amp; Swatches
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/')} className="text-white/75 hover:text-white transition-colors text-left cursor-pointer">
                  Division Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact Directory */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-white/45">
              Headquarters &amp; Direct Mail
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2.5 text-white/75">
                <MapPin className="w-4 h-4 text-[#D92227] mt-0.5 shrink-0" />
                <div>
                  <span className="leading-relaxed block">{settings.officeAddress}</span>
                  {settings.googleMapsUrl && (
                    <a
                      href={settings.googleMapsUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1 text-[11px] text-white/90 hover:text-white underline underline-offset-4 mt-1"
                    >
                      <span>View Facility on Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D92227] shrink-0" />
                <a href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`} className="font-mono tabular-nums text-white/85 hover:text-white transition-colors">
                  {settings.contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D92227] shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="font-mono text-white/80 hover:text-white transition-colors break-all">
                  {settings.contactEmail}
                </a>
              </li>
              {settings.salesEmail && (
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-white/50 shrink-0" />
                  <a href={`mailto:${settings.salesEmail}`} className="font-mono text-white/80 hover:text-white transition-colors break-all">
                    {settings.salesEmail}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white/75 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/45 block">
                    Company Personal Mail
                  </span>
                  <a
                    href={`mailto:${personalEmail}`}
                    className="font-mono text-white/90 hover:text-white transition-colors break-all"
                  >
                    {personalEmail}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/45 font-mono">
          <span>
            &copy; {currentYear} SAFETY LINE INDUSTRIES. ALL RIGHTS RESERVED.
          </span>
          <span>
            Direct Manufacturer Digital Catalogue · ISO 9001:2015
          </span>
        </div>
      </div>
    </footer>
  );
}
