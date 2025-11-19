'use strict';

/**
 * Caches essential files for offline use and handles fetch events.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 * @class ServiceWorker
 */
class ServiceWorker {
    /**
     * Cache name
     *
     * @type {string}
     */
    cacheName = 'hacktoberfest-finder';

    /**
     * Files to cache
     *
     * @type {string[]}
     */
    filesToCache = ['/offline.html'];

    constructor() {
        //
    }

    /**
     * Install event handler
     *
     * @param {ExtendableEvent} event
     */
    handleInstall(event) {
        console.log('[ServiceWorker] Install');
        event.waitUntil(
            caches.open(this.cacheName)
                .then((cache) => cache.addAll(this.filesToCache))
                .then(() => self.skipWaiting())
        );
    }

    /**
     * Activate event handler
     *
     * @param {ExtendableEvent} event
     */
    handleActivate(event) {
        console.log('[ServiceWorker] Activate');
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map(
                        (cacheName) => cacheName !== this.cacheName ? caches.delete(cacheName) : null
                    ).filter(Boolean)
                );
            })
                .then(() => self.clients.claim())
        );
    }

    /**
     * Fetch event handler
     *
     * @param {FetchEvent} event
     */
    handleFetch(event) {
        console.log('[ServiceWorker] Fetch', event.request.url);
        if (event.request.mode === 'navigate') {
            event.respondWith(
                fetch(event.request).catch(() => caches.match(OFFLINE_URL))
            );
        } else {
            event.respondWith(
                caches.match(event.request).then((response) => response || fetch(event.request))
            );
        }
    }
}

const serviceWorker = new ServiceWorker();

self.addEventListener('install', (event) => serviceWorker.handleInstall(event));
self.addEventListener('activate', (event) => serviceWorker.handleActivate(event));
self.addEventListener('fetch', (event) => serviceWorker.handleFetch(event));
