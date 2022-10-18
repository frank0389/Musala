import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
    .use(HttpBackend)
    .use(detector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: false,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        backend: {
            // for all available options read the backend's repository readme file
            loadPath: '/app/locales/{{lng}}/{{ns}}.json'
          }

    });
export default i18n;