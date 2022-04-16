import "reflect-metadata";
import "@fontsource/ubuntu/latin-400.css";
import "@fontsource/ubuntu/latin-500.css";
import "@fontsource/ubuntu/latin-700.css";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "@sentry/react";
import { container as diContainer } from "./config/DependencyInjection";
import { configTracing } from "./config/Tracing";
import { configI18n } from "./config/I18n";
import { App } from "./App";
import "./index.css";
import { reportWebVitals } from "./ReportWebVitals";
import * as serviceWorkerRegistration from "./ServiceWorkerRegistration";
import { OnlineStatusProvider } from "./utils/OnlineStatus";
import { ServiceGetter, ServiceGetterContext } from "./utils/Services";
import { FatalError } from "./components/FatalError";

configTracing();
configI18n();

// eslint-disable-next-line react/jsx-no-constructed-context-values
const serviceGetter: ServiceGetter = (service) => diContainer.get(service);
const container = document.querySelector("#root") as Element;
const root = createRoot(container);

// React.StrictMode
root.render(
  <ErrorBoundary fallback={<FatalError />} showDialog>
    <ServiceGetterContext.Provider value={serviceGetter}>
      <OnlineStatusProvider>
        <App />
      </OnlineStatusProvider>
    </ServiceGetterContext.Provider>
  </ErrorBoundary>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
