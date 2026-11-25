import { useEffect } from 'react';
import { getCanonicalOrigin, isProductionEnv } from '../lib/env';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product';
  schema?: any;
}

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  schema
}: SEOProps) {
  const origin = getCanonicalOrigin();
  const normalizedPath =
    typeof window !== 'undefined'
      ? window.location.pathname.replace(/\/index\.html?$/i, '').replace(/\/+$/, '') || '/'
      : '/';
  const currentUrl = url || `${origin}${normalizedPath === '/' ? '' : normalizedPath}`;
  const resolvedImage = image || `${origin}/safetyline_logo.png`;
  const fullTitle = title
    ? `${title} | Safety Line`
    : 'Safety Line | Premium Athletic Gearwear & Luxury Fine Hosiery';
  const defaultDescription =
    'Safety Line is a master-engineered B2B digital catalogue and custom manufacturing house specializing in high-compression athletic Gearwear and luxury French/Italian-spun Hosiery.';
  const fullDescription = description || defaultDescription;
  const defaultKeywords =
    'Safety Line, Gearwear, fine hosiery, elite athletic clothing, compression leggings, cashmere socks, silk lace stockings, premium garments, custom apparel manufacturer, B2B digital catalogue';
  const fullKeywords = keywords || defaultKeywords;

  useEffect(() => {
    // 1. Update title
    document.title = fullTitle;

    // 2. Helper to set meta tags
    const setMetaTag = (nameAttr: string, valueAttr: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${valueAttr}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, valueAttr);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl || '/');

    // Standard Metas (only index Production deployments; block Preview/Local from search indexing)
    setMetaTag('name', 'description', fullDescription);
    setMetaTag('name', 'keywords', fullKeywords);
    setMetaTag('name', 'robots', isProductionEnv ? 'index, follow' : 'noindex, nofollow');

    // Open Graph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', fullDescription);
    setMetaTag('property', 'og:image', resolvedImage);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'Safety Line');

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', fullDescription);
    setMetaTag('name', 'twitter:image', resolvedImage);

    // 3. Dynamic JSON-LD structured data injection
    const existingScript = document.getElementById('seo-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Safety Line',
      'url': origin,
      'logo': `${origin}/safetyline_logo.png`,
      'description': defaultDescription,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Safety Line Industrial Complex',
        'addressLocality': 'Sialkot',
        'addressCountry': 'PK'
      },
      'hasMap': 'https://maps.app.goo.gl/YgFYKJhcfPioRnH27',
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+92 3040000445',
        'contactType': 'customer service',
        'email': 'info@safetyline-ind.com'
      }
    };

    const finalSchema = schema || defaultSchema;

    const script = document.createElement('script');
    script.id = 'seo-structured-data';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(finalSchema);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('seo-structured-data');
      if (s) s.remove();
    };
  }, [fullTitle, fullDescription, fullKeywords, resolvedImage, currentUrl, type, schema, origin]);

  return null;
}
