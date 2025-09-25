import React from 'react';
import { motion } from 'framer-motion';

interface ServicoProps {
  titulo: string;
  descricao: string;
  imagem: string;
  cor: string;
  icone: React.ReactNode;
}

// Componente de cartão individual para cada serviço
const ServicoCard = ({ titulo, descricao, imagem, cor, icone, index = 0 }: ServicoProps & { index?: number }) => {
  // Mapeamento de cores para classes de gradiente
  const corClasses: Record<string, string> = {
    purple: "from-purple-600 to-indigo-600",
    blue: "from-blue-600 to-cyan-600",
    green: "from-emerald-600 to-teal-600",
    orange: "from-amber-600 to-orange-600",
    pink: "from-pink-600 to-rose-600",
    violet: "from-violet-600 to-purple-600"
  };
  
  const gradienteClasse = corClasses[cor] || corClasses.purple;
  
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Overlay de gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 opacity-60 group-hover:opacity-90 transition-opacity duration-500 z-10"></div>
      
      {/* Imagem de fundo */}
      <div className="h-80">
        <img 
          src={imagem} 
          alt={titulo} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* Ícone flutuante */}
      <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r ${gradienteClasse} flex items-center justify-center text-white shadow-lg z-20 transform group-hover:scale-110 transition-all duration-300`}>
        {icone}
      </div>
      
      {/* Conteúdo do cartão */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-2xl font-bold text-white mb-2">{titulo}</h3>
        
        <div className={`w-16 h-1 bg-gradient-to-r ${gradienteClasse} rounded-full mb-4 transform origin-left group-hover:scale-x-100 transition-transform duration-500`}></div>
        
        <p className="text-white/90 mb-6 text-sm transform opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-150">{descricao}</p>
        
        <a 
          href={`/servicos/${titulo.toLowerCase()}`}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${gradienteClasse} text-white text-sm font-medium transform opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-200 hover:shadow-lg`}
        >
          <span>Saiba mais</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

// Componente principal que renderiza o grid de serviços
const ServicosGrid: React.FC = () => {
  // Lista de serviços
  const servicos = [
    {
      titulo: "Tarot",
      descricao: "Consultas detalhadas de Tarot para orientação em decisões, previsões futuras e autoconhecimento profundo.",
      imagem: "/images/services/tarot.jpg",
      cor: "purple",
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      titulo: "Astrologia",
      descricao: "Mapas astrais detalhados para entender influências planetárias, compatibilidade e momentos decisivos em sua vida.",
      imagem: "/images/services/astrologia.jpg",
      cor: "blue",
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      )
    },
    {
      titulo: "Numerologia",
      descricao: "Análise detalhada de números significativos para revelar padrões, desafios e propósitos de vida.",
      imagem: "/images/services/numerologia.jpg",
      cor: "green",
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      )
    },
    {
      titulo: "Runas",
      descricao: "Interpretação dos símbolos rúnicos ancestrais para orientação espiritual, proteção e compreensão do destino.",
      imagem: "/images/services/runas.jpg",
      cor: "orange",
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      titulo: "Mediunidade",
      descricao: "Comunicação com o plano espiritual para orientações, curas energéticas e mensagens de entes queridos.",
      imagem: "/images/services/videncia.jpg",
      cor: "pink",
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    {
      titulo: "Oráculos",
      descricao: "Leituras de diferentes oráculos para orientação espiritual e clareza em situações específicas da sua vida.",
      imagem: "/images/services/buzios.jpg",
      cor: "violet",
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Título da seção */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.span
            className="inline-block py-1.5 px-4 bg-purple-600/10 text-purple-600 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            NOSSOS SERVIÇOS ESOTÉRICOS
          </motion.span>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Descubra as diversas formas em que podemos <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">auxiliar em sua jornada espiritual</span>
          </motion.h2>
          
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Nossos especialistas combinam anos de experiência com métodos ancestrais para proporcionar orientação precisa e transformadora.
          </motion.p>
          
          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mt-8 rounded-full"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          ></motion.div>
        </div>
        
        {/* Grid de serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {servicos.map((servico, index) => (
            <ServicoCard 
              key={index}
              titulo={servico.titulo}
              descricao={servico.descricao}
              imagem={servico.imagem}
              cor={servico.cor}
              icone={servico.icone}
              index={index}
            />
          ))}
        </div>
        
        {/* Botão "Ver todos os serviços" */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <a
            href="/servicos"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition duration-300 hover:scale-105"
          >
            <span>Ver todos os serviços</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicosGrid;