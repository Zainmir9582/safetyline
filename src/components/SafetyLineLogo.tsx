import React from 'react';

export interface SafetyLineLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
  variant?: 'monogram' | 'landing' | 'full';
  theme?: 'light' | 'dark' | string;
  withBadge?: boolean;
  showText?: boolean;
  src?: string;
  alt?: string;
  onClick?: () => void;
}

export default function SafetyLineLogo(_props: SafetyLineLogoProps) {
  return null;
}
