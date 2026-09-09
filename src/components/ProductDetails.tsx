import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronLeft, ChevronRight, CornerDownLeft, ShieldCheck, HelpCircle, PhoneCall, 
  AlertTriangle, MessageSquare, ZoomIn, Star, Loader2, Share2, MessageCircle, 
  Twitter, Linkedin, Link2, Check, ArrowRight, Sparkles, Activity, Layers, 
  CheckCircle2, Award, MapPin, Mail, Phone, Instagram, Facebook, ExternalLink, Edit3 
} from 'lucide-react';
import { motion } from 'motion/react';
import { navigate } from '../lib/router';
import { Product, ProductFeedback } from '../types';
import { settings } from '../data';
import SEO from './SEO';
import ListingModal from './ListingModal';

interface ProductDetailsProps {
  slug: string;
  products: Product[];
  onUpdateProduct?: (product: Product) => void;
}

export default function ProductDetails({ slug, products, onUpdateProduct }: ProductDetailsProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const product = useMemo(() => {
    return products.find(p => p.slug === slug);
  }, [products, slug]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.id !== product.id && p.status === 'Active' && p.categoryId === product.categoryId)
      .slice(0, 4);
  }, [product, products]);

  // Gallery slider indexes
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Feedback states
  const [feedbacks, setFeedbacks] = useState<ProductFeedback[]>([
    {
      id: 'fb-initial-1',
      productId: product?.id || '',
      productName: product?.name || '',
      author: 'Coach Marcus Lindqvist',
      email: 'm.lindqvist@nordicathletic.se',
      rating: 5,
      message: 'Exceptional thermal regulation during high-cadence endurance trials. Fabric holds shape flawlessly after 40+ wash cycles.',
      createdAt: '2026-02-10T14:30:00Z'
    }
  ]);
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initialize selected color & size when product loads
  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      setActiveIndex(0);
      setIsZoomed(false);
    }
  }, [product]);

  // All gallery images
  const images = useMemo(() => {
    if (!product) return [];
    const list = [...(product.galleryImages || [])];
    if (list.length === 0 || !list.includes(product.coverImage)) {
      list.unshift(product.coverImage);
    }
    return Array.from(new Set(list));
  }, [product]);

  // Autoplay gallery rotation
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, images]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleThumbnailClick = (idx: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(idx);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please populate all required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    setTimeout(() => {
      const newFeedback: ProductFeedback = {
        id: `fb-${Date.now()}`,
        productId: product?.id || '',
        productName: product?.name || '',
        author,
        email,
        rating,
        message,
        createdAt: new Date().toISOString()
      };
      setFeedbacks(prev => [newFeedback, ...prev]);
      setSuccessMsg('Thank you! Your verified feedback has been successfully registered.');
      setAuthor('');
      setEmail('');
      setMessage('');
      setRating(5);
      setSubmitting(false);
    }, 600);
  };

  const productSchema = useMemo(() => {
    if (!product) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': product.name,
      'image': images,
      'description': product.longDescription || product.shortDescription,
      'sku': product.productCode,
      'mpn': product.productCode,
      'material': product.material,
      'brand': {
        '@type': 'Brand',
        'name': 'Safety Line'
      },
      'offers': {
        '@type': 'Offer',
        'url': window.location.href,
        'priceCurrency': 'USD',
        'price': '0.00',
        'itemCondition': 'https://schema.org/NewCondition',
        'availability': 'https://schema.org/InStock',
        'seller': {
          '@type': 'Organization',
          'name': 'Safety Line'
        }
      }
    };
  }, [product, images]);

  if (!product) {
    return (
      <div id="product-not-found" className="min-h-screen flex flex-col items-center justify-center bg-[#FAFCFB] text-center px-4 pt-32">
        <AlertTriangle className="w-16 h-16 text-[#FF5A36] mb-6" />
        <h2 className="font-display text-2xl font-bold text-[#0B3D3B]">Product Not Found</h2>
        <p className="text-slate-500 font-normal text-sm max-w-sm mt-2">
          The requested product could not be located in our digital catalogue.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-[#0B3D3B] hover:bg-[#072725] text-white px-6 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
        >
          Return to Catalogue Home
        </button>
      </div>
    );
  }

  const whatsappInquiryUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Safety Line Concierge, I am inquiring regarding ${product.name} (Product Code: ${product.productCode}). Please provide full yarn specifications, minimum order quantities, and sample shipment details.`
  )}`;

  const isGearwear = product.categoryId === 'cat-gearwear';
  const parentCategorySlug = isGearwear ? 'gearwear' : 'accessories';
  const parentCategoryLabel = isGearwear ? 'Gearwear' : 'Accessories';

  return (
    <div id="product-details-root" className="bg-[#FAFCFB] min-h-screen pt-20 pb-24 font-sans text-[#1A1A1A]">
      {/* Category-Specific Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B3D3B] text-white py-3.5 px-4 sm:px-8 border-b border-white/10 shadow-lg shadow-[#0B3D3B]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => navigate(`/${parentCategorySlug}`)}
            className="flex items-center cursor-pointer group"
          >
            <div>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-serif font-black text-sm uppercase tracking-wider transition-colors">
                  <span className="text-[#EA2227]">SAFETY</span> <span className="text-white">LINE</span>
                </span>
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-white font-bold ml-1">
                  {parentCategoryLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => navigate('/')}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              Portal
            </button>
            <button
              onClick={() => navigate('/about')}
              className="hidden sm:inline-block px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-white/90 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="hidden sm:inline-block px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-white/90 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={() => navigate(`/${parentCategorySlug}`)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                isGearwear ? 'bg-[#FF5A36] text-white hover:bg-[#e44e2b]' : 'bg-[#D9F0EC] text-[#0B3D3B] hover:bg-white'
              }`}
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
              <span>Back to {parentCategoryLabel}</span>
            </button>
          </div>
        </div>
      </header>

      <SEO 
        title={`${product.seoTitle || product.name} | Safety Line`}
        description={product.seoDescription || product.shortDescription}
        keywords={`${product.name}, ${product.productCode}, Safety Line, athletic ${product.categoryName}, ${product.material}`}
        image={product.coverImage}
        type="product"
        schema={productSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8">
        
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
            <button onClick={() => navigate('/')} className="hover:text-[#0B3D3B] transition-colors cursor-pointer">Portal</button>
            <span>/</span>
            <button 
              onClick={() => navigate(`/${parentCategorySlug}`)}
              className="hover:text-[#0B3D3B] transition-colors cursor-pointer font-bold"
            >
              {parentCategoryLabel}
            </button>
            <span>/</span>
            <span className="text-[#0B3D3B] font-bold truncate max-w-xs">{product.name}</span>
          </div>

            <button
              id="back-to-products-btn"
              onClick={() => navigate(`/${parentCategorySlug}`)}
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-[#0B3D3B] transition-colors cursor-pointer"
            >
              <CornerDownLeft className="w-4 h-4 text-[#FF5A36]" />
              <span>Back to {parentCategoryLabel} Collection</span>
            </button>
          </div>
        </div>

        {/* 2-Column Athletic Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
          
          {/* ==========================================
              LEFT SIDE: GALLERY SLIDER WITH ZOOM
             ========================================== */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            {/* Main Stage Frame (Full Shape Product View) */}
            <div 
              className="relative w-full aspect-[4/5] sm:aspect-square bg-slate-50 rounded-2xl overflow-hidden shadow-xs group cursor-zoom-in border border-slate-200 flex items-center justify-center p-4 sm:p-6"
              onMouseEnter={() => setIsAutoPlaying(false)}
            >
              {/* Main Image Layer in Full Shape */}
              <img
                src={images[activeIndex]}
                alt={`${product.name} showcase view`}
                className={`w-full h-full object-contain transition-transform duration-500 ease-out origin-center ${
                  isZoomed ? 'scale-175' : 'group-hover:scale-105'
                }`}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {/* Slider Next/Prev Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 text-[#0B3D3B] hover:bg-[#FF5A36] hover:text-white p-2 rounded-full shadow-md transition-colors z-10 cursor-pointer"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 text-[#0B3D3B] hover:bg-[#FF5A36] hover:text-white p-2 rounded-full shadow-md transition-colors z-10 cursor-pointer"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Category tag badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-[#0B3D3B] text-white text-[10px] font-mono tracking-wider uppercase px-3 py-1 rounded-md shadow-xs font-bold">
                  {product.categoryName}
                </span>
              </div>

              {/* Zoom hint */}
              <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white flex items-center space-x-1.5 px-3 py-1 rounded-md text-[10px] font-mono tracking-wider">
                <ZoomIn className="w-3.5 h-3.5 text-[#D9F0EC]" />
                <span>Click to Zoom</span>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2.5">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleThumbnailClick(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-slate-50 flex items-center justify-center p-1.5 ${
                      idx === activeIndex
                        ? 'border-[#FF5A36] ring-2 ring-[#FF5A36]/20 scale-95 shadow-xs'
                        : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt="Thumbnail view" 
                      className="w-full h-full object-contain" 
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ==========================================
              RIGHT SIDE: DETAILED SPECIFICATIONS
             ========================================== */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Heading & Code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#FF5A36] font-mono text-xs uppercase tracking-wider font-bold">
                    CODE: {product.productCode}
                  </span>
                  <span className="text-[10px] font-mono text-[#0B3D3B] bg-[#D9F0EC] px-2.5 py-1 rounded-md font-bold uppercase">
                    Catalogue Active
                  </span>
                </div>
                
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B3D3B] tracking-tight leading-tight">
                  {product.name}
                </h1>
                
                <div className="inline-block bg-slate-100 border border-slate-200 rounded-md px-3 py-1 text-[11px] text-[#0B3D3B] font-mono font-bold">
                  {product.material.split(',')[0]}
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-display font-bold text-[#0B3D3B] text-xs uppercase tracking-wider">
                  Product Overview & Function
                </h3>
                <p className="text-slate-600 font-normal leading-relaxed text-sm">
                  {product.longDescription || product.shortDescription}
                </p>
              </div>

              {/* Material Composition & QC Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#FAFCFB] p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block font-bold">Fiber Composition</span>
                  <span className="text-[#0B3D3B] text-xs font-bold">{product.material}</span>
                </div>
                <div className="bg-[#FAFCFB] p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block font-bold">Quality Standard</span>
                  <span className="text-[#0B3D3B] text-xs font-bold inline-flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#FF5A36]" /> OEKO-TEX Standard 100
                  </span>
                </div>
              </div>

              {/* Available Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-display font-bold text-[#0B3D3B] text-xs uppercase tracking-wider">
                      Available Sizes
                    </h3>
                    <span className="text-[10px] text-slate-400 font-mono">Selected: {selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'bg-[#0B3D3B] text-white border-[#0B3D3B] shadow-xs'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-display font-bold text-[#0B3D3B] text-xs uppercase tracking-wider">
                      Available Colorways
                    </h3>
                    <span className="text-[10px] text-slate-400 font-mono">Selected: {selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`inline-flex items-center text-xs px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          selectedColor === c
                            ? 'bg-[#0B3D3B] text-white border-[#0B3D3B] shadow-xs ring-2 ring-[#0B3D3B]/20'
                            : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A36] mr-2" />
                        <span>{c}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features list */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-[#0B3D3B] text-xs uppercase tracking-wider">
                    Performance Features
                  </h3>
                  <ul className="space-y-1.5">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start text-xs text-slate-600 font-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A36] mr-2 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Safety Line Ind Official Manufacturing Passport Card */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-2 border-slate-200/80 rounded-2xl shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center">
                  <div>
                    <div className="flex items-baseline space-x-1.5">
                      <span className="font-serif font-black text-xs sm:text-sm uppercase tracking-wider">
                        <span className="text-[#EA2227]">SAFETY</span> <span className="text-black">LINE</span>
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                      Official Specification File • Serial SL-{product.productCode}
                    </p>
                    <span className="text-[9px] text-emerald-700 font-mono font-bold inline-flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      100% Guaranteed European Textile Standard
                    </span>
                  </div>
                </div>

                <div className="hidden sm:block text-right shrink-0">
                  <span className="text-[9px] font-mono uppercase text-slate-400 block font-bold">Standard</span>
                  <span className="text-xs font-mono font-bold text-[#0B3D3B] bg-[#D9F0EC] px-2 py-0.5 rounded">
                    ISO 9001:2015
                  </span>
                </div>
              </div>

              {/* Digital Catalogue Notice (Strictly NO Cart / NO Price) */}
              <div className="p-4 bg-[#D9F0EC]/30 border border-[#D9F0EC] rounded-xl space-y-1">
                <span className="font-display font-bold text-[#0B3D3B] text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#FF5A36] shrink-0" />
                  Showcase & Wholesale Procurement Note
                </span>
                <p className="text-slate-600 text-xs font-normal leading-relaxed">
                  This item is part of our digital product catalogue. Direct ordering, bespoke team specifications, and wholesale sample swatch packs are handled directly by our concierge.
                </p>
              </div>

              {/* Social Share Strip */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <Share2 className="w-3.5 h-3.5 text-[#FF5A36]" />
                  Share Product:
                </span>
                <div className="flex items-center space-x-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out ${product.name} on Safety Line Catalogue: ${window.location.href}`)}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                    title="Share on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${product.name} on Safety Line:`)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-[#0B3D3B] hover:text-white transition-colors"
                    title="Share on X"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <button
                    onClick={handleCopyUrl}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    title="Copy Link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Link2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>

            {/* Action Buttons (Strictly NO Cart / NO Buy Now) */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex-grow bg-[#FF5A36] hover:bg-[#e44e2b] text-white font-bold text-xs tracking-wider uppercase py-4 px-6 rounded-xl inline-flex items-center justify-center space-x-2 transition-all shadow-md shadow-[#FF5A36]/25 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Inquire via WhatsApp</span>
              </a>

              <button
                onClick={() => navigate(`/${product.categoryId === 'cat-gearwear' ? 'gearwear' : 'hosiery'}`)}
                className="bg-[#0B3D3B] hover:bg-[#072725] text-white font-bold text-xs tracking-wider uppercase py-4 px-6 rounded-xl inline-flex items-center justify-center space-x-2 transition-all shadow-sm cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#D9F0EC]" />
                <span>{product.categoryName} Hub</span>
              </button>
            </div>

            {/* Direct Manufacturer & Location Information Card */}
            <div className="mt-6 p-4 bg-[#FAFCFB] border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-[10px] font-mono text-[#0B3D3B] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A36]" />
                  Direct Manufacturer Desk
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {product.categoryName} Division
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="flex items-center space-x-2 text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                  <a href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`} className="hover:text-[#0B3D3B] font-semibold transition-colors">
                    {settings.contactPhone}
                  </a>
                </div>

                <div className="flex items-center space-x-2 text-slate-700">
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <a 
                    href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Safety Line team, I am inquiring about the ${product.name} (${product.sku}).`)}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="hover:text-[#0B3D3B] font-semibold text-[#1EBE5D] transition-colors"
                  >
                    WhatsApp: {settings.whatsappNumber}
                  </a>
                </div>

                <div className="flex items-center space-x-2 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-[#0B3D3B] transition-colors truncate">
                    {settings.contactEmail}
                  </a>
                </div>

                {settings.salesEmail && (
                  <div className="flex items-center space-x-2 text-slate-700">
                    <Mail className="w-3.5 h-3.5 text-[#0B3D3B] shrink-0" />
                    <a href={`mailto:${settings.salesEmail}`} className="hover:text-[#0B3D3B] transition-colors truncate">
                      {settings.salesEmail}
                    </a>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-slate-700 sm:col-span-2">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                  {settings.googleMapsUrl ? (
                    <a
                      href={settings.googleMapsUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1 text-[#0B3D3B] hover:text-[#FF5A36] font-bold underline underline-offset-2 transition-colors"
                    >
                      <span>Factory: {settings.officeAddress}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ) : (
                    <span>Factory: {settings.officeAddress}</span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Need customized technical specs?</span>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-[#0B3D3B] hover:text-[#FF5A36] font-bold underline cursor-pointer"
                >
                  Visit Contact & Wholesale Desk →
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ==========================================
            RELATED PRODUCTS RECOMMENDATION SECTION
           ========================================== */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#D9F0EC] text-[#0B3D3B] text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                  <span>Related Products</span>
                </div>
                <h3 className="font-display text-2xl font-extrabold text-[#0B3D3B] tracking-tight">
                  Complementary Designs
                </h3>
              </div>
              <button
                onClick={() => navigate(`/${product.categoryId === 'cat-gearwear' ? 'gearwear' : 'hosiery'}`)}
                className="text-xs font-bold text-[#0B3D3B] hover:text-[#FF5A36] uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View Full Line</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/product/${rel.slug}`)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#FF5A36] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col"
                >
                  <div className="aspect-[4/5] bg-slate-100 overflow-hidden relative">
                    <img
                      src={rel.coverImage}
                      alt={rel.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-[#0B3D3B] text-white px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase">
                      {rel.productCode}
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="text-[10px] text-slate-400 font-mono uppercase font-semibold">
                      {rel.material.split(',')[0]}
                    </p>
                    <h4 className="font-display font-bold text-[#0B3D3B] text-sm group-hover:text-[#FF5A36] transition-colors line-clamp-1">
                      {rel.name}
                    </h4>
                    <span className="text-[10px] font-bold text-[#FF5A36] uppercase tracking-wider inline-flex items-center gap-1 pt-1">
                      <span>View Specifications</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            PRODUCT FEEDBACK SECTION
           ========================================== */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
          <div className="border-b border-slate-100 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#D9F0EC] text-[#0B3D3B] text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                <span>Verified Field Reviews</span>
              </div>
              <h2 className="font-display text-2xl font-extrabold text-[#0B3D3B] tracking-tight">
                Feedback & Wear Notes for {product.name}
              </h2>
              <p className="text-slate-500 text-xs font-normal mt-1">
                Submit evaluation notes or view verified feedback from stockists and athletes.
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-[#FAFCFB] border border-slate-200 rounded-lg px-3.5 py-2 self-start md:self-center">
              <MessageSquare className="w-4 h-4 text-[#FF5A36]" />
              <span className="text-xs font-mono font-bold text-[#0B3D3B]">
                {feedbacks.length} Feedback Entr{feedbacks.length !== 1 ? 'ies' : 'y'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-left">
            
            {/* Submit feedback form */}
            <div className="lg:col-span-5 space-y-5">
              <h3 className="font-display font-bold text-[#0B3D3B] text-xs uppercase tracking-wider">
                Submit Product Feedback
              </h3>
              
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Erik Sundberg"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] focus:bg-white rounded-lg px-3.5 py-2 text-xs text-[#1A1A1A] outline-none transition-all"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. erik@athletic.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] focus:bg-white rounded-lg px-3.5 py-2 text-xs text-[#1A1A1A] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Rating</label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none transition-transform active:scale-110 cursor-pointer"
                        aria-label={`Rate ${star} Stars`}
                      >
                        <Star 
                          className={`w-5 h-5 ${
                            star <= rating 
                              ? 'text-[#FF5A36] fill-[#FF5A36]' 
                              : 'text-slate-200 hover:text-[#FF5A36]/60'
                          } transition-colors`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono text-slate-500 font-semibold ml-2">
                      ({rating}/5 Stars)
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Wear Experience / Technical Notes *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe material feel, fit accuracy, and compression performance..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] focus:bg-white rounded-lg px-3.5 py-2 text-xs text-[#1A1A1A] outline-none transition-all resize-none"
                  />
                </div>

                {successMsg && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs border border-emerald-200 font-normal">
                    {successMsg}
                  </div>
                )}

                {errorMsg && (
                  <div className="p-3 bg-rose-50 text-rose-800 rounded-lg text-xs border border-rose-200 font-normal">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0B3D3B] hover:bg-[#072725] disabled:opacity-50 text-white font-bold text-xs tracking-wider uppercase py-3 rounded-lg inline-flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D9F0EC]" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Product Feedback</span>
                  )}
                </button>
              </form>
            </div>

            {/* Right side: Feedbacks list */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="font-display font-bold text-[#0B3D3B] text-xs uppercase tracking-wider">
                Recent Feedback
              </h3>
              
              {feedbacks.length === 0 ? (
                <div className="bg-[#FAFCFB] border border-dashed border-slate-200 rounded-xl p-8 text-center">
                  <MessageSquare className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-500 font-normal text-xs">
                    No active feedback entries for this product yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                  {feedbacks.map((f) => (
                    <div key={f.id} className="bg-[#FAFCFB] p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="text-xs font-bold text-[#0B3D3B] font-display">{f.author}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(f.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                          </span>
                        </div>
                        <div className="flex text-[#FF5A36] space-x-0.5 shrink-0 bg-white border border-slate-200 px-2 py-0.5 rounded">
                          {[...Array(f.rating || 5)].map((_, idx) => (
                            <Star key={idx} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-slate-600 text-xs font-normal leading-relaxed whitespace-pre-line">
                        "{f.message}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#FF5A36]" />
            <span>Safety Line {parentCategoryLabel} Technical Catalogue</span>
          </div>
          <div className="flex items-center space-x-4 uppercase font-bold">
            <button onClick={() => navigate('/')} className="hover:text-[#0B3D3B] transition-colors cursor-pointer">Portal</button>
            <button onClick={() => navigate(`/${parentCategorySlug}`)} className="hover:text-[#FF5A36] transition-colors cursor-pointer">{parentCategoryLabel}</button>
            <button onClick={() => navigate('/about')} className="hover:text-[#0B3D3B] transition-colors cursor-pointer">About Us</button>
            <button onClick={() => navigate('/contact')} className="hover:text-[#FF5A36] transition-colors cursor-pointer">Contact Us</button>
          </div>
        </div>
      </footer>

      {product && (
        <ListingModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          productToEdit={product}
          defaultCategory={isGearwear ? 'gearwear' : 'accessories'}
          onSave={(updated) => {
            if (onUpdateProduct) onUpdateProduct(updated);
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
