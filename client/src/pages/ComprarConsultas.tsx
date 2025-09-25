import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Zap, Gift, Check, Star, CreditCard, Video, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";

interface ConsultationOption {
  id: number;
  name: string;
  duration: number;
  price: number;
  originalPrice?: number;
  credits: number;
  method: "chat" | "video" | "phone";
  icon: React.ElementType;
  features: string[];
  popular?: boolean;
  description: string;
  color: string;
}

export default function ComprarConsultas() {
  const [selectedConsultation, setSelectedConsultation] = useState<number | null>(null);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Buscar dados reais de consultas do banco
  const { data: consultationOptions = [], isLoading, error } = useQuery<ConsultationOption[]>({
    queryKey: ['/api/consultation-options'],
    enabled: true
  });

  // Log para depuração
  console.log("Consultation options from API:", consultationOptions);
  console.log("Is loading:", isLoading);
  console.log("Error:", error);

  // Mutation para processar compra
  const purchaseMutation = useMutation({
    mutationFn: async (consultationId: number) => {
      const response = await apiRequest("POST", "/api/purchase/consultation", { consultationId });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Consulta adquirida com sucesso!",
        description: `Consulta de ${data.duration} minutos adicionada ao seu plano.`,
      });
    },
    onError: () => {
      toast({
        title: "Erro na compra",
        description: "Não foi possível processar sua compra. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  // Opções padrão organizadas por método de comunicação
  const defaultOptions: Record<string, ConsultationOption[]> = {
    chat: [
      {
        id: 1,
        name: "Chat Express",
        duration: 15,
        price: 35,
        credits: 15,
        method: "chat",
        icon: MessageCircle,
        features: [
          "15 minutos de chat",
          "Resposta imediata",
          "Histórico salvo",
          "Consultores especializados"
        ],
        description: "Ideal para perguntas rápidas e orientações pontuais",
        color: "from-blue-500 to-blue-600"
      },
      {
        id: 2,
        name: "Chat Completo",
        duration: 30,
        price: 65,
        originalPrice: 70,
        credits: 30,
        method: "chat",
        icon: MessageCircle,
        features: [
          "30 minutos de chat",
          "Análise detalhada",
          "Histórico salvo",
          "Relatório por email",
          "Suporte pós-consulta"
        ],
        popular: true,
        description: "Nossa opção mais popular para consultas completas",
        color: "from-purple-500 to-purple-600"
      },
      {
        id: 3,
        name: "Chat Premium",
        duration: 60,
        price: 120,
        originalPrice: 140,
        credits: 60,
        method: "chat",
        icon: MessageCircle,
        features: [
          "60 minutos de chat",
          "Análise profunda",
          "Consultores VIP",
          "Relatório detalhado",
          "Suporte 48h pós-consulta"
        ],
        description: "Para consultas profundas e transformadoras",
        color: "from-amber-500 to-amber-600"
      }
    ],
    video: [
      {
        id: 4,
        name: "Vídeo Express",
        duration: 20,
        price: 55,
        credits: 20,
        method: "video",
        icon: Video,
        features: [
          "20 minutos em vídeo",
          "Conexão face a face",
          "Gravação disponível",
          "Consultores certificados"
        ],
        description: "Conexão visual para maior intimidade na consulta",
        color: "from-green-500 to-green-600"
      },
      {
        id: 5,
        name: "Vídeo Completo",
        duration: 45,
        price: 95,
        originalPrice: 105,
        credits: 45,
        method: "video",
        icon: Video,
        features: [
          "45 minutos em vídeo",
          "Análise completa",
          "Gravação HD",
          "Relatório personalizado",
          "Material complementar"
        ],
        popular: true,
        description: "Experiência completa com conexão visual",
        color: "from-emerald-500 to-emerald-600"
      }
    ],
    phone: [
      {
        id: 6,
        name: "Ligação Express",
        duration: 15,
        price: 45,
        credits: 15,
        method: "phone",
        icon: Phone,
        features: [
          "15 minutos de ligação",
          "Conexão telefônica",
          "Sem necessidade de internet",
          "Consultores experientes"
        ],
        description: "Praticidade da ligação telefônica tradicional",
        color: "from-indigo-500 to-indigo-600"
      },
      {
        id: 7,
        name: "Ligação Completa",
        duration: 30,
        price: 85,
        credits: 30,
        method: "phone",
        icon: Phone,
        features: [
          "30 minutos de ligação",
          "Análise detalhada",
          "Resumo por SMS",
          "Suporte pós-consulta"
        ],
        description: "Consulta completa no conforto da ligação",
        color: "from-violet-500 to-violet-600"
      }
    ]
  };

  // Mesclar dados da API com dados padrão organizados por método
  const organizeOptions = (apiOptions: ConsultationOption[]) => {
    if (apiOptions && apiOptions.length > 0) {
      // Converter dados da API para incluir ícones e organizar por método
      const organized: Record<string, ConsultationOption[]> = {
        chat: [],
        video: [],
        phone: []
      };
      
      apiOptions.forEach(option => {
        const iconMap = {
          chat: MessageCircle,
          video: Video,
          phone: Phone
        };
        
        const enrichedOption = {
          ...option,
          icon: iconMap[option.method] || MessageCircle
        };
        
        if (organized[option.method]) {
          organized[option.method].push(enrichedOption);
        }
      });
      
      return organized;
    }
    return defaultOptions;
  };

  const optionsToShow = organizeOptions(consultationOptions || []);

  const handlePurchase = async (consultation: ConsultationOption) => {
    if (!isAuthenticated) {
      toast({
        title: "Login necessário",
        description: "Faça login para comprar consultas.",
        variant: "destructive",
      });
      return;
    }

    setSelectedConsultation(consultation.id);
    await purchaseMutation.mutateAsync(consultation.id);
    setSelectedConsultation(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <section className="py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4"
        >
          <div className="flex items-center justify-center mb-6">
            <Clock className="w-16 h-16 text-purple-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Comprar Consultas
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha o método de comunicação e duração ideal para sua consulta. 
            Todos os nossos consultores são certificados e experientes.
          </p>
        </motion.div>
      </section>

      {/* Consultation Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Vídeo
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefone
              </TabsTrigger>
            </TabsList>

            {Object.entries(optionsToShow).map(([method, options]) => (
              <TabsContent key={method} value={method}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {options.map((consultation, index) => (
                    <motion.div
                      key={consultation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative"
                    >
                      {consultation.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                            <Star className="w-4 h-4 mr-1" />
                            MAIS POPULAR
                          </Badge>
                        </div>
                      )}

                      <Card className={`h-full ${consultation.popular ? 'ring-2 ring-purple-500 scale-105' : ''} hover:shadow-xl transition-all duration-300`}>
                        <CardHeader className={`bg-gradient-to-r ${consultation.color} text-white rounded-t-lg`}>
                          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                            <consultation.icon className="w-6 h-6" />
                            {consultation.name}
                          </CardTitle>
                          <CardDescription className="text-center text-white/90">
                            <div className="text-3xl font-bold">
                              R$ {consultation.price}
                            </div>
                            {consultation.originalPrice && consultation.originalPrice > consultation.price && (
                              <div className="text-sm">
                                <span className="line-through opacity-75">R$ {consultation.originalPrice}</span>
                                <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                                  Economize R$ {consultation.originalPrice - consultation.price}
                                </Badge>
                              </div>
                            )}
                            <div className="text-sm mt-2">
                              {consultation.duration} minutos • {consultation.credits} créditos
                            </div>
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="p-6">
                          <p className="text-gray-600 mb-4 text-sm">
                            {consultation.description}
                          </p>

                          <ul className="space-y-3 mb-6">
                            {consultation.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-sm">
                                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>

                          <Button
                            onClick={() => handlePurchase(consultation)}
                            disabled={purchaseMutation.isPending && selectedConsultation === consultation.id}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          >
                            {purchaseMutation.isPending && selectedConsultation === consultation.id ? (
                              <div className="flex items-center">
                                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                Processando...
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <CreditCard className="w-4 h-4 mr-2" />
                                Comprar Consulta
                              </div>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher nossas consultas?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Início Imediato",
                description: "Comece sua consulta em poucos minutos"
              },
              {
                icon: Check,
                title: "Consultores Certificados",
                description: "Todos os profissionais são verificados e experientes"
              },
              {
                icon: Gift,
                title: "Garantia Total",
                description: "Satisfação garantida ou seu dinheiro de volta"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center p-6"
              >
                <benefit.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}