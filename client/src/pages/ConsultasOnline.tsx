import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Star, 
  Clock, 
  Users, 
  Video, 
  MessageCircle, 
  Phone, 
  CreditCard,
  Filter,
  Search,
  Circle
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface Consultant {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  totalConsultations: number;
  pricePerMinute: number;
  isOnline: boolean;
  profileImage: string;
  bio: string;
  specialtyAreas: string[];
  communicationMethods: string[];
  currentClients: number;
}

interface ConsultationQueue {
  id: number;
  position: number;
  estimatedWaitTime: number;
}

export default function ConsultasOnline() {
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [communicationMethod, setCommunicationMethod] = useState<string>('');
  const [maxPricePerMinute, setMaxPricePerMinute] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Buscar consultores disponíveis
  const { data: consultants = [], isLoading } = useQuery({
    queryKey: ['/api/consultation/available-consultants'],
    refetchInterval: 10000, // Atualizar a cada 10 segundos
  });

  // Buscar estatísticas em tempo real
  const { data: stats } = useQuery({
    queryKey: ['/api/consultation/stats'],
    refetchInterval: 5000,
  });

  // Mutação para entrar na fila
  const joinQueueMutation = useMutation({
    mutationFn: (queueData: any) => 
      apiRequest('POST', '/api/consultation/queue', queueData),
    onSuccess: (data: ConsultationQueue) => {
      toast({
        title: "Entrada na fila confirmada",
        description: `Posição: ${data.position}. Tempo estimado: ${data.estimatedWaitTime} min`,
      });
      setShowBookingDialog(false);
      queryClient.invalidateQueries({ queryKey: ['/api/consultation/stats'] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao entrar na fila",
        description: error.message || "Tente novamente em alguns segundos",
        variant: "destructive",
      });
    }
  });

  // Mutação para criar sala de consulta direta
  const createRoomMutation = useMutation({
    mutationFn: (roomData: any) => 
      apiRequest('POST', '/api/consultation/room', roomData),
    onSuccess: (data: any) => {
      toast({
        title: "Sala criada com sucesso",
        description: "Redirecionando para a consulta...",
      });
      // Redirecionar para a sala de consulta
      window.location.href = `/consultation/${data.roomId}`;
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar sala",
        description: error.message || "Tente novamente",
        variant: "destructive",
      });
    }
  });

  const filteredConsultants = consultants.filter((consultant: Consultant) => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !specialtyFilter || consultant.specialtyAreas.includes(specialtyFilter);
    const matchesPrice = consultant.pricePerMinute <= maxPricePerMinute;
    
    return matchesSearch && matchesSpecialty && matchesPrice;
  });

  const handleBookConsultation = () => {
    if (!selectedConsultant || !communicationMethod) {
      toast({
        title: "Informações incompletas",
        description: "Selecione um consultor e método de comunicação",
        variant: "destructive",
      });
      return;
    }

    if (selectedConsultant.isOnline && selectedConsultant.currentClients === 0) {
      // Consultor disponível - criar sala diretamente
      createRoomMutation.mutate({
        consultantId: selectedConsultant.id,
        communicationMethod,
        creditsPerMinute: selectedConsultant.pricePerMinute
      });
    } else {
      // Consultor ocupado - entrar na fila
      joinQueueMutation.mutate({
        consultantId: selectedConsultant.id,
        serviceType: selectedConsultant.specialty,
        communicationMethod,
        maxPricePerMinute: selectedConsultant.pricePerMinute
      });
    }
  };

  const getCommunicationIcon = (method: string) => {
    switch (method) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Phone className="w-4 h-4" />;
      case 'chat': return <MessageCircle className="w-4 h-4" />;
      case 'whatsapp': return <FaWhatsapp className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getMethodLabel = (method: string) => {
    switch (method) {
      case 'video': return 'Vídeo Chamada';
      case 'audio': return 'Chamada de Áudio';
      case 'chat': return 'Chat de Texto';
      case 'whatsapp': return 'WhatsApp';
      default: return method;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Consultas Espirituais Online
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conecte-se instantaneamente com nossos especialistas através de chat, vídeo, áudio ou WhatsApp
            </p>
          </div>

          {/* Estatísticas em tempo real */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center text-green-600 mb-2">
                    <Circle className="w-5 h-5 mr-2 fill-current" />
                    <span className="font-semibold">{stats?.consultantsOnline || 0}</span>
                  </div>
                  <p className="text-sm text-gray-600">Consultores Online</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center text-blue-600 mb-2">
                    <Users className="w-5 h-5 mr-2" />
                    <span className="font-semibold">{stats.activeConsultations}</span>
                  </div>
                  <p className="text-sm text-gray-600">Consultas Ativas</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center text-purple-600 mb-2">
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="font-semibold">{stats.averageWaitTime}min</span>
                  </div>
                  <p className="text-sm text-gray-600">Tempo Médio</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center text-orange-600 mb-2">
                    <Users className="w-5 h-5 mr-2" />
                    <span className="font-semibold">{stats.queueSize}</span>
                  </div>
                  <p className="text-sm text-gray-600">Na Fila</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtrar Consultores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Nome ou especialidade..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="specialty">Especialidade</Label>
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas especialidades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas especialidades</SelectItem>
                    <SelectItem value="tarot">Tarot</SelectItem>
                    <SelectItem value="astrologia">Astrologia</SelectItem>
                    <SelectItem value="mediunidade">Mediunidade</SelectItem>
                    <SelectItem value="numerologia">Numerologia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Preço máximo por minuto</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="price"
                    type="number"
                    min="1"
                    max="20"
                    value={maxPricePerMinute}
                    onChange={(e) => setMaxPricePerMinute(Number(e.target.value))}
                  />
                  <span className="text-sm text-gray-600">R$</span>
                </div>
              </div>

              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSpecialtyFilter('');
                    setMaxPricePerMinute(10);
                  }}
                  className="w-full"
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de consultores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConsultants.map((consultant: Consultant) => (
            <Card key={consultant.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {consultant.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{consultant.name}</h3>
                      <p className="text-sm text-gray-600">{consultant.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {consultant.isOnline ? (
                      <Badge variant="default" className="bg-green-500">
                        Online
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Offline</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {consultant.bio}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {consultant.rating}
                    </span>
                    <span>{consultant.totalConsultations} consultas</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <CreditCard className="w-4 h-4 text-purple-500 mr-1" />
                      R$ {consultant.pricePerMinute}/min
                    </span>
                    <span className="text-gray-600">
                      {consultant.currentClients} cliente(s) ativo(s)
                    </span>
                  </div>
                </div>

                {/* Métodos de comunicação disponíveis */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {consultant.communicationMethods.map((method) => (
                    <Badge key={method} variant="outline" className="text-xs">
                      {getCommunicationIcon(method)}
                      <span className="ml-1">{getMethodLabel(method)}</span>
                    </Badge>
                  ))}
                </div>

                <Dialog open={showBookingDialog && selectedConsultant?.id === consultant.id} 
                        onOpenChange={setShowBookingDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full" 
                      onClick={() => setSelectedConsultant(consultant)}
                      disabled={!consultant.isOnline}
                    >
                      {consultant.isOnline ? (
                        consultant.currentClients === 0 ? 'Consultar Agora' : 'Entrar na Fila'
                      ) : (
                        'Indisponível'
                      )}
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Iniciar Consulta com {consultant.name}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="communication">Método de Comunicação</Label>
                        <Select value={communicationMethod} onValueChange={setCommunicationMethod}>
                          <SelectTrigger>
                            <SelectValue placeholder="Escolha como deseja se comunicar" />
                          </SelectTrigger>
                          <SelectContent>
                            {consultant.communicationMethods.map((method) => (
                              <SelectItem key={method} value={method}>
                                <div className="flex items-center">
                                  {getCommunicationIcon(method)}
                                  <span className="ml-2">{getMethodLabel(method)}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Resumo da Consulta</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Consultor:</span>
                            <span>{consultant.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Especialidade:</span>
                            <span>{consultant.specialty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Preço por minuto:</span>
                            <span>R$ {consultant.pricePerMinute}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <span>
                              {consultant.currentClients === 0 ? 
                                'Disponível agora' : 
                                `${consultant.currentClients} na frente`
                              }
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => setShowBookingDialog(false)} className="flex-1">
                          Cancelar
                        </Button>
                        <Button 
                          onClick={handleBookConsultation}
                          disabled={joinQueueMutation.isPending || createRoomMutation.isPending}
                          className="flex-1"
                        >
                          {joinQueueMutation.isPending || createRoomMutation.isPending ? 
                            'Conectando...' : 
                            (consultant.currentClients === 0 ? 'Iniciar Agora' : 'Entrar na Fila')
                          }
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredConsultants.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Nenhum consultor encontrado</h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar os filtros ou volte mais tarde
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setSpecialtyFilter('');
                setMaxPricePerMinute(10);
              }}>
                Limpar Filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}