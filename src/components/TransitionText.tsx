import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RotatingTextProps {
  phrases: string[];
  interval?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

/**
 * RotatingText: Crisp, snappy, athletic text transition (NO creepy blur, NO ghosting)
 */
export const RotatingText: React.FC<RotatingTextProps> = ({
  phrases,
  interval = 3500,
  className = '',
  prefix = '',
  suffix = ''
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (phrases.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, interval);
    return () => clearInterval(timer);
  }, [phrases, interval]);

  return (
    <span className={`inline-flex items-center align-middle overflow-hidden ${className}`}>
      {prefix && <span className="mr-2 text-inherit opacity-85 font-semibold">{prefix}</span>}
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block whitespace-nowrap font-bold"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
      {suffix && <span className="ml-2 text-inherit opacity-85 font-semibold">{suffix}</span>}
    </span>
  );
};

interface StaggeredWordsProps {
  text: string;
  className?: string;
  delay?: number;
  wordClassName?: string;
}

/**
 * StaggeredWords: Clean, crisp sequential word entrance without ghostly blur
 */
export const StaggeredWords: React.FC<StaggeredWordsProps> = ({
  text,
  className = '',
  delay = 0,
  wordClassName = ''
}) => {
  const words = text.split(' ');

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.06,
            ease: [0.16, 1, 0.3, 1]
          }}
          className={`inline-block mr-[0.28em] last:mr-0 ${wordClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

interface ShimmerHeadingProps {
  children: React.ReactNode;
  className?: string;
  accent?: 'ember' | 'emerald' | 'gold' | 'silver' | 'radiant';
}

/**
 * ShimmerHeading: Crisp metallic gradient sweep heading with high contrast
 */
export const ShimmerHeading: React.FC<ShimmerHeadingProps> = ({
  children,
  className = '',
  accent = 'ember'
}) => {
  const getGradient = () => {
    switch (accent) {
      case 'radiant':
        return 'from-white via-[#5EEAD4] via-[#FFE27D] to-white';
      case 'ember':
        return 'from-white via-[#FF7A59] to-white';
      case 'emerald':
        return 'from-white via-[#5EEAD4] to-white';
      case 'gold':
        return 'from-amber-100 via-amber-300 to-amber-100';
      case 'silver':
      default:
        return 'from-white via-emerald-100 to-white';
    }
  };

  return (
    <span
      className={`inline-block bg-gradient-to-r ${getGradient()} bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer transition-all duration-300 ${className}`}
    >
      {children}
    </span>
  );
};

interface ShiningLWordProps {
  word?: string;
  className?: string;
}

/**
 * ShiningLWord: Specifically highlights the "L" word ("LINE", "LIVE", etc.)
 * with brilliant luminescence, specular shine, and intense radiant halo
 */
export const ShiningLWord: React.FC<ShiningLWordProps> = ({
  word = 'LINE',
  className = ''
}) => {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* Radiant Glowing Halo Behind the Word */}
      <span 
        className="absolute -inset-1 bg-gradient-to-r from-emerald-400/40 via-white/50 to-emerald-400/40 rounded-lg blur-md opacity-80 animate-pulse pointer-events-none"
        aria-hidden="true"
      />
      
      {/* High-Contrast Luminous Text with Metallic Sheen */}
      <span className="relative z-10 font-black tracking-[0.22em] text-white animate-radiant-l-word inline-block select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">
        {word}
      </span>
      
      {/* Subtle Specular Sparkle Glint */}
      <span 
        className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full blur-[1px] animate-ping pointer-events-none"
        aria-hidden="true"
      />
    </span>
  );
};
