import { useState, useEffect } from 'react';
import PortalLanding from './components/PortalLanding';
import CategoryHub from './components/CategoryHub';
import ProductDetails from './components/ProductDetails';
import BlogDetails from './components/BlogDetails';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import { usePath, navigate } from './lib/router';
import { Product, Settings } from './types';
import { products as defaultProducts, settings as defaultSettings } from './data';
import { Award, ArrowRight } from 'lucide-react';

const LOCAL_STORAGE_PRODUCTS_KEY = 'safetyline_catalogue_v16';

export default function App() {
  const currentPath = usePath();

  // Primary data initialized with local storage persistence fallback
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      // Clear legacy storage keys that may have cached previous products
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
            !['prod-vng-05', 'prod-ttn-06', 'prod-end-07', 'prod-hys-08', 'prod-vel-05', 'prod-mer-06'].includes(p.id)
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

  // Routing render block
  const renderView = () => {
    // 1. Root Gateway Portal (Landing page showing only logo, name, and 2 options: Hosiery & Gearwear)
    if (currentPath === '/') {
      return <PortalLanding />;
    }

    // 2. Dedicated Gearwear Hub (Items, About, Features, Blogs, Testimonials, Inquiry Desk)
    if (currentPath === '/gearwear') {
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

    // 3. Dedicated Accessories Hub (Items, About, Features, Blogs, Testimonials, Inquiry Desk)
    if (currentPath === '/accessories' || currentPath === '/hosiery') {
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
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.substring('/product/'.length);
      return (
        <ProductDetails 
          slug={slug} 
          products={products} 
          onUpdateProduct={handleUpdateProduct}
        />
      );
    }

    // 5. Individual Blog Post
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.substring('/blog/'.length);
      return <BlogDetails slug={slug} />;
    }

    // 6. Corporate About Us Page
    if (currentPath === '/about') {
      return <AboutUs settings={settings} />;
    }

    // 7. Contact & Wholesale Inquiry Desk
    if (currentPath === '/contact') {
      return <ContactUs settings={settings} />;
    }

    // 8. Convenience redirect for blog root
    if (currentPath === '/blog') {
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
    </div>
  );
}
