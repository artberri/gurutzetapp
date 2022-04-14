import { init } from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { ReactNode } from "react";
import { fold, option } from "../cross-cutting/Either";
import { getEnv } from "../infrastructure/GetEnv";

export interface BoundaryProperties {
  children: ReactNode;
}

export const configTracing = () =>
  fold(
    () => {
      // eslint-disable-next-line no-console
      console.log("Sentry is not configured");
    },
    (dsn: string) => {
      init({
        dsn,
        integrations: [new BrowserTracing()],
        tracesSampleRate: 1,
        debug: option(() => "none")(getEnv("NODE_ENV")) === "development",
        autoSessionTracking: false,
        release: option(() => "none")(getEnv("REACT_APP_SENTRY_RELEASE")),
        initialScope: {
          tags: { app: "gurutzetapp" },
        },
      });
    }
  )(getEnv("REACT_APP_SENTRY_DSN"));
