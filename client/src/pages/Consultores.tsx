import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Star, 
  Clock, 
  Users, 
  Search,
  Filter,
  MapPin,
  Award,
  Heart,
  Zap,
  MessageCircle,
  Video,
  Phone
} from "lucide-react";

interface Consultant {
  id: number;
  name: string;
  title: string;
  description: string;
  pricePerMinute: string | number;
  rating: string | number;
  reviewCount: number;
  imageUrl: string;
  whatsapp: string;
  specialty: string;
  isActive: boolean;
  status: string;
}

export default function Consultores() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Tratamento global de erros
  React.useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      console.warn('Unhandled promise rejection caught:', event.reason);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => window.removeEventListener('unhandledrejection', handleUnhandledRejection);
  }, []);

  // Buscar todos os consultores do banco
  const { data: consultants = [], isLoading, error } = useQuery({
    queryKey: ['/api/consultants'],
    retry: false,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  // Tratar erro se houver
  if (error) {
    console.error('Erro ao carregar consultores:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Erro ao carregar consultores</h2>
          <p className="text-gray-600">Tente recarregar a página</p>
        </div>
      </div>
    );
  }

  // Filtrar consultores com validação completa de tipos
  const filteredConsultants = (() => {
    try {
      if (!Array.isArray(consultants)) return [];
      
      return consultants.filter((consultant: Consultant) => {
        try {
          if (!consultant || typeof consultant !== 'object') return false;
          
          const name = consultant.name || '';
          const specialty = consultant.specialty || '';
          const title = consultant.title || '';
          
          const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               title.toLowerCase().includes(searchTerm.toLowerCase());
          
          const matchesSpecialty = specialtyFilter === 'all' || specialty.toLowerCase() === specialtyFilter.toLowerCase();
          
          let price = 0;
          try {
            price = typeof consultant.pricePerMinute === 'string' ? 
                   parseFloat(consultant.pricePerMinute || '0') : 
                   (consultant.pricePerMinute || 0);
            if (isNaN(price)) price = 0;
          } catch {
            price = 0;
          }
          
          const matchesPrice = priceFilter === 'all' || 
                              (priceFilter === 'low' && price < 3.00) ||
                              (priceFilter === 'medium' && price >= 3.00 && price < 4.00) ||
                              (priceFilter === 'high' && price >= 4.00);
          
          const matchesStatus = statusFilter === 'all' || consultant.status === statusFilter;

          return matchesSearch && matchesSpecialty && matchesPrice && matchesStatus;
        } catch {
          return false;
        }
      });
    } catch {
      return [];
    }
  })();

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

  const startConsultation = (consultant: Consultant, method: 'chat' | 'video' | 'phone' | 'whatsapp') => {
    try {
      if (method === 'whatsapp' && consultant.whatsapp) {
        const message = encodeURIComponent(`Olá ${consultant.name || ''}, gostaria de agendar uma consulta de ${consultant.specialty || ''}.`);
        const whatsappNumber = consultant.whatsapp.replace(/\D/g, '');
        if (whatsappNumber) {
          window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        }
      } else {
        // Redirecionar para sistema de consulta
        window.location.href = `/consulta/${consultant.id}?method=${method}`;
      }
    } catch (error) {
      console.error('Erro ao iniciar consulta:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-400 rounded-full mb-6">
              <Users className="w-8 h-8 text-amber-900" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nossos Consultores
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Profissionais especializados em diversas áreas esotéricas prontos para orientar você
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Filter className="w-5 h-5 mr-2 text-indigo-600" />
                  Filtrar Consultores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Busca */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Buscar por nome ou especialidade..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Especialidade */}
                  <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Especialidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas Especialidades</SelectItem>
                      <SelectItem value="tarot">Tarot</SelectItem>
                      <SelectItem value="astrologia">Astrologia</SelectItem>
                      <SelectItem value="mediunidade">Mediunidade</SelectItem>
                      <SelectItem value="numerologia">Numerologia</SelectItem>
                      <SelectItem value="cristaloterapia">Cristaloterapia</SelectItem>
                      <SelectItem value="runas">Runas</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Preço */}
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Faixa de Preço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Preços</SelectItem>
                      <SelectItem value="low">Até R$ 3,00/min</SelectItem>
                      <SelectItem value="medium">R$ 3,00 - R$ 4,00/min</SelectItem>
                      <SelectItem value="high">Acima de R$ 4,00/min</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Status */}
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Disponibilidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="busy">Ocupado</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Lista de Consultores */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {filteredConsultants.length} consultores encontrados
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <Award className="w-5 h-5" />
                <span>Todos Verificados</span>
              </div>
            </div>
          </motion.div>

          {filteredConsultants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredConsultants.map((consultant: Consultant, index: number) => (
                <motion.div
                  key={consultant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {consultant.name ? consultant.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'NA'}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(consultant.status)} rounded-full border-2 border-white`}></div>
                          </div>
                          <div>
                            <CardTitle className="text-lg font-bold text-gray-900">
                              {consultant.name}
                            </CardTitle>
                            <p className="text-sm text-gray-600">{consultant.title}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                          {consultant.specialty}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Avaliação e Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="font-semibold">{(() => {
                            try {
                              const rating = typeof consultant.rating === 'string' ? parseFloat(consultant.rating || '0') : (consultant.rating || 0);
                              return isNaN(rating) ? '0.0' : rating.toFixed(1);
                            } catch {
                              return '0.0';
                            }
                          })()}</span>
                          <span className="text-sm text-gray-600">({consultant.reviewCount || 0})</span>
                        </div>
                        <Badge variant="outline" className={`${getStatusColor(consultant.status)} text-white border-0`}>
                          {getStatusText(consultant.status)}
                        </Badge>
                      </div>

                      {/* Descrição */}
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {consultant.description ? consultant.description.substring(0, 120) + '...' : 'Consultor especializado'}
                      </p>

                      {/* Preço */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-lg font-bold text-indigo-600">
                            R$ {(() => {
                              try {
                                const price = typeof consultant.pricePerMinute === 'string' ? parseFloat(consultant.pricePerMinute || '0') : (consultant.pricePerMinute || 0);
                                return isNaN(price) ? '0.00' : price.toFixed(2);
                              } catch {
                                return '0.00';
                              }
                            })()}
                          </span>
                          <span className="text-sm text-gray-600">/minuto</span>
                        </div>
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>

                      {/* Botões de Ação */}
                      <div className="space-y-2">
                        {consultant.status === 'online' ? (
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              onClick={() => startConsultation(consultant, 'chat')}
                              className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700"
                              size="sm"
                            >
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Chat
                            </Button>
                            <Button
                              onClick={() => startConsultation(consultant, 'video')}
                              className="flex items-center justify-center bg-purple-600 hover:bg-purple-700"
                              size="sm"
                            >
                              <Video className="w-4 h-4 mr-1" />
                              Vídeo
                            </Button>
                          </div>
                        ) : (
                          <Button
                            onClick={() => startConsultation(consultant, 'whatsapp')}
                            className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center"
                            size="sm"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Agendar via WhatsApp
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          size="sm"
                          onClick={() => window.location.href = `/consultores/${consultant.id}`}
                        >
                          Ver Perfil Completo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhum consultor encontrado
              </h3>
              <p className="text-gray-600 mb-6">
                Tente ajustar os filtros para encontrar consultores disponíveis
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSpecialtyFilter('all');
                  setPriceFilter('all');
                  setStatusFilter('all');
                }}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Limpar Filtros
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Não encontrou o que procurava?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e ajudaremos você a encontrar o consultor ideal para suas necessidades
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-amber-900 font-semibold"
                onClick={() => window.location.href = "/contact"}
              >
                <Heart className="w-5 h-5 mr-2" />
                Fale Conosco
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-indigo-900"
                onClick={() => window.location.href = "/comprar/creditos"}
              >
                  <Zap className="w-5 h-5 mr-2" />
                  Comprar Créditos
                </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}