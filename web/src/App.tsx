import React, { useState } from 'react';
import { FilterProvider } from './context/FilterContext';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { IndiaPage } from './pages/IndiaPage';
import { SpecialistPage } from './pages/SpecialistPage';
import { HealthSpending } from './pages/HealthSpending';
import { CareNetwork } from './pages/CareNetwork';
import { GlobalView } from './pages/GlobalView';
import { AboutPage } from './pages/AboutPage';
import { FamilyGuide } from './pages/FamilyGuide';
import { ReachOut, NavTabType } from './pages/ReachOut';

export const AppContent: React.FC = () => {
  const getInitialTab = (): NavTabType => {
    const path = window.location.pathname.replace(/^\/+/, '');
    const hash = window.location.hash.replace(/^#\/?/, '');
    const target = hash || path;
    if (target === 'family-guide') return 'family-guide';
    if (target === 'specialist') return 'specialist';
    if (target === 'health-spending') return 'health-spending';
    if (target === 'care-network') return 'care-network';
    if (target === 'global') return 'global';
    if (target === 'reach-out') return 'reach-out';
    if (target === 'about') return 'about';
    return 'india';
  };

  const [activeTab, setActiveTab] = useState<NavTabType>(getInitialTab);

  React.useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getInitialTab());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const handleTabChange = (tab: NavTabType) => {
    setActiveTab(tab);
    if (tab === 'family-guide') {
      window.history.pushState(null, '', '/family-guide');
    } else if (tab === 'reach-out') {
      window.history.pushState(null, '', '/reach-out');
    } else if (tab === 'care-network') {
      window.history.pushState(null, '', '/care-network');
    } else if (tab === 'about') {
      window.history.pushState(null, '', '/about');
    } else if (tab === 'india') {
      window.history.pushState(null, '', '/');
    } else {
      window.history.pushState(null, '', `/#${tab}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />
      {activeTab === 'india' && <FilterBar />}

      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6">
        {activeTab === 'india' && <IndiaPage />}
        {activeTab === 'family-guide' && <FamilyGuide onNavigate={handleTabChange} />}
        {activeTab === 'specialist' && <SpecialistPage />}
        {activeTab === 'health-spending' && <HealthSpending />}
        {activeTab === 'care-network' && <CareNetwork />}
        {activeTab === 'global' && <GlobalView />}
        {activeTab === 'reach-out' && <ReachOut onNavigate={handleTabChange} />}
        {activeTab === 'about' && <AboutPage />}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span>Project Dementia India, Open Health Data Platform</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
            <button
              type="button"
              onClick={() => {
                handleTabChange('about');
                setTimeout(() => {
                  document.getElementById('disclaimer')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:underline transition-colors cursor-pointer"
            >
              Disclaimer
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a href="https://github.com/cyrilsebastian/dementia-india" target="_blank" rel="noreferrer" className="hover:underline">
              GitHub Repository
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a href="https://cyrilsebastian.com" target="_blank" rel="noreferrer" className="hover:underline">
              cyrilsebastian.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <FilterProvider>
      <AppContent />
    </FilterProvider>
  );
};

export default App;
