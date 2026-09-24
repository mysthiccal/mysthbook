const SHELL_CACHE = 'mysthigram-shell-v21';
const MEDIA_CACHE = 'madriguera-media';
const MEDIA_LIMIT = 300;
const SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-512-maskable.png', './apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(SHELL_CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== SHELL_CACHE && k !== MEDIA_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function trim(cache) {
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - MEDIA_LIMIT; i++) await cache.delete(keys[i]);
}

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // La API de Wikipedia siempre va a la red: el feed debe ser nuevo.
  if (url.hostname.endsWith('wikipedia.org')) return;

  // Archivos de la app: responde desde caché y actualiza en segundo plano.
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.open(SHELL_CACHE).then(async (c) => {
        const hit = await c.match(e.request, { ignoreSearch: true });
        const net = fetch(e.request).then((res) => {
          if (res.ok) c.put(e.request, res.clone());
          return res;
        }).catch(() => hit);
        return hit || net;
      })
    );
    return;
  }

  // Imágenes y fuentes: caché primero, para que los guardados se vean sin conexión.
  if (url.hostname === 'upload.wikimedia.org' || url.hostname.startsWith('fonts.g')) {
    e.respondWith(
      caches.open(MEDIA_CACHE).then(async (c) => {
        const hit = await c.match(e.request);
        if (hit) return hit;
        try {
          const res = await fetch(e.request);
          if (res.ok || res.type === 'opaque') {
            c.put(e.request, res.clone()).then(() => trim(c));
          }
          return res;
        } catch (err) {
          return Response.error();
        }
      })
    );
  }
});
