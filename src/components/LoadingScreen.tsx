import type React from "react";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Memoizar posições para evitar problemas de hidratação
  const backgroundElements = useMemo(() => {
    const elements = [];
    const serviceIcons = [
      { icon: "🔮", name: "Tarot" },
      { icon: "⭐", name: "Astrologia" },
      { icon: "🧿", name: "Oráculos" },
      { icon: "🌙", name: "Mediunidade" },
      { icon: "🔢", name: "Numerologia" },
      { icon: "✨", name: "Reiki" },
      { icon: "💎", name: "Cristais" },
      { icon: "🌿", name: "Runas" },
      { icon: "🦋", name: "Terapias" },
      { icon: "🎴", name: "Cartomancia" },
      { icon: "🌟", name: "Energia" },
      { icon: "🕯️", name: "Rituais" }
    ];

    // Criar elementos de fundo com posições fixas
    for (let i = 0; i < serviceIcons.length; i++) {
      for (let j = 0; j < 6; j++) {
        elements.push({
          key: `${serviceIcons[i].name}-${j}`,
          icon: serviceIcons[i].icon,
          top: `${(Math.sin(i + j * 2) * 40) + 50}%`,
          left: `${(Math.cos(i + j * 3) * 45) + 50}%`,
          delay: i * 0.3 + j * 0.5,
          duration: 8 + (i * 0.5)
        });
      }
    }

    // Criar partículas com posições fixas
    for (let i = 0; i < 15; i++) {
      elements.push({
        key: `particle-${i}`,
        type: 'particle',
        top: `${(i * 7) % 100}%`,
        left: `${(i * 13) % 100}%`,
        duration: 4 + (i % 3),
        delay: (i % 4) * 0.5
      });
    }

    // Criar orbes com posições fixas
    for (let i = 0; i < 8; i++) {
      elements.push({
        key: `orb-${i}`,
        type: 'orb',
        top: `${(i * 12) % 100}%`,
        left: `${(i * 17) % 100}%`,
        duration: 8 + (i % 4),
        delay: (i % 3) * 0.7
      });
    }

    return elements;
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);



  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1500);
          return 100;
        }
        return prev + 0.8;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-purple-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.5, exit: { duration: 0.8 } }}
      >
        {/* Background pattern with small transparent icons */}
        <div className="absolute inset-0 overflow-hidden">
          {backgroundElements.filter(el => !el.type).map((element) => (
            <motion.div
              key={element.key}
              className="absolute text-2xl opacity-10 text-purple-400"
              style={{
                top: element.top,
                left: element.left,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.05, 0.1, 0.05],
                scale: [0, 1, 1.1, 1],
                rotate: [0, 360],
                y: [0, -30, 0]
              }}
              transition={{
                duration: element.duration,
                delay: element.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }}
            >
              {element.icon}
            </motion.div>
          ))}
        </div>

        {/* Subtle floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {backgroundElements.filter(el => el.type === 'particle').map((element) => (
            <motion.div
              key={element.key}
              className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30"
              style={{
                top: element.top,
                left: element.left,
              }}
              animate={{
                y: [0, -200],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: element.duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: element.delay,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center text-gray-800 max-w-lg mx-auto px-4 sm:px-6">
          {/* Logo */}
          <motion.div
            className="mb-8 sm:mb-12"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="relative w-64 sm:w-72 mx-auto max-w-[90vw]"
              animate={{ 
                filter: [
                  "drop-shadow(0 0 20px rgba(255,255,255,0.2))",
                  "drop-shadow(0 0 30px rgba(138,43,226,0.4))",
                  "drop-shadow(0 0 20px rgba(255,255,255,0.2))"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <Image
                src="/CONSELHOS_20250521_110746_0000.png"
                alt="Conselhos Esotéricos"
                width={288}
                height={144}
                className="w-full h-auto mx-auto"
                style={{ width: 'auto', height: 'auto' }}
                priority
                onError={() => {
                  // Fallback text if image fails to load
                  console.log("Logo failed to load");
                }}
              />
            </motion.div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-64 sm:w-80 mx-auto bg-purple-100 rounded-full h-2 overflow-hidden backdrop-blur-sm border border-purple-200">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-full"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ 
                  width: `${progress}%`,
                  backgroundPosition: ["0% 0%", "100% 0%"]
                }}
                transition={{ 
                  width: { duration: 0.3 },
                  backgroundPosition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
                }}
              />
            </div>
            <motion.p 
              className="text-sm mt-3 font-light text-purple-600"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Carregando... {Math.round(progress)}%
            </motion.p>
          </motion.div>

          {/* Loading message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.p
              className="text-base sm:text-lg font-light text-purple-700 mb-2"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
            >
              Preparando sua jornada espiritual
            </motion.p>
            <motion.p
              className="text-xs sm:text-sm text-purple-500 opacity-70"
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            >
              Conectando com as energias do universo
            </motion.p>
            <motion.p
              className="text-xs text-purple-400 opacity-60 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 2 }}
            >
              Desenvolvido por Alex Developer
            </motion.p>
          </motion.div>
        </div>

        {/* Subtle pulse effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-purple-500/10 to-transparent"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.05, 0.2] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        
        {/* Purple floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {backgroundElements.filter(el => el.type === 'orb').map((element) => (
            <motion.div
              key={element.key}
              className="absolute w-20 h-20 bg-purple-300/20 rounded-full blur-xl"
              style={{
                top: element.top,
                left: element.left,
              }}
              animate={{
                x: [0, 100, -100, 0],
                y: [0, -100, 100, 0],
                scale: [0.5, 1.2, 0.8, 0.5],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: element.duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: element.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};