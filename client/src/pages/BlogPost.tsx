import React from "react";
import { motion } from "framer-motion";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";

import { Calendar, User, Clock, Share2, ArrowLeft, Tag } from "lucide-react";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading } = useQuery({
    queryKey: ["/api/blog/post", slug],
    enabled: !!slug,
  });

  // Mock post data - replace with actual API data
  const mockPost: any = {
    id: 1,
    title: "Como o Tarot pode ajudar em momentos de decisão",
    content: `
      <div class="prose prose-lg max-w-none">
        <p>O Tarot é uma ferramenta milenar de autoconhecimento que pode oferecer insights valiosos nos momentos mais desafiadores de nossas vidas. Quando enfrentamos decisões difíceis, seja no amor, carreira ou vida pessoal, as cartas podem servir como um espelho da nossa intuição.</p>

        <h2>A Sabedoria das Cartas</h2>
        <p>Cada carta do Tarot carrega símbolos e significados profundos que nos conectam com nossa sabedoria interior. Não se trata de prever o futuro de forma determinística, mas sim de iluminar caminhos possíveis e nos ajudar a compreender melhor as energias em jogo em nossa vida.</p>

        <h2>Como o Tarot Funciona</h2>
        <p>O processo de consulta ao Tarot envolve:</p>
        <ul>
          <li><strong>Concentração</strong> - Focar na pergunta ou situação</li>
          <li><strong>Intuição</strong> - Escolher as cartas que mais nos chamam atenção</li>
          <li><strong>Interpretação</strong> - Compreender os símbolos e mensagens</li>
          <li><strong>Reflexão</strong> - Aplicar os insights à situação real</li>
        </ul>

        <h2>Tipos de Consulta</h2>
        <p>Existem diferentes tipos de consulta que podem ser realizadas:</p>
        
        <h3>Tarot do Amor</h3>
        <p>Focado em questões relacionais, o Tarot do Amor pode revelar dinâmicas ocultas em relacionamentos, indicar períodos favoráveis para encontros e ajudar a compreender padrões emocionais.</p>

        <h3>Tarot Profissional</h3>
        <p>Orientado para questões de carreira, este tipo de consulta pode indicar oportunidades, momentos ideais para mudanças e caminhos para o crescimento profissional.</p>

        <h3>Tarot Espiritual</h3>
        <p>Voltado para o desenvolvimento pessoal e espiritual, oferece orientações sobre propósito de vida, crescimento interior e conexão com o sagrado.</p>

        <h2>Benefícios da Consulta</h2>
        <p>Uma consulta de Tarot bem conduzida pode oferecer:</p>
        <ul>
          <li>Clareza mental em situações confusas</li>
          <li>Novas perspectivas sobre problemas antigos</li>
          <li>Conexão com a intuição e sabedoria interior</li>
          <li>Orientação para tomada de decisões</li>
          <li>Compreensão de padrões comportamentais</li>
        </ul>

        <h2>Escolhendo um Tarólogo</h2>
        <p>Para obter o máximo benefício de uma consulta, é importante escolher um profissional qualificado:</p>
        <ul>
          <li>Experiência comprovada na área</li>
          <li>Boa reputação e avaliações positivas</li>
          <li>Abordagem ética e respeitosa</li>
          <li>Capacidade de interpretação clara</li>
          <li>Ambiente acolhedor e confidencial</li>
        </ul>

        <h2>Conclusão</h2>
        <p>O Tarot não é sobre predestinação, mas sobre empoderamento. Ele nos oferece ferramentas para compreender melhor nossas circunstâncias e fazer escolhas mais conscientes. Em momentos de incerteza, pode ser um aliado valioso na jornada de autodescoberta e crescimento pessoal.</p>

        <p>Lembre-se: você sempre tem o poder de escolha. O Tarot simplesmente ilumina os caminhos disponíveis, mas a decisão final sempre será sua.</p>
      </div>
    `,
    excerpt: "Descubra como as cartas do tarot podem oferecer insights valiosos para suas escolhas mais importantes da vida.",
    slug: "tarot-momentos-decisao",
    publishedAt: "2024-01-15T10:00:00Z",
    category: "Tarot",
    imageUrl: "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?q=80&w=1000&auto=format&fit=crop",
    author: {
      name: "Redação Portal",
      bio: "Taróloga e terapeuta holística com mais de 10 anos de experiência",
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b9ee9b90?q=80&w=1000&auto=format&fit=crop"
    },
    tags: ["Tarot", "Autoconhecimento", "Decisões", "Espiritualidade"],
    readTime: "8 min",
    views: 1247
  };

  const postData = post || mockPost;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-8">
          <motion.a
            href="/blog"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar ao Blog
          </motion.a>
        </div>

        {/* Article Header */}
        <article className="container mx-auto px-4 pb-12">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Featured Image */}
            <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={postData.imageUrl}
                alt={postData.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Article Meta */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {postData.category}
                </span>
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(postData.publishedAt).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {postData.readTime} de leitura
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <User className="w-4 h-4 mr-1" />
                  {postData.views} visualizações
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                {postData.title}
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {postData.excerpt}
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-6">
                <div className="flex items-center">
                  <img
                    src={postData.author.imageUrl}
                    alt={postData.author.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">{postData.author.name}</h3>
                    <p className="text-gray-600 text-sm">{postData.author.bio}</p>
                  </div>
                </div>

                <button className="flex items-center text-primary hover:text-primary/80 transition-colors">
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartilhar
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-8">
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: postData.content }}
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {postData.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="flex items-center bg-primary/10 text-primary px-3 py-2 rounded-full text-sm font-medium"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Related Articles */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Artigos Relacionados</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Os 12 Signos e suas Características",
                    excerpt: "Descubra as principais características de cada signo do zodíaco",
                    imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=400&auto=format&fit=crop",
                    slug: "12-signos-caracteristicas"
                  },
                  {
                    title: "Numerologia: Descubra seu Número da Sorte",
                    excerpt: "Aprenda a calcular e interpretar seu número pessoal",
                    imageUrl: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=400&auto=format&fit=crop",
                    slug: "numerologia-numero-sorte"
                  }
                ].map((article, index) => (
                  <a
                    key={index}
                    href={`/blog/${article.slug}`}
                    className="group bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h4 className="font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{article.excerpt}</p>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </article>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Gostou do Artigo?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Assine nossa newsletter e receba conteúdos exclusivos sobre espiritualidade e autoconhecimento
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  Assinar
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
  );
}