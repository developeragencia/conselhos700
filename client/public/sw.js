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

// IndexedDB helpers
const DB_NAME = 'conselhos-offline';
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('pendingActions')) {
        const store = db.createObjectStore('pendingActions', { keyPath: 'id', autoIncrement: true });
        store.createIndex('type', 'type', { unique: false });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
}

async function queueOfflineAction(type, data) {
  const db = await openDB();
  const tx = db.transaction('pendingActions', 'readwrite');
  const store = tx.objectStore('pendingActions');
  
  await store.add({
    type,
    data,
    timestamp: Date.now()
  });
  
  // Try to register background sync
  if ('sync' in self.registration) {
    await self.registration.sync.register(`sync-${type}`);
  }
}

async function getPendingActions(type) {
  const db = await openDB();
  const tx = db.transaction('pendingActions', 'readonly');
  const store = tx.objectStore('pendingActions');
  const index = store.index('type');
  
  return new Promise((resolve, reject) => {
    const request = index.getAll(type);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function removePendingAction(id) {
  const db = await openDB();
  const tx = db.transaction('pendingActions', 'readwrite');
  const store = tx.objectStore('pendingActions');
  await store.delete(id);
}

// Helper functions for background sync
async function syncConsultations() {
  console.log('[SW] Syncing consultations...');
  
  try {
    const pendingActions = await getPendingActions('consultation');
    
    for (const action of pendingActions) {
      try {
        const response = await fetch('/api/consultations/offline-sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(action.data)
        });
        
        if (response.ok) {
          await removePendingAction(action.id);
          console.log('[SW] Synced consultation:', action.id);
        }
      } catch (error) {
        console.error('[SW] Failed to sync consultation:', error);
      }
    }
    
    return Promise.resolve();
  } catch (error) {
    console.error('[SW] Error syncing consultations:', error);
    return Promise.reject(error);
  }
}

async function syncMessages() {
  console.log('[SW] Syncing messages...');
  
  try {
    const pendingActions = await getPendingActions('message');
    
    for (const action of pendingActions) {
      try {
        const response = await fetch('/api/messages/offline-sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(action.data)
        });
        
        if (response.ok) {
          await removePendingAction(action.id);
          console.log('[SW] Synced message:', action.id);
        }
      } catch (error) {
        console.error('[SW] Failed to sync message:', error);
      }
    }
    
    return Promise.resolve();
  } catch (error) {
    console.error('[SW] Error syncing messages:', error);
    return Promise.reject(error);
  }
}

// Expose queue function to clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'QUEUE_ACTION') {
    event.waitUntil(
      queueOfflineAction(event.data.actionType, event.data.actionData)
        .then(() => {
          event.ports[0].postMessage({ success: true });
        })
        .catch((error) => {
          event.ports[0].postMessage({ success: false, error: error.message });
        })
    );
  }
});
