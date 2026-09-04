import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FilterState {
  sex: 'Both' | 'Male' | 'Female';
  urban: 'All' | 'Urban' | 'Rural';
  ageGroup: '60+' | '60-64' | '65-69' | '70-74' | '75-79' | '80-84' | '85+';
  education: 'All' | 'None' | 'Primary' | 'Middle' | 'Secondary' | 'Higher';
  selectedState: string | null;
  setSex: (sex: 'Both' | 'Male' | 'Female') => void;
  setUrban: (urban: 'All' | 'Urban' | 'Rural') => void;
  setAgeGroup: (age: '60+' | '60-64' | '65-69' | '70-74' | '75-79' | '80-84' | '85+') => void;
  setEducation: (edu: 'All' | 'None' | 'Primary' | 'Middle' | 'Secondary' | 'Higher') => void;
  setSelectedState: (stateCode: string | null) => void;
  resetFilters: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const FilterContext = createContext<FilterState | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sex, setSex] = useState<'Both' | 'Male' | 'Female'>('Both');
  const [urban, setUrban] = useState<'All' | 'Urban' | 'Rural'>('All');
  const [ageGroup, setAgeGroup] = useState<'60+' | '60-64' | '65-69' | '70-74' | '75-79' | '80-84' | '85+'>('60+');
  const [education, setEducation] = useState<'All' | 'None' | 'Primary' | 'Middle' | 'Secondary' | 'Higher'>('All');
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const resetFilters = () => {
    setSex('Both');
    setUrban('All');
    setAgeGroup('60+');
    setEducation('All');
    setSelectedState(null);
  };

  return (
    <FilterContext.Provider
      value={{
        sex,
        urban,
        ageGroup,
        education,
        selectedState,
        setSex,
        setUrban,
        setAgeGroup,
        setEducation,
        setSelectedState,
        resetFilters,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = (): FilterState => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
