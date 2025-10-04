import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Sparkles, Star, Moon, Users, Clock, Award } from "lucide-react";

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  gradient: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    title: "Conecte-se com o Divino",
    subtitle: "Sua Jornada Espiritual Começa Aqui",
    description: "Descubra orientação autêntica com nossos consultores especializados em Tarot, Astrologia e Espiritualidade",
    icon: Sparkles,
    gradient: "from-purple-600 via-blue-600 to-indigo-700",
    buttonText: "Começar Agora",
    buttonLink: "/cadastre-se",
    secondaryButtonText: "Ver Consultores",
    secondaryButtonLink: "/consultores"
  },
  {
    id: 2,
    title: "Tarot Grátis",
    subtitle: "Revelações Imediatas do Universo",
    description: "Descubra os segredos do seu futuro com nossa leitura de Tarot online gratuita",
    icon: Moon,
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    buttonText: "Consultar Tarot",
    buttonLink: "/tarot-gratis",
    secondaryButtonText: "Explorar Serviços",
    secondaryButtonLink: "/servicos/tarot"
  },
  {
    id: 3,
    title: "Consultores Certificados",
    subtitle: "Experiência e Sabedoria",
    description: "Especialistas com anos de experiência prontos para iluminar seu caminho espiritual",
    icon: Star,
    gradient: "from-blue-600 via-indigo-600 to-purple-700",
    buttonText: "Ver Especialistas",
    buttonLink: "/consultores",
    secondaryButtonText: "Conhecer Mais",
    secondaryButtonLink: "/quem-somos"
  }
];

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = bannerSlides[currentSlide];
  const Icon = slide.icon;

  return (
    <section className="relative h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden" data-testid="hero-banner">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
        >
          {/* Padrão de Fundo Místico */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
          
          {/* Efeitos de Luz Flutuantes */}
          <div className="absolute top-20 right-20 w-72 h-72 md:w-96 md:h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-72 h-72 md:w-96 md:h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Símbolos Flutuantes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => {
              const symbols = ['✦', '✧', '◊', '☽', '☾', '✺'];
              return (
                <motion.div
                  key={i}
                  className="absolute text-white/20 text-3xl hidden md:block"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    y: [-20, -60],
                    rotate: [0, 360]
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

          {/* Conteúdo Principal */}
          <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
            <div className="max-w-5xl text-center">
              {/* Ícone com Efeito */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mb-8 flex justify-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400/40 rounded-full blur-2xl animate-pulse" />
                  <Icon className="w-16 h-16 md:w-20 md:h-20 text-yellow-300 relative z-10" strokeWidth={1.5} />
                </div>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold text-white mb-6"
              >
                ✨ Despertar Espiritual
              </motion.div>

              {/* Título */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-white"
              >
                {slide.title}
              </motion.h1>

              {/* Subtítulo com Gradient Dourado */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl mb-6 font-bold bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent"
              >
                {slide.subtitle}
              </motion.h2>

              {/* Descrição */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100 leading-relaxed"
              >
                {slide.description}
              </motion.p>

              {/* Botões CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <Link href={slide.buttonLink}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 font-bold py-4 px-10 rounded-full text-lg shadow-2xl overflow-hidden"
                    data-testid="button-primary-cta"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {slide.buttonText}
                      <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </Link>

                <Link href={slide.secondaryButtonLink}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white/40 hover:border-white/60 text-white font-bold py-4 px-10 rounded-full text-lg backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all shadow-xl"
                    data-testid="button-secondary-cta"
                  >
                    ★ {slide.secondaryButtonText}
                  </motion.button>
                </Link>
              </motion.div>

              {/* Estatísticas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="grid grid-cols-3 gap-6 md:gap-8 text-white/90 max-w-2xl mx-auto"
              >
                <div className="text-center">
                  <div className="flex flex-col items-center gap-2 mb-2">
                    <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                      <Users className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold">5.000+</div>
                  </div>
                  <div className="text-xs md:text-sm opacity-90">Clientes</div>
                </div>

                <div className="text-center">
                  <div className="flex flex-col items-center gap-2 mb-2">
                    <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                      <Award className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold">50+</div>
                  </div>
                  <div className="text-xs md:text-sm opacity-90">Consultores</div>
                </div>

                <div className="text-center">
                  <div className="flex flex-col items-center gap-2 mb-2">
                    <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                      <Clock className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold">24/7</div>
                  </div>
                  <div className="text-xs md:text-sm opacity-90">Disponível</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicadores de Slide */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`transition-all duration-300 ${
              index === currentSlide 
                ? 'w-10 h-3 bg-yellow-400' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
            } rounded-full`}
            data-testid={`banner-indicator-${index}`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
