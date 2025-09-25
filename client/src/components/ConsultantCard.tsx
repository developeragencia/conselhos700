import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ConsultantProps {
  consultant: {
    id: number;
    name: string;
    title: string;
    rating: string;
    reviewCount: number;
    description: string;
    pricePerMinute: string;
    status: "online" | "offline" | "busy";
    imageUrl: string;
    whatsapp?: string;
    specialty: string;
  };
  index?: number;
}

export const ConsultantCard: React.FC<ConsultantProps> = ({ consultant, index = 0 }) => {
  const openWhatsApp = () => {
    // Redireciona para página de pagamento antes de acessar WhatsApp
    window.location.href = `/comprar/consultas?consultor=${consultant.id}&tipo=whatsapp`;
  };

  const startChat = () => {
    // Redireciona para página de pagamento antes de acessar Chat
    window.location.href = `/comprar/consultas?consultor=${consultant.id}&tipo=chat`;
  };

  const startVideo = () => {
    // Redireciona para página de pagamento antes de acessar Vídeo
    window.location.href = `/comprar/consultas?consultor=${consultant.id}&tipo=video`;
  };
  const { id, name, title, rating, reviewCount, description, pricePerMinute, status, imageUrl, specialty } = consultant;

  const handleConsult = () => {
    window.location.href = `/consultores/${id}`;
  };

  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "busy":
        return "bg-orange-500";
      case "offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "online":
        return "ONLINE";
      case "busy":
        return "OCUPADO";
      case "offline":
        return "OFFLINE";
      default:
        return "OFFLINE";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className="overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative">
          <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
            <motion.img 
              src={imageUrl} 
              alt={`${name} - ${title}`} 
              className="w-full h-full object-cover object-center"
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
          </div>
          
          <div className="absolute top-3 right-3">
            <Badge 
              variant="default" 
              className={`${getStatusColor()} text-white px-3 py-1 text-xs font-bold shadow-md rounded-full`}
            >
              {getStatusText()}
            </Badge>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-4 text-white">
            <motion.h3 
              className="text-lg sm:text-xl font-bold mb-1 drop-shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {name}
            </motion.h3>
            <motion.p 
              className="text-xs sm:text-sm opacity-90 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.p>
          </div>
        </div>
        
        <CardContent className="p-4 sm:p-6 flex-grow flex flex-col">
          <div className="flex items-center mb-3">
            <div className="flex gap-0.5 text-accent">
              {Array(5).fill(0).map((_, i) => (
                <motion.svg 
                  key={i} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill={i < Math.floor(parseFloat(rating)) ? "currentColor" : "none"}
                  stroke="currentColor"
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  initial={{ opacity: 0, rotate: -30 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1), duration: 0.3 }}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={i < parseFloat(rating) ? 0 : 1.5} 
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
                  />
                </motion.svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">({reviewCount})</span>
          </div>
          
          <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2 sm:line-clamp-3 flex-grow">{description}</p>
          
          <div className="flex flex-col gap-3 pt-2 border-t border-gray-100 mt-auto">
            <div className="flex justify-between items-center">
              <span className="text-base sm:text-lg font-bold text-primary">
                R$ {parseFloat(pricePerMinute).toFixed(2)}
                <span className="text-xs text-gray-400">/min</span>
              </span>
              
              <motion.button 
                className="bg-primary hover:bg-primary/90 text-white font-medium py-1 px-3 rounded-lg text-xs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConsult}
              >
                Ver Perfil
              </motion.button>
            </div>
            
            {/* Botões de Atendimento */}
            <div className="grid grid-cols-3 gap-2">
              <motion.button
                onClick={startChat}
                className="flex items-center justify-center p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                title="Chat na plataforma"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                onClick={openWhatsApp}
                className="flex items-center justify-center p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                title="WhatsApp"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                onClick={startVideo}
                className="flex items-center justify-center p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                title="Videochamada"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Video className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Botão Principal WhatsApp */}
            <motion.button
              onClick={openWhatsApp}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar via WhatsApp</span>
            </motion.button>
            
            {/* Aviso de Pagamento */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                💳 Pagamento seguro antes do atendimento
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
