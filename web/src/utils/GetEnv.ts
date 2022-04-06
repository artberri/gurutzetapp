export const getEnv = (envName: string): string => {
  const env = process.env[envName];

  if (!env) {
    throw new Error(`No ${envName} found in environment variables`);
  }

  return env;
};
