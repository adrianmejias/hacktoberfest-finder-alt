'use strict';

/**
 * Caches essential files for offline use and handles fetch events.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 * @class ServiceWorker
 */
class ServiceWorker {
    /**
     * Environment
     *
     * @type {string}
     */
    environment = 'production';

    /**
     * Cache name
     *
     * @type {string}
     */
    cacheName = 'hacktoberfest-finder';

    /**
     * Offline URL
     *
     * @type {string}
     */
    offlineUrl = '/offline.html';

    /**
     * Files to cache
     *
     * @type {string[]}
     */
    filesToCache = [this.offlineUrl];

    constructor() {
        if (typeof environment !== 'undefined') {
            this.environment = environment;
        }

        if (this.environment === 'production') {
            console.log = function () {};
        }
    }

    /**
     * Install event handler
     *
     * @param {ExtendableEvent} event
     */
    handleInstall(event) {
        console.log('[ServiceWorker] Install', 'color: green');
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
        console.log('[ServiceWorker] Activate', 'color: blue');
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
        console.log('[ServiceWorker] Fetch', event.request.url, 'color: orange');
        if (event.request.mode === 'navigate') {
            console.warn('[ServiceWorker] Serving offline page for navigation request', 'color: orange');
            event.respondWith(
                fetch(event.request).catch(() => caches.match(this.offlineUrl))
            );
        } else {
            console.log('[ServiceWorker] Fetching resource', event.request.url);
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
