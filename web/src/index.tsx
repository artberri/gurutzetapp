import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { createRoot } from "react-dom/client";
import { initReactI18next } from "react-i18next";
import { App } from "./App";
import "./index.css";
import es from "./locales/es.json";
import eu from "./locales/eu.json";
import { reportWebVitals } from "./ReportWebVitals";
import * as serviceWorkerRegistration from "./ServiceWorkerRegistration";
import { OnlineStatusProvider } from "./utils/OnlineStatus";

void i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    supportedLngs: ["es", "eu"],
    nonExplicitSupportedLngs: true,
    resources: {
      es: {
        translation: es,
      },
      eu: {
        translation: eu,
      },
    },
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });

const container = document.querySelector("#root") as Element;
const root = createRoot(container);

// React.StrictMode
root.render(
  <OnlineStatusProvider>
    <App />
  </OnlineStatusProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
