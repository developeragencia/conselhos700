import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Video, 
  Phone, 
  Clock, 
  Star,
  User,
  CreditCard,
  Zap,
  Users
} from 'lucide-react';
import { Link } from 'wouter';

interface ConsultantOnline {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  pricePerMinute: number;
  responseTime: string;
  isOnline: boolean;
  avatar: string;
  whatsappNumber?: string;
}

export function LiveConsultationWidget() {
  const [onlineConsultants, setOnlineConsultants] = useState<ConsultantOnline[]>([]);
  const [selectedConsultant, setSelectedConsultant] = useState<ConsultantOnline | null>(null);

  // Simular consultores online baseado no sistema real
  useEffect(() => {
    const consultants: ConsultantOnline[] = [
      {
        id: 1,
        name: "Fabianna",
        specialty: "Tarot e Vidência",
        rating: 4.8,
        pricePerMinute: 3.50,
        responseTime: "< 30s",
        isOnline: true,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=80&h=80&fit=crop&crop=face",
        whatsappNumber: "+5511999887766"
      },
      {
        id: 2,
        name: "AnnaFreya",
        specialty: "Cartomancia",
        rating: 4.9,
        pricePerMinute: 4.00,
        responseTime: "< 1min",
        isOnline: false,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
        whatsappNumber: "+5511888776655"
      },
      {
        id: 3,
        name: "Mística",
        specialty: "Numerologia",
        rating: 4.7,
        pricePerMinute: 3.80,
        responseTime: "< 45s",
        isOnline: true,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
        whatsappNumber: "+5511777665544"
      },
      {
        id: 4,
        name: "Atena",
        specialty: "Vidência",
        rating: 4.9,
        pricePerMinute: 5.00,
        responseTime: "< 1min",
        isOnline: false,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
        whatsappNumber: "+5511666554433"
      }
    ];
    setOnlineConsultants(consultants);
  }, []);

  const startConsultation = (consultant: ConsultantOnline, method: 'chat' | 'video' | 'phone' | 'whatsapp') => {
    if (method === 'whatsapp') {
      // Redirecionar para WhatsApp do consultor
      const whatsappNumber = consultant.whatsappNumber || "+5511999887766";
      const message = `Olá ${consultant.name}! Gostaria de fazer uma consulta de ${consultant.specialty}. Vim através do site Conselhos Esotéricos.`;
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // Implementar outras consultas
      console.log(`Iniciando consulta ${method} com ${consultant.name}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-purple-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent p-4 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Consultas Online</h3>
          <div className="flex items-center space-x-1 text-sm">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            <span>{onlineConsultants.length} online</span>
          </div>
        </div>
      </div>

      {/* Consultores Online */}
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {onlineConsultants.map((consultant) => (
          <motion.div
            key={consultant.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className="relative">
                <img
                  src={consultant.avatar}
                  alt={consultant.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">{consultant.name}</h4>
                <p className="text-sm text-gray-600 truncate">{consultant.specialty}</p>
                
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                    <span>{consultant.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{consultant.responseTime}</span>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="w-3 h-3 mr-1" />
                    <span>R$ {consultant.pricePerMinute.toFixed(2)}/min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => startConsultation(consultant, 'chat')}
                className="flex items-center justify-center p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                title="Chat"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => startConsultation(consultant, 'video')}
                className="flex items-center justify-center p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                title="Vídeo"
              >
                <Video className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => startConsultation(consultant, 'phone')}
                className="flex items-center justify-center p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                title="Áudio"
              >
                <Phone className="w-4 h-4" />
              </button>

              <button
                onClick={() => startConsultation(consultant, 'whatsapp')}
                className="flex items-center justify-center p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                title="WhatsApp"
              >
                <span className="text-lg">💬</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer com Call-to-Action */}
      <div className="p-4 bg-gray-50 border-t">
        <Link href="/consultas-online">
          <motion.button
            className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap className="w-5 h-5 mr-2" />
            Ver Sistema Completo
          </motion.button>
        </Link>

        <div className="grid grid-cols-3 gap-4 mt-3 text-center text-xs text-gray-600">
          <div>
            <Users className="w-4 h-4 mx-auto mb-1" />
            <span>50+ Consultores</span>
          </div>
          <div>
            <Clock className="w-4 h-4 mx-auto mb-1" />
            <span>24/7 Disponível</span>
          </div>
          <div>
            <Star className="w-4 h-4 mx-auto mb-1" />
            <span>4.9 ★ Avaliação</span>
          </div>
        </div>
      </div>
    </div>
  );
}