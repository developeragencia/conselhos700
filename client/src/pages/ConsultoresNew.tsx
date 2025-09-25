import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Star, 
  Clock, 
  MessageCircle, 
  Video, 
  Phone, 
  Search,
  Filter,
  Heart,
  Sparkles,
  Eye,
  Users,
  Award,
  ChevronRight
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

export default function ConsultoresNew() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const { data: consultants = [], isLoading, error } = useQuery({
    queryKey: ['/api/consultants'],
    retry: false,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  // Tratamento global de erros
  React.useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      console.warn('Unhandled promise rejection prevented:', event.reason);
    };

    const handleError = (event: ErrorEvent) => {
      event.preventDefault();
      console.warn('Error event caught:', event.error);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-red-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Erro ao carregar consultores</h2>
          <p className="text-xl opacity-80">Tente recarregar a página</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/10 backdrop-blur-lg h-96 rounded-3xl mb-4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
      case 'online': return 'bg-emerald-500';
      case 'busy': return 'bg-amber-500';
      case 'offline': return 'bg-slate-500';
      default: return 'bg-slate-500';
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

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty.toLowerCase()) {
      case 'tarot': return '🔮';
      case 'astrologia': return '⭐';
      case 'numerologia': return '🔢';
      case 'mediunidade': return '👁️';
      case 'terapias': return '🌸';
      default: return '✨';
    }
  };

  const getSpecialtyGradient = (specialty: string) => {
    switch (specialty.toLowerCase()) {
      case 'tarot': return 'from-purple-600 to-pink-600';
      case 'astrologia': return 'from-blue-600 to-indigo-600';
      case 'numerologia': return 'from-green-600 to-teal-600';
      case 'mediunidade': return 'from-indigo-600 to-purple-600';
      case 'terapias': return 'from-pink-600 to-rose-600';
      default: return 'from-violet-600 to-purple-600';
    }
  };

  const startConsultation = (consultant: Consultant, method: string) => {
    if (method === 'whatsapp' && consultant.whatsapp) {
      const message = encodeURIComponent(`Olá ${consultant.name}, gostaria de agendar uma consulta.`);
      const whatsappNumber = consultant.whatsapp.replace(/\D/g, '');
      if (whatsappNumber) {
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
      }
    } else {
      window.location.href = `/consulta/${consultant.id}?method=${method}`;
    }
  };

  const specialties = ['all', 'tarot', 'astrologia', 'numerologia', 'mediunidade', 'terapias'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Nossos Consultores
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Conecte-se com especialistas em esoterismo e encontre orientação espiritual personalizada
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <Input
                  placeholder="Buscar consultor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-2xl h-14"
                />
              </div>

              {/* Specialty Filter */}
              <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-2xl h-14">
                  <Filter className="w-5 h-5 mr-2" />
                  <SelectValue placeholder="Especialidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Especialidades</SelectItem>
                  {specialties.slice(1).map(specialty => (
                    <SelectItem key={specialty} value={specialty}>
                      {getSpecialtyIcon(specialty)} {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-2xl h-14">
                  <Users className="w-5 h-5 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="busy">Ocupado</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Filter */}
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-2xl h-14">
                  <Clock className="w-5 h-5 mr-2" />
                  <SelectValue placeholder="Preço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os preços</SelectItem>
                  <SelectItem value="low">Até R$ 3,00/min</SelectItem>
                  <SelectItem value="medium">R$ 3,00 - R$ 4,00/min</SelectItem>
                  <SelectItem value="high">Acima de R$ 4,00/min</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-center mb-8">
          <p className="text-white/80 text-lg">
            {filteredConsultants.length} consultor{filteredConsultants.length !== 1 ? 'es' : ''} encontrado{filteredConsultants.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Consultants Grid */}
        {filteredConsultants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredConsultants.map((consultant: Consultant) => {
              const rating = (() => {
                try {
                  const r = typeof consultant.rating === 'string' ? 
                    parseFloat(consultant.rating || '0') : 
                    (consultant.rating || 0);
                  return isNaN(r) ? 0 : r;
                } catch {
                  return 0;
                }
              })();
              
              const price = (() => {
                try {
                  const p = typeof consultant.pricePerMinute === 'string' ? 
                    parseFloat(consultant.pricePerMinute || '0') : 
                    (consultant.pricePerMinute || 0);
                  return isNaN(p) ? 0 : p;
                } catch {
                  return 0;
                }
              })();

              return (
                <Card key={consultant.id} className="group relative bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl overflow-hidden hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                  {/* Status indicator */}
                  <div className="absolute top-6 right-6 z-10">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(consultant.status)} shadow-lg`}>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(consultant.status)} animate-ping`}></div>
                    </div>
                  </div>

                  {/* Specialty gradient header */}
                  <div className={`h-2 bg-gradient-to-r ${getSpecialtyGradient(consultant.specialty)}`}></div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      {/* Avatar */}
                      <div className={`relative w-16 h-16 bg-gradient-to-br ${getSpecialtyGradient(consultant.specialty)} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <span className="text-white font-bold text-xl">
                          {consultant.name?.charAt(0) || 'C'}
                        </span>
                        <div className="absolute -bottom-1 -right-1 text-lg">
                          {getSpecialtyIcon(consultant.specialty)}
                        </div>
                      </div>

                      {/* Name and title */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white truncate">
                          {consultant.name || 'Consultor'}
                        </h3>
                        <p className="text-sm text-white/70 truncate">
                          {consultant.title || consultant.specialty}
                        </p>
                        <Badge variant="secondary" className={`mt-2 bg-gradient-to-r ${getSpecialtyGradient(consultant.specialty)} text-white border-0 text-xs`}>
                          {consultant.specialty || 'Especialista'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Rating and reviews */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="font-semibold text-white">{rating.toFixed(1)}</span>
                        </div>
                        <span className="text-sm text-white/70">({consultant.reviewCount || 0})</span>
                      </div>
                      <Badge variant="outline" className={`${getStatusColor(consultant.status)} text-white border-0 text-xs px-3 py-1`}>
                        {getStatusText(consultant.status)}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white/80 leading-relaxed line-clamp-3">
                      {consultant.description ? 
                        consultant.description.substring(0, 120) + '...' : 
                        'Consultor especializado em orientação espiritual e desenvolvimento pessoal'}
                    </p>

                    {/* Price */}
                    <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-white">
                            R$ {price.toFixed(2)}
                          </span>
                          <span className="text-sm text-white/70 ml-1">/minuto</span>
                        </div>
                        <Clock className="w-5 h-5 text-white/60" />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {consultant.status === 'online' ? (
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            onClick={() => startConsultation(consultant, 'chat')}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl h-12 transition-all duration-300 hover:scale-105"
                            size="sm"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Chat
                          </Button>
                          <Button
                            onClick={() => startConsultation(consultant, 'video')}
                            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-2xl h-12 transition-all duration-300 hover:scale-105"
                            size="sm"
                          >
                            <Video className="w-4 h-4 mr-2" />
                            Vídeo
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => startConsultation(consultant, 'whatsapp')}
                          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-2xl h-12 transition-all duration-300 hover:scale-105"
                          size="sm"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Agendar via WhatsApp
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        className="w-full border-white/20 text-white hover:bg-white/10 rounded-2xl h-12 transition-all duration-300 hover:scale-105 group" 
                        size="sm"
                        onClick={() => window.location.href = `/consultores/${consultant.id}`}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Perfil Completo
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>

                    {/* Favorite button */}
                    <div className="flex justify-center pt-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-white/60 hover:text-pink-400 hover:bg-pink-500/10 rounded-full w-10 h-10 p-0 transition-all duration-300"
                      >
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-32 h-32 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-16 h-16 text-white/60" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Nenhum consultor encontrado
            </h3>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              Tente ajustar seus filtros de busca para encontrar consultores disponíveis
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSpecialtyFilter('all');
                setStatusFilter('all');
                setPriceFilter('all');
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl h-14 px-8 transition-all duration-300 hover:scale-105"
            >
              <Filter className="w-5 h-5 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}