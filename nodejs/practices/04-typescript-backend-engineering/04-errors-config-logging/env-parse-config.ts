import { z } from "zod";

const configSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info")
});

type AppConfig = z.infer<typeof configSchema>;

function parseConfig(rawEnv: NodeJS.ProcessEnv): AppConfig {
  const result = configSchema.safeParse(rawEnv);

  if (!result.success) {
    throw new Error("Invalid environment configuration");
  }

  return result.data;
}

const config = parseConfig({
  NODE_ENV: "test",
  PORT: "4000",
  LOG_LEVEL: "debug"
});

console.log(config);
console.log("secret.logging=disabled");
