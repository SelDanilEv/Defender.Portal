import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import store from "src/state/store";

import en from "src/localization/en/en.json";
import en_error from "src/localization/en/error.json";
import en_lottery from "src/localization/en/lottery.json";
import en_sidebar_menu from "src/localization/en/sidebar_menu.json";
import en_welcome from "src/localization/en/welcome.json";
import en_budgetTracker from "src/localization/en/budgetTracker.json";

import ru from "src/localization/ru/ru.json";
import ru_error from "src/localization/ru/error.json";
import ru_lottery from "src/localization/ru/lottery.json";
import ru_sidebar_menu from "src/localization/ru/sidebar_menu.json";
import ru_welcome from "src/localization/ru/welcome.json";
import ru_budgetTracker from "src/localization/ru/budgetTracker.json";

const resources: any = {
  en: {
    translation: en,
    error: en_error,
    lottery: en_lottery,
    sidebar_menu: en_sidebar_menu,
    welcome: en_welcome,
    budgetTracker: en_budgetTracker,
  },
  ru: {
    translation: ru,
    error: ru_error,
    lottery: ru_lottery,
    sidebar_menu: ru_sidebar_menu,
    welcome: ru_welcome,
    budgetTracker: ru_budgetTracker,
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
