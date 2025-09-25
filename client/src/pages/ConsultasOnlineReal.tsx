import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Star, 
  Clock, 
  Users, 
  Search,
  Filter,
  MessageCircle,
  Video,
  Phone,
  Zap,
  CheckCircle,
  Calendar,
  CreditCard
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Consultant {
  id: number;
  name: string;
  title: string;
  description: string;
  pricePerMinute: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  whatsapp: string;
  specialty: string;
  isActive: boolean;
  status: string;
}

export default function ConsultasOnlineReal() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('chat');
  const [maxPrice, setMaxPrice] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const { toast } = useToast();

  // Fetch consultores online do PostgreSQL
  const { data: consultants = [], isLoading } = useQuery({
    queryKey: ['/api/consultants'],
    select: (data: any[]) => data.filter((c: Consultant) => c.status === 'online')
  });

  // Fetch user credits
  const { data: userCredits } = useQuery({
    queryKey: ['/api/auth/user'],
    select: (user: any) => user?.credits || 0
  });

  // Mutation para iniciar consulta
  const startConsultationMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/consultations/start", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Consulta Iniciada",
        description: "Você foi conectado ao consultor. Redirecionando...",
      });
      // Redirecionar para sala de consulta
      window.location.href = `/consultation/${data.roomId}`;
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Falha ao iniciar consulta. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  const filteredConsultants = consultants.filter((c: Consultant) => {
    const matchesSpecialty = selectedSpecialty === 'all' || c.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
    const matchesPrice = !maxPrice || c.pricePerMinute <= parseFloat(maxPrice);
    return matchesSpecialty && matchesPrice;
  });

  const startConsultation = async (consultant: Consultant) => {
    if (!userCredits || userCredits < consultant.pricePerMinute * 10) {
      toast({
        title: "Créditos Insuficientes",
        description: "Você precisa de mais créditos para esta consulta.",
        variant: "destructive",
      });
      return;
    }

    startConsultationMutation.mutate({
      consultantId: consultant.id,
      serviceType: consultant.specialty,
      communicationMethod: selectedMethod,
      specialRequests,
      maxPricePerMinute: consultant.pricePerMinute
    });
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'chat': return <MessageCircle className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getMethodText = (method: string) => {
    switch (method) {
      case 'chat': return 'Chat';
      case 'video': return 'Videochamada';
      case 'phone': return 'Telefone';
      default: return 'Chat';
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
              <Zap className="w-8 h-8 text-amber-900" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Consultas Online
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Conecte-se instantaneamente com nossos consultores especializados
            </p>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span>{consultants.length} consultores online</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-400 mr-2" />
                <span>Resposta em segundos</span>
              </div>
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-amber-400 mr-2" />
                <span>Seus créditos: {userCredits || 0}</span>
              </div>
            </div>
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
                  Configurar Consulta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Especialidade */}
                  <div>
                    <Label htmlFor="specialty">Especialidade</Label>
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha a especialidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="tarot">Tarot</SelectItem>
                        <SelectItem value="astrologia">Astrologia</SelectItem>
                        <SelectItem value="mediunidade">Mediunidade</SelectItem>
                        <SelectItem value="numerologia">Numerologia</SelectItem>
                        <SelectItem value="cristaloterapia">Cristaloterapia</SelectItem>
                        <SelectItem value="runas">Runas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Método */}
                  <div>
                    <Label htmlFor="method">Método de Comunicação</Label>
                    <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Como quer conversar?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chat">Chat de Texto</SelectItem>
                        <SelectItem value="video">Videochamada</SelectItem>
                        <SelectItem value="phone">Ligação Telefônica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Preço Máximo */}
                  <div>
                    <Label htmlFor="maxPrice">Preço Máximo (R$/min)</Label>
                    <Input
                      id="maxPrice"
                      type="number"
                      placeholder="Ex: 4.00"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      min="0"
                      step="0.10"
                    />
                  </div>

                  {/* Botão de Busca */}
                  <div className="flex items-end">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                      <Search className="w-4 h-4 mr-2" />
                      Buscar
                    </Button>
                  </div>
                </div>

                {/* Pedidos Especiais */}
                <div className="mt-4">
                  <Label htmlFor="requests">Pedidos Especiais (Opcional)</Label>
                  <Textarea
                    id="requests"
                    placeholder="Descreva brevemente o que gostaria de consultar..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Lista de Consultores Online */}
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
                {filteredConsultants.length} consultores online agora
              </h2>
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold">Ao vivo</span>
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
                  <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-green-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {consultant.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div>
                            <CardTitle className="text-lg font-bold text-gray-900">
                              {consultant.name}
                            </CardTitle>
                            <p className="text-sm text-gray-600">{consultant.title}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {consultant.specialty}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Avaliação */}
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{consultant.rating}</span>
                        <span className="text-sm text-gray-600">({consultant.reviewCount} avaliações)</span>
                      </div>

                      {/* Descrição */}
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {consultant.description.substring(0, 100)}...
                      </p>

                      {/* Preço e Tempo */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-lg font-bold text-indigo-600">
                            R$ {consultant.pricePerMinute.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-600">/minuto</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Resposta imediata</span>
                        </div>
                      </div>

                      {/* Botão de Ação */}
                      <div className="space-y-2">
                        <Button
                          onClick={() => startConsultation(consultant)}
                          disabled={startConsultationMutation.isPending}
                          className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center"
                        >
                          {startConsultationMutation.isPending ? (
                            <div className="flex items-center">
                              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                              Conectando...
                            </div>
                          ) : (
                            <div className="flex items-center">
                              {getMethodIcon(selectedMethod)}
                              <span className="ml-2">Iniciar {getMethodText(selectedMethod)}</span>
                            </div>
                          )}
                        </Button>
                        
                        <div className="text-xs text-center text-gray-500">
                          Custo estimado: R$ {(consultant.pricePerMinute * 10).toFixed(2)} (10 min)
                        </div>
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
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhum consultor online no momento
              </h3>
              <p className="text-gray-600 mb-6">
                Tente ajustar os filtros ou aguarde alguns instantes
              </p>
              <Button 
                onClick={() => window.location.reload()}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Atualizar Lista
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
              Precisa de mais créditos?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Compre créditos e tenha acesso imediato a consultas ilimitadas com nossos especialistas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.href = '/comprar/creditos'}
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-amber-900 font-semibold"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Comprar Créditos
              </Button>
              <Button 
                onClick={() => window.location.href = '/consultores'}
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-indigo-900"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Consulta
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}