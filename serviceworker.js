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
