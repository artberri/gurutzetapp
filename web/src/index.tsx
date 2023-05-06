import "reflect-metadata"

import "@fontsource/ubuntu/latin-400.css"
import "@fontsource/ubuntu/latin-500.css"
import "@fontsource/ubuntu/latin-700.css"
import { ErrorBoundary } from "@sentry/react"
import { attemptP } from "fluture"
import { createRoot } from "react-dom/client"
import { reportWebVitals } from "./ReportWebVitals"
import * as serviceWorkerRegistration from "./ServiceWorkerRegistration"
import { FatalError } from "./components/FatalError"
import { container as diContainer } from "./config/DependencyInjection"
import { configI18n } from "./config/I18n"
import { configTracing } from "./config/Tracing"
import "./index.css"
import { ServiceGetter } from "./utils/ServiceUtils"

import { App } from "./App"

configTracing()
const i18nReady = configI18n().then(() => {})

// eslint-disable-next-line react/jsx-no-constructed-context-values
const serviceGetter: ServiceGetter = (service) => diContainer.get(service)
const container = document.querySelector("#root") as Element
const root = createRoot(container)

// React.StrictMode
root.render(
	<ErrorBoundary fallback={<FatalError />} showDialog>
		<App
			getReady={attemptP<Error, void>(() => i18nReady)}
			serviceGetter={serviceGetter}
		/>
	</ErrorBoundary>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

serviceWorkerRegistration.register({
	onUpdate: (registration) => {
		const waitingServiceWorker = registration.waiting

		if (waitingServiceWorker) {
			waitingServiceWorker.addEventListener("statechange", (event) => {
				if ((event.target as ServiceWorker)?.state === "activated") {
					window.location.reload()
				}
			})
			waitingServiceWorker.postMessage({ type: "SKIP_WAITING" })
		}
	},
})
