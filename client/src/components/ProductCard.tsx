import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";

interface ProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    rating?: number;
    reviewCount?: number;
    discount?: number;
  };
  index?: number;
}

export const ProductCard: React.FC<ProductProps> = ({ product, index = 0 }) => {
  const { id, name, description, price, imageUrl, category, rating = 0, reviewCount = 0, discount } = product;

  const finalPrice = discount ? price * (1 - discount / 100) : price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {discount && (
            <Badge className="absolute top-2 left-2 bg-red-500">
              -{discount}%
            </Badge>
          )}
          <Badge className="absolute top-2 right-2 bg-purple-600">
            {category}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
            {name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>
          
          {rating > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({reviewCount})</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {discount && (
                <span className="text-gray-500 line-through text-sm">
                  R$ {price.toFixed(2)}
                </span>
              )}
              <span className="text-xl font-bold text-purple-600">
                R$ {finalPrice.toFixed(2)}
              </span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </motion.button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};