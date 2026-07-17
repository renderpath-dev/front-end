// Goal:
// Compare same-origin tab messaging, service worker registration, and websocket state.

const broadcastButton = document.querySelector('#broadcast-button');
const websocketButton = document.querySelector('#websocket-button');
const serviceWorkerOutput = document.querySelector('#service-worker-output');
const broadcastOutput = document.querySelector('#broadcast-output');
const websocketOutput = document.querySelector('#websocket-output');

const authChannel = new BroadcastChannel('auth-state');

authChannel.addEventListener('message', (event) => {
  broadcastOutput.textContent = `Broadcast: ${event.data.type}`;
});

broadcastButton.addEventListener('click', () => {
  authChannel.postMessage({
    type: 'user-login',
    at: Date.now(),
  });
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./serviceWorker.js')
    .then((registration) => {
      serviceWorkerOutput.textContent = `Service worker: ${registration.scope}`;
    })
    .catch((error) => {
      serviceWorkerOutput.textContent = `Service worker error: ${error.message}`;
    });
}

websocketButton.addEventListener('click', () => {
  const socket = new WebSocket('wss://echo.websocket.events');

  socket.addEventListener('open', () => {
    websocketOutput.textContent = 'WebSocket: open';
    socket.send('hello from browser');
  });

  socket.addEventListener('message', (event) => {
    websocketOutput.textContent = `WebSocket message: ${event.data}`;
    socket.close();
  });

  socket.addEventListener('close', () => {
    console.log('WebSocket closed.');
  });

  socket.addEventListener('error', (event) => {
    console.error(event);
    websocketOutput.textContent = 'WebSocket: error';
  });
});
