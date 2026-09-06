/**
 * @file EtiologyBreakdown.tsx
 * @description Clinical etiology disaggregation widget separating Alzheimer's Disease from other dementia subtypes.
 * Displays national case distributions across Alzheimer's, Vascular, Lewy Body, and Frontotemporal dementia
 * based on ARDSI 2020 and Lancet Neurology epidemiological benchmarks.
 */

import React, { useState } from 'react';
import { Brain } from 'lucide-react';

interface Subtype {
  id: string;
  name: string;
  shortName: string;
  percentage: number;
  estCases: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  colorBar: string;
  clinicalSigns: string;
  primaryRisk: string;
}

export const EtiologyBreakdown: React.FC = () => {
  const [selectedSubtype, setSelectedSubtype] = useState<string>('all');

  const subtypes: Subtype[] = [
    {
      id: 'alzheimers',
      name: "Alzheimer's Disease (AD)",
      shortName: "Alzheimer's",
      percentage: 65,
      estCases: '5.72 Million',
      colorBg: 'bg-emerald-50 dark:bg-emerald-950/40',
      colorBorder: 'border-emerald-200 dark:border-emerald-800/80',
      colorText: 'text-emerald-700 dark:text-emerald-300',
      colorBar: 'bg-emerald-500',
      clinicalSigns: 'Progressive episodic memory decay, spatial disorientation, language anomia.',
      primaryRisk: 'Advanced age, ApoE ε4 allele, cardiovascular comorbidity, low cognitive reserve.',
    },
    {
      id: 'vascular',
      name: 'Vascular Dementia (VD)',
      shortName: 'Vascular',
      percentage: 18,
      estCases: '1.58 Million',
      colorBg: 'bg-sky-50 dark:bg-sky-950/40',
      colorBorder: 'border-sky-200 dark:border-sky-800/80',
      colorText: 'text-sky-700 dark:text-sky-300',
      colorBar: 'bg-sky-500',
      clinicalSigns: 'Stepwise cognitive decline, slowed executive processing, post-stroke ischemia.',
      primaryRisk: 'Untreated hypertension, type-2 diabetes mellitus, stroke history, hyperlipidemia.',
    },
    {
      id: 'lewy',
      name: 'Lewy Body Dementia (DLB)',
      shortName: 'Lewy Body',
      percentage: 10,
      estCases: '0.88 Million',
      colorBg: 'bg-indigo-50 dark:bg-indigo-950/40',
      colorBorder: 'border-indigo-200 dark:border-indigo-800/80',
      colorText: 'text-indigo-700 dark:text-indigo-300',
      colorBar: 'bg-indigo-500',
      clinicalSigns: 'Vivid visual hallucinations, parkinsonian motor rigidity, fluctuating alertness, REM sleep disorder.',
      primaryRisk: 'Alpha-synuclein neuronal aggregates, overlap with Parkinsonian syndromes.',
    },
    {
      id: 'ftd',
      name: 'Frontotemporal Dementia (FTD)',
      shortName: 'Frontotemporal',
      percentage: 7,
      estCases: '0.62 Million',
      colorBg: 'bg-amber-50 dark:bg-amber-950/40',
      colorBorder: 'border-amber-200 dark:border-amber-800/80',
      colorText: 'text-amber-700 dark:text-amber-300',
      colorBar: 'bg-amber-500',
      clinicalSigns: 'Profound personality / social disinhibition, loss of empathy, progressive primary aphasia.',
      primaryRisk: 'Tau / TDP-43 proteinopathies; disproportionately affects younger seniors (45–65 yrs).',
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-5 transition-colors">
      {/* Header & Disaggregation Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
              Clinical Etiology Disaggregation: Alzheimer's vs. Dementia Subtypes
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dementia is an umbrella syndrome. In India, Alzheimer's Disease accounts for ~65% of all clinical caseloads, followed by Vascular and Lewy Body etiologies.
          </p>
        </div>

        {/* View Filter Pill Switcher */}
        <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setSelectedSubtype('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSubtype === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Syndromes (8.8M)
          </button>
          <button
            onClick={() => setSelectedSubtype('alzheimers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSubtype === 'alzheimers'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Alzheimer's Only (5.72M)
          </button>
        </div>
      </div>

      {/* Proportional Stacked Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
          <span>Etiological Share of 8.8 Million Indian Caseload</span>
          <span className="text-[11px] text-slate-400">ARDSI 2020 / GBD 2021 Benchmarks</span>
        </div>
        <div className="h-4 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex shadow-inner">
          {subtypes.map((st) => (
            <div
              key={st.id}
              style={{ width: `${st.percentage}%` }}
              className={`${st.colorBar} h-full transition-all duration-300 hover:opacity-90 relative group cursor-pointer`}
              title={`${st.name}: ${st.percentage}% (~${st.estCases})`}
              onClick={() => setSelectedSubtype(st.id)}
            />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
          {subtypes.map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedSubtype(selectedSubtype === st.id ? 'all' : st.id)}
              className="flex items-center space-x-1.5 hover:underline"
            >
              <span className={`w-2.5 h-2.5 rounded-sm ${st.colorBar}`} />
              <span>{st.shortName} ({st.percentage}%)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subtype Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {subtypes.map((st) => {
          const isFaded = selectedSubtype !== 'all' && selectedSubtype !== st.id;
          const isFocused = selectedSubtype === st.id;

          return (
            <div
              key={st.id}
              onClick={() => setSelectedSubtype(selectedSubtype === st.id ? 'all' : st.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                isFocused
                  ? `${st.colorBg} ${st.colorBorder} ring-2 ring-emerald-500 shadow-md`
                  : isFaded
                  ? 'bg-slate-50/50 dark:bg-slate-850/40 border-slate-200/50 dark:border-slate-800/40 opacity-50'
                  : `${st.colorBg} ${st.colorBorder} hover:shadow-sm`
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-wider ${st.colorText}`}>
                    {st.shortName}
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white shadow-xs">
                    {st.percentage}%
                  </span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                  ~{st.estCases}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  {st.clinicalSigns}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px] text-slate-500 dark:text-slate-400">
                <span className="font-semibold">Key drivers:</span> {st.primaryRisk}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
