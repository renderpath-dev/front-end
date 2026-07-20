import type { Response } from "express";
import { config } from "../config/env.js";
import { formatSseEvent } from "./sse-format.js";

export function startSseHeartbeat(response: Response): NodeJS.Timeout {
  return setInterval(() => {
    response.write(formatSseEvent({
      event: "heartbeat",
      data: { now: new Date().toISOString() }
    }));
  }, config.HEARTBEAT_INTERVAL_MS);
}

export function stopSseHeartbeat(timer: NodeJS.Timeout): void {
  clearInterval(timer);
}
