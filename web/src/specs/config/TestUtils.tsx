import "reflect-metadata";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { resolve } from "fluture";
import { ServiceGetter } from "../../utils/ServiceUtils";
import { App } from "../../App";
import { setupIntersectionObserverMock } from "../infrastructure/IntersectionObserverMock";
import { Scenario } from "./Scenario";

void i18n.use(initReactI18next).init({
  supportedLngs: ["eu", "es"],
  nonExplicitSupportedLngs: true,
  fallbackLng: "eu",
  interpolation: {
    escapeValue: false,
  },
});

const TestApp = ({ scenario: { container } }: { scenario: Scenario }) => {
  setupIntersectionObserverMock();

  const serviceGetter: ServiceGetter = (service) => container.get(service);

  return (
    // eslint-disable-next-line unicorn/no-useless-undefined
    <App getReady={resolve<void>(undefined)} serviceGetter={serviceGetter} />
  );
};

const customRender = (scenario: Scenario) =>
  render(<TestApp scenario={scenario} />, {});

export * from "@testing-library/react";
export { customRender as render };
