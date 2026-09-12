/**
 * @file Navbar.tsx
 * @description Primary application navigation header.
 * Provides tab switching (India Overview, Family Guide, Specialist Deserts, Health Spending, Care Network, Global View, Reach Out, About),
 * responsive mobile navigation drawer, theme toggling (dark/light), and GitHub repository navigation.
 */

import React, { useState, useEffect } from 'react';
import { useFilters } from '../context/FilterContext';
import {
  Moon,
  Sun,
  Github,
  Activity,
  Menu,
  X,
  Compass,
  Stethoscope,
  IndianRupee,
  Building2,
  Globe,
  MessageSquareHeart,
  BookOpen,
  PhoneCall,
  ExternalLink,
} from 'lucide-react';

export type NavTabId =
  | 'india'
  | 'family-guide'
  | 'specialist'
  | 'health-spending'
  | 'care-network'
  | 'about'
  | 'global'
  | 'reach-out';

interface NavbarProps {
  activeTab: NavTabId;
  setActiveTab: (tab: NavTabId) => void;
}

interface NavItem {
  id: NavTabId;
  label: string;
  shortLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  description?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'india',
    label: 'India Overview',
    icon: Activity,
    description: 'Epidemiological prevalence & demographic breakdown',
  },
  {
    id: 'family-guide',
    label: 'Family Guide',
    icon: Compass,
    description: 'Compassionate roadmap & FAQs for caregivers',
  },
  {
    id: 'specialist',
    label: 'Specialist Deserts',
    icon: Stethoscope,
    description: 'Neurologist deficits & state clinical ratios',
  },
  {
    id: 'health-spending',
    label: 'Health Spending',
    icon: IndianRupee,
    description: 'Union budget outlays & mental health allocations',
  },
  {
    id: 'care-network',
    label: 'Care Network',
    icon: Building2,
    description: 'Memory clinics, ARDSI chapters & verified helplines',
  },
  {
    id: 'global',
    label: 'Global View',
    icon: Globe,
    badge: 'Live',
    description: 'Cross-national benchmarks & 2050 forecasts',
  },
  {
    id: 'reach-out',
    label: 'Reach Out',
    icon: MessageSquareHeart,
    description: 'Contact & inquiry routing for families & researchers',
  },
  {
    id: 'about',
    label: 'About & Methodology',
    icon: BookOpen,
    description: 'Data sources, ethics, citations & disclaimer',
  },
];

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { isDarkMode, toggleDarkMode } = useFilters();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectTab = (tab: NavTabId) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-2">
          {/* Brand Logo & Name */}
          <div
            className="flex items-center space-x-2 sm:space-x-2.5 cursor-pointer shrink-0"
            onClick={() => handleSelectTab('india')}
            title="Open Epidemiological & Health Systems Intelligence"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 shrink-0">
              <Activity className="w-4.5 h-4.5 animate-pulse" />
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
                Dementia India
              </span>
              <span className="hidden xs:inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 whitespace-nowrap">
                Platform
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs (visible on lg and wider screens) */}
          <nav className="hidden lg:flex items-center space-x-1 shrink-0 overflow-x-auto no-scrollbar py-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center px-2.5 py-1 rounded-lg text-xs xl:text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Controls & Mobile Hamburger Toggle */}
          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />}
            </button>

            <a
              href="https://github.com/cyrilsebastian/dementia-india"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="GitHub Repository"
              aria-label="GitHub Repository"
            >
              <Github className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </a>

            {/* Mobile Menu Toggle Button (lg:hidden) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5 text-slate-900 dark:text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-down Navigation Modal (Outside header to prevent backdrop-filter stacking trapping) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden flex flex-col justify-start">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative z-[101] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col rounded-b-3xl animate-fadeIn">
            {/* Header within Drawer */}
            <div className="h-14 px-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 shrink-0">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => handleSelectTab('india')}
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-xs">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  Dementia India
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={toggleDarkMode}
                  aria-label="Toggle dark mode"
                  className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5" />}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5 text-slate-900 dark:text-white" />
                </button>
              </div>
            </div>

            {/* Navigation Tab Links */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Navigation Directory
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  8 Sections
                </span>
              </div>

              <div className="grid grid-cols-1 gap-1.5">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-semibold shadow-xs'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg shrink-0 ${
                            isActive
                              ? 'bg-emerald-500 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold truncate">{item.label}</span>
                            {item.badge && (
                              <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick Emergency & External Shortcuts */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <a
                  href="tel:14416"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm font-medium text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <PhoneCall className="w-4 h-4 animate-bounce" />
                    <span>24×7 Tele-MANAS Mental Health Helpline</span>
                  </div>
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-white/20">
                    14416
                  </span>
                </a>

                <div className="flex items-center justify-between pt-1 px-1 text-xs text-slate-500 dark:text-slate-400">
                  <a
                    href="https://github.com/cyrilsebastian/dementia-india"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub Repository</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                  </a>

                  <span className="text-[10px]">Project Dementia India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

