'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { FinalLoadingScreen } from './FinalLoadingScreen';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show loading screen for all visits
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setShowContent(true);
      }, 300);
    }, 4000); // 4 segundos de splash screen
    
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  };

  return (
    <>
      {isLoading && <FinalLoadingScreen onComplete={handleLoadingComplete} />}
      {showContent && children}
    </>
  );
}