/**
 * @file CountryDetailDrawer.tsx
 * @description Slide-over drawer providing comprehensive epidemiological, economic,
 * and policy intelligence for a selected nation when clicked on any chart or map.
 */

import React, { useEffect } from 'react';
import { useCSV } from '../data/useCSV';
import { CountryRecord, GDPRecord, PolicyRecord, ProjectionRecord } from '../types/data';
import { X, Globe, TrendingUp, DollarSign, ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';

interface CountryDetailDrawerProps {
  countryCode: string | null;
  onClose: () => void;
}

export const CountryDetailDrawer: React.FC<CountryDetailDrawerProps> = ({ countryCode, onClose }) => {
  const { data: countries } = useCSV<CountryRecord>('/data/global-countries.csv');
  const { data: gdps } = useCSV<GDPRecord>('/data/gdp-per-capita.csv');
  const { data: policies } = useCSV<PolicyRecord>('/data/global-who-policy.csv');
  const { data: projections } = useCSV<ProjectionRecord>('/data/projections.csv');

  // Listen to Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!countryCode) return null;

  // Extract country metadata
  const country2021 = countries.find(
    (c) => c.country_code === countryCode && c.year === 2021 && c.age_group === '60+' && c.sex === 'Both' && c.measure === 'Prevalence'
  );

  const countryName = country2021 ? country2021.country_name : countryCode;
  const region = country2021 ? country2021.region : 'Global';
  const prevalence = country2021 ? Number(country2021.value).toFixed(2) : '—';
  const lowerCI = country2021 ? Number(country2021.lower).toFixed(2) : '—';
  const upperCI = country2021 ? Number(country2021.upper).toFixed(2) : '—';

  // GDP 2021
  const gdpRec = gdps.find((g) => g.country_code === countryCode && Number(g.year) === 2021);
  const gdpUSD = gdpRec ? `$${Number(gdpRec.gdp_usd).toLocaleString('en-US')}` : '—';

  // WHO Policy
  const policyRec = policies.find((p) => p.country_code === countryCode);
  const policyStatus = policyRec ? policyRec.value_text : 'Not Reported';

  // Projections 2019 vs 2050
  const proj2019 = projections.find((p) => p.country_code === countryCode && Number(p.year) === 2019);
  const proj2050 = projections.find((p) => p.country_code === countryCode && Number(p.year) === 2050);

  const cases2019 = proj2019 ? `${(Number(proj2019.cases) / 1000000).toFixed(2)}M` : '—';
  const cases2050 = proj2050 ? `${(Number(proj2050.cases) / 1000000).toFixed(2)}M` : '—';
  const growthMultiplier =
    proj2019 && proj2050 && Number(proj2019.cases) > 0
      ? `+${(((Number(proj2050.cases) - Number(proj2019.cases)) / Number(proj2019.cases)) * 100).toFixed(0)}%`
      : '—';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{countryName}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      {countryCode}
                    </span>
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Region: {region}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metrics Dossier */}
            <div className="mt-6 space-y-4">
              {/* Epidemiological Prevalence */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span>Dementia Prevalence (60+ Cohort)</span>
                  <span className="font-mono text-[11px]">95% CI: [{lowerCI}% – {upperCI}%]</span>
                </div>
                <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                  {prevalence}%
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Surveillance standard based on IHME GBD 2021 DISMOD-MR 2.1 Bayesian modeling.
                </p>
              </div>

              {/* 2050 Forecast Projection */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span>Longitudinal Caseload (2019 → 2050)</span>
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                    {growthMultiplier}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">2019 Caseload</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums">{cases2019}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">2050 Forecast</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums">{cases2050}</span>
                  </div>
                </div>
              </div>

              {/* Economic Status */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">GDP per Capita (PPP 2021)</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">{gdpUSD}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>

              {/* WHO Policy Readiness */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">WHO National Action Plan</span>
                  <div className="flex items-center space-x-1 font-semibold text-xs">
                    {policyStatus === 'Yes' ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Enacted
                      </span>
                    ) : policyStatus === 'In development' ? (
                      <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                        <AlertCircle className="w-3.5 h-3.5" /> In Development
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400">
                        <ShieldAlert className="w-3.5 h-3.5" /> No Dedicated Plan
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                  Targeted under Pillar 1 of the WHO Global Action Plan on the Public Health Response to Dementia (2017–2025).
                </p>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Source: IHME, WHO GDO & Lancet</span>
            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:underline"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
