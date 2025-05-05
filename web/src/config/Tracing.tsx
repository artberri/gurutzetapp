import { browserTracingIntegration } from "@sentry/browser";
import { init } from "@sentry/react";
import type { ReactNode } from "react";
import { fold, option } from "../cross-cutting/Either";
import { getEnv } from "../infrastructure/GetEnv";

export interface BoundaryProperties {
	children: ReactNode;
}

export const configTracing = () =>
	fold(
		() => {
			console.log("Sentry is not configured");
		},
		(dsn: string) => {
			init({
				dsn,
				integrations: [browserTracingIntegration()],
				tracesSampleRate: 1,
				debug: option(() => "none")(getEnv("NODE_ENV")) === "development",
				release: option(() => "none")(getEnv("REACT_APP_SENTRY_RELEASE")),
				initialScope: {
					tags: { app: "gurutzetapp" },
				},
			});
		},
	)(getEnv("REACT_APP_SENTRY_DSN"));
