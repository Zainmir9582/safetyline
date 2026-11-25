import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RotatingTextProps {
  phrases: string[];
  interval?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export const RotatingText: React.FC<RotatingTextProps> = ({
  phrases,
  interval = 3600,
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
      {prefix && <span className="mr-2 text-inherit opacity-75 font-medium">{prefix}</span>}
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
      {suffix && <span className="ml-2 text-inherit opacity-75 font-medium">{suffix}</span>}
    </span>
  );
};
