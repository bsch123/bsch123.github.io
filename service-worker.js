const CACHE_NAME = "simas-pwa-v1";
const urlsToCache = [
  "./",
  // Ubah baris di bawah ini sesuai nama file HTML Anda, misal: 'index.html' atau 'SIMAS'
  "./index.html",
  "./manifest.json",
  "https://cdn.tailwindcss.com",
  "https://cdn.jsdelivr.net/npm/chart.js",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
];

// Proses instalasi Service Worker dan Caching
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache berhasil dibuka");
      return cache.addAll(urlsToCache);
    }),
  );
});

// Proses Fetching (Mengambil data dari cache jika offline)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Jika file ada di cache, gunakan itu. Jika tidak, ambil dari internet.
      return response || fetch(event.request);
    }),
  );
});
