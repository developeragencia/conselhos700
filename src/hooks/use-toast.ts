import { useState, useCallback } from 'react';

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  className?: string;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback((props: ToastProps) => {
    // Simple toast implementation - just show console for now
    console.log('Toast:', props);
    
    // For now, just use browser alert as fallback
    if (typeof window !== 'undefined') {
      const message = props.title + (props.description ? ': ' + props.description : '');
      // Use a simple notification instead of alert
      console.log('🔔 Toast:', message);
    }
    
    setToasts(prev => [...prev, props]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.slice(1));
    }, 3000);
  }, []);

  return {
    toast,
    toasts,
    dismiss: () => setToasts([])
  };
};

export const toast = (props: ToastProps) => {
  console.log('Toast:', props);
  if (typeof window !== 'undefined') {
    const message = props.title + (props.description ? ': ' + props.description : '');
    console.log('🔔 Toast:', message);
  }
};