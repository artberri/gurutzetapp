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
			/* empty */
		},
		(dsn: string) => {
			init({
				debug: option(() => "none")(getEnv("NODE_ENV")) === "development",
				dsn,
				initialScope: {
					tags: { app: "gurutzetapp" },
				},
				integrations: [browserTracingIntegration()],
				release: option(() => "none")(getEnv("VITE_APP_SENTRY_RELEASE")),
				tracesSampleRate: 1,
			});
		},
	)(getEnv("VITE_SENTRY_DSN"));
