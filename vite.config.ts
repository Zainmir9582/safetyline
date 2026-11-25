import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

function vercelEnvironmentAssetsPlugin(vercelEnv: string, siteUrl: string): Plugin {
  const routes = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/gearwear', changefreq: 'weekly', priority: '0.9' },
    { path: '/accessories', changefreq: 'weekly', priority: '0.9' },
    { path: '/about', changefreq: 'monthly', priority: '0.8' },
    { path: '/contact', changefreq: 'monthly', priority: '0.8' },
    { path: '/gearwear/golf-gloves', changefreq: 'weekly', priority: '0.8' },
    { path: '/gearwear/fish-gloves', changefreq: 'weekly', priority: '0.8' },
    { path: '/gearwear/work-gloves', changefreq: 'weekly', priority: '0.8' },
    { path: '/gearwear/mechanics-gloves', changefreq: 'weekly', priority: '0.8' },
    { path: '/gearwear/tactical-police-gloves', changefreq: 'weekly', priority: '0.8' },
    { path: '/gearwear/motorcars-gloves', changefreq: 'weekly', priority: '0.8' },
    { path: '/gearwear/cycling-gloves', changefreq: 'weekly', priority: '0.8' },
    { path: '/gearwear/road-cycling-apparel', changefreq: 'weekly', priority: '0.8' },
    { path: '/gearwear/weight-lifting', changefreq: 'weekly', priority: '0.8' },
    { path: '/accessories/gymwear', changefreq: 'weekly', priority: '0.8' },
    { path: '/accessories/t-shirts', changefreq: 'weekly', priority: '0.8' },
    { path: '/accessories/jackets', changefreq: 'weekly', priority: '0.8' },
    { path: '/accessories/hoodies', changefreq: 'weekly', priority: '0.8' },
    { path: '/accessories/tracksuits', changefreq: 'weekly', priority: '0.8' },
  ];

  return {
    name: 'vercel-environment-assets',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      if (!fs.existsSync(distDir)) return;

      const base = siteUrl.replace(/\/+$/, '');
      const robotsContent =
        vercelEnv === 'preview'
          ? `# Preview deployment - prevent search indexing\nUser-agent: *\nDisallow: /\n`
          : `# robots.txt for Safety Line\nUser-agent: *\nAllow: /\n\nDisallow: /admin\nDisallow: /admin-dashboard\n${
              base ? `\nSitemap: ${base}/sitemap.xml\n` : '\nSitemap: /sitemap.xml\n'
            }`;

      fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent, 'utf8');

      const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
        .map(
          (r) =>
            `  <url><loc>${base ? `${base}${r.path}` : r.path}</loc><changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`
        )
        .join('\n')}\n</urlset>\n`;

      fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent, 'utf8');
    },
  };
}

export default defineConfig(({ mode }) => {
  const vercelEnv = process.env.VERCEL_ENV || (mode === 'production' ? 'production' : 'development');
  const rawProdUrl = process.env.VITE_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || '';
  const normalizedSiteUrl = rawProdUrl
    ? rawProdUrl.startsWith('http')
      ? rawProdUrl.replace(/\/+$/, '')
      : `https://${rawProdUrl.replace(/\/+$/, '')}`
    : '';

  return {
    plugins: [react(), tailwindcss(), vercelEnvironmentAssetsPlugin(vercelEnv, normalizedSiteUrl)],
    define: {
      'import.meta.env.VITE_VERCEL_ENV': JSON.stringify(vercelEnv),
      'import.meta.env.VITE_PUBLIC_SITE_URL': JSON.stringify(normalizedSiteUrl),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: false,
      watch: null,
    },
  };
});
