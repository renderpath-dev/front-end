import type { Request, Response } from "express";

type CreateNoteCommand = {
  title: string;
};

type CreateNoteResult =
  | { ok: true; note: { id: string; title: string } }
  | { ok: false; reason: "TITLE_REQUIRED" };

function createNoteService(command: CreateNoteCommand): CreateNoteResult {
  if (command.title.trim().length === 0) {
    return { ok: false, reason: "TITLE_REQUIRED" };
  }

  return { ok: true, note: { id: "note_1", title: command.title.trim() } };
}

export function createNoteController(request: Request, response: Response): void {
  const title = typeof request.body?.title === "string" ? request.body.title : "";
  const result = createNoteService({ title });

  if (!result.ok) {
    response.status(400).json({ ok: false, error: { code: result.reason } });
    return;
  }

  response.status(201).json({ ok: true, data: result.note });
}

export function wrongServiceBoundary(_request: Request): CreateNoteResult {
  return { ok: false, reason: "TITLE_REQUIRED" };
}
