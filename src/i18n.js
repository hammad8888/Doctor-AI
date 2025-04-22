
// Updated i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locals/en/translation.json';
import skTranslations from './locals/sk/translation.json';

const resources = {
  en: { translation: enTranslations },
  sk: { translation: skTranslations }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;