import React from 'react';
import { useFilters } from '../context/FilterContext';
import { Filter, RotateCcw, X, MapPin } from 'lucide-react';

export const FilterBar: React.FC = () => {
  const {
    sex,
    setSex,
    urban,
    setUrban,
    ageGroup,
    setAgeGroup,
    education,
    setEducation,
    selectedState,
    setSelectedState,
    resetFilters,
  } = useFilters();

  const isFiltered = sex !== 'Both' || urban !== 'All' || ageGroup !== '60+' || education !== 'All' || selectedState !== null;

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
          <div className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 font-medium">
            <Filter className="w-4 h-4 text-emerald-500" />
            <span>Filters:</span>
          </div>

          {/* Sex filter */}
          <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
            {(['Both', 'Male', 'Female'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSex(s)}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  sex === s
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Urban/Rural filter */}
          <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
            {(['All', 'Rural', 'Urban'] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUrban(u)}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  urban === u
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          {/* Age Group dropdown */}
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value as any)}
            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="60+">Age: 60+ (All Seniors)</option>
            <option value="60-64">Age: 60–64</option>
            <option value="65-69">Age: 65–69</option>
            <option value="70-74">Age: 70–74</option>
            <option value="75-79">Age: 75–79</option>
            <option value="80-84">Age: 80–84</option>
            <option value="85+">Age: 85+</option>
          </select>

          {/* Education dropdown */}
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value as any)}
            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">Education: All</option>
            <option value="None">No Formal Education</option>
            <option value="Primary">Primary School</option>
            <option value="Middle">Middle School</option>
            <option value="Secondary">Secondary School</option>
            <option value="Higher">Higher Education</option>
          </select>

          {/* Selected State Badge */}
          {selectedState && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold animate-fadeIn">
              <MapPin className="w-3 h-3" />
              <span>State: {selectedState}</span>
              <button
                onClick={() => setSelectedState(null)}
                className="hover:text-emerald-950 dark:hover:text-white ml-1"
                title="Clear state filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>

        {/* Right: Reset Action */}
        {isFiltered && (
          <button
            onClick={resetFilters}
            className="flex items-center space-x-1 text-xs text-rose-600 dark:text-rose-400 hover:underline font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
