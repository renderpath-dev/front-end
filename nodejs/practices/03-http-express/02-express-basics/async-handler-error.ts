import express, { type ErrorRequestHandler } from "express";

const app = express();
const port = Number.parseInt(process.env.PORT ?? "3104", 10);

async function loadRemoteNote(): Promise<never> {
  await Promise.resolve();
  throw new Error("Simulated asynchronous repository failure.");
}

app.get("/async-failure", async (_request, _response) => {
  await loadRemoteNote();
});

const errorMiddleware: ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  _next
) => {
  console.error(error);
  response.status(500).json({
    error: {
      code: "ASYNC_HANDLER_FAILED",
      message: "The asynchronous route failed."
    }
  });
};

app.use(errorMiddleware);

app.listen(port, "127.0.0.1", () => {
  console.log(`Async error practice listening on http://127.0.0.1:${port}`);
});
