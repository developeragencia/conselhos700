import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { EsotericService } from "@/components/EsotericService";
import { Search, Filter, Star, Clock, Users } from "lucide-react";

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: services, isLoading } = useQuery({
    queryKey: ["/api/services"],
  });

  const allServices = [
    {
      title: "Tarot Completo",
      description: "Leitura completa das cartas para orientação sobre amor, trabalho e vida pessoal",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=500&auto=format&fit=crop",
      icon: <div className="text-2xl">🔮</div>,
      color: "from-purple-500 to-indigo-600",
      link: "/servicos/tarot",
      category: "tarot",
      price: "A partir de R$ 59,90",
      duration: "45-60 min",
      popularity: 95
    },
    {
      title: "Mapa Astral Completo",
      description: "Análise detalhada do seu mapa astral natal com previsões personalizadas",
      imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=500&auto=format&fit=crop",
      icon: <div className="text-2xl">⭐</div>,
      color: "from-blue-500 to-purple-600",
      link: "/servicos/astrologia",
      category: "astrologia",
      price: "A partir de R$ 89,90",
      duration: "60-90 min",
      popularity: 88
    },
    {
      title: "Numerologia Pessoal",
      description: "Descubra os números que regem sua vida e suas influências energéticas",
      imageUrl: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=500&auto=format&fit=crop",
      icon: <div className="text-2xl">🔢</div>,
      color: "from-green-500 to-teal-600",
      link: "/servicos/numerologia",
      category: "numerologia",
      price: "A partir de R$ 49,90",
      duration: "30-45 min",
      popularity: 82
    },
    {
      title: "Quiromancia",
      description: "Leitura das linhas das mãos revelando seu passado, presente e futuro",
      imageUrl: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?q=80&w=500&auto=format&fit=crop",
      icon: <div className="text-2xl">🤲</div>,
      color: "from-amber-500 to-orange-600",
      link: "/servicos/quiromancia",
      category: "quiromancia",
      price: "A partir de R$ 69,90",
      duration: "40-50 min",
      popularity: 75
    },
    {
      title: "Cristaloterapia",
      description: "Terapia energética com cristais para equilibrio e harmonização",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=500&auto=format&fit=crop",
      icon: <div className="text-2xl">💎</div>,
      color: "from-pink-500 to-rose-600",
      link: "/servicos/cristaloterapia",
      category: "terapias",
      price: "A partir de R$ 79,90",
      duration: "50-60 min",
      popularity: 71
    },
    {
      title: "Reiki à Distância",
      description: "Sessão de cura energética através da técnica do Reiki",
      imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop",
      icon: <div className="text-2xl">🙏</div>,
      color: "from-cyan-500 to-blue-600",
      link: "/servicos/reiki",
      category: "terapias",
      price: "A partir de R$ 59,90",
      duration: "45 min",
      popularity: 68
    },
    {
      title: "Runas Nórdicas",
      description: "Consulta ancestral com runas para orientação e tomada de decisões",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=500&auto=format&fit=crop",
      icon: <div className="text-2xl">ᚱ</div>,
      color: "from-slate-500 to-gray-600",
      link: "/servicos/runas",
      category: "oraculos",
      price: "A partir de R$ 54,90",
      duration: "35-45 min",
      popularity: 63
    },
    {
      title: "Búzios e Ifá",
      description: "Consulta tradicional africana para orientação espiritual profunda",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=500&auto=format&fit=crop",
      icon: <div className="text-2xl">🐚</div>,
      color: "from-yellow-500 to-amber-600",
      link: "/servicos/buzios",
      category: "oraculos",
      price: "A partir de R$ 74,90",
      duration: "60 min",
      popularity: 77
    },
    {
      title: "Limpeza Energética",
      description: "Limpeza e proteção energética para remover bloqueios e energias negativas",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500&auto=format&fit=crop",
      icon: <div className="text-2xl">✨</div>,
      color: "from-violet-500 to-purple-600",
      link: "/servicos/limpeza-energetica",
      category: "terapias",
      price: "A partir de R$ 89,90",
      duration: "60-75 min",
      popularity: 84
    }
  ];

  const categories = [
    { value: "all", label: "Todos os Serviços" },
    { value: "tarot", label: "Tarot" },
    { value: "astrologia", label: "Astrologia" },
    { value: "numerologia", label: "Numerologia" },
    { value: "terapias", label: "Terapias Energéticas" },
    { value: "oraculos", label: "Oráculos" },
    { value: "quiromancia", label: "Quiromancia" }
  ];

  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedServices = filteredServices.sort((a, b) => b.popularity - a.popularity);

  const stats = [
    { number: "1,000+", label: "Consultas Diárias", icon: <Users className="w-6 h-6" /> },
    { number: "98%", label: "Satisfação", icon: <Star className="w-6 h-6" /> },
    { number: "24/7", label: "Disponível", icon: <Clock className="w-6 h-6" /> }
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
              <div className="text-6xl mb-6">🔮</div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Nossos Serviços
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                Descubra uma ampla gama de serviços espirituais para 
                iluminar seu caminho e transformar sua vida
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

        {/* Filtros e Busca */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Busca */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar serviços..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filtro por Categoria */}
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Categoria:</span>
                </div>

                <div className="flex-1 max-w-xs">
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
                  {filteredServices.length} serviços encontrados
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lista de Serviços */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                    <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-10 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            ) : sortedServices.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedServices.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                      <div className="relative overflow-hidden">
                        <img
                          src={service.imageUrl}
                          alt={service.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`}></div>
                        <div className="absolute top-4 left-4 text-white">
                          {service.icon}
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                            {service.popularity}% satisfação
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {service.duration}
                          </span>
                          <span className="font-medium text-primary">
                            {service.price}
                          </span>
                        </div>
                        
                        <a
                          href={service.link}
                          className="block w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
                        >
                          Ver Detalhes
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Nenhum serviço encontrado
                </h3>
                <p className="text-gray-600 mb-6">
                  Tente ajustar seus filtros ou termo de busca
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Não Encontrou o que Procurava?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Entre em contato conosco e nossa equipe encontrará o consultor perfeito para suas necessidades
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contato"
                  className="bg-white text-primary font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                >
                  Fale Conosco
                </a>
                <a
                  href="/consultores"
                  className="border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-colors duration-300"
                >
                  Ver Consultores
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
  );
}