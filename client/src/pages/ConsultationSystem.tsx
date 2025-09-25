import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Clock, 
  MessageCircle, 
  Video, 
  Phone, 
  Star,
  CreditCard,
  User,
  Zap,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { ConsultationNotifications } from '@/components/ConsultationNotifications';

interface ConsultantAvailable {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  pricePerMinute: number;
  isOnline: boolean;
  responseTime: string;
  totalConsultations: number;
  imageUrl: string;
  whatsappNumber?: string;
  availableMethods?: string[];
}

export default function ConsultationSystem() {
  const [selectedService, setSelectedService] = useState('tarot');
  const [selectedMethod, setSelectedMethod] = useState('chat');
  const [isInQueue, setIsInQueue] = useState(false);
  const [queuePosition, setQueuePosition] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5.00);

  const queryClient = useQueryClient();

  // Buscar consultores disponíveis do banco real
  const { data: availableConsultants = [], isLoading } = useQuery({
    queryKey: ['/api/consultation/real-consultants', selectedService],
    refetchInterval: 5000, // Atualizar a cada 5 segundos
  });

  // Buscar estatísticas em tempo real
  const { data: stats } = useQuery({
    queryKey: ['/api/consultation/stats'],
    refetchInterval: 3000, // Atualizar a cada 3 segundos
  });

  // Mutation para entrar na fila real
  const joinQueueMutation = useMutation({
    mutationFn: async (queueData: any) => {
      const response = await apiRequest('POST', '/api/consultation/real-queue', queueData);
      return response.json();
    },
    onSuccess: (data) => {
      setIsInQueue(true);
      setQueuePosition(data.position);
    }
  });

  // Mutation para iniciar consulta WhatsApp
  const whatsappMutation = useMutation({
    mutationFn: async (consultationData: any) => {
      const response = await apiRequest('POST', '/api/consultation/whatsapp', consultationData);
      return response.json();
    },
    onSuccess: (data) => {
      // Abrir WhatsApp automaticamente
      window.open(data.whatsappUrl, '_blank');
    }
  });

  const mockConsultants: ConsultantAvailable[] = [
    {
      id: 1,
      name: "Consultor Especialista",
      specialty: "Tarot e Amor",
      rating: 4.9,
      pricePerMinute: 3.50,
      isOnline: true,
      responseTime: "< 30s",
      totalConsultations: 1520,
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150",
      whatsappNumber: "+5511999887766",
      availableMethods: ['chat', 'video', 'audio', 'whatsapp']
    },
    {
      id: 2,
      name: "João Vidente",
      specialty: "Astrologia",
      rating: 4.8,
      pricePerMinute: 4.00,
      isOnline: true,
      responseTime: "< 1min",
      totalConsultations: 890,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      whatsappNumber: "+5511888776655",
      availableMethods: ['chat', 'video', 'whatsapp']
    },
    {
      id: 3,
      name: "Ana Espiritual",
      specialty: "Mediunidade",
      rating: 4.7,
      pricePerMinute: 4.50,
      isOnline: true,
      responseTime: "< 45s",
      totalConsultations: 675,
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      whatsappNumber: "+5511777665544",
      availableMethods: ['chat', 'video', 'audio', 'whatsapp']
    }
  ];

  const services = [
    { id: 'tarot', name: 'Tarot', icon: '🔮', color: 'purple' },
    { id: 'astrologia', name: 'Astrologia', icon: '⭐', color: 'blue' },
    { id: 'mediunidade', name: 'Mediunidade', icon: '🌟', color: 'pink' },
    { id: 'numerologia', name: 'Numerologia', icon: '🔢', color: 'green' }
  ];

  const methods = [
    { id: 'chat', name: 'Chat', icon: MessageCircle, description: 'Conversa por texto' },
    { id: 'video', name: 'Vídeo', icon: Video, description: 'Chamada de vídeo' },
    { id: 'audio', name: 'Áudio', icon: Phone, description: 'Chamada de voz' },
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, description: 'Conversa pelo WhatsApp', color: 'green' }
  ];

  const handleJoinQueue = () => {
    joinQueueMutation.mutate({
      clientId: "test-client-1", // Em produção, pegar do usuário logado
      serviceType: selectedService,
      communicationMethod: selectedMethod,
      maxPricePerMinute: maxPrice
    });
  };

  const startDirectConsultation = (consultant: ConsultantAvailable) => {
    if (selectedMethod === 'whatsapp' && consultant.whatsappNumber) {
      // Iniciar consulta WhatsApp com dados reais
      whatsappMutation.mutate({
        clientId: "cliente-demo-1", // Em produção, pegar do usuário logado
        consultantId: consultant.id,
        serviceType: selectedService,
        whatsappNumber: consultant.whatsappNumber,
        pricePerMinute: consultant.pricePerMinute
      });
    } else {
      // Outras consultas (chat, vídeo, áudio)
      console.log(`Iniciando consulta ${selectedMethod} com:`, consultant.name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Sistema de Notificações em Tempo Real */}
      <ConsultationNotifications />
      
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Consultas <span className="text-accent">Espirituais Online</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conecte-se instantaneamente com nossos consultores especializados. 
            Sistema de fila inteligente e consultas em tempo real.
          </p>
        </motion.div>

        {/* Seleção de Serviço */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-center mb-6">Escolha seu Serviço</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {services.map((service) => (
              <motion.button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedService === service.id
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-200 bg-white hover:border-primary hover:shadow-lg'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-3xl mb-2">{service.icon}</div>
                <div className="font-semibold">{service.name}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Seleção de Método */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-center mb-6">Como Deseja se Conectar?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {methods.map((method) => (
              <motion.button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedMethod === method.id
                    ? method.id === 'whatsapp' 
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-primary bg-primary text-white'
                    : method.id === 'whatsapp'
                      ? 'border-gray-200 bg-white hover:border-green-500 hover:shadow-lg'
                      : 'border-gray-200 bg-white hover:border-primary hover:shadow-lg'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {method.id === 'whatsapp' ? (
                  <div className="text-3xl mb-3">💬</div>
                ) : (
                  <method.icon className="w-8 h-8 mx-auto mb-3" />
                )}
                <div className="font-semibold text-lg mb-1">{method.name}</div>
                <div className="text-sm opacity-75">{method.description}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Controle de Preço */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">Preço Máximo por Minuto</h3>
            <div className="text-center mb-4">
              <span className="text-3xl font-bold text-primary">R$ {maxPrice.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>R$ 1,00</span>
              <span>R$ 10,00</span>
            </div>
          </div>
        </motion.div>

        {/* Consultores Disponíveis */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Consultores Online Agora
            <span className="ml-2 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              {mockConsultants.length} disponíveis
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {mockConsultants
              .filter(consultant => consultant.pricePerMinute <= maxPrice)
              .map((consultant) => (
              <motion.div
                key={consultant.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
                layout
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={consultant.imageUrl}
                      alt={consultant.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{consultant.name}</h3>
                      <p className="text-gray-600 text-sm">{consultant.specialty}</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{consultant.rating}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({consultant.totalConsultations} consultas)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-green-600 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                      Online
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <Clock className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                      <div className="text-sm font-semibold">{consultant.responseTime}</div>
                      <div className="text-xs text-gray-500">Resposta</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <CreditCard className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <div className="text-sm font-semibold">R$ {consultant.pricePerMinute.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">Por minuto</div>
                    </div>
                  </div>

                  <button
                    onClick={() => startDirectConsultation(consultant)}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Consultar Agora
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Botão de Fila de Espera */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {!isInQueue ? (
            <button
              onClick={handleJoinQueue}
              disabled={joinQueueMutation.isPending}
              className="bg-gradient-to-r from-accent to-primary text-white font-semibold py-4 px-8 rounded-full text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center mx-auto"
            >
              <Users className="w-6 h-6 mr-3" />
              {joinQueueMutation.isPending ? 'Entrando na Fila...' : 'Entrar na Fila de Espera'}
              <ArrowRight className="w-6 h-6 ml-3" />
            </button>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                <span className="text-lg font-semibold">Na Fila de Espera</span>
              </div>
              <p className="text-gray-600 mb-4">
                Você está na posição <span className="font-bold text-primary">#{queuePosition}</span>
              </p>
              <div className="flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-500">
                  Tempo estimado: {queuePosition * 5} minutos
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Estatísticas em Tempo Real */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center bg-white p-6 rounded-xl shadow-lg">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-primary">{stats?.onlineConsultants || 0}</div>
            <div className="text-sm text-gray-600">Online Agora</div>
            <div className="text-xs text-green-500 mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1 animate-pulse"></div>
              Ao vivo
            </div>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-lg">
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-3" />
            <div className="text-2xl font-bold text-accent">{stats?.todayConsultations || 0}</div>
            <div className="text-sm text-gray-600">Consultas Hoje</div>
            <div className="text-xs text-blue-500 mt-1">Atualizado agora</div>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-lg">
            <MessageCircle className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-purple-500">{stats?.activeConsultations || 0}</div>
            <div className="text-sm text-gray-600">Consultas Ativas</div>
            <div className="text-xs text-purple-500 mt-1">Em andamento</div>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-lg">
            <Clock className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-orange-500">{stats?.queueLength || 0}</div>
            <div className="text-sm text-gray-600">Na Fila</div>
            <div className="text-xs text-orange-500 mt-1">Aguardando</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}