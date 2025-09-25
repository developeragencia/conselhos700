import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ConsultantCard } from "@/components/ConsultantCard";
import { ServiceCard } from "@/components/ServiceCard";
import { HowItWorks } from "@/components/HowItWorks";
import { TestimonialCard } from "@/components/TestimonialCard";
import { BlogCard } from "@/components/BlogCard";
import { PromotionCard } from "@/components/PromotionCard";
import { BasicBanner } from "@/components/BasicBanner";
import NovosServicos from "@/components/NovosServicos";

const Home = () => {
  const { data: consultants, isLoading: consultantsLoading } = useQuery({
    queryKey: ["/api/consultants/featured"],
  });

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery({
    queryKey: ["/api/testimonials"],
  });

  const { data: blogPosts, isLoading: blogLoading } = useQuery({
    queryKey: ["/api/blog/recent"],
  });

  return (
    <main className="flex flex-col min-h-screen">
      {/* 1 - Introdução - Banner Rotativo */}
      <BasicBanner />

      {/* 2 - Nossos Especialistas - PRIMEIRA SEÇÃO APÓS O BANNER */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-purple-900 mb-4">
              Nossos Especialistas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conecte-se com consultores experientes e certificados, prontos para guiar você em sua jornada de autoconhecimento.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {consultantsLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))
            ) : (
              consultants && Array.isArray(consultants) ? consultants.slice(0, 3).map((consultant: any) => (
                <ConsultantCard key={consultant.id} consultant={consultant} />
              )) : null
            )}
          </motion.div>

          <div className="text-center">
            <Link href="/consultores">
              <motion.button
                className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Todos os Consultores
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3 - Nossos Serviços */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <NovosServicos />
      </motion.section>

      {/* 4 - Como Funciona */}
      <motion.section
        className="py-16 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-purple-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simples, rápido e seguro. Conecte-se com seu consultor ideal em poucos passos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <HowItWorks />
          </motion.div>
        </div>
      </motion.section>

      {/* 5 - Depoimentos */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-purple-900 mb-4">
              O que Dizem Nossos Clientes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Histórias reais de transformação e crescimento pessoal.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {testimonialsLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-32 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))
            ) : (
              testimonials && Array.isArray(testimonials) ? testimonials.slice(0, 3).map((testimonial: any) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              )) : null
            )}
          </motion.div>

          <div className="text-center">
            <Link href="/depoimentos">
              <motion.button
                className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Todos os Depoimentos
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 6 - Blog */}
      <motion.section
        className="py-16 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-purple-900 mb-4">
              Conteúdo Exclusivo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Artigos, dicas e insights para sua jornada de autoconhecimento.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {blogLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))
            ) : (
              blogPosts && Array.isArray(blogPosts) ? blogPosts.slice(0, 3).map((post: any) => (
                <BlogCard key={post.id} post={post} />
              )) : null
            )}
          </motion.div>

          <div className="text-center">
            <Link href="/blog">
              <motion.button
                className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore o Blog
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 7 - Call to Action Final */}
      <motion.section
        className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Pronto para Descobrir Seu Caminho?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Junte-se a milhares de pessoas que já transformaram suas vidas com nossos consultores especializados.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/cadastre-se">
              <motion.button
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Comece Agora
              </motion.button>
            </Link>
            <Link href="/consultores">
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Conheça os Consultores
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
};

export default Home;