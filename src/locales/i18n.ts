import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import en from './en.json';
import ru from './ru.json';
import hy from './hy.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    hy: {
      translation: hy,
    },
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
  lng: 'hy',
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
