/**
 * @file Disclaimer.tsx
 * @description Standard legal and clinical disclaimer for Project Dementia India.
 * Clarifies non-clinical status, lack of PII/PHI storage, and compliance with DPDP Act 2023.
 */

import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <div id="disclaimer" className="bg-slate-50 dark:bg-slate-850/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Disclaimer & Legal Notice
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Non-clinical public health intelligence & ethical standards
          </p>
        </div>
      </div>

      <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed border-t border-slate-200/60 dark:border-slate-800 pt-4">
        <p>
          This platform presents aggregate statistical estimates derived from peer-reviewed,
          publicly available epidemiological datasets. All figures are population-level
          estimates and not clinical diagnoses. No Personally Identifiable Information (PII)
          or Protected Health Information (PHI) is collected, stored, or displayed.
        </p>
        <p>
          This platform does not provide medical advice. If you or a family member are
          experiencing cognitive symptoms, please consult a qualified neurologist or
          geriatrician.
        </p>
        <p>
          The hospital and NGO directory information is provided for reference only.
          Inclusion does not constitute endorsement. Please independently verify contact
          details and services before visiting.
        </p>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Compliance: Digital Personal Data Protection Act 2023 (India). Source code
          available under the MIT License at{' '}
          <a
            href="https://github.com/cyrilsebastian/dementia-india"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            github.com/cyrilsebastian/dementia-india
          </a>
          .
        </p>
      </div>
    </div>
  );
};
