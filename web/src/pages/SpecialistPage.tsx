/**
 * @file SpecialistPage.tsx
 * @description State-level neurological care deficit directory and specialist load table.
 * Highlights acute neurologist deserts and specialist ratios using clinical threshold badge colors.
 * Reads data from /data/neurologists.csv.
 */

import React from 'react';
import { useCSV } from '../data/useCSV';
import { NeurologistRecord } from '../types/data';
import { Stethoscope, ShieldAlert } from 'lucide-react';
import { SPECIALIST_THRESHOLDS } from '../constants/thresholds';

export const SpecialistPage: React.FC = () => {
  const { data: neurologists, loading } = useCSV<NeurologistRecord>('/data/neurologists.csv');

  if (loading) {
    return <div className="h-96 bg-slate-50 dark:bg-slate-800/40 rounded-2xl animate-pulse" />;
  }

  const sortedNeurologists = [...neurologists].sort((a, b) => a.neurologist_per_million - b.neurologist_per_million);

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
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
            State-wise Neurologist Availability & Specialist Load
          </h3>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
            Ordered by Care Deficit
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">State / UT</th>
                <th className="py-3 px-4 text-right">Total Neurologists</th>
                <th className="py-3 px-4 text-right">Cog/Behav Specialists</th>
                <th className="py-3 px-4 text-right">Per Million Pop</th>
                <th className="py-3 px-4 text-right">Patients per Specialist</th>
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
                  <td className="py-3 px-4 text-right font-mono tabular-nums">{row.total_neurologists}</td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-indigo-600 dark:text-indigo-400">{row.cog_behav_neuro}</td>
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
      </div>
    </div>
  );
};
