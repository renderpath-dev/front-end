type RequestLike = {
  method: "POST";
  path: "/notes";
  body: unknown;
};

type ResponseLike = {
  status: number;
  body: unknown;
};

type Note = {
  id: string;
  title: string;
};

type NotesRepository = {
  create(input: { title: string }): Note;
  list(): Note[];
};

function createMemoryNotesRepository(): NotesRepository {
  const notes: Note[] = [];

  return {
    create(input) {
      const note = { id: `note_${notes.length + 1}`, title: input.title };
      notes.push(note);
      return note;
    },
    list() {
      return [...notes];
    }
  };
}

function createNotesService(repository: NotesRepository) {
  return {
    createNote(input: { title: string }): Note {
      if (input.title.trim().length === 0) {
        throw new Error("Title is required");
      }

      return repository.create({ title: input.title.trim() });
    }
  };
}

function createNotesController(service: ReturnType<typeof createNotesService>) {
  return {
    postNote(request: RequestLike): ResponseLike {
      const body = request.body as { title?: unknown };

      if (typeof body.title !== "string") {
        return { status: 400, body: { ok: false, error: "Invalid title" } };
      }

      const note = service.createNote({ title: body.title });
      return { status: 201, body: { ok: true, data: note } };
    }
  };
}

const repository = createMemoryNotesRepository();
const service = createNotesService(repository);
const controller = createNotesController(service);
const routeRequest: RequestLike = { method: "POST", path: "/notes", body: { title: "Layered API" } };

console.log(controller.postNote(routeRequest));
console.log(repository.list());
