/**
 * @file SpecialistPage.tsx
 * @description State-level neurological care deficit directory and specialist load table.
 * Highlights acute neurologist deserts and specialist ratios using clinical threshold badge colors.
 * Reads data from /data/neurologists.csv.
 */

import React, { useState, useMemo } from 'react';
import { useCSV } from '../data/useCSV';
import { NeurologistRecord } from '../types/data';
import { Stethoscope, ShieldAlert, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { SPECIALIST_THRESHOLDS } from '../constants/thresholds';

type SortKey = 'state' | 'total' | 'cog' | 'density' | 'ratio';
type SortOrder = 'asc' | 'desc';

const ESTIMATED_STATES = new Set(['IN-KA', 'IN-DL', 'IN-WB', 'IN-GJ', 'IN-AP']);

export const SpecialistPage: React.FC = () => {
  const { data: neurologists, loading } = useCSV<NeurologistRecord>('/data/neurologists.csv');
  const [sortKey, setSortKey] = useState<SortKey>('density');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedNeurologists = useMemo(() => {
    return [...neurologists].sort((a, b) => {
      let comparison = 0;
      switch (sortKey) {
        case 'state':
          comparison = a.state_name.localeCompare(b.state_name);
          break;
        case 'total':
          comparison = a.total_neurologists - b.total_neurologists;
          break;
        case 'cog':
          comparison = a.cog_behav_neuro - b.cog_behav_neuro;
          break;
        case 'density':
          comparison = a.neurologist_per_million - b.neurologist_per_million;
          break;
        case 'ratio':
          comparison = Number(a.patient_per_neurologist) - Number(b.patient_per_neurologist);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [neurologists, sortKey, sortOrder]);

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) {
      return <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-60 ml-1 inline" />;
    }
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400 ml-1 inline" />
    ) : (
      <ChevronDown className="w-3 h-3 text-emerald-600 dark:text-emerald-400 ml-1 inline" />
    );
  };

  if (loading) {
    return <div className="h-96 bg-slate-50 dark:bg-slate-800/40 rounded-2xl animate-pulse" />;
  }

  const getSpecialistBadgeClass = (ratio: number) => {
    if (ratio < SPECIALIST_THRESHOLDS.CRITICAL_PER_MILLION) {
      return 'bg-[#C0392B] text-white'; // Critical (< 0.5)
    }
    if (ratio < SPECIALIST_THRESHOLDS.SEVERE_PER_MILLION) {
      return 'bg-[#E67E22] text-white'; // Severe (0.5 - 1.0)
    }
    if (ratio < SPECIALIST_THRESHOLDS.POOR_PER_MILLION) {
      return 'bg-[#F1C40F] text-[#1a1a2e]'; // Poor (1.0 - 2.0)
    }
    if (ratio <= SPECIALIST_THRESHOLDS.ADEQUATE_PER_MILLION) {
      return 'bg-[#27AE60] text-white'; // Adequate (2.0 - 5.0)
    }
    return 'bg-[#2980B9] text-white'; // Good (> 5.0)
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              India's Neurological Care Deserts
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Assessing state-by-state specialist density against rising dementia caseloads.
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          While global guidelines recommend at least 1 neurologist per 100,000 population (10 per million), most Indian states have less than <strong>1 neurologist per million</strong> people.
          Subspecialists in behavioural and cognitive neurology remain critically scarce, with fewer than 100 dedicated specialists across the entire country.
        </p>
      </div>

      {/* State Breakdown Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              State-wise Neurologist Availability & Specialist Load
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed max-w-2xl">
              Neurologist counts: IAN membership directory ~3,000 members (<a href="https://ianindia.org" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline">ianindia.org</a>) and NSI registry. Per-million figures calculated using Census 2011 projected population. Data year: 2023-24. Cognitive/behavioural specialist counts are estimates based on IAN subspecialty listings — not independently verified per state.
            </p>
          </div>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800 shrink-0">
            Sorted by {sortKey === 'density' ? 'Care Deficit / Density' : sortKey === 'ratio' ? 'Patient Load' : sortKey === 'state' ? 'State Name' : sortKey === 'total' ? 'Total Neurologists' : 'Cognitive Specialists'} ({sortOrder.toUpperCase()})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 select-none">
              <tr>
                <th className="py-3 px-4">
                  <button
                    onClick={() => handleSort('state')}
                    className="font-semibold text-left flex items-center hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <span>State / UT</span>
                    {renderSortIcon('state')}
                  </button>
                </th>
                <th className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleSort('total')}
                    className="font-semibold ml-auto flex items-center justify-end hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <span>Total Neurologists</span>
                    {renderSortIcon('total')}
                  </button>
                </th>
                <th className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleSort('cog')}
                    className="font-semibold ml-auto flex items-center justify-end hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <span>Cog/Behav Specialists *</span>
                    {renderSortIcon('cog')}
                  </button>
                </th>
                <th className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleSort('density')}
                    className="font-semibold ml-auto flex items-center justify-end hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <span>Per Million Pop</span>
                    {renderSortIcon('density')}
                  </button>
                </th>
                <th className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleSort('ratio')}
                    className="font-semibold ml-auto flex items-center justify-end hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <span>Patients per Specialist</span>
                    {renderSortIcon('ratio')}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-800 dark:text-slate-200">
              {sortedNeurologists.map((row) => (
                <tr key={row.state_code} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-medium flex items-center space-x-2">
                    {row.neurologist_per_million < SPECIALIST_THRESHOLDS.CRITICAL_PER_MILLION && (
                      <span title="Severe Neurologist Desert">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      </span>
                    )}
                    <span>{row.state_name}</span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums">
                    {row.total_neurologists}
                    {ESTIMATED_STATES.has(row.state_code) && (
                      <span className="text-amber-600 dark:text-amber-400 font-bold ml-0.5" title="Estimated from partial registry data">*</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-400 dark:text-slate-500">
                    —
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-semibold">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-semibold tabular-nums shadow-sm ${getSpecialistBadgeClass(row.neurologist_per_million)}`}>
                      {row.neurologist_per_million.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-500 dark:text-slate-400">
                    {row.total_neurologists === 0 ? 'No Specialist' : `1 : ${Number(row.patient_per_neurologist).toLocaleString()}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Legend */}
        <div className="p-3.5 sm:p-4 bg-slate-50/70 dark:bg-slate-850/50 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5">
          <div className="flex items-start space-x-1.5">
            <span className="text-amber-500 font-bold shrink-0">*</span>
            <span><strong>Total Neurologists:</strong> Estimated from partial registry data. Exact count unverified.</span>
          </div>
          <div className="flex items-start space-x-1.5">
            <span className="text-amber-500 font-bold shrink-0">*</span>
            <span><strong>Cog/Behav Specialists:</strong> State-level cognitive and behavioural neurologist breakdown is unavailable in public registries (nationwide total is estimated at &lt;100 by IAN).</span>
          </div>
        </div>
      </div>
    </div>
  );
};
