import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Clock, MessageCircle, Video, Phone } from "lucide-react";

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

export default function ConsultoresSimple() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: consultants = [], isLoading, error } = useQuery({
    queryKey: ['/api/consultants'],
    retry: false,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  // Tratamento global de erros não tratados
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Erro ao carregar consultores</h2>
          <p className="text-gray-600">Tente recarregar a página</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const filteredConsultants = Array.isArray(consultants) ? consultants.filter((consultant: Consultant) => {
    if (!consultant || !consultant.name) return false;
    return consultant.name.toLowerCase().includes(searchTerm.toLowerCase());
  }) : [];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Nossos Consultores Especializados
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conecte-se com nossos especialistas em esoterismo e encontre orientação espiritual personalizada
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <Input
            placeholder="Buscar consultor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Results count */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            {filteredConsultants.length} consultor{filteredConsultants.length !== 1 ? 'es' : ''} encontrado{filteredConsultants.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Consultants Grid */}
        {filteredConsultants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConsultants.map((consultant: Consultant) => {
              const rating = typeof consultant.rating === 'string' ? 
                parseFloat(consultant.rating || '0') : 
                (consultant.rating || 0);
              
              const price = typeof consultant.pricePerMinute === 'string' ? 
                parseFloat(consultant.pricePerMinute || '0') : 
                (consultant.pricePerMinute || 0);

              return (
                <Card key={consultant.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-semibold text-lg">
                            {consultant.name?.charAt(0) || 'C'}
                          </span>
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-800">
                            {consultant.name || 'Consultor'}
                          </CardTitle>
                          <p className="text-sm text-gray-600">{consultant.title || consultant.specialty}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                        {consultant.specialty || 'Especialista'}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Rating and Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{rating.toFixed(1)}</span>
                        <span className="text-sm text-gray-600">({consultant.reviewCount || 0})</span>
                      </div>
                      <Badge variant="outline" className={`${getStatusColor(consultant.status)} text-white border-0`}>
                        {getStatusText(consultant.status)}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {consultant.description ? 
                        consultant.description.substring(0, 120) + '...' : 
                        'Consultor especializado em orientação espiritual'}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-lg font-bold text-indigo-600">
                          R$ {price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-600">/minuto</span>
                      </div>
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>

                    {/* Action Buttons */}
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
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhum consultor encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar sua busca para encontrar consultores disponíveis
            </p>
            <Button 
              onClick={() => setSearchTerm('')}
              variant="outline"
            >
              Limpar Busca
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}