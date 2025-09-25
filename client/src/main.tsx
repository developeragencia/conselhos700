import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="sensitivos-theme">
    <App />
  </ThemeProvider>
);

// COMPLETELY REMOVE SERVICE WORKER - CAUSING CACHE ISSUES
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
      console.log('Service Worker removido:', registration.scope);
    }
  });
}

// Clear all caches
if ('caches' in window) {
  caches.keys().then(function(names) {
    for (let name of names) {
      caches.delete(name);
      console.log('Cache removido:', name);
    }
  });
}

console.log('CACHE TOTALMENTE LIMPO - LOGIN/CADASTRO DELETADOS - ' + Date.now());
