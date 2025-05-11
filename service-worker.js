const CACHE_NAME = 'pwa-game-cache-v1';  // Add versioning
const urlsToCache = [
  'index.html',
  'manifest.json',
  'icon.png',
  // Add other files you need, such as JavaScript, CSS, etc.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);  // Cache all required files
    })
  );
});

self.addEventListener('activate', event => {
  // Delete old caches if version changes
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached response or fetch from network
      return response || fetch(event.request);
    })
  );
});
