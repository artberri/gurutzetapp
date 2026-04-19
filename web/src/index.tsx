import "@fontsource/ubuntu/latin-400.css";
import "@fontsource/ubuntu/latin-500.css";
import "@fontsource/ubuntu/latin-700.css";
import { ErrorBoundary } from "@sentry/react";
import { attemptP } from "fluture";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "reflect-metadata";
import { App } from "./App";
import { FatalError } from "./components/FatalError";
import { container as diContainer } from "./config/DependencyInjection";
import { configI18n } from "./config/I18n";
import { configTracing } from "./config/Tracing";
import "./index.css";
import { reportWebVitals } from "./ReportWebVitals";
import type { ServiceGetter } from "./utils/ServiceUtils";

configTracing();
// oxlint-disable-next-line unicorn/prefer-top-level-await
const i18nReady = configI18n().then(() => {
	/* empty */
});

const serviceGetter: ServiceGetter = (service) => diContainer.get(service);
// oxlint-disable-next-line typescript/no-non-null-assertion
const container = document.querySelector("#root")!;
const root = createRoot(container);

root.render(
	<StrictMode>
		<ErrorBoundary fallback={<FatalError />} showDialog>
			<App
				// oxlint-disable-next-line typescript/no-invalid-void-type
				getReady={attemptP<Error, void>(() => i18nReady)}
				serviceGetter={serviceGetter}
			/>
		</ErrorBoundary>
	</StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// To log results (for example: reportWebVitals(console.log))
// Or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
