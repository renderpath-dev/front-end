// Goal:
// Cache a small application shell and respond from cache when possible.

const CACHE_NAME = 'web-api-guide-v1';
const APP_SHELL = [
  './',
  './index.html',
  './realtimeOfflineDemo.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    }),
  );
});
