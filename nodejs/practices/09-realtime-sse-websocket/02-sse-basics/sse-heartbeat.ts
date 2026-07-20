import type { ServerResponse } from "node:http";

function startHeartbeat(response: ServerResponse, intervalMs: number): NodeJS.Timeout {
  return setInterval(() => {
    response.write(`event: heartbeat\n`);
    response.write(`data: {"now":"${new Date().toISOString()}"}\n\n`);
  }, intervalMs);
}

function stopHeartbeat(timer: NodeJS.Timeout): void {
  clearInterval(timer);
}

console.log({ startHeartbeat: typeof startHeartbeat, stopHeartbeat: typeof stopHeartbeat });
