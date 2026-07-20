import express, {
  type ErrorRequestHandler,
  type RequestHandler
} from "express";

class HttpError extends Error {
  constructor(
    readonly statusCode: number,
    readonly code: string,
    message: string
  ) {
    super(message);
    this.name = "HttpError";
  }
}

const app = express();
const port = Number.parseInt(process.env.PORT ?? "3103", 10);

const loadNote: RequestHandler = (request, _response, next) => {
  if (request.params.noteId !== "known") {
    next(new HttpError(404, "NOTE_NOT_FOUND", "Note not found."));
    return;
  }

  next();
};

app.get("/notes/:noteId", loadNote, (request, response) => {
  response.status(200).json({ note: { id: request.params.noteId } });
});

const errorMiddleware: ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  next
) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (error instanceof HttpError) {
    response.status(error.statusCode).json({
      error: { code: error.code, message: error.message }
    });
    return;
  }

  console.error(error);
  response.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "Internal server error." }
  });
};

app.use(errorMiddleware);

app.listen(port, "127.0.0.1", () => {
  console.log(`Error middleware practice listening on http://127.0.0.1:${port}`);
});
