import { config } from "../config/env.js";

export function isAllowedWebSocketOrigin(origin: string | undefined): boolean {
  if (config.ALLOWED_ORIGINS.length === 0) return true;
  if (!origin) return false;
  return config.ALLOWED_ORIGINS.includes(origin);
}
