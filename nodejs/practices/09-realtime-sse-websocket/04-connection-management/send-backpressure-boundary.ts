type SendableSocket = {
  readyState: number;
  bufferedAmount: number;
  send: (payload: string) => void;
  close: (code: number, reason: string) => void;
};

const OPEN = 1;

function sendWithBoundary(socket: SendableSocket, payload: unknown, maxBufferedBytes: number): "sent" | "closed" | "backpressure" {
  if (socket.readyState !== OPEN) return "closed";
  if (socket.bufferedAmount > maxBufferedBytes) {
    socket.close(1013, "Backpressure limit exceeded");
    return "backpressure";
  }
  socket.send(JSON.stringify(payload));
  return "sent";
}

console.log(sendWithBoundary({ readyState: OPEN, bufferedAmount: 0, send: console.log, close: console.log }, { ok: true }, 1024));
