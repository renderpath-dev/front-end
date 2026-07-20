import http from "node:http";

const port = Number.parseInt(process.env.PORT ?? "3002", 10);
const notes = [
  { id: "1", title: "Understand IncomingMessage" },
  { id: "2", title: "Finish every ServerResponse" }
];

function sendJson(response, statusCode, value, extraHeaders = {}) {
  const body = JSON.stringify(value);

  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    ...extraHeaders
  });
  response.end(body);
}

const server = http.createServer((request, response) => {
  const origin = `http://${request.headers.host ?? "127.0.0.1"}`;
  const url = new URL(request.url ?? "/", origin);

  if (url.pathname === "/notes" && request.method === "GET") {
    const search = url.searchParams.get("search")?.toLowerCase();
    const matches = search
      ? notes.filter((note) => note.title.toLowerCase().includes(search))
      : notes;

    sendJson(response, 200, { notes: matches });
    return;
  }

  const noteMatch = url.pathname.match(/^\/notes\/([^/]+)$/);
  if (noteMatch && request.method === "GET") {
    const note = notes.find((candidate) => candidate.id === noteMatch[1]);

    if (!note) {
      sendJson(response, 404, {
        error: { code: "NOTE_NOT_FOUND", message: "Note not found." }
      });
      return;
    }

    sendJson(response, 200, { note });
    return;
  }

  if (url.pathname === "/notes") {
    sendJson(
      response,
      405,
      { error: { code: "METHOD_NOT_ALLOWED", message: "Use GET /notes." } },
      { Allow: "GET" }
    );
    return;
  }

  sendJson(response, 404, {
    error: { code: "NOT_FOUND", message: "Route not found." }
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Native routing server listening on http://127.0.0.1:${port}`);
});
