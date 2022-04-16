/* eslint-disable no-console */
import { captureException } from "@sentry/react";
import { fold } from "../cross-cutting/Either";
import { Tracer } from "../domain/Tracer";
import { getEnv } from "./GetEnv";

export class SentryTracer implements Tracer {
  private readonly isActive: boolean;

  public constructor() {
    this.isActive = fold(
      () => false,
      (value) => !!value,
    )(getEnv("REACT_APP_SENTRY_DSN"));
  }

  public trace(error: Error) {
    if (this.isActive) {
      captureException(error);
    } else {
      console.error(error);
    }
  }
}
