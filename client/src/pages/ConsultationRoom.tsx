import { useState, useEffect, useRef } from 'react';
import { useRoute } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  MessageCircle, 
  Send,
  Clock,
  CreditCard,
  User,
  Star
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  senderId: string;
  senderType: 'client' | 'consultant';
  messageType: 'text' | 'audio' | 'video';
  content: string;
  timestamp: string;
}

interface ConsultationRoom {
  id: string;
  clientId: string;
  consultantId: number;
  roomType: string;
  creditsPerMinute: number;
  status: 'active' | 'ended';
  startedAt: string;
  consultant: {
    name: string;
    specialty: string;
    rating: number;
    profileImage: string;
  };
}

export default function ConsultationRoom() {
  const [match, params] = useRoute('/consultation/:roomId');
  const roomId = params?.roomId;
  const [message, setMessage] = useState('');
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Buscar dados da sala de consulta
  const { data: room, isLoading: roomLoading } = useQuery({
    queryKey: ['/api/consultation/room', roomId],
    enabled: !!roomId,
  });

  // Buscar mensagens da consulta
  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ['/api/consultation/messages', roomId],
    enabled: !!roomId,
    refetchInterval: 2000, // Atualizar a cada 2 segundos
  });

  // Mutação para enviar mensagem
  const sendMessageMutation = useMutation({
    mutationFn: (messageData: any) => 
      apiRequest('POST', '/api/consultation/message', messageData),
    onSuccess: () => {
      setMessage('');
      queryClient.invalidateQueries({ 
        queryKey: ['/api/consultation/messages', roomId] 
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente em alguns segundos",
        variant: "destructive",
      });
    }
  });

  // Mutação para finalizar consulta
  const endConsultationMutation = useMutation({
    mutationFn: () => 
      apiRequest('POST', `/api/consultation/end/${roomId}`),
    onSuccess: () => {
      toast({
        title: "Consulta finalizada",
        description: "Obrigado por usar nossos serviços!",
      });
      // Redirecionar para dashboard
      window.location.href = '/cliente';
    }
  });

  // Timer da sessão
  useEffect(() => {
    if (room?.status === 'active') {
      const startTime = new Date(room.startedAt).getTime();
      const timer = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        setSessionTime(elapsed);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [room]);

  // Auto-scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !roomId) return;

    sendMessageMutation.mutate({
      roomId,
      messageType: 'text',
      content: message
    });
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    toast({
      title: isVideoEnabled ? "Vídeo desativado" : "Vídeo ativado",
      description: isVideoEnabled ? "Sua câmera foi desligada" : "Sua câmera foi ligada",
    });
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    toast({
      title: isAudioEnabled ? "Áudio desativado" : "Áudio ativado", 
      description: isAudioEnabled ? "Seu microfone foi desligado" : "Seu microfone foi ligado",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateCost = () => {
    if (!room) return 0;
    const minutes = Math.ceil(sessionTime / 60);
    return (minutes * room.creditsPerMinute).toFixed(2);
  };

  if (roomLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Sala não encontrada</h2>
            <p className="text-gray-600 mb-4">A sala de consulta não existe ou foi finalizada.</p>
            <Button onClick={() => window.location.href = '/'}>
              Voltar ao início
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header da consulta */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">{room.consultant.name}</h1>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{room.consultant.specialty}</Badge>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {room.consultant.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="flex items-center text-lg font-semibold">
                  <Clock className="w-5 h-5 mr-2" />
                  {formatTime(sessionTime)}
                </div>
                <p className="text-sm text-gray-600">Tempo de sessão</p>
              </div>

              <div className="text-center">
                <div className="flex items-center text-lg font-semibold text-purple-600">
                  <CreditCard className="w-5 h-5 mr-2" />
                  R$ {calculateCost()}
                </div>
                <p className="text-sm text-gray-600">Custo atual</p>
              </div>

              <Button 
                variant="destructive"
                onClick={() => endConsultationMutation.mutate()}
                disabled={endConsultationMutation.isPending}
              >
                <PhoneOff className="w-4 h-4 mr-2" />
                Finalizar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Área de vídeo/chat */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center justify-between">
                  <span>Consulta em Andamento</span>
                  <div className="flex space-x-2">
                    <Button
                      variant={isVideoEnabled ? "default" : "outline"}
                      size="sm"
                      onClick={toggleVideo}
                    >
                      {isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant={isAudioEnabled ? "default" : "outline"}
                      size="sm"
                      onClick={toggleAudio}
                    >
                      {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Área de vídeo simulada */}
                <div className="flex-1 bg-gray-900 relative flex items-center justify-center">
                  <div className="text-white text-center">
                    <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Consulta por {room.roomType}</p>
                    <p className="text-sm opacity-75">
                      {isVideoEnabled ? "Vídeo ativado" : "Vídeo desativado"}
                    </p>
                  </div>
                  
                  {/* Indicador de tempo no canto */}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 px-3 py-1 rounded">
                    <span className="text-white font-mono">
                      {formatTime(sessionTime)}
                    </span>
                  </div>
                </div>

                {/* Controles de chamada */}
                <div className="p-4 bg-gray-50 flex justify-center space-x-4">
                  <Button
                    variant={isAudioEnabled ? "default" : "destructive"}
                    onClick={toggleAudio}
                    className="rounded-full w-12 h-12"
                  >
                    {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </Button>
                  
                  <Button
                    variant={isVideoEnabled ? "default" : "secondary"}
                    onClick={toggleVideo}
                    className="rounded-full w-12 h-12"
                  >
                    {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => endConsultationMutation.mutate()}
                    className="rounded-full w-12 h-12"
                  >
                    <PhoneOff className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat lateral */}
          <div className="space-y-6">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat da Consulta
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Mensagens */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((msg: Message) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderType === 'client' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.senderType === 'client'
                              ? 'bg-purple-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs opacity-75 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <Separator />

                {/* Input de mensagem */}
                <div className="p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                      disabled={sendMessageMutation.isPending}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || sendMessageMutation.isPending}
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}