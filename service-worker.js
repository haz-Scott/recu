const cacheName = "tutorial-v2";
const filesToCache = [
  "index.html",
  "login.html",
  "registro.html",
  "fundamentos.html",
  "sensores.html",
  "notificaciones.html",
  "librerias.html",
  "depuracion.html",
  "empaquetado.html",
  "distribucion.html",
  "style.css",
  "app.js",
  "db.js",
  "manifest.json"
];

// INSTALACIÓN
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// RESPUESTA OFFLINE
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});