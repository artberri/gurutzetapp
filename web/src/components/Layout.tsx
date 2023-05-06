import { ReactNode } from "react"
import { Header } from "./Header"

export interface LayoutProperties {
	children: ReactNode
}

export const Layout = ({ children }: LayoutProperties) => (
	<div className="bg-white h-full w-full flex flex-col">
		<Header className="flex-none  shadow-lg z-10" />
		<main className="bg-s grow flex flex-col bg-slate-100  overflow-y-auto">
			{children}
		</main>
	</div>
)
