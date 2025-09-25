import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MessageCircle, Video, Phone, Clock, Search, Heart, Eye } from "lucide-react";

import { Link } from "wouter";

interface Consultant {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  pricePerMinute: number;
  profileImage: string;
  status: 'online' | 'busy' | 'offline';
  description: string;
  experience: string;
  communicationMethods: string[];
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

  return (
    <Card className="h-full hover:shadow-lg transition-shadow border border-purple-100">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="w-16 h-16">
              <AvatarImage src={consultant.profileImage} alt={consultant.name} />
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
              <span className="text-sm font-medium">{consultant.rating.toFixed(1)}</span>
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
            <span className="text-sm text-gray-600">{consultant.experience}</span>
          </div>
          <span className="text-lg font-bold text-purple-600">
            R$ {consultant.pricePerMinute.toFixed(2)}/min
          </span>
        </div>

        <div className="flex gap-2 mb-4">
          {consultant.communicationMethods.includes('chat') && (
            <Badge variant="outline" className="text-xs">
              <MessageCircle className="w-3 h-3 mr-1" />
              Chat
            </Badge>
          )}
          {consultant.communicationMethods.includes('video') && (
            <Badge variant="outline" className="text-xs">
              <Video className="w-3 h-3 mr-1" />
              Vídeo
            </Badge>
          )}
          {consultant.communicationMethods.includes('phone') && (
            <Badge variant="outline" className="text-xs">
              <Phone className="w-3 h-3 mr-1" />
              Telefone
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Link href={`/consultor/${consultant.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              Ver Perfil
            </Button>
          </Link>
          
          {consultant.status === 'online' ? (
            <Link href={`/agendar-consulta/${consultant.id}`} className="flex-1">
              <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Consultar
              </Button>
            </Link>
          ) : (
            <Button size="sm" className="flex-1" disabled>
              {getStatusText(consultant.status)}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function Consultants() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");

  const { data: consultants = [], isLoading } = useQuery({
    queryKey: ["/api/consultants"],
  });

  const specialties = [
    "Tarot",
    "Astrologia", 
    "Vidência",
    "Numerologia",
    "Cartomancia",
    "Baralho Cigano",
    "Mediunidade",
    "Runas",
    "Cristaloterapia"
  ];

  const consultantList = consultants as Consultant[];
  const filteredConsultants = consultantList.filter((consultant: Consultant) => {
    const matchesSearch = searchTerm === "" || 
      consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultant.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty = activeSpecialty === "all" || consultant.specialty === activeSpecialty;
    const matchesStatus = activeStatus === "all" || consultant.status === activeStatus;

    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  const onlineConsultants = filteredConsultants.filter((c: Consultant) => c.status === 'online');
  const topRatedConsultants = filteredConsultants
    .sort((a: Consultant, b: Consultant) => b.rating - a.rating)
    .slice(0, 6);

  return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Nossos Consultores Especializados
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Conecte-se com especialistas em esoterismo e encontre as respostas que procura
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar por nome ou especialidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Filters */}
          <div className="mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Especialidades</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={activeSpecialty === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveSpecialty("all")}
                    className={activeSpecialty === "all" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    Todas
                  </Button>
                  {specialties.map((specialty) => (
                    <Button
                      key={specialty}
                      variant={activeSpecialty === specialty ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveSpecialty(specialty)}
                      className={activeSpecialty === specialty ? "bg-purple-600 hover:bg-purple-700" : ""}
                    >
                      {specialty}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Status</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={activeStatus === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveStatus("all")}
                    className={activeStatus === "all" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    Todos
                  </Button>
                  <Button
                    variant={activeStatus === "online" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveStatus("online")}
                    className={activeStatus === "online" ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    Online
                  </Button>
                  <Button
                    variant={activeStatus === "busy" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveStatus("busy")}
                    className={activeStatus === "busy" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
                  >
                    Ocupado
                  </Button>
                  <Button
                    variant={activeStatus === "offline" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveStatus("offline")}
                    className={activeStatus === "offline" ? "bg-gray-600 hover:bg-gray-700" : ""}
                  >
                    Offline
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="todos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="todos">Todos os Consultores</TabsTrigger>
              <TabsTrigger value="online">Online Agora</TabsTrigger>
              <TabsTrigger value="destaques">Destaques</TabsTrigger>
            </TabsList>

            <TabsContent value="todos">
              {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="h-80 animate-pulse">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-full" />
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded mb-2" />
                            <div className="h-3 bg-gray-200 rounded w-1/2" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded" />
                          <div className="h-3 bg-gray-200 rounded w-3/4" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredConsultants.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredConsultants.map((consultant: Consultant) => (
                    <ConsultantCard key={consultant.id} consultant={consultant} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Nenhum consultor encontrado
                  </h3>
                  <p className="text-gray-600">
                    Tente ajustar os filtros ou termo de busca
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="online">
              {onlineConsultants.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {onlineConsultants.map((consultant: Consultant) => (
                    <ConsultantCard key={consultant.id} consultant={consultant} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-green-400 mb-4">
                    <MessageCircle className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Nenhum consultor online
                  </h3>
                  <p className="text-gray-600">
                    Nossos consultores estão ocupados no momento. Tente novamente em breve.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="destaques">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topRatedConsultants.map((consultant: Consultant) => (
                  <ConsultantCard key={consultant.id} consultant={consultant} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
  );
}