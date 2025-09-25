import React from "react";
import { motion } from "framer-motion";
import { CreditCard, Star, Clock, Shield, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

export default function ServicosTarot() {
  // Buscar consultores especializados em Tarot do banco PostgreSQL
  const { data: tarotConsultants = [], isLoading } = useQuery({
    queryKey: ['/api/consultants'],
    select: (data: any[]) => data.filter((consultant: any) => 
      consultant.specialty?.toLowerCase() === 'tarot'
    )
  });

  // Buscar dados reais da categoria Tarot
  const { data: serviceData } = useQuery({
    queryKey: ['/api/service-categories/tarot'],
    enabled: true
  });

  const tarotTypes = [
    {
      name: "Tarot Tradicional",
      description: "Leitura clássica com baralho Rider-Waite para orientação geral",
      duration: "30-45 min",
      price: "R$ 65-95",
      features: ["Interpretação completa", "Análise detalhada", "Orientações práticas"]
    },
    {
      name: "Tarot do Amor",
      description: "Especializado em questões amorosas e relacionamentos",
      duration: "25-40 min", 
      price: "R$ 55-85",
      features: ["Foco em relacionamentos", "Conselhos amorosos", "Previsões românticas"]
    },
    {
      name: "Tarot Profissional",
      description: "Orientações para carreira, trabalho e questões financeiras",
      duration: "35-50 min",
      price: "R$ 70-110",
      features: ["Análise de carreira", "Oportunidades futuras", "Decisões importantes"]
    },
    {
      name: "Tarot Cigano",
      description: "Leitura com cartas ciganas para insights profundos",
      duration: "40-60 min",
      price: "R$ 75-120",
      features: ["Tradição cigana", "Insights únicos", "Orientação espiritual"]
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4"
        >
          <div className="flex items-center justify-center mb-6">
            <CreditCard className="w-16 h-16 text-purple-600 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Consultas de Tarot
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Descubra seu futuro através das cartas do Tarot. Nossos especialistas certificados 
            oferecem leituras precisas e orientações valiosas para sua vida.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              +50 Especialistas Certificados
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              4.9/5 Avaliação Média
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              100% Confidencial
            </Badge>
          </div>
        </motion.div>
      </section>

      {/* Types of Tarot */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tipos de Consulta de Tarot
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Escolha o tipo de leitura que melhor se adequa às suas necessidades
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tarotTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-purple-100">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="text-xl font-bold">{type.name}</CardTitle>
                    <CardDescription className="text-purple-100">
                      {type.duration} • {type.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4 text-sm">
                      {type.description}
                    </p>
                    <ul className="space-y-2">
                      {type.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href="/consultores/tarot">
                      <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                        Consultar Agora
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Consultants */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Especialistas em Tarot
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça nossos tarólogos certificados com anos de experiência
            </p>
          </motion.div>

          {tarotConsultants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tarotConsultants.slice(0, 6).map((consultant: any, index: number) => (
                <motion.div
                  key={consultant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <img 
                        src={consultant.imageUrl || '/images/consultants/default.jpg'} 
                        alt={consultant.name}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="font-bold text-lg mb-2">{consultant.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{consultant.title}</p>
                      <div className="flex items-center justify-center mb-4">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="ml-1 text-sm">{consultant.rating || '4.9'}</span>
                        <span className="text-gray-500 text-sm ml-1">
                          ({consultant.reviewCount || '120'} avaliações)
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {consultant.description?.substring(0, 100)}...
                      </p>
                      <Link href={`/consultores/${consultant.id}`}>
                        <Button className="w-full">
                          Ver Perfil
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Nenhum especialista em Tarot encontrado no momento.
              </p>
              <Link href="/data-management">
                <Button className="mt-4">
                  Adicionar Consultores
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Escolha seu Tarólogo",
                description: "Selecione entre nossos especialistas certificados baseado em avaliações e especialidades",
                icon: Users
              },
              {
                step: "2", 
                title: "Defina sua Pergunta",
                description: "Prepare suas questões ou deixe que as cartas revelem o que você precisa saber",
                icon: CreditCard
              },
              {
                step: "3",
                title: "Receba sua Leitura",
                description: "Obtenha orientações detalhadas e precisas através de chat, vídeo ou telefone",
                icon: Clock
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-purple-600" />
                </div>
                <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link href="/consultores/tarot">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                Começar Consulta de Tarot
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}