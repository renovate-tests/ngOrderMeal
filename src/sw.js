// import * as axios from './axios';
// const axios = require('./axios.js');

// //http://61.60.30.138/opendata/0d56af62-d124-4d85-b4c0-12160eb07e8e?format=json
// axios('http://61.60.30.138/opendata/0d56af62-d124-4d85-b4c0-12160eb07e8e?format=json')
//     .then((x) => {
//         console.log(x.json());
//     })

var CACHE = 'cache-v1';
var URLS_TO_CACHE = [
    './',
    //   './polyfills.*.js',
    //   './styles.*.js',
    //   './inline.*.js',
    //   './vendor.*.js',
    //   './main.*.js'
];

self.addEventListener('install', function (event) {
    // Ask the service worker to keep installing
    // until the returning promise resolves.
    event.waitUntil(preCache());
});

self.addEventListener('fetch', function (event) {
    // Use respondWith() to answer immediately,
    // without waiting for the network response
    // to reach the service worker…
    event.respondWith(fromCache(event.request));

    // Use `waitUntil()` to prevent the worker to be killed
    // until the cache is updated.
    event.waitUntil(update(event.request));
});

// Open the cache where the assets were stored and search for the requested resource.
// Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
    swLog('searching the cache for ' + request.url);
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching; // || Promise.reject('no-match');
        });
    });
}

// Update opens the cache,
// performs a network request
// and stores the new response data.
function update(request) {
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            swLog('updating the cache with ' + request.url);
            return cache.put(request, response);
        });
    });
}

// Open a cache and use addAll() with an array of assets
// to add all of them to the cache.
// Return a promise resolving when all the assets are added.
function preCache() {
    return caches.open(CACHE).then(function (cache) {
        console.log('Opening cache and adding the following URLs to it', URLS_TO_CACHE);
        return cache.addAll(URLS_TO_CACHE);
    });
}

self.addEventListener('activate', function (event) {
    swLog('activate event fired', event);
    // Let's say we have one cache called 'my-site-cache-v1',
    // and we find that we want to split this out into one cache for
    // pages and one cache for blog posts.This means in the install
    // step we'd create two caches, 'starwars-api-site-cache-v1' and 'some-other-posts-cache - v1'
    // and in the activate step we'd want to delete our older 'my-site-cache-v1'.
    //
    // The following code would do this by looping through all of the
    // caches in the service worker and deleting any caches that
    // aren't defined in the cache whitelist.
    var cacheWhitelist = ['starwars-api-site-cache-v1', 'some-other-posts-cache-v1'];

    // we use waitUntil() to prevent the worker
    // to be killed until the cache is updated.
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


function swLog(eventName, event) {
    console.log('Service Worker - ' + eventName);
    if (event) {
        console.log(event);
    }
}
