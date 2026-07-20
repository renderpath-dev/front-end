type NoteRow = {
  id: string;
  notebook_id: string;
  title: string;
  body: string;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  created_at: Date;
  updated_at: Date;
};

type NoteResponseDto = {
  id: string;
  notebookId: string;
  title: string;
  body: string;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
};

function toNoteResponseDto(row: NoteRow): NoteResponseDto {
  return {
    id: row.id,
    notebookId: row.notebook_id,
    title: row.title,
    body: row.body,
    status: row.status,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString()
  };
}

const row: NoteRow = {
  id: "note_1",
  notebook_id: "notebook_1",
  title: "Mapped row",
  body: "Database rows are not public DTOs.",
  status: "ACTIVE",
  created_at: new Date("2026-07-18T00:00:00.000Z"),
  updated_at: new Date("2026-07-18T00:00:00.000Z")
};

console.log(toNoteResponseDto(row));
