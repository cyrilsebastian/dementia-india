/**
 * @file BudgetWaterfall.tsx
 * @description Redesigned horizontal cascade/funnel chart for the Union Health Budget (FY2025-26).
 * Illustrates the dramatic narrowing from ₹99,859 Cr down to ₹0 for elderly cognitive care.
 */

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ChartPanel } from '../components/ChartPanel';

interface CascadeItem {
  label: string;
  sublabel: string;
  value: number;
  unit: string;
  color: 'blue' | 'gray' | 'teal' | 'red';
  pct: number;
  isGap?: boolean;
  dropLabel?: string | null;
}

const CASCADE_DATA: CascadeItem[] = [
  {
    label: 'Total Health Budget',
    sublabel: 'MoHFW FY2025-26',
    value: 99859,
    unit: 'Cr',
    color: 'blue',
    pct: 100,
  },
  {
    label: 'General Healthcare',
    sublabel: 'Hospitals, infrastructure, schemes',
    value: 98909,
    unit: 'Cr',
    color: 'gray',
    pct: 99.0,
    dropLabel: 'Mental health receives only 1%',
  },
  {
    label: 'Total Mental Health',
    sublabel: 'All mental health programmes',
    value: 950,
    unit: 'Cr',
    color: 'teal',
    pct: 0.95,
    dropLabel: 'Tele-MANAS gets 9.5% of mental health budget',
  },
  {
    label: 'Tele-MANAS Programme',
    sublabel: 'National tele-mental health network',
    value: 90,
    unit: 'Cr',
    color: 'teal',
    pct: 0.09,
    dropLabel: 'Elderly cognitive care: not tracked',
  },
  {
    label: 'Elderly Mental Health',
    sublabel: "Dementia, Alzheimer's, geriatric psychiatry",
    value: 0,
    unit: '',
    color: 'red',
    pct: 0,
    isGap: true,
    dropLabel: null,
  },
];

export const BudgetWaterfall: React.FC = () => {
  const getBarColor = (color: CascadeItem['color']) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-600 dark:bg-blue-500';
      case 'gray':
        return 'bg-slate-400 dark:bg-slate-500';
      case 'teal':
        return 'bg-teal-500 dark:bg-teal-400';
      case 'red':
        return 'bg-rose-500 dark:bg-rose-400';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <ChartPanel
      title="Union Health Budget Allocation Cascade (FY2025–26)"
      subtitle="Each step shows how the ₹99,859 Cr health budget narrows — ending in zero dedicated allocation for elderly cognitive care."
      sourceLabel="MoHFW Demand for Grants 2025-26, PRS India"
      sourceUrl="https://prsindia.org/budgets"
      exportable={true}
    >
      <div className="w-full py-1 space-y-1">
        {CASCADE_DATA.map((item, index) => {
          const isLast = index === CASCADE_DATA.length - 1;
          const pctOfMax = (item.value / 99859) * 100;
          // Ensure a minimum physical sliver so 0.95% and 0.09% remain visible bars
          const visualWidth = Math.max(pctOfMax, item.value > 0 ? 0.8 : 0);

          return (
            <div key={item.label} className="space-y-1">
              {/* Bar Row (Minimum height: 52px) */}
              <div className="min-h-[52px] flex flex-col justify-center py-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                  {/* Left: Main Label (13px medium) & Sublabel (11px muted italic) */}
                  <div className="w-full sm:w-44 md:w-48 shrink-0">
                    <div className="text-[13px] font-medium text-slate-900 dark:text-slate-100 leading-tight">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 italic leading-snug">
                      {item.sublabel}
                    </div>
                  </div>

                  {/* Right: Bar and Value Rendering */}
                  <div className="flex-1 min-w-0">
                    {!item.isGap ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          {/* Proportional horizontal bar track */}
                          <div className="flex-1 bg-slate-100 dark:bg-slate-800/80 rounded-md h-5 overflow-hidden flex items-center">
                            <div
                              className={`h-full rounded transition-all duration-500 ${getBarColor(item.color)}`}
                              style={{ width: `${visualWidth}%` }}
                            />
                          </div>

                          {/* Value at right end of the bar */}
                          <div className="shrink-0 text-right font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-white tabular-nums min-w-[90px]">
                            ₹{item.value.toLocaleString()} {item.unit}
                          </div>
                        </div>

                        {/* Percentage of total health budget below bar */}
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium pl-0.5">
                          {item.pct}% of total health budget
                        </div>
                      </div>
                    ) : (
                      /* Last Bar (isGap: true) */
                      <div className="space-y-1.5 pt-0.5">
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          {/* Dashed red outlined rectangle (no fill) with text inside */}
                          <div className="border-2 border-dashed border-rose-500 dark:border-rose-400 rounded-md px-3 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400 inline-flex items-center">
                            ₹0 — No line item
                          </div>

                          {/* Red badge */}
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800">
                            Policy gap
                          </span>
                        </div>

                        {/* Italic text below the dashed box */}
                        <p className="text-[11px] text-rose-600/90 dark:text-rose-400/90 italic leading-relaxed">
                          Dementia, Alzheimer's and elderly cognitive disorders have no dedicated budget code in any union or state account.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Transition Between Bars (Minimum height: 24px) */}
              {!isLast && (
                <div className="flex items-center space-x-2 pl-2 sm:pl-4 py-1 min-h-[24px]">
                  <div className="flex items-center justify-center w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 shrink-0">
                    <ChevronDown className="w-3 h-3" />
                  </div>
                  {item.dropLabel ? (
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                      {item.dropLabel}
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                      99% allocated to general healthcare
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ChartPanel>
  );
};
