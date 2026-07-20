export type PasswordPolicyResult = {
  accepted: boolean;
  reasons: string[];
};

const MINIMUM_LENGTH = 15;
const MAXIMUM_LENGTH = 128;
const BLOCKED_PASSWORDS = new Set([
  "passwordpassword",
  "correcthorsebatterystaple",
  "letmeinletmeinletmein"
]);

export function checkPasswordPolicy(candidate: string): PasswordPolicyResult {
  const reasons: string[] = [];
  const normalized = candidate.trim();

  if (normalized.length < MINIMUM_LENGTH) {
    reasons.push("Password must contain at least 15 characters.");
  }

  if (normalized.length > MAXIMUM_LENGTH) {
    reasons.push("Password must contain at most 128 characters.");
  }

  if (BLOCKED_PASSWORDS.has(normalized.toLowerCase())) {
    reasons.push("Password appears in the local blocked-password list.");
  }

  return {
    accepted: reasons.length === 0,
    reasons
  };
}

console.log(checkPasswordPolicy("long-enough-passphrase"));
