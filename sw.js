const CACHE_NAME = 'hanuman-chalisa-v1.1.0';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './robots.txt',
  './sitemap.xml',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/hanuman-icon.png',
  './assets/images/hanuman-hero.jpg',
  './assets/audio/hanuman-chalisa-ambient.wav' // <-- यही इनबिल्ट ऑडियो फ़ाइल को ऑफ़लाइन कैशे करता है
];

// 1. Install Event - सभी फ़ाइलों और ऑडियो को फ़ोन की मेमोरी में सहेजना
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell, audio & sacred texts');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[Service Worker] Pre-cache partial failure:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event - पुराने कैशे को साफ़ करना
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event - इंटरनेट बंद होने पर सीधे फ़ोन की कैशे मेमोरी से ऑडियो व पेज देना
self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const audioURL = new URL(
    './assets/audio/hanuman-chalisa-ambient.wav',
    self.registration.scope
  ).href;

  // Special handling for cached audio and Range requests
  if (request.url === audioURL) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(audioURL);

      if (!cached) {
        return fetch(request);
      }

      const range = request.headers.get('Range');

      if (!range) {
        return cached;
      }

      const match = /^bytes=(\d*)-(\d*)$/.exec(range);

      if (!match) {
        return new Response(null, {
          status: 416,
          headers: {
            'Content-Range': `bytes */${(await cached.clone().arrayBuffer()).byteLength}`
          }
        });
      }

      const buffer = await cached.arrayBuffer();
      const total = buffer.byteLength;

      let start;
      let end;

      if (match[1] === '') {
        const suffixLength = Number(match[2]);
        start = Math.max(0, total - suffixLength);
        end = total - 1;
      } else {
        start = Number(match[1]);
        end = match[2] ? Math.min(Number(match[2]), total - 1) : total - 1;
      }

      if (start >= total || start > end) {
        return new Response(null, {
          status: 416,
          headers: { 'Content-Range': `bytes */${total}` }
        });
      }

      const chunk = buffer.slice(start, end + 1);

      return new Response(chunk, {
        status: 206,
        statusText: 'Partial Content',
        headers: {
          'Content-Type': cached.headers.get('Content-Type') || 'audio/wav',
          'Accept-Ranges': 'bytes',
          'Content-Range': `bytes ${start}-${end}/${total}`,
          'Content-Length': String(chunk.byteLength)
        }
      });
    })());

    return;
  }

  // Normal cache-first strategy for other assets
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);

      if (response.ok && response.type === 'basic') {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }

      return response;
    } catch (error) {
      if (request.mode === 'navigate') {
        return (await caches.match(
          new URL('./index.html', self.registration.scope).href
        )) || Response.error();
      }

      return Response.error();
    }
  })());
});