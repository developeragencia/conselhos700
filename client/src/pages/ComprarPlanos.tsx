import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Crown, Star, Check, Zap, Users, Shield } from "lucide-react";

export default function ComprarPlanos() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const planos = [
    {
      id: 1,
      name: "Essencial",
      subtitle: "Para quem está começando",
      monthlyPrice: 39,
      yearlyPrice: 390,
      features: [
        "2 consultas por mês",
        "Duração de 30 minutos cada",
        "Acesso a consultores básicos",
        "Chat e áudio",
        "Relatórios por escrito",
        "Suporte por email"
      ],
      popular: false,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Premium",
      subtitle: "O mais escolhido",
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        "5 consultas por mês",
        "Duração de 45 minutos cada",
        "Acesso a todos os consultores",
        "Vídeo, áudio e chat",
        "Relatórios detalhados",
        "1 consulta bônus mensal",
        "Suporte prioritário 24/7",
        "Acesso a workshops"
      ],
      popular: true,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      name: "VIP",
      subtitle: "Experiência exclusiva",
      monthlyPrice: 149,
      yearlyPrice: 1490,
      features: [
        "Consultas ilimitadas",
        "Duração de 60 minutos cada",
        "Consultores mestres exclusivos",
        "Sessões personalizadas",
        "Análise completa mensal",
        "3 consultas bônus mensais",
        "Mentoria contínua",
        "Workshops exclusivos",
        "Suporte VIP dedicado",
        "Acesso antecipado a novidades"
      ],
      popular: false,
      color: "from-gold-500 to-yellow-600"
    }
  ];

  const getPrice = (plano: any) => {
    return billingCycle === "monthly" ? plano.monthlyPrice : Math.floor(plano.yearlyPrice / 12);
  };

  const getSavings = (plano: any) => {
    const monthlyCost = plano.monthlyPrice * 12;
    const yearlyCost = plano.yearlyPrice;
    return Math.floor(((monthlyCost - yearlyCost) / monthlyCost) * 100);
  };

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
            <Calendar className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Planos Mensais
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Tenha acesso regular às melhores orientações espirituais com nossos planos mensais flexíveis
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toggle Billing */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-2 rounded-lg flex items-center">
              <button
                className={`px-6 py-2 rounded-md font-medium transition-colors duration-300 ${
                  billingCycle === "monthly"
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Mensal
              </button>
              <button
                className={`px-6 py-2 rounded-md font-medium transition-colors duration-300 ${
                  billingCycle === "yearly"
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setBillingCycle("yearly")}
              >
                Anual
                <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  -20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {planos.map((plano, index) => (
              <motion.div
                key={plano.id}
                className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  plano.popular ? 'ring-2 ring-primary transform scale-105' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {plano.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold">
                      MAIS POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plano.color} flex items-center justify-center`}>
                    {plano.name === "VIP" ? (
                      <Crown className="w-8 h-8 text-white" />
                    ) : plano.name === "Premium" ? (
                      <Star className="w-8 h-8 text-white" />
                    ) : (
                      <Zap className="w-8 h-8 text-white" />
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plano.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {plano.subtitle}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary">
                      R$ {getPrice(plano)}
                    </span>
                    <span className="text-lg text-gray-600">/mês</span>
                    
                    {billingCycle === "yearly" && (
                      <div className="mt-2">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                          Economize {getSavings(plano)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {plano.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                    plano.popular
                      ? 'bg-primary text-white hover:bg-primary/90 shadow-lg'
                      : 'bg-gradient-to-r ' + plano.color + ' text-white hover:shadow-lg'
                  }`}
                >
                  Escolher Plano
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Por que escolher um plano mensal?
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Regularidade",
                description: "Mantenha sua jornada espiritual constante"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Garantia",
                description: "Cancele quando quiser, sem multas"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Prioridade",
                description: "Acesso prioritário aos melhores consultores"
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Economia",
                description: "Até 50% mais barato que consultas avulsas"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="text-center bg-white rounded-2xl p-6 shadow-lg"
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
            <Crown className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experimente grátis por 7 dias!
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Teste qualquer plano sem compromisso. Se não ficar satisfeito, cancele e não pague nada
            </p>
            <a
              href="/cadastre-se"
              className="inline-block bg-white text-primary font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Começar Teste Grátis
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}