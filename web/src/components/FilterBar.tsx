/**
 * @file FilterBar.tsx
 * @description Global filter control bar for the Dementia India dashboard.
 * Groups interactive controls into Population, Geography, and Age Cohort clusters.
 * Synchronizes with FilterContext to update all dashboard visualizations simultaneously.
 */

import React, { useState } from 'react';
import { useFilters } from '../context/FilterContext';
import { Filter, RotateCcw, Info, X, SlidersHorizontal } from 'lucide-react';

export const FilterBar: React.FC = () => {
  const {
    sex,
    setSex,
    urban,
    setUrban,
    ageGroup,
    setAgeGroup,
    selectedState,
    resetFilters,
  } = useFilters();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const isNonDefault =
    sex !== 'Both' ||
    urban !== 'All' ||
    ageGroup !== '60+' ||
    selectedState !== null;

  const filterControls = (
    <div className="flex flex-col sm:flex-row flex-wrap sm:items-end gap-4 text-xs sm:text-sm">
      {/* Group 1: Population */}
      <div className="flex flex-col space-y-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Population
        </span>
        <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
          {(['Both', 'Male', 'Female'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSex(s)}
              className={`px-3 py-1 rounded-md transition-all font-medium text-xs sm:text-sm ${
                sex === s
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Group 2: Geography */}
      <div className="flex flex-col space-y-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Geography
        </span>
        <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
          {(['All', 'Rural', 'Urban'] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUrban(u)}
              className={`px-3 py-1 rounded-md transition-all font-medium text-xs sm:text-sm ${
                urban === u
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* Group 3: Age Cohort */}
      <div className="flex flex-col space-y-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Age Cohort
        </span>
        <select
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value as any)}
          className="h-[34px] px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="60+">All 60+ (Default)</option>
          <option value="60-64">60–64</option>
          <option value="65-69">65–69</option>
          <option value="70-74">70–74</option>
          <option value="75-79">75–79</option>
          <option value="80-84">80–84</option>
          <option value="85+">85+</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8 shadow-sm relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Indicator & Info */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="relative flex items-center justify-center">
            <Filter className="w-4 h-4 text-emerald-500" />
            {isNonDefault && (
              <span
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900"
                title="Filters are active"
              />
            )}
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 hidden md:inline">
            Global Filters
          </span>
          <div className="relative group cursor-pointer">
            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover:block bg-slate-850 text-white text-[11px] rounded-lg px-2.5 py-1 whitespace-nowrap shadow-lg z-50 pointer-events-none">
              Filters affect all charts simultaneously
            </div>
          </div>
        </div>

        {/* Desktop Filter Clusters */}
        <div className="hidden sm:flex flex-1 items-center justify-center">
          {filterControls}
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-500" />
            <span>Filters</span>
            {isNonDefault && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-1" />}
          </button>
        </div>

        {/* Right: Always Visible Reset Button */}
        <div className="shrink-0">
          <button
            onClick={resetFilters}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isNonDefault
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-100'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Slide-up) */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm sm:hidden flex flex-col justify-end animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-t-2xl p-5 space-y-5 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-emerald-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Active Filters</h3>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {filterControls}

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="flex-1 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
