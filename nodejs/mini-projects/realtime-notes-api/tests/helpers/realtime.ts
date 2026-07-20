import { createServer } from "node:http";
import { AddressInfo } from "node:net";
import { app } from "../../src/app.js";
import { createRealtimeWebSocketServer } from "../../src/websocket/websocket-server.js";
import { installWebSocketUpgrade } from "../../src/websocket/websocket-upgrade.js";

export async function createRealtimeTestServer() {
  const httpServer = createServer(app);
  const websocketServer = createRealtimeWebSocketServer();
  const upgradeController = installWebSocketUpgrade(httpServer, websocketServer);

  await new Promise<void>((resolve) => {
    httpServer.listen(0, () => resolve());
  });

  const address = httpServer.address() as AddressInfo;

  return {
    url: `http://127.0.0.1:${address.port}`,
    wsUrl: `ws://127.0.0.1:${address.port}/ws`,
    close: async () => {
      upgradeController.stopAccepting();
      websocketServer.closeAll("Test shutdown");
      await new Promise<void>((resolve) => httpServer.close(() => resolve()));
    }
  };
}
