import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MessageCircle, Video, Phone, Clock, Search, Eye } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

interface Consultant {
  id: number;
  name: string;
  specialty: string;
  rating: string;
  reviewCount: number;
  pricePerMinute: string;
  imageUrl: string;
  status: 'online' | 'busy' | 'offline';
  description: string;
  title: string;
  whatsapp: string;
}

const ConsultantCard = ({ consultant }: { consultant: Consultant }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'busy': return 'Ocupado';
      case 'offline': return 'Offline';
      default: return 'Indisponível';
    }
  };

  const openWhatsApp = () => {
    window.location.href = `/comprar/consultas?consultor=${consultant.id}&tipo=whatsapp`;
  };

  const startChat = () => {
    window.location.href = `/comprar/consultas?consultor=${consultant.id}&tipo=chat`;
  };

  const startVideo = () => {
    window.location.href = `/comprar/consultas?consultor=${consultant.id}&tipo=video`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow border border-purple-100 bg-gradient-to-br from-white to-purple-50/30">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarImage src={consultant.imageUrl} alt={consultant.name} />
                <AvatarFallback className="bg-purple-100 text-purple-600">
                  {consultant.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${getStatusColor(consultant.status)}`} />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg text-gray-900 truncate">{consultant.name}</CardTitle>
              <Badge variant="secondary" className="mt-1 bg-purple-100 text-purple-700">
                {consultant.specialty}
              </Badge>
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{parseFloat(consultant.rating).toFixed(1)}</span>
                <span className="text-sm text-gray-500">({consultant.reviewCount} avaliações)</span>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{consultant.description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{consultant.title}</span>
            </div>
            <span className="text-lg font-bold text-purple-600">
              R$ {parseFloat(consultant.pricePerMinute).toFixed(2)}/min
            </span>
          </div>

          <div className="flex gap-2 mb-4">
            <Button size="sm" variant="outline" className="flex-1" onClick={startChat}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button size="sm" variant="outline" className="flex-1" onClick={startVideo}>
              <Video className="w-4 h-4 mr-2" />
              Vídeo
            </Button>
            <Button size="sm" variant="outline" className="flex-1" onClick={openWhatsApp}>
              <Phone className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>

          <div className="flex gap-2">
            <Badge variant={consultant.status === 'online' ? 'default' : 'secondary'} className="text-xs">
              {getStatusText(consultant.status)}
            </Badge>
            <Link href={`/consultores/${consultant.id}`}>
              <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                <Eye className="w-4 h-4 mr-2" />
                Ver Perfil
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function ConsultoresEnhanced() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { data: consultants, isLoading, error } = useQuery({
    queryKey: ["/api/consultants"],
    retry: 1,
  });

  const consultantList = Array.isArray(consultants) ? consultants : [];

  const filteredConsultants = consultantList.filter((consultant: Consultant) => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || consultant.specialty === selectedSpecialty;
    const matchesStatus = selectedStatus === "all" || consultant.status === selectedStatus;
    
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  const onlineConsultants = filteredConsultants.filter((c: Consultant) => c.status === 'online');
  const topRatedConsultants = [...filteredConsultants]
    .sort((a: Consultant, b: Consultant) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 6);

  const specialties = Array.from(new Set(consultantList.map((c: Consultant) => c.specialty)));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar consultores</h2>
          <p className="text-gray-600">Ocorreu um erro ao buscar os dados dos consultores. Tente novamente mais tarde.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Nossos Consultores</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Conecte-se com especialistas em esoterismo e encontre orientação para sua jornada espiritual
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nome ou especialidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Todas as Especialidades</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="online">Online</option>
              <option value="busy">Ocupado</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </motion.div>

        {/* Tabs de Consultores */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white">
            <TabsTrigger value="all">Todos ({filteredConsultants.length})</TabsTrigger>
            <TabsTrigger value="online">Online ({onlineConsultants.length})</TabsTrigger>
            <TabsTrigger value="top">Mais Avaliados ({topRatedConsultants.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConsultants.map((consultant: Consultant) => (
                <ConsultantCard key={consultant.id} consultant={consultant} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="online" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onlineConsultants.map((consultant: Consultant) => (
                <ConsultantCard key={consultant.id} consultant={consultant} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="top" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topRatedConsultants.map((consultant: Consultant) => (
                <ConsultantCard key={consultant.id} consultant={consultant} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-6 mt-8"
        >
          <h3 className="text-lg font-semibold mb-4">Estatísticas dos Consultores</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">{consultantList.length}</div>
              <div className="text-sm text-gray-600">Total de Consultores</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{onlineConsultants.length}</div>
              <div className="text-sm text-gray-600">Online Agora</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{specialties.length}</div>
              <div className="text-sm text-gray-600">Especialidades</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">
                {consultantList.length > 0 
                  ? (consultantList.reduce((acc: number, c: Consultant) => acc + parseFloat(c.rating), 0) / consultantList.length).toFixed(1)
                  : '0.0'
                }
              </div>
              <div className="text-sm text-gray-600">Avaliação Média</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}