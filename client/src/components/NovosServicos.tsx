import React from 'react';
import { motion } from 'framer-motion';

// Componente de serviço individual com animações e efeitos
const ServicoCard = ({ servico, index }: { servico: any, index: number }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl shadow-lg group bg-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      {/* Overlay de gradiente que aparece no hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/40 to-primary/90 opacity-0 group-hover:opacity-85 transition-all duration-500 z-10"></div>
      
      {/* Imagem do serviço */}
      <div className="h-64 overflow-hidden">
        <img 
          src={servico.imagem} 
          alt={servico.titulo} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* Ícone flutuante */}
      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-lg z-20 transform group-hover:rotate-12 transition-all duration-300">
        <span className="text-2xl">{servico.icone}</span>
      </div>
      
      {/* Conteúdo */}
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold text-primary group-hover:text-white transition-all duration-300">{servico.titulo}</h3>
        
        <div className="w-12 h-0.5 bg-accent my-3 transform origin-left scale-0 group-hover:scale-100 transition-all duration-300 delay-100"></div>
        
        <p className="text-gray-600 text-sm group-hover:text-white/90 transition-all duration-300">
          {servico.descricao}
        </p>
        
        <div className="mt-4 flex justify-end transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-150">
          <a
            href={servico.link}
            className="px-4 py-2 rounded-full bg-white text-primary text-sm font-medium hover:bg-primary/10 transition-colors duration-300 flex items-center gap-2"
          >
            <span>Saiba mais</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Componente principal da seção de serviços
const NovosServicos = () => {
  // Lista de serviços com dados completos usando as imagens originais
  const servicos = [
    {
      titulo: "Tarot",
      descricao: "Consultas detalhadas de Tarot para orientação em decisões, previsões futuras e autoconhecimento profundo.",
      imagem: "/images/services/tarot.svg",
      icone: "🔮",
      link: "/servicos/tarot"
    },
    {
      titulo: "Astrologia",
      descricao: "Mapas astrais detalhados para entender influências planetárias, compatibilidade e momentos decisivos em sua vida.",
      imagem: "/images/services/astrologia.svg",
      icone: "✨",
      link: "/servicos/astrologia"
    },
    {
      titulo: "Numerologia",
      descricao: "Análise detalhada de números significativos para revelar padrões, desafios e propósitos de vida.",
      imagem: "/images/services/numerologia.svg",
      icone: "🔢",
      link: "/servicos/numerologia"
    },
    {
      titulo: "Runas",
      descricao: "Interpretação dos símbolos rúnicos ancestrais para orientação espiritual, proteção e compreensão do destino.",
      imagem: "/images/services/runas.svg",
      icone: "⚡",
      link: "/servicos/runas"
    },
    {
      titulo: "Mediunidade",
      descricao: "Comunicação com o plano espiritual para orientações, curas energéticas e mensagens de entes queridos.",
      imagem: "/images/services/mediunidade.svg",
      icone: "👁️",
      link: "/servicos/mediunidade"
    },
    {
      titulo: "Oráculos",
      descricao: "Leituras de diferentes oráculos para orientação espiritual e clareza em situações específicas da sua vida.",
      imagem: "/images/services/oraculos.svg",
      icone: "🔍",
      link: "/servicos/oraculos"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full opacity-20 filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full opacity-20 filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Título da seção */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block py-1.5 px-4 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            NOSSOS SERVIÇOS ESOTÉRICOS
          </motion.span>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-primary mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Descubra seu Caminho Espiritual
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-accent mx-auto mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Descubra as diversas formas em que podemos auxiliar em sua jornada espiritual com nossos serviços especializados.
          </motion.p>
        </div>
        
        {/* Grid de serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {servicos.map((servico, index) => (
            <ServicoCard key={index} servico={servico} index={index} />
          ))}
        </div>
        
        {/* Botão "Ver todos os serviços" */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="/servicos"
            className="px-8 py-4 bg-primary text-white rounded-full font-medium inline-flex items-center gap-2 hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Ver todos os serviços</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default NovosServicos;