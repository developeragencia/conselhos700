"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroSlides = [
  {
    image: 'https://ext.same-assets.com/741558681/1079205720.jpeg',
    subtitle: 'A TUA VIDA ESTÁ UM POUCO BAGUNÇADA?',
    title: 'PODEMOS TE AJUDAR A ENCONTRAR O CAMINHO',
    description: 'e desfrutar do equilíbrio, da paz, o amor e a tranquilidade'
  },
  {
    image: 'https://ext.same-assets.com/741558681/1504434396.jpeg',
    subtitle: 'NOSSOS ESPECIALISTAS TRABALHAM COM SERIEDADE',
    title: 'AMOROSO - PROFISSIONAL - FINANCEIRO',
    description: 'apenas você precisa se permitir ser ajudada(o)'
  },
  {
    image: 'https://ext.same-assets.com/741558681/718683254.jpeg',
    subtitle: 'SE VOCÊ ESTÁ PERDIDO(A) E NÃO SABE QUAL CAMINHO SEGUIR',
    title: 'NOSSOS PROFISSIONAIS ESTÃO ESPERANDO VOCÊ',
    description: 'ajudarão a encontrar a melhor saída para teu problema'
  },
  {
    image: 'https://ext.same-assets.com/741558681/3508602296.jpeg',
    subtitle: 'BEM VINDO AO NOSSO SITE',
    title: 'PROFISSIONAIS COMPROMETIDOS COM VOCÊ',
    description: 'com total sigilo e segurança'
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={currentSlideData.image}
          alt={currentSlideData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
        <div className="max-w-4xl px-4">
          <p className="text-xl md:text-2xl mb-4 opacity-90">{currentSlideData.subtitle}</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{currentSlideData.title}</h1>
          <p className="text-lg md:text-xl mb-8">{currentSlideData.description}</p>
          <Button className="bg-gold hover:bg-gold/90 text-white px-8 py-3 text-lg">
            Consultar Agora
          </Button>
        </div>
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
      >
        <ChevronRight size={24} />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}