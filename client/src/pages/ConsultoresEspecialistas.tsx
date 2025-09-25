import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/layouts/MainLayout";
import { ConsultantCard } from "@/components/ConsultantCard";
import { Search, Filter, Star, Clock, Users } from "lucide-react";

export default function ConsultoresEspecialistas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { data: consultants, isLoading } = useQuery({
    queryKey: ["/api/consultants"],
  });

  const specialties = [
    { value: "all", label: "Todas as Especialidades" },
    { value: "tarot", label: "Tarot" },
    { value: "astrologia", label: "Astrologia" },
    { value: "numerologia", label: "Numerologia" },
    { value: "runas", label: "Runas" },
    { value: "mediunidade", label: "Mediunidade" },
    { value: "oráculos", label: "Oráculos" },
    { value: "reiki", label: "Reiki" },
    { value: "cristaloterapia", label: "Cristaloterapia" }
  ];

  const statusOptions = [
    { value: "all", label: "Todos os Status" },
    { value: "online", label: "Online Agora" },
    { value: "busy", label: "Ocupado" },
    { value: "offline", label: "Offline" }
  ];

  const featuredConsultants = [
    {
      id: "1",
      name: "Consultor Especialista",
      title: "Taróloga Especialista",
      rating: 4.9,
      reviewCount: 127,
      description: "Médium e taróloga com mais de 15 anos de experiência. Especialista em amor, carreira e questões familiares.",
      price: 5.99,
      status: "online",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
      specialties: ["Tarot", "Mediunidade", "Amor"]
    },
    {
      id: "2",
      name: "João Astral",
      title: "Astrólogo Certificado",
      rating: 4.8,
      reviewCount: 98,
      description: "Astrólogo profissional especializado em mapas astrais, previsões e orientação de vida através dos astros.",
      price: 7.50,
      status: "online",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      specialties: ["Astrologia", "Mapa Astral", "Previsões"]
    },
    {
      id: "3",
      name: "Ana Números",
      title: "Numeróloga Expert",
      rating: 4.7,
      reviewCount: 85,
      description: "Especialista em numerologia pitagórica e cabalística. Decodifica os segredos dos números para orientar sua vida.",
      price: 6.25,
      status: "busy",
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b9ee9b90?q=80&w=1000&auto=format&fit=crop",
      specialties: ["Numerologia", "Ciclos Pessoais", "Compatibilidade"]
    }
  ];

  const stats = [
    { number: "50+", label: "Consultores Verificados", icon: <Users className="w-6 h-6" /> },
    { number: "4.8", label: "Avaliação Média", icon: <Star className="w-6 h-6" /> },
    { number: "24/7", label: "Disponibilidade", icon: <Clock className="w-6 h-6" /> }
  ];

  const filteredConsultants = featuredConsultants.filter(consultant => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecialty = selectedSpecialty === "all" || 
                            consultant.specialties.some(s => s.toLowerCase().includes(selectedSpecialty));
    
    const matchesStatus = selectedStatus === "all" || consultant.status === selectedStatus;
    
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/90 to-secondary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Consultores Especialistas
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                Conecte-se com nossos consultores verificados e experientes em diversas áreas esotéricas
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
              <div className="flex flex-col md:flex-row gap-4">
                {/* Busca */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Buscar por nome, especialidade..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Filtro Especialidade */}
                <div className="md:w-64">
                  <select
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                  >
                    {specialties.map(specialty => (
                      <option key={specialty.value} value={specialty.value}>
                        {specialty.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtro Status */}
                <div className="md:w-48">
                  <select
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    {statusOptions.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lista de Consultores */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {filteredConsultants.length} consultores encontrados
                </h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <Filter className="w-5 h-5" />
                  <span>Ordenar por: Mais relevantes</span>
                </div>
              </div>

              {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                      <div className="w-full h-48 bg-gray-300 rounded-xl mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : filteredConsultants.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredConsultants.map((consultant, index) => (
                    <motion.div
                      key={consultant.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <ConsultantCard consultant={consultant} index={index} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Nenhum consultor encontrado
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Tente ajustar os filtros ou buscar por outros termos
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedSpecialty("all");
                      setSelectedStatus("all");
                    }}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Limpar Filtros
                  </button>
                </div>
              )}
            </motion.div>
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
                Não Encontrou o que Procura?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Nossa equipe está sempre expandindo. Entre em contato e ajudaremos você a encontrar o consultor ideal
              </p>
              <a
                href="/contato"
                className="inline-block bg-white text-primary font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              >
                Falar Conosco
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}