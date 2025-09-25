'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface FinalLoadingScreenProps {
  onComplete: () => void;
}

export function FinalLoadingScreen({ onComplete }: FinalLoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    let completeTimer: NodeJS.Timeout;

    const startProgress = () => {
      progressTimer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            completeTimer = setTimeout(onComplete, 1000);
            return 100;
          }
          return prev + 1;
        });
      }, 40);
    };

    // Start progress after a brief delay
    const initTimer = setTimeout(startProgress, 500);

    return () => {
      clearTimeout(initTimer);
      clearInterval(progressTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-white via-purple-50 to-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative w-64 mx-auto">
            <Image
              src="/CONSELHOS_20250521_110746_0000.png"
              alt="Portal Esotérico"
              width={256}
              height={128}
              className="w-full h-auto"
              priority
            />
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="w-64 mx-auto bg-purple-100 rounded-full h-2">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-purple-600 text-sm mt-2">
            Carregando... {progress}%
          </p>
        </motion.div>

        {/* Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-2"
        >
          <p className="text-purple-700 font-medium">
            Preparando sua jornada espiritual
          </p>
          <p className="text-purple-500 text-sm">
            Conectando com as energias do universo
          </p>
          <p className="text-purple-400 text-xs mt-4">
            Desenvolvido por Alex Developer
          </p>
        </motion.div>
      </div>
    </div>
  );
}