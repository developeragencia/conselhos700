import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ConsultantCard } from "@/components/ConsultantCard";
import { Leaf, Heart, Sparkles, Search, Filter, Users } from "lucide-react";

export default function ConsultoresTerapeutas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const { data: consultants, isLoading } = useQuery({
    queryKey: ["/api/consultants", { specialty: "terapeutas", search: searchTerm }],
  });

  const specialties = [
    { value: "all", label: "Todas as Especialidades" },
    { value: "reiki", label: "Reiki" },
    { value: "cristais", label: "Cristaloterapia" },
    { value: "aromaterapia", label: "Aromaterapia" },
    { value: "florais", label: "Florais de Bach" },
    { value: "reflexologia", label: "Reflexologia" },
    { value: "acupuntura", label: "Acupuntura" }
  ];

  const filteredConsultants = consultants?.filter(consultant => 
    consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedSpecialty === "all" || consultant.specialties?.includes(selectedSpecialty))
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-600/90 to-teal-600/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Leaf className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Terapeutas Holísticos
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Encontre equilíbrio e bem-estar com nossos terapeutas especializados em técnicas holísticas e energéticas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar terapeuta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {specialties.map(specialty => (
                  <option key={specialty.value} value={specialty.value}>
                    {specialty.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Consultores */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nossos Terapeutas
          </motion.h2>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg animate-pulse">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredConsultants.map((consultant, index) => (
                <motion.div
                  key={consultant.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ConsultantCard consultant={consultant} />
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && filteredConsultants.length === 0 && (
            <div className="text-center py-12">
              <Leaf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                Nenhum terapeuta encontrado
              </h3>
              <p className="text-gray-500">
                Tente ajustar os filtros ou buscar por outro termo
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sua jornada de cura começa aqui
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Descubra o poder das terapias holísticas e inicie sua transformação pessoal hoje mesmo
            </p>
            <a
              href="/contato"
              className="inline-block bg-white text-green-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Agendar Sessão
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}