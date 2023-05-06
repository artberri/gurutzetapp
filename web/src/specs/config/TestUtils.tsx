import "reflect-metadata"
/* eslint-disable class-methods-use-this */
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { resolve } from "fluture"
import i18n from "i18next"
import { ReactNode } from "react"
import { initReactI18next } from "react-i18next"
import { App } from "../../App"
import { ServiceGetter } from "../../utils/ServiceUtils"
import { setupIntersectionObserverMock } from "../infrastructure/IntersectionObserverMock"
import { Scenario } from "./Scenario"

global.ResizeObserver = class ResizeObserver {
	observe() {
		// do nothing
	}

	unobserve() {
		// do nothing
	}

	disconnect() {
		// do nothing
	}
}
const FakeTransition = ({
	children,
	show,
}: {
	children: ReactNode
	show: boolean
}) => (
	// eslint-disable-next-line react/jsx-no-useless-fragment
	<>{show ? children : null}</>
)
jest.mock("@headlessui/react", () => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const library = jest.requireActual("@headlessui/react")

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return {
		...library,
		Transition: FakeTransition,
	}
})

jest.mock("react-leaflet", () => ({}))

void i18n.use(initReactI18next).init({
	supportedLngs: ["eu", "es"],
	nonExplicitSupportedLngs: true,
	fallbackLng: "eu",
	interpolation: {
		escapeValue: false,
	},
})

const TestApp = ({ scenario: { container } }: { scenario: Scenario }) => {
	setupIntersectionObserverMock()

	const serviceGetter: ServiceGetter = (service) => container.get(service)

	return (
		<App getReady={resolve<void>(undefined)} serviceGetter={serviceGetter} />
	)
}

const customRender = (scenario: Scenario) =>
	render(<TestApp scenario={scenario} />, {})

export * from "@testing-library/react"
export { customRender as render }
