import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Video, MoreVertical, Paperclip, Smile, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'consultant';
  type: 'text' | 'audio' | 'image';
  status: 'sent' | 'delivered' | 'read';
}

export default function Chat() {
  const [match, params] = useRoute("/chat/:consultantId");
  const consultantId = params?.consultantId || "1";
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: consultant } = useQuery({
    queryKey: [`/api/consultants/${consultantId}`],
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simular conexão WebSocket para chat em tempo real
  useEffect(() => {
    // Aqui seria a conexão real com WebSocket
    const mockMessages: Message[] = [
      {
        id: '1',
        content: 'Olá! Obrigada por escolher uma consulta comigo. Como posso te ajudar hoje?',
        timestamp: new Date(Date.now() - 300000),
        sender: 'consultant',
        type: 'text',
        status: 'read'
      },
      {
        id: '2',
        content: 'Oi! Gostaria de uma orientação sobre minha vida amorosa.',
        timestamp: new Date(Date.now() - 240000),
        sender: 'user',
        type: 'text',
        status: 'read'
      },
      {
        id: '3',
        content: 'Perfeito! Vou puxar as cartas para você. Me fale um pouco sobre sua situação atual no amor.',
        timestamp: new Date(Date.now() - 180000),
        sender: 'consultant',
        type: 'text',
        status: 'read'
      }
    ];
    setMessages(mockMessages);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date(),
      sender: 'user',
      type: 'text',
      status: 'sent'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simular resposta do consultor
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        const consultantReply: Message = {
          id: (Date.now() + 1).toString(),
          content: 'Entendi. Deixe-me consultar as cartas para te dar uma orientação mais precisa...',
          timestamp: new Date(),
          sender: 'consultant',
          type: 'text',
          status: 'sent'
        };
        setMessages(prev => [...prev, consultantReply]);
        setIsTyping(false);
      }, 2000);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openWhatsApp = () => {
    const whatsappNumber = consultant?.whatsapp || "5511999999999";
    const consultantName = consultant?.name || "Consultor";
    const message = encodeURIComponent(`Olá ${consultantName}, gostaria de uma consulta!`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header do Chat */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={consultant?.imageUrl || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"}
            alt={consultant?.name || "Consultor"}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-gray-800">{consultant?.name || "Consultor Especialista"}</h2>
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={openWhatsApp}
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            title="Continuar no WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
          <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-800 shadow-sm'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white rounded-2xl px-4 py-2 shadow-sm">
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

      {/* Input de Mensagem */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-transparent outline-none text-gray-800"
            />
            <button className="p-1 hover:bg-gray-200 rounded-full">
              <Smile className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        {/* Botão WhatsApp Destacado */}
        <div className="mt-3 text-center">
          <button
            onClick={openWhatsApp}
            className="inline-flex items-center space-x-2 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Continuar conversa no WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}