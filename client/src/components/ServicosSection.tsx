import React from 'react';
import { motion } from 'framer-motion';

interface ServicoProps {
  titulo: string;
  descricao: string;
  imagem: string;
  cor: string;
  link: string;
}

const Servico: React.FC<ServicoProps & { index: number }> = ({ titulo, descricao, imagem, cor, link, index }) => {
  // Mapeamento de cores para classes de gradiente
  const cores = {
    purple: "from-purple-600 to-indigo-600",
    blue: "from-blue-600 to-cyan-600",
    green: "from-emerald-600 to-teal-600",
    orange: "from-amber-600 to-orange-600",
    pink: "from-pink-600 to-rose-600",
    violet: "from-violet-600 to-purple-600"
  };
  
  // Classe de gradiente baseada na cor escolhida
  const gradienteClasse = cores[cor as keyof typeof cores] || cores.purple;
  
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 h-96"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      {/* Sobreposição de gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 opacity-60 group-hover:opacity-90 transition-opacity duration-500 z-10"></div>
      
      {/* Imagem */}
      <div className="absolute inset-0 z-0">
        <img 
          src={imagem} 
          alt={titulo} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* Ícone */}
      <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r ${gradienteClasse} flex items-center justify-center text-white shadow-lg z-20 transform group-hover:scale-110 transition-all duration-300`}>
        <span className="text-lg font-bold">{index + 1}</span>
      </div>
      
      {/* Conteúdo */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-2xl font-bold text-white mb-2">{titulo}</h3>
        
        <div className={`w-16 h-1 bg-gradient-to-r ${gradienteClasse} rounded-full mb-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100`}></div>
        
        <p className="text-white/90 mb-6 text-sm transform opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-150">{descricao}</p>
        
        <a 
          href={link}
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

const ServicosSection: React.FC = () => {
  // Dados dos serviços
  const servicos = [
    {
      titulo: 'Tarot',
      descricao: 'Consultas detalhadas de Tarot para orientação em decisões, previsões futuras e autoconhecimento profundo.',
      imagem: '/images/services/tarot.jpg',
      cor: 'purple',
      link: '/servicos/tarot'
    },
    {
      titulo: 'Astrologia',
      descricao: 'Mapas astrais detalhados para entender influências planetárias, compatibilidade e momentos decisivos em sua vida.',
      imagem: '/images/services/astrologia.jpg',
      cor: 'blue',
      link: '/servicos/astrologia'
    },
    {
      titulo: 'Numerologia',
      descricao: 'Análise detalhada de números significativos para revelar padrões, desafios e propósitos de vida.',
      imagem: '/images/services/numerologia.jpg',
      cor: 'green',
      link: '/servicos/numerologia'
    },
    {
      titulo: 'Runas',
      descricao: 'Interpretação dos símbolos rúnicos ancestrais para orientação espiritual, proteção e compreensão do destino.',
      imagem: '/images/services/runas.jpg',
      cor: 'orange',
      link: '/servicos/runas'
    },
    {
      titulo: 'Mediunidade',
      descricao: 'Comunicação com o plano espiritual para orientações, curas energéticas e mensagens de entes queridos.',
      imagem: '/images/services/videncia.jpg',
      cor: 'pink',
      link: '/servicos/mediunidade'
    },
    {
      titulo: 'Oráculos',
      descricao: 'Leituras de diferentes oráculos para orientação espiritual e clareza em situações específicas da sua vida.',
      imagem: '/images/services/buzios.jpg',
      cor: 'violet',
      link: '/servicos/oraculos'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
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
            <Servico 
              key={index}
              titulo={servico.titulo}
              descricao={servico.descricao}
              imagem={servico.imagem}
              cor={servico.cor}
              link={servico.link}
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

export default ServicosSection;