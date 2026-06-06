'use client';

import React from 'react';
import Image from 'next/image';

interface OriaLogoProps {
  /**
   * Layout orientation of the logo
   * @default 'horizontal'
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * Show the wordmark alongside or below the icon mark
   * @default true
   */
  showText?: boolean;
  /**
   * Only render the icon mark inside a square viewBox
   * @default false
   */
  iconOnly?: boolean;
  className?: string;
}

export default function OriaLogo({
  layout = 'horizontal',
  showText = true,
  iconOnly = false,
  className = '',
  ...props
}: OriaLogoProps & React.HTMLAttributes<HTMLDivElement>) {
  const isWhite = className.includes('text-[#FBFBFA]') || className.includes('text-white');
  
  return (
    <div 
      id="oria-logo-container" 
      className={`relative flex items-center justify-center transition-all duration-300 ${className}`} 
      {...props}
    >
      <Image
        src="/oria_logo.png"
        alt="Oria Wellness"
        width={400}
        height={400}
        className={`max-h-full max-w-full w-auto h-auto object-contain transition-all duration-300 ${isWhite ? 'brightness-0 invert' : ''}`}
        priority
      />
    </div>
  );
}