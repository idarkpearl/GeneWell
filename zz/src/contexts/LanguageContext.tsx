
import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

import en from '../locales/en.json';
import hi from '../locales/hi.json';
import pa from '../locales/pa.json';
import bn from '../locales/bn.json';
import ta from '../locales/ta.json';
import ml from '../locales/ml.json';

const translations: { [key: string]: { [key: string]: string } } = {
  EN: en,
  HI: hi,
  PA: pa,
  BN: bn,
  TA: ta,
  ML: ml,
};

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, replacements?: { [key: string]: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('EN');

  const t = (key: string, replacements: { [key: string]: string } = {}) => {
    let translation = translations[language]?.[key] || translations['EN']?.[key] || key;
    
    Object.keys(replacements).forEach(placeholder => {
        const regex = new RegExp(`{${placeholder}}`, 'g');
        translation = translation.replace(regex, replacements[placeholder]);
    });

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
