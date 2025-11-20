import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ruCommon from './locales/ru/common.json';
import enCommon from './locales/en/common.json';
import ukCommon from './locales/uk/common.json';

export type SupportedLang = 'ru' | 'en' | 'uk';

const resources = {
  ru: {
    common: ruCommon,
  },
  en: {
    common: enCommon,
  },
  uk: {
    common: ukCommon,
  },
};

export const detectLanguageFromTelegram = (languageCode?: string): SupportedLang => {
  if (!languageCode) return 'ru';

  const code = languageCode.toLowerCase();

  if (code.startsWith('uk')) return 'uk';
  if (code.startsWith('en')) return 'en';
  if (code.startsWith('ru')) return 'ru';

  return 'ru';
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  supportedLngs: ['ru', 'en', 'uk'],
  defaultNS: 'common',
  ns: ['common'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

