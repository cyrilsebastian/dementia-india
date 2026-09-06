/**
 * @file FilterBar.tsx
 * @description Global filter control bar for the Dementia India dashboard.
 * Groups interactive controls into Region, Sex, Area, Cohort, and Reset controls.
 * Synchronizes with FilterContext to update all dashboard visualizations simultaneously.
 */

import React, { useState, useMemo } from 'react';
import { useFilters } from '../context/FilterContext';
import { useCSV } from '../data/useCSV';
import { StateRecord } from '../types/data';
import { Filter, RotateCcw, Info, X, SlidersHorizontal, ChevronDown } from 'lucide-react';

export const FilterBar: React.FC = () => {
  const {
    sex,
    setSex,
    urban,
    setUrban,
    ageGroup,
    setAgeGroup,
    selectedState,
    setSelectedState,
    resetFilters,
  } = useFilters();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { data: statesData } = useCSV<StateRecord>('/data/india-states.csv');

  // Extract unique state names & codes sorted alphabetically
  const uniqueStates = useMemo(() => {
    if (!statesData.length) return [];
    const map = new Map<string, string>();
    for (const row of statesData) {
      if (row.state_code && row.state_name && !map.has(row.state_code)) {
        map.set(row.state_code, row.state_name);
      }
    }
    return Array.from(map.entries())
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [statesData]);

  const isNonDefault =
    sex !== 'Both' ||
    urban !== 'All' ||
    ageGroup !== '60+' ||
    selectedState !== null;

  const [infoHovered, setInfoHovered] = useState(false);

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    fontWeight: 400,
    whiteSpace: 'nowrap',
    letterSpacing: '0.01em',
    alignSelf: 'center',
  };

  const groupStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0 12px',
    alignSelf: 'center',
  };

  const dividerStyle: React.CSSProperties = {
    width: '1px',
    height: '20px',
    background: 'var(--border)',
    alignSelf: 'center',
  };

  return (
    <div
      className="sticky top-14 z-30 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 transition-colors"
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '44px',
        gap: 0,
      }}
    >
      <div
        className="max-w-7xl mx-auto w-full"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '44px',
          gap: 0,
        }}
      >
        {/* Desktop Filter Bar: [icons] [divider] [Region] [divider] [Sex] [divider] [Area] [divider] [Cohort] [divider] [Reset] */}
        <div
          className="hidden sm:flex items-center justify-center relative"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '44px',
            gap: 0,
          }}
        >
          {/* [icons] */}
          <div
            className="shrink-0"
            style={{
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              height: '44px',
              padding: '0 8px 0 4px',
              alignSelf: 'center',
              gap: '6px',
            }}
          >
            <div
              className="relative flex items-center justify-center cursor-default"
              title="Global Filters (Synchronized across all visualizations)"
              aria-label="Global Filters active"
              style={{ alignSelf: 'center' }}
            >
              <Filter style={{ width: '16px', height: '16px' }} className="text-emerald-600 dark:text-emerald-400" />
              {isNonDefault && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900"
                  title="Filters are active"
                />
              )}
            </div>
            <div
              className="relative flex items-center justify-center cursor-pointer"
              style={{ alignSelf: 'center' }}
              onMouseEnter={() => setInfoHovered(true)}
              onMouseLeave={() => setInfoHovered(false)}
              onClick={() => setInfoHovered((v) => !v)}
              title="Filters affect all charts simultaneously"
            >
              <Info
                style={{ width: '16px', height: '16px' }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              />
              {infoHovered && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-slate-900 dark:bg-slate-800 text-white text-[11px] rounded-lg px-3 py-1.5 whitespace-nowrap shadow-xl border border-slate-700 dark:border-slate-600 z-[100] pointer-events-none animate-fadeIn"
                >
                  Filters affect all charts simultaneously
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-800 border-t border-l border-slate-700 dark:border-slate-600 rotate-45" />
                </div>
              )}
            </div>
          </div>

          {/* [divider] */}
          <div className="shrink-0" style={dividerStyle} />

          {/* [Region] */}
          <div className="shrink-0" style={groupStyle}>
            <span style={labelStyle}>Region</span>
            <div className="relative flex items-center shrink-0" style={{ alignSelf: 'center' }}>
              <select
                value={selectedState || ''}
                onChange={(e) => setSelectedState(e.target.value ? e.target.value : null)}
                className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md border border-slate-200 dark:border-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                style={{
                  minWidth: '100px',
                  maxWidth: '160px',
                  fontSize: '13px',
                  height: '28px',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  paddingRight: '20px',
                  paddingLeft: '8px',
                  alignSelf: 'center',
                }}
              >
                <option value="">All India</option>
                {uniqueStates.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-1.5" />
            </div>
            {selectedState && (
              <button
                onClick={() => setSelectedState(null)}
                className="h-[24px] px-1 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 text-xs font-semibold border border-emerald-300 dark:border-emerald-800 transition-colors"
                title="Clear state filter"
                style={{ alignSelf: 'center' }}
              >
                ×
              </button>
            )}
          </div>

          {/* [divider] */}
          <div className="shrink-0" style={dividerStyle} />

          {/* [Sex] */}
          <div className="shrink-0" style={groupStyle}>
            <span style={labelStyle}>Sex</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', alignSelf: 'center' }}>
              {(['Both', 'Male', 'Female'] as const).map((s) => {
                const isActive = sex === s;
                return (
                  <button
                    key={s}
                    onClick={() => setSex(s)}
                    style={{
                      height: '28px',
                      fontSize: '12px',
                      padding: '0 10px',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      alignSelf: 'center',
                      cursor: 'pointer',
                      background: isActive ? 'var(--surface-2)' : 'transparent',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      border: isActive ? '0.5px solid var(--border-strong)' : '0.5px solid transparent',
                      fontWeight: isActive ? 600 : 400,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* [divider] */}
          <div className="shrink-0" style={dividerStyle} />

          {/* [Area] */}
          <div className="shrink-0" style={groupStyle}>
            <span style={labelStyle}>Area</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', alignSelf: 'center' }}>
              {(['All', 'Rural', 'Urban'] as const).map((u) => {
                const isActive = urban === u;
                return (
                  <button
                    key={u}
                    onClick={() => setUrban(u)}
                    style={{
                      height: '28px',
                      fontSize: '12px',
                      padding: '0 10px',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      alignSelf: 'center',
                      cursor: 'pointer',
                      background: isActive ? 'var(--surface-2)' : 'transparent',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      border: isActive ? '0.5px solid var(--border-strong)' : '0.5px solid transparent',
                      fontWeight: isActive ? 600 : 400,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {u}
                  </button>
                );
              })}
            </div>
          </div>

          {/* [divider] */}
          <div className="shrink-0" style={dividerStyle} />

          {/* [Cohort] */}
          <div className="shrink-0" style={groupStyle}>
            <span style={labelStyle}>Cohort</span>
            <div className="relative flex items-center shrink-0" style={{ alignSelf: 'center' }}>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value as any)}
                className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md border border-slate-200 dark:border-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                style={{
                  minWidth: '120px',
                  maxWidth: '180px',
                  fontSize: '13px',
                  height: '28px',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  paddingRight: '20px',
                  paddingLeft: '8px',
                  alignSelf: 'center',
                }}
              >
                <option value="60+">All 60+ (Default)</option>
                <option value="60-64">60–64</option>
                <option value="65-69">65–69</option>
                <option value="70-74">70–74</option>
                <option value="75-79">75–79</option>
                <option value="80-84">80–84</option>
                <option value="85+">85+</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-1.5" />
            </div>
          </div>

          {/* [divider] */}
          <div className="shrink-0" style={dividerStyle} />

          {/* [Reset] */}
          <button
            onClick={resetFilters}
            aria-label="Reset all filters"
            title={isNonDefault ? 'Reset active filters to defaults' : 'Filters at default'}
            className="hover:text-[var(--text-primary)] transition-colors group shrink-0"
            style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              background: 'transparent',
              border: 'none',
              padding: '0 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              height: '28px',
              alignSelf: 'center',
            }}
          >
            <RotateCcw style={{ width: '14px', height: '14px', fontSize: '14px' }} className="group-hover:rotate-[-45deg] transition-transform" />
            <span>Reset</span>
          </button>
        </div>

        {/* Mobile Filter Toggle & Reset Button */}
        <div className="sm:hidden flex items-center justify-between w-full h-[44px]">
          <div className="flex items-center space-x-2">
            {selectedState && (
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                {selectedState}
              </span>
            )}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              <SlidersHorizontal className="w-3 h-3 text-emerald-500" />
              <span>Filters</span>
              {isNonDefault && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-0.5" />}
            </button>
          </div>
          <button
            onClick={resetFilters}
            aria-label="Reset all filters"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
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

            <div className="space-y-4 text-xs">
              {/* Region */}
              <div className="flex flex-col gap-1.5">
                <span style={labelStyle}>Region</span>
                <div className="relative flex items-center">
                  <select
                    value={selectedState || ''}
                    onChange={(e) => setSelectedState(e.target.value ? e.target.value : null)}
                    className="w-full h-[32px] px-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="">All India</option>
                    {uniqueStates.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sex */}
              <div className="flex flex-col gap-1.5">
                <span style={labelStyle}>Sex</span>
                <div className="flex items-center gap-2">
                  {(['Both', 'Male', 'Female'] as const).map((s) => {
                    const isActive = sex === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setSex(s)}
                        style={{
                          height: '28px',
                          fontSize: '12px',
                          padding: '0 10px',
                          borderRadius: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          background: isActive ? 'var(--surface-2)' : 'transparent',
                          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                          border: isActive ? '0.5px solid var(--border-strong)' : '0.5px solid var(--border)',
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Area */}
              <div className="flex flex-col gap-1.5">
                <span style={labelStyle}>Area</span>
                <div className="flex items-center gap-2">
                  {(['All', 'Rural', 'Urban'] as const).map((u) => {
                    const isActive = urban === u;
                    return (
                      <button
                        key={u}
                        onClick={() => setUrban(u)}
                        style={{
                          height: '28px',
                          fontSize: '12px',
                          padding: '0 10px',
                          borderRadius: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          background: isActive ? 'var(--surface-2)' : 'transparent',
                          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                          border: isActive ? '0.5px solid var(--border-strong)' : '0.5px solid var(--border)',
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {u}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cohort */}
              <div className="flex flex-col gap-1.5">
                <span style={labelStyle}>Cohort</span>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value as any)}
                  className="w-full h-[32px] px-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
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
