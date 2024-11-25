const CACHE_NAME = 'devarena-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/dbysagames.png',
  '/manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// P0128
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data.action === 'cachePopularGames') {
    cachePopularGames(event.data.games);
  }
});

function cachePopularGames(games) {
  caches.open(CACHE_NAME).then(function(cache) {
    games.forEach(function(game) {
      fetch(game).then(function(response) {
        if (response.ok) {
          cache.put(game, response);
        }
      });
    });
  });
}
