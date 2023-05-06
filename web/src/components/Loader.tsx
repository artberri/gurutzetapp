import "./Loader.css"

export interface LoaderProperties {
	primary?: boolean
}

export const Loader = ({ primary = false }: LoaderProperties) => {
	const color = primary ? "bg-primary" : "bg-white"
	return (
		<div className="Loader">
			<div className={color} />
			<div className={color} />
			<div className={color} />
			<div className={color} />
		</div>
	)
}
