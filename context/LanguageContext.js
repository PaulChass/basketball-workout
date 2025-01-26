import React, { createContext, useState, useContext } from 'react';
import i18n from '@/i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      setLanguage(lng);
    }).catch((error) => {
      console.error('Failed to change language:', error);
    });
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);