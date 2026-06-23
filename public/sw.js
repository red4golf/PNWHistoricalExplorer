/* PNW Historical Explorer service worker
 * Strategy:
 *  - Precache the app shell (home, map, categories, offline page, location data).
 *  - Pages: network-first, fall back to cache, then /offline.
 *  - Images, CSS, JS, map tiles: stale-while-revalidate (capped).
 *  - Audio: served from the 'pnw-audio-v1' cache that the page fills on first
 *    play (cache-on-play). Handles Range requests from cached full files.
 */

const VERSION = 'v2';
const BASE = '/PNWHistoricalExplorer'; // keep in sync with astro.config.mjs base
const SHELL_CACHE = `pnw-shell-${VERSION}`;
const RUNTIME_CACHE = `pnw-runtime-${VERSION}`;
const AUDIO_CACHE = 'pnw-audio-v1';
const TILE_CACHE = 'pnw-tiles-v1';

const SHELL_URLS = ['/', '/map', '/categories', '/about', '/offline', '/locations.json', '/manifest.webmanifest'].map(
  (p) => BASE + (p === '/' ? '/' : p)
);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => ![SHELL_CACHE, RUNTIME_CACHE, AUDIO_CACHE, TILE_CACHE].includes(k))
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    await cache.delete(keys[0]);
    return trimCache(cacheName, maxEntries);
  }
}

/** Serve audio from cache, honoring Range requests against the cached full body. */
async function audioResponse(request) {
  const cache = await caches.open(AUDIO_CACHE);
  const cached = await cache.match(request.url, { ignoreSearch: true });
  if (!cached) return fetch(request);

  const range = request.headers.get('range');
  if (!range) return cached.clone();

  const buf = await cached.clone().arrayBuffer();
  const total = buf.byteLength;
  const m = /bytes=(\d+)-(\d*)/.exec(range);
  const start = m ? parseInt(m[1], 10) : 0;
  const end = m && m[2] ? Math.min(parseInt(m[2], 10), total - 1) : total - 1;

  return new Response(buf.slice(start, end + 1), {
    status: 206,
    statusText: 'Partial Content',
    headers: {
      'Content-Type': cached.headers.get('Content-Type') || 'audio/mpeg',
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Content-Length': String(end - start + 1),
      'Accept-Ranges': 'bytes',
    },
  });
}

async function staleWhileRevalidate(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((res) => {
      if (res.ok || res.type === 'opaque') {
        cache.put(request, res.clone());
        if (maxEntries) trimCache(cacheName, maxEntries);
      }
      return res;
    })
    .catch(() => null);
  return cached || (await network) || Response.error();
}

async function pageStrategy(request) {
  try {
    const res = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, res.clone());
    trimCache(RUNTIME_CACHE, 150);
    return res;
  } catch {
    const cached = (await caches.match(request)) || (await caches.match(`${BASE}/offline`));
    return cached || Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Audio — cache-on-play cache, with Range support
  if (url.pathname.startsWith(`${BASE}/audio/`) || (url.origin === location.origin && url.pathname.endsWith('.mp3'))) {
    event.respondWith(audioResponse(request));
    return;
  }

  // OpenStreetMap tiles
  if (url.hostname.endsWith('tile.openstreetmap.org')) {
    event.respondWith(staleWhileRevalidate(request, TILE_CACHE, 400));
    return;
  }

  if (url.origin !== location.origin) return;

  // HTML navigation
  if (request.mode === 'navigate') {
    event.respondWith(pageStrategy(request));
    return;
  }

  // Static assets: images, JS, CSS, fonts, JSON
  if (/\.(png|jpe?g|webp|svg|gif|ico|js|css|woff2?|json|webmanifest)$/.test(url.pathname) || url.pathname.startsWith(`${BASE}/_astro/`)) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE, 300));
    return;
  }
});
