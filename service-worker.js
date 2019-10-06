// Give cache name
const cacheName = 'hacktoberfest-finder';

// Define files to cache
const filesToCache = [
    '/',
    '/assets/fonts/SpaceMono-Bold.woff',
    '/assets/fonts/SpaceMono-Bold.woff2',
    '/assets/images/header.svg',
    '/assets/images/digital-ocean.png',
    '/assets/images/digital-ocean.svg',
    '/assets/images/dev.svg',
    '/assets/images/issuefinder.png',
    '/assets/images/favicons/android-chrome-192x192.png',
    '/assets/images/favicons/android-chrome-512x512.png',
    '/assets/images/favicons/apple-touch-icon.png',
    '/assets/images/favicons/favicon-32x32.png',
    '/assets/images/favicons/favicon-16x16.png',
    '/assets/images/favicons/site.webmanifest',
    '/assets/images/favicons/favicon.ico',
    '/assets/images/favicons/mstile-150x150.png',
    '/assets/images/favicons/safari-pinned-tab.svg',
    '/build/app.js',
    '/build/app.css'
];

// Do things when service worker is being installed
self.addEventListener('install', function (e) {
    console.log('Service Worker is now installed');

    // Cache all files in filesToCache
    e.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                return cache.addAll(filesToCache); // Add files to cache
            })
            .then(() => {
                return self.skipWaiting(); // Immediately update to existing Service Worker
            })
    );
});

// Do things when service worker is being activated
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim()); // Let Service Worker take control immediately after first load
});

// Do things when browser is fetching resources
self.addEventListener('fetch', event => {
    // Check if file is available in cache
    event.respondWith(
        caches.match(event.request).then(function (response) { // If file is in cache...
            if (response) {
                return response; // Return file in cache
            }

            // If file is not in cache...
            return fetch(event.request) // Fetch file from server

        })
    );
});
