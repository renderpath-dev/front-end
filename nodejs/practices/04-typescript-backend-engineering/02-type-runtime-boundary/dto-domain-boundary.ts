type CreateNoteRequestDto = {
  title: string;
  body?: string;
};

type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};

type StoredNote = {
  id: string;
  title: string;
  body: string;
  createdAtIso: string;
  updatedAtIso: string;
};

type NoteResponseDto = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

function toDomainNote(id: string, input: CreateNoteRequestDto, now: Date): Note {
  return {
    id,
    title: input.title.trim(),
    body: input.body?.trim() ?? "",
    createdAt: now,
    updatedAt: now
  };
}

function toStoredNote(note: Note): StoredNote {
  return {
    id: note.id,
    title: note.title,
    body: note.body,
    createdAtIso: note.createdAt.toISOString(),
    updatedAtIso: note.updatedAt.toISOString()
  };
}

function toResponseDto(storedNote: StoredNote): NoteResponseDto {
  return {
    id: storedNote.id,
    title: storedNote.title,
    body: storedNote.body,
    createdAt: storedNote.createdAtIso,
    updatedAt: storedNote.updatedAtIso
  };
}

const created = toDomainNote("note_1", { title: " DTO Boundary " }, new Date("2026-07-14T00:00:00.000Z"));
const stored = toStoredNote(created);
const response = toResponseDto(stored);

console.log({ created, stored, response });
