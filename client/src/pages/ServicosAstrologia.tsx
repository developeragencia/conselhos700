import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Moon, Star, Users, BookOpen, Zap, Heart, Crown, Sun } from "lucide-react";

export default function ServicosAstrologia() {
  const [selectedSign, setSelectedSign] = useState("");

  const { data: astrologyServices, isLoading } = useQuery({
    queryKey: ["/api/services", { category: "astrologia" }],
  });

  const { data: consultants } = useQuery({
    queryKey: ["/api/consultants", { specialty: "astrologia" }],
  });

  const zodiacSigns = [
    { name: "Áries", dates: "21/03 - 19/04", element: "Fogo", planet: "Marte" },
    { name: "Touro", dates: "20/04 - 20/05", element: "Terra", planet: "Vênus" },
    { name: "Gêmeos", dates: "21/05 - 20/06", element: "Ar", planet: "Mercúrio" },
    { name: "Câncer", dates: "21/06 - 22/07", element: "Água", planet: "Lua" },
    { name: "Leão", dates: "23/07 - 22/08", element: "Fogo", planet: "Sol" },
    { name: "Virgem", dates: "23/08 - 22/09", element: "Terra", planet: "Mercúrio" },
    { name: "Libra", dates: "23/09 - 22/10", element: "Ar", planet: "Vênus" },
    { name: "Escorpião", dates: "23/10 - 21/11", element: "Água", planet: "Plutão" },
    { name: "Sagitário", dates: "22/11 - 21/12", element: "Fogo", planet: "Júpiter" },
    { name: "Capricórnio", dates: "22/12 - 19/01", element: "Terra", planet: "Saturno" },
    { name: "Aquário", dates: "20/01 - 18/02", element: "Ar", planet: "Urano" },
    { name: "Peixes", dates: "19/02 - 20/03", element: "Água", planet: "Netuno" }
  ];

  const astrologyAreas = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Astrologia do Amor",
      description: "Compatibilidade amorosa, sinastria e melhores momentos para o romance",
      color: "from-pink-500 to-red-500"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Mapa Astral Completo", 
      description: "Análise profunda da sua personalidade através dos planetas e casas",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Moon className="w-8 h-8" />,
      title: "Trânsitos Planetários",
      description: "Previsões baseadas no movimento atual dos planetas",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Sun className="w-8 h-8" />,
      title: "Revolução Solar",
      description: "Previsões anuais baseadas no retorno do Sol ao seu signo",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const { data: dailyHoroscope } = useQuery({
    queryKey: ["/api/horoscope/daily"],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/90 to-secondary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Star className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Astrologia
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Descubra como os astros influenciam sua vida, personalidade e destino através da sabedoria milenar da astrologia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Horóscopo Diário */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Horóscopo de Hoje
          </motion.h2>

          <div className="max-w-6xl mx-auto">
            <motion.div
              className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center mb-8">
                <Moon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Selecione Seu Signo
                </h3>
                <p className="text-lg opacity-90">
                  Descubra as influências astrológicas para o seu dia
                </p>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
                {zodiacSigns.map((sign) => (
                  <button
                    key={sign.name}
                    onClick={() => setSelectedSign(sign.name)}
                    className={`p-3 rounded-lg text-center transition-all duration-300 ${
                      selectedSign === sign.name
                        ? 'bg-white text-purple-600 shadow-lg transform scale-105'
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    <div className="text-xs font-medium">{sign.name}</div>
                    <div className="text-xs opacity-75">{sign.dates}</div>
                  </button>
                ))}
              </div>

              {selectedSign && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/20 rounded-2xl p-6"
                >
                  <h4 className="text-xl font-bold mb-4">{selectedSign} - Horóscopo de Hoje</h4>
                  <p className="mb-4">
                    {selectedSign === "Áries" && "Um dia cheio de energia e novas oportunidades se abre para você. Sua iniciativa será recompensada."}
                    {selectedSign === "Touro" && "Estabilidade e segurança são as palavras-chave do seu dia. Confie na sua intuição."}
                    {selectedSign === "Gêmeos" && "Comunicação é fundamental hoje. Suas ideias serão bem recebidas pelos outros."}
                    {selectedSign === "Câncer" && "Momento de cuidar das emoções e da família. Sua sensibilidade é um dom."}
                    {selectedSign === "Leão" && "Seu brilho natural está em evidência. É hora de assumir a liderança."}
                    {selectedSign === "Virgem" && "Atenção aos detalhes e organização trarão excelentes resultados hoje."}
                    {selectedSign === "Libra" && "Harmonia e equilíbrio são essenciais. Busque a diplomacia em todas as situações."}
                    {selectedSign === "Escorpião" && "Transformações importantes podem acontecer. Confie no seu poder interior."}
                    {selectedSign === "Sagitário" && "Novos horizontes se abrem. É um excelente dia para aventuras e aprendizado."}
                    {selectedSign === "Capricórnio" && "Disciplina e persistência levarão você ao sucesso. Foque nos seus objetivos."}
                    {selectedSign === "Aquário" && "Inovação e originalidade são seus pontos fortes hoje. Pense fora da caixa."}
                    {selectedSign === "Peixes" && "Sua intuição está aguçada. Confie nos seus sentimentos e sonhos."}
                  </p>
                  <a
                    href="/comprar/consultas?servico=astrologia"
                    className="inline-block bg-white text-purple-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Consulta Personalizada
                  </a>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Áreas da Astrologia */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Especialidades Astrológicas
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {astrologyAreas.map((area, index) => (
              <motion.div
                key={area.title}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${area.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                  {area.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-800 group-hover:text-primary transition-colors">
                  {area.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Astrólogos Especialistas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Astrólogos Especialistas
          </motion.h2>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg animate-pulse">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : consultants && consultants.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {consultants.slice(0, 6).map((consultant: any, index: number) => (
                <motion.div
                  key={consultant.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-center">
                    <img
                      src={consultant.imageUrl}
                      alt={consultant.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {consultant.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {consultant.title}
                    </p>
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < consultant.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        ({consultant.reviewCount})
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {consultant.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        R$ {consultant.price}/min
                      </span>
                      <a
                        href={`/consultores/${consultant.id}`}
                        className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-colors text-sm font-medium"
                      >
                        Consultar
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                Consultores em breve
              </h3>
              <p className="text-gray-500">
                Estamos selecionando os melhores astrólogos para você
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Tipos de Consulta */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Tipos de Consulta Astrológica
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Mapa Astral Completo",
                price: "R$ 120",
                duration: "90 min",
                description: "Análise completa da sua personalidade através do seu mapa natal",
                features: ["Sol, Lua e Ascendente", "Planetas nas casas", "Aspectos planetários", "Vocação profissional", "Relacionamentos"]
              },
              {
                title: "Previsões Anuais",
                price: "R$ 89",
                duration: "60 min", 
                description: "Descubra as tendências e oportunidades do seu ano através da Revolução Solar",
                features: ["Revolução Solar", "Trânsitos importantes", "Melhores períodos", "Desafios e oportunidades", "Dicas mensais"]
              },
              {
                title: "Compatibilidade Amorosa",
                price: "R$ 69",
                duration: "45 min",
                description: "Análise de compatibilidade entre você e seu parceiro através da Sinastria",
                features: ["Sinastria completa", "Pontos de harmonia", "Desafios do relacionamento", "Dicas para melhorar", "Previsões para o casal"]
              }
            ].map((consulta, index) => (
              <motion.div
                key={consulta.title}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {consulta.title}
                  </h3>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {consulta.price}
                  </div>
                  <div className="text-sm text-gray-600">
                    {consulta.duration}
                  </div>
                </div>
                
                <p className="text-gray-600 text-center mb-6">
                  {consulta.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {consulta.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors">
                  Escolher Astrólogo
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Star className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Descubra Seu Destino nas Estrelas
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Permita que a sabedoria milenar da astrologia revele os segredos do seu caminho e potencial
            </p>
            <a
              href="/consultores/astrologia"
              className="inline-block bg-white text-primary font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Consultar Astrólogo
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}