import express, { type ErrorRequestHandler } from "express";
import { z } from "zod";

const createNoteSchema = z.object({
  title: z.string().trim().min(1).max(120),
  content: z.string().trim().max(5000)
});

const app = express();
const port = Number.parseInt(process.env.PORT ?? "3105", 10);

app.use(express.json({ limit: "32kb" }));

app.post("/notes", (request, response) => {
  const input: unknown = request.body;
  const result = createNoteSchema.safeParse(input);

  if (!result.success) {
    response.status(422).json({
      ok: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Request validation failed.",
        details: result.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message
        }))
      }
    });
    return;
  }

  response.status(201).json({
    ok: true,
    data: {
      note: {
        id: crypto.randomUUID(),
        ...result.data
      }
    }
  });
});

const errorMiddleware: ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  _next
) => {
  const statusCode =
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    error.status === 400
      ? 400
      : 500;

  response.status(statusCode).json({
    ok: false,
    error: {
      code: statusCode === 400 ? "INVALID_JSON" : "INTERNAL_ERROR",
      message:
        statusCode === 400
          ? "Request body must contain valid JSON."
          : "Internal server error.",
      details: null
    }
  });
};

app.use(errorMiddleware);

app.listen(port, "127.0.0.1", () => {
  console.log(`Validation practice listening on http://127.0.0.1:${port}`);
});
