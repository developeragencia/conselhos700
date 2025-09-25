import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, Video, FileText, Image, Smile, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  senderId: string;
  senderType: 'client' | 'consultant';
  content: string;
  messageType: 'text' | 'image' | 'file';
  timestamp: Date;
}

interface ConsultationChatProps {
  roomId: string;
  userId: string;
  userType: 'client' | 'consultant';
  consultantName?: string;
  consultantImage?: string;
  onEndSession?: () => void;
}

export const ConsultationChat: React.FC<ConsultationChatProps> = ({
  roomId,
  userId,
  userType,
  consultantName = "Consultor",
  consultantImage,
  onEndSession
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectWebSocket = () => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws/consultation`;
    
    const websocket = new WebSocket(wsUrl);

    websocket.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      setWs(websocket);
      
      // Join room
      websocket.send(JSON.stringify({
        type: 'join',
        roomId,
        userId,
        userType
      }));
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleWebSocketMessage(data);
    };

    websocket.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      setWs(null);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      toast({
        title: "Erro de Conexão",
        description: "Problemas na conexão. Tentando reconectar...",
        variant: "destructive"
      });
    };
  };

  const handleWebSocketMessage = (data: any) => {
    switch (data.type) {
      case 'joined':
        toast({
          title: "Conectado",
          description: "Você entrou na sala de consulta"
        });
        break;
      
      case 'message_history':
        setMessages(data.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
        break;
      
      case 'new_message':
        setMessages(prev => [...prev, {
          id: data.messageId,
          senderId: data.senderId,
          senderType: data.senderType,
          content: data.content,
          messageType: data.messageType,
          timestamp: new Date(data.timestamp)
        }]);
        break;
      
      case 'user_typing':
        if (data.userId !== userId) {
          setTypingUser(data.userId);
        }
        break;
      
      case 'user_stop_typing':
        setTypingUser(null);
        break;
      
      case 'session_ended':
        toast({
          title: "Consulta Finalizada",
          description: "A sessão foi encerrada"
        });
        if (onEndSession) {
          onEndSession();
        }
        break;
      
      case 'error':
        toast({
          title: "Erro",
          description: data.message,
          variant: "destructive"
        });
        break;
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !ws || !isConnected) return;

    ws.send(JSON.stringify({
      type: 'message',
      roomId,
      userId,
      userType,
      content: newMessage,
      messageType: 'text'
    }));

    setNewMessage('');
  };

  const handleTyping = () => {
    if (!ws || !isConnected) return;
    
    ws.send(JSON.stringify({
      type: 'typing',
      roomId,
      userId,
      userType
    }));

    // Stop typing after 3 seconds
    setTimeout(() => {
      if (ws && isConnected) {
        ws.send(JSON.stringify({
          type: 'stop_typing',
          roomId,
          userId,
          userType
        }));
      }
    }, 3000);
  };

  const endSession = () => {
    if (!ws || !isConnected) return;

    ws.send(JSON.stringify({
      type: 'end_session',
      roomId,
      userId,
      userType
    }));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={consultantImage} />
            <AvatarFallback>{consultantName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{consultantName}</h3>
            <p className="text-sm opacity-90">
              {isConnected ? 'Online' : 'Conectando...'}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Video className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={endSession}
            className="text-white hover:bg-white/20"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${
                message.senderId === userId ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.senderId === userId
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.senderId === userId ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {typingUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <FileText className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Image className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Smile className="w-4 h-4" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
            placeholder="Digite sua mensagem..."
            className="flex-1"
            disabled={!isConnected}
          />
          <Button 
            onClick={sendMessage}
            disabled={!newMessage.trim() || !isConnected}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};