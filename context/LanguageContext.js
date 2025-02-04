import React, { createContext, useState, useContext, useEffect } from 'react';
import i18n from '@/i18n';
import * as Localization from 'expo-localization';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language);

  // Set device language as default language
  useEffect(() => {
    const deviceLanguage = Localization.locale.split('-')[0];
    i18n.changeLanguage(deviceLanguage).then(() => {
      setLanguage(deviceLanguage);
    }).catch((error) => {
      console.error('Failed to set device language:', error);
    });
  }, []);

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