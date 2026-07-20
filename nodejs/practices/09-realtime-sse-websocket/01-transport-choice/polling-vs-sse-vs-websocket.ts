type Transport = "polling" | "sse" | "websocket";

type TransportDescription = {
  transport: Transport;
  direction: "request-response" | "server-to-client" | "bidirectional";
  connectionLifetime: "short" | "long";
  browserPrimitive: string;
};

const transports: TransportDescription[] = [
  {
    transport: "polling",
    direction: "request-response",
    connectionLifetime: "short",
    browserPrimitive: "fetch"
  },
  {
    transport: "sse",
    direction: "server-to-client",
    connectionLifetime: "long",
    browserPrimitive: "EventSource"
  },
  {
    transport: "websocket",
    direction: "bidirectional",
    connectionLifetime: "long",
    browserPrimitive: "WebSocket"
  }
];

for (const transport of transports) {
  console.log(`${transport.transport}: ${transport.direction}, ${transport.connectionLifetime}, ${transport.browserPrimitive}`);
}
