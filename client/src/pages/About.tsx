import React from "react";
import { motion } from "framer-motion";

import { Heart, Users, Star, Award, Clock, Shield } from "lucide-react";

export default function About() {
  const stats = [
    { number: "10,000+", label: "Clientes Atendidos", icon: <Users className="w-6 h-6" /> },
    { number: "98%", label: "Satisfação dos Clientes", icon: <Star className="w-6 h-6" /> },
    { number: "24/7", label: "Atendimento Disponível", icon: <Clock className="w-6 h-6" /> },
    { number: "500+", label: "Consultores Certificados", icon: <Award className="w-6 h-6" /> }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Amor e Compaixão",
      description: "Cada consulta é conduzida com amor verdadeiro e compaixão pelo próximo, oferecendo acolhimento em momentos de necessidade."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Ética e Responsabilidade",
      description: "Mantemos os mais altos padrões éticos, respeitando a privacidade e oferecendo orientações responsáveis e construtivas."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Excelência Espiritual",
      description: "Buscamos constantemente a excelência em nossos serviços, conectando você com sua essência mais profunda e sabedoria interior."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Comunidade Unida",
      description: "Construímos uma comunidade forte e acolhedora, onde cada pessoa é valorizada e respeitada em sua jornada espiritual."
    }
  ];

  const timeline = [
    {
      year: "2015",
      title: "Fundação",
      description: "Nascemos com o sonho de conectar pessoas a orientações espirituais autênticas e transformadoras."
    },
    {
      year: "2017",
      title: "Expansão Digital",
      description: "Lançamos nossa plataforma online, tornando nossos serviços acessíveis para todo o Brasil."
    },
    {
      year: "2019",
      title: "Certificação de Consultores",
      description: "Implementamos um rigoroso programa de certificação para garantir a qualidade de nossos profissionais."
    },
    {
      year: "2021",
      title: "10.000 Atendimentos",
      description: "Alcançamos a marca de 10 mil vidas transformadas através de nossas consultas especializadas."
    },
    {
      year: "2023",
      title: "Inovação Contínua",
      description: "Introduzimos novas modalidades de atendimento e ferramentas interativas para autoconhecimento."
    },
    {
      year: "2024",
      title: "Liderança Nacional",
      description: "Nos tornamos a principal referência em consultas esotéricas online do Brasil."
    }
  ];

  const team = [
    {
      name: "Helena Rodrigues",
      role: "Fundadora & CEO",
      description: "Mestre em Tarot com mais de 20 anos de experiência. Visionária por trás da criação do Conselhos Esotéricos.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9ee9b90?q=80&w=400&auto=format&fit=crop",
      specialties: ["Tarot", "Liderança Espiritual", "Desenvolvimento Pessoal"]
    },
    {
      name: "Marcus Silva",
      role: "Diretor de Qualidade",
      description: "Astrólogo certificado responsável pela formação e supervisão de nossos consultores especializados.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
      specialties: ["Astrologia", "Formação", "Qualidade"]
    },
    {
      name: "Ana Beatriz",
      role: "Coordenadora de Atendimento",
      description: "Numeróloga experiente que garante que cada cliente receba o melhor atendimento personalizado.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
      specialties: ["Numerologia", "Atendimento", "Experiência do Cliente"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/90 to-secondary/80 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Heart className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Nossa História
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                Há quase uma década transformando vidas através da sabedoria ancestral 
                e orientações espirituais autênticas
              </p>
            </motion.div>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="py-16 bg-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-primary mb-3 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Nossa Missão */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Nossa Missão
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Conectar pessoas às suas verdades mais profundas através de orientações espirituais 
                autênticas, éticas e transformadoras. Acreditamos que cada pessoa carrega dentro de si 
                a sabedoria necessária para criar uma vida plena e significativa.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-primary mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
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

        {/* Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Nossa Jornada
            </motion.h2>
            
            <div className="max-w-4xl mx-auto">
              {timeline.map((event, index) => (
                <motion.div
                  key={event.year}
                  className="flex items-start mb-12 last:mb-0"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm mr-6">
                    {event.year}
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipe */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Nossa Equipe
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conheça as pessoas dedicadas que tornam possível nossa missão de 
                transformar vidas através da sabedoria espiritual
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Faça Parte da Nossa Comunidade
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Junte-se a milhares de pessoas que já transformaram suas vidas 
                através de nossas orientações espirituais
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/consultores"
                  className="bg-white text-primary font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                >
                  Encontrar um Consultor
                </a>
                <a
                  href="/cadastre-se"
                  className="border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-colors duration-300"
                >
                  Criar Conta Grátis
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
  );
}