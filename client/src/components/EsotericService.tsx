import React from 'react';
import { motion } from 'framer-motion';

interface EsotericServiceProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
  color: string;
  link: string;
  index: number;
}

export const EsotericService: React.FC<EsotericServiceProps> = ({
  title,
  description,
  imageUrl,
  icon,
  color,
  link,
  index
}) => {
  // Define color classes based on the color prop
  const colorClasses = {
    purple: "from-purple-600 to-indigo-700",
    blue: "from-blue-600 to-cyan-700",
    green: "from-emerald-600 to-teal-700",
    orange: "from-amber-600 to-orange-700",
    pink: "from-pink-600 to-rose-700",
    violet: "from-violet-600 to-purple-700"
  };
  
  const gradientClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.purple;
  
  return (
    <motion.div 
      className="relative overflow-hidden rounded-2xl shadow-lg bg-white group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      {/* Image Container */}
      <div className="h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 opacity-50 group-hover:opacity-80 transition-opacity duration-500 z-10" />
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* Icon */}
      <div 
        className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white shadow-lg z-10 transform group-hover:scale-110 transition-all duration-300`}
      >
        {icon}
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
        <h3 className="text-2xl font-bold mb-2 transform group-hover:translate-y-0 transition-all duration-300">
          {title}
        </h3>
        
        <div className={`w-12 h-1 bg-gradient-to-r ${gradientClass} rounded-full my-3 transform origin-left group-hover:scale-x-125 transition-all duration-300`}></div>
        
        <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
          <p className="text-white/90 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {description}
          </p>
        </div>
        
        <button 
          onClick={() => window.location.href = link}
          className={`px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium flex items-center gap-2 hover:bg-white/30 transition-all duration-300 group`}
        >
          <span>Saiba mais</span>
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transform group-hover:translate-x-1 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </motion.div>
  );
};