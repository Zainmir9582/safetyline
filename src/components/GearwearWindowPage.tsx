import React, { useState, useMemo, useRef } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Upload, 
  ImageIcon, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  ShieldAlert, 
  Bike, 
  Flame, 
  Dumbbell, 
  Layers, 
  Search, 
  Sparkles, 
  ChevronRight,
  Info,
  PhoneCall,
  Mail,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { navigate, Link } from '../lib/router';
import { GearwearWindow, GEARWEAR_WINDOWS } from '../data/gearwearWindows';
import { Product, Settings } from '../types';
import ListingModal from './ListingModal';
import SmoothImage from './SmoothImage';
import SEO from './SEO';
import brandLogo from '../assets/images/safetyline_landing.png';

interface GearwearWindowPageProps {
  window: GearwearWindow;
  products: Product[];
  settings: Settings;
  onAddProduct?: (product: Product) => void;
  onUpdateProduct?: (product: Product) => void;
  onDeleteProduct?: (productId: string) => void;
}

const ICON_MAP: Record<GearwearWindow['iconName'], React.ComponentType<{ className?: string }>> = {
  ShieldAlert: ShieldAlert,
  Bike: Bike,
  Flame: Flame,
  Dumbbell: Dumbbell,
};

export const GearwearWindowPage: React.FC<GearwearWindowPageProps> = ({
  window: currentWindow,
  products,
  settings,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}) => {
  const Icon = ICON_MAP[currentWindow.iconName] || Layers;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal state for adding or editing products in this window
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products belonging to this specific window
  const windowProducts = useMemo(() => {
    return products.filter(p => {
      if (p.categoryId !== 'cat-gearwear') return false;
      
      const sub = (p.subcategory || '').toLowerCase();
      const slug = currentWindow.slug.toLowerCase();
      const pName = p.name.toLowerCase();
      const pCode = (p.productCode || '').toLowerCase();

      // Check subcategory match or keywords
      const isSubMatch = sub === slug;
      let isKeywordMatch = false;

      if (slug === 'tactical-gloves') {
        isKeywordMatch = pName.includes('tactical') || pName.includes('glove') || pCode.includes('tg');
      } else if (slug === 'road-cycling-apparel') {
        isKeywordMatch = pName.includes('cycl') || pName.includes('road') || pName.includes('aero') || pCode.includes('rc');
      } else if (slug === 'car-racing') {
        isKeywordMatch = pName.includes('racing') || pName.includes('motor') || pName.includes('kart') || pCode.includes('cr');
      } else if (slug === 'weight-lifting') {
        isKeywordMatch = pName.includes('lift') || pName.includes('weight') || pName.includes('belt') || pCode.includes('wl');
      }

      return isSubMatch || isKeywordMatch;
    });
  }, [products, currentWindow.slug]);

  // Search filtered products
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return windowProducts;
    return windowProducts.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.productCode.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q)
    );
  }, [windowProducts, searchQuery]);

  // Open modal for new product
  const handleOpenAddModal = () => {
    setProductToEdit(null);
    setIsListingModalOpen(true);
  };

  // Open modal for editing existing product
  const handleEditProduct = (prod: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setProductToEdit(prod);
    setIsListingModalOpen(true);
  };

  // Delete product handler
  const handleDeleteProduct = (prodId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this product image listing?')) {
      if (onDeleteProduct) onDeleteProduct(prodId);
    }
  };

  // Quick image file upload handler (converts file to base64 and opens modal)
  const handleQuickImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        // Pre-create a new product slot with this image
        const newProd: Product = {
          id: `prod-${currentWindow.codePrefix.toLowerCase()}-${Date.now().toString().slice(-5)}`,
          name: `${currentWindow.title} Item ${windowProducts.length + 1}`,
          slug: `${currentWindow.slug}-item-${Date.now().toString().slice(-5)}`,
          categoryId: 'cat-gearwear',
          categoryName: 'Gearwear',
          subcategory: currentWindow.slug,
          productCode: `${currentWindow.codePrefix}-${Math.floor(100 + Math.random() * 900)}`,
          shortDescription: `High-performance ${currentWindow.title.toLowerCase()} engineered with Safety Line technical craftsmanship.`,
          longDescription: currentWindow.description,
          material: currentWindow.specs[1]?.value || 'Technical High-Tensile Composite',
          sizes: ['S', 'M', 'L', 'XL'],
          features: currentWindow.features,
          status: 'Active',
          displayOrder: windowProducts.length + 1,
          coverImage: base64,
          galleryImages: [base64],
          createdAt: new Date().toISOString()
        };

        setProductToEdit(newProd);
        setIsListingModalOpen(true);
      }
    };
    reader.readAsDataURL(file);
    // Reset file input
    e.target.value = '';
  };

  // Save product from modal
  const handleSaveListing = (savedProd: Product) => {
    // Ensure subcategory and category are locked to this window
    const finalizedProd: Product = {
      ...savedProd,
      categoryId: 'cat-gearwear',
      categoryName: 'Gearwear',
      subcategory: currentWindow.slug
    };

    if (productToEdit && windowProducts.some(p => p.id === productToEdit.id)) {
      if (onUpdateProduct) onUpdateProduct(finalizedProd);
    } else {
      if (onAddProduct) onAddProduct(finalizedProd);
    }
  };

  // Other windows for quick switcher
  const otherWindows = useMemo(() => {
    return GEARWEAR_WINDOWS.filter(w => w.slug !== currentWindow.slug);
  }, [currentWindow.slug]);

  return (
    <div id="gearwear-window-page" className="min-h-screen bg-[#FAFCFB] text-[#1A1A1A] font-sans pb-24">
      
      <SEO
        title={`${currentWindow.title} | Safety Line Gearwear Division`}
        description={currentWindow.description}
        keywords={`${currentWindow.title}, Safety Line, Gearwear, Sialkot sports manufacturing, ${currentWindow.tagline}`}
      />

      {/* Hidden file input for quick direct image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleQuickImageUpload}
      />

      {/* Top Navbar Header */}
      <header className="sticky top-0 z-40 bg-[#0B3D3B] text-white border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo & Category Identification */}
          <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
            <img
              src={brandLogo}
              alt="Safety Line"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display font-black text-sm sm:text-base tracking-[0.16em] uppercase leading-none">
                <span className="text-[#EA2227]">SAFETY</span> <span className="text-white">LINE</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#D9F0EC] uppercase">
                Gearwear • {currentWindow.shortTitle}
              </span>
            </div>
          </Link>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => navigate('/gearwear')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Windows</span>
            </button>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FF5A36] hover:bg-[#e44e2b] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Product Image</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

        </div>
      </header>

      {/* Window Hero & Technical Blueprint Banner */}
      <section className="bg-gradient-to-b from-[#0B3D3B] to-[#072725] text-white py-12 sm:py-16 border-b border-white/10 relative overflow-hidden">
        
        {/* Subtle geometric background overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          
          {/* Breadcrumb Trail */}
          <div className="flex items-center space-x-2 text-xs font-mono text-[#D9F0EC]">
            <Link to="/" className="hover:text-white transition-colors">Portal</Link>
            <span>/</span>
            <Link to="/gearwear" className="hover:text-white transition-colors">Gearwear Windows</Link>
            <span>/</span>
            <span className="text-white font-bold">{currentWindow.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 8 cols: Title & Information */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#D9F0EC] text-xs font-mono font-semibold uppercase tracking-wider">
                <Icon className="w-4 h-4 text-[#FF5A36]" />
                <span>{currentWindow.badge}</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
                {currentWindow.title}
              </h1>

              <p className="text-sm sm:text-base font-mono font-semibold text-[#D9F0EC] uppercase tracking-wide">
                {currentWindow.tagline}
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-normal">
                {currentWindow.description}
              </p>

              {/* Action Buttons inside Hero */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={handleOpenAddModal}
                  className="bg-[#FF5A36] hover:bg-[#e44e2b] text-white px-6 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-lg shadow-[#FF5A36]/25 inline-flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product Image Window</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-[#D9F0EC]" />
                  <span>Direct Image Upload</span>
                </button>
              </div>
            </div>

            {/* Right 4 cols: Technical Specifications Card */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D9F0EC]">
                  Manufacturing Specs
                </span>
                <span className="text-[10px] font-mono bg-[#FF5A36] text-white px-2 py-0.5 rounded font-bold uppercase">
                  {currentWindow.codePrefix} Series
                </span>
              </div>

              <div className="space-y-3">
                {currentWindow.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="space-y-0.5">
                    <span className="text-[11px] font-mono text-slate-400 uppercase block">
                      {spec.label}
                    </span>
                    <span className="text-xs font-bold text-white block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/15">
                <span className="text-[10px] font-mono text-[#D9F0EC] block">
                  OEM / Custom Branding Available on all orders
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Main Content: Product List Images Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
        
        {/* Section Header & Search Toolbar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-display font-extrabold text-2xl text-[#0B3D3B]">
                Product List Images
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold">
                {windowProducts.length} Listed
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal mt-1">
              Products and catalog images listed under {currentWindow.title}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-xl py-2 pl-9 pr-3 text-xs text-[#1A1A1A] placeholder:text-slate-400 outline-none transition-colors"
              />
            </div>

            {/* Add Button */}
            <button
              onClick={handleOpenAddModal}
              className="w-full sm:w-auto bg-[#0B3D3B] hover:bg-[#072725] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#FF5A36]" />
              <span>Add New Image</span>
            </button>
          </div>

        </div>

        {/* Product Cards Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => navigate(`/product/${product.slug}`)}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-[#FF5A36] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Image Area */}
                    <div className="aspect-square bg-[#F8FAFB] relative overflow-hidden flex items-center justify-center p-3 border-b border-slate-100">
                      <SmoothImage
                        src={product.coverImage}
                        alt={product.name}
                        fallbackText={product.productCode}
                        containerClassName="w-full h-full flex items-center justify-center"
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Product Code Badge */}
                      <div className="absolute top-3 left-3 bg-[#0B3D3B] text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase shadow-xs">
                        {product.productCode}
                      </div>

                      {/* Quick Edit & Delete Hover Actions */}
                      <div className="absolute top-3 right-3 flex items-center space-x-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => handleEditProduct(product, e)}
                          className="w-8 h-8 rounded-lg bg-white/90 hover:bg-[#0B3D3B] hover:text-white text-slate-700 flex items-center justify-center shadow-md transition-colors cursor-pointer"
                          title="Edit product specs or image"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteProduct(product.id, e)}
                          className="w-8 h-8 rounded-lg bg-white/90 hover:bg-rose-600 hover:text-white text-slate-700 flex items-center justify-center shadow-md transition-colors cursor-pointer"
                          title="Remove product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF5A36] font-bold block">
                        {product.material ? product.material.split(',')[0] : currentWindow.title}
                      </span>

                      <h3 className="font-display font-bold text-base text-[#0B3D3B] group-hover:text-[#FF5A36] transition-colors line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-slate-600 text-xs font-normal leading-relaxed line-clamp-2">
                        {product.shortDescription}
                      </p>

                      {/* Sizing badges */}
                      {product.sizes && product.sizes.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-2">
                          {product.sizes.slice(0, 4).map((s, idx) => (
                            <span key={idx} className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 pt-0">
                    <div className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center justify-between transition-all bg-[#D9F0EC] group-hover:bg-[#0B3D3B] text-[#0B3D3B] group-hover:text-white">
                      <span>View Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty State: Ready for Adding Product List Images */
          <div className="bg-white rounded-3xl border-2 border-dashed border-slate-300 p-10 sm:p-16 text-center space-y-6">
            <div className="w-20 h-20 rounded-2xl bg-[#D9F0EC] text-[#0B3D3B] flex items-center justify-center mx-auto shadow-sm">
              <ImageIcon className="w-10 h-10 text-[#FF5A36]" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h3 className="font-display font-extrabold text-2xl text-[#0B3D3B]">
                No Product Images Listed Yet
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
                This is your dedicated {currentWindow.title} page where you can add product list images, model codes, material formulations, and sizes.
              </p>
            </div>

            {/* Direct Action Area */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="w-full sm:w-auto bg-[#0B3D3B] hover:bg-[#072725] text-white px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4 text-[#FF5A36]" />
                <span>Add Product Image Window</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto bg-[#FAFCFB] hover:bg-slate-100 text-[#0B3D3B] border border-slate-300 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Upload className="w-4 h-4 text-slate-500" />
                <span>Upload From Device</span>
              </button>
            </div>

            {/* Guidance tips */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 pt-4">
              <Info className="w-3.5 h-3.5" />
              <span>Supports JPG, PNG, WEBP high-resolution photos</span>
            </div>
          </div>
        )}

        {/* Quick Navigation to Other Windows */}
        <section className="pt-12 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-[#FF5A36] uppercase font-bold tracking-wider">
                Switch Production Window
              </span>
              <h3 className="font-display font-bold text-xl text-[#0B3D3B]">
                Other Gearwear Windows
              </h3>
            </div>
            
            <Link
              to="/gearwear"
              className="text-xs font-mono font-bold text-[#0B3D3B] hover:text-[#FF5A36] inline-flex items-center gap-1 uppercase"
            >
              <span>View All 4 Windows</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherWindows.map((win) => {
              const WinIcon = ICON_MAP[win.iconName] || Layers;
              const count = products.filter(p => p.categoryId === 'cat-gearwear' && p.subcategory === win.slug).length;

              return (
                <div
                  key={win.id}
                  onClick={() => navigate(win.routePath)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#FF5A36] transition-all hover:shadow-md cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-[#D9F0EC] text-[#0B3D3B] flex items-center justify-center transition-colors">
                      <WinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#0B3D3B] group-hover:text-[#FF5A36] transition-colors">
                        {win.title}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500">
                        {count} {count === 1 ? 'Product Image' : 'Product Images'}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF5A36] group-hover:translate-x-1 transition-all" />
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Listing Modal for Adding & Editing Products */}
      <ListingModal
        isOpen={isListingModalOpen}
        onClose={() => setIsListingModalOpen(false)}
        productToEdit={productToEdit}
        defaultCategory="gearwear"
        onSave={handleSaveListing}
        onDelete={onDeleteProduct}
      />

    </div>
  );
};

export default GearwearWindowPage;
