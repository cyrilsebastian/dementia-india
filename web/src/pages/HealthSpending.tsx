/**
 * @file HealthSpending.tsx
 * @description Health & Mental Health budgetary intelligence page.
 * Tracks Union health budgets, mental health allocations, international benchmarks,
 * and highlights the structural absence of a dedicated national dementia budget.
 */

import React from 'react';
import { IndianRupee, Brain, AlertOctagon, TrendingDown, Info, ShieldCheck, AlertTriangle } from 'lucide-react';
import { BudgetWaterfall } from '../charts/BudgetWaterfall';
import { MentalHealthTrend } from '../charts/MentalHealthTrend';
import { InternationalSpendComparison } from '../charts/InternationalSpendComparison';
import { NmhpUtilisationBar } from '../charts/NmhpUtilisationBar';

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
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-2 flex flex-col justify-between">
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
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-2 flex flex-col justify-between">
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

        {/* Card 3: Elderly Mental Health Budget */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Elderly Mental Health Budget</span>
              <span
                className="inline-flex cursor-help text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                title="Covers dementia, Alzheimer's disease, late-life depression, geriatric psychosis, and Parkinson's-related cognitive decline. None of these conditions have a dedicated budget line in India's union or state accounts. The NMHP geriatric mental health component exists in policy documents but is not separately tracked or reported in budget statements. Source: CMHLP Budget Brief 2025-26, MoHFW Demand for Grants."
              >
                <Info className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            ₹0 <span className="text-sm font-sans font-medium text-slate-500">dedicated line item</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
            <span className="font-semibold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.5 rounded text-[10px] border border-amber-300 dark:border-amber-800">
              Policy gap
            </span>
            <span>No ring-fenced allocation for cognitive or psychiatric care in ageing across any union or state budget</span>
          </div>
        </div>

        {/* Card 4: Economic Burden 2030 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-2 flex flex-col justify-between">
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetWaterfall />
        <div className="space-y-4 flex flex-col justify-between">
          <MentalHealthTrend />
          {/* Tele-MANAS Paradox Callout (Task 3) */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5 shadow-sm">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed space-y-1">
              <h4 className="font-bold text-sm text-amber-950 dark:text-amber-100">
                The Tele-MANAS paradox
              </h4>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                In FY2023-24, Tele-MANAS received ₹134 crore from the government. It spent ₹65 crore. Half the money went unused, even as the number of calls kept climbing month after month. The following year the allocation was cut to ₹90 crore. Demand went up. Funding went down.
              </p>
              <p className="text-[11px] text-amber-800 dark:text-amber-400 pt-1 font-medium">
                Source: CMHLP Budget Brief 2024–25,{' '}
                <a
                  href="https://cmhlp.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-amber-900 dark:hover:text-amber-200"
                >
                  cmhlp.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mental Health Funds: Allocated vs Utilised (NMHP) (Task 2) */}
      <div>
        <NmhpUtilisationBar />
      </div>

      {/* Mental Health Fund Utilization Breakdown (Item 10) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
              Where Does the Central Mental Health Budget Go?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Dissecting the ~₹950 Cr central allocation: Heavy concentration in apex tertiary hospitals vs. primary community care.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
            MoHFW Expenditure Profile
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Component 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Apex Institutes</span>
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400">
                ~70% (₹665 Cr)
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Tertiary Neuropsychiatry</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Directed almost exclusively to 3 autonomous institutes: <strong>NIMHANS</strong> (Bengaluru), <strong>LGBRIMH</strong> (Tezpur), and <strong>CIP</strong> (Ranchi).
            </p>
          </div>

          {/* Component 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">District Outreach</span>
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                ~15% (₹142 Cr)
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">DMHP in 704 Districts</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Distributed across 700+ District Mental Health Programmes for grassroots psychiatric clinics, nurse staffing, and essential psychiatric drugs.
            </p>
          </div>

          {/* Component 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Digital Infrastructure</span>
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
                ~10% (₹95 Cr)
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Tele-MANAS Network</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Funding 51 tele-mental health operational cells, multilingual telephony lines, and digital triage software connecting patients to counsellors.
            </p>
          </div>

          {/* Component 4 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Advocacy & Admin</span>
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
                ~5% (₹48 Cr)
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Research & IEC Campaigns</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              National anti-stigma campaigns, clinical dementia guidelines development, ICMR epidemiological surveys, and modernization.
            </p>
          </div>
        </div>
      </div>

      <div>
        <InternationalSpendComparison />
      </div>

      {/* Free-of-Cost Healthcare Awareness Guide (Item 11) */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 rounded-2xl border border-emerald-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Public Healthcare Entitlements: Accessing Care Free of Cost
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Actionable guide for families navigating subsidized and zero-cost neurological assistance in India.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* Scheme 1 */}
          <div className="bg-white dark:bg-slate-800/80 rounded-xl p-5 border border-emerald-100 dark:border-slate-700/60 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                1. Ayushman Bharat (AB-PMJAY)
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                ₹5 Lakh Cashless / Year
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Eligible beneficiary families receive up to ₹5 Lakh per year in cashless hospitalization for neurological admissions, acute psychiatric emergencies, and diagnostic brain MRI/CT scans in empanelled public and private hospitals.
            </p>
          </div>

          {/* Scheme 2 */}
          <div className="bg-white dark:bg-slate-800/80 rounded-xl p-5 border border-emerald-100 dark:border-slate-700/60 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                2. Ayushman Arogya Mandirs
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                Primary Screening & Drugs
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Community Health Centres and Health & Wellness Clinics provide free cognitive triage using brief memory scales and dispense essential cardiovascular/neurological medications from the State Essential Drug List (EDL) without charge.
            </p>
          </div>

          {/* Scheme 3 */}
          <div className="bg-white dark:bg-slate-800/80 rounded-xl p-5 border border-emerald-100 dark:border-slate-700/60 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                3. District Hospitals (DMHP Outpatient)
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                Subsidized Consultation
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Under the District Mental Health Programme, district general hospitals host designated psychiatric/geriatric OPD days each month. Clinical consultations, blood tests, and subsidized acetylcholinesterase inhibitors (Donepezil) are provided.
            </p>
          </div>

          {/* Scheme 4 */}
          <div className="bg-white dark:bg-slate-800/80 rounded-xl p-5 border border-emerald-100 dark:border-slate-700/60 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                4. National Tele-MANAS (Dial 14416)
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                100% Free / 24×7
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Operated toll-free in 20+ Indian languages. Offers immediate caregiver distress counselling, psychiatric triage by certified professionals, and referral tracking to nearest government mental health facilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
