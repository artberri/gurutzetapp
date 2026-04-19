import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import es from "../locales/es.json";
import eu from "../locales/eu.json";

export const configI18n = () =>
	i18n
		.use(initReactI18next)
		.use(LanguageDetector)
		.init({
			fallbackLng: "eu",
			interpolation: {
				escapeValue: false,
			},
			nonExplicitSupportedLngs: true,
			resources: {
				es: {
					translation: es,
				},
				eu: {
					translation: eu,
				},
			},
			supportedLngs: ["eu", "es"],
		});
