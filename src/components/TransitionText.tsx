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
 * RotatingText: Cycles through phrases with a smooth slide-and-fade transition
 */
export const RotatingText: React.FC<RotatingTextProps> = ({
  phrases,
  interval = 3200,
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
    <span className={`inline-flex items-center overflow-hidden align-middle ${className}`}>
      {prefix && <span className="mr-2 text-inherit opacity-80">{prefix}</span>}
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
      {suffix && <span className="ml-2 text-inherit opacity-80">{suffix}</span>}
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
 * StaggeredWords: Renders text with words entering sequentially
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
          initial={{ opacity: 0, y: 12, filter: 'blur(2px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.08,
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
  accent?: 'ember' | 'emerald' | 'gold' | 'silver';
}

/**
 * ShimmerHeading: Eye-catching continuous gradient sweep heading
 */
export const ShimmerHeading: React.FC<ShimmerHeadingProps> = ({
  children,
  className = '',
  accent = 'ember'
}) => {
  const getGradient = () => {
    switch (accent) {
      case 'ember':
        return 'from-white via-[#FF7A59] to-white';
      case 'emerald':
        return 'from-white via-[#5EEAD4] to-white';
      case 'gold':
        return 'from-amber-100 via-amber-300 to-amber-100';
      case 'silver':
      default:
        return 'from-white via-slate-300 to-white';
    }
  };

  return (
    <span
      className={`inline-block bg-gradient-to-r ${getGradient()} bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer transition-all duration-300 hover:tracking-wide ${className}`}
    >
      {children}
    </span>
  );
};
