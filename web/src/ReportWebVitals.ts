import { ReportCallback } from "web-vitals"

export const reportWebVitals = (onPerfEntry?: ReportCallback) => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		void import("web-vitals").then(
			({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
				getCLS(onPerfEntry)
				getFID(onPerfEntry)
				getFCP(onPerfEntry)
				getLCP(onPerfEntry)
				getTTFB(onPerfEntry)
			}
		)
	}
}
