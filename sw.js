const CACHE_NAME = 'hanuman-chalisa-v1.3.0';

const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './assets/audio/hanuman-chalisa-ambient.wav'
];

const OPTIONAL_ASSETS = [
  './robots.txt',
  './sitemap.xml',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/hanuman-icon.png',
  './assets/images/hanuman-hero.jpg'
];

const AUDIO_URL = new URL(
  './assets/audio/hanuman-chalisa-ambient.wav',
  self.registration.scope
).href;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // App aur audio cache hona zaroori hai.
    // Audio cache nahi hua to installation fail hogi.
    await cache.addAll(CORE_ASSETS);

    // Optional files fail hone par app installation na rokein.
    await Promise.all(
      OPTIONAL_ASSETS.map(async (url) => {
        try {
          await cache.add(url);
        } catch (error) {
          console.warn('Optional asset cache nahi hua:', url, error);
        }
      })
    );

    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();

    await Promise.all(
      keys
        .filter((key) => key !== CACHE_NAME)
        .map((key) => caches.delete(key))
    );

    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const requestURL = new URL(request.url);

  // Audio: cached file se normal aur Range playback.
  if (
    requestURL.origin === new URL(AUDIO_URL).origin &&
    requestURL.pathname === new URL(AUDIO_URL).pathname
  ) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(AUDIO_URL);

      if (!cached) {
        try {
          return await fetch(request);
        } catch {
          return new Response('Audio offline cache mein nahi mila.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
        }
      }

      const range = request.headers.get('Range');

      if (!range) {
        return cached;
      }

      const match = /^bytes=(\d*)-(\d*)$/.exec(range);

      if (!match || (!match[1] && !match[2])) {
        return new Response(null, {
          status: 416,
          headers: {
            'Content-Range': `bytes */${cached.headers.get('Content-Length') || '*'}`,
            'Accept-Ranges': 'bytes'
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

      if (
        !Number.isSafeInteger(start) ||
        !Number.isSafeInteger(end) ||
        start < 0 ||
        start >= total ||
        start > end
      ) {
        return new Response(null, {
          status: 416,
          headers: {
            'Content-Range': `bytes */${total}`,
            'Accept-Ranges': 'bytes'
          }
        });
      }

      const chunk = buffer.slice(start, end + 1);

      return new Response(chunk, {
        status: 206,
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

  // Baaki files: cache first, phir network.
  event.respondWith((async () => {
    const cached = await caches.match(request);

    if (cached) return cached;

    try {
      const response = await fetch(request);

      if (response.ok && response.status === 200 && response.type === 'basic') {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }

      return response;
    } catch (error) {
      if (request.mode === 'navigate') {
        return (
          await caches.match(
            new URL('./index.html', self.registration.scope).href
          )
        ) || Response.error();
      }

      return Response.error();
    }
  })());
});