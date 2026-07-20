type ConnectionState = "connecting" | "authenticated" | "subscribed" | "closing" | "closed";

const allowedTransitions: Record<ConnectionState, ConnectionState[]> = {
  connecting: ["authenticated", "closed"],
  authenticated: ["subscribed", "closing"],
  subscribed: ["authenticated", "closing"],
  closing: ["closed"],
  closed: []
};

function canTransition(from: ConnectionState, to: ConnectionState): boolean {
  return allowedTransitions[from].includes(to);
}

console.log(canTransition("connecting", "authenticated"));
console.log(canTransition("closed", "subscribed"));
