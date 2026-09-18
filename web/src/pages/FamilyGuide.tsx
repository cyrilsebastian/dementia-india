/**
 * @file FamilyGuide.tsx
 * @description Redesigned compassionate, evidence-based roadmap and guide for families facing dementia or Alzheimer's in India.
 * Features early warning signs, doctor selection guide, appointment prep, mindset shifts, home safety checklist, stage-wise activity, and caregiver community resources.
 */

import React from 'react';
import {
  Brain,
  AlertTriangle,
  MapPin,
  MessageCircle,
  ClipboardList,
  Moon,
  Scale,
  Calendar,
  CheckCircle2,
  Stethoscope,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Heart,
  PhoneCall,
  Users,
  Lock,
  PlusCircle,
} from 'lucide-react';
import { NavTabType } from './ReachOut';

interface FamilyGuideProps {
  onNavigate?: (tab: NavTabType) => void;
}

export const FamilyGuide: React.FC<FamilyGuideProps> = ({ onNavigate }) => {
  const handleNav = (tab: NavTabType) => {
    if (onNavigate) {
      onNavigate(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const warningCards = [
    {
      domain: 'Memory',
      icon: Brain,
      iconColor: 'text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900',
      heading: 'Repeating the same question',
      body: 'Asking the same thing minutes apart — not occasionally, but consistently. Forgetting recent conversations entirely.',
    },
    {
      domain: 'Behaviour',
      badge: 'Critical in India',
      icon: AlertTriangle,
      iconColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900',
      heading: 'Sudden irritability or suspicion',
      body: 'Unexplained anger, accusing family members of stealing, or persistent suspicion. In Indian early-onset dementia, irritability affects 61% of patients and is the most common first sign.',
      sourceLabel: "Chatterjee et al., Alzheimer's & Dementia 2024",
      sourceDoi: '10.1002/alz.088117',
      sourceUrl: 'https://doi.org/10.1002/alz.088117',
    },
    {
      domain: 'Navigation',
      icon: MapPin,
      iconColor: 'text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-900',
      heading: 'Getting lost in familiar places',
      body: 'Unable to navigate a route walked hundreds of times. Confusion in their own neighbourhood or home.',
    },
    {
      domain: 'Language',
      icon: MessageCircle,
      iconColor: 'text-teal-500 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-900',
      heading: 'Struggling to find words',
      body: 'Pausing mid-sentence, substituting wrong words, or withdrawing from conversations to hide difficulty.',
    },
    {
      domain: 'Daily Tasks',
      icon: ClipboardList,
      iconColor: 'text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-900',
      heading: 'Unable to manage familiar tasks',
      body: 'Difficulty cooking a familiar recipe, managing finances, or following routines they have followed for decades.',
    },
    {
      domain: 'Apathy',
      icon: Moon,
      iconColor: 'text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-900',
      heading: 'Withdrawal and apathy',
      body: 'Loss of interest in hobbies, social withdrawal, sleeping more. Apathy affects 45% of early-onset dementia patients in India — often dismissed as depression.',
      sourceLabel: 'Chatterjee et al., 2024',
      sourceDoi: '10.1002/alz.088117',
      sourceUrl: 'https://doi.org/10.1002/alz.088117',
    },
    {
      domain: 'Judgment',
      icon: Scale,
      iconColor: 'text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-900',
      heading: 'Poor judgment or decisions',
      body: 'Giving money to strangers, neglecting personal hygiene, making decisions that are out of character.',
    },
    {
      domain: 'Time & Place',
      icon: Calendar,
      iconColor: 'text-cyan-500 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50 border-cyan-200 dark:border-cyan-900',
      heading: 'Confusion about time or dates',
      body: 'Not knowing what year it is, thinking a deceased parent is still alive, or believing they are in a different decade.',
    },
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-16">
      {/* OPENING */}
      <section className="bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-950/30 dark:via-emerald-950/10 dark:to-transparent rounded-3xl border border-emerald-200/80 dark:border-emerald-800/50 p-6 sm:p-10 shadow-xs">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-300 dark:border-emerald-800">
            <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600 dark:fill-emerald-400 dark:text-emerald-400" />
            <span>Family Caregiver Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            You just received difficult news.
            <br />
            <span className="text-emerald-700 dark:text-emerald-400">
              You do not have to figure this out alone.
            </span>
          </h1>

          <p className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
            This page walks you through what to watch for, when to seek help, and how to care — one step at a time.
          </p>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-2 border-t border-emerald-200/60 dark:border-emerald-900/60">
            Written for families and primary caregivers in India. Medical decisions must always be directed to a qualified neurologist.
          </p>
        </div>
      </section>

      {/* SUBSECTION 1A — Early warning signs */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Subsection 1A · Recognition
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            What to watch for — and when to act
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
            Dementia and Alzheimer&apos;s do not begin with sudden memory loss. The earliest signs are often behavioural — easy to dismiss as stress, aging, or personality changes.
          </p>
        </div>

        {/* 3 columns desktop, 1 column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {warningCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-5 flex flex-col justify-between space-y-3 hover:border-emerald-500/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border ${card.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {card.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {card.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {card.body}
                  </p>
                </div>

                {card.sourceLabel && (
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400">
                    Source:{' '}
                    <a
                      href={card.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium inline-flex items-center gap-0.5"
                    >
                      <span>{card.sourceLabel}</span>
                      <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Amber callout box */}
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-amber-900 dark:text-amber-200 font-bold text-sm sm:text-base">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>When to go to a doctor:</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-200/90 leading-relaxed pl-7">
            If 3 or more of these signs are present for more than 2 weeks and are new or worsening — this is the time to see a neurologist, not to wait and watch. Early diagnosis can slow progression. Every month of delay matters.
          </p>
        </div>
      </section>

      {/* SUBSECTION 1B — Choosing the right doctor */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Subsection 1B · Clinical Triage
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Not every neurologist treats dementia the same way
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
            A general neurologist can diagnose dementia. But for ongoing care, a cognitive and behavioural neurologist — a subspecialist — provides significantly better outcomes. When booking an appointment, ask specifically whether the neurologist has a subspecialty in cognitive or behavioural neurology, or runs a dedicated memory clinic.
          </p>
        </div>

        {/* Three-column comparison card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Initial Step
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              General Physician
            </h3>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p><strong className="text-slate-800 dark:text-slate-200">Role:</strong> First point of contact</p>
              <p><strong className="text-slate-800 dark:text-slate-200">Limitation:</strong> Cannot diagnose dementia — refers onwards</p>
              <p><strong className="text-slate-800 dark:text-slate-200">Action:</strong> Ask for a referral to a neurologist</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Secondary Step
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              General Neurologist
            </h3>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p><strong className="text-slate-800 dark:text-slate-200">Role:</strong> Can diagnose and prescribe</p>
              <p><strong className="text-slate-800 dark:text-slate-200">Limitation:</strong> May not specialise in dementia management</p>
              <p><strong className="text-slate-800 dark:text-slate-200">Action:</strong> Suitable for initial diagnosis</p>
            </div>
          </div>

          {/* Column 3 (Recommended) */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border-2 border-emerald-500/80 dark:border-emerald-600/80 space-y-3 relative shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Gold Standard
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                ✓ Recommended
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Cognitive / Behavioural Neurologist
            </h3>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p><strong className="text-slate-800 dark:text-slate-200">Role:</strong> Specialises in memory, behaviour, and cognition</p>
              <p><strong className="text-slate-800 dark:text-slate-200">Strength:</strong> Experienced in dementia-specific care pathways</p>
              <p><strong className="text-slate-800 dark:text-slate-200">Action:</strong> Find one via the memory clinic directory</p>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => handleNav('care-network')}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Find a memory clinic near you</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </section>

      {/* SUBSECTION 1C — What to bring to the first appointment */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Subsection 1C · Preparation
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Prepare before the appointment — it saves time
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {[
            'Written list of all symptoms and when they first appeared',
            'List of all current medications including supplements',
            'Recent blood test reports (B12, thyroid, fasting glucose)',
            "Note of any family history of dementia or Alzheimer's",
            'Video on a mobile phone of concerning behaviour if possible',
            'A family member or close friend to corroborate observations',
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/70"
            >
              <div className="w-5 h-5 rounded-md border-2 border-emerald-600 dark:border-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-snug">
                {item}
              </span>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The neurologist will likely conduct a cognitive assessment — tests like the Mini-Mental State Examination (MMSE) or Montreal Cognitive Assessment (MoCA) that take 20 to 30 minutes. These are not frightening — they are structured conversations and simple tasks.
        </div>
      </section>

      {/* SUBSECTION 1D — The caregiver mindset shift */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Subsection 1D · Compassion & Reality
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            The hardest part is not the tasks — it is the shift
          </h2>
        </div>

        {/* Flowing text, not cards — feels human */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-4 text-sm sm:text-base leading-relaxed">
          <p>
            When dementia enters a family, the relationship changes in a way no one is prepared for. A parent becomes someone who needs to be cared for like a child. A spouse becomes a patient. The person you knew is still there — but not always accessible.
          </p>

          <p>
            The most important shift a caregiver must make is this: stop arguing with the reality the person with dementia is experiencing. If your mother insists it is 1975 and her own mother is still alive, correcting her causes distress without benefit. Meeting her in her reality — &ldquo;Yes, let us go see her later&rdquo; — is not dishonesty. It is compassion.
          </p>

          <p>
            Do not take the anger personally. Irritability and suspicion are symptoms of the disease, not reflections of how they feel about you. The person accusing you of stealing is terrified and confused, not malicious.
          </p>

          <p>
            Patience is not a virtue caregivers are born with. It is built, slowly, through understanding what the disease does to a brain. This page is a start.
          </p>
        </div>

        {/* Prominent quote */}
        <div className="my-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent dark:from-emerald-950/40 dark:via-teal-950/20 border-l-4 border-emerald-500 text-center sm:text-left">
          <p className="text-lg sm:text-xl font-serif italic font-semibold text-slate-900 dark:text-white leading-relaxed">
            &ldquo;Dementia is not the person forgetting you. It is the disease. The person is still there.&rdquo;
          </p>
        </div>
      </section>

      {/* SUBSECTION 1E — Making the home safer */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Subsection 1E · Home Environment
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Practical changes that make a real difference
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Remove or Secure */}
          <div className="bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200/80 dark:border-rose-900/60 p-5 space-y-3">
            <div className="flex items-center space-x-2 text-rose-800 dark:text-rose-300 font-bold text-sm">
              <Lock className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>Remove or secure:</span>
            </div>
            <div className="space-y-2.5">
              {[
                'Loose rugs and mats (fall risk)',
                'All medicines — locked cabinet or box',
                'Cleaning products, pesticides',
                'Sharp tools and knives when unattended',
                'Gas stove access if person is alone',
                'Car keys if driving is no longer safe',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Add or Install */}
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 p-5 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
              <PlusCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Add or install:</span>
            </div>
            <div className="space-y-2.5">
              {[
                'Grab bars in bathroom and near toilet',
                'Night lights in corridor, bathroom, bedroom',
                'ID card in pocket at all times (name, address, phone)',
                'Simple door alarm if wandering is a risk',
                'Labels on drawers and rooms if helpful',
                'Remove locks from bedroom and bathroom doors',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUBSECTION 1F — Keeping the person active and engaged */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Subsection 1F · Stage-Wise Activity
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Activity is medicine — but it must be appropriate
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
            Research consistently shows that mental and physical activity slow cognitive decline. But the activity must match where the person currently is — not where they were before diagnosis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Early Stage */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
                Early Stage
              </span>
            </div>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p><strong className="text-slate-800 dark:text-slate-200">Physical:</strong> Daily 30-minute walk, yoga, light swimming</p>
              <p><strong className="text-slate-800 dark:text-slate-200">Mental:</strong> Familiar card games, reading, music they love, cooking simple familiar dishes with supervision</p>
              <p><strong className="text-slate-800 dark:text-slate-200">Social:</strong> Continue existing social connections with support</p>
            </div>
          </div>

          {/* Middle Stage */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
                Middle Stage
              </span>
            </div>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p><strong className="text-slate-800 dark:text-slate-200">Physical:</strong> Gentle walks, chair exercises, light stretching</p>
              <p><strong className="text-slate-800 dark:text-slate-200">Mental:</strong> Sorting familiar objects, folding clothes, looking at old photographs, simple puzzles</p>
              <p><strong className="text-slate-800 dark:text-slate-200">Social:</strong> Caregiver support group attendance with patient, familiar visitors in small numbers</p>
            </div>
          </div>

          {/* Late Stage */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                Late Stage
              </span>
            </div>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p><strong className="text-slate-800 dark:text-slate-200">Physical:</strong> Gentle hand massage, range-of-motion movements</p>
              <p><strong className="text-slate-800 dark:text-slate-200">Mental:</strong> Music, especially songs from youth, simple sensory activities, touch and presence</p>
              <p><strong className="text-slate-800 dark:text-slate-200">Social:</strong> One-on-one presence is the activity</p>
            </div>
          </div>
        </div>

        <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400">
          Source:{' '}
          <a
            href="https://doi.org/10.3389/frdem.2026.1843904"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium inline-flex items-center gap-0.5"
          >
            <span>Frontiers in Dementia, 2026 — Physical activity and exercise in dementia: clinical relevance and emerging insights. DOI: 10.3389/frdem.2026.1843904</span>
            <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
          </a>
        </div>
      </section>

      {/* SUBSECTION 1G — Supporting each other: caregiver community */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Subsection 1G · Caregiver Community
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            You cannot do this alone — and you should not
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
            Caregiver burnout in India is a silent crisis. 72% of dementia caregivers are women. The average daily care time is 6.2 hours — rising to 9.5 hours in advanced stages. Fewer than 10% of families have access to respite care.
          </p>
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mt-2">
            Joining a caregiver support group is not a luxury. It is one of the most effective interventions for caregiver mental health that exists.
          </p>
        </div>

        {/* Three resource cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                ARDSI Chapters
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Local chapters across India · In-person caregiver training and support groups
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <a
                href="tel:+919846198471"
                className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+91 98461 98471</span>
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Dementia Care Notes
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Online community · City-wise guides · Caregiver forum
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <a
                href="https://dementiacarenotes.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>dementiacarenotes.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Dementia India Alliance
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Free specialist referrals · 6 Indian languages
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <a
                href="tel:8585990850"
                className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>8585990850</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-1">
          <button
            type="button"
            onClick={() => handleNav('care-network')}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>Find support groups near you</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        {/* Caregiver burnout callout (amber) */}
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-amber-900 dark:text-amber-200 font-bold text-sm sm:text-base">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Signs you need support:</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-200/90 leading-relaxed pl-7">
            Constant exhaustion even after sleep. Resentment or guilt. Withdrawing from your own relationships. Physical symptoms — headaches, illness. These are not weakness. They are signals. Call iCall (
            <a href="tel:9152987821" className="font-mono font-bold hover:underline">9152987821</a>
            ) or Vandrevala Foundation (
            <a href="tel:9999666555" className="font-mono font-bold hover:underline">9999 666 555</a>
            ).
          </p>
        </div>
      </section>

      {/* Clinical Disclaimer */}
      <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400 italic max-w-2xl mx-auto leading-relaxed">
          This page was prepared for family caregivers. It is not medical advice. For clinical diagnosis, care planning, and medical decisions, always consult a qualified neurologist or geriatrician.
        </p>
      </div>
    </div>
  );
};

export default FamilyGuide;
