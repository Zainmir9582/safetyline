import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

// Global cache to track previously loaded image URLs across re-renders and page transitions
const loadedImageCache = new Set<string>();

interface SmoothImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  containerClassName?: string;
  className?: string;
  fallbackText?: string;
  priority?: boolean;
}

export const SmoothImage: React.FC<SmoothImageProps> = ({
  src,
  alt,
  containerClassName = '',
  className = '',
  fallbackText = 'Safety Line Technical Apparel',
  priority = false,
  ...imgProps
}) => {
  const isAlreadyLoaded = loadedImageCache.has(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(isAlreadyLoaded);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (!src) {
      setHasError(true);
      return;
    }

    if (loadedImageCache.has(src)) {
      setIsLoaded(true);
      setHasError(false);
      return;
    }

    setIsLoaded(false);
    setHasError(false);

    // Preload image in memory
    const img = new Image();
    img.src = src;
    img.referrerPolicy = 'no-referrer';

    if (img.complete && img.naturalWidth > 0) {
      loadedImageCache.add(src);
      setIsLoaded(true);
      return;
    }

    img.onload = () => {
      loadedImageCache.add(src);
      setIsLoaded(true);
    };

    img.onerror = () => {
      setHasError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Quiet architectural stone placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-0 bg-[#ECE9E1]/60 pointer-events-none" />
      )}

      {/* Graceful Error Fallback */}
      {hasError ? (
        <div className="w-full h-full min-h-[160px] bg-[#F7F6F2] flex flex-col items-center justify-center p-4 text-center border border-[#E2DFD7] rounded-sm space-y-2">
          <div className="w-10 h-10 rounded-sm bg-[#ECE9E1] flex items-center justify-center text-[#141918]">
            <ImageOff className="w-5 h-5 opacity-70" />
          </div>
          <span className="text-[11px] font-mono text-[#525957] font-semibold uppercase tracking-wider">
            {fallbackText}
          </span>
          <span className="text-[10px] text-[#525957] font-sans">
            Image Spec Preview
          </span>
        </div>
      ) : (
        /* Actual Image with Silky Smooth Opacity Fade-In */
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => {
            loadedImageCache.add(src);
            setIsLoaded(true);
          }}
          onError={() => setHasError(true)}
          className={`transition-all duration-500 ease-out will-change-transform ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
          } ${className}`}
          {...imgProps}
        />
      )}
    </div>
  );
};

export default React.memo(SmoothImage);
