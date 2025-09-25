import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const bannerSlides = [
  {
    id: 1,
    title: "Conecte-se com o Espiritual",
    subtitle: "Portal de Consultas Místicas",
    description: "Orientação espiritual autêntica com nossos consultores especializados",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=480&fit=crop",
    buttonText: "Encontrar Consultor",
    buttonLink: "/consultores"
  },
  {
    id: 2,
    title: "Tarot Grátis Disponível",
    subtitle: "Leitura Online Imediata",
    description: "Descubra insights sobre seu futuro com nossa ferramenta de Tarot gratuita",
    imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=1920&h=480&fit=crop",
    buttonText: "Jogar Tarot",
    buttonLink: "/tarot-gratis"
  },
  {
    id: 3,
    title: "Especialistas Certificados",
    subtitle: "Qualidade Garantida",
    description: "Consultores experientes prontos para guiar você em sua jornada espiritual",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=480&fit=crop",
    buttonText: "Ver Consultores",
    buttonLink: "/consultores"
  }
];

export function BasicBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timestamp = Date.now(); // Force cache break

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const currentBanner = bannerSlides[currentSlide];

  return (
    <section className="relative h-[480px] overflow-hidden bg-gradient-to-r from-purple-900 to-blue-900" data-timestamp={timestamp}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${currentBanner.imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
        <div className="max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white transition-all duration-500">
            {currentBanner.title}
          </h1>
          
          <h2 className="text-xl md:text-2xl mb-3 font-semibold text-yellow-300 transition-all duration-500">
            {currentBanner.subtitle}
          </h2>
          
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-200 transition-all duration-500">
            {currentBanner.description}
          </p>
          
          <div className="flex justify-center">
            <Link href={currentBanner.buttonLink}>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full text-base transition-all duration-300 hover:scale-105 shadow-lg">
                {currentBanner.buttonText}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navegação com setas */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicadores de slides */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}