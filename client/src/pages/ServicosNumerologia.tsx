import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Calculator, Star, Users, BookOpen, Zap, Heart, Crown, TrendingUp } from "lucide-react";

export default function ServicosNumerologia() {
  const [selectedNumber, setSelectedNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const { data: numerologyServices, isLoading } = useQuery({
    queryKey: ["/api/services", { category: "numerologia" }],
  });

  const { data: consultants } = useQuery({
    queryKey: ["/api/consultants", { specialty: "numerologia" }],
  });

  const calculateLifePath = (date: string) => {
    if (!date) return null;
    const digits = date.replace(/-/g, '').split('').map(Number);
    let sum = digits.reduce((acc, digit) => acc + digit, 0);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').map(Number).reduce((acc, digit) => acc + digit, 0);
    }
    return sum;
  };

  const lifePathMeanings = {
    1: { title: "O Líder", description: "Independência, liderança e pioneirismo", color: "from-red-500 to-red-600" },
    2: { title: "O Diplomata", description: "Cooperação, sensibilidade e parceria", color: "from-orange-500 to-orange-600" },
    3: { title: "O Comunicador", description: "Criatividade, expressão e otimismo", color: "from-yellow-500 to-yellow-600" },
    4: { title: "O Construtor", description: "Estabilidade, organização e trabalho", color: "from-green-500 to-green-600" },
    5: { title: "O Aventureiro", description: "Liberdade, versatilidade e mudança", color: "from-blue-500 to-blue-600" },
    6: { title: "O Cuidador", description: "Responsabilidade, família e harmonia", color: "from-indigo-500 to-indigo-600" },
    7: { title: "O Místico", description: "Espiritualidade, análise e intuição", color: "from-purple-500 to-purple-600" },
    8: { title: "O Realizador", description: "Ambição, material e autoridade", color: "from-pink-500 to-pink-600" },
    9: { title: "O Humanitário", description: "Compaixão, generosidade e sabedoria", color: "from-teal-500 to-teal-600" },
    11: { title: "O Visionário", description: "Intuição elevada e inspiração", color: "from-gold-500 to-yellow-600" },
    22: { title: "O Mestre Constructor", description: "Realizações grandiosas e liderança", color: "from-silver-500 to-gray-600" },
    33: { title: "O Mestre Professor", description: "Cura espiritual e orientação", color: "from-emerald-500 to-emerald-600" }
  };

  const numerologyAreas = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Numerologia do Amor",
      description: "Descubra sua compatibilidade amorosa e o melhor parceiro para você",
      color: "from-pink-500 to-red-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Numerologia Profissional", 
      description: "Encontre sua vocação ideal e o melhor momento para mudanças na carreira",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Números da Sorte",
      description: "Identifique seus números pessoais de sorte e proteção",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Numerologia Empresarial",
      description: "Otimize seu negócio com a energia dos números",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const lifePathNumber = calculateLifePath(birthDate);
  const meaning = lifePathNumber ? lifePathMeanings[lifePathNumber as keyof typeof lifePathMeanings] : null;

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
            <Calculator className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Numerologia
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Descubra os segredos dos números e como eles influenciam sua vida, personalidade e destino
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculadora Gratuita */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Calcule Seu Número da Vida
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">
                    Descubra Sua Essência
                  </h3>
                  <p className="text-lg opacity-90 mb-6">
                    Seu número da vida revela sua personalidade, talentos e propósito de vida. 
                    Insira sua data de nascimento para descobrir.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Data de Nascimento
                      </label>
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg text-gray-800 border-0 focus:ring-2 focus:ring-white/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  {meaning ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white/20 rounded-2xl p-6"
                    >
                      <div className="text-6xl font-bold mb-4">
                        {lifePathNumber}
                      </div>
                      <h4 className="text-xl font-bold mb-2">
                        {meaning.title}
                      </h4>
                      <p className="opacity-90">
                        {meaning.description}
                      </p>
                      <a
                        href="/comprar/consultas?servico=numerologia"
                        className="mt-4 inline-block bg-white text-purple-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        Análise Completa
                      </a>
                    </motion.div>
                  ) : (
                    <div className="bg-white/20 rounded-2xl p-6">
                      <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="opacity-75">
                        Insira sua data de nascimento para calcular seu número da vida
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Áreas da Numerologia */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Especialidades em Numerologia
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {numerologyAreas.map((area, index) => (
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

      {/* Consultores Especializados */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Numerólogos Especialistas
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
                Estamos selecionando os melhores numerólogos para você
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
            Tipos de Consulta
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Mapa Numerológico Completo",
                price: "R$ 89",
                duration: "60 min",
                description: "Análise completa da sua personalidade, talentos e propósito de vida",
                features: ["Número da vida", "Número da alma", "Número da personalidade", "Números de sorte", "Compatibilidades"]
              },
              {
                title: "Numerologia do Amor",
                price: "R$ 59",
                duration: "45 min", 
                description: "Descubra sua compatibilidade amorosa e encontre o parceiro ideal",
                features: ["Compatibilidade amorosa", "Ciclos de relacionamento", "Melhor época para o amor", "Características do parceiro ideal"]
              },
              {
                title: "Numerologia Profissional",
                price: "R$ 69",
                duration: "50 min",
                description: "Encontre sua vocação e o melhor momento para mudanças na carreira",
                features: ["Vocação natural", "Melhores profissões", "Ciclos profissionais", "Momento para mudanças", "Números de sucesso"]
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
                  Escolher Consultor
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
            <Calculator className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Descubra o Poder dos Números
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Permita que a numerologia revele os segredos da sua vida e guie você para o sucesso e felicidade
            </p>
            <a
              href="/consultores/numerologia"
              className="inline-block bg-white text-primary font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Consultar Agora
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}