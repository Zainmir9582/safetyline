import React, { useState, useEffect, useCallback, useMemo } from 'react';

export interface NavigateOptions {
  replace?: boolean;
  scrollToTop?: boolean;
  state?: any;
}

export function navigate(to: string, options?: NavigateOptions) {
  if (options?.replace) {
    window.history.replaceState(options?.state || null, '', to);
  } else {
    window.history.pushState(options?.state || null, '', to);
  }
  
  const navEvent = new PopStateEvent('popstate', { state: options?.state || null });
  window.dispatchEvent(navEvent);

  if (options?.scrollToTop !== false) {
    if (to.includes('#')) {
      const hash = to.split('#')[1];
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const yOffset = -80;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    }
  }
}

export function usePath(): string {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  return path;
}

export function useRoute() {
  const [locationState, setLocationState] = useState(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    href: window.location.href,
  }));

  useEffect(() => {
    const handleLocationChange = () => {
      setLocationState({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
        href: window.location.href,
      });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const searchParams = useMemo(() => new URLSearchParams(locationState.search), [locationState.search]);

  const setQuery = useCallback((params: Record<string, string | null | undefined>, replace = true) => {
    const nextParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, val]) => {
      if (val === null || val === undefined || val === '') {
        nextParams.delete(key);
      } else {
        nextParams.set(key, val);
      }
    });
    const queryString = nextParams.toString();
    const newUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}${window.location.hash}`;
    navigate(newUrl, { replace, scrollToTop: false });
  }, []);

  return {
    path: locationState.pathname,
    pathname: locationState.pathname,
    search: locationState.search,
    searchParams,
    hash: locationState.hash,
    href: locationState.href,
    navigate,
    setQuery
  };
}

export type LinkProps = React.ComponentProps<'a'> & {
  to: string;
  replace?: boolean;
  scrollToTop?: boolean;
};

export function Link({ 
  to, 
  replace, 
  scrollToTop, 
  className, 
  children, 
  onClick, 
  target,
  ...rest 
}: LinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (
      !e.defaultPrevented &&
      e.button === 0 && // Left click
      !e.metaKey &&
      !e.ctrlKey &&
      !e.altKey &&
      !e.shiftKey &&
      !target
    ) {
      e.preventDefault();
      navigate(to, { replace, scrollToTop });
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} target={target} {...rest}>
      {children}
    </a>
  );
}
