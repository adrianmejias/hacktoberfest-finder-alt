// Give cache name
var cacheName = 'hacktoberfest-finder';

// Define files to cache
var filesToCache = [
    '/',
    '/fonts/squealer.ttf',
    '/images/header.png',
    '/images/digital-ocean.png',
    '/images/dev.svg',
    '/images/favicons/android-chrome-192x192.png',
    '/images/favicons/android-chrome-512x512.png',
    '/images/favicons/apple-touch-icon.png',
    '/images/favicons/favicon-32x32.png',
    '/images/favicons/favicon-16x16.png',
    '/images/favicons/site.webmanifest',
    '/images/favicons/safari-pinned-tab.svg',
    '/js/app.js',
    '/js/manifest.js',
    '/js/vendor.js',
    '/css/app.css'
];

// Do things when service worker is being installed
self.addEventListener('install', function(e) {
    console.log('Service Worker is now installed');

    // Cache all files in filesToCache
    e.waitUntil(
        caches
            .open(cacheName)
            .then(function(cache) {
                console.log('Service worker is now caching all files.'); // TODO: Remove console logs
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
    console.log('Fetching file: ', event.request.url); // TODO: Remove console logs

    // Check if file is available in cache
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // If file is in cache...
            if (response) {
                console.log('Found ', event.request.url, ' in cache'); // TODO: Remove console logs
                return response; // Return file in cache
            }

            // If file is not in cache...
            console.log('Network request for ', event.request.url); // TODO: Remove console logs
            return fetch(event.request); // Fetch file from server
        })
    );
});
