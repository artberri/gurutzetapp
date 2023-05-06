export const parseError = (error: unknown): Error =>
	error instanceof Error ? error : new Error(String(error))
