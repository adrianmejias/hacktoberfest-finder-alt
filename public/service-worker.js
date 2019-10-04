'use strict';

const config = {
    version: 'haof-2019',
    staticCacheItems: [
        '/',
        '/favicon.ico',
        '/manifest.json',
        '/images/dev.svg',
        '/images/digital-ocean.png',
        '/images/digital-ocean.svg',
        '/images/header.svg',
        '/images/offline.svg',
        '/favicons/android-chrome-192x192.png',
        '/favicons/android-chrome-512x512.png',
        '/favicons/apple-touch-icon.png',
        '/favicons/favicon-16x16.png',
        '/favicons/favicon-32x32.png',
        '/favicons/mstile-150x150.png',
        '/favicons/safari-pinned-tab.svg',
        '/js/app.js',
        '/js/manifest.js',
        '/js/vendor.js',
        '/css/app.css'
    ],
    cachePathPattern: /^\/(?:(20[0-9]{2}|css|images|js|favicons)\/(.+)?)?$/,
    offlineImage: `<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z" /><text fill="#9B9B9B" font-family="Times New Roman,Times,serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>`,
    offlinePage: '/offline/'
};

function cacheName(key, opts) {
    return `${opts.version}-${key}`;
}

function addToCache(cacheKey, request, response) {
    if (response.ok) {
        const copy = response.clone();
        caches.open(cacheKey).then(cache => {
            cache.put(request, copy);
        });
    }
    return response;
}

function fetchFromCache(event) {
    return caches.match(event.request).then(response => {
        if (!response) {
            throw Error(`${event.request.url} not found in cache`);
        }
        return response;
    });
}

function offlineResponse(resourceType, opts) {
    if (resourceType === 'image') {
        return new Response(opts.offlineImage, {
            headers: {
                'Content-Type': 'image/svg+xml'
            }
        });
    } else if (resourceType === 'content') {
        return caches.match(opts.offlinePage);
    }
    return undefined;
}

self.addEventListener('install', event => {
    function onInstall(event, opts) {
        const cacheKey = cacheName('static', opts);
        return caches
            .open(cacheKey)
            .then(cache => cache.addAll(opts.staticCacheItems));
    }

    event.waitUntil(onInstall(event, config).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
    function onActivate(event, opts) {
        return caches.keys().then(cacheKeys => {
            const oldCacheKeys = cacheKeys.filter(
                key => key.indexOf(opts.version) !== 0
            );
            const deletePromises = oldCacheKeys.map(oldKey =>
                caches.delete(oldKey)
            );
            return Promise.all(deletePromises);
        });
    }

    event.waitUntil(onActivate(event, config).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
    function shouldHandleFetch(event, opts) {
        const request = event.request;
        const url = new URL(request.url);
        const criteria = {
            matchesPathPattern: opts.cachePathPattern.test(url.pathname),
            isGETRequest: request.method === 'GET',
            isFromMyOrigin: url.origin === self.location.origin
        };
        const failingCriteria = Object.keys(criteria).filter(
            criteriaKey => !criteria[criteriaKey]
        );
        if (!!failingCriteria.length && request.method === 'GET') {
            if (url.origin !== self.location.origin) {
                if (/fonts\.(googleapis|gstatic)\.com/g.test(request.url)) {
                    return true;
                } else if (/api\.github\.com/g.test(request.url)) {
                    return true;
                }
            } else if (/(mix\-manifest|manifest)\.json/g.test(request.url)) {
                return true;
            }
        }
        return !failingCriteria.length;
    }

    function onFetch(event, opts) {
        const request = event.request;
        const acceptHeader = request.headers.get('Accept');
        const resourceType = ((acceptHeader) => {
            if (acceptHeader.indexOf('html') !== -1) {
                return 'content';
            } else if (acceptHeader.indexOf('json') !== -1) {
                return 'json';
            } else if (acceptHeader.indexOf('image') !== -1) {
                return 'image';
            } else if (acceptHeader.indexOf('font') !== -1) {
                return 'font';
            } else if (acceptHeader.indexOf('css') !== -1) {
                return 'css';
            }
            return 'static';
        })(acceptHeader);
        const cacheKey = cacheName(resourceType, opts);

        if (['content', 'css', 'json', 'font'].includes(resourceType)) {
            event.respondWith(
                fetch(request)
                .then(response => addToCache(cacheKey, request, response))
                .catch(() => fetchFromCache(event))
                .catch(() => offlineResponse(resourceType, opts))
            );
        } else {
            event.respondWith(
                fetchFromCache(event)
                .catch(() => fetch(request))
                .then(response => addToCache(cacheKey, request, response))
                .catch(() => offlineResponse(resourceType, opts))
            );
        }
    }
    if (shouldHandleFetch(event, config)) {
        onFetch(event, config);
    }
});
