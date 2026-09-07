/**
 * @file Navbar.tsx
 * @description Primary application navigation header.
 * Provides tab switching (India Overview, Specialist Deserts, Health Spending, Care Network, About),
 * theme toggling (dark/light), and GitHub repository navigation.
 */

import React from 'react';
import { useFilters } from '../context/FilterContext';
import { Moon, Sun, Github, Activity } from 'lucide-react';

interface NavbarProps {
  activeTab: 'india' | 'family-guide' | 'specialist' | 'health-spending' | 'care-network' | 'about' | 'global';
  setActiveTab: (tab: 'india' | 'family-guide' | 'specialist' | 'health-spending' | 'care-network' | 'about' | 'global') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { isDarkMode, toggleDarkMode } = useFilters();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
        {/* Brand */}
        <div
          className="flex items-center space-x-2.5 cursor-pointer shrink-0"
          onClick={() => setActiveTab('india')}
          title="Open Epidemiological & Health Systems Intelligence"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 shrink-0">
            <Activity className="w-4.5 h-4.5 animate-pulse" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
              Dementia India
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 whitespace-nowrap">
              Data Platform
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-1.5 shrink-0 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveTab('india')}
            className={`px-2.5 py-1 rounded-lg text-xs lg:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'india'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            India Overview
          </button>
          <button
            onClick={() => setActiveTab('family-guide')}
            className={`px-2.5 py-1 rounded-lg text-xs lg:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'family-guide'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Family Guide
          </button>
          <button
            onClick={() => setActiveTab('specialist')}
            className={`px-2.5 py-1 rounded-lg text-xs lg:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'specialist'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Specialist Deserts
          </button>
          <button
            onClick={() => setActiveTab('health-spending')}
            className={`px-2.5 py-1 rounded-lg text-xs lg:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'health-spending'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Health Spending
          </button>
          <button
            onClick={() => setActiveTab('care-network')}
            className={`px-2.5 py-1 rounded-lg text-xs lg:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'care-network'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Care Network
          </button>
          <button
            onClick={() => setActiveTab('global')}
            className={`flex items-center px-2.5 py-1 rounded-lg text-xs lg:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'global'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>Global View</span>
            <span className="ml-1.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
              Live
            </span>
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-2.5 py-1 rounded-lg text-xs lg:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'about'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            About & Methodology
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
          <a
            href="https://github.com/cyrilsebastian/dementia-india"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="GitHub Repository"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};
