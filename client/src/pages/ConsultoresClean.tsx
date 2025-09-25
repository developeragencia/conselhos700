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
  MapPin,
  Shield,
  Award,
  Users,
  Heart,
  Eye
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

export default function ConsultoresClean() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const { data: consultants = [], isLoading, error } = useQuery({
    queryKey: ['/api/consultants/featured'],
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
      console.warn('JavaScript error prevented:', event.error);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro ao carregar consultores</h2>
          <p className="text-gray-600">Tente recarregar a página</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-xl shadow-sm h-96"></div>
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
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
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

  const getSpecialtyColor = (specialty: string) => {
    switch (specialty.toLowerCase()) {
      case 'tarot': return 'bg-purple-100 text-purple-800';
      case 'astrologia': return 'bg-blue-100 text-blue-800';
      case 'numerologia': return 'bg-green-100 text-green-800';
      case 'mediunidade': return 'bg-indigo-100 text-indigo-800';
      case 'terapias': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nossos Consultores Especializados
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conecte-se com profissionais experientes em esoterismo e encontre orientação espiritual personalizada
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar consultor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Specialty Filter */}
              <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500">
                  <Filter className="w-4 h-4 mr-2 text-gray-400" />
                  <SelectValue placeholder="Especialidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Especialidades</SelectItem>
                  {specialties.slice(1).map(specialty => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500">
                  <Users className="w-4 h-4 mr-2 text-gray-400" />
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
                <SelectTrigger className="border-gray-300 focus:border-blue-500">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
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
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredConsultants.length} consultor{filteredConsultants.length !== 1 ? 'es' : ''} encontrado{filteredConsultants.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Consultants Grid */}
        {filteredConsultants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredConsultants.map((consultant: Consultant) => {
              const rating = parseFloat(String(consultant.rating)) || 0;
              const price = parseFloat(String(consultant.pricePerMinute)) || 0;

              return (
                <div key={consultant.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  {/* Status indicator */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(consultant.status)}`}></div>
                    <Badge className={`${getSpecialtyColor(consultant.specialty)} text-xs`}>
                      {consultant.specialty}
                    </Badge>
                  </div>

                  {/* Profile Image - MAIOR E MAIS VISÍVEL */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 mb-4">
                      <img
                        src={consultant.imageUrl || '/images/consultores/default.jpg'}
                        alt={consultant.name}
                        className="w-full h-full rounded-full object-cover border-3 border-gray-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(consultant.name)}&background=6366f1&color=fff&size=96`;
                        }}
                      />
                    </div>

                    {/* Nome e título */}
                    <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                      {consultant.name}
                    </h3>
                    <p className="text-sm text-gray-600 text-center mb-3">
                      {consultant.title}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold text-gray-900">{rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500 ml-1">({consultant.reviewCount})</span>
                  </div>

                  {/* Descrição */}
                  <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2">
                    {consultant.description}
                  </p>

                  {/* Preço */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4 text-center">
                    <span className="text-2xl font-bold text-gray-900">R$ {price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">/min</span>
                  </div>

                  {/* Status */}
                  <div className="text-center mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      consultant.status === 'online' ? 'bg-green-100 text-green-800' :
                      consultant.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {getStatusText(consultant.status)}
                    </span>
                  </div>

                  {/* Botões de ação */}
                  <div className="space-y-2">
                    {consultant.status === 'online' ? (
                      <>
                        <Button
                          onClick={() => startConsultation(consultant, 'chat')}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          size="sm"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Iniciar Chat
                        </Button>
                        <Button
                          onClick={() => startConsultation(consultant, 'video')}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                          size="sm"
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Vídeo Chamada
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => startConsultation(consultant, 'whatsapp')}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        size="sm"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50" 
                      size="sm"
                      onClick={() => window.location.href = `/consultores/${consultant.id}`}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Perfil
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum consultor encontrado
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Tente ajustar seus filtros de busca para encontrar consultores disponíveis
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSpecialtyFilter('all');
                setStatusFilter('all');
                setPriceFilter('all');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Filter className="w-4 h-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}