export function requireDatabaseUrl(rawEnv: NodeJS.ProcessEnv): string {
  const databaseUrl = rawEnv.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }

  return databaseUrl;
}

const databaseUrl = requireDatabaseUrl(process.env);

console.log({
  configured: true,
  protocol: new URL(databaseUrl).protocol
});
