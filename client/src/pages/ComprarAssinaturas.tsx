import React, { useState } from "react";
import { motion } from "framer-motion";
import { Infinity, Crown, Star, Check, Zap, Gift, Shield, Clock } from "lucide-react";

export default function ComprarAssinaturas() {
  const [selectedPlan, setSelectedPlan] = useState("anual");

  const assinaturas = [
    {
      id: 1,
      name: "Trimestral",
      duration: "3 meses",
      subtitle: "Experimente por mais tempo",
      monthlyPrice: 89,
      totalPrice: 267,
      originalPrice: 357,
      savings: 25,
      features: [
        "Acesso total à plataforma",
        "Consultas ilimitadas",
        "Todos os consultores disponíveis",
        "Sessões de até 90 minutos",
        "Relatórios personalizados",
        "Suporte prioritário",
        "Workshops inclusos"
      ],
      popular: false,
      color: "from-blue-500 to-blue-600",
      badge: "TESTE ESTENDIDO"
    },
    {
      id: 2,
      name: "Anual",
      duration: "12 meses",
      subtitle: "A melhor escolha",
      monthlyPrice: 67,
      totalPrice: 799,
      originalPrice: 1068,
      savings: 35,
      features: [
        "Acesso total à plataforma",
        "Consultas ilimitadas",
        "Consultores mestres exclusivos",
        "Sessões sem limite de tempo",
        "Análise anual completa",
        "Mentoria personalizada",
        "Workshops e eventos VIP",
        "Suporte 24/7 dedicado",
        "3 meses grátis inclusos"
      ],
      popular: true,
      color: "from-purple-500 to-purple-600",
      badge: "MAIS POPULAR"
    },
    {
      id: 3,
      name: "Vitalícia",
      duration: "Para sempre",
      subtitle: "Investimento único",
      monthlyPrice: 0,
      totalPrice: 2997,
      originalPrice: 4999,
      savings: 40,
      features: [
        "Acesso vitalício garantido",
        "Consultas ilimitadas para sempre",
        "Todos os consultores + novos",
        "Sessões sem limites",
        "Análises anuais personalizadas",
        "Mentoria vitalícia",
        "Todos os workshops futuros",
        "Suporte VIP vitalício",
        "Atualizações gratuitas",
        "Transferível para família"
      ],
      popular: false,
      color: "from-gold-500 to-yellow-600",
      badge: "MELHOR VALOR"
    }
  ];

  const beneficiosExclusivos = [
    {
      icon: <Infinity className="w-8 h-8" />,
      title: "Acesso Ilimitado",
      description: "Consultas sem limite de quantidade ou duração"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Consultores Exclusivos",
      description: "Acesso a mestres que só atendem assinantes"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Conteúdo Exclusivo",
      description: "Workshops, cursos e eventos só para assinantes"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Garantia Total",
      description: "30 dias para cancelar com reembolso integral"
    }
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
            <Infinity className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Assinaturas Premium
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Acesso ilimitado a toda sabedoria espiritual da plataforma com economia de até 40%
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparação Rápida */}
      <section className="py-8 bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                { label: "Consultas Avulsas", price: "R$ 89", description: "por consulta" },
                { label: "Plano Mensal", price: "R$ 149", description: "por mês" },
                { label: "Assinatura Anual", price: "R$ 67", description: "por mês" }
              ].map((item, index) => (
                <div key={item.label} className={`p-4 rounded-lg ${index === 2 ? 'bg-primary text-white' : 'bg-gray-50'}`}>
                  <div className="text-sm font-medium mb-1">{item.label}</div>
                  <div className="text-2xl font-bold mb-1">{item.price}</div>
                  <div className="text-sm opacity-80">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assinaturas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Escolha Sua Assinatura
          </motion.h2>
          
          <motion.p 
            className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Quanto maior o período, maior a economia e mais benefícios exclusivos você recebe
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {assinaturas.map((assinatura, index) => (
              <motion.div
                key={assinatura.id}
                className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  assinatura.popular ? 'ring-2 ring-primary transform scale-105 z-10' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className={`px-6 py-2 rounded-full text-sm font-bold ${
                    assinatura.popular 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {assinatura.badge}
                  </span>
                </div>

                <div className="text-center mb-6 mt-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${assinatura.color} flex items-center justify-center`}>
                    {assinatura.name === "Vitalícia" ? (
                      <Infinity className="w-8 h-8 text-white" />
                    ) : assinatura.name === "Anual" ? (
                      <Crown className="w-8 h-8 text-white" />
                    ) : (
                      <Clock className="w-8 h-8 text-white" />
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {assinatura.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {assinatura.subtitle}
                  </p>
                  
                  <div className="mb-4">
                    {assinatura.monthlyPrice > 0 ? (
                      <>
                        <span className="text-4xl font-bold text-primary">
                          R$ {assinatura.monthlyPrice}
                        </span>
                        <span className="text-lg text-gray-600">/mês</span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-primary">
                        Pagamento único
                      </span>
                    )}
                    
                    <div className="mt-2">
                      <div className="text-lg font-semibold text-gray-800">
                        Total: R$ {assinatura.totalPrice}
                      </div>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="text-sm text-gray-400 line-through">
                          R$ {assinatura.originalPrice}
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-bold">
                          -{assinatura.savings}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-6">
                    <p className="text-sm font-semibold text-gray-800">
                      {assinatura.duration}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {assinatura.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                    assinatura.popular
                      ? 'bg-primary text-white hover:bg-primary/90 shadow-lg'
                      : 'bg-gradient-to-r ' + assinatura.color + ' text-white hover:shadow-lg'
                  }`}
                >
                  Assinar Agora
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios Exclusivos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Benefícios Exclusivos dos Assinantes
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {beneficiosExclusivos.map((beneficio, index) => (
              <motion.div
                key={beneficio.title}
                className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-primary mb-4 flex justify-center">
                  {beneficio.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {beneficio.title}
                </h3>
                <p className="text-gray-600">
                  {beneficio.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Rápido */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Perguntas Frequentes
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Posso cancelar a qualquer momento?",
                answer: "Sim! Você pode cancelar sua assinatura a qualquer momento. Para assinaturas anuais, oferecemos 30 dias de garantia."
              },
              {
                question: "As consultas realmente são ilimitadas?",
                answer: "Sim, não há limite de quantidade de consultas ou duração das sessões para assinantes."
              },
              {
                question: "Tenho acesso a novos consultores?",
                answer: "Assinantes têm acesso prioritário a todos os novos consultores que se juntam à plataforma."
              }
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                className="bg-white rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
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
            <Star className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para começar sua jornada?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já transformaram suas vidas com nossas assinaturas
            </p>
            <a
              href="/cadastre-se"
              className="inline-block bg-white text-primary font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Assinar Agora
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}