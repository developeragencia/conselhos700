import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Video, 
  Phone, 
  Send, 
  Clock, 
  Star,
  User,
  CreditCard,
  PhoneOff,
  Mic,
  MicOff,
  VideoOff,
  Settings
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "wouter";

interface Message {
  id: string;
  senderId: string;
  senderType: 'client' | 'consultant';
  content: string;
  timestamp: Date;
  type: 'text' | 'system';
}

interface ConsultationRoom {
  id: number;
  roomId: string;
  clientId: string;
  consultantId: number;
  serviceType: string;
  communicationMethod: string;
  creditsPerMinute: string;
  status: string;
  specialRequests: string;
  startedAt: Date;
  endedAt: Date | null;
  totalMinutes: number | null;
  totalCredits: string | null;
}

interface Consultant {
  id: number;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  pricePerMinute: string;
}

export default function ConsultationRoomReal() {
  const { roomId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Fetch consultation room details
  const { data: roomData, isLoading } = useQuery({
    queryKey: ['/api/consultations', roomId],
    enabled: !!roomId
  });

  const room: ConsultationRoom = roomData?.room;
  const consultant: Consultant = roomData?.consultant;

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: any) => {
      const response = await apiRequest("POST", `/api/consultations/${roomId}/messages`, messageData);
      return response.json();
    },
    onSuccess: (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  });

  // End consultation mutation
  const endConsultationMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/consultations/${roomId}/end`, {
        totalMinutes: Math.ceil(timeElapsed / 60)
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Consulta Finalizada",
        description: `Total: ${Math.ceil(timeElapsed / 60)} minutos - R$ ${totalCost.toFixed(2)}`,
      });
      window.location.href = '/consultores';
    }
  });

  // Timer effect
  useEffect(() => {
    if (!isConnected || !consultant) return;

    const interval = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 1;
        const minutes = newTime / 60;
        const cost = minutes * parseFloat(consultant.pricePerMinute);
        setTotalCost(cost);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected, consultant]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize consultation
  useEffect(() => {
    if (room && consultant && !isConnected) {
      setIsConnected(true);
      setMessages([
        {
          id: 'welcome',
          senderId: 'system',
          senderType: 'consultant',
          content: `Bem-vindo! ${consultant.name} está pronto para sua consulta de ${room.serviceType}. ${room.specialRequests ? `Pedido especial: ${room.specialRequests}` : ''}`,
          timestamp: new Date(),
          type: 'system'
        }
      ]);
    }
  }, [room, consultant, isConnected]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      content: message,
      senderType: 'client',
      messageType: 'text'
    };

    sendMessageMutation.mutate(newMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'phone': return <Phone className="w-5 h-5" />;
      default: return <MessageCircle className="w-5 h-5" />;
    }
  };

  const getMethodText = (method: string) => {
    switch (method) {
      case 'video': return 'Videochamada';
      case 'phone': return 'Ligação';
      default: return 'Chat';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Conectando à consulta...</p>
        </div>
      </div>
    );
  }

  if (!room || !consultant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Consulta não encontrada</h2>
            <p className="text-gray-600 mb-4">A sala de consulta não existe ou expirou.</p>
            <Button onClick={() => window.location.href = '/consultores'}>
              Voltar aos Consultores
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
          
          {/* Consultant Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                    {consultant.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <CardTitle className="text-lg">{consultant.name}</CardTitle>
                  <p className="text-sm text-gray-600">{consultant.title}</p>
                  <Badge variant="secondary" className="mt-2">
                    {consultant.specialty}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Rating */}
                <div className="flex items-center justify-center space-x-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{consultant.rating}</span>
                  <span className="text-sm text-gray-600">({consultant.reviewCount})</span>
                </div>

                {/* Session Info */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Método:</span>
                    <div className="flex items-center space-x-1">
                      {getMethodIcon(room.communicationMethod)}
                      <span className="text-sm font-medium">{getMethodText(room.communicationMethod)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tempo:</span>
                    <span className="font-mono font-bold text-indigo-600">{formatTime(timeElapsed)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Custo:</span>
                    <span className="font-bold text-green-600">R$ {totalCost.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Taxa:</span>
                    <span className="text-sm">R$ {consultant.pricePerMinute}/min</span>
                  </div>
                </div>

                {/* Status */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Consulta Ativa</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="pt-4 space-y-2">
                  {room.communicationMethod === 'video' && (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Mic className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <VideoOff className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => endConsultationMutation.mutate()}
                    disabled={endConsultationMutation.isPending}
                    variant="destructive" 
                    className="w-full"
                  >
                    <PhoneOff className="w-4 h-4 mr-2" />
                    Finalizar Consulta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Consultation Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              
              {/* Header */}
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    {getMethodIcon(room.communicationMethod)}
                    <span>Consulta de {room.serviceType}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(timeElapsed)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CreditCard className="w-4 h-4" />
                      <span>R$ {totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.senderType === 'client' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.type === 'system' ? (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 max-w-md text-center">
                        <p className="text-sm text-amber-800">{msg.content}</p>
                        <span className="text-xs text-amber-600">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ) : (
                      <div className={`max-w-md ${msg.senderType === 'client' ? 'ml-12' : 'mr-12'}`}>
                        <div className={`rounded-lg p-3 ${
                          msg.senderType === 'client' 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p>{msg.content}</p>
                        </div>
                        <div className={`text-xs text-gray-500 mt-1 ${
                          msg.senderType === 'client' ? 'text-right' : 'text-left'
                        }`}>
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Message Input */}
              {room.communicationMethod === 'chat' && (
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua mensagem..."
                      className="flex-1"
                      disabled={sendMessageMutation.isPending}
                    />
                    <Button 
                      onClick={sendMessage}
                      disabled={!message.trim() || sendMessageMutation.isPending}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Video/Phone Interface */}
              {room.communicationMethod !== 'chat' && (
                <div className="p-4 border-t bg-gray-900 text-white">
                  <div className="flex items-center justify-center h-64 bg-black rounded-lg">
                    <div className="text-center">
                      {room.communicationMethod === 'video' ? (
                        <Video className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      ) : (
                        <Phone className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      )}
                      <p className="text-gray-300">
                        {room.communicationMethod === 'video' 
                          ? 'Interface de vídeo seria implementada aqui' 
                          : 'Interface de telefone seria implementada aqui'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}