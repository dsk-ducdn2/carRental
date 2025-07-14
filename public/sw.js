const CACHE_NAME = 'carrental-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/manifest.json',
  '/offline.html',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// API endpoints to cache
const API_CACHE = [
  '/api/cars',
  '/api/cars/featured',
  '/api/user/profile'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Static files cached');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }
  
  // Handle static files
  if (request.method === 'GET') {
    event.respondWith(handleStaticRequest(request));
    return;
  }
  
  // For other requests, use network first
  event.respondWith(fetch(request));
});

// Handle API requests with cache-first strategy
async function handleApiRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache the response
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('Network failed for API request:', request.url);
  }
  
  // Fallback to cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Return offline response for API requests
  return new Response(
    JSON.stringify({ 
      error: 'No internet connection',
      message: 'Please check your connection and try again'
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

// Handle static requests with cache-first strategy
async function handleStaticRequest(request) {
  // Check cache first
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // Try network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache the response for future use
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('Network failed for static request:', request.url);
  }
  
  // Return offline page for HTML requests
  if (request.headers.get('accept')?.includes('text/html')) {
    return caches.match('/offline.html');
  }
  
  // Return empty response for other static files
  return new Response('', { status: 404 });
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Bạn có thông báo mới từ CarRental',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Xem chi tiết',
        icon: '/icons/icon-72x72.png'
      },
      {
        action: 'close',
        title: 'Đóng',
        icon: '/icons/icon-72x72.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('CarRental', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  }
});

// Background sync function
async function doBackgroundSync() {
  try {
    // Sync offline data when connection is restored
    const offlineData = await getOfflineData();
    
    for (const data of offlineData) {
      try {
        await fetch(data.url, {
          method: data.method,
          headers: data.headers,
          body: data.body
        });
        
        // Remove from offline storage after successful sync
        await removeOfflineData(data.id);
      } catch (error) {
        console.log('Failed to sync offline data:', error);
      }
    }
  } catch (error) {
    console.log('Background sync failed:', error);
  }
}

// Helper functions for offline data management
async function getOfflineData() {
  // This would typically use IndexedDB
  // For now, return empty array
  return [];
}

async function removeOfflineData(id) {
  // Remove data from offline storage
  console.log('Removing offline data:', id);
}

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
}); 