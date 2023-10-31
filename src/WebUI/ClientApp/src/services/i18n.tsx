import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import store from "src/state/store";

import en from "src/localization/en";
import ru from "src/localization/ru";

const resources: any = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

i18next.use(initReactI18next).init({
  resources: resources,
  lng: store.getState().session.language,
  supportedLngs: ["en", "ru"],
  interpolation: {
    escapeValue: false,
  },
  debug: false,
  // dissable debug for production
});

export default i18next;
