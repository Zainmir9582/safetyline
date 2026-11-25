export type AppEnvironment = 'production' | 'preview' | 'development';

export function getAppEnvironment(): AppEnvironment {
  const vercelEnv = import.meta.env.VITE_VERCEL_ENV;
  if (vercelEnv === 'production' || vercelEnv === 'preview' || vercelEnv === 'development') {
    return vercelEnv;
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1') {
      return 'development';
    }
    // Vercel git/commit preview URLs contain '-git-' or deployment hash segments when not custom production domains
    if (host.endsWith('.vercel.app') && host.includes('-git-')) {
      return 'preview';
    }
  }

  return import.meta.env.PROD ? 'production' : 'development';
}

export const appEnv: AppEnvironment = getAppEnvironment();
export const isProductionEnv = appEnv === 'production';
export const isPreviewEnv = appEnv === 'preview';
export const isLocalEnv = appEnv === 'development';

export function getCanonicalOrigin(): string {
  const configured = (import.meta.env.VITE_SITE_URL || import.meta.env.VITE_PUBLIC_SITE_URL || '').trim();
  if (configured && isProductionEnv) {
    return configured.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
}
