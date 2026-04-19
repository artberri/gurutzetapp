import { type Either, left, right } from "../cross-cutting/Either";

export const getEnv = (envName: string): Either<Error, string> => {
	const env = import.meta.env[envName];

	if (!env) {
		return left(new Error(`No ${envName} found in environment variables`));
	}

	return right(String(env));
};
