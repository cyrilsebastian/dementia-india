/**
 * @file HelplineCard.tsx
 * @description Interactive card component displaying verified mental health and dementia support helplines across India.
 * Provides direct click-to-call dialing, operating hours, and institutional credentials.
 */

import React from 'react';
import { Phone, Clock, ShieldCheck } from 'lucide-react';
import type { HelplineRecord } from '../types/careNetwork';

interface HelplineCardProps {
  helpline: HelplineRecord;
}

export const HelplineCard: React.FC<HelplineCardProps> = ({ helpline }) => {
  const cleanPhone = helpline.phone.replace(/[^0-9+]/g, '');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 transition-colors">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">
              {helpline.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {helpline.organization}
            </p>
          </div>
          {helpline.isEmergency && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800">
              24×7 Toll-Free
            </span>
          )}
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {helpline.description}
        </p>

        <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{helpline.hours}</span>
          {helpline.language && (
            <>
              <span>•</span>
              <span>{helpline.language}</span>
            </>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <a
          href={`tel:${cleanPhone}`}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-sm font-semibold shadow-sm shadow-emerald-500/20 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{helpline.phone}</span>
        </a>

        <div className="flex items-center space-x-1 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Verified</span>
        </div>
      </div>
    </div>
  );
};
