import { HTMLProps } from "react"

export interface ButtonProperties
	extends Omit<HTMLProps<HTMLButtonElement>, "type"> {
	type?: "button" | "submit" | "reset"
}

export const Button = ({
	type = "button",
	children,
	className,
	...properties
}: ButtonProperties) => (
	<button
		className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-primary-900 bg-primary-100 border border-transparent rounded-md hover:bg-primary-200 focus:outline-none ring-2 ring-offset-2 ring-primary-500 ${
			className ?? ""
		}`}
		// eslint-disable-next-line react/button-has-type
		type={type}
		// eslint-disable-next-line react/jsx-props-no-spreading
		{...properties}
	>
		{children}
	</button>
)
