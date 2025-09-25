import React, { useState } from "react";
import { motion } from "framer-motion";
import { Package, Star, Gift, Check, Crown, Sparkles } from "lucide-react";

export default function ComprarPacotes() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const pacotes = [
    {
      id: 1,
      category: "bronze",
      title: "Pacote Descoberta",
      subtitle: "Perfeito para iniciantes",
      consultas: 3,
      duracao: "30 min cada",
      price: 199,
      originalPrice: 267,
      economy: "25%",
      features: [
        "3 consultas de 30 minutos",
        "Escolha livre do consultor",
        "Chat, áudio ou vídeo",
        "Relatórios por escrito",
        "Suporte prioritário",
        "Validade de 90 dias"
      ],
      badge: "ECONOMIA",
      popular: false,
      color: "from-amber-500 to-orange-500"
    },
    {
      id: 2,
      category: "silver", 
      title: "Pacote Transformação",
      subtitle: "Ideal para mudanças profundas",
      consultas: 5,
      duracao: "45 min cada",
      price: 299,
      originalPrice: 445,
      economy: "33%",
      features: [
        "5 consultas de 45 minutos",
        "Acesso a consultores premium",
        "Vídeo chamadas exclusivas",
        "Relatórios detalhados",
        "Plano de ação personalizado",
        "1 consulta bônus grátis",
        "Suporte 24/7",
        "Validade de 120 dias"
      ],
      badge: "MAIS VENDIDO",
      popular: true,
      color: "from-gray-500 to-gray-600"
    },
    {
      id: 3,
      category: "gold",
      title: "Pacote Iluminação",
      subtitle: "Experiência premium completa",
      consultas: 10,
      duracao: "60 min cada",
      price: 499,
      originalPrice: 800,
      economy: "38%",
      features: [
        "10 consultas de 60 minutos",
        "Consultores mestres exclusivos",
        "Sessões individuais personalizadas",
        "Análise completa de vida",
        "Roadmap espiritual personalizado",
        "3 consultas bônus grátis",
        "Acesso a workshops exclusivos",
        "Mentoria contínua",
        "Suporte VIP 24/7",
        "Validade de 180 dias"
      ],
      badge: "PREMIUM",
      popular: false,
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  const categories = [
    { value: "all", label: "Todos os Pacotes" },
    { value: "bronze", label: "Bronze" },
    { value: "silver", label: "Silver" },
    { value: "gold", label: "Gold" }
  ];

  const filteredPacotes = selectedCategory === "all" 
    ? pacotes 
    : pacotes.filter(pacote => pacote.category === selectedCategory);

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
            <Package className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Pacotes de Consultas
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Economize até 38% com nossos pacotes especiais e tenha acesso a múltiplas consultas com desconto progressivo
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-lg"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Pacotes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Escolha Seu Pacote Ideal
          </motion.h2>
          
          <motion.p 
            className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Quanto mais consultas, maior o desconto! Investir no seu crescimento espiritual nunca foi tão vantajoso.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredPacotes.map((pacote, index) => (
              <motion.div
                key={pacote.id}
                className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  pacote.popular ? 'ring-2 ring-primary transform scale-105 z-10' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {pacote.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold">
                      {pacote.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${pacote.color} flex items-center justify-center`}>
                    {pacote.category === 'gold' ? (
                      <Crown className="w-8 h-8 text-white" />
                    ) : pacote.category === 'silver' ? (
                      <Star className="w-8 h-8 text-white" />
                    ) : (
                      <Gift className="w-8 h-8 text-white" />
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {pacote.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {pacote.subtitle}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary">
                      R$ {pacote.price}
                    </span>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-lg text-gray-400 line-through">
                        R$ {pacote.originalPrice}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-bold">
                        -{pacote.economy}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-6">
                    <p className="text-lg font-semibold text-gray-800">
                      {pacote.consultas} consultas
                    </p>
                    <p className="text-sm text-gray-600">
                      {pacote.duracao}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {pacote.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                    pacote.popular
                      ? 'bg-primary text-white hover:bg-primary/90 shadow-lg'
                      : 'bg-gradient-to-r ' + pacote.color + ' text-white hover:shadow-lg'
                  }`}
                >
                  Comprar Pacote
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vantagens dos Pacotes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Vantagens Exclusivas dos Pacotes
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Gift className="w-8 h-8" />,
                title: "Economia Garantida",
                description: "Desconto progressivo: quanto mais consultas, maior a economia"
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Acesso Premium",
                description: "Consultores exclusivos e sessões personalizadas"
              },
              {
                icon: <Crown className="w-8 h-8" />,
                title: "Consultas Bônus",
                description: "Ganhe consultas extras grátis em pacotes maiores"
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Flexibilidade Total",
                description: "Use suas consultas quando quiser, sem pressa"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-primary mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
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
            <Package className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Precisa de um pacote personalizado?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Criamos pacotes sob medida para suas necessidades específicas. Fale conosco!
            </p>
            <a
              href="/contato"
              className="inline-block bg-white text-primary font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Solicitar Pacote Personalizado
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}