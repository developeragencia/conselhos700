// Force cache clear
const timestamp = Date.now();
console.log('FORCE RELOAD - TIMESTAMP:', timestamp);

// Clear all caches
if ('caches' in window) {
  caches.keys().then(names => {
    names.forEach(name => {
      caches.delete(name);
    });
  });
}

// Clear localStorage
localStorage.clear();
sessionStorage.clear();

// Reload without cache
window.location.reload(true);