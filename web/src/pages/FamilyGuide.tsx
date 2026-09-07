/**
 * @file FamilyGuide.tsx
 * @description A compassionate, practical roadmap and guide for families facing a dementia or Alzheimer's diagnosis in India.
 * Written for caregivers, not clinicians. Features diagnostic explainers, a 7-step roadmap, FAQs, and vetted resources.
 */

import React, { useState } from 'react';
import {
  BookOpen,
  Compass,
  HelpCircle,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Phone,
  Clock,
  HeartHandshake,
} from 'lucide-react';

interface FamilyGuideProps {
  onNavigate?: (tab: 'india' | 'family-guide' | 'specialist' | 'health-spending' | 'care-network' | 'about' | 'global') => void;
}

export const FamilyGuide: React.FC<FamilyGuideProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First FAQ open by default

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  const warningSigns = [
    'Forgetting recent conversations or events repeatedly',
    'Getting lost in familiar places',
    'Trouble finding the right words in conversation',
    'Difficulty managing money or daily tasks',
    'Changes in mood or personality — withdrawal, suspicion, irritability',
    'Repeating the same questions or stories in the same conversation',
  ];

  const roadmapSteps = [
    {
      step: 1,
      title: 'Confirm the diagnosis',
      body: 'Ask for a referral to a neurologist or geriatrician who specialises in cognitive disorders. A general physician cannot diagnose dementia. The assessment usually includes cognitive tests, blood tests, and brain imaging. If you are in a city without a specialist, ask your doctor about NIMHANS teleconsultation or Tele-MANAS.',
      actionLabel: 'Find a memory clinic near you',
      isExternal: false,
      targetTab: 'care-network' as const,
      linkUrl: '#care-network',
    },
    {
      step: 2,
      title: 'Learn about the stage',
      body: 'Dementia progresses in stages — early, middle, and late. The care a person needs changes significantly at each stage. Early stage: the person can often manage daily tasks with support. Middle stage: more help is needed with bathing, dressing, and medication. Late stage: full-time care is needed. Ask your neurologist which stage your family member is currently at.',
      actionLabel: 'Read about dementia stages',
      isExternal: true,
      linkUrl: 'https://www.alzheimer.org.in',
    },
    {
      step: 3,
      title: 'Tell the family',
      body: 'Dementia caregiving cannot fall on one person. Gather the immediate family and share what you know. Divide responsibilities early — who handles medication, who handles doctor visits, who manages finances. The sooner this conversation happens, the less crisis you will face later. If family members are in denial, connecting with an ARDSI counsellor can help.',
      actionLabel: 'Find an ARDSI chapter near you',
      isExternal: false,
      targetTab: 'care-network' as const,
      linkUrl: '#care-network',
    },
    {
      step: 4,
      title: 'Make the home safer',
      body: "Falls are one of the most serious risks for people with dementia. Remove loose rugs, install grab bars in bathrooms, ensure good lighting in all rooms especially at night, lock away medicines and cleaning products, and disable the gas if the person is alone at any point. Put ID information in the person's pocket at all times — name, address, and a contact number.",
      actionLabel: 'Download a home safety checklist',
      isExternal: true,
      linkUrl: 'https://dementiacarenotes.in',
    },
    {
      step: 5,
      title: 'Connect with a support group',
      body: 'You will not find many people in your neighbourhood who understand what you are going through. Caregiver support groups — whether in person through ARDSI chapters or online through Dementia Care Notes — connect you with people who do. The information shared in these groups is practical, India-specific, and unavailable in medical textbooks.',
      actionLabel: 'Find caregiver support groups',
      isExternal: false,
      targetTab: 'care-network' as const,
      linkUrl: '#care-network',
    },
    {
      step: 6,
      title: 'Understand what you are entitled to',
      body: 'People with dementia in India may be eligible for disability certification under the Rights of Persons with Disabilities Act 2016 (RPwD). This opens access to reservations in government services, tax benefits, and subsidised care. Ayushman Bharat covers hospitalisation for neurological conditions up to Rs 5 lakh per year for eligible families. Ask your district health office about the Caregiver Support Programme under the National Programme for Health Care of the Elderly (NPHCE).',
      actionLabel: 'Explore government entitlements',
      isExternal: false,
      targetTab: 'health-spending' as const,
      linkUrl: '#health-spending',
    },
    {
      step: 7,
      title: 'Look after yourself',
      body: 'Caregiver burnout is real. 72% of dementia caregivers in India are women, and most provide over 6 hours of care daily without institutional support. You cannot give what you do not have. Eat, sleep, and take breaks — not as luxuries but as necessities. Call iCall (9152987821) or the Vandrevala Foundation (9999 666 555) if you are struggling. These are free, confidential, and staffed by professionals.',
      actionLabel: 'View all helplines',
      isExternal: false,
      targetTab: 'care-network' as const,
      linkUrl: '#care-network',
    },
  ];

  const faqs = [
    {
      q: 'Can dementia be cured?',
      a: 'Not currently. There is no cure for any form of dementia. However, medications such as Donepezil and Memantine can slow progression in some patients, and therapy, routine, and physical activity can significantly improve quality of life. Research into disease-modifying treatments is ongoing globally.',
    },
    {
      q: 'How do I know if it is dementia or normal aging?',
      a: 'Normal aging causes some slowing of memory and thinking. Dementia causes changes that interfere with daily life — getting lost at home, forgetting how to cook a familiar meal, or not recognising family members. If you are unsure, a formal cognitive assessment by a neurologist takes about 30 minutes and gives a clear answer.',
    },
    {
      q: 'What medicines are used for dementia in India?',
      a: 'Four medicines are approved and available in India: Donepezil, Rivastigmine, Galantamine (for mild to moderate Alzheimer’s), and Memantine (for moderate to severe). These are available in generic form and are on the National List of Essential Medicines. They do not cure dementia but may slow its progression. Always consult a neurologist before starting.',
    },
    {
      q: 'Is dementia hereditary?',
      a: 'Most dementia is not directly inherited. Having a parent with Alzheimer’s raises your lifetime risk slightly but does not mean you will develop it. A small percentage of early-onset cases (before age 65) are linked to specific genetic mutations. A genetic counsellor can advise if this is a concern.',
    },
    {
      q: 'My family member was just diagnosed. Are they a danger to themselves?',
      a: 'In early stages, most people with dementia can live safely with supervision. As dementia progresses, specific risks increase — wandering, falls, and forgetting to eat or take medication. A home safety assessment (Step 4 above) addresses most risks. For wandering specifically, ID cards and GPS trackers designed for dementia patients are available in India.',
    },
    {
      q: 'What government support is available in India?',
      a: 'The Rights of Persons with Disabilities Act 2016 includes dementia under intellectual disability provisions. Disability certificates entitle families to tax exemptions, priority booking at government services, and subsidised care. The NPHCE provides free health checkups for elderly citizens through district hospitals. Ayushman Bharat covers neurological hospitalisation for eligible families.',
    },
  ];

  const resources = [
    {
      name: 'Dementia Care Notes',
      description: "India's most practical caregiver resource. City-wise clinic guides, day-by-day care advice, and a community of families who understand.",
      link: 'https://dementiacarenotes.in',
      tag: 'Free',
    },
    {
      name: 'ARDSI Helpline',
      description: 'Call for clinic referrals, caregiver training, and local chapter support.',
      number: '+91 98461 98471',
      hours: 'Mon to Fri, 10am to 5pm',
      tag: 'Free',
    },
    {
      name: 'Dementia India Alliance',
      description: 'Free memory screening and specialist referrals in 6 languages including Hindi, Tamil, and Malayalam.',
      number: '8585990990',
      link: 'https://dementia-india.org',
      tag: 'Free',
    },
    {
      name: 'DemClinic',
      description: 'Online memory screening service run by 12 specialist neurologists and psychiatrists.',
      link: 'https://demclinic.com',
      tag: 'Free',
    },
    {
      name: 'Tele-MANAS',
      description: 'Government 24x7 mental health helpline in 20+ Indian languages. For caregiver distress and psychiatric triage.',
      number: '14416',
      tag: 'Free, 24x7',
    },
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-950/30 dark:via-amber-950/10 dark:to-transparent rounded-3xl border border-amber-200/80 dark:border-amber-800/50 p-6 sm:p-10 shadow-xs">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-semibold border border-amber-300 dark:border-amber-800">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Family Caregiver Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            A Guide for Families
          </h1>

          <p className="text-base sm:text-lg font-medium text-amber-800/90 dark:text-amber-200/90 leading-relaxed">
            If someone you love has just been diagnosed, or you are not sure yet — start here.
          </p>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed pt-2 border-t border-amber-200/60 dark:border-amber-900/60">
            A dementia diagnosis changes everything. Most families in India receive it without any guidance on what
            comes next. This page is written for caregivers, not doctors. It does not replace medical advice. It is
            meant to help you understand what you are facing and take the next step, one at a time.
          </p>
        </div>
      </div>

      {/* SECTION A — Understanding the diagnosis */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-8">
        <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Section A
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Understanding the diagnosis
            </h2>
          </div>
        </div>

        {/* Subsection A1: What dementia actually is */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Dementia is not one disease
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Dementia is a word for a group of symptoms — memory loss, confusion, difficulty with language, and changes
            in behaviour — caused by damage to brain cells. Alzheimer's disease causes about 60% of all dementia cases.
            Vascular dementia, caused by reduced blood flow to the brain, is the second most common. A person can have
            more than one type at the same time. Dementia is progressive — it gets worse over time. There is currently
            no cure, but there are ways to slow its progress and improve quality of life.
          </p>
        </div>

        {/* Subsection A2: Difference between Alzheimer's and dementia */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            The Difference Explained
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Category
              </span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Dementia
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                An umbrella term covering many conditions that affect memory, thinking, and daily life.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-800/60 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Specific Condition
              </span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Alzheimer's disease
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The most common cause of dementia. A specific brain disease where abnormal proteins damage brain cells
                over many years.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-center">
            <p className="text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-200">
              All Alzheimer's is dementia. Not all dementia is Alzheimer's.
            </p>
          </div>
        </div>

        {/* Subsection A3: Warning signs checklist */}
        <div className="space-y-4 pt-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Common early warning signs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {warningSigns.map((sign, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800"
              >
                <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-snug">
                  {sign}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-1">
            These signs alone do not confirm dementia. Only a qualified neurologist or geriatrician can diagnose
            dementia after proper assessment.
          </p>
        </div>
      </section>

      {/* SECTION B — What to do first (The Roadmap) */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-8">
        <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Section B · Step-by-Step Roadmap
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Your first steps after a diagnosis
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Take these one at a time. You do not need to do everything at once.
            </p>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {roadmapSteps.map((s) => (
            <div key={s.step} className="relative group">
              {/* Numbered Node */}
              <div className="absolute -left-6 sm:-left-8 top-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center ring-4 ring-white dark:ring-slate-900 shadow-sm">
                {s.step}
              </div>

              {/* Step Card Content */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-5 sm:p-6 space-y-3 hover:border-emerald-500/40 transition-colors">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {s.body}
                </p>

                <div className="pt-2">
                  {s.isExternal ? (
                    <a
                      href={s.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline"
                    >
                      <span>{s.actionLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (onNavigate && s.targetTab) {
                          onNavigate(s.targetTab);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline cursor-pointer"
                    >
                      <span>{s.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION C — Frequently Asked Questions */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Section C
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Frequently asked questions
            </h2>
          </div>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 flex items-center justify-between gap-4 transition-colors"
                >
                  <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-purple-600 dark:text-purple-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/90">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION D — Resources to bookmark */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Section D
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Five resources every caregiver in India should save
            </h2>
          </div>
        </div>

        {/* 5 Cards Grid (2-col on mobile/tablet, 3-col on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((res, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {res.name}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 shrink-0">
                    {res.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                {res.number && (
                  <div className="flex items-center space-x-2 font-mono font-bold text-slate-900 dark:text-white">
                    <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{res.number}</span>
                  </div>
                )}
                {res.hours && (
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{res.hours}</span>
                  </div>
                )}
                {res.link && (
                  <div className="pt-1">
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline text-xs"
                    >
                      <span>Visit website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Disclaimer */}
      <div className="text-center pt-2">
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic">
          This page was written by a family caregiver, for family caregivers. It is not medical advice. For clinical
          decisions, always consult a qualified neurologist or geriatrician.
        </p>
      </div>
    </div>
  );
};
