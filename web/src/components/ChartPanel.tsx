/**
 * @file ChartPanel.tsx
 * @description Standard card wrapper for all data visualizations.
 * Enforces unified title hierarchy, active filter indicator badges, inline data source citations, and optional export action.
 */

import React from 'react';
import { Download, ExternalLink } from 'lucide-react';

export interface ChartPanelProps {
  title: string;
  subtitle?: string;
  sourceLabel: string;
  sourceUrl: string;
  exportable?: boolean;
  onExport?: () => void;
  activeFilterBadges?: string[];
  children: React.ReactNode;
}

export const ChartPanel: React.FC<ChartPanelProps> = ({
  title,
  subtitle,
  sourceLabel,
  sourceUrl,
  exportable = false,
  onExport,
  activeFilterBadges = [],
  children,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col h-full transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}

          {/* Active Filter Indicators */}
          {activeFilterBadges.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              {activeFilterBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Optional Export Action */}
        {exportable && onExport && (
          <button
            onClick={onExport}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs flex items-center space-x-1 shrink-0 transition-colors"
            title="Export chart image (PNG)"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        )}
      </div>

      {/* Chart Canvas */}
      <div className="flex-1 w-full min-h-[260px] flex flex-col justify-center">
        {children}
      </div>

      {/* Footer Citation */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center space-x-1">
          <span>Source:</span>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-0.5"
          >
            <span>{sourceLabel}</span>
            <ExternalLink className="w-2.5 h-2.5 ml-0.5 inline-block opacity-70" />
          </a>
        </div>
        <span className="text-[10px] text-slate-400 dark:text-slate-500">Project Dementia India</span>
      </div>
    </div>
  );
};
