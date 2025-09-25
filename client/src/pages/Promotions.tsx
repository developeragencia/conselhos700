import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { PromotionCard } from "@/components/PromotionCard";
import { Filter, Percent, Clock, Star } from "lucide-react";

export default function Promotions() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: promotions, isLoading } = useQuery({
    queryKey: ["/api/promotions"],
  });

  const categories = [
    { value: "all", label: "Todas as Promoções" },
    { value: "tarot", label: "Tarot" },
    { value: "astrologia", label: "Astrologia" },
    { value: "numerologia", label: "Numerologia" },
    { value: "combos", label: "Combos" },
    { value: "primeira-consulta", label: "Primeira Consulta" }
  ];

  const featuredPromotions = [
    {
      id: 1,
      title: "Combo Autoconhecimento",
      subtitle: "Tarot + Mapa Astral + Numerologia",
      price: 149.90,
      originalPrice: 220.00,
      features: [
        "Consulta de Tarot completa (60min)",
        "Mapa Astral personalizado",
        "Análise numerológica detalhada",
        "Relatório digital completo",
        "Suporte por 30 dias"
      ],
      badge: "MAIS VENDIDO",
      popular: true,
      link: "/checkout?promo=combo-autoconhecimento",
      discount: 32,
      validUntil: "2024-02-29"
    },
    {
      id: 2,
      title: "Primeira Consulta",
      subtitle: "50% de desconto para novos clientes",
      price: 29.90,
      originalPrice: 59.90,
      features: [
        "Consulta de 30 minutos",
        "Escolha o consultor",
        "Chat, vídeo ou áudio",
        "Garantia de satisfação",
        "Sem taxas extras"
      ],
      badge: "NOVOS CLIENTES",
      popular: false,
      link: "/checkout?promo=primeira-consulta",
      discount: 50,
      validUntil: "2024-12-31"
    },
    {
      id: 3,
      title: "Pacote Relacionamentos",
      subtitle: "Consultas especializadas em amor",
      price: 89.90,
      originalPrice: 140.00,
      features: [
        "Tarot do Amor (45min)",
        "Sinastria de casal",
        "Orientações personalizadas",
        "Rituais para atração",
        "Acompanhamento por 15 dias"
      ],
      badge: "ESPECIAL",
      popular: false,
      link: "/checkout?promo=relacionamentos",
      discount: 36,
      validUntil: "2024-02-14"
    },
    {
      id: 4,
      title: "Carreira e Sucesso",
      subtitle: "Orientações para vida profissional",
      price: 79.90,
      originalPrice: 120.00,
      features: [
        "Análise profissional completa",
        "Orientações de carreira",
        "Melhor momento para mudanças",
        "Estratégias personalizadas",
        "Follow-up em 30 dias"
      ],
      badge: "CARREIRA",
      popular: false,
      link: "/checkout?promo=carreira",
      discount: 33,
      validUntil: "2024-03-15"
    },
    {
      id: 5,
      title: "Pacote Anual VIP",
      subtitle: "Acompanhamento completo por 12 meses",
      price: 499.90,
      originalPrice: 800.00,
      features: [
        "12 consultas mensais",
        "Acesso prioritário",
        "Relatórios personalizados",
        "Suporte ilimitado por chat",
        "Descontos em produtos"
      ],
      badge: "VIP",
      popular: true,
      link: "/checkout?promo=anual-vip",
      discount: 37,
      validUntil: "2024-12-31"
    },
    {
      id: 6,
      title: "Consulta Express",
      subtitle: "Respostas rápidas e precisas",
      price: 19.90,
      originalPrice: 35.00,
      features: [
        "Consulta de 15 minutos",
        "Uma pergunta específica",
        "Resposta imediata",
        "Disponível 24/7",
        "Consultores especializados"
      ],
      badge: "EXPRESS",
      popular: false,
      link: "/checkout?promo=express",
      discount: 43,
      validUntil: "2024-01-31"
    }
  ];

  const filteredPromotions = featuredPromotions.filter(promo => {
    if (selectedCategory === "all") return true;
    
    const categoryMap: Record<string, string[]> = {
      "tarot": ["Combo Autoconhecimento", "Pacote Relacionamentos"],
      "astrologia": ["Combo Autoconhecimento", "Carreira e Sucesso"],
      "numerologia": ["Combo Autoconhecimento"],
      "combos": ["Combo Autoconhecimento", "Pacote Relacionamentos", "Carreira e Sucesso", "Pacote Anual VIP"],
      "primeira-consulta": ["Primeira Consulta", "Consulta Express"]
    };
    
    return categoryMap[selectedCategory]?.includes(promo.title) || false;
  });

  const stats = [
    { number: "10,000+", label: "Clientes Atendidos", icon: <Star className="w-6 h-6" /> },
    { number: "45%", label: "Economia Média", icon: <Percent className="w-6 h-6" /> },
    { number: "24h", label: "Ofertas Limitadas", icon: <Clock className="w-6 h-6" /> }
  ];

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
              <Percent className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Promoções Especiais
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                Aproveite ofertas exclusivas e transforme sua vida com economia garantida
              </p>
            </motion.div>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="py-12 bg-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-primary mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Filtrar por categoria:</span>
                </div>

                <div className="flex-1 max-w-md">
                  <select
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-primary font-medium">
                  {filteredPromotions.length} ofertas disponíveis
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lista de Promoções */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                      <div className="h-4 bg-gray-300 rounded mb-4"></div>
                      <div className="h-8 bg-gray-300 rounded mb-4"></div>
                      <div className="space-y-2 mb-6">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="h-3 bg-gray-300 rounded"></div>
                        ))}
                      </div>
                      <div className="h-10 bg-gray-300 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : filteredPromotions.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPromotions.map((promotion, index) => (
                    <motion.div
                      key={promotion.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <PromotionCard promotion={promotion} index={index} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Percent className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Nenhuma promoção encontrada
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Tente selecionar uma categoria diferente
                  </p>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Ver Todas as Ofertas
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Urgência */}
        <section className="py-16 bg-gradient-to-r from-red-500 to-pink-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Clock className="w-16 h-16 mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ⏰ Ofertas por Tempo Limitado!
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Não perca essas oportunidades únicas. Algumas promoções terminam em breve!
              </p>
              <a
                href="#promocoes"
                className="inline-block bg-white text-red-500 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              >
                Ver Ofertas Agora
              </a>
            </motion.div>
          </div>
        </section>

        {/* Garantias */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12 text-gray-800"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Nossas Garantias
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="bg-white rounded-2xl p-6 text-center shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Satisfação Garantida
                </h3>
                <p className="text-gray-600">
                  Se não ficar satisfeito, devolvemos seu dinheiro em até 7 dias
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-6 text-center shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Pagamento Seguro
                </h3>
                <p className="text-gray-600">
                  Seus dados protegidos com certificação SSL e criptografia
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-6 text-center shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Acesso Imediato
                </h3>
                <p className="text-gray-600">
                  Após a compra, acesse seus créditos instantaneamente
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
  );
}