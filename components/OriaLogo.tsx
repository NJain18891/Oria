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
        src="/oria_logo_2.png"
        alt="Oria Wellness"
        width={60}
        height={60}
        className={`max-h-full max-w-full object-contain transition-all duration-300 ${isWhite ? 'brightness-0 invert' : ''}`}
        priority
      />

      {showText && !iconOnly && (
        <span 
          className="font-serif text-xl sm:text-2xl font-medium lowercase tracking-tight transition-colors duration-300 relative select-none opacity-95"
          style={{ 
            // Ensures optical center-alignment with the circular geometry of your icon
            transform: 'translateY(45%)' 
          }}
        >
          ria
        </span>
      )}
    </div>
  );
}