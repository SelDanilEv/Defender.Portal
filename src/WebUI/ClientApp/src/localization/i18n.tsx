import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import store from "src/state/store";

import en from "src/localization/en/en.json";
import en_lottery from "src/localization/en/lottery.json";
import en_sidebar_menu from "src/localization/en/sidebar_menu.json";

import ru from "src/localization/ru/ru.json";
import ru_lottery from "src/localization/ru/lottery.json";
import ru_sidebar_menu from "src/localization/ru/sidebar_menu.json";

const resources: any = {
  en: {
    // it's possible to split the translation files here
    translation: en,
    lottery: en_lottery,
    sidebar_menu: en_sidebar_menu,
  },
  ru: {
    translation: ru,
    lottery: ru_lottery,
    sidebar_menu: ru_sidebar_menu,
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
