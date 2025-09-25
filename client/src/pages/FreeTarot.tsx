import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TarotCard } from "@/components/TarotCard";
import { Shuffle, RefreshCw, Star, Heart, Briefcase } from "lucide-react";

export default function FreeTarot() {
  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [readingType, setReadingType] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  const readingTypes = [
    {
      id: "love",
      title: "Tarot do Amor",
      description: "Descubra insights sobre sua vida amorosa e relacionamentos",
      icon: <Heart className="w-8 h-8" />,
      cards: 3,
      color: "from-pink-500 to-red-500"
    },
    {
      id: "career",
      title: "Tarot Profissional",
      description: "Orientações sobre carreira, trabalho e finanças",
      icon: <Briefcase className="w-8 h-8" />,
      cards: 3,
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: "general",
      title: "Tarot Geral",
      description: "Visão geral sobre diferentes aspectos da sua vida",
      icon: <Star className="w-8 h-8" />,
      cards: 5,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const tarotDeck = [
    { id: 1, name: "O Louco", image: "🃏", meaning: { upright: "Novos começos, espontaneidade, inocência", description: "Representa novos começos e aventuras" } },
    { id: 2, name: "O Mago", image: "🎩", meaning: { upright: "Manifestação, poder pessoal, ação", description: "Simboliza o poder de manifestar seus desejos" } },
    { id: 3, name: "A Sacerdotisa", image: "🌙", meaning: { upright: "Intuição, mistério, conhecimento oculto", description: "Representa a sabedoria interior e intuição" } },
    { id: 4, name: "A Imperatriz", image: "👸", meaning: { upright: "Feminilidade, beleza, natureza, abundância", description: "Simboliza fertilidade e criatividade" } },
    { id: 5, name: "O Imperador", image: "👑", meaning: { upright: "Autoridade, estrutura, controle, figura paterna", description: "Representa liderança e estabilidade" } },
    { id: 6, name: "O Hierofante", image: "⛪", meaning: { upright: "Tradição, conformidade, moralidade, ética", description: "Simboliza ensinamentos e tradições" } },
    { id: 7, name: "Os Amantes", image: "💕", meaning: { upright: "Amor, harmonia, relacionamentos, valores", description: "Representa escolhas e relacionamentos" } },
    { id: 8, name: "A Carruagem", image: "🏆", meaning: { upright: "Controle, força de vontade, sucesso, determinação", description: "Simboliza vitória e determinação" } },
    { id: 9, name: "A Força", image: "🦁", meaning: { upright: "Força interior, bravura, compaixão, foco", description: "Representa coragem e força interior" } },
    { id: 10, name: "O Eremita", image: "🕯️", meaning: { upright: "Busca da alma, orientação interior, ser seu próprio guru", description: "Simboliza busca interior e sabedoria" } },
    { id: 11, name: "A Roda da Fortuna", image: "☸️", meaning: { upright: "Boa sorte, karma, mudanças de vida, destino", description: "Representa ciclos e mudanças" } },
    { id: 12, name: "A Justiça", image: "⚖️", meaning: { upright: "Justiça, imparcialidade, verdade, causa e efeito", description: "Simboliza equilíbrio e justiça" } },
    { id: 13, name: "O Enforcado", image: "🙃", meaning: { upright: "Rendição, deixar ir, nova perspectiva", description: "Representa mudança de perspectiva" } },
    { id: 14, name: "A Morte", image: "💀", meaning: { upright: "Fim, transformação, transição, mudança", description: "Simboliza transformação e renascimento" } },
    { id: 15, name: "A Temperança", image: "🏺", meaning: { upright: "Equilíbrio, moderação, paciência, propósito", description: "Representa harmonia e equilíbrio" } },
    { id: 16, name: "O Diabo", image: "😈", meaning: { upright: "Escravidão, materialismo, ignorância, desesperança", description: "Simboliza limitações e tentações" } },
    { id: 17, name: "A Torre", image: "🏗️", meaning: { upright: "Mudança súbita, reviravoltas, caos, revelação", description: "Representa mudanças súbitas e libertação" } },
    { id: 18, name: "A Estrela", image: "⭐", meaning: { upright: "Esperança, fé, propósito, renovação, espiritualidade", description: "Simboliza esperança e inspiração" } },
    { id: 19, name: "A Lua", image: "🌙", meaning: { upright: "Ilusão, medo, ansiedade, subconsciente, intuição", description: "Representa intuição e mistério" } },
    { id: 20, name: "O Sol", image: "☀️", meaning: { upright: "Alegria, sucesso, celebração, positividade", description: "Simboliza sucesso e felicidade" } },
    { id: 21, name: "O Julgamento", image: "📯", meaning: { upright: "Julgamento, renascimento, vida interior, perdão", description: "Representa renovação e perdão" } },
    { id: 22, name: "O Mundo", image: "🌍", meaning: { upright: "Conclusão, realização, realização de viagem", description: "Simboliza completude e realização" } }
  ];

  const shuffledCards = [...tarotDeck].sort(() => Math.random() - 0.5);

  const startReading = (type: string) => {
    setReadingType(type);
    setSelectedCards([]);
    setShowResults(false);
    setIsReading(true);
  };

  const selectCard = (card: any) => {
    const reading = readingTypes.find(r => r.id === readingType);
    if (!reading || selectedCards.length >= reading.cards) return;

    setSelectedCards(prev => [...prev, { ...card, isRevealed: true }]);
  };

  const completeReading = () => {
    setShowResults(true);
  };

  const resetReading = () => {
    setIsReading(false);
    setSelectedCards([]);
    setShowResults(false);
    setReadingType("");
  };

  const getPositionMeaning = (index: number, type: string) => {
    const meanings = {
      love: ["Passado Amoroso", "Presente do Coração", "Futuro Romântico"],
      career: ["Situação Atual", "Desafios", "Oportunidades"],
      general: ["Passado", "Presente", "Futuro", "Conselho", "Resultado"]
    };
    return meanings[type as keyof typeof meanings]?.[index] || `Carta ${index + 1}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-6">🔮</div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Tarot Grátis
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                Receba orientação espiritual através das cartas sagradas do tarot
              </p>
            </motion.div>
          </div>
        </section>

        {!isReading ? (
          /* Seleção do Tipo de Leitura */
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Escolha seu Tipo de Consulta
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {readingTypes.map((type, index) => (
                  <motion.div
                    key={type.id}
                    className={`bg-gradient-to-br ${type.color} rounded-2xl p-8 shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-300`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    onClick={() => startReading(type.id)}
                  >
                    <div className="text-center">
                      <div className="mb-6">
                        {type.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{type.title}</h3>
                      <p className="text-white/90 mb-6">{type.description}</p>
                      <div className="text-sm opacity-75 mb-4">
                        {type.cards} cartas
                      </div>
                      <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors">
                        Começar Leitura
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : !showResults ? (
          /* Seleção de Cartas */
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  {readingTypes.find(r => r.id === readingType)?.title}
                </h2>
                <p className="text-xl opacity-90 mb-6">
                  Selecione {readingTypes.find(r => r.id === readingType)?.cards} cartas que mais te chamam atenção
                </p>
                <div className="text-lg">
                  Cartas selecionadas: {selectedCards.length} / {readingTypes.find(r => r.id === readingType)?.cards}
                </div>
              </div>

              {/* Cartas Selecionadas */}
              {selectedCards.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-center mb-6">Suas Cartas</h3>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {selectedCards.map((card, index) => (
                      <motion.div
                        key={`selected-${card.id}`}
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-2">
                          <div className="text-4xl mb-2">{card.image}</div>
                          <div className="font-bold">{card.name}</div>
                        </div>
                        <div className="text-sm opacity-75">
                          {getPositionMeaning(index, readingType)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {selectedCards.length === readingTypes.find(r => r.id === readingType)?.cards && (
                    <div className="text-center mt-8">
                      <button
                        onClick={completeReading}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-shadow"
                      >
                        Ver Interpretação
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Deck de Cartas */}
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {shuffledCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    className="cursor-pointer"
                    initial={{ opacity: 0, rotateY: 180 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    onClick={() => selectCard(card)}
                  >
                    <div className="bg-gradient-to-br from-purple-800 to-blue-800 rounded-xl p-4 text-center hover:scale-105 transition-transform shadow-xl">
                      <div className="text-2xl mb-2">🔮</div>
                      <div className="text-xs font-medium opacity-75">Carta</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={resetReading}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors"
                >
                  Escolher Outro Tipo
                </button>
              </div>
            </div>
          </section>
        ) : (
          /* Resultados */
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">
                    Sua Leitura de {readingTypes.find(r => r.id === readingType)?.title}
                  </h2>
                  <p className="text-xl opacity-90">
                    Interpretação das cartas selecionadas
                  </p>
                </div>

                <div className="space-y-8">
                  {selectedCards.map((card, index) => (
                    <motion.div
                      key={`result-${card.id}`}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4">{card.image}</div>
                          <h3 className="text-2xl font-bold mb-2">{card.name}</h3>
                          <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                            {getPositionMeaning(index, readingType)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-3 text-yellow-300">
                            Significado
                          </h4>
                          <p className="text-white/90 mb-4 leading-relaxed">
                            {card.meaning.upright}
                          </p>
                          <p className="text-white/75 leading-relaxed">
                            {card.meaning.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center mt-12 space-y-4">
                  <p className="text-lg opacity-90 mb-6">
                    Lembre-se: o tarot oferece orientação, mas você é quem toma as decisões em sua vida.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={resetReading}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-shadow"
                    >
                      <RefreshCw className="w-5 h-5 inline mr-2" />
                      Nova Consulta
                    </button>
                    <a
                      href="/consultores"
                      className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-colors"
                    >
                      Consulta Profissional
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Disclaimer */}
        <section className="py-8 bg-black/30">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/75 text-sm">
              Esta é uma consulta automática para entretenimento. Para orientações mais profundas, 
              consulte nossos tarólogos especialistas.
            </p>
          </div>
        </section>
      </div>
  );
}