import express from "express";

const app = express();
const notesRouter = express.Router();
const port = Number.parseInt(process.env.PORT ?? "3101", 10);

notesRouter.get("/", (request, response) => {
  response.status(200).json({
    search: request.query.search ?? null,
    notes: []
  });
});

notesRouter.get("/:noteId", (request, response) => {
  response.status(200).json({
    note: {
      id: request.params.noteId,
      title: "Route parameters are strings"
    }
  });
});

notesRouter.post("/", express.json(), (request, response) => {
  response.status(201).json({
    note: {
      id: crypto.randomUUID(),
      title: request.body.title
    }
  });
});

app.use("/notes", notesRouter);

app.listen(port, "127.0.0.1", () => {
  console.log(`Express routing practice listening on http://127.0.0.1:${port}`);
});
