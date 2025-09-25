'use client';

import { useEffect, useState } from 'react';

export function SimpleSplash() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);
    setShow(true);
    
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !show) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center z-50">
      <div className="text-center text-white">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 p-4 backdrop-blur-sm">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Portal Esotérico</h1>
        <p className="text-purple-200 mb-8">Conselhos e Orientação Espiritual</p>
        <div className="w-48 h-1 bg-purple-700 rounded-full mx-auto mb-4">
          <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
        </div>
        <p className="text-purple-300 text-sm">Desenvolvido por Alex Developer</p>
      </div>
    </div>
  );
}