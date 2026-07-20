import http from "node:http";

const port = Number.parseInt(process.env.PORT ?? "3001", 10);

async function readJsonBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const text = Buffer.concat(chunks).toString("utf8");
  return text.length === 0 ? null : JSON.parse(text);
}

function sendJson(response, statusCode, value) {
  const body = JSON.stringify(value);

  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body)
  });
  response.end(body);
}

const server = http.createServer(async (request, response) => {
  if (request.method === "GET" && request.url === "/") {
    sendJson(response, 200, {
      message: "Native Node.js HTTP server",
      method: request.method,
      userAgent: request.headers["user-agent"] ?? null
    });
    return;
  }

  if (request.method === "POST" && request.url === "/echo") {
    try {
      const body = await readJsonBody(request);
      sendJson(response, 200, { received: body });
    } catch {
      sendJson(response, 400, {
        error: {
          code: "INVALID_JSON",
          message: "Request body must contain valid JSON."
        }
      });
    }
    return;
  }

  sendJson(response, 404, {
    error: {
      code: "NOT_FOUND",
      message: "Route not found."
    }
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Native JSON server listening on http://127.0.0.1:${port}`);
});
