import { createContext } from 'react';
import type es from './locales/es.json';

export type Language = 'es' | 'en';
export type Translations = typeof es;

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);
