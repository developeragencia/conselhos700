import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { Calendar, Tag, BookOpen, ArrowRight } from "lucide-react";

interface BlogPostProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    category: string;
    imageUrl: string;
  };
}

export const BlogCard: React.FC<BlogPostProps> = ({ post }) => {
  const { title, excerpt, slug, date, category, imageUrl } = post;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      {/* Overlay gradient que aparece no hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/30 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"></div>
      
      {/* Imagem do blog */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badge da categoria */}
        <div className="absolute top-4 left-4 z-20">
          <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {category}
          </div>
        </div>
        
        {/* Ícone flutuante */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-lg z-20 transform opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500">
          <BookOpen className="h-5 w-5" />
        </div>
      </div>
      
      {/* Conteúdo */}
      <div className="p-6 relative z-10">
        {/* Data */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4 mr-2 text-accent" />
          {formatDate(date)}
        </div>
        
        {/* Título */}
        <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        
        {/* Linha decorativa */}
        <div className="w-12 h-0.5 bg-accent mb-3 transform origin-left scale-0 group-hover:scale-100 transition-all duration-500"></div>
        
        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
          {excerpt}
        </p>
        
        {/* Botão de ler mais */}
        <div className="flex justify-between items-center">
          <Link href={`/blog/${slug}`}>
            <motion.div 
              className="inline-flex items-center gap-2 text-accent hover:text-primary font-medium transition-colors duration-300 cursor-pointer"
              whileHover={{ x: 5 }}
            >
              <span>Ler artigo</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.div>
          </Link>
          
          {/* Tempo de leitura estimado */}
          <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            5 min de leitura
          </div>
        </div>
      </div>
      
      {/* Efeito de borda brilhante no hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent/20 transition-all duration-500"></div>
    </motion.div>
  );
};
