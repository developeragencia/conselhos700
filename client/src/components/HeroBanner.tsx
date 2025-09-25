import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Users, Clock } from "lucide-react";
import { Link } from "wouter";

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  primaryButton: {
    text: string;
    link: string;
    style: "primary" | "secondary";
  };
  secondaryButton: {
    text: string;
    link: string;
    style: "primary" | "secondary";
  };
  stats: {
    clients: string;
    consultants: string;
    availability: string;
  };
}

const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    title: "Descubra seu",
    subtitle: "Caminho Espiritual",
    description: "Conecte-se com nossos consultores espirituais para orientação em amor, carreira, saúde e muito mais. Receba insights que transformarão sua vida.",
    backgroundImage: "https://pixabay.com/get/g5c6e4096553c680ef59ea1d37428b6e79aeade0af937ddc1dcde8d5ff56546aaaf2692113060ce457f73fdf627c5666cd8b4b2ee217aa2b84303fbb2d3a59efa_1280.jpg",
    primaryButton: {
      text: "Consultar Agora",
      link: "/consultores",
      style: "primary"
    },
    secondaryButton: {
      text: "Tarot Grátis",
      link: "/tarot-gratis",
      style: "secondary"
    },
    stats: {
      clients: "5.000+",
      consultants: "50+",
      availability: "24/7"
    }
  },
  {
    id: 2,
    title: "Transforme sua",
    subtitle: "Vida Hoje",
    description: "Nossos especialistas em tarô, astrologia e mediunidade estão prontos para guiá-lo. Encontre respostas para suas questões mais profundas.",
    backgroundImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    primaryButton: {
      text: "Ver Consultores",
      link: "/consultores",
      style: "primary"
    },
    secondaryButton: {
      text: "Serviços",
      link: "/servicos/tarot",
      style: "secondary"
    },
    stats: {
      clients: "5.000+",
      consultants: "50+",
      availability: "24/7"
    }
  },
  {
    id: 3,
    title: "Orientação",
    subtitle: "Espiritual Completa",
    description: "Desde leituras de tarô até terapias holísticas. Nossa plataforma oferece uma gama completa de serviços para seu crescimento espiritual.",
    backgroundImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    primaryButton: {
      text: "Começar Agora",
      link: "/cadastre-se",
      style: "primary"
    },
    secondaryButton: {
      text: "Conhecer Mais",
      link: "/quem-somos",
      style: "secondary"
    },
    stats: {
      clients: "5.000+",
      consultants: "50+",
      availability: "24/7"
    }
  }
];

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentSlideData = bannerSlides[currentSlide];

  return (
    <section className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${currentSlideData.backgroundImage}')` }}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80"></div>
          
          {/* Floating mystical elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => {
              const size = Math.random() * 40 + 20;
              const isSmall = size < 40;
              const symbols = ['✦', '✧', '◊', '○', '◇', '☽', '☾', '✺', '❋', '✹'];
              return (
                <motion.div
                  key={i}
                  className={`absolute text-white/10 ${isSmall ? 'hidden md:block' : ''}`}
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    fontSize: `${size}px`,
                    rotate: `${Math.random() * 360}deg`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.6, 0],
                    y: [-20, -40, -60],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }}
                >
                  {symbols[Math.floor(Math.random() * symbols.length)]}
                </motion.div>
              );
            })}
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-4xl">
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white"
              >
                {/* Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6"
                >
                  Despertar Espiritual
                </motion.div>

                {/* Title */}
                <motion.h1 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight"
                >
                  {currentSlideData.title}{" "}
                  <span className="text-yellow-300">
                    {currentSlideData.subtitle}
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-2xl leading-relaxed text-white/90"
                >
                  {currentSlideData.description}
                </motion.p>

                {/* Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
                >
                  <Link 
                    href={currentSlideData.primaryButton.link}
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg group text-sm sm:text-base"
                  >
                    {currentSlideData.primaryButton.text}
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  
                  <Link 
                    href={currentSlideData.secondaryButton.link}
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 hover:border-white/50 text-white font-semibold rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                  >
                    ★ {currentSlideData.secondaryButton.text}
                  </Link>
                </motion.div>

                {/* Stats - Responsivo para Mobile */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="grid grid-cols-3 gap-3 sm:gap-6 text-white/90 max-w-sm sm:max-w-none"
                >
                  <div className="text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-1">
                      <div className="p-1.5 sm:p-2 bg-white/20 rounded-full backdrop-blur-sm">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-lg sm:text-xl md:text-2xl font-bold">{currentSlideData.stats.clients}</div>
                    </div>
                    <div className="text-xs sm:text-sm opacity-80">Clientes</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-1">
                      <div className="p-1.5 sm:p-2 bg-white/20 rounded-full backdrop-blur-sm">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-lg sm:text-xl md:text-2xl font-bold">{currentSlideData.stats.consultants}</div>
                    </div>
                    <div className="text-xs sm:text-sm opacity-80">Consultores</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-1">
                      <div className="p-1.5 sm:p-2 bg-white/20 rounded-full backdrop-blur-sm">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-lg sm:text-xl md:text-2xl font-bold">{currentSlideData.stats.availability}</div>
                    </div>
                    <div className="text-xs sm:text-sm opacity-80">Disponível</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>



      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-yellow-400 scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play control */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-6 right-6 z-20 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all duration-300"
        aria-label={isAutoPlaying ? "Pause auto-play" : "Resume auto-play"}
      >
        {isAutoPlaying ? "⏸" : "▶"}
      </button>
    </section>
  );
};