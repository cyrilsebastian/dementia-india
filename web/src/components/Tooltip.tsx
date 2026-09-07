/**
 * @file Tooltip.tsx
 * @description Accessible, styled hover tooltip component with ⓘ icon and floating callout.
 */

import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  text: string;
  size?: number;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, size = 13, className = '' }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className={`relative inline-flex items-center cursor-help shrink-0 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={text}
    >
      <Info
        style={{ width: `${size}px`, height: `${size}px` }}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
      />
      {hovered && (
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2.5 bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-md text-white dark:text-slate-100 text-[11px] font-normal leading-relaxed rounded-xl shadow-2xl border border-slate-700 dark:border-slate-600 z-[100] pointer-events-none text-left">
          {text}
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-800 border-b border-r border-slate-700 dark:border-slate-600 rotate-45" />
        </span>
      )}
    </span>
  );
};
