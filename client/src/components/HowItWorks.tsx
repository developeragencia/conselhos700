import React from "react";
import { motion } from "framer-motion";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Escolha seu Consultor",
      description: "Explore perfis e encontre o consultor espiritual que mais conecta com suas necessidades.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      )
    },
    {
      number: 2,
      title: "Adquira Créditos",
      description: "Escolha um pacote de créditos adequado ao seu orçamento para iniciar sua consulta.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      number: 3,
      title: "Inicie sua Consulta",
      description: "Conecte-se por chat, áudio ou vídeo e receba orientação personalizada em tempo real.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      {/* Circle connectors */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-0.5 bg-gray-200 w-1/3 hidden md:block"></div>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-0.5 bg-accent w-0 md:w-0 hidden md:block" id="progress-line"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block py-1 px-3 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">Processo Simplificado</span>
          <h2 className="text-5xl font-heading font-bold mb-4">Como <span className="text-primary">Funciona</span></h2>
          <div className="w-24 h-1 bg-accent rounded mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Em apenas três passos simples, você poderá receber orientação espiritual personalizada dos melhores consultores.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto relative">
          {steps.map((step, index) => (
            <motion.div 
              key={step.number} 
              className="relative z-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <div className="text-center bg-white rounded-xl shadow-lg p-8 h-full border border-gray-100 hover:border-accent/30 transition-all duration-300 hover:shadow-xl relative overflow-hidden group">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Step number */}
                <div className="absolute -top-6 -right-6">
                  <div className="text-gray-100 font-bold text-9xl opacity-30">{step.number}</div>
                </div>
                
                {/* Icon circle */}
                <div className="relative">
                  <div className="w-24 h-24 mx-auto mb-6 relative">
                    <div className="absolute inset-0 rounded-full bg-gray-100 animate-pulse"></div>
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-accent/20 scale-110"></div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-heading font-bold text-primary mb-4 relative">{step.title}</h3>
                <p className="text-gray-600 relative">{step.description}</p>
                
                {/* Connect line to next step (only on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gray-200"></div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.button
            className="bg-gradient-to-r from-accent to-accent/90 hover:to-accent text-white font-bold py-4 px-10 rounded-full inline-flex items-center gap-3 shadow-md hover:shadow-lg border border-accent/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/consultores"}
          >
            <span>Começar Agora</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
          
          <div className="mt-6 text-sm text-gray-500">
            Sem compromisso ou pagamento adiantado
          </div>
        </motion.div>
      </div>
    </section>
  );
};
