import "reflect-metadata";
import "@fontsource/ubuntu/latin-400.css";
import "@fontsource/ubuntu/latin-500.css";
import "@fontsource/ubuntu/latin-700.css";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "@sentry/react";
import { attemptP } from "fluture";
import * as serviceWorkerRegistration from "./ServiceWorkerRegistration";
import { container as diContainer } from "./config/DependencyInjection";
import { configTracing } from "./config/Tracing";
import { configI18n } from "./config/I18n";
import { App } from "./App";
import "./index.css";
import { reportWebVitals } from "./ReportWebVitals";
import { ServiceGetter, ServiceGetterProvider } from "./utils/ServiceUtils";
import { FatalError } from "./components/FatalError";
import { OnlineStatusProvider } from "./utils/OnlineStatusUtils";

configTracing();
const i18nReady = configI18n().then(() => {});

// eslint-disable-next-line react/jsx-no-constructed-context-values
const serviceGetter: ServiceGetter = (service) => diContainer.get(service);
const container = document.querySelector("#root") as Element;
const root = createRoot(container);

// React.StrictMode
root.render(
  <ErrorBoundary fallback={<FatalError />} showDialog>
    <OnlineStatusProvider online={navigator.onLine ?? true}>
      <ServiceGetterProvider serviceGetter={serviceGetter}>
        <App getReady={attemptP<Error, void>(() => i18nReady)} />
      </ServiceGetterProvider>
    </OnlineStatusProvider>
  </ErrorBoundary>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener("statechange", (event) => {
        if ((event.target as ServiceWorker)?.state === "activated") {
          window.location.reload();
        }
      });
      waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
    }
  },
});
