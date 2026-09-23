import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navigate, usePath, Link } from '../lib/router';
import brandLogo from '../assets/images/safetyline_landing.png';

export default function Navbar() {
  const currentPath = usePath();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Gearwear', path: '/gearwear' },
    { label: 'Accessories', path: '/accessories' },
    { label: 'About Us', path: '/about' },
    { label: 'Blog & Guides', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <nav
      id="navbar-root"
      className={`fixed top-0 left-0 right-0 z-50 bg-[#0B3D3B] text-white transition-all duration-300 ${
        isScrolled ? 'py-3 shadow-lg shadow-[#0B3D3B]/20 border-b border-[#0B3D3B]/80' : 'py-4 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link 
            id="nav-logo"
            to="/"
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <img
              src={brandLogo}
              alt="Safety Line Logo"
              className="h-8 sm:h-9 w-auto object-contain filter drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
            />
            <div>
              <span className="font-display font-black text-sm uppercase tracking-wider block leading-none">
                <span className="text-[#EA2227]">SAFETY</span> <span className="text-white">LINE</span>
              </span>
              <span className="block text-[9px] text-[#D9F0EC]/90 font-mono tracking-[0.22em] uppercase font-bold mt-1">
                Textile & Hosiery Atelier
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div id="desktop-nav-links" className="hidden md:flex items-center space-x-8 uppercase tracking-wider text-xs font-semibold">
            {navItems.map((item) => (
              <Link
                key={item.path}
                id={`nav-link-${item.label.toLowerCase().replace(/[\s&]+/g, '-')}`}
                to={item.path}
                className={`transition-colors duration-200 relative py-1.5 cursor-pointer ${
                  isActive(item.path)
                    ? 'text-white font-bold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5A36] rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Action Menu */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              id="nav-inquire-cta"
              to="/contact"
              className="bg-[#FF5A36] hover:bg-[#e44e2b] active:scale-95 text-white px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-md shadow-[#FF5A36]/25 cursor-pointer inline-flex items-center gap-1.5 group"
            >
              <span>Inquire Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/90 hover:text-white p-2 rounded-lg bg-white/10 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div id="mobile-drawer" className="md:hidden bg-[#0B3D3B] border-t border-white/10 py-4 px-4 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                isActive(item.path)
                  ? 'bg-white/15 text-white border-l-4 border-[#FF5A36]'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t border-white/10 pt-4 mt-2 space-y-2">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-[#FF5A36] text-white py-3 rounded-lg text-xs font-bold tracking-wider uppercase hover:bg-[#e44e2b] cursor-pointer shadow-md inline-flex items-center justify-center gap-2"
            >
              <span>Inquire / Contact Desk</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
