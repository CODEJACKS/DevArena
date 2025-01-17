self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        '/images/DBYSAGAMES.png',
        '/catergories/cat1.html',
        '/catergories/cat2.html',
        '/catergories/cat3.html',
        '/catergories/cat4.html',
        '/catergories/cat5.html',
        '/games/1v1.lol.html',
        '/games/basketrandom.html',
        '/games/delaford.html',
        '/games/geometrydash.html',
        '/games/eaglercraft.1.8.8.html',
        '/games/gunspin.html',
        '/categories/ai',
        '/categories/cat1',
        '/categories/cat2',
        '/categories/cat3',
        '/categories/cat4',
        '/categories/cat5',
        '/games/1v1.lol',
        '/games/basketrandom',
        '/games/chatbot',
        '/games/cookie-clicker',
        '/games/delaford',
        '/games/geometrydash',
        '/games/gunspin',
        '/games/imagegen',
        '/games/polytrack',
        '/games/retrobowl',
        '/games/snowrider3d'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
