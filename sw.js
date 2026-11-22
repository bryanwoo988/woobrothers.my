/* Woo Brothers offline cache.
   - The page (index.html) and the app list (apps.json): network first, so people online
     always get the newest list; if the network is down or slower than 2.5 s, the saved copy is used.
   - Fonts and the brand images: saved once at install, served from the phone after that.
   - App logos, covers and screenshots: shown from the phone straight away and refreshed in
     the background, so they open instantly and still pick up a replaced image later.
   Only this site's own files are handled; GoatCounter and app links go to the network as usual.
   Bump VERSION only when the list of PRECACHE files changes. */
const VERSION = "wb-v1";
const CORE = VERSION + "-core";
const IMAGES = VERSION + "-img";
const MAX_IMAGES = 400;
const PRECACHE = [
  "./",
  "apps.json",
  "fonts/bricolage-grotesque-latin.woff2",
  "fonts/figtree-latin-400.woff2",
  "fonts/figtree-latin-500.woff2",
  "fonts/figtree-latin-600.woff2",
  "fonts/jetbrains-mono-latin-500.woff2",
  "img/brand/emblem-108.webp",
  "img/brand/wordmark.webp",
  "img/brand/favicon-32.png",
  "img/qr-woobrothers.svg"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CORE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => !k.startsWith(VERSION)).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function networkFirst(req, cacheKey) {
  return caches.open(CORE).then(cache => {
    const fromNet = fetch(req).then(res => {
      if (res.ok) cache.put(cacheKey, res.clone());
      return res;
    });
    const timeout = new Promise(resolve => setTimeout(resolve, 2500));
    const saved = () => cache.match(cacheKey);
    // Whichever comes first: a network answer, or (after 2.5 s / on failure) the saved copy.
    return Promise.race([fromNet.catch(() => null), timeout.then(saved)])
      .then(res => res || fromNet.catch(() => saved()))
      .then(res => res || saved());
  });
}

function trim(cache) {
  cache.keys().then(keys => {
    if (keys.length > MAX_IMAGES) keys.slice(0, keys.length - MAX_IMAGES).forEach(k => cache.delete(k));
  });
}

function staleWhileRevalidate(e) {
  return caches.open(IMAGES).then(cache => cache.match(e.request).then(hit => {
    const refresh = fetch(e.request).then(res => {
      if (res.ok) { cache.put(e.request, res.clone()); trim(cache); }
      return res;
    }).catch(() => hit);
    if (hit) { e.waitUntil(refresh); return hit; }
    return refresh;
  }));
}

// On the very first visit the page loads before this worker is running, so the images it already
// showed are not saved. The page sends their addresses once the worker is ready; save them now.
self.addEventListener("message", e => {
  const urls = (e.data && e.data.cacheImages) || [];
  e.waitUntil(caches.open(IMAGES).then(cache => Promise.all(urls
    .filter(u => { try { const x = new URL(u); return x.origin === self.location.origin && x.pathname.includes("/img/"); } catch (_) { return false; } })
    .map(u => cache.match(u).then(hit => hit || fetch(u).then(res => res.ok && cache.put(u, res)).catch(() => {}))))));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    e.respondWith(networkFirst(req, "./"));
  } else if (url.pathname.endsWith("/apps.json")) {
    e.respondWith(networkFirst(req, "apps.json"));
  } else if (url.pathname.includes("/fonts/") || url.pathname.includes("/img/brand/")) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
  } else if (url.pathname.includes("/img/")) {
    e.respondWith(staleWhileRevalidate(e));
  }
});
