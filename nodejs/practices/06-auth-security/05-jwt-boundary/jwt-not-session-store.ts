export type SessionRevocationDecision = {
  canRevokeImmediately: boolean;
  reason: string;
};

export function compareSessionStore(hasServerSideSessionRow: boolean): SessionRevocationDecision {
  if (hasServerSideSessionRow) {
    return {
      canRevokeImmediately: true,
      reason: "The server can mark the session row as revoked."
    };
  }

  return {
    canRevokeImmediately: false,
    reason: "A self-contained token remains valid until expiry unless another revocation system exists."
  };
}
