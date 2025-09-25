// Force refresh and clear cache
window.addEventListener('load', function() {
  // Clear all possible caches
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for(let registration of registrations) {
        registration.unregister();
      }
    });
  }
  
  if ('caches' in window) {
    caches.keys().then(function(names) {
      for (let name of names) {
        caches.delete(name);
      }
    });
  }
  
  // Force hard refresh
  if (performance.navigation.type !== 1) {
    window.location.reload(true);
  }
});