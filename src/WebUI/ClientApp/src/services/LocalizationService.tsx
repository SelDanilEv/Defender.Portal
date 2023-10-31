import i18next from "i18next";
import translate from "translate";

const LocalizationService = {
  Languages: [
    { key: "en", value: "EN" },
    { key: "ru", value: "RU" },
  ],
  UpdateLanguage: (languageCode) => {
    i18next.changeLanguage(languageCode);
  },
  GetCurrentLanguage: () => {
    return i18next.language;
  },
  ToLanguage: async (message, language, setMessage) => {
    setMessage(await translate(message, language));
  },
};

export default LocalizationService;
