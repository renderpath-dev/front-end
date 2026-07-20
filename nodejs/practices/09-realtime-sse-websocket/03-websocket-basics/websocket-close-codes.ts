const closeCodes = {
  normal: 1000,
  goingAway: 1001,
  invalidPayload: 1007,
  policyViolation: 1008,
  tryAgainLater: 1013
} as const;

function closeReason(code: number): string {
  if (code === closeCodes.policyViolation) return "Policy violation";
  if (code === closeCodes.invalidPayload) return "Invalid payload";
  return "Connection closed";
}

console.log(closeReason(closeCodes.policyViolation));
