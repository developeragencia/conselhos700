import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { TestimonialCard } from "@/components/TestimonialCard";
import { Star, Quote, Filter, Users } from "lucide-react";

export default function Testimonials() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/testimonials", { category: selectedCategory, rating: selectedRating }],
  });

  const categories = [
    { value: "all", label: "Todos os Serviços" },
    { value: "tarot", label: "Tarot" },
    { value: "astrologia", label: "Astrologia" },
    { value: "numerologia", label: "Numerologia" },
    { value: "mediunidade", label: "Mediunidade" },
    { value: "runas", label: "Runas" }
  ];

  const ratings = [
    { value: "all", label: "Todas as Avaliações" },
    { value: "5", label: "5 Estrelas" },
    { value: "4", label: "4+ Estrelas" },
    { value: "3", label: "3+ Estrelas" }
  ];

  const featuredTestimonials = [
    {
      id: 1,
      content: "A consulta com a Consultor Especialista foi transformadora! Ela me ajudou a entender questões que eu carregava há anos. O tarot dela é muito preciso.",
      author: {
        name: "Ana Carolina",
        location: "São Paulo, SP",
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b9ee9b90?q=80&w=1000&auto=format&fit=crop"
      },
      rating: 5,
      service: "Tarot",
      date: "2024-01-15"
    },
    {
      id: 2,
      content: "O mapa astral do João foi incrível! Ele explicou tudo de forma clara e me deu insights valiosos sobre minha personalidade e futuro.",
      author: {
        name: "Roberto Silva",
        location: "Rio de Janeiro, RJ",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
      },
      rating: 5,
      service: "Astrologia",
      date: "2024-01-12"
    },
    {
      id: 3,
      content: "A numerologia da Ana me ajudou a entender meus ciclos de vida. Agora sei quando são os melhores momentos para tomar decisões importantes.",
      author: {
        name: "Clientena Costa",
        location: "Belo Horizonte, MG",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop"
      },
      rating: 5,
      service: "Numerologia",
      date: "2024-01-10"
    },
    {
      id: 4,
      content: "Consulta incrível! A médium conseguiu me conectar com mensagens muito importantes. Saí da consulta com uma paz interior que não sentia há tempos.",
      author: {
        name: "Carlos Eduardo",
        location: "Salvador, BA",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"
      },
      rating: 5,
      service: "Mediunidade",
      date: "2024-01-08"
    },
    {
      id: 5,
      content: "As runas me deram clareza sobre uma situação profissional complexa. As orientações foram precisas e me ajudaram a tomar a melhor decisão.",
      author: {
        name: "Patricia Oliveira",
        location: "Porto Alegre, RS",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop"
      },
      rating: 4,
      service: "Runas",
      date: "2024-01-05"
    },
    {
      id: 6,
      content: "Excelente plataforma! Fácil de usar e consultores muito qualificados. Já fiz várias consultas e sempre saio satisfeita.",
      author: {
        name: "Juliana Santos",
        location: "Curitiba, PR",
        imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop"
      },
      rating: 5,
      service: "Tarot",
      date: "2024-01-03"
    }
  ];

  const filteredTestimonials = featuredTestimonials.filter(testimonial => {
    const matchesCategory = selectedCategory === "all" || 
                           testimonial.service.toLowerCase() === selectedCategory;
    
    const matchesRating = selectedRating === "all" || 
                         testimonial.rating >= parseInt(selectedRating);
    
    return matchesCategory && matchesRating;
  });

  const stats = [
    { number: "2,500+", label: "Depoimentos", icon: <Quote className="w-6 h-6" /> },
    { number: "4.9", label: "Avaliação Média", icon: <Star className="w-6 h-6" /> },
    { number: "98%", label: "Satisfação", icon: <Users className="w-6 h-6" /> }
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
              <Quote className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Depoimentos
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                Veja o que nossos clientes falam sobre suas experiências transformadoras
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
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Filtrar por:</span>
                </div>

                {/* Filtro Categoria */}
                <div className="md:w-64">
                  <select
                    className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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

                {/* Filtro Avaliação */}
                <div className="md:w-48">
                  <select
                    className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                  >
                    {ratings.map(rating => (
                      <option key={rating.value} value={rating.value}>
                        {rating.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lista de Depoimentos */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {filteredTestimonials.length} depoimentos encontrados
                </h2>
              </div>

              {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                        <div>
                          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                          <div className="h-3 bg-gray-300 rounded w-16"></div>
                        </div>
                      </div>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : filteredTestimonials.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTestimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                        <div className="flex items-center mb-4">
                          <img
                            src={testimonial.author.imageUrl}
                            alt={testimonial.author.name}
                            className="w-12 h-12 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h3 className="font-bold text-gray-800">{testimonial.author.name}</h3>
                            <p className="text-sm text-gray-600">{testimonial.author.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < testimonial.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                            {testimonial.service}
                          </span>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-4">
                          "{testimonial.content}"
                        </p>

                        <div className="text-xs text-gray-500">
                          {new Date(testimonial.date).toLocaleDateString('pt-BR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Quote className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Nenhum depoimento encontrado
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Tente ajustar os filtros para ver mais depoimentos
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedRating("all");
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
                Seja o Próximo a se Transformar
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Junte-se aos milhares de pessoas que já encontraram clareza e direção através dos nossos consultores
              </p>
              <a
                href="/consultores"
                className="inline-block bg-white text-primary font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              >
                Começar Agora
              </a>
            </motion.div>
          </div>
        </section>
      </div>
  );
}