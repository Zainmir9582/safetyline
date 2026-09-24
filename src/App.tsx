import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import PortalLanding from './components/PortalLanding';
import CategoryHub from './components/CategoryHub';
import GearwearWindowPage from './components/GearwearWindowPage';
import ProductDetails from './components/ProductDetails';
import BlogDetails from './components/BlogDetails';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import { usePath, navigate } from './lib/router';
import { Product, Settings } from './types';
import { products as defaultProducts, settings as defaultSettings } from './data';
import { getGearwearWindowBySlug } from './data/gearwearWindows';
import { Award, ArrowRight } from 'lucide-react';

const LOCAL_STORAGE_PRODUCTS_KEY = 'safetyline_catalogue_v18';

export default function App() {
  const currentPath = usePath();

  // Primary data initialized with local storage persistence fallback
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      // Clear legacy storage keys that may have cached previous products
      localStorage.removeItem('safetyline_catalogue_v17');
      localStorage.removeItem('safetyline_catalogue_v16');
      localStorage.removeItem('safetyline_catalogue_v15');
      localStorage.removeItem('safetyline_catalogue_v14');
      localStorage.removeItem('safetyline_catalogue_v13');
      localStorage.removeItem('safetyline_catalogue_v12');
      localStorage.removeItem('safetyline_catalogue_v11');
      localStorage.removeItem('safetyline_catalogue_v10');
      localStorage.removeItem('safetyline_catalogue_v9');
      localStorage.removeItem('safetyline_catalogue_v8');
      localStorage.removeItem('safetyline_catalogue_v7');
      localStorage.removeItem('safetyline_catalogue_v6');
      localStorage.removeItem('safetyline_catalogue_v5');
      localStorage.removeItem('safetyline_catalogue_v4');
      localStorage.removeItem('safetyline_catalogue_v3');
      localStorage.removeItem('safetyline_catalogue_v2');
      localStorage.removeItem('safetyline_catalogue_v1');
      const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cleaned = parsed.filter((p: Product) =>
            !p.isListingSlot &&
            !p.coverImage?.includes('unsplash') &&
            !p.coverImage?.includes('LISTING WINDOW') &&
            !p.id.startsWith('prod-gw-d1211') &&
            !['prod-apx-01', 'prod-znt-02', 'prod-chr-03', 'prod-str-04', 'prod-vng-05', 'prod-ttn-06', 'prod-end-07', 'prod-hys-08', 'prod-vel-05', 'prod-mer-06'].includes(p.id)
          );
          if (cleaned.length > 0) return cleaned;
        }
      }
    } catch (err) {
      console.warn('Using default products due to storage parse issue', err);
    }
    return defaultProducts;
  });
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  // Handlers for dynamic listing windows and product customization
  const handleUpdateProduct = (updatedProd: Product) => {
    setProducts(prev => {
      const next = prev.map(p => p.id === updatedProd.id ? updatedProd : p);
      try {
        localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save to local storage', e);
      }
      return next;
    });
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts(prev => {
      const next = [newProd, ...prev];
      try {
        localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save to local storage', e);
      }
      return next;
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => {
      const next = prev.filter(p => p.id !== productId);
      try {
        localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save to local storage', e);
      }
      return next;
    });
  };

  // Sync with API if running in full stack mode, else seamlessly uses local data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, setRes] = await Promise.all([
          fetch('/api/products').catch(() => null),
          fetch('/api/settings').catch(() => null)
        ]);

        if (prodRes && prodRes.ok) {
          const p = await prodRes.json();
          if (Array.isArray(p) && p.length > 0) {
            setProducts(p);
            try {
              localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(p));
            } catch (e) {}
          }
        }
        if (setRes && setRes.ok) {
          const s = await setRes.json();
          if (s && s.companyName) setSettings(s);
        }
      } catch (err) {
        // Safe fallback to static dataset
      }
    };

    fetchData();
  }, []);

  // Back to top on path change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentPath]);

  // Routing render block with path normalization and direct alias routing
  const renderView = () => {
    const cleanPath = currentPath.replace(/\/+$/, '').toLowerCase() || '/';

    // 1. Root Gateway Portal (Landing page showing official emblem and division selector)
    if (cleanPath === '/' || cleanPath === '') {
      return <PortalLanding />;
    }

    // 2. Dedicated Gearwear Division Page (Athletic Knits, Technical Outerwear, Specs)
    if (
      cleanPath === '/gearwear' || 
      cleanPath === '/products/gearwear' || 
      cleanPath === '/catalog/gearwear' || 
      cleanPath === '/sportswear' || 
      cleanPath === '/apparel'
    ) {
      return (
        <CategoryHub 
          categorySlug="gearwear" 
          products={products} 
          settings={settings} 
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      );
    }

    // 2b. Dedicated Gearwear Production Windows: Tactical Gloves, Road & Cycling Apparel, Car Racing, Weight Lifting
    let windowSlugMatch: string | null = null;
    if (cleanPath.startsWith('/gearwear/')) {
      windowSlugMatch = cleanPath.substring('/gearwear/'.length);
    } else if (cleanPath === '/tactical-gloves' || cleanPath === '/products/tactical-gloves') {
      windowSlugMatch = 'tactical-gloves';
    } else if (
      cleanPath === '/road-cycling-apparel' || 
      cleanPath === '/road-cycling' || 
      cleanPath === '/cycling' || 
      cleanPath === '/cycling-apparel'
    ) {
      windowSlugMatch = 'road-cycling-apparel';
    } else if (cleanPath === '/car-racing' || cleanPath === '/motorsport' || cleanPath === '/racing') {
      windowSlugMatch = 'car-racing';
    } else if (cleanPath === '/weight-lifting' || cleanPath === '/weightlifting' || cleanPath === '/lifting') {
      windowSlugMatch = 'weight-lifting';
    }

    if (windowSlugMatch) {
      const targetWindow = getGearwearWindowBySlug(windowSlugMatch);
      if (targetWindow) {
        return (
          <GearwearWindowPage 
            window={targetWindow}
            products={products}
            settings={settings}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );
      }
    }

    // 3. Dedicated Accessories Division Page (Technical Accessories, Compression Sleeves, Legwear)
    if (
      cleanPath === '/accessories' || 
      cleanPath === '/hosiery' || 
      cleanPath === '/products/accessories' || 
      cleanPath === '/products/hosiery' || 
      cleanPath === '/catalog/accessories' ||
      cleanPath === '/catalog/hosiery'
    ) {
      return (
        <CategoryHub 
          categorySlug="accessories" 
          products={products} 
          settings={settings} 
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      );
    }

    // 4. Product details dynamic page
    if (cleanPath.startsWith('/product/')) {
      const slug = cleanPath.substring('/product/'.length);
      return (
        <ProductDetails 
          slug={slug} 
          products={products} 
          onUpdateProduct={handleUpdateProduct}
        />
      );
    }

    // 5. Individual Blog Post
    if (cleanPath.startsWith('/blog/')) {
      const slug = cleanPath.substring('/blog/'.length);
      return <BlogDetails slug={slug} />;
    }

    // 6. Corporate About Us Page
    if (cleanPath === '/about' || cleanPath === '/about-us') {
      return <AboutUs settings={settings} />;
    }

    // 7. Contact & Wholesale Inquiry Desk
    if (cleanPath === '/contact' || cleanPath === '/contact-us' || cleanPath === '/inquiry') {
      return <ContactUs settings={settings} />;
    }

    // 8. Convenience redirect for blog root
    if (cleanPath === '/blog') {
      return <PortalLanding />;
    }

    // 404 Fallback
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFCFB] text-center px-4 pt-32 text-[#1A1A1A]">
        <div className="w-16 h-16 bg-[#0B3D3B] rounded-2xl flex items-center justify-center shadow-xl mb-6">
          <Award className="w-8 h-8 text-[#FF5A36]" />
        </div>
        <h2 className="font-display text-2xl font-extrabold text-[#0B3D3B] tracking-tight">404 - Coordinate Not Found</h2>
        <p className="text-slate-500 font-normal text-sm max-w-sm mt-2">
          The requested coordinate lies outside Safety Line's digital catalogue routes.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-[#0B3D3B] hover:bg-[#072725] text-white px-8 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all shadow-md shadow-[#0B3D3B]/20 inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Return to Division Selector</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div id="application-container" className="flex flex-col min-h-screen bg-[#FAFCFB] text-[#1A1A1A] font-sans relative">
      <main className="flex-grow">
        {renderView()}
      </main>
      <Analytics />
    </div>
  );
}
