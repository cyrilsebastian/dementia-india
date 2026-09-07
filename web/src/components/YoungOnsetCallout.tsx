/**
 * @file YoungOnsetCallout.tsx
 * @description Styled alert callout highlighting the global burden of young-onset dementia (ages 40–64).
 */

import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const YoungOnsetCallout: React.FC = () => {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5 shadow-xs transition-colors">
      <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div className="space-y-1.5 flex-1">
        <h4 className="text-sm sm:text-base font-bold text-amber-900 dark:text-amber-200 tracking-tight">
          Dementia is not only an elderly condition
        </h4>
        <p className="text-xs sm:text-sm text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
          In 2021, an estimated 7.75 million people aged 40 to 64 were living with early-onset Alzheimer's disease
          globally — double the 3.67 million recorded in 1990. Women account for 4.28 million of these cases. In India,
          early-onset dementia is systematically under-reported because diagnosis pathways are built around elderly
          patients.
        </p>
        <div className="text-[11px] text-amber-700/80 dark:text-amber-400/80 pt-1 font-medium">
          Source: GBD 2021 · Global Burden of Young-onset Dementia, PMC 2024 (DOI: 10.1186/s13195-024-01530-0)
        </div>
      </div>
    </div>
  );
};
