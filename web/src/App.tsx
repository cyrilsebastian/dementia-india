import React, { useState } from 'react';
import { FilterProvider } from './context/FilterContext';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { IndiaPage } from './pages/IndiaPage';
import { SpecialistPage } from './pages/SpecialistPage';
import { AboutPage } from './pages/AboutPage';

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'india' | 'specialist' | 'about'>('india');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'india' && <FilterBar />}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'india' && <IndiaPage />}
        {activeTab === 'specialist' && <SpecialistPage />}
        {activeTab === 'about' && <AboutPage />}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span>Project Dementia India — Open Health Data Platform</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://github.com/cyrilsebastian/dementia-india" target="_blank" rel="noreferrer" className="hover:underline">
              GitHub Repository
            </a>
            <span>•</span>
            <a href="https://tech.cyrilsebastian.com" target="_blank" rel="noreferrer" className="hover:underline">
              tech.cyrilsebastian.com
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
