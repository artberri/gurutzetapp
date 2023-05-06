import { createContext, ReactNode, useContext } from "react"

export interface Class<T> extends Function {
	prototype: T
}

export type ServiceGetter = <T>(service: Class<T>) => T

const ServiceGetterContext = createContext<ServiceGetter>(() => {
	throw new Error("You need to configure a ServiceGetter")
})

export const useService = <T,>(service: Class<T>): T => {
	const get = useContext(ServiceGetterContext)

	return get(service)
}

export const ServiceGetterProvider = ({
	children,
	serviceGetter,
}: {
	children: ReactNode
	serviceGetter: ServiceGetter
}) => (
	<ServiceGetterContext.Provider value={serviceGetter}>
		{children}
	</ServiceGetterContext.Provider>
)
