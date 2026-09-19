/**
 * @file Research.tsx
 * @description R&D and Clinical Science landscape for Project Dementia India.
 * Documents Indian scientific programmes (LASI-DAD, AIIMS, NIMHANS, ICMR) alongside global research milestones.
 */

import React from 'react';
import {
  Microscope,
  ExternalLink,
  AlertCircle,
  ArrowRight,
  Building2,
} from 'lucide-react';
import { NavTabType } from './ReachOut';

interface ResearchProps {
  onNavigate?: (tab: NavTabType) => void;
}

export const Research: React.FC<ResearchProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-16">
      {/* HEADER / INTRO */}
      <section className="bg-gradient-to-b from-indigo-500/10 via-indigo-500/5 to-transparent dark:from-indigo-950/30 dark:via-indigo-950/10 dark:to-transparent rounded-3xl border border-indigo-200/80 dark:border-indigo-800/50 p-6 sm:p-10 shadow-xs">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 text-xs font-semibold border border-indigo-300 dark:border-indigo-800">
            <Microscope className="w-3.5 h-3.5" />
            <span>Clinical Science &amp; Evidence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            What Science Says: Where India Stands
          </h1>

          <p className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
            Research on dementia, Alzheimer&apos;s, and brain health, with priority given to Indian studies.
          </p>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-2 border-t border-indigo-200/60 dark:border-indigo-900/60">
            Verified scientific citations and research registries. No commercial sponsorships or unverified claims.
          </p>
        </div>
      </section>

      {/* SUBSECTION 3A: R&D in India */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Subsection 3A · Indian Research
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            What research is happening in India
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Leading national medical universities and research institutes conducting epidemiology, diagnostics, and biomarker investigations in the Indian population.
          </p>
        </div>

        {/* Current Indian Research Programmes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Programme 1: LASI-DAD */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
                  Prevalence Baseline
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Status: Analysis Ongoing
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                LASI-DAD (Diagnostic Assessment of Dementia)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Institution: NIMHANS + IIPS
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Clinical diagnostic assessment of a subset of LASI Wave 1 participants, the most rigorous dementia prevalence study in India.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <a
                href="https://lasi-dad.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                <span>lasi-dad.org</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Programme 2: AIIMS Memory Clinic Research */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                Clinical Cohort
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                AIIMS Memory Clinic Research
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Institution: AIIMS New Delhi
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Neuropsychiatric symptoms and presentation patterns in early-onset dementia across North Indian clinical populations.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px]">
              <span className="text-slate-500 dark:text-slate-400">Published: </span>
              <a
                href="https://doi.org/10.1002/alz.088117"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>Chatterjee et al., Alzheimer&apos;s &amp; Dementia 2024. DOI: 10.1002/alz.088117</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Programme 3: NIMHANS Dementia Programme */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
                Apex Institute
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                NIMHANS Dementia Programme
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Institution: National Institute of Mental Health &amp; Neuro Sciences, Bengaluru
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                India&apos;s apex neuroscience institute runs a dedicated memory clinic and dementia research centre. Notable for developing Indian-language cognitive assessment tools (Hindi, Kannada, Tamil versions of MoCA and MMSE).
              </p>
            </div>
          </div>

          {/* Programme 4: ICMR Task Force */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                National Coordination
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                ICMR Neurodegenerative Disease Task Force
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Institution: Indian Council of Medical Research
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                National-level coordination of dementia research, registry development, and clinical evaluation protocols across government medical colleges.
              </p>
            </div>
          </div>
        </div>

        {/* Underfunding Callout Box */}
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-amber-900 dark:text-amber-200 font-bold text-sm sm:text-base">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>The Research Funding Deficit:</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed pl-7">
            India&apos;s dementia research is significantly underfunded relative to disease burden. The LASI-DAD study and NIMHANS memory clinic represent most of what exists. Compared to the UK (which funds Alzheimer&apos;s Research UK at £130M+ annually), India has no equivalent dedicated dementia research funding body.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => onNavigate?.('care-network')}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Building2 className="w-4 h-4" />
            <span>Explore Academic Memory Clinics</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </section>

      {/* SUBSECTION 3B: Global research highlights */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Subsection 3B · Global Milestones
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Key findings from global research relevant to India
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Rigorous international trials and systematic reviews with high direct relevance to clinical strategy in India.
          </p>
        </div>

        {/* 4 Research Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: 45% Prevention Finding */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
                Epidemiology &amp; Prevention
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                The 45% Prevention Finding
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The 2024 Lancet Commission identified 14 modifiable risk factors for dementia. Addressing all 14 could prevent or delay up to 45% of dementia cases globally.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px]">
              <a
                href="https://doi.org/10.1016/S0140-6736(24)01296-0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>Lancet 2024, DOI: 10.1016/S0140-6736(24)01296-0</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Blood Test Breakthrough */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
                Diagnostic Innovation
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Blood Test Breakthrough
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                In 2024, the FDA approved the first blood test for Alzheimer&apos;s disease. The p-tau217 test detects amyloid pathology 15-20 years before symptoms appear and outperforms specialist clinicians in accuracy.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] space-y-1">
              <div>
                <a
                  href="https://doi.org/10.1001/jama.2024.13855"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold inline-flex items-center gap-1"
                >
                  <span>AAIC 2024 / JAMA 2024. DOI: 10.1001/jama.2024.13855</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Exercise Evidence */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                Physical Activity Meta-Analysis
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Exercise Evidence
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                A 2026 meta-analysis of 49 studies (2.9 million participants) confirmed regular physical activity reduces dementia risk by 25%. Walking alone reduced risk by 24%.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px]">
              <a
                href="https://doi.org/10.3389/frdem.2026.1843904"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>Lancet Neurology 2026 / Frontiers in Dementia 2026</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Card 4: Diet Evidence */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                Nutritional Epidemiology
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Diet Evidence
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Adherence to the Mediterranean diet is associated with 30% lower risk of Alzheimer&apos;s disease across 23 studies. The protective effect is strongest when the diet is followed from midlife, not just in old age.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px]">
              <a
                href="https://doi.org/10.1007/s11357-024-01488-3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>GeroScience 2025. DOI: 10.1007/s11357-024-01488-3</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Disclaimer */}
      <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400 italic max-w-2xl mx-auto leading-relaxed">
          The research cited on this page is for public education and health policy analysis. All clinical investigations and evaluations should be coordinated through an accredited memory clinic or cognitive neurology department.
        </p>
      </div>
    </div>
  );
};

export default Research;
