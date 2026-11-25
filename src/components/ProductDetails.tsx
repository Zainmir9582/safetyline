import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CornerDownLeft,
  ShieldCheck,
  HelpCircle,
  AlertTriangle,
  MessageSquare,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Move,
  RotateCcw,
  X,
  Star,
  Loader2,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Scan,
  Mail,
} from 'lucide-react';
import { navigate } from '../lib/router';
import { Product, ProductFeedback } from '../types';
import { settings } from '../data';
import SEO from './SEO';
import SmoothImage from './SmoothImage';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import InquiryLoadingModal from './InquiryLoadingModal';

interface ProductDetailsProps {
  slug: string;
  products: Product[];
  onUpdateProduct?: (product: Product) => void;
}

export default function ProductDetails({ slug, products }: ProductDetailsProps) {
  const product = useMemo(() => {
    return products.find(p => p.slug === slug);
  }, [products, slug]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.id !== product.id && p.status === 'Active' && p.categoryId === product.categoryId)
      .slice(0, 4);
  }, [product, products]);

  // Gallery slider & Pan-Zoom state
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
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreenZoom) {
        setIsFullscreenZoom(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreenZoom]);

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

  const images = useMemo(() => {
    if (!product) return [];
    const list = [...(product.galleryImages || [])];
    if (list.length === 0 || !list.includes(product.coverImage)) {
      list.unshift(product.coverImage);
    }
    return Array.from(new Set(list));
  }, [product]);

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
      <div id="product-not-found" className="min-h-screen flex flex-col bg-[#F7F6F2] text-[#141918]">
        <SiteHeader variant="obsidian" />
        <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-24">
          <AlertTriangle className="w-12 h-12 text-[#D92227] mb-5" />
          <h2 className="font-display text-2xl font-extrabold text-[#141918]">Product Not Found</h2>
          <p className="text-[#525957] text-sm max-w-sm mt-2">
            The requested product could not be located in our digital catalogue.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-6 bg-[#0E1A19] hover:bg-[#122B29] text-white px-6 py-3 rounded-sm text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer"
          >
            Return to Catalogue Home
          </button>
        </div>
        <Footer settings={settings} />
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
    <div id="product-details-root" className="bg-[#F7F6F2] min-h-screen font-sans text-[#141918] flex flex-col">
      <SEO
        title={`${product.seoTitle || product.name} | Safety Line`}
        description={product.seoDescription || product.shortDescription}
        keywords={`${product.name}, ${product.productCode}, Safety Line, athletic ${product.categoryName}, ${product.material}`}
        image={product.coverImage}
        type="product"
        schema={productSchema}
      />

      <SiteHeader
        variant="obsidian"
        ctaLabel="Request OEM Spec"
        onOpenInquiry={() => setIsInquiryModalOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 flex-grow w-full">

        {/* Breadcrumb & Context Return Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2DFD7] pb-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#525957]">
            <button onClick={() => navigate('/')} className="hover:text-[#141918] transition-colors cursor-pointer">
              Portal
            </button>
            <span>/</span>
            <button
              onClick={() => navigate(`/${parentCategorySlug}`)}
              className="hover:text-[#141918] transition-colors cursor-pointer font-semibold"
            >
              {parentCategoryLabel}
            </button>
            {product.subcategory && (
              <>
                <span>/</span>
                <button
                  onClick={() => navigate(`/${parentCategorySlug}/${product.subcategory}`)}
                  className="hover:text-[#141918] transition-colors cursor-pointer font-semibold capitalize"
                >
                  {product.subcategory.replace(/-/g, ' ')}
                </button>
              </>
            )}
            <span>/</span>
            <span className="text-[#141918] font-bold truncate max-w-xs">{product.name}</span>
          </div>

          <button
            id="back-to-products-btn"
            type="button"
            onClick={() => navigate(product.subcategory ? `/${parentCategorySlug}/${product.subcategory}` : `/${parentCategorySlug}`)}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#525957] hover:text-[#141918] transition-colors cursor-pointer"
          >
            <CornerDownLeft className="w-3.5 h-3.5 text-[#D92227]" />
            <span>Back to {product.subcategory ? product.subcategory.replace(/-/g, ' ') : parentCategoryLabel}</span>
          </button>
        </div>

        {/* 2-Column Technical Specification Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-sm border border-[#E2DFD7]">

          {/* Left: Studio Stage + Cursor Pan-Zoom */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div
                ref={stageRef}
                className={`relative w-full aspect-[4/5] sm:aspect-square bg-[#F7F6F2] rounded-sm overflow-hidden border border-[#E2DFD7] flex items-center justify-center p-4 sm:p-6 select-none ${
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
                <img
                  src={images[activeIndex]}
                  alt={`${product.name} showcase view`}
                  className="w-full h-full object-contain pointer-events-none will-change-transform"
                  style={{
                    mixBlendMode: 'multiply',
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

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white border border-[#E2DFD7] text-[#141918] hover:border-[#141918] p-2 rounded-sm transition-colors z-20 cursor-pointer"
                      aria-label="Previous Image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleNext(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white border border-[#E2DFD7] text-[#141918] hover:border-[#141918] p-2 rounded-sm transition-colors z-20 cursor-pointer"
                      aria-label="Next Image"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-[#0E1A19] text-white text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-sm font-semibold">
                    {product.categoryName}
                  </span>
                </div>

                <div className="absolute top-3 right-3 z-20">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFullscreenZoom(true);
                    }}
                    title="Open Fullscreen Macro Inspector"
                    className="bg-white hover:bg-[#0E1A19] hover:text-white text-[#141918] p-2 rounded-sm border border-[#E2DFD7] transition-colors flex items-center text-xs font-mono cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {(isHovering || isZoomed) && (
                  <div className="absolute bottom-3 left-3 bg-[#0E1A19]/90 text-white px-2.5 py-1 rounded-sm text-[10px] font-mono tracking-wider z-20 flex items-center gap-1.5">
                    <Scan className="w-3.5 h-3.5 text-[#D92227]" />
                    <span className="tabular-nums">
                      Focus: {Math.round(zoomPos.x)}%, {Math.round(zoomPos.y)}% ({isZoomed ? `${zoomScale}x Lock` : '1.45x Follow'})
                    </span>
                  </div>
                )}

                <div className="absolute bottom-3 right-3 bg-[#0E1A19]/85 text-white flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-mono tracking-wider z-20">
                  {isZoomed ? (
                    <>
                      <Move className="w-3.5 h-3.5 text-[#D92227]" />
                      <span>Pan to Move · Click to Reset</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-3.5 h-3.5 text-white/80" />
                      <span>Hover / Click to Zoom</span>
                    </>
                  )}
                </div>
              </div>

              {/* Magnification Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#F7F6F2] rounded-sm border border-[#E2DFD7] text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#525957] font-semibold uppercase text-[10px] tracking-wider mr-1">
                    Magnification:
                  </span>
                  {[1.75, 2.5, 3.5].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        setZoomScale(lvl);
                        setIsZoomed(true);
                      }}
                      className={`px-2.5 py-1 rounded-sm text-[11px] font-semibold tabular-nums transition-colors cursor-pointer border ${
                        zoomScale === lvl && isZoomed
                          ? 'bg-[#0E1A19] text-white border-[#0E1A19]'
                          : 'bg-white text-[#141918] hover:border-[#141918] border-[#E2DFD7]'
                      }`}
                    >
                      {lvl}x
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsZoomed(!isZoomed);
                      if (isZoomed) {
                        setZoomPos({ x: 50, y: 50 });
                      }
                    }}
                    className={`px-2.5 py-1 rounded-sm text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 border ${
                      isZoomed
                        ? 'bg-[#D92227] text-white border-[#D92227]'
                        : 'bg-white text-[#141918] border-[#E2DFD7] hover:border-[#141918]'
                    }`}
                  >
                    {isZoomed ? <ZoomOut className="w-3 h-3" /> : <ZoomIn className="w-3 h-3" />}
                    <span>{isZoomed ? 'Exit Zoom' : 'Lock Zoom'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsFullscreenZoom(true)}
                    className="px-2.5 py-1 rounded-sm text-[11px] font-semibold bg-[#0E1A19] text-white hover:bg-[#122B29] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Full Screen</span>
                  </button>
                </div>
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2.5 pt-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleThumbnailClick(idx)}
                    className={`aspect-square rounded-sm overflow-hidden border transition-all cursor-pointer bg-[#F7F6F2] flex items-center justify-center p-1.5 ${
                      idx === activeIndex
                        ? 'border-[#D92227] ring-1 ring-[#D92227]'
                        : 'border-[#E2DFD7] opacity-75 hover:opacity-100 hover:border-[#141918]'
                    }`}
                  >
                    <SmoothImage
                      src={img}
                      alt={`Thumbnail view ${idx + 1}`}
                      style={{ mixBlendMode: 'multiply' }}
                      containerClassName="w-full h-full flex items-center justify-center"
                      className="w-full h-full object-contain"
                      priority={idx < 2}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Detailed Product Specification Ledger */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="space-y-2 pb-5 border-b border-[#E2DFD7]">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#D92227] font-mono text-xs uppercase tracking-wider font-bold tabular-nums">
                    CODE: {product.productCode}
                  </span>
                  <span className="text-[10px] font-mono text-[#525957] uppercase tracking-wider">
                    Catalogue Active
                  </span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#141918] tracking-tight leading-tight">
                  {product.name}
                </h1>

                <p className="text-xs font-mono text-[#525957] pt-0.5">
                  {product.material.split(',')[0]}
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="font-mono font-bold text-[#141918] text-xs uppercase tracking-[0.14em]">
                  Product Overview &amp; Function
                </h2>
                <p className="text-[#525957] leading-relaxed text-sm sm:text-base">
                  {product.longDescription || product.shortDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 border border-[#E2DFD7] divide-y sm:divide-y-0 sm:divide-x divide-[#E2DFD7] bg-[#F7F6F2]/60">
                <div className="p-4 space-y-1">
                  <span className="text-[10px] text-[#525957] font-mono uppercase tracking-wider block font-semibold">
                    Material / Fiber Composition
                  </span>
                  <span className="text-[#141918] text-xs font-semibold block">{product.material}</span>
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[10px] text-[#525957] font-mono uppercase tracking-wider block font-semibold">
                    Quality Standard
                  </span>
                  <span className="text-[#141918] text-xs font-semibold inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#D92227]" />
                    <span>OEKO-TEX Standard 100</span>
                  </span>
                </div>
              </div>

              {!isGearwear && product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <h3 className="font-mono font-bold text-[#141918] text-xs uppercase tracking-[0.14em]">
                      Available Sizes
                    </h3>
                    <span className="text-[11px] text-[#525957] font-mono">Selected: {selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`text-xs font-mono font-semibold px-3.5 py-1.5 rounded-sm border transition-colors cursor-pointer ${
                          selectedSize === s
                            ? 'bg-[#0E1A19] text-white border-[#0E1A19]'
                            : 'bg-white hover:border-[#141918] border-[#E2DFD7] text-[#141918]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.features && product.features.length > 0 && (
                <div className="space-y-2.5">
                  <h3 className="font-mono font-bold text-[#141918] text-xs uppercase tracking-[0.14em]">
                    Performance Features
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start text-xs sm:text-sm text-[#525957]">
                        <CheckCircle2 className="w-4 h-4 text-[#D92227] mr-2 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specification Serial Bar */}
              <div className="p-4 sm:p-5 bg-[#F7F6F2] border border-[#E2DFD7] rounded-sm flex items-center justify-between gap-4">
                <div>
                  <span className="font-display font-extrabold text-xs sm:text-sm uppercase tracking-[0.12em] block">
                    <span className="text-[#D92227]">SAFETY</span> <span className="text-[#141918]">LINE</span>
                  </span>
                  <p className="text-[11px] font-mono text-[#525957] uppercase tracking-wider mt-0.5">
                    Official Specification File · Serial SL-{product.productCode}
                  </p>
                </div>

                <div className="hidden sm:block text-right shrink-0">
                  <span className="text-[10px] font-mono uppercase text-[#525957] block">Standard</span>
                  <span className="text-xs font-mono font-bold text-[#141918]">
                    ISO 9001:2015
                  </span>
                </div>
              </div>

              <div className="p-4 border border-[#E2DFD7] rounded-sm space-y-1 bg-white">
                <span className="font-mono font-bold text-[#141918] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[#D92227] shrink-0" />
                  <span>Showcase &amp; Wholesale Procurement Note</span>
                </span>
                <p className="text-[#525957] text-xs leading-relaxed">
                  This item is part of our digital product catalogue. Direct ordering, bespoke team specifications, and wholesale sample swatch packs are handled directly by our concierge.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-[#E2DFD7] grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="bg-[#D92227] hover:bg-[#B5191D] text-white font-mono font-bold text-xs tracking-wider uppercase py-3.5 px-5 rounded-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setIsInquiryModalOpen(true)}
                className="bg-[#0E1A19] hover:bg-[#122B29] text-white font-mono font-bold text-xs tracking-wider uppercase py-3.5 px-5 rounded-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Request OEM Spec Pack</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`mailto:${settings.contactEmail}?subject=${encodeURIComponent(`Catalogue Inquiry: ${product.name} (SL-${product.productCode})`)}&body=${encodeURIComponent(`Hello Safety Line Advisory Desk,\n\nI am inquiring regarding the ${product.name} (Code: SL-${product.productCode}). Please send the complete specification sheet and sample details.\n\nThank you.`)}`}
                className="bg-white hover:bg-[#ECE9E1] text-[#141918] border border-[#E2DFD7] font-mono font-bold text-xs tracking-wider uppercase py-3.5 px-5 rounded-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                title={`Email directly to ${settings.contactEmail}`}
              >
                <Mail className="w-4 h-4 text-[#D92227]" />
                <span>Email Specs</span>
              </a>

              <button
                type="button"
                onClick={() => navigate(`/${parentCategorySlug}`)}
                className="bg-[#F7F6F2] hover:bg-[#ECE9E1] text-[#141918] border border-[#E2DFD7] font-mono font-bold text-xs tracking-wider uppercase py-3.5 px-5 rounded-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Browse {parentCategoryLabel}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6 pt-4">
            <div className="flex items-end justify-between border-b border-[#E2DFD7] pb-4">
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[#D92227] block">
                  Related Designs
                </span>
                <h3 className="font-display text-2xl font-extrabold text-[#141918] tracking-tight mt-0.5">
                  Complementary Lines
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/${parentCategorySlug}`)}
                className="text-xs font-mono font-bold text-[#141918] hover:text-[#D92227] uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer transition-colors"
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
                  className="group cursor-pointer bg-white rounded-sm overflow-hidden border border-[#E2DFD7] hover:border-[#141918] transition-colors flex flex-col"
                >
                  <div className="aspect-[4/5] bg-[#F7F6F2] overflow-hidden relative p-4 flex items-center justify-center">
                    <img
                      src={rel.coverImage}
                      alt={rel.name}
                      style={{ mixBlendMode: 'multiply' }}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 border-t border-[#E2DFD7] space-y-1.5">
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-[#525957]">
                      <span className="truncate">{rel.material.split(',')[0]}</span>
                      <span className="font-bold text-[#D92227] tabular-nums shrink-0">{rel.productCode}</span>
                    </div>
                    <h4 className="font-display font-bold text-[#141918] text-sm group-hover:text-[#D92227] transition-colors line-clamp-1">
                      {rel.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Product Feedback & Field Notes */}
        <section className="bg-white rounded-sm p-6 sm:p-10 border border-[#E2DFD7] space-y-8">
          <div className="border-b border-[#E2DFD7] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[#D92227] block">
                Verified Field Reviews
              </span>
              <h2 className="font-display text-2xl font-extrabold text-[#141918] tracking-tight mt-0.5">
                Feedback &amp; Wear Notes for {product.name}
              </h2>
              <p className="text-[#525957] text-xs mt-1">
                Submit evaluation notes or view verified feedback from stockists and athletes.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#F7F6F2] border border-[#E2DFD7] rounded-sm px-3.5 py-2 self-start md:self-center">
              <MessageSquare className="w-4 h-4 text-[#D92227]" />
              <span className="text-xs font-mono font-semibold text-[#141918] tabular-nums">
                {feedbacks.length} Feedback Entr{feedbacks.length !== 1 ? 'ies' : 'y'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-5">
              <h3 className="font-mono font-bold text-[#141918] text-xs uppercase tracking-[0.14em]">
                Submit Product Feedback
              </h3>

              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-[#525957] uppercase tracking-wider font-semibold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Erik Sundberg"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full bg-[#F7F6F2] border border-[#E2DFD7] focus:border-[#141918] focus:bg-white rounded-sm px-3.5 py-2.5 text-xs text-[#141918] outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-[#525957] uppercase tracking-wider font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. erik@athletic.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F7F6F2] border border-[#E2DFD7] focus:border-[#141918] focus:bg-white rounded-sm px-3.5 py-2.5 text-xs text-[#141918] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-[#525957] uppercase tracking-wider font-semibold">
                    Rating
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none cursor-pointer"
                        aria-label={`Rate ${star} Stars`}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating
                              ? 'text-[#D92227] fill-[#D92227]'
                              : 'text-[#E2DFD7] hover:text-[#D92227]/60'
                          } transition-colors`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono text-[#525957] font-semibold ml-2 tabular-nums">
                      ({rating}/5 Stars)
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-[#525957] uppercase tracking-wider font-semibold">
                    Wear Experience / Technical Notes *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe material feel, fit accuracy, and compression performance..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#F7F6F2] border border-[#E2DFD7] focus:border-[#141918] focus:bg-white rounded-sm px-3.5 py-2.5 text-xs text-[#141918] outline-none transition-colors resize-none"
                  />
                </div>

                {successMsg && (
                  <div className="p-3 bg-emerald-50 text-emerald-900 rounded-sm text-xs border border-emerald-200">
                    {successMsg}
                  </div>
                )}

                {errorMsg && (
                  <div className="p-3 bg-rose-50 text-rose-900 rounded-sm text-xs border border-rose-200">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0E1A19] hover:bg-[#122B29] disabled:opacity-50 text-white font-mono font-bold text-xs tracking-wider uppercase py-3 rounded-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Product Feedback</span>
                  )}
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <h3 className="font-mono font-bold text-[#141918] text-xs uppercase tracking-[0.14em]">
                Recent Feedback
              </h3>

              {feedbacks.length === 0 ? (
                <div className="bg-[#F7F6F2] border border-[#E2DFD7] rounded-sm p-8 text-center">
                  <MessageSquare className="w-6 h-6 text-[#525957] mx-auto mb-2" />
                  <p className="text-[#525957] text-xs">
                    No active feedback entries for this product yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                  {feedbacks.map((f) => (
                    <div key={f.id} className="bg-[#F7F6F2] p-4 rounded-sm border border-[#E2DFD7] space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="text-xs font-bold text-[#141918] font-display">{f.author}</h4>
                          <span className="text-[10px] text-[#525957] font-mono">
                            {new Date(f.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                          </span>
                        </div>
                        <div className="flex text-[#D92227] space-x-0.5 shrink-0 bg-white border border-[#E2DFD7] px-2 py-0.5 rounded-sm">
                          {[...Array(f.rating || 5)].map((_, idx) => (
                            <Star key={idx} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>

                      <p className="text-[#525957] text-xs leading-relaxed whitespace-pre-line">
                        &ldquo;{f.message}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer settings={settings} />

      {/* Fullscreen Macro Inspector */}
      {isFullscreenZoom && (
        <div
          className="fixed inset-0 z-50 bg-[#0E1A19]/96 flex flex-col select-none"
          onClick={() => setIsFullscreenZoom(false)}
        >
          <div
            className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0E1A19] text-white z-30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3">
              <span className="text-[#D92227] font-mono font-bold text-xs uppercase tracking-wider tabular-nums">
                {product.productCode}
              </span>
              <span className="text-white/30">|</span>
              <h3 className="text-sm font-bold font-display text-white truncate max-w-sm sm:max-w-md">
                {product.name}
              </h3>
              <span className="bg-white/10 text-white/80 text-[10px] font-mono px-2 py-0.5 rounded-sm tabular-nums">
                {activeIndex + 1} / {images.length}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-sm text-xs font-mono text-white/80 tabular-nums">
                <Scan className="w-3.5 h-3.5 text-[#D92227]" />
                <span>Pan: {Math.round(fullscreenZoomPos.x)}%, {Math.round(fullscreenZoomPos.y)}%</span>
              </div>

              <div className="flex items-center space-x-1 bg-white/5 border border-white/10 p-1 rounded-sm">
                {[1.5, 2.5, 3.5, 5.0].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFullscreenScale(s)}
                    className={`px-2.5 py-1 rounded-sm text-xs font-mono font-bold tabular-nums transition-colors cursor-pointer ${
                      fullscreenScale === s
                        ? 'bg-[#D92227] text-white'
                        : 'text-white/65 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setFullscreenScale(prev => Math.max(1.2, prev - 0.5))}
                  title="Zoom Out"
                  className="p-1.5 rounded-sm bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setFullscreenScale(prev => Math.min(6.0, prev + 0.5))}
                  title="Zoom In"
                  className="p-1.5 rounded-sm bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFullscreenScale(2.5);
                    setFullscreenZoomPos({ x: 50, y: 50 });
                  }}
                  title="Reset Coordinates"
                  className="p-1.5 rounded-sm bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsFullscreenZoom(false)}
                title="Close Inspector (ESC)"
                className="p-1.5 rounded-sm bg-[#D92227] hover:bg-[#B5191D] text-white transition-colors cursor-pointer ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            className="flex-1 relative overflow-hidden flex items-center justify-center p-6 cursor-crosshair bg-white/95"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleFullscreenMouseMove}
            onTouchMove={handleFullscreenTouchMove}
          >
            <img
              src={images[activeIndex]}
              alt={`${product.name} Fullscreen Inspection`}
              className="max-w-full max-h-full object-contain pointer-events-none will-change-transform"
              style={{
                transformOrigin: `${fullscreenZoomPos.x}% ${fullscreenZoomPos.y}%`,
                transform: `scale(${fullscreenScale})`,
                transition: 'transform 0.15s ease-out, transform-origin 0.03s linear',
              }}
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-[#0E1A19] hover:bg-[#D92227] text-white p-3 rounded-sm transition-colors cursor-pointer z-30"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#0E1A19] hover:bg-[#D92227] text-white p-3 rounded-sm transition-colors cursor-pointer z-30"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0E1A19]/90 text-white px-4 py-1.5 rounded-sm text-xs font-mono flex items-center gap-2 pointer-events-none z-30">
              <Move className="w-3.5 h-3.5 text-[#D92227]" />
              <span>Move cursor anywhere to inspect fabric &amp; seams · ESC to close</span>
            </div>
          </div>

          {images.length > 1 && (
            <div
              className="px-6 py-3 border-t border-white/10 bg-[#0E1A19] flex items-center justify-center space-x-3 z-30 overflow-x-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`w-14 h-14 rounded-sm overflow-hidden border transition-all cursor-pointer bg-white p-1 flex items-center justify-center shrink-0 ${
                    idx === activeIndex
                      ? 'border-[#D92227] ring-1 ring-[#D92227]'
                      : 'border-white/20 opacity-70 hover:opacity-100'
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

      {product && (
        <InquiryLoadingModal
          isOpen={isInquiryModalOpen}
          onClose={() => setIsInquiryModalOpen(false)}
          settings={settings}
          defaultCategory={product.categoryName}
          defaultProductTitle={`${product.name} (Code: SL-${product.productCode})`}
        />
      )}
    </div>
  );
}
