'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SplashWrapperProps {
  children: React.ReactNode;
}

export function SplashWrapper({ children }: SplashWrapperProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowSplash(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {showSplash && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center z-50">
          <div className="text-center px-4">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/20 p-4 backdrop-blur-sm">
                <Image
                  src="/CONSELHOS_20250521_110746_0000.png"
                  alt="Portal Esotérico"
                  width={120}
                  height={120}
                  className="mx-auto rounded-full"
                  priority
                />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Portal Esotérico</h1>
              <p className="text-purple-200 text-lg">Conselhos e Orientação Espiritual</p>
            </div>
            <div className="mb-8">
              <div className="w-64 h-2 bg-purple-700 rounded-full mx-auto mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-purple-200 text-sm">{Math.round(progress)}% carregado</p>
            </div>
            <div className="flex justify-center space-x-4 mb-8">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <p className="text-purple-300 text-sm opacity-80">
              Desenvolvido por Alex Developer
            </p>
          </div>
        </div>
      )}
      {children}
    </>
  );
}