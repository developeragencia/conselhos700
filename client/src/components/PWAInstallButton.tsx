import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA instalado com sucesso');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setTimeout(() => {
      setShowPrompt(true);
    }, 60000);
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-2xl p-4 max-w-sm animate-in slide-in-from-bottom-5"
      data-testid="pwa-install-prompt"
    >
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
        data-testid="button-dismiss-pwa"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <Download className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Instalar App</h3>
          <p className="text-sm text-white/90 mb-3">
            Instale nosso app para acesso rápido e funcionalidades offline!
          </p>
          <Button
            onClick={handleInstall}
            className="w-full bg-white text-purple-600 hover:bg-white/90"
            data-testid="button-install-pwa"
          >
            Instalar Agora
          </Button>
        </div>
      </div>
    </div>
  );
}

export function PWAInstallButtonHeader() {
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setCanInstall(true);
      
      (window as any).deferredPrompt = e;
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    const deferredPrompt = (window as any).deferredPrompt;
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA instalado com sucesso');
    }

    (window as any).deferredPrompt = null;
    setCanInstall(false);
  };

  if (!canInstall) return null;

  return (
    <Button
      onClick={handleInstall}
      variant="ghost"
      size="sm"
      className="gap-2"
      data-testid="button-install-app-header"
    >
      <Download className="w-4 h-4" />
      <span className="hidden sm:inline">Instalar App</span>
    </Button>
  );
}
