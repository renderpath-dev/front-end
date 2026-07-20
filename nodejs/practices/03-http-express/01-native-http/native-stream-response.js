import http from "node:http";
import { once } from "node:events";

const port = Number.parseInt(process.env.PORT ?? "3003", 10);

async function writeChunk(response, chunk) {
  const canContinue = response.write(chunk);

  if (!canContinue) {
    await once(response, "drain");
  }
}

const server = http.createServer((request, response) => {
  if (request.method !== "GET" || request.url !== "/stream") {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Route not found.\n");
    return;
  }

  response.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store"
  });

  void (async () => {
    for (let index = 1; index <= 3; index += 1) {
      await writeChunk(response, `chunk ${index}\n`);
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    response.end("complete\n");
  })().catch((error) => {
    response.destroy(error);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Native stream server listening on http://127.0.0.1:${port}`);
});
