import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, CornerDownLeft, ShieldCheck, HelpCircle, PhoneCall, 
  AlertTriangle, MessageSquare, ZoomIn, ZoomOut, Maximize2, Minimize2, Move, RotateCcw, 
  X, Star, Loader2, MessageCircle, ArrowRight, CheckCircle2, Sparkles, Scan, Mail
} from 'lucide-react';
import { motion } from 'motion/react';
import { navigate } from '../lib/router';
import { Product, ProductFeedback } from '../types';
import { settings } from '../data';
import SEO from './SEO';
import SmoothImage from './SmoothImage';

interface ProductDetailsProps {
  slug: string;
  products: Product[];
  onUpdateProduct?: (product: Product) => void;
}

export default function ProductDetails({ slug, products, onUpdateProduct }: ProductDetailsProps) {
  const product = useMemo(() => {
    return products.find(p => p.slug === slug);
  }, [products, slug]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.id !== product.id && p.status === 'Active' && p.categoryId === product.categoryId)
      .slice(0, 4);
  }, [product, products]);

  // Gallery slider & Advanced Pan-Zoom states
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [zoomScale, setZoomScale] = useState<number>(2.5);
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isFullscreenZoom, setIsFullscreenZoom] = useState(false);
  const [fullscreenScale, setFullscreenScale] = useState<number>(2.8);
  const [fullscreenZoomPos, setFullscreenZoomPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isFullscreenHovering, setIsFullscreenHovering] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

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

  // Initialize selected size when product loads
  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      setActiveIndex(0);
      setIsZoomed(false);
      setZoomPos({ x: 50, y: 50 });
    }
  }, [product]);

  // Handle ESC key to close fullscreen inspector
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreenZoom) {
        setIsFullscreenZoom(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreenZoom]);

  // Cursor following calculations
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setZoomPos({ x, y });
    }
  };

  const handleStageTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const x = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100));
        setZoomPos({ x, y });
      }
    }
  };

  const handleFullscreenMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setFullscreenZoomPos({ x, y });
    }
  };

  const handleFullscreenTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const x = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100));
        setFullscreenZoomPos({ x, y });
      }
    }
  };

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
            {product.subcategory && (
              <>
                <span>/</span>
                <button
                  onClick={() => navigate(`/${parentCategorySlug}/${product.subcategory}`)}
                  className="hover:text-[#0B3D3B] transition-colors cursor-pointer font-bold capitalize"
                >
                  {product.subcategory.replace(/-/g, ' ')}
                </button>
              </>
            )}
            <span>/</span>
            <span className="text-[#0B3D3B] font-bold truncate max-w-xs">{product.name}</span>
          </div>

            <button
              id="back-to-products-btn"
              onClick={() => navigate(product.subcategory ? `/${parentCategorySlug}/${product.subcategory}` : `/${parentCategorySlug}`)}
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-[#0B3D3B] transition-colors cursor-pointer"
            >
              <CornerDownLeft className="w-4 h-4 text-[#FF5A36]" />
              <span>Back to {product.subcategory ? product.subcategory.replace(/-/g, ' ') : parentCategoryLabel}</span>
            </button>
        </div>

        {/* 2-Column Athletic Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
          
          {/* ==========================================
              LEFT SIDE: GALLERY SLIDER WITH ADVANCED PAN-ZOOM
             ========================================== */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            {/* Main Stage Frame with Cursor-Following Pan Zoom */}
            <div className="space-y-3">
              <div 
                ref={stageRef}
                className={`relative w-full aspect-[4/5] sm:aspect-square bg-slate-50 rounded-2xl overflow-hidden shadow-xs border border-slate-200 flex items-center justify-center p-2 sm:p-4 select-none ${
                  isZoomed ? 'cursor-move' : 'cursor-crosshair'
                }`}
                onMouseEnter={() => {
                  setIsAutoPlaying(false);
                  setIsHovering(true);
                }}
                onMouseLeave={() => {
                  setIsHovering(false);
                  if (!isZoomed) {
                    setZoomPos({ x: 50, y: 50 });
                  }
                }}
                onMouseMove={handleStageMouseMove}
                onTouchMove={handleStageTouchMove}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                {/* Main Image with Real-time Cursor Pan-Zoom */}
                <img
                  src={images[activeIndex]}
                  alt={`${product.name} showcase view`}
                  className="w-full h-full object-contain pointer-events-none will-change-transform"
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: isZoomed 
                      ? `scale(${zoomScale})` 
                      : isHovering 
                        ? 'scale(1.45)' 
                        : 'scale(1)',
                    transition: (isHovering || isZoomed) 
                      ? 'transform 0.15s ease-out, transform-origin 0.03s linear' 
                      : 'transform 0.35s ease-out, transform-origin 0.3s ease-out',
                  }}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />

                {/* Slider Next/Prev Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 text-[#0B3D3B] hover:bg-[#FF5A36] hover:text-white p-2 rounded-full shadow-md transition-colors z-20 cursor-pointer"
                      aria-label="Previous Image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleNext(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 text-[#0B3D3B] hover:bg-[#FF5A36] hover:text-white p-2 rounded-full shadow-md transition-colors z-20 cursor-pointer"
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

                {/* Fullscreen Inspect Button */}
                <div className="absolute top-3 right-3 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFullscreenZoom(true);
                    }}
                    title="Open Fullscreen Macro Inspector"
                    className="bg-white/90 hover:bg-[#0B3D3B] hover:text-white text-slate-700 p-2 rounded-lg shadow-sm border border-slate-200 transition-colors flex items-center space-x-1 text-xs font-mono cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Cursor Tracking Lens HUD */}
                {(isHovering || isZoomed) && (
                  <div className="absolute bottom-3 left-3 bg-neutral-900/85 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider z-20 flex items-center space-x-1.5 shadow-sm">
                    <Scan className="w-3.5 h-3.5 text-[#FF5A36] animate-pulse" />
                    <span>Focus: {Math.round(zoomPos.x)}%, {Math.round(zoomPos.y)}% ({isZoomed ? `${zoomScale}x Lock` : '1.45x Follow'})</span>
                  </div>
                )}

                {/* Zoom status hint */}
                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white flex items-center space-x-1.5 px-3 py-1 rounded-md text-[10px] font-mono tracking-wider z-20">
                  {isZoomed ? (
                    <>
                      <Move className="w-3.5 h-3.5 text-[#FF5A36]" />
                      <span>Pan to Move (Click to Reset)</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-3.5 h-3.5 text-[#D9F0EC]" />
                      <span>Hover / Click to Zoom</span>
                    </>
                  )}
                </div>
              </div>

              {/* Advanced Zoom Controls Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-100/75 rounded-xl border border-slate-200 text-xs font-mono">
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-wider flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-[#FF5A36]" />
                    <span>Zoom Level:</span>
                  </span>
                  {[1.75, 2.5, 3.5].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => {
                        setZoomScale(lvl);
                        setIsZoomed(true);
                      }}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                        zoomScale === lvl && isZoomed
                          ? 'bg-[#0B3D3B] text-white shadow-2xs'
                          : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300/60'
                      }`}
                    >
                      {lvl}x
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setIsZoomed(!isZoomed);
                      if (isZoomed) {
                        setZoomPos({ x: 50, y: 50 });
                      }
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer flex items-center space-x-1 ${
                      isZoomed 
                        ? 'bg-[#FF5A36] text-white shadow-2xs' 
                        : 'bg-white text-[#0B3D3B] border border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {isZoomed ? <ZoomOut className="w-3 h-3" /> : <ZoomIn className="w-3 h-3" />}
                    <span>{isZoomed ? 'Exit Zoom' : 'Lock Zoom'}</span>
                  </button>

                  <button
                    onClick={() => setIsFullscreenZoom(true)}
                    className="px-2.5 py-1 rounded text-[11px] font-bold bg-[#0B3D3B] text-white hover:bg-[#082C2A] transition-colors cursor-pointer flex items-center space-x-1 shadow-2xs"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Full Screen</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2.5 pt-1">
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
                    <SmoothImage 
                      src={img} 
                      alt={`Thumbnail view ${idx + 1}`} 
                      containerClassName="w-full h-full flex items-center justify-center"
                      className="w-full h-full object-contain" 
                      priority={idx < 2}
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
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#0B3D3B] bg-[#D9F0EC] px-2.5 py-1 rounded-md font-bold uppercase">
                      Catalogue Active
                    </span>
                  </div>
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

              {/* Available Sizes - Hidden for Gearwear */}
              {!isGearwear && product.sizes && product.sizes.length > 0 && (
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

              <a
                href={`mailto:${settings.contactEmail}?subject=${encodeURIComponent(`Catalogue Inquiry: ${product.name} (SL-${product.productCode})`)}&body=${encodeURIComponent(`Hello Safety Line Advisory Desk,\n\nI am inquiring regarding the ${product.name} (Code: SL-${product.productCode}). Please send the complete specification sheet and sample details.\n\nThank you.`)}`}
                className="bg-[#0B3D3B] hover:bg-[#072725] text-white font-bold text-xs tracking-wider uppercase py-4 px-5 rounded-xl inline-flex items-center justify-center space-x-2 transition-all shadow-sm cursor-pointer"
                title={`Email directly to ${settings.contactEmail}`}
              >
                <Mail className="w-4 h-4 text-[#D9F0EC]" />
                <span>Email Specs</span>
              </a>

              <button
                onClick={() => navigate(`/${parentCategorySlug}`)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs tracking-wider uppercase py-4 px-4 rounded-xl inline-flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>{parentCategoryLabel}</span>
              </button>
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
                onClick={() => navigate(`/${parentCategorySlug}`)}
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

      {/* ==========================================
          FULLSCREEN MACRO INSPECTOR MODAL
         ========================================== */}
      {isFullscreenZoom && (
        <div 
          className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex flex-col select-none animate-in fade-in duration-200"
          onClick={() => setIsFullscreenZoom(false)}
        >
          {/* Top Control Bar */}
          <div 
            className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/90 text-white z-30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3">
              <span className="text-[#FF5A36] font-mono font-bold text-xs uppercase tracking-wider">
                {product.productCode}
              </span>
              <span className="text-neutral-500">|</span>
              <h3 className="text-sm font-bold font-display text-white truncate max-w-sm sm:max-w-md">
                {product.name}
              </h3>
              <span className="bg-neutral-800 text-neutral-300 text-[10px] font-mono px-2 py-0.5 rounded">
                {activeIndex + 1} / {images.length}
              </span>
            </div>

            {/* Scale Controls & Info */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 bg-neutral-800 px-3 py-1 rounded-lg text-xs font-mono text-neutral-300">
                <Scan className="w-3.5 h-3.5 text-[#FF5A36] animate-pulse" />
                <span>Pan: {Math.round(fullscreenZoomPos.x)}%, {Math.round(fullscreenZoomPos.y)}%</span>
              </div>

              {/* Scale presets */}
              <div className="flex items-center space-x-1 bg-neutral-800 p-1 rounded-lg">
                {[1.5, 2.5, 3.5, 5.0].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFullscreenScale(s)}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                      fullscreenScale === s
                        ? 'bg-[#FF5A36] text-white'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              {/* Zoom Step Buttons */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setFullscreenScale(prev => Math.max(1.2, prev - 0.5))}
                  title="Zoom Out"
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setFullscreenScale(prev => Math.min(6.0, prev + 0.5))}
                  title="Zoom In"
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setFullscreenScale(2.5);
                    setFullscreenZoomPos({ x: 50, y: 50 });
                  }}
                  title="Reset Coordinates"
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsFullscreenZoom(false)}
                title="Close Inspector (ESC)"
                className="p-1.5 rounded-lg bg-[#FF5A36] hover:bg-[#E04826] text-white transition-colors cursor-pointer ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Inspection Canvas Area */}
          <div 
            className="flex-1 relative overflow-hidden flex items-center justify-center p-6 cursor-crosshair"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleFullscreenMouseMove}
            onTouchMove={handleFullscreenTouchMove}
            onMouseEnter={() => setIsFullscreenHovering(true)}
            onMouseLeave={() => setIsFullscreenHovering(false)}
          >
            <img
              src={images[activeIndex]}
              alt={`${product.name} Fullscreen Inspection`}
              className="max-w-full max-h-full object-contain pointer-events-none will-change-transform drop-shadow-2xl"
              style={{
                transformOrigin: `${fullscreenZoomPos.x}% ${fullscreenZoomPos.y}%`,
                transform: `scale(${fullscreenScale})`,
                transition: 'transform 0.15s ease-out, transform-origin 0.03s linear',
              }}
            />

            {/* Previous/Next Image Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-neutral-900/80 hover:bg-[#FF5A36] text-white p-3 rounded-full backdrop-blur-md shadow-xl transition-all cursor-pointer z-30"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-neutral-900/80 hover:bg-[#FF5A36] text-white p-3 rounded-full backdrop-blur-md shadow-xl transition-all cursor-pointer z-30"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Instruction Floating Pill */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900/85 backdrop-blur-md text-neutral-300 border border-neutral-800 px-4 py-1.5 rounded-full text-xs font-mono flex items-center space-x-2 pointer-events-none shadow-lg z-30">
              <Move className="w-3.5 h-3.5 text-[#FF5A36] animate-pulse" />
              <span>Move cursor anywhere to inspect high-definition fabric & seams • ESC to close</span>
            </div>
          </div>

          {/* Bottom Thumbnails Strip */}
          {images.length > 1 && (
            <div 
              className="px-6 py-3 border-t border-neutral-800 bg-neutral-900/80 flex items-center justify-center space-x-3 z-30 overflow-x-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-neutral-800 p-1 flex items-center justify-center shrink-0 ${
                    idx === activeIndex
                      ? 'border-[#FF5A36] ring-2 ring-[#FF5A36]/40 scale-105'
                      : 'border-neutral-700 opacity-60 hover:opacity-100 hover:border-neutral-500'
                  }`}
                >
                  <img 
                    src={img} 
                    alt="Thumbnail" 
                    className="w-full h-full object-contain" 
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
