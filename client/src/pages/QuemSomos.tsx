import React from "react";
import { motion } from "framer-motion";
import { Star, Users, Clock, Shield, Heart, Sparkles } from "lucide-react";

export default function QuemSomos() {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Conexão Genuína",
      description: "Facilitamos conexões autênticas entre consultores experientes e pessoas em busca de orientação espiritual."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Segurança e Privacidade",
      description: "Garantimos total confidencialidade e segurança em todas as consultas, respeitando sua privacidade."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Qualidade Comprovada",
      description: "Todos os nossos consultores são verificados e avaliados constantemente por nossa comunidade."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Transformação Pessoal",
      description: "Acreditamos no poder transformador da orientação espiritual para o crescimento pessoal."
    }
  ];

  const stats = [
    { number: "5,000+", label: "Clientes Atendidos", icon: <Users className="w-6 h-6" /> },
    { number: "50+", label: "Consultores Certificados", icon: <Star className="w-6 h-6" /> },
    { number: "24/7", label: "Disponibilidade", icon: <Clock className="w-6 h-6" /> },
    { number: "98%", label: "Satisfação", icon: <Heart className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/90 to-secondary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Quem Somos
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Conectamos você com os melhores consultores espirituais para transformar sua vida através da sabedoria ancestral
            </motion.p>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
                  Nossa História
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600">
                  <p className="text-lg leading-relaxed mb-6">
                    O <strong>Conselhos Esotéricos</strong> nasceu da necessidade de criar uma ponte entre 
                    a sabedoria ancestral e o mundo moderno. Fundada por especialistas em ciências esotéricas, 
                    nossa plataforma une tradição e tecnologia para oferecer orientação espiritual autêntica.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    Acreditamos que cada pessoa possui um caminho único de crescimento espiritual, e nossa 
                    missão é conectá-la com consultores qualificados que possam iluminar essa jornada através 
                    do tarot, astrologia, numerologia e outras artes divinatórias.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Com uma comunidade crescente de mais de 5.000 pessoas transformadas e 50+ consultores 
                    certificados, continuamos expandindo nossos serviços para alcançar aqueles que buscam 
                    clareza, propósito e direcionamento em suas vidas.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Nossos Valores */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Nossos Valores
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-primary mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Nossos Números
            </motion.h2>
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-primary mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Pronto para Transformar sua Vida?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Conecte-se agora com nossos consultores especializados e inicie sua jornada de autodescoberta
            </motion.p>
            <motion.a
              href="/consultores"
              className="inline-block bg-white text-primary font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Encontrar Consultor
            </motion.a>
          </div>
        </section>
      </div>
  );
}