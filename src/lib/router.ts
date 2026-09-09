import { useState, useEffect } from 'react';

export function navigate(path: string) {
  window.history.pushState(null, '', path);
  const navEvent = new PopStateEvent('popstate');
  window.dispatchEvent(navEvent);
}

export function usePath(): string {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return path;
}
