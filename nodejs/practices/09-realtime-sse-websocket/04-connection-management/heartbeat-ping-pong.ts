type HeartbeatSocket = {
  isAlive: boolean;
  ping: () => void;
  terminate: () => void;
};

function heartbeat(socket: HeartbeatSocket): void {
  if (!socket.isAlive) {
    socket.terminate();
    return;
  }

  socket.isAlive = false;
  socket.ping();
}

heartbeat({ isAlive: true, ping: () => console.log("ping"), terminate: () => console.log("terminate") });
