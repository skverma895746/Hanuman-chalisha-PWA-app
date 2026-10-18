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
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // ऑफ़लाइन है तो सीधे यहीं से ऑडियो बजेगा
      }
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});