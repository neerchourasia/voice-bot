// Service worker: lets the app install and open offline. Network first, so a new deploy is never hidden behind an old copy;
// the saved copy is only used when the network fails. It never touches /api/ or other websites (sign-in, weather, etc.).
const CACHE = "can-do-robot-v3";
const LIB = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/dist/umd/supabase.min.js"; // the sign-in library (must match auth.js)
const SHELL = ["/", "/index.html", "/config.js", "/abilities.js", "/auth.js", "/admin.js", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png"];

// cache.add() refuses cross-site (opaque) responses, so the sign-in library is fetched and put by hand.
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all([...SHELL.map(u => c.add(u).catch(() => {})), fetch(LIB, { mode: "no-cors" }).then(r => c.put(LIB, r)).catch(() => {})]))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  const isLib = req.url === LIB;
  if (req.method !== "GET" || (url.origin !== location.origin && !isLib) || url.pathname.startsWith("/api/")) return;
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then(hit => hit || (req.mode === "navigate" ? caches.match("/index.html") : Response.error())))
  );
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => (list[0] ? list[0].focus() : self.clients.openWindow("/"))));
});
