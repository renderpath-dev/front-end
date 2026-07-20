import type { Response } from "express";

export type SseConnection = {
  connectionId: string;
  userId: string;
  noteId?: string;
  response: Response;
  heartbeat: NodeJS.Timeout;
};
