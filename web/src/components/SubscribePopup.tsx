/**
 * @file SubscribePopup.tsx
 * @description Non-intrusive, time-triggered subscription popup.
 * Triggers after 7 minutes of engagement unless already subscribed or dismissed.
 */

import React, { useState, useEffect } from 'react';
import { Mail, X, CheckCircle2, Loader2 } from 'lucide-react';

interface SubscribePopupProps {
  /**
   * Optional custom delay in milliseconds. Defaults to 7 minutes (420,000ms).
   * In development/testing, can be set to 10,000ms.
   */
  delayMs?: number;
}

export const SubscribePopup: React.FC<SubscribePopupProps> = ({ delayMs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user has already subscribed permanently
    const alreadySubscribed = localStorage.getItem('dementia_subscribed') === 'true';
    if (alreadySubscribed) return;

    // Check if user dismissed popup in this session
    const sessionDismissed = sessionStorage.getItem('popup_dismissed') === 'true';
    if (sessionDismissed) return;

    // Check for quick test query param or use prop/default
    const hasTestParam = typeof window !== 'undefined' && window.location.search.includes('test_popup');
    const timerDelay = delayMs ?? (hasTestParam ? 10000 : 7 * 60 * 1000); // 7 minutes default

    const timer = setTimeout(() => {
      // Re-check before displaying
      const checkSub = localStorage.getItem('dementia_subscribed') === 'true';
      const checkDismiss = sessionStorage.getItem('popup_dismissed') === 'true';
      if (!checkSub && !checkDismiss) {
        setIsOpen(true);
      }
    }, timerDelay);

    return () => clearTimeout(timer);
  }, [delayMs]);

  const handleDismiss = () => {
    sessionStorage.setItem('popup_dismissed', 'true');
    setIsOpen(false);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    // Simulate brief submission delay (or optionally connect to Web3Forms/Brevo endpoint if configured)
    setTimeout(() => {
      localStorage.setItem('dementia_subscribed', 'true');
      setLoading(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscribe-heading"
    >
      {/* Click outside to dismiss */}
      <div
        className="fixed inset-0"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Modal Container: Full-width slide-up on mobile, center-aligned max-480px on desktop */}
      <div className="relative z-10 w-full sm:max-w-[480px] bg-white dark:bg-slate-900 border-t sm:border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Thank you for subscribing
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              You will receive our monthly dispatch of new data, research, and caregiver resources.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-1.5 pr-6">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-300 dark:border-emerald-800">
                <Mail className="w-3 h-3" />
                <span>Monthly Dispatch</span>
              </div>
              <h2
                id="subscribe-heading"
                className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight"
              >
                Stay informed
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                We send one monthly update — new data, research findings, and resources for caregivers. No spam. Unsubscribe any time.
              </p>
            </div>

            {/* Subscription Form */}
            <form onSubmit={handleSubscribe} className="space-y-3 pt-2">
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Subscribe</span>
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:underline cursor-pointer"
                >
                  No thank you
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscribePopup;
