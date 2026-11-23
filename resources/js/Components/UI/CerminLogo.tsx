import React from 'react';

interface CerminLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
}

export function CerminLogo({
  className = '',
  size = 'md',
  showText = true,
  textColor = 'text-zinc-950',
}: CerminLogoProps) {
  const sizeMap = {
    sm: { img: 'w-7 h-7', text: 'text-sm' },
    md: { img: 'w-8 h-8', text: 'text-base' },
    lg: { img: 'w-10 h-10', text: 'text-lg' },
    xl: { img: 'w-12 h-12', text: 'text-xl' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/images/cermin-logo.png"
        alt="Cermin Kreatif Logo"
        className={`${currentSize.img} rounded-full object-cover shrink-0 shadow-xs`}
      />
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-bold tracking-tight ${textColor} ${currentSize.text} font-sans`}>
            Cermin Kreatif
          </span>
          <span className="text-[10px] font-mono tracking-wider text-[#01A0CA] font-semibold -mt-0.5">
            Perception is Everything
          </span>
        </div>
      )}
    </div>
  );
}

