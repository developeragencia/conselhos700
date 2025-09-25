import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, TrendingUp, Award, CheckCircle, Phone, Mail, Clock } from 'lucide-react';

export default function Parceria() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Seja Nosso <span className="text-purple-600">Parceiro</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Junte-se à maior plataforma de consultas esotéricas do Brasil. 
              Expanda seu negócio e alcance milhares de clientes em busca de orientação espiritual.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Quero ser Parceiro
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300"
              >
                Saiba Mais
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Por que ser nosso Parceiro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos as melhores condições do mercado para profissionais que desejam expandir seu alcance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Crescimento Garantido",
                description: "Plataforma com milhares de usuários ativos diariamente",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Users,
                title: "Base de Clientes",
                description: "Acesso a uma ampla base de clientes qualificados",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Award,
                title: "Reconhecimento",
                description: "Sistema de avaliações que destaca os melhores profissionais",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Heart,
                title: "Suporte Completo",
                description: "Equipe dedicada para ajudar no seu crescimento",
                color: "from-purple-500 to-pink-500"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-6`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Tipos de Parceria
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha o modelo de parceria que melhor se adapta ao seu perfil profissional
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Consultor Individual",
                description: "Para profissionais autônomos",
                features: [
                  "Perfil personalizado",
                  "Agenda própria",
                  "Comissão de 70%",
                  "Suporte técnico",
                  "Marketing digital"
                ],
                highlighted: false
              },
              {
                title: "Centro Esotérico",
                description: "Para estabelecimentos físicos",
                features: [
                  "Múltiplos consultores",
                  "Página dedicada",
                  "Comissão de 60%",
                  "Dashboard completo",
                  "Relatórios detalhados"
                ],
                highlighted: true
              },
              {
                title: "Influenciador",
                description: "Para creators e influencers",
                features: [
                  "Link personalizado",
                  "Comissão especial",
                  "Material promocional",
                  "Analytics avançado",
                  "Suporte prioritário"
                ],
                highlighted: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.highlighted ? 'ring-2 ring-purple-600 transform scale-105' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      MAIS POPULAR
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.title}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}>
                  Escolher Plano
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Pronto para começar?
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              Nossa equipe está pronta para ajudá-lo a dar o próximo passo na sua carreira
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Phone,
                  title: "Telefone",
                  info: "(11) 99999-9999",
                  description: "Segunda a Sexta, 9h às 18h"
                },
                {
                  icon: Mail,
                  title: "Email",
                  info: "parceria@sensitivosnaweb.com.br",
                  description: "Resposta em até 24h"
                },
                {
                  icon: Clock,
                  title: "Horário",
                  info: "9h às 18h",
                  description: "Segunda a Sexta-feira"
                }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <contact.icon className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                  <p className="text-lg font-semibold mb-1">{contact.info}</p>
                  <p className="text-purple-200">{contact.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 bg-white text-purple-600 px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Entre em Contato Agora
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}