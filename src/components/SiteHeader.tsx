import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navigate, Link, usePath } from '../lib/router';
import brandLogo from '../assets/images/safetyline_landing.png';

interface SiteHeaderProps {
  variant?: 'obsidian' | 'light' | 'transparent';
  onOpenInquiry?: () => void;
  ctaLabel?: string;
  ctaAction?: () => void;
  subBar?: React.ReactNode;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  variant = 'obsidian',
  onOpenInquiry,
  ctaLabel = 'Wholesale Inquiry',
  ctaAction,
  subBar,
}) => {
  const currentPath = usePath().replace(/\/+$/, '').toLowerCase() || '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  const isLight = variant === 'light';
  const isTransparent = variant === 'transparent';

  const navLinks = [
    { label: 'Portal', path: '/' },
    { label: 'Gearwear', path: '/gearwear' },
    { label: 'Accessories', path: '/accessories' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActivePath = (path: string) => {
    if (path === '/') return currentPath === '/';
    if (path === '/gearwear') {
      return currentPath.startsWith('/gearwear') || ['/golf-gloves', '/fish-gloves', '/work-gloves', '/mechanics-gloves', '/tactical-police-gloves', '/motorcars-gloves', '/cycling-gloves', '/road-cycling-apparel', '/weight-lifting'].includes(currentPath);
    }
    if (path === '/accessories') {
      return currentPath.startsWith('/accessories') || currentPath.startsWith('/hosiery') || ['/gymwear', '/t-shirts', '/jackets', '/hoodies', '/tracksuits'].includes(currentPath);
    }
    return currentPath.startsWith(path);
  };

  const handlePrimaryCta = () => {
    if (ctaAction) {
      ctaAction();
    } else if (onOpenInquiry) {
      onOpenInquiry();
    } else {
      navigate('/contact');
    }
  };

  const headerBgClass = isTransparent
    ? 'bg-[#0E1A19]/88 backdrop-blur-md text-white border-b border-white/10'
    : isLight
    ? 'bg-[#FFFFFF]/95 backdrop-blur-md text-[#141918] border-b border-[#E2DFD7]'
    : 'bg-[#0E1A19] text-white border-b border-white/10';

  return (
    <header className={`sticky top-0 z-50 print:hidden ${headerBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Clean Brand Wordmark (single line, no attached pills) */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group cursor-pointer">
          <div className={`w-9 h-9 rounded-sm flex items-center justify-center p-1 shrink-0 ${
            isLight ? 'bg-[#F7F6F2] border border-[#E2DFD7]' : 'bg-white border border-white/15'
          }`}>
            <img
              src={brandLogo}
              alt="Safety Line"
              className="h-full w-auto object-contain"
            />
          </div>
          <span className="font-display font-extrabold text-sm sm:text-[15px] tracking-[0.14em] uppercase whitespace-nowrap">
            <span className="text-[#D92227]">SAFETY</span>{' '}
            <span className={isLight ? 'text-[#141918]' : 'text-white'}>LINE</span>
          </span>
        </Link>

        {/* Zone 2: Clean Single-Row Navigation Links (5 links) */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const active = isActivePath(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-1 text-[13px] font-medium tracking-wide whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  active
                    ? isLight
                      ? 'text-[#141918] font-semibold'
                      : 'text-white font-semibold'
                    : isLight
                    ? 'text-[#525957] hover:text-[#141918]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-[2px] h-[2px] bg-[#D92227]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action CTA + Mobile Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handlePrimaryCta}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#D92227] hover:bg-[#B5191D] text-white text-xs font-semibold tracking-wider uppercase whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer"
          >
            <span>{ctaLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={`lg:hidden p-2 rounded-sm transition-colors cursor-pointer ${
              isLight
                ? 'text-[#141918] hover:bg-[#ECE9E1]'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Optional Contextual Sub-Bar (used cleanly in Category Window pages) */}
      {subBar}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-t px-4 py-4 space-y-1 ${
            isLight
              ? 'bg-white border-[#E2DFD7] text-[#141918]'
              : 'bg-[#0E1A19] border-white/10 text-white'
          }`}
        >
          {navLinks.map((link) => {
            const active = isActivePath(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                  active
                    ? isLight
                      ? 'bg-[#ECE9E1] text-[#141918] font-semibold'
                      : 'bg-white/10 text-white font-semibold'
                    : isLight
                    ? 'text-[#525957] hover:bg-[#F7F6F2]'
                    : 'text-white/75 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 mt-2 border-t border-current/10">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handlePrimaryCta();
              }}
              className="w-full py-2.5 px-4 rounded-sm bg-[#D92227] hover:bg-[#B5191D] text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
