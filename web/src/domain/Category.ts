import { LocalizedText } from "./LocalizedText"

export interface Category {
	readonly id: string
	readonly name: LocalizedText
	readonly label: string
}
