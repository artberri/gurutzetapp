export const weekDay = (locale: string | undefined) => (date: Date) =>
	new Intl.DateTimeFormat(locale ?? "es-ES", { weekday: "long" }).format(date)

export const monthDay = (locale: string | undefined) => (date: Date) =>
	new Intl.DateTimeFormat(locale ?? "es-ES", {
		day: "numeric",
		month: "long",
	}).format(date)

export const getYYYYMMDD = (date: Date) => date.toISOString().slice(0, 10)
export const getHHmm = (date: Date) => date.toTimeString().slice(0, 5)
