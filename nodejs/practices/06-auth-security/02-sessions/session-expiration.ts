export type SessionRecord = {
  id: string;
  expiresAt: Date;
  revokedAt: Date | null;
};

export function isSessionActive(session: SessionRecord, now = new Date()): boolean {
  return session.revokedAt === null && session.expiresAt.getTime() > now.getTime();
}

console.log(isSessionActive({
  id: "session_1",
  expiresAt: new Date(Date.now() + 1000),
  revokedAt: null
}));
