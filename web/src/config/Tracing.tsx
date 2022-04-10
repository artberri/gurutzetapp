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
      console.log("Sentry is not configured");
      return false;
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
      return true;
    }
  )(getEnv("REACT_APP_SENTRY_DSN"));