import { ReactNode } from "react"

export interface StackedListProperties {
	title?: string
	items: ReactNode[]
}

export const StackedList = ({ title, items }: StackedListProperties) => (
	<div className="flex flex-col bg-white rounded-xl shadow-lg divide-y">
		{title && <h1 className="text-xl font-bold text-slate-900 p-3">{title}</h1>}
		{items.map((item) => item)}
	</div>
)
