type LimiterDecision = {
  allowed: boolean;
  reason: "WITHIN_LIMIT" | "REDIS_UNAVAILABLE_FAIL_OPEN" | "REDIS_UNAVAILABLE_FAIL_CLOSED";
};

function decideOnRedisError(policy: "open" | "closed"): LimiterDecision {
  if (policy === "open") {
    return { allowed: true, reason: "REDIS_UNAVAILABLE_FAIL_OPEN" };
  }
  return { allowed: false, reason: "REDIS_UNAVAILABLE_FAIL_CLOSED" };
}

console.log(decideOnRedisError("open"));
