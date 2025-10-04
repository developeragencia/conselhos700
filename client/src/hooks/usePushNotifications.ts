import { useState, useEffect } from 'react';

interface PushNotificationState {
  permission: NotificationPermission;
  subscription: PushSubscription | null;
  isSupported: boolean;
}

export function usePushNotifications() {
  const [state, setState] = useState<PushNotificationState>({
    permission: 'default',
    subscription: null,
    isSupported: false
  });

  useEffect(() => {
    const isSupported = 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
    
    setState(prev => ({
      ...prev,
      isSupported,
      permission: isSupported ? Notification.permission : 'denied'
    }));

    if (isSupported && Notification.permission === 'granted') {
      getSubscription();
    }
  }, []);

  const getSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setState(prev => ({ ...prev, subscription }));
      return subscription;
    } catch (error) {
      console.error('Error getting push subscription:', error);
      return null;
    }
  };

  const requestPermission = async () => {
    if (!state.isSupported) {
      throw new Error('Push notifications não são suportadas neste navegador');
    }

    const permission = await Notification.requestPermission();
    setState(prev => ({ ...prev, permission }));

    if (permission === 'granted') {
      await subscribe();
    }

    return permission;
  };

  const subscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      // VAPID public key (você pode gerar em: https://vapidkeys.com/)
      const vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });

      setState(prev => ({ ...prev, subscription }));

      // Enviar subscription para o backend
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });

      return subscription;
    } catch (error) {
      console.error('Error subscribing to push:', error);
      throw error;
    }
  };

  const unsubscribe = async () => {
    if (!state.subscription) return;

    try {
      await state.subscription.unsubscribe();
      
      // Remover subscription do backend
      await fetch('/api/push/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: state.subscription.endpoint })
      });

      setState(prev => ({ ...prev, subscription: null }));
    } catch (error) {
      console.error('Error unsubscribing from push:', error);
      throw error;
    }
  };

  return {
    permission: state.permission,
    subscription: state.subscription,
    isSupported: state.isSupported,
    requestPermission,
    subscribe,
    unsubscribe
  };
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Helper para enviar ação offline para o Service Worker
export async function queueOfflineAction(actionType: string, actionData: any) {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service Worker não suportado');
  }

  const registration = await navigator.serviceWorker.ready;
  const messageChannel = new MessageChannel();

  return new Promise((resolve, reject) => {
    messageChannel.port1.onmessage = (event) => {
      if (event.data.success) {
        resolve(event.data);
      } else {
        reject(new Error(event.data.error));
      }
    };

    registration.active?.postMessage(
      {
        type: 'QUEUE_ACTION',
        actionType,
        actionData
      },
      [messageChannel.port2]
    );
  });
}
