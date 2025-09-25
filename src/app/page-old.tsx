"use client";

import { Facebook, Twitter, Instagram, Music, MessageCircle, Mail, Phone, Clock, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ClientOnly from "@/components/ClientOnly";

// Carregar HeroCarousel apenas no cliente para evitar problemas de hidratação
const HeroCarousel = dynamic(() => import("@/components/HeroCarousel"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Portal Esotérico</h1>
        <p className="text-xl">Carregando...</p>
      </div>
    </div>
  ),
});

export default function Home() {

  // Animações de scroll implementadas diretamente no componente
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Aguarda um pouco para garantir que o DOM esteja totalmente carregado
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);

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





  return (
    <div className="min-h-screen">
      {/* Top Header with Contact Info */}
      <div className="bg-dark-blue text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-gold transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Music size={16} />
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <span>+55 11 95165-3210</span>
            <span>24 Horas por Dia</span>
            <span>contato@conselhosesotericos.com.br</span>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://ext.same-assets.com/741558681/155226442.png"
              alt="Conselhos Esotéricos Logo"
              className="h-16"
            />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-primary font-medium">HOME</a>
            <div className="relative group">
              <a href="#" className="text-gray-700 hover:text-primary font-medium">PROFISSIONAIS</a>
            </div>
            <a href="#" className="text-gray-700 hover:text-primary font-medium">CRIAR CONTA</a>
            <a href="#" className="text-gray-700 hover:text-primary font-medium">ENTRAR</a>
            <a href="#" className="text-gray-700 hover:text-primary">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Carousel */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <HeroCarousel slides={heroSlides} />
      </section>

      {/* Service Cards Section */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Consultas Online */}
            <div className="bg-dark-blue text-white rounded-lg p-8 text-center">
              <div className="mb-6">
                <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto text-gold" fill="currentColor">
                  <path d="M30 5L37 20H55L41 30L47 45L30 35L13 45L19 30L5 20H23L30 5Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 font-raleway">Consultas OnLine</h3>
              <p className="text-sm mb-6 leading-relaxed">
                Tarológos, Videntes, Cartomantes, Terapeutas, Numerólogos e Outros.
                Faça suas previsões com um de nossos profissionais no sigilo!
              </p>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-dark-blue"
              >
                Saiba mais
              </Button>
            </div>

            {/* Tarot Grátis */}
            <div className="bg-dark-blue text-white rounded-lg p-8 text-center">
              <div className="mb-6">
                <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto text-gold" fill="currentColor">
                  <rect x="15" y="10" width="30" height="40" rx="2"/>
                  <rect x="10" y="15" width="40" height="30" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 font-raleway">Tarot Grátis</h3>
              <p className="text-sm mb-6 leading-relaxed">
                Faça uma Consulta de Tarot Grátis e veja o que as cartas podem dizer para você.
                Se precisar de algo mais detalhado, chame nossos consultores!
              </p>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-dark-blue"
              >
                Saiba mais
              </Button>
            </div>

            {/* Horoscopo Grátis */}
            <div className="bg-dark-blue text-white rounded-lg p-8 text-center">
              <div className="mb-6">
                <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto text-gold" fill="currentColor">
                  <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="30" cy="30" r="3"/>
                  <line x1="30" y1="5" x2="30" y2="15" stroke="currentColor" strokeWidth="2"/>
                  <line x1="30" y1="45" x2="30" y2="55" stroke="currentColor" strokeWidth="2"/>
                  <line x1="5" y1="30" x2="15" y2="30" stroke="currentColor" strokeWidth="2"/>
                  <line x1="45" y1="30" x2="55" y2="30" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 font-raleway">Horoscopo Grátis</h3>
              <p className="text-sm mb-6 leading-relaxed">
                Consulte seu horóscopo gratuitamente e com segurança e
                receba respostas e conselhos agora mesmo...
              </p>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-dark-blue"
              >
                Saiba mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Tarológos Section */}
      <section id="consultores" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-dark-blue font-raleway">
            NOSSOS TAROLÓGOS
          </h2>

          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Fabianna */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src="https://ext.same-assets.com/741558681/3228089916.jpeg"
                  alt="Fabianna"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-center text-dark-blue mb-3">Fabianna</h3>
                <div className="flex justify-center space-x-2 mb-3">
                  <MessageCircle size={16} className="text-gray-400" />
                  <Mail size={16} className="text-gray-400" />
                  <Phone size={16} className="text-gray-400" />
                  <Clock size={16} className="text-gray-400" />
                </div>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-500">(5.0)</span>
                </div>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white mb-2">
                  Em Atendimento
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-dark-blue border-dark-blue"
                  onClick={() => { window.location.href = '/consultor/fabianna'; }}
                >
                  Perfil Completo
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Faça sua consulta e avalie este consultor!
                </p>
              </div>
            </div>

            {/* AnnaFreya */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src="https://ext.same-assets.com/741558681/540868604.png"
                  alt="AnnaFreya"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-center text-dark-blue mb-3">AnnaFreya</h3>
                <div className="flex justify-center space-x-2 mb-3">
                  <MessageCircle size={16} className="text-gray-400" />
                  <Mail size={16} className="text-gray-400" />
                  <Phone size={16} className="text-gray-400" />
                  <Clock size={16} className="text-gray-400" />
                </div>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-500">(4.8)</span>
                </div>
                <Button className="w-full bg-green hover:bg-green/90 text-white mb-2">
                  Iniciar Consulta
                </Button>
                <Button variant="outline" className="w-full text-dark-blue border-dark-blue">
                  Perfil Completo
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Faça sua consulta e avalie este consultor!
                </p>
              </div>
            </div>

            {/* Mistica */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src="https://ext.same-assets.com/741558681/2974534442.jpeg"
                  alt="Mistica"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-center text-dark-blue mb-3">Mistica</h3>
                <div className="flex justify-center space-x-2 mb-3">
                  <MessageCircle size={16} className="text-gray-400" />
                  <Mail size={16} className="text-gray-400" />
                  <Phone size={16} className="text-gray-400" />
                  <Clock size={16} className="text-gray-400" />
                </div>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-500">(4.8)</span>
                </div>
                <Button className="w-full bg-green hover:bg-green/90 text-white mb-2">
                  Iniciar Consulta
                </Button>
                <Button variant="outline" className="w-full text-dark-blue border-dark-blue">
                  Perfil Completo
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Faça sua consulta e avalie este consultor!
                </p>
              </div>
            </div>

            {/* Atena */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src="https://ext.same-assets.com/741558681/2766538643.png"
                  alt="Atena"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-center text-dark-blue mb-3">Atena</h3>
                <div className="flex justify-center space-x-2 mb-3">
                  <MessageCircle size={16} className="text-gray-400" />
                  <Mail size={16} className="text-gray-400" />
                  <Phone size={16} className="text-gray-400" />
                  <Clock size={16} className="text-gray-400" />
                </div>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-500">(4.8)</span>
                </div>
                <Button className="w-full bg-green hover:bg-green/90 text-white mb-2">
                  Iniciar Consulta
                </Button>
                <Button variant="outline" className="w-full text-dark-blue border-dark-blue">
                  Perfil Completo
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Faça sua consulta e avalie este consultor!
                </p>
              </div>
            </div>

            {/* Second row of consultants */}
            {/* Samara */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src="https://ext.same-assets.com/741558681/2541829570.jpeg"
                  alt="Samara"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-center text-dark-blue mb-3">Samara</h3>
                <div className="flex justify-center space-x-2 mb-3">
                  <MessageCircle size={16} className="text-gray-400" />
                  <Mail size={16} className="text-gray-400" />
                  <Phone size={16} className="text-gray-400" />
                  <Clock size={16} className="text-gray-400" />
                </div>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-500">(4.8)</span>
                </div>
                <Button className="w-full bg-green hover:bg-green/90 text-white mb-2">
                  Iniciar Consulta
                </Button>
                <Button variant="outline" className="w-full text-dark-blue border-dark-blue">
                  Perfil Completo
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Faça sua consulta e avalie este consultor!
                </p>
              </div>
            </div>

            {/* CiganaEsmeralda */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src="https://ext.same-assets.com/741558681/1836267069.jpeg"
                  alt="CiganaEsmeralda"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-center text-dark-blue mb-3">CiganaEsmeralda</h3>
                <div className="flex justify-center space-x-2 mb-3">
                  <MessageCircle size={16} className="text-gray-400" />
                  <Mail size={16} className="text-gray-400" />
                  <Phone size={16} className="text-gray-400" />
                  <Clock size={16} className="text-gray-400" />
                </div>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-500">(4.8)</span>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white mb-2">
                  Estou Ausente
                </Button>
                <Button variant="outline" className="w-full text-dark-blue border-dark-blue">
                  Perfil Completo
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Faça sua consulta e avalie este consultor!
                </p>
              </div>
            </div>

            {/* LumenaMedium */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src="https://ext.same-assets.com/741558681/1112136021.jpeg"
                  alt="LumenaMedium"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-center text-dark-blue mb-3">LumenaMedium</h3>
                <div className="flex justify-center space-x-2 mb-3">
                  <MessageCircle size={16} className="text-gray-400" />
                  <Mail size={16} className="text-gray-400" />
                  <Phone size={16} className="text-gray-400" />
                  <Clock size={16} className="text-gray-400" />
                </div>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-500">(4.8)</span>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white mb-2">
                  Estou Ausente
                </Button>
                <Button variant="outline" className="w-full text-dark-blue border-dark-blue">
                  Perfil Completo
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Faça sua consulta e avalie este consultor!
                </p>
              </div>
            </div>

            {/* Margot */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src="https://ext.same-assets.com/741558681/606992999.jpeg"
                  alt="Margot"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-center text-dark-blue mb-3">Margot</h3>
                <div className="flex justify-center space-x-2 mb-3">
                  <MessageCircle size={16} className="text-gray-400" />
                  <Mail size={16} className="text-gray-400" />
                  <Phone size={16} className="text-gray-400" />
                  <Clock size={16} className="text-gray-400" />
                </div>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-500">(4.8)</span>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white mb-2">
                  Estou Ausente
                </Button>
                <Button variant="outline" className="w-full text-dark-blue border-dark-blue">
                  Perfil Completo
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Faça sua consulta e avalie este consultor!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products & Services Section */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-dark-blue font-raleway">
            NOSSOS PRODUTOS & SERVIÇOS
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
            {/* Mesa Radiônica */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://ext.same-assets.com/741558681/2787777895.png"
                alt="Mesa Radiônica"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3 font-raleway">Mesa Radiônica</h3>
                <p className="text-sm text-gray-600 mb-4">
                  A mesa objetivo limpezas das cargas emocionais, padrões mentais e até mesmo as questões relaciona
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green mb-3">R$ 150.00</div>
                  <Button className="bg-green hover:bg-green/90 text-white">
                    EU QUERO
                  </Button>
                </div>
              </div>
            </div>

            {/* Florais de Saint Germain */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://ext.same-assets.com/741558681/3151472218.png"
                alt="Florais de Saint Germain"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3 font-raleway">Florais de Saint Germain</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Os florais de Saint Germain são agentes equilibradores.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green mb-3">R$ 40.00</div>
                  <Button className="bg-green hover:bg-green/90 text-white">
                    EU QUERO
                  </Button>
                </div>
              </div>
            </div>

            {/* Numerologia + Mandala */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://ext.same-assets.com/741558681/1335381501.jpeg"
                alt="Numerologia + Mandala"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3 font-raleway">Numerologia + Mandala</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Consulta completa por email que incluir leitura, numerologia e mandala específica
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green mb-3">R$ 180.00</div>
                  <Button className="bg-green hover:bg-green/90 text-white">
                    EU QUERO
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              className="bg-green hover:bg-green/90 text-white px-8 py-3"
            >
              MAIS PRODUTOS
            </Button>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-dark-blue font-raleway">
            COMO FUNCIONA
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Escolha o Profissional que deseja. Adquira créditos e utilize em minutos de atendimento por
            chat ou e-mail.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 40 40" className="text-white" fill="currentColor">
                  <path d="M20 4C12.27 4 6 10.27 6 18s6.27 14 14 14 14-6.27 14-14S27.73 4 20 4zm0 6c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 20c-3.33 0-6.3-1.7-8.03-4.29 2.03-2.03 4.83-3.29 8.03-3.29s6 1.26 8.03 3.29C26.3 28.3 23.33 30 20 30z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-burgundy mb-2 font-raleway">REGISTRE-SE</h3>
              <p className="text-lg font-bold text-burgundy font-raleway">OU FAÇA LOGIN</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex justify-center items-center">
              <svg width="60" height="30" viewBox="0 0 60 30" className="text-burgundy" fill="currentColor">
                <path d="M40 10L50 15L40 20V16H10V14H40V10Z"/>
              </svg>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 40 40" className="text-white" fill="currentColor">
                  <path d="M20 4C12.27 4 6 10.27 6 18s6.27 14 14 14 14-6.27 14-14S27.73 4 20 4zm0 6c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 20c-3.33 0-6.3-1.7-8.03-4.29 2.03-2.03 4.83-3.29 8.03-3.29s6 1.26 8.03 3.29C26.3 28.3 23.33 30 20 30z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-burgundy mb-2 font-raleway">ESCOLHA</h3>
              <p className="text-lg font-bold text-burgundy font-raleway">O PROFISSIONAL</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex justify-center items-center">
              <svg width="60" height="30" viewBox="0 0 60 30" className="text-burgundy" fill="currentColor">
                <path d="M40 10L50 15L40 20V16H10V14H40V10Z"/>
              </svg>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 40 40" className="text-white" fill="currentColor">
                  <path d="M32 10H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2zm0 18H8V14h24v14zm-18-8h4v4h-4v-4zm6 0h8v2h-8v-2zm0 4h6v2h-6v-2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-burgundy mb-2 font-raleway">FAÇA O PAGAMENTO</h3>
              <p className="text-lg font-bold text-burgundy font-raleway">E INICIE O ATENDIMENTO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Por Que Conselhos Esotericos Section */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-dark-blue font-raleway">
            POR QUÊ
          </h2>
          <h3 className="text-4xl font-bold text-center mb-8 text-dark-blue font-raleway">
            CONSELHOSESOTERICOS.COM.BR
          </h3>
          <p className="text-center text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Esotéricos de qualidade que atuam com sigilo para te trazer a melhor experiência de uma
            consulta de tarot online. A melhor tecnologia para garantir sua segurança, sigilo e satisfação,
            milhares de atendimentos. Clientes 100% satisfeitos.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Chat Icon */}
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle size={40} className="text-white" />
              </div>
            </div>

            {/* Security Icon */}
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 40 40" className="text-white" fill="currentColor">
                  <path d="M20 4l-8 3v6c0 7.5 5.2 14.5 8 16 2.8-1.5 8-8.5 8-16V7l-8-3zm-2 18h4v-8h-4v8zm0-12h4V8h-4v2z"/>
                </svg>
              </div>
            </div>

            {/* Like Icon */}
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 40 40" className="text-white" fill="currentColor">
                  <path d="M10 18h4v12h-4V18zm14-8c-1.1 0-2 .9-2 2v2h6l-2 10H14V14l6-6c.55 0 1-.45 1-1s-.45-1-1-1H8v2c0 1.1.9 2 2 2v14h16l4-14h-4V12c0-1.1-.9-2-2-2z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-dark-blue font-raleway">
            O que as pessoas dizem
          </h2>
          <h3 className="text-4xl font-bold text-center mb-12 text-dark-blue font-raleway">
            Avaliações & Comentários
          </h3>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-light rounded-lg p-6">
              <div className="flex text-yellow-400 mb-3">
                {[...Array(10)].map((_, i) => (
                  <Heart key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Os melhores conselhos sempre!!!!!! Só amo!"
              </p>
              <p className="text-sm text-gray-500">Consultor(a): Sarah</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-light rounded-lg p-6">
              <div className="flex text-yellow-400 mb-3">
                {[...Array(10)].map((_, i) => (
                  <Heart key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Não abre mais pra mim,ja recebi informação do suporte de que constava minha cinta em atendimento..mas eu não sei destravar. Se for possível solucionar agradeço.."
              </p>
              <p className="text-sm text-gray-500">Consultor(a): Sarah</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-dark-blue font-raleway">
            BLOG CONSELHOSESOTERICOS.COM.BR
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Blog Post 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://ext.same-assets.com/741558681/102035768.jpeg"
                alt="Magias e Mandalas"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3 font-raleway">Magias e Mandalas</h3>
                <h4 className="text-lg font-semibold text-dark-blue mb-3">Desperte a Magia Interior: Mandalas e Magias Divinas para Transformar sua Vida</h4>
                <p className="text-sm text-gray-600 mb-4">
                  No mundo esotérico, Mandalas e Magias Divinas são ferramentas poderosas para harmonizar energias, manifestar desejos e alcançar...
                </p>
                <Button variant="outline" className="text-dark-blue border-dark-blue">
                  Leia mais
                </Button>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://ext.same-assets.com/741558681/2598079403.png"
                alt="Baralho Cigano"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3 font-raleway">Baralho Cigano</h3>
                <h4 className="text-lg font-semibold text-dark-blue mb-3">O Baralho Cigano</h4>
                <p className="text-sm text-gray-600 mb-4">
                  É um conjunto de 36 cartas formadas suas gravuras foram criadas por Madame Lenormard. Sua história e origem têm diversas composições, dep...
                </p>
                <Button variant="outline" className="text-dark-blue border-dark-blue">
                  Leia mais
                </Button>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://ext.same-assets.com/741558681/3940984008.jpeg"
                alt="Setembro - Mês de São Cosme e Damião"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-3 font-raleway">Setembro - Mês de São Cosme e Damião</h3>
                <p className="text-sm text-gray-600 mb-4">
                  A gira de criança ou erê como pode ser chamada envolve muito mais do que doces e balas, tão pouco deve ser vista como uma gira bagunçada onde crianças brincam de forma desenfreada jogando doces nos consulentes ou nos outros m...
                </p>
                <Button variant="outline" className="text-dark-blue border-dark-blue">
                  Leia mais
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative py-16 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://ext.same-assets.com/741558681/3444227698.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo and Social */}
            <div className="md:col-span-1">
              <img
                src="https://ext.same-assets.com/741558681/1860812961.png"
                alt="Conselhos Esotéricos Logo"
                className="h-20 mb-6"
              />
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gold transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="hover:text-gold transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="hover:text-gold transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.030-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.496 14-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-gold transition-colors">
                  <Music size={24} />
                </a>
              </div>
            </div>

            {/* Links Rápidos */}
            <div>
              <h3 className="text-xl font-bold mb-6 font-raleway">Links Rápidos</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-gold transition-colors">ENTRAR</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">CADASTRE-SE</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">PROMOÇÕES</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">NUMEROLOGIA GRÁTIS</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">TAROT GRÁTIS 3 CARTAS</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">HORÓSCOPO</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">SEJA UM CONSULTOR</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">ACESSO CONSULTOR</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xl font-bold mb-6 font-raleway">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-gold transition-colors">PRIVACIDADE</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">TERMOS DE USO</a></li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-xl font-bold mb-6 font-raleway">Formas de Pagamento</h3>
              <div className="flex flex-wrap gap-2">
                <img
                  src="https://ext.same-assets.com/741558681/3317297527.png"
                  alt="Payment Methods"
                  className="h-8"
                />
                <img
                  src="https://ext.same-assets.com/741558681/604810954.png"
                  alt="PayPal"
                  className="h-8"
                />
                <img
                  src="https://ext.same-assets.com/741558681/3516775555.png"
                  alt="Credit Cards"
                  className="h-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-dark-blue mt-8 py-4">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              Copyright ©2018 conselhosesotericos.com.br
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/5511951653210?text=Olá! Gostaria de fazer uma consulta esotérica."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          aria-label="Entre em contato via WhatsApp"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
          </svg>
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden lg:block">
            Fale Conosco
          </span>
        </a>
      </div>
    </div>
  );
}
