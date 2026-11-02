import React from 'react';
import { brandAssets } from '../assets/brandAssets';

interface BrandLogoProps {
  className?: string;
  variant?: 'navbar' | 'footer' | 'emblem' | 'full';
  showBadge?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'navbar',
  showBadge = true,
}) => {
  if (variant === 'full') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {/* Light mode: clean transparent logo */}
        <img
          src={brandAssets.logoTransparent}
          alt="InternsLoom"
          className="h-12 w-auto object-contain dark:hidden"
        />
        {/* Dark mode: white/cyan variant or transparent with subtle brightness */}
        <img
          src={brandAssets.logoWhite}
          alt="InternsLoom"
          className="h-12 w-auto object-contain hidden dark:block"
        />
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs inline-flex items-center justify-center">
            <img
              src={brandAssets.emblem}
              alt="InternsLoom Emblem"
              className="h-9 w-auto object-contain"
            />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-[#0c2b47] dark:text-white block font-sans">
              INTERNS<span className="text-[#1fa2a6] dark:text-[#2dd4bf]">LOOM</span>
            </span>
            <span className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
              Skill & Career Forge
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Navbar default: Clean emblem icon with official brand styling
  return (
    <div className={`flex items-center gap-2.5 text-left group ${className}`}>
      {/* Official Emblem Icon from user's PDF */}
      <div className="h-10 w-10 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:shadow-sm transition-all duration-200 overflow-hidden p-1">
        <img
          src={brandAssets.emblem}
          alt="InternsLoom Emblem"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex items-center">
        <span className="font-extrabold text-lg md:text-xl tracking-tight text-[#0c2b47] dark:text-white font-sans">
          INTERNS<span className="text-[#1fa2a6] dark:text-[#2dd4bf]">LOOM</span>
        </span>
        {showBadge && (
          <span className="hidden sm:inline-block ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
            ISO 9001:2015
          </span>
        )}
      </div>
    </div>
  );
};
