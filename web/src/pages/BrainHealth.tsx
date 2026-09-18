/**
 * @file BrainHealth.tsx
 * @description Evidence-based Brain Health & Prevention resource for Project Dementia India.
 * Covers modifiable risk factors (Lancet Commission 2024), exercise, nutrition, sleep medicine, cognitive testing, and daily lifestyle planning.
 */

import React from 'react';
import {
  Activity,
  Salad,
  Moon,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  HeartPulse,
  Dumbbell,
  Stethoscope,
  ArrowRight,
} from 'lucide-react';
import { NavTabType } from './ReachOut';

interface BrainHealthProps {
  onNavigate?: (tab: NavTabType) => void;
}

export const BrainHealth: React.FC<BrainHealthProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-16">
      {/* HEADER / INTRO */}
      <section className="bg-gradient-to-b from-teal-500/10 via-teal-500/5 to-transparent dark:from-teal-950/30 dark:via-teal-950/10 dark:to-transparent rounded-3xl border border-teal-200/80 dark:border-teal-800/50 p-6 sm:p-10 shadow-xs">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 text-xs font-semibold border border-teal-300 dark:border-teal-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Prevention & Proactive Health</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Brain Health &amp; Prevention
          </h1>

          <p className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
            Dementia is not inevitable. Research shows that up to 45% of dementia cases could be prevented or delayed by addressing modifiable risk factors. This page summarises what the evidence actually shows.
          </p>

          <div className="pt-2 border-t border-teal-200/60 dark:border-teal-900/60 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Source:{' '}
            <a
              href="https://doi.org/10.1016/S0140-6736(24)01061-5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 dark:text-teal-400 hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>Lancet Commission on Dementia Prevention, Intervention and Care, 2024. DOI: 10.1016/S0140-6736(24)01061-5</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* SUBSECTION 2A — Exercise */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Subsection 2A · Physical Health
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Movement is the most evidence-backed brain protector
          </h2>
        </div>

        {/* Key finding callout (teal) */}
        <div className="p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800 space-y-2">
          <div className="flex items-center space-x-2 text-teal-900 dark:text-teal-200 font-bold text-sm sm:text-base">
            <Activity className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>Key Research Finding:</span>
          </div>
          <p className="text-xs sm:text-sm text-teal-950 dark:text-teal-100 leading-relaxed pl-7">
            Walking 30 minutes daily is linked to a 24% lower dementia risk. A 2026 analysis of 49 studies with nearly 3 million participants found regular physical activity reduces dementia risk by 25%.
          </p>
          <div className="pl-7 pt-1 text-[11px] text-teal-800 dark:text-teal-300 font-medium">
            Source: Lancet 2026 / JAMA systematic review pooled RR 0.75 across 49 studies
          </div>
        </div>

        {/* Three evidence cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Aerobic */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-teal-600 dark:text-teal-400">
                <HeartPulse className="w-5 h-5" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Aerobic Exercise</h3>
              </div>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <p><strong className="text-slate-800 dark:text-slate-200">What:</strong> Walking, swimming, cycling</p>
                <p><strong className="text-slate-800 dark:text-slate-200">Evidence:</strong> Strongest evidence for cognitive benefit. Increases BDNF (brain-derived neurotrophic factor), improves cerebral blood flow, reduces inflammation.</p>
                <p><strong className="text-slate-800 dark:text-slate-200">How much:</strong> 150 minutes per week minimum</p>
                <p><strong className="text-slate-800 dark:text-slate-200">India context:</strong> Morning walks are culturally established — this is one prevention tool that fits naturally.</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400">
              Source:{' '}
              <a
                href="https://doi.org/10.3389/frdem.2026.1843904"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 dark:text-teal-400 hover:underline"
              >
                Frontiers in Dementia 2026
              </a>
            </div>
          </div>

          {/* Card 2: Resistance */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
                <Dumbbell className="w-5 h-5" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Resistance Training</h3>
              </div>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <p><strong className="text-slate-800 dark:text-slate-200">What:</strong> Light weights, resistance bands, bodyweight</p>
                <p><strong className="text-slate-800 dark:text-slate-200">Evidence:</strong> Maintains muscle mass, improves insulin sensitivity, reduces metabolic risk factors for dementia.</p>
                <p><strong className="text-slate-800 dark:text-slate-200">How much:</strong> 2 sessions per week</p>
                <p><strong className="text-slate-800 dark:text-slate-200">India context:</strong> Yoga with strength elements, traditional activities like grinding, gardening</p>
              </div>
            </div>
          </div>

          {/* Card 3: Balance & Coordination */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Balance &amp; Coordination</h3>
              </div>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <p><strong className="text-slate-800 dark:text-slate-200">What:</strong> Yoga, tai chi, dance</p>
                <p><strong className="text-slate-800 dark:text-slate-200">Evidence:</strong> Dual-task exercises (moving + thinking simultaneously) show the strongest cognitive benefits in older adults.</p>
                <p><strong className="text-slate-800 dark:text-slate-200">India context:</strong> Classical dance forms, traditional yoga, Bharatanatyam, folk dance — all qualify</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUBSECTION 2B — Diet */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Subsection 2B · Nutrition Science
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            What the research says about brain-protective eating
          </h2>
        </div>

        {/* Prominent Disclaimer */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
          <strong className="font-bold">Important disclaimer:</strong> Diet research shows associations, not guarantees. No food prevents dementia. These are patterns associated with lower risk across large populations — not prescriptions.
        </div>

        {/* MIND Diet Explainer Card */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
              Dietary Pattern
            </span>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
              MIND &amp; Mediterranean Diet
            </span>
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            What it is &amp; Clinical Evidence
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            A hybrid of the Mediterranean and DASH diets, developed specifically for brain health. Adherence to the Mediterranean diet is associated with a 30% lower risk of Alzheimer&apos;s disease (HR 0.70, 95% CI 0.60–0.82 across 23 studies).
          </p>
          <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400">
            Source:{' '}
            <a
              href="https://doi.org/10.1007/s11357-024-01488-3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 dark:text-teal-400 hover:underline font-semibold"
            >
              GeroScience meta-analysis 2025. DOI: 10.1007/s11357-024-01488-3
            </a>
          </div>
        </div>

        {/* Foods to Emphasise: Vegetarian vs Non-Vegetarian */}
        <div className="space-y-3">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Foods to Emphasise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vegetarian */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
              <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                <Salad className="w-4 h-4" />
                <span>Vegetarian — Emphasise:</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed list-disc list-inside">
                <li><strong className="text-slate-800 dark:text-slate-200">Green leafy vegetables</strong> (spinach, methi, palak) — daily</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Berries</strong> (amla, blueberries, jamun) — most days</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Nuts</strong> (walnuts, almonds) — small handful, 5x per week</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Olive oil or cold-pressed oils</strong> — for cooking and dressings</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Whole grains</strong> (oats, brown rice, jowar, bajra) — daily</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Beans and legumes</strong> (dal, rajma, chana) — 3x per week</li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Turmeric</strong> — emerging evidence for anti-inflammatory effect (note: based on preliminary Indian RCTs; evidence is emerging and not curative)
                </li>
                <li><strong className="text-slate-800 dark:text-slate-200">Green tea</strong> — 1-2 cups daily</li>
              </ul>
            </div>

            {/* Non-Vegetarian */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
              <div className="flex items-center space-x-2 text-teal-700 dark:text-teal-400 font-bold text-sm">
                <HeartPulse className="w-4 h-4" />
                <span>Non-vegetarian — Additionally:</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed list-disc list-inside">
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Fatty fish</strong> (salmon, mackerel, sardines, rohu, hilsa) — at least 2 servings per week (Omega-3 fatty acids reduce neuroinflammation)
                </li>
                <li><strong className="text-slate-800 dark:text-slate-200">Eggs</strong> — rich B12 source, crucial for nerve health</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Poultry</strong> (chicken, unprocessed) — moderate amounts</li>
              </ul>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                <span className="font-bold text-xs text-rose-600 dark:text-rose-400">Foods to reduce:</span>
                <ul className="mt-1.5 space-y-1 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
                  <li>Red meat — limit to 4 servings per month</li>
                  <li>Processed and fried foods — minimise</li>
                  <li>Refined sugar and sweets — limit significantly</li>
                  <li>Ultra-processed foods (packaged snacks) — avoid</li>
                  <li>Saturated fat from palm oil or vanaspati — reduce</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Vitamin Deficiency Callout (Amber — critical in India) */}
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 space-y-3">
          <div className="flex items-center space-x-2 text-amber-900 dark:text-amber-200 font-bold text-sm sm:text-base">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Rule Out Treatable Deficiencies First (Crucial for India)</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed">
            B12 deficiency is common in vegetarians and the elderly in India and causes cognitive symptoms that can mimic dementia. A simple blood test can check this. Low B12 is treatable. If cognitive symptoms are present, rule this out first before assuming dementia.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-900/90 dark:text-amber-200/90 pt-1">
            <div>• <strong>Vitamin D:</strong> Deficiency linked to cognitive decline</div>
            <div>• <strong>Folic acid:</strong> Important for vascular brain health</div>
            <div>• <strong>Thyroid function:</strong> Hypothyroidism mimics dementia</div>
            <div>• <strong>Fasting blood glucose:</strong> Diabetes doubles dementia risk</div>
          </div>
          <p className="text-[11px] text-amber-800 dark:text-amber-300 font-medium pt-1 border-t border-amber-200 dark:border-amber-900">
            Source: LASI Wave 1 nutritional data; standard clinical practice per Indian Academy of Neurology (IAN) guidelines. These are blood tests your doctor can order at any diagnostic lab. Checking them once a year after age 50 is reasonable preventive practice.
          </p>
        </div>
      </section>

      {/* SUBSECTION 2C — Sleep */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Subsection 2C · Sleep Medicine
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Sleep disorders and dementia — a two-way relationship
          </h2>
        </div>

        {/* Key finding */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
          <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
            <Moon className="w-4 h-4" />
            <span>REM Sleep Behaviour Disorder (RBD) as an Early Precursor</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            REM Sleep Behaviour Disorder (RBD) — acting out dreams physically while asleep — is now confirmed as a precursor of neurodegenerative disease. Cognitive decline in RBD begins up to 10 years before dementia diagnosis.
          </p>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            Source:{' '}
            <a
              href="https://doi.org/10.1002/alz.13386"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 dark:text-teal-400 hover:underline font-semibold"
            >
              Joza et al., Alzheimer&apos;s &amp; Dementia 2024. DOI: 10.1002/alz.13386
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">What to watch for:</h3>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside leading-relaxed">
              <li>Physically acting out dreams (kicking, shouting in sleep)</li>
              <li>Excessive daytime sleepiness</li>
              <li>Irregular sleep-wake cycle</li>
              <li>Insomnia in elderly — linked to amyloid accumulation</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">What to do:</h3>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside leading-relaxed">
              <li>Report dream-enactment behaviour to a neurologist (not a psychiatrist — this requires neurological evaluation)</li>
              <li>Maintain consistent sleep and wake times</li>
              <li>Avoid screens 1 hour before sleep</li>
              <li>Keep bedroom dark, cool, and quiet</li>
              <li>Morning sunlight exposure (15-30 minutes) regulates circadian rhythm</li>
            </ul>
          </div>
        </div>

        {/* Safety Disclaimer */}
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
          <strong className="font-bold">Important note:</strong> If a family member is physically acting out dreams — shouting, kicking, falling out of bed — consult a neurologist. This requires a sleep study (polysomnography) for proper diagnosis. Do not attempt to restrain them during episodes — ensure the sleep environment is safe instead.
        </div>
      </section>

      {/* SUBSECTION 2D — Cognitive testing and screening */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Subsection 2D · Clinical Screening
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            When and how to screen — what tests exist
          </h2>
        </div>

        {/* Standard tests in India */}
        <div className="space-y-3">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Standard screening tests used in India:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">MMSE</h4>
              <p><strong>What:</strong> 30-point questionnaire, 10 minutes</p>
              <p><strong>Available:</strong> At any neurology clinic</p>
              <p><strong>Used for:</strong> Initial cognitive screening</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">MoCA</h4>
              <p><strong>What:</strong> More sensitive than MMSE for mild impairment</p>
              <p><strong>Available:</strong> Trained neurologists &amp; psychologists</p>
              <p><strong>Used for:</strong> Detecting mild cognitive impairment (MCI)</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Clock Drawing Test</h4>
              <p><strong>What:</strong> Person draws a clock showing a specific time</p>
              <p><strong>Available:</strong> Simple clinical office task</p>
              <p><strong>Used for:</strong> Quick screening, visuospatial ability</p>
            </div>
          </div>
        </div>

        {/* Blood Biomarkers Card */}
        <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              Emerging Biomarker Technology
            </span>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700">
              Tertiary Centres
            </span>
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            p-tau217 blood test
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Measures phosphorylated tau protein in blood. Detects Alzheimer&apos;s pathology 15-20 years before symptoms. FDA-approved Lumipulse test outperforms clinicians in diagnosis accuracy.
          </p>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Source:{' '}
            <a
              href="https://doi.org/10.1016/j.arr.2026.102704"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              AAIC 2024 / ScienceDirect 2026. DOI: 10.1016/j.arr.2026.102704
            </a>
          </div>
          <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 italic">
            <strong>India availability:</strong> Not yet widely available in India. Available at selected tertiary centres. Currently recommended only for people with symptoms, not general population screening.
          </div>
        </div>

        {/* Check-up Frequency Table */}
        <div className="space-y-3">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Recommended Check-up Frequency
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                <tr>
                  <th className="p-3 font-bold">Age Group</th>
                  <th className="p-3 font-bold">Recommended Screening</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="p-3 font-semibold">Age 50–60</td>
                  <td className="p-3">Annual blood tests (B12, thyroid, fasting glucose, Vitamin D)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Age 60–70</td>
                  <td className="p-3">Annual blood tests + MoCA if any cognitive concerns exist</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Age 70+</td>
                  <td className="p-3">Annual blood tests + cognitive neurologist review if any symptoms appear</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Family history</td>
                  <td className="p-3">Discuss personalised screening with a cognitive neurologist from age 45</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate?.('care-network')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Find memory clinics for screening</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* SUBSECTION 2E — Exercise for brain health (activity guide / weekly planner) */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Subsection 2E · Weekly Planner
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Simple activities to keep the brain active at home
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Backed by research. Adaptable to any fitness level.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Daily */}
          <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
              Daily (Every Day)
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200 leading-relaxed list-disc list-inside">
              <li>30-minute walk (or 3 × 10-minute walks)</li>
              <li>Read or listen to something new</li>
              <li>Engage in real discussion, not small talk</li>
              <li>Adequate sleep (7–8 hours)</li>
            </ul>
          </div>

          {/* Most days */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Most Days (5x / Week)
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200 leading-relaxed list-disc list-inside">
              <li>Small handful of walnuts or almonds</li>
              <li>Leafy green vegetable with at least one meal</li>
              <li>15–30 minutes of morning sunlight</li>
            </ul>
          </div>

          {/* 3x per week */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              3x Per Week
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200 leading-relaxed list-disc list-inside">
              <li>Light resistance exercise (yoga, bodyweight, bands)</li>
              <li>Mentally challenging activity (crosswords, chess, new language words, music practice)</li>
            </ul>
          </div>

          {/* Weekly */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Weekly
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200 leading-relaxed list-disc list-inside">
              <li>Social engagement outside immediate family</li>
              <li>Creative activity (new dish cooking, drawing, writing, gardening)</li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-2 text-center">
          These are lifestyle patterns, not prescriptions. The benefit comes from consistency over years, not perfection over weeks.
        </p>
      </section>

      {/* Clinical Disclaimer */}
      <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400 italic max-w-2xl mx-auto leading-relaxed">
          The information on this page is educational and reflects population-level research associations. It is not medical advice or individual prescription. Always consult a qualified neurologist for personalised screening and diagnostic decisions.
        </p>
      </div>
    </div>
  );
};

export default BrainHealth;
