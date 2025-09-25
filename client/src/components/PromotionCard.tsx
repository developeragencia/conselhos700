import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Gift } from "lucide-react";

interface PromotionProps {
  promotion: {
    id: number;
    title: string;
    description: string;
    discount: number;
    imageUrl: string;
    expiresAt: string;
    code?: string;
  };
  index?: number;
}

export const PromotionCard: React.FC<PromotionProps> = ({ promotion, index = 0 }) => {
  const { title, description, discount, imageUrl, expiresAt, code } = promotion;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
            -{discount}%
          </Badge>
          <div className="absolute top-2 right-2">
            <Gift className="w-6 h-6 text-yellow-500" />
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2 text-purple-800">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3">
            {description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Válido até {formatDate(expiresAt)}</span>
            </div>
          </div>
          
          {code && (
            <div className="bg-gray-100 rounded p-2 text-center mb-3">
              <span className="text-xs text-gray-500">Código:</span>
              <div className="font-mono font-bold text-purple-600">{code}</div>
            </div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Aproveitar Oferta
          </motion.button>
        </CardContent>
      </Card>
    </motion.div>
  );
};