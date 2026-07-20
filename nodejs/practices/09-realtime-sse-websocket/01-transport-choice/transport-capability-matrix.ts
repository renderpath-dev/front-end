type TransportCapability = {
  serverToClient: boolean;
  clientToServer: boolean;
  binary: boolean;
  automaticReconnection: boolean;
  browserApi: "fetch" | "EventSource" | "WebSocket";
  authConsideration: string;
};

const matrix: Record<"polling" | "sse" | "websocket", TransportCapability> = {
  polling: {
    serverToClient: true,
    clientToServer: true,
    binary: true,
    automaticReconnection: false,
    browserApi: "fetch",
    authConsideration: "Every request carries credentials."
  },
  sse: {
    serverToClient: true,
    clientToServer: false,
    binary: false,
    automaticReconnection: true,
    browserApi: "EventSource",
    authConsideration: "Cookie and CORS credential rules must be explicit."
  },
  websocket: {
    serverToClient: true,
    clientToServer: true,
    binary: true,
    automaticReconnection: false,
    browserApi: "WebSocket",
    authConsideration: "Upgrade auth is only the first trust boundary."
  }
};

console.table(matrix);
