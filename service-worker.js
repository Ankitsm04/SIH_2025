const CACHE_NAME = 'stem-learn-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/games.html',
  '/about.html',
  '/contact.html',
  '/styles.css',
  '/games/quiz.js',
  '/scripts/i18n.js',
  '/games/scienceTrivia.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Clear old caches if needed
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.filter(name => name !== CACHE_NAME)
        .map(name => caches.delete(name))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
