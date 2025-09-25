import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Star, Clock, MessageCircle, Video, Phone, Award, Calendar, Users, Heart, Share2, MapPin, CheckCircle, Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function ConsultantProfile() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTab, setSelectedTab] = useState("sobre");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Buscar dados do consultor
  const { data: consultant, isLoading: consultantLoading } = useQuery({
    queryKey: [`/api/consultants/${id}`],
    enabled: !!id,
  });

  // Buscar serviços
  const { data: services } = useQuery({
    queryKey: [`/api/consultants/${id}/services`],
    enabled: !!id,
  });

  // Buscar avaliações
  const { data: reviews } = useQuery({
    queryKey: [`/api/consultants/${id}/reviews`],
    enabled: !!id,
  });

  // Buscar estatísticas
  const { data: stats } = useQuery({
    queryKey: [`/api/consultants/${id}/stats`],
    enabled: !!id,
  });

  // Estados para formulários
  const [bookingForm, setBookingForm] = useState({
    serviceId: "",
    date: "",
    time: "",
    notes: "",
    communicationType: "chat"
  });

  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
    wouldRecommend: true
  });

  // Mutations
  const bookConsultationMutation = useMutation({
    mutationFn: (bookingData: any) => apiRequest("POST", "/api/consultations", bookingData),
    onSuccess: () => {
      toast({
        title: "Consulta Agendada!",
        description: "Sua consulta foi agendada com sucesso.",
      });
      setIsBookingModalOpen(false);
    },
    onError: () => {
      toast({
        title: "Erro ao Agendar",
        description: "Não foi possível agendar a consulta.",
        variant: "destructive",
      });
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/favorites", { consultantId: id, userId: user?.id }),
    onSuccess: () => {
      setIsFavorited(!isFavorited);
      toast({
        title: isFavorited ? "Removido dos Favoritos" : "Adicionado aos Favoritos",
        description: "Operação realizada com sucesso.",
      });
    },
  });

  const reviewMutation = useMutation({
    mutationFn: (reviewData: any) => apiRequest("POST", `/api/consultants/${id}/reviews`, reviewData),
    onSuccess: () => {
      toast({
        title: "Avaliação Enviada!",
        description: "Sua avaliação foi enviada com sucesso.",
      });
      setIsReviewModalOpen(false);
      queryClient.invalidateQueries({ queryKey: [`/api/consultants/${id}/reviews`] });
    },
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        title: "Login Necessário",
        description: "Você precisa fazer login para agendar uma consulta.",
        variant: "destructive",
      });
      return;
    }
    
    bookConsultationMutation.mutate({
      consultantId: id,
      ...bookingForm,
      userId: user?.id,
    });
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        title: "Login Necessário",
        description: "Você precisa fazer login para avaliar um consultor.",
        variant: "destructive",
      });
      return;
    }
    
    reviewMutation.mutate({
      ...reviewForm,
      userId: user?.id,
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: `${consultant?.name || "Consultor"} - ${consultant?.title || "Especialista"}`,
      text: `Conheça nosso consultor especialista em serviços esotéricos`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Erro ao compartilhar:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copiado!",
        description: "O link do perfil foi copiado para a área de transferência.",
      });
    }
  };

  if (consultantLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!consultant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Consultor não encontrado</h2>
          <p className="text-gray-600">O consultor que você está procurando não existe ou foi removido.</p>
        </div>
      </div>
    );
  }

  const consultantName = consultant?.name || "Consultor Especialista";
  const consultantTitle = consultant?.title || "Taróloga Especialista";
  const consultantRating = consultant?.rating || 4.9;
  const consultantReviewCount = consultant?.reviewCount || 127;
  const consultantPrice = consultant?.price || 5.99;
  const consultantImage = consultant?.imageUrl || consultant?.profileImageUrl || "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop";
  
  const servicesList = Array.isArray(services) ? services : [
    { 
      id: 1,
      name: "Consulta de Tarot Completa", 
      price: 59.90, 
      duration: 45,
      description: "Análise completa com 21 cartas sobre amor, trabalho e espiritualidade",
      category: "tarot"
    },
    { 
      id: 2,
      name: "Tarot do Amor", 
      price: 39.90, 
      duration: 30,
      description: "Consulta focada em relacionamentos amorosos e vida afetiva",
      category: "amor"
    },
    { 
      id: 3,
      name: "Orientação Profissional", 
      price: 49.90, 
      duration: 35,
      description: "Direcionamento para carreira e decisões profissionais",
      category: "carreira"
    }
  ];

  const reviewsList = Array.isArray(reviews) ? reviews : [
    {
      id: 1,
      content: "Consulta incrível! Muito precisa e esclarecedora.",
      author: "Ana Carolina",
      rating: 5,
      date: "2024-01-15",
      verified: true
    },
    {
      id: 2,
      content: "Profissional muito competente, me ajudou muito.",
      author: "Roberto Silva",
      rating: 5,
      date: "2024-01-10",
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header do Consultor */}
      <section className="bg-gradient-to-r from-primary/90 to-secondary/80 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="relative">
              <img
                src={consultantImage}
                alt={consultantName}
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl"
              />
              <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full border-3 border-white shadow-lg bg-green-500">
                <div className="absolute inset-1 rounded-full bg-white/30 animate-pulse"></div>
              </div>
              <div className="absolute -top-2 -right-2">
                <CheckCircle className="w-8 h-8 text-blue-500 bg-white rounded-full" />
              </div>
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <h1 className="text-4xl md:text-5xl font-bold">
                  {consultantName}
                </h1>
                <Badge className="bg-yellow-500 text-yellow-900">
                  <Zap className="w-3 h-3 mr-1" />
                  Expert
                </Badge>
              </div>
              
              <p className="text-xl opacity-90 mb-4">
                {consultantTitle}
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6 text-sm">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <Star className="w-4 h-4 mr-1 fill-current text-yellow-300" />
                  <span>{consultantRating} ({consultantReviewCount} avaliações)</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Responde em 2 minutos</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{stats?.totalConsultations || 2500}+ consultas</span>
                </div>
              </div>
              
              <div className="text-3xl font-bold mb-6">
                A partir de R$ {consultantPrice}/min
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold shadow-lg">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Agendar Consulta
                    </Button>
                  </DialogTrigger>
                </Dialog>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-purple-300 text-purple-600 bg-white/90 hover:bg-purple-600 hover:text-white backdrop-blur-sm font-medium"
                  onClick={() => favoriteMutation.mutate()}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isFavorited ? 'fill-current text-red-500' : ''}`} />
                  Favoritar
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-purple-300 text-purple-600 bg-white/90 hover:bg-purple-600 hover:text-white backdrop-blur-sm font-medium"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas Rápidas */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">15+ anos</div>
              <div className="text-gray-600 text-sm">Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">2500+</div>
              <div className="text-gray-600 text-sm">Consultas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">98%</div>
              <div className="text-gray-600 text-sm">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">85%</div>
              <div className="text-gray-600 text-sm">Clientes Retornam</div>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 mb-8">
                <TabsTrigger value="sobre" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Sobre
                </TabsTrigger>
                <TabsTrigger value="servicos" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Serviços
                </TabsTrigger>
                <TabsTrigger value="avaliacoes" className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Avaliações
                </TabsTrigger>
                <TabsTrigger value="agenda" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Agenda
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sobre" className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Biografia */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Sobre mim</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          Desde criança, possui o dom da vidência e da conexão espiritual. Com mais de 15 anos de experiência, se especializou em leituras que proporcionam insights profundos sobre amor, carreira e crescimento pessoal.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                          Especialista em orientação espiritual com vasta experiência em diferentes métodos de consulta.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Especialidades */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Especialidades</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {["Tarot do Amor", "Tarot Profissional", "Orientação Espiritual", "Astrologia"].map((specialty: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-sm">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Métodos de Atendimento */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Métodos de Atendimento</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <div className="font-medium text-green-800">Chat</div>
                            <div className="text-sm text-green-600">Disponível</div>
                          </div>
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <Video className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <div className="font-medium text-blue-800">Vídeo</div>
                            <div className="text-sm text-blue-600">Disponível</div>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <Phone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <div className="font-medium text-purple-800">Áudio</div>
                            <div className="text-sm text-purple-600">Disponível</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    {/* Status do Consultor */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          Status Atual
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-2">Disponível agora</p>
                        <p className="text-gray-600 text-sm">Responde em 2 minutos</p>
                        <Button className="w-full mt-4" onClick={() => setIsBookingModalOpen(true)}>
                          <Calendar className="w-4 h-4 mr-2" />
                          Agendar Agora
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Estatísticas Detalhadas */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Estatísticas</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Taxa de Resposta</span>
                          <span className="font-medium">95%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tempo Médio de Consulta</span>
                          <span className="font-medium">45 min</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Clientes Ativos</span>
                          <span className="font-medium">150+</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Idiomas</span>
                          <span className="font-medium">Português</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="servicos" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {servicesList.map((service: any) => (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-2xl font-bold text-primary">
                            R$ {service.price}
                          </div>
                          <div className="text-gray-500 text-sm flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {service.duration} min
                          </div>
                        </div>
                        <Badge variant="outline" className="mb-4">
                          {service.category}
                        </Badge>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          onClick={() => {
                            setBookingForm(prev => ({ ...prev, serviceId: service.id.toString() }));
                            setIsBookingModalOpen(true);
                          }}
                        >
                          Agendar Consulta
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="avaliacoes" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">Avaliações dos Clientes</h3>
                  {isAuthenticated && (
                    <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Star className="w-4 h-4 mr-2" />
                          Avaliar
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  )}
                </div>

                <div className="grid gap-6">
                  {reviewsList.map((review: any) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="font-medium text-primary">
                                {review.author.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {review.author}
                                {review.verified && (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                              </div>
                              <div className="text-sm text-gray-500">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="agenda" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Horários Disponíveis</CardTitle>
                    <CardDescription>
                      Selecione um horário conveniente para sua consulta
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                      {Array.from({length: 14}, (_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() + i);
                        return (
                          <Button 
                            key={i}
                            variant={i === 0 ? "default" : "outline"}
                            className="p-2 h-auto flex-col"
                            onClick={() => setBookingForm(prev => ({ ...prev, date: date.toISOString().split('T')[0] }))}
                          >
                            <div className="text-xs">{date.toLocaleDateString('pt-BR', { weekday: 'short' })}</div>
                            <div className="text-sm font-bold">{date.getDate()}</div>
                          </Button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Modal de Agendamento */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agendar Consulta</DialogTitle>
            <DialogDescription>
              Preencha os dados para agendar sua consulta com {consultantName}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <Label htmlFor="service">Serviço</Label>
              <Select 
                value={bookingForm.serviceId} 
                onValueChange={(value) => setBookingForm(prev => ({ ...prev, serviceId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Consulta de Tarot Completa - R$ 59.90</SelectItem>
                  <SelectItem value="2">Tarot do Amor - R$ 39.90</SelectItem>
                  <SelectItem value="3">Orientação Profissional - R$ 49.90</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="date">Data</Label>
              <Input 
                id="date"
                type="date"
                value={bookingForm.date}
                onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <Label htmlFor="time">Horário</Label>
              <Input 
                id="time"
                type="time"
                value={bookingForm.time}
                onChange={(e) => setBookingForm(prev => ({ ...prev, time: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="communication">Tipo de Atendimento</Label>
              <Select 
                value={bookingForm.communicationType} 
                onValueChange={(value) => setBookingForm(prev => ({ ...prev, communicationType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chat">Chat</SelectItem>
                  <SelectItem value="video">Vídeo Chamada</SelectItem>
                  <SelectItem value="audio">Chamada de Áudio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="notes">Observações (opcional)</Label>
              <Textarea 
                id="notes"
                placeholder="Descreva brevemente o que gostaria de consultar..."
                value={bookingForm.notes}
                onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>
            
            <DialogFooter>
              <Button type="submit" disabled={bookConsultationMutation.isPending}>
                {bookConsultationMutation.isPending ? "Agendando..." : "Confirmar Agendamento"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de Avaliação */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Avaliar Consultor</DialogTitle>
            <DialogDescription>
              Compartilhe sua experiência com {consultantName}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleReview} className="space-y-4">
            <div>
              <Label>Avaliação</Label>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                  >
                    <Star 
                      className={`w-6 h-6 ${
                        star <= reviewForm.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`} 
                    />
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="comment">Comentário</Label>
              <Textarea 
                id="comment"
                placeholder="Conte sobre sua experiência..."
                value={reviewForm.comment}
                onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="submit" disabled={reviewMutation.isPending}>
                {reviewMutation.isPending ? "Enviando..." : "Enviar Avaliação"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}