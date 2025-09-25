import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialProps {
  testimonial: {
    id: number;
    content: string;
    author: {
      name: string;
      location: string;
      imageUrl: string;
    };
    rating: number;
  };
}

export const TestimonialCard: React.FC<TestimonialProps> = ({ testimonial }) => {
  if (!testimonial) return null;
  
  const { content, author, rating } = testimonial;
  
  // Garantir que author existe e tem as propriedades necessárias
  const safeAuthor = author || { name: '', location: '', imageUrl: '' };

  return (
    <Card className="group bg-white p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 rounded-xl relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-tl from-accent/5 to-transparent transform group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-700"></div>
      
      {/* Quote icon */}
      <motion.div 
        className="absolute top-4 right-4 text-accent/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.5 10.995V14.5C6.5 17.535 8.965 19.995 12 19.995V17.495C10.35 17.495 9 16.145 9 14.495V10.995H6.5ZM14 10.995V14.5C14 17.535 16.465 19.995 19.5 19.995V17.495C17.85 17.495 16.5 16.145 16.5 14.495V10.995H14ZM4 5.995H9V8.495H4V5.995ZM11.5 5.995H16.5V8.495H11.5V5.995Z" />
        </svg>
      </motion.div>
      
      <CardContent className="p-0 relative z-10">
        {/* Star rating with animation */}
        <div className="flex items-center mb-6">
          <div className="flex text-accent gap-1">
            {Array(5).fill(0).map((_, i) => (
              <motion.svg 
                key={i} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={i < rating ? "currentColor" : "none"}
                stroke="currentColor"
                className="w-5 h-5"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={i < rating ? 0 : 1.5}
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
                />
              </motion.svg>
            ))}
          </div>
        </div>
        
        {/* Testimonial content */}
        <div className="mb-8">
          <motion.p 
            className="text-gray-600 italic text-lg leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            "{content}"
          </motion.p>
        </div>
        
        {/* Author info */}
        <motion.div 
          className="flex items-center border-t border-gray-100 pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="mr-4 relative">
            <div className="w-14 h-14 rounded-full border-2 border-accent/20 p-0.5 overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
              <Avatar className="w-full h-full">
                <AvatarImage src={safeAuthor.imageUrl} alt={safeAuthor.name} className="object-cover" />
                <AvatarFallback className="bg-primary text-white text-lg">{safeAuthor.name.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-1 shadow-md transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-primary text-lg group-hover:text-accent transition-colors duration-300">{safeAuthor.name}</h4>
            <p className="text-sm text-gray-500">{safeAuthor.location}</p>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};
