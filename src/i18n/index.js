import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { LOCALS } from "./constants";

import translationEN from "../../public/locales/en/translation.json";
import translationDE from "../../public/locales/de/translation.json";
import translationUK from "../../public/locales/uk/translation.json";

const resources = {
  [LOCALS.EN]: {
    translation: translationEN,
  },
  [LOCALS.DE]: {
    translation: translationDE,
  },
  [LOCALS.UK]: {
    translation: translationUK,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
