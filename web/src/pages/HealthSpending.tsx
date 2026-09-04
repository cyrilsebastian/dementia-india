/**
 * @file HealthSpending.tsx
 * @description Health & Mental Health budgetary intelligence page.
 * Tracks Union health budgets, mental health allocations, international benchmarks,
 * and highlights the structural absence of a dedicated national dementia budget.
 */

import React from 'react';
import { IndianRupee, Brain, AlertOctagon, TrendingDown, Info } from 'lucide-react';
import { BudgetWaterfall } from '../charts/BudgetWaterfall';
import { MentalHealthTrend } from '../charts/MentalHealthTrend';
import { InternationalSpendComparison } from '../charts/InternationalSpendComparison';

export const HealthSpending: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Health Spending & Dementia Care Financing
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Examining fiscal allocations, mental health parity, and the policy gap in cognitive care financing.
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          While India's total health outlay crossed ₹99,850 Crore in FY2025–26, mental health spending accounts for barely ~1.05% of this allocation.
          Crucially, dementia has no distinct budget code in union or state accounts, remaining an invisible line item despite an impending economic burden exceeding $1.5 trillion.
        </p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Health Budget */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Health Budget (MoHFW)</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            ₹99,859 <span className="text-sm font-sans font-medium text-slate-500">Cr</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-1">
            <span>FY2025–26 Demand for Grants</span>
          </div>
        </div>

        {/* Card 2: Mental Health Allocation */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Mental Health Allocation</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
            ₹950 <span className="text-sm font-sans font-medium text-slate-500">Cr</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-1">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">~1.05%</span>
            <span>of Union Health Budget</span>
          </div>
        </div>

        {/* Card 3: Dementia-Specific Line Item */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-amber-300 dark:border-amber-900/60 p-5 shadow-sm space-y-2 bg-amber-50/20 dark:bg-amber-950/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-amber-700 dark:text-amber-400">Dementia-Specific Budget</span>
            <div className="p-2 rounded-lg bg-amber-500/15 text-amber-500">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400">
            Not Allocated
          </div>
          <div className="text-[11px] text-amber-600/90 dark:text-amber-400/90 font-medium">
            Structural data & funding gap
          </div>
        </div>

        {/* Card 4: Economic Burden 2030 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Projected Burden by 2030</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-rose-600 dark:text-rose-400 font-mono tabular-nums">
            $1.5 Trillion
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Lancet Commission Economic Forecast
          </div>
        </div>
      </div>

      {/* Policy Callout Box */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 flex items-start space-x-3.5 shadow-sm">
        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
          <Info className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
          <p className="font-semibold mb-1 text-amber-950 dark:text-amber-100">
            Key Policy Finding: The Invisible Dementia Budget
          </p>
          <p>
            India has no dedicated dementia budget line item. Dementia care funding is folded into the broader mental health and disability welfare budgets, making it impossible to track spending specifically on dementia. This is itself a policy finding.
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetWaterfall />
        <MentalHealthTrend />
      </div>

      <div>
        <InternationalSpendComparison />
      </div>
    </div>
  );
};
