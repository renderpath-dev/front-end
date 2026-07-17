// Goal:
// Send a JSON response from a Node.js HTTP server.

export function sendJson(response, statusCode, payloadRecord) {
  response.writeHead(statusCode, { 'content-type': 'application/json' });
  response.end(JSON.stringify(payloadRecord));
}
