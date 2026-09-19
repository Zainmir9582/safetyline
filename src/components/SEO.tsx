import { useEffect } from 'react';

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
  image = 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1200',
  url,
  type = 'website',
  schema
}: SEOProps) {
  const currentUrl = url || window.location.href;
  const fullTitle = title 
    ? `${title} | Safety Line` 
    : 'Safety Line | Premium Athletic Gearwear & Luxury Fine Hosiery';
  const defaultDescription = 'Safety Line is a master-engineered B2B digital catalogue and custom manufacturing house specializing in high-compression athletic Gearwear and luxury French/Italian-spun Hosiery.';
  const fullDescription = description || defaultDescription;
  const defaultKeywords = 'Safety Line, Gearwear, fine hosiery, elite athletic clothing, compression leggings, cashmere socks, silk lace stockings, premium garments, custom apparel manufacturer, B2B digital catalogue';
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

    // Standard Metas
    setMetaTag('name', 'description', fullDescription);
    setMetaTag('name', 'keywords', fullKeywords);
    setMetaTag('name', 'robots', 'index, follow');

    // Open Graph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', fullDescription);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'Safety Line');

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', fullDescription);
    setMetaTag('name', 'twitter:image', image);

    // 3. Dynamic JSON-LD structured data injection
    const existingScript = document.getElementById('seo-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Safety Line',
      'url': window.location.origin,
      'logo': 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=200',
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
      // Clean up dynamic schema script when unmounted
      const s = document.getElementById('seo-structured-data');
      if (s) s.remove();
    };
  }, [fullTitle, fullDescription, fullKeywords, image, currentUrl, type, schema]);

  return null;
}
