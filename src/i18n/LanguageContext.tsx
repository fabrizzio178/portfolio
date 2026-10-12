import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import en from './locales/en.json';
import es from './locales/es.json';
import { LanguageContext } from './context';
import type { Language, Translations } from './context';

const translations: Record<Language, Translations> = { en, es };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-lang');
      if (saved === 'en' || saved === 'es') return saved;
    }
    return 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio-lang', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}
