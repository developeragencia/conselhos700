const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `conselhos-esotericos-${CACHE_VERSION}`;
const API_CACHE = `conselhos-api-${CACHE_VERSION}`;

// Assets to cache on install
const urlsToCache = [
  '/',
  '/logo.png',
  '/manifest.json',
  '/offline.html'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Strategy: Network First, fallback to Cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API calls - Network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(API_CACHE).then((cache) => {
        return fetch(request)
          .then((response) => {
            // Cache successful responses
            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => {
            // Return cached version if network fails
            return cache.match(request);
          });
      })
    );
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful navigation responses
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Return offline page if navigation fails
          return caches.match('/offline.html').then((cachedResponse) => {
            return cachedResponse || caches.match('/');
          });
        })
    );
    return;
  }

  // Handle static assets - Cache first
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });

          return response;
        });
      })
  );
});

// Background Sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'sync-consultations') {
    event.waitUntil(syncConsultations());
  }
  
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

// Push Notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Conselhos Esotéricos';
  const options = {
    body: data.body || 'Nova atualização disponível',
    icon: '/logo.png',
    badge: '/logo.png',
    vibrate: [200, 100, 200],
    data: data.data || {},
    actions: data.actions || [
      {
        action: 'open',
        title: 'Abrir'
      },
      {
        action: 'close',
        title: 'Fechar'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification Click
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  }
});

// Helper functions for background sync
async function syncConsultations() {
  console.log('[SW] Syncing consultations...');
  // Implementation for syncing offline consultations
  return Promise.resolve();
}

async function syncMessages() {
  console.log('[SW] Syncing messages...');
  // Implementation for syncing offline messages
  return Promise.resolve();
}
