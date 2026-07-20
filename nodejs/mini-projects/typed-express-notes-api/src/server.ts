import { app } from "./app.js";

const port = Number.parseInt(process.env.PORT ?? "3200", 10);

const server = app.listen(port, "127.0.0.1", () => {
  console.log(`Typed notes API listening on http://127.0.0.1:${port}`);
});

server.on("error", (error) => {
  console.error("Server startup failed.", error);
  process.exitCode = 1;
});
