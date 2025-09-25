"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Phone, 
  Video, 
  MoreHorizontal, 
  Smile, 
  Paperclip,
  Star,
  Clock,
  ArrowLeft,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: number;
  sender: 'user' | 'consultant' | 'system';
  content: string;
  timestamp: Date;
  type: 'text' | 'system';
}

interface ChatSession {
  id: string;
  consultant: {
    name: string;
    image: string;
    specialty: string;
    pricePerMinute: number;
    status: 'online' | 'typing' | 'away';
  };
  startTime: Date;
  duration: number;
  cost: number;
  userCredits: number;
}

// Mock data para demonstração
const mockSession: ChatSession = {
  id: "session_123",
  consultant: {
    name: "Sophia Vidente",
    image: "https://ext.same-assets.com/741558681/1685023612.jpeg",
    specialty: "Vidência e Búzios",
    pricePerMinute: 4.25,
    status: "online"
  },
  startTime: new Date(),
  duration: 0,
  cost: 0,
  userCredits: 125
};

const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'system',
    content: 'Consulta iniciada com Sophia Vidente. Taxa: R$ 4,25/min',
    timestamp: new Date(Date.now() - 300000),
    type: 'system'
  },
  {
    id: 2,
    sender: 'consultant',
    content: 'Olá! Sou Sophia, seja muito bem-vinda! Sinto uma energia muito especial ao nosso redor. Como posso te ajudar hoje?',
    timestamp: new Date(Date.now() - 280000),
    type: 'text'
  },
  {
    id: 3,
    sender: 'user',
    content: 'Oi Sophia! Estou passando por um momento difícil no relacionamento e gostaria de uma orientação.',
    timestamp: new Date(Date.now() - 260000),
    type: 'text'
  },
  {
    id: 4,
    sender: 'consultant',
    content: 'Entendo perfeitamente. Vou consultar os búzios para você. Estou sentindo que há muita confusão de sentimentos envolvida. Me conta um pouco mais sobre a situação?',
    timestamp: new Date(Date.now() - 240000),
    type: 'text'
  }
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [session, setSession] = useState<ChatSession>(mockSession);
  const [isSessionActive, setIsSessionActive] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simular timer da sessão
  useEffect(() => {
    if (!isSessionActive) return;

    const timer = setInterval(() => {
      setSession(prev => ({
        ...prev,
        duration: prev.duration + 1,
        cost: (prev.duration + 1) * (prev.consultant.pricePerMinute / 60)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [isSessionActive]);

  // Auto-scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !isSessionActive) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simular resposta do consultor
    setTimeout(() => {
      const consultantMessage: Message = {
        id: messages.length + 2,
        sender: 'consultant',
        content: 'Compreendo sua situação. Os búzios estão me mostrando que há uma fase de transformação chegando. Preciso que você me diga se há uma terceira pessoa envolvida nessa história?',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, consultantMessage]);
      setIsTyping(false);
    }, 3000);
  };

  const endSession = () => {
    setIsSessionActive(false);
    const systemMessage: Message = {
      id: messages.length + 1,
      sender: 'system',
      content: `Consulta finalizada. Duração: ${Math.floor(session.duration / 60)}:${(session.duration % 60).toString().padStart(2, '0')}. Custo total: R$ ${session.cost.toFixed(2)}`,
      timestamp: new Date(),
      type: 'system'
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/consultores">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={session.consultant.image} alt={session.consultant.name} />
                <AvatarFallback>{session.consultant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-dark-blue">{session.consultant.name}</div>
                <div className="text-sm text-gray-600 flex items-center space-x-2">
                  <Badge className="bg-green text-white text-xs">
                    {session.consultant.status === 'online' ? 'Online' : 
                     session.consultant.status === 'typing' ? 'Digitando...' : 'Ausente'}
                  </Badge>
                  <span>•</span>
                  <span>{session.consultant.specialty}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Timer e Custo */}
            <div className="text-right">
              <div className="font-semibold text-dark-blue flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {formatTime(session.duration)}
              </div>
              <div className="text-sm text-gray-600">
                R$ {session.cost.toFixed(2)} • {session.userCredits} créditos
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              <Button 
                onClick={endSession}
                className="bg-red-600 hover:bg-red-700 text-white"
                size="sm"
                disabled={!isSessionActive}
              >
                Finalizar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      {isSessionActive && (
        <div className="bg-green/10 border-b border-green/20 px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Consulta em andamento</span>
            </div>
            <div className="text-green-700">
              Taxa: R$ {session.consultant.pricePerMinute.toFixed(2)}/min
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.type === 'system' ? (
              <div className="flex justify-center">
                <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{message.content}</span>
                </div>
              </div>
            ) : (
              <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
                  {message.sender === 'consultant' && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={session.consultant.image} alt={session.consultant.name} />
                      <AvatarFallback className="text-xs">
                        {session.consultant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-gold text-dark-blue ml-auto'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-dark-blue/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>

                  {message.sender === 'user' && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-gold text-dark-blue">
                        EU
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={session.consultant.image} alt={session.consultant.name} />
                <AvatarFallback className="text-xs">
                  {session.consultant.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        {isSessionActive ? (
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="pr-10"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Smile className="w-4 h-4" />
              </Button>
            </div>

            <Button 
              onClick={sendMessage}
              className="bg-gold hover:bg-gold/90 text-dark-blue"
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4">Consulta finalizada</p>
            <div className="flex justify-center space-x-3">
              <Button className="bg-gold hover:bg-gold/90 text-dark-blue">
                <Star className="w-4 h-4 mr-2" />
                Avaliar Consulta
              </Button>
              <Link href="/consultores">
                <Button variant="outline">
                  Nova Consulta
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}