'use client';

import { useState, useEffect } from 'react';

export function useLoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 300);
  };

  useEffect(() => {
    // Prevent showing loading screen again if already loaded
    const hasLoaded = sessionStorage.getItem('app-loaded');
    if (hasLoaded) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  useEffect(() => {
    if (showContent) {
      sessionStorage.setItem('app-loaded', 'true');
    }
  }, [showContent]);

  return {
    isLoading,
    showContent,
    handleLoadingComplete
  };
}