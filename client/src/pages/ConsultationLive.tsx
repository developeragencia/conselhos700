import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Video, MessageCircle, Phone, Clock, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ConsultationLive() {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const { data: activeConsultations } = useQuery({
    queryKey: ["/api/consultations/active"],
  });

  const { data: consultationStats } = useQuery({
    queryKey: ["/api/consultation-stats"],
  });

  const startConsultation = (roomId: string, type: 'video' | 'chat' | 'phone') => {
    setActiveRoom(roomId);
    setIsConnected(true);
    // Implementar lógica de conexão WebSocket/WebRTC
  };

  const sendMessage = (message: string) => {
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'client',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header com estatísticas em tempo real */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Consultores Online</p>
                  <p className="text-3xl font-bold text-green-700">24</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Consultas Ativas</p>
                  <p className="text-3xl font-bold text-blue-700">12</p>
                </div>
                <Video className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Tempo Médio</p>
                  <p className="text-3xl font-bold text-purple-700">35min</p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Satisfação</p>
                  <p className="text-3xl font-bold text-orange-700">4.9</p>
                </div>
                <Star className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interface de consulta ativa */}
        {activeRoom ? (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Área principal da consulta */}
            <div className="lg:col-span-2">
              <Card className="h-96">
                <CardContent className="p-6 h-full">
                  <div className="bg-gray-900 rounded-lg h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <Video className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Consulta em Andamento</h3>
                      <p className="text-gray-300">Conectado com Cliente Clara</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat lateral */}
            <div>
              <Card className="h-96">
                <CardContent className="p-4 h-full flex flex-col">
                  <h4 className="font-semibold mb-4">Chat da Consulta</h4>
                  <div className="flex-1 overflow-y-auto mb-4 space-y-2">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-2 rounded max-w-xs ${
                          msg.sender === 'client'
                            ? 'bg-purple-100 ml-auto'
                            : 'bg-gray-100'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Digite sua mensagem..."
                      className="flex-1 p-2 border rounded"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value) {
                          sendMessage(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <Button size="sm">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ) : (
          /* Lista de consultores disponíveis */
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">MC</span>
                    </div>
                    <h3 className="font-semibold mb-1">Cliente Clara</h3>
                    <p className="text-sm text-gray-600 mb-2">Especialista em Tarot</p>
                    <div className="flex items-center justify-center gap-1 mb-4">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.9 (147 avaliações)</span>
                    </div>
                    <div className="space-y-2">
                      <Button
                        className="w-full"
                        onClick={() => startConsultation(`room_${i}`, 'video')}
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Videochamada
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => startConsultation(`room_${i}`, 'chat')}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}