type Note = {
  id: string;
  title: string;
  body: string;
};

type CreateNoteRecord = {
  title: string;
  body: string;
};

interface NotesRepository {
  list(): Promise<Note[]>;
  findById(id: string): Promise<Note | undefined>;
  create(record: CreateNoteRecord): Promise<Note>;
}

class MemoryNotesRepository implements NotesRepository {
  private readonly notes = new Map<string, Note>();

  async list(): Promise<Note[]> {
    return [...this.notes.values()];
  }

  async findById(id: string): Promise<Note | undefined> {
    return this.notes.get(id);
  }

  async create(record: CreateNoteRecord): Promise<Note> {
    const note = {
      id: `note_${this.notes.size + 1}`,
      title: record.title,
      body: record.body
    };

    this.notes.set(note.id, note);
    return note;
  }
}

async function demoRepositoryContract(): Promise<void> {
  const repository: NotesRepository = new MemoryNotesRepository();
  await repository.create({ title: "Repository contract", body: "Memory implementation" });
  console.log(await repository.list());
}

await demoRepositoryContract();
