export const websocketCloseCodes = {
  normal: 1000,
  goingAway: 1001,
  invalidPayload: 1007,
  policyViolation: 1008,
  tryAgainLater: 1013
} as const;

export function safeCloseReason(reason: string): string {
  return reason.slice(0, 120);
}
