const V = 'ipm-v2.4';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  const ok = u.origin === location.origin || u.hostname === 'www.gstatic.com';
  if (!ok) return; // Firebase realtime traffic goes straight to the network
  e.respondWith(
    caches.open(V).then(async c => {
      const hit = await c.match(req, { ignoreSearch: true });
      const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; }).catch(() => null);
      if (hit) { net.catch(() => {}); return hit; }
      const r = await net;
      if (r) return r;
      if (req.mode === 'navigate') return c.match('./index.html');
      return Response.error();
    })
  );
});
self.addEventListener('message', e => { if (e.data === 'SKIP') self.skipWaiting(); });
