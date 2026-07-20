function windowStart(epochMs: number, windowSeconds: number): number {
  return Math.floor(epochMs / (windowSeconds * 1000)) * windowSeconds;
}

export function exportRateLimitKey(identity: string, now = Date.now()): string {
  return `rate:user:${identity}:exports:${windowStart(now, 60)}`;
}

console.log(exportRateLimitKey("user_123", Date.parse("2026-07-19T00:00:30.000Z")));
